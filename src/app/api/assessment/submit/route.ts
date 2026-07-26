import { NextRequest, NextResponse } from "next/server";
import { assessmentSubmitSchema } from "@/lib/assessment/schema";
import { getAssessmentConfig } from "@/lib/assessment/questions";
import { isComplete, scoreAssessment } from "@/lib/assessment/scoring";
import {
  findRecentIdempotent,
  payloadHash,
  rowToStored,
  upsertSubmission,
} from "@/lib/assessment/repository";
import { readUtmFromCookieHeader } from "@/lib/assessment/utm";
import { runAssessmentDownstreamJobs } from "@/lib/assessment/jobs";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { saveAssessment } from "@/lib/assessment/store";

export const runtime = "nodejs";

/**
 * POST /api/assessment/submit
 * Validate → rate limit → idempotency → upsert → fire jobs → return permalink uuid.
 * PDF/email failures do not fail this response.
 */
export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  const limited = rateLimit(`assessment-submit:${ip}`, { limit: 10, windowMs: 60_000 });
  if (!limited.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Wait a minute and try again." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(limited.retryAfterMs / 1000) || 60) },
      },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = assessmentSubmitSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Check the highlighted fields.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const config = getAssessmentConfig(input.variant);

  if (!isComplete(input.answers, config)) {
    return NextResponse.json(
      { error: "Answer all twelve questions before submitting." },
      { status: 400 },
    );
  }

  const score = scoreAssessment(input.answers, config);
  const hash = payloadHash(input);
  const attribution = readUtmFromCookieHeader(request.headers.get("cookie")) ?? {};
  const userAgent = request.headers.get("user-agent");

  try {
    const recent = await findRecentIdempotent(hash);
    if (recent) {
      return NextResponse.json({
        ok: true,
        id: recent.id,
        resultsPath: `${config.framing.resultsPathPrefix}/${recent.id}`,
        idempotent: true,
      });
    }

    let storedId: string;
    let storedRecord = null as ReturnType<typeof rowToStored> | null;

    try {
      const row = await upsertSubmission({
        input,
        score,
        attribution,
        userAgent,
        hash,
      });
      storedId = row.id;
      storedRecord = rowToStored(row);
    } catch (error) {
      console.error("[submit] supabase upsert failed — falling back to local store", error);
      const fallback = await saveAssessment({
        variant: input.variant,
        lead: input.lead,
        answers: input.answers,
        score,
      });
      storedId = fallback.id;
      storedRecord = fallback;
    }

    // Fire-and-forget downstream work so the user reaches results immediately.
    if (storedRecord) {
      void runAssessmentDownstreamJobs(storedRecord).catch((error) => {
        console.error("[submit] downstream jobs failed", error);
      });
    }

    return NextResponse.json({
      ok: true,
      id: storedId,
      resultsPath: `${config.framing.resultsPathPrefix}/${storedId}`,
    });
  } catch (error) {
    console.error("[submit] unhandled failure", error);
    return NextResponse.json({ error: "Unable to submit right now." }, { status: 500 });
  }
}
