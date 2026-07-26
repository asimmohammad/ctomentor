import { describe, expect, it } from "vitest";
import { investorConfig } from "@/lib/assessment/configs/investor";
import {
  MATURITY_TIERS,
  normalizeToHundred,
  overallFromDimensions,
  scoreAssessment,
  tierFromOverall,
} from "@/lib/assessment/scoring";
import { answersAtScore } from "@/lib/assessment/interpret";

describe("normalizeToHundred", () => {
  it("maps 0/9 to 0 and 9/9 to 100", () => {
    expect(normalizeToHundred(0, 9)).toBe(0);
    expect(normalizeToHundred(9, 9)).toBe(100);
  });

  it("rounds mid values", () => {
    expect(normalizeToHundred(5, 9)).toBe(56);
  });
});

describe("overallFromDimensions", () => {
  it("returns the mean of dimension percentages", () => {
    expect(overallFromDimensions([100, 100, 100, 100])).toBe(100);
    expect(overallFromDimensions([0, 0, 0, 0])).toBe(0);
    expect(overallFromDimensions([40, 60, 50, 50])).toBe(50);
  });
});

describe("tierFromOverall", () => {
  it("maps inclusive boundaries to the correct tier", () => {
    expect(tierFromOverall(0)).toMatchObject({ level: 1, name: "Ad Hoc" });
    expect(tierFromOverall(20)).toMatchObject({ level: 1, name: "Ad Hoc" });
    expect(tierFromOverall(21)).toMatchObject({ level: 2, name: "Repeatable" });
    expect(tierFromOverall(40)).toMatchObject({ level: 2, name: "Repeatable" });
    expect(tierFromOverall(41)).toMatchObject({ level: 3, name: "Defined" });
    expect(tierFromOverall(60)).toMatchObject({ level: 3, name: "Defined" });
    expect(tierFromOverall(61)).toMatchObject({ level: 4, name: "Managed" });
    expect(tierFromOverall(80)).toMatchObject({ level: 4, name: "Managed" });
    expect(tierFromOverall(81)).toMatchObject({ level: 5, name: "Optimizing" });
    expect(tierFromOverall(100)).toMatchObject({ level: 5, name: "Optimizing" });
  });

  it("covers the full 0–100 range without gaps", () => {
    for (let score = 0; score <= 100; score += 1) {
      const tier = tierFromOverall(score);
      expect(score).toBeGreaterThanOrEqual(tier.min);
      expect(score).toBeLessThanOrEqual(tier.max);
      expect(MATURITY_TIERS.some((t) => t.level === tier.level)).toBe(true);
    }
  });
});

describe("scoreAssessment", () => {
  it("scores a full-zero submission as 0 / Level 1 Ad Hoc", () => {
    const answers = answersAtScore(investorConfig, 0);
    const result = scoreAssessment(answers, investorConfig);
    expect(result.overall).toBe(0);
    expect(result.tier).toMatchObject({ level: 1, name: "Ad Hoc" });
    for (const dimension of result.dimensions) {
      expect(dimension.raw).toBe(0);
      expect(dimension.percentage).toBe(0);
    }
  });

  it("scores a full-max submission as 100 / Level 5 Optimizing", () => {
    const answers = answersAtScore(investorConfig, 3);
    const result = scoreAssessment(answers, investorConfig);
    expect(result.overall).toBe(100);
    expect(result.tier).toMatchObject({ level: 5, name: "Optimizing" });
    for (const dimension of result.dimensions) {
      expect(dimension.raw).toBe(9);
      expect(dimension.percentage).toBe(100);
    }
  });

  it("uses the mean of dimension percentages for overall", () => {
    const answers = answersAtScore(investorConfig, 0);
    // Force velocity to max (9/9 = 100), leave others at 0 → overall 25
    for (const question of investorConfig.questions.filter((q) => q.dimension === "velocity")) {
      const option = question.options.find((o) => o.score === 3);
      if (option) answers[question.id] = option.id;
    }
    const result = scoreAssessment(answers, investorConfig);
    expect(result.overall).toBe(25);
    expect(result.tier.level).toBe(2);
  });
});
