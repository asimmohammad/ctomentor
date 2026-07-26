import type { Metadata } from "next";
import { Suspense } from "react";
import { AssessmentClient } from "@/components/assessment/AssessmentClient";
import { Container } from "@/components/layout/Container";
import { engineeringConfig } from "@/lib/assessment/configs/engineering";

export const metadata: Metadata = {
  title: "The Engineering Risk Assessment",
  description:
    "Twelve questions for CEOs and CTOs on velocity, quality, security, and key-person risk. Four minutes for a scored operating view.",
  alternates: { canonical: "https://thectomentor.com/engineering-assessment" },
  openGraph: {
    title: "The Engineering Risk Assessment",
    description:
      "Built for operators. Same engine as the investor assessment — copy tuned for CEOs and CTOs.",
    url: "https://thectomentor.com/engineering-assessment",
    type: "website",
  },
};

function AssessmentFallback() {
  return (
    <Container className="py-[var(--section-standard)]">
      <p className="font-text text-body text-ink-muted">Loading the assessment…</p>
    </Container>
  );
}

export default function EngineeringAssessmentPage() {
  return (
    <Suspense fallback={<AssessmentFallback />}>
      <AssessmentClient config={engineeringConfig} />
    </Suspense>
  );
}
