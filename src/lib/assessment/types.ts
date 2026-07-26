/**
 * Shared assessment types — engine-level, config-agnostic.
 */

export type DimensionId = "velocity" | "quality" | "security" | "team";

export type Score = 0 | 1 | 2 | 3;

export type Option = {
  id: string;
  label: string;
  score: Score;
};

export type Question = {
  id: string;
  dimension: DimensionId;
  prompt: string;
  helper?: string;
  options: [Option, Option, Option, Option];
};

export type Dimension = {
  id: DimensionId;
  name: string;
  description: string;
};

export type AssessmentVariantId = "investor" | "engineering";

export type AssessmentFraming = {
  /** Short product name shown in eyebrows and metadata. */
  name: string;
  /** Intro H1. */
  headline: string;
  /** Intro lead. */
  body: string;
  /** Gate supporting copy. */
  gateBody: string;
  /** Results page eyebrow. */
  resultsEyebrow: string;
  /** Path for the quiz itself. */
  path: string;
  /** Results permalink prefix — /assessment/r or /engineering-assessment/r */
  resultsPathPrefix: string;
};

export type Band = "low" | "medium" | "high";

export type DimensionInterpretation = {
  interpretation: string;
  /** Default action when no lower-scoring question override applies. */
  action: string;
  /** Optional per-question action overrides keyed by question id. */
  questionActions?: Partial<Record<string, string>>;
};

export type InterpretationMatrix = Record<
  DimensionId,
  Record<Band, DimensionInterpretation>
>;

export type DimensionBenchmarks = Record<DimensionId, number>;

export type AssessmentConfig = {
  id: AssessmentVariantId;
  framing: AssessmentFraming;
  dimensions: Dimension[];
  questions: Question[];
  /** Median benchmark line per dimension (0–100). */
  benchmarks: DimensionBenchmarks;
  interpretations: InterpretationMatrix;
  storageKey: string;
};
