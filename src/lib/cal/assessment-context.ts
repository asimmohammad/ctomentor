import type { StoredAssessment } from "@/lib/assessment/store";
import type { BookAssessmentContext } from "@/lib/cal/config";

export function weakestDimensionName(record: StoredAssessment): string {
  const sorted = [...record.score.dimensions].sort((a, b) => a.percentage - b.percentage);
  return sorted[0]?.name ?? "technology risk";
}

export function driverSuggestionFromWeakest(weakest: string): string {
  return `Looking at ${weakest} as the binding risk based on the assessment.`;
}

export function toBookAssessmentContext(record: StoredAssessment): BookAssessmentContext {
  const weakest = weakestDimensionName(record);
  return {
    id: record.id,
    name: record.lead.name,
    email: record.lead.email,
    company: record.lead.company,
    overall: record.score.overall,
    tierLabel: `Level ${record.score.tier.level} ${record.score.tier.name}`,
    weakestDimension: weakest,
    driverSuggestion: driverSuggestionFromWeakest(weakest),
    dimensionBreakdown: record.score.dimensions.map((d) => ({
      name: d.name,
      percentage: d.percentage,
    })),
  };
}
