import { engineeringConfig } from "./configs/engineering";
import { investorConfig } from "./configs/investor";
import type { AssessmentConfig, AssessmentVariantId } from "./types";

export const assessmentConfigs: Record<AssessmentVariantId, AssessmentConfig> = {
  investor: investorConfig,
  engineering: engineeringConfig,
};

export function getAssessmentConfig(id: AssessmentVariantId): AssessmentConfig {
  return assessmentConfigs[id];
}

/** @deprecated Prefer investorConfig / getAssessmentConfig — kept for gradual migration. */
export const dimensions = investorConfig.dimensions;
/** @deprecated Prefer investorConfig */
export const questions = investorConfig.questions;
export const TOTAL_QUESTIONS = investorConfig.questions.length;
export const SECONDS_PER_QUESTION = 20;
export const MAX_SCORE_PER_QUESTION = 3;
export const MAX_TOTAL_SCORE = TOTAL_QUESTIONS * MAX_SCORE_PER_QUESTION;

export type {
  DimensionId,
  Score,
  Option,
  Question,
  Dimension,
  AssessmentConfig,
  AssessmentVariantId,
} from "./types";

export { getDimension } from "./scoring";
export { investorConfig } from "./configs/investor";
export { engineeringConfig } from "./configs/engineering";
