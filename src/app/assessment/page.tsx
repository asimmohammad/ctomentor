import type { Metadata } from "next";
import { Suspense } from "react";
import { AssessmentClient } from "@/components/assessment/AssessmentClient";
import { Container } from "@/components/layout/Container";
import { investorConfig } from "@/lib/assessment/configs/investor";

export const metadata: Metadata = {
  title: "The Technical Risk Assessment",
  description:
    "Twelve questions across engineering velocity, quality, security posture, and key-person risk. Four minutes for a scored view of your technology risk.",
  alternates: { canonical: "https://thectomentor.com/assessment" },
  openGraph: {
    title: "The Technical Risk Assessment",
    description:
      "Twelve questions. Four minutes. A scored report benchmarked against companies at your stage.",
    url: "https://thectomentor.com/assessment",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Technical Risk Assessment",
    description:
      "Twelve questions. Four minutes. A scored report benchmarked against companies at your stage.",
  },
};

function AssessmentFallback() {
  return (
    <Container className="py-[var(--section-standard)]">
      <p className="font-text text-body text-ink-muted">Loading the assessment…</p>
    </Container>
  );
}

export default function AssessmentPage() {
  return (
    <Suspense fallback={<AssessmentFallback />}>
      <AssessmentClient config={investorConfig} />
    </Suspense>
  );
}
