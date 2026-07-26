import type { Band, DimensionId, InterpretationMatrix } from "./types";
import type { AnswerMap, AssessmentScore, DimensionScore } from "./scoring-types";
import type { AssessmentConfig } from "./types";
import { optionScore } from "./scoring";

export type DimensionNarrative = {
  id: DimensionId;
  name: string;
  percentage: number;
  band: Band;
  interpretation: string;
  action: string;
  lowestQuestionId: string | null;
  lowestQuestionPrompt: string | null;
};

export type RiskArea = {
  questionId: string;
  dimensionId: DimensionId;
  dimensionName: string;
  prompt: string;
  score: number;
  action: string;
};

export function bandFromPercentage(percentage: number): Band {
  if (percentage <= 33) return "low";
  if (percentage <= 66) return "medium";
  return "high";
}

function lowestQuestion(dimension: DimensionScore) {
  if (dimension.questionScores.length === 0) return null;
  return dimension.questionScores.reduce((worst, current) =>
    current.score < worst.score ? current : worst,
  );
}

export function narrateDimension(
  dimension: DimensionScore,
  config: AssessmentConfig,
): DimensionNarrative {
  const band = bandFromPercentage(dimension.percentage);
  const matrix = config.interpretations[dimension.id][band];
  const lowest = lowestQuestion(dimension);
  const action =
    (lowest && matrix.questionActions?.[lowest.questionId]) || matrix.action;

  return {
    id: dimension.id,
    name: dimension.name,
    percentage: dimension.percentage,
    band,
    interpretation: matrix.interpretation,
    action,
    lowestQuestionId: lowest?.questionId ?? null,
    lowestQuestionPrompt: lowest?.prompt ?? null,
  };
}

export function narrateResults(
  score: AssessmentScore,
  config: AssessmentConfig,
): DimensionNarrative[] {
  return score.dimensions.map((dimension) => narrateDimension(dimension, config));
}

/**
 * Rank the three highest-risk individual questions (lowest option scores).
 * Ties broken by dimension order in the config.
 */
export function topRiskAreas(
  answers: AnswerMap,
  score: AssessmentScore,
  config: AssessmentConfig,
  limit = 3,
): RiskArea[] {
  const dimensionOrder = new Map(config.dimensions.map((d, index) => [d.id, index]));

  const rows: RiskArea[] = score.dimensions.flatMap((dimension) =>
    dimension.questionScores.map((qs) => {
      const band = bandFromPercentage(dimension.percentage);
      const matrix = config.interpretations[dimension.id][band];
      const action = matrix.questionActions?.[qs.questionId] ?? matrix.action;
      return {
        questionId: qs.questionId,
        dimensionId: dimension.id,
        dimensionName: dimension.name,
        prompt: qs.prompt,
        score: qs.score,
        action,
      };
    }),
  );

  return rows
    .sort((a, b) => {
      if (a.score !== b.score) return a.score - b.score;
      return (dimensionOrder.get(a.dimensionId) ?? 0) - (dimensionOrder.get(b.dimensionId) ?? 0);
    })
    .slice(0, limit);
}

/** Helper for tests: build a full answer map selecting a fixed score per question. */
export function answersAtScore(config: AssessmentConfig, score: 0 | 1 | 2 | 3): AnswerMap {
  const answers: AnswerMap = {};
  for (const question of config.questions) {
    const option = question.options.find((o) => o.score === score);
    if (option) answers[question.id] = option.id;
  }
  return answers;
}

export function resolveSelectedScore(
  config: AssessmentConfig,
  answers: AnswerMap,
  questionId: string,
): number {
  const optionId = answers[questionId];
  if (!optionId) return 0;
  return optionScore(config, questionId, optionId) ?? 0;
}
