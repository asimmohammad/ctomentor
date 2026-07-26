import { createHash } from "crypto";
import { tierFromOverall } from "./scoring";
import type { AnswerMap, AssessmentScore } from "./scoring-types";
import type { AssessmentSubmitInput } from "./schema";
import type { UtmAttribution } from "./utm";
import type { Lead } from "./machine";
import type { AssessmentVariantId } from "./types";
import { createServiceClient } from "@/lib/supabase/admin";
import { withRetry } from "@/lib/retry";

export type DbStoredAssessment = {
  id: string;
  variant: AssessmentVariantId;
  createdAt: string;
  lead: Lead;
  answers: AnswerMap;
  score: AssessmentScore;
  pdfUrl?: string | null;
};

export type AssessmentRow = {
  id: string;
  created_at: string;
  variant: AssessmentVariantId;
  answers: Record<string, string>;
  dimension_scores: AssessmentScore["dimensions"];
  overall_score: number;
  tier: string;
  email: string;
  name: string;
  company: string;
  role: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  referrer: string | null;
  user_agent: string | null;
  pdf_url: string | null;
  notified_at: string | null;
  payload_hash: string | null;
  updated_at?: string;
};

export function payloadHash(input: AssessmentSubmitInput): string {
  const normalized = JSON.stringify({
    variant: input.variant,
    email: input.lead.email.trim().toLowerCase(),
    answers: Object.keys(input.answers)
      .sort()
      .reduce<Record<string, string>>((acc, key) => {
        acc[key] = input.answers[key];
        return acc;
      }, {}),
  });
  return createHash("sha256").update(normalized).digest("hex");
}

export type PersistInput = {
  input: AssessmentSubmitInput;
  score: AssessmentScore;
  attribution: UtmAttribution;
  userAgent: string | null;
  hash: string;
};

function tierLabel(score: AssessmentScore): string {
  return `Level ${score.tier.level} ${score.tier.name}`;
}

function rowToLead(row: AssessmentRow): Lead {
  return {
    email: row.email,
    name: row.name,
    company: row.company,
    role: row.role as Lead["role"],
  };
}

export function rowToStored(row: AssessmentRow): DbStoredAssessment {
  const overall = row.overall_score;
  const tierFromString = parseTierLabel(row.tier);
  return {
    id: row.id,
    variant: row.variant,
    createdAt: row.created_at,
    lead: rowToLead(row),
    answers: row.answers,
    score: {
      overall,
      tier: tierFromString ?? tierFromOverall(overall),
      dimensions: row.dimension_scores,
    },
    pdfUrl: row.pdf_url,
  };
}

function parseTierLabel(tier: string): AssessmentScore["tier"] | null {
  const match = tier.match(/Level\s+(\d)\s+(.+)/i);
  if (!match) return null;
  const level = Number(match[1]);
  if (level < 1 || level > 5) return null;
  const base = tierFromOverall(
    level === 1 ? 0 : level === 2 ? 21 : level === 3 ? 41 : level === 4 ? 61 : 81,
  );
  return { ...base, level: level as 1 | 2 | 3 | 4 | 5, name: match[2].trim() };
}

/** Idempotent: same payload hash within 60 seconds returns the existing row. */
export async function findRecentIdempotent(hash: string): Promise<AssessmentRow | null> {
  const supabase = createServiceClient();
  if (!supabase) return null;

  const since = new Date(Date.now() - 60_000).toISOString();
  const result = await withRetry("idempotency-lookup", async () => {
    const { data, error } = await supabase
      .from("assessment_submissions")
      .select("*")
      .eq("payload_hash", hash)
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return data as AssessmentRow | null;
  });

  return result.ok ? result.value : null;
}

/**
 * Insert or update by (email, variant). Duplicate emails update the existing row.
 */
export async function upsertSubmission(input: PersistInput): Promise<AssessmentRow> {
  const supabase = createServiceClient();
  if (!supabase) {
    throw new Error("Supabase service client is not configured");
  }

  const { input: body, score, attribution, userAgent, hash } = input;
  const email = body.lead.email.trim().toLowerCase();

  const payload = {
    variant: body.variant,
    answers: body.answers,
    dimension_scores: score.dimensions,
    overall_score: score.overall,
    tier: tierLabel(score),
    email,
    name: body.lead.name.trim(),
    company: body.lead.company.trim(),
    role: body.lead.role,
    utm_source: attribution.utm_source ?? null,
    utm_medium: attribution.utm_medium ?? null,
    utm_campaign: attribution.utm_campaign ?? null,
    utm_content: attribution.utm_content ?? null,
    utm_term: attribution.utm_term ?? null,
    referrer: attribution.referrer ?? null,
    user_agent: userAgent,
    payload_hash: hash,
    updated_at: new Date().toISOString(),
  };

  const existing = await withRetry("find-by-email", async () => {
    const { data, error } = await supabase
      .from("assessment_submissions")
      .select("id")
      .eq("variant", body.variant)
      .ilike("email", email)
      .maybeSingle();
    if (error) throw error;
    return data as { id: string } | null;
  });

  if (existing.ok && existing.value?.id) {
    const updated = await withRetry("update-submission", async () => {
      const { data, error } = await supabase
        .from("assessment_submissions")
        .update(payload)
        .eq("id", existing.value!.id)
        .select("*")
        .single();
      if (error) throw error;
      return data as AssessmentRow;
    }, { throwOnExhausted: true });
    if (!updated.ok) throw updated.error;
    return updated.value;
  }

  const inserted = await withRetry("insert-submission", async () => {
    const { data, error } = await supabase
      .from("assessment_submissions")
      .insert(payload)
      .select("*")
      .single();
    if (error) throw error;
    return data as AssessmentRow;
  }, { throwOnExhausted: true });

  if (!inserted.ok) throw inserted.error;
  return inserted.value;
}

export async function getSubmissionById(id: string): Promise<AssessmentRow | null> {
  const supabase = createServiceClient();
  if (!supabase) return null;

  const result = await withRetry("get-submission", async () => {
    const { data, error } = await supabase
      .from("assessment_submissions")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data as AssessmentRow | null;
  });

  return result.ok ? result.value : null;
}

export async function updateSubmissionPdf(
  id: string,
  pdfUrl: string,
): Promise<void> {
  const supabase = createServiceClient();
  if (!supabase) return;

  await withRetry("update-pdf-url", async () => {
    const { error } = await supabase
      .from("assessment_submissions")
      .update({ pdf_url: pdfUrl, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw error;
  });
}

export async function markNotified(id: string): Promise<void> {
  const supabase = createServiceClient();
  if (!supabase) return;

  await withRetry("mark-notified", async () => {
    const { error } = await supabase
      .from("assessment_submissions")
      .update({ notified_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw error;
  });
}
