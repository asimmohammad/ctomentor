import type { DimensionId } from "./types";

/** Map of question id → selected option id. */
export type AnswerMap = Record<string, string>;

export type QuestionScore = {
  questionId: string;
  prompt: string;
  score: number;
};

export type DimensionScore = {
  id: DimensionId;
  name: string;
  /** Raw sum of option scores, 0–9 for three questions. */
  raw: number;
  max: number;
  /** Normalized 0–100. */
  percentage: number;
  questionScores: QuestionScore[];
};

export type MaturityTier = {
  level: 1 | 2 | 3 | 4 | 5;
  name: string;
  min: number;
  max: number;
};

export type TierDefinition = MaturityTier;

export type AssessmentScore = {
  /** Mean of dimension percentages, 0–100. */
  overall: number;
  tier: MaturityTier;
  dimensions: DimensionScore[];
};
