// Local-only layout probe: renders the results PDF with fixture data so the
// hero-score/tier spacing can be checked without a live submission.
import { writeFileSync } from "node:fs";
import { renderAssessmentPdf } from "../src/lib/assessment/pdf";

const dims = [
  { id: "velocity", name: "Engineering Velocity & Delivery", median: 58 },
  { id: "quality", name: "Quality & Test Coverage", median: 52 },
  { id: "security", name: "Security & Compliance Posture", median: 48 },
  { id: "team", name: "Team & Key-Person Risk", median: 55 },
];

const result = {
  id: "probe",
  variant: "investor",
  framingName: "The Technical Risk Assessment",
  resultsPathPrefix: "/assessment/r",
  firstName: "Asim",
  company: "Layout Probe",
  score: {
    overall: 67,
    tier: { level: 4, name: "Managed" },
    dimensions: dims.map((d) => ({ id: d.id, name: d.name, score: 6, max: 9, percentage: 67 })),
  },
  benchmarks: Object.fromEntries(dims.map((d) => [d.id, d.median])),
  narratives: dims.map((d) => ({
    id: d.id,
    name: d.name,
    percentage: 67,
    interpretation: "Delivery velocity looks institutional rather than heroic.",
    action: "Keep daily deploy discipline.",
  })),
  risks: dims.slice(0, 3).map((d, i) => ({
    questionId: `q${i}`,
    dimensionName: d.name,
    score: 2,
    prompt: "How often does production code ship?",
    action: "Document the automated path.",
  })),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const buffer = await renderAssessmentPdf(result);
writeFileSync("/home/user/workspace/pdf_probe.pdf", buffer);
console.log("wrote /home/user/workspace/pdf_probe.pdf");
