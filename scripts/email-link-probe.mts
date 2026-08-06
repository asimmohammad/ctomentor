// Verifies the results email links the permanent /pdf path for BOTH variants,
// using the same URL construction as runAssessmentDownstreamJobs.
import { buildResultsEmailHtml } from "../src/lib/assessment/delivery";
import { getAssessmentConfig } from "../src/lib/assessment/questions";

const site = "https://thectomentor.com";

for (const variant of ["investor", "engineering"] as const) {
  const config = getAssessmentConfig(variant);
  const id = "00000000-0000-4000-8000-000000000000";
  const resultsUrl = `${site}${config.framing.resultsPathPrefix}/${id}`;

  const record = {
    id,
    variant,
    lead: { name: "Jane Partner", email: "jane@example.com", company: "Example", role: "cto-vp-engineering" },
    score: { overall: 67, tier: { level: 4, name: "Managed" }, dimensions: [] },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  const html = buildResultsEmailHtml({ record, resultsUrl, pdfUrl: null });
  const links = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  console.log(`\n${variant}:`);
  links.forEach((l) => console.log("  ", l));
  console.log("   permanent pdf link present:", links.includes(`${resultsUrl}/pdf`));
}
