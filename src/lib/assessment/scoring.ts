import type {
  AnswerMap,
  AssessmentScore,
  DimensionScore,
  MaturityTier,
  TierDefinition,
} from "./scoring-types";
import type { AssessmentConfig, DimensionId, Score } from "./types";

export type {
  AnswerMap,
  AssessmentScore,
  DimensionScore,
  MaturityTier,
  TierDefinition,
} from "./scoring-types";

export const MAX_SCORE_PER_QUESTION = 3;

export const MATURITY_TIERS: TierDefinition[] = [
  { level: 1, name: "Ad Hoc", min: 0, max: 20 },
  { level: 2, name: "Repeatable", min: 21, max: 40 },
  { level: 3, name: "Defined", min: 41, max: 60 },
  { level: 4, name: "Managed", min: 61, max: 80 },
  { level: 5, name: "Optimizing", min: 81, max: 100 },
];

/** Normalize a raw 0–max score to 0–100. */
export function normalizeToHundred(raw: number, max: number): number {
  if (max <= 0) return 0;
  return Math.round((raw / max) * 100);
}

/** Mean of dimension percentages, rounded to nearest integer 0–100. */
export function overallFromDimensions(percentages: number[]): number {
  if (percentages.length === 0) return 0;
  const sum = percentages.reduce((acc, value) => acc + value, 0);
  return Math.round(sum / percentages.length);
}

export function tierFromOverall(overall: number): MaturityTier {
  const clamped = Math.min(100, Math.max(0, Math.round(overall)));
  const match = MATURITY_TIERS.find((tier) => clamped >= tier.min && clamped <= tier.max);
  return match ?? MATURITY_TIERS[0];
}

export function optionScore(
  config: AssessmentConfig,
  questionId: string,
  optionId: string,
): Score | undefined {
  const question = config.questions.find((q) => q.id === questionId);
  return question?.options.find((o) => o.id === optionId)?.score;
}

/**
 * Score an answer map against a config.
 * Per-dimension: sum option scores (0–9), normalize to 0–100.
 * Overall: mean of the four dimension percentages.
 */
export function scoreAssessment(
  answers: AnswerMap,
  config: AssessmentConfig,
): AssessmentScore {
  const dimensions: DimensionScore[] = config.dimensions.map((dimension) => {
    const dimensionQuestions = config.questions.filter((q) => q.dimension === dimension.id);
    const raw = dimensionQuestions.reduce((sum, question) => {
      const answer = answers[question.id];
      return sum + (answer ? (optionScore(config, question.id, answer) ?? 0) : 0);
    }, 0);
    const max = dimensionQuestions.length * MAX_SCORE_PER_QUESTION;
    const percentage = normalizeToHundred(raw, max);

    return {
      id: dimension.id,
      name: dimension.name,
      raw,
      max,
      percentage,
      questionScores: dimensionQuestions.map((question) => {
        const answer = answers[question.id];
        const score = answer ? (optionScore(config, question.id, answer) ?? 0) : 0;
        return { questionId: question.id, prompt: question.prompt, score };
      }),
    };
  });

  const overall = overallFromDimensions(dimensions.map((d) => d.percentage));
  const tier = tierFromOverall(overall);

  return { overall, tier, dimensions };
}

export function isComplete(answers: AnswerMap, config: AssessmentConfig): boolean {
  return config.questions.every((question) => Boolean(answers[question.id]));
}

export function getDimension(config: AssessmentConfig, id: DimensionId) {
  const dimension = config.dimensions.find((d) => d.id === id);
  if (!dimension) throw new Error(`Unknown dimension: ${id}`);
  return dimension;
}
