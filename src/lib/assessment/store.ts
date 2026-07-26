import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import type { Lead } from "./machine";
import type { AnswerMap, AssessmentScore } from "./scoring-types";
import type { AssessmentVariantId } from "./types";
import { narrateResults, topRiskAreas } from "./interpret";
import { getAssessmentConfig } from "./questions";
import { getSubmissionById, rowToStored } from "./repository";
import { tierFromOverall } from "./scoring";

const DATA_DIR = path.join(process.cwd(), "data", "assessments");

export type StoredAssessment = {
  id: string;
  variant: AssessmentVariantId;
  createdAt: string;
  /** Private — never rendered on share pages. */
  lead: Lead;
  answers: AnswerMap;
  score: AssessmentScore;
  pdfUrl?: string | null;
};

/** Public payload for /assessment/r/[uuid] — no email or role. */
export type PublicAssessmentResult = {
  id: string;
  variant: AssessmentVariantId;
  createdAt: string;
  firstName: string;
  company: string;
  score: AssessmentScore;
  narratives: ReturnType<typeof narrateResults>;
  risks: ReturnType<typeof topRiskAreas>;
  benchmarks: Record<string, number>;
  framingName: string;
  resultsPathPrefix: string;
};

type GlobalStore = {
  __assessmentStore?: Map<string, StoredAssessment>;
};

function memoryStore(): Map<string, StoredAssessment> {
  const g = globalThis as unknown as GlobalStore;
  if (!g.__assessmentStore) g.__assessmentStore = new Map();
  return g.__assessmentStore;
}

function firstNameFrom(fullName: string): string {
  const part = fullName.trim().split(/\s+/)[0];
  return part || "Anonymous";
}

function normalizeScore(score: AssessmentScore): AssessmentScore {
  return {
    ...score,
    tier: score.tier?.level
      ? score.tier
      : tierFromOverall(score.overall),
  };
}

export function toPublicResult(record: StoredAssessment): PublicAssessmentResult {
  const config = getAssessmentConfig(record.variant);
  const score = normalizeScore(record.score);
  return {
    id: record.id,
    variant: record.variant,
    createdAt: record.createdAt,
    firstName: firstNameFrom(record.lead.name),
    company: record.lead.company.trim() || "Confidential",
    score,
    narratives: narrateResults(score, config),
    risks: topRiskAreas(record.answers, score, config, 3),
    benchmarks: config.benchmarks,
    framingName: config.framing.name,
    resultsPathPrefix: config.framing.resultsPathPrefix,
  };
}

async function ensureDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function writeFile(record: StoredAssessment): Promise<void> {
  try {
    await ensureDir();
    await fs.writeFile(path.join(DATA_DIR, `${record.id}.json`), JSON.stringify(record), "utf8");
  } catch (error) {
    console.warn("[assessment-store] file write failed; memory only", error);
  }
}

async function readFile(id: string): Promise<StoredAssessment | null> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, `${id}.json`), "utf8");
    return JSON.parse(raw) as StoredAssessment;
  } catch {
    return null;
  }
}

/** Local/dev fallback when Supabase is unavailable. */
export async function saveAssessment(input: {
  variant: AssessmentVariantId;
  lead: Lead;
  answers: AnswerMap;
  score: AssessmentScore;
}): Promise<StoredAssessment> {
  const record: StoredAssessment = {
    id: randomUUID(),
    variant: input.variant,
    createdAt: new Date().toISOString(),
    lead: input.lead,
    answers: input.answers,
    score: input.score,
  };
  memoryStore().set(record.id, record);
  await writeFile(record);
  return record;
}

export async function getAssessment(id: string): Promise<StoredAssessment | null> {
  const fromDb = await getSubmissionById(id);
  if (fromDb) {
    const stored = rowToStored(fromDb);
    memoryStore().set(stored.id, stored);
    return stored;
  }

  const cached = memoryStore().get(id);
  if (cached) return cached;
  const fromDisk = await readFile(id);
  if (fromDisk) memoryStore().set(id, fromDisk);
  return fromDisk;
}

export async function getPublicAssessment(id: string): Promise<PublicAssessmentResult | null> {
  const record = await getAssessment(id);
  if (!record) return null;
  return toPublicResult(record);
}
