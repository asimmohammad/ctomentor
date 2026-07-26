import type { Metadata } from "next";
import { EngageClient } from "@/components/funnel/EngageClient";

export const metadata: Metadata = {
  title: "Apply for an engagement",
  description:
    "Bottom-of-funnel application for Diagnostic Sprints and embedded technology leadership. Cold traffic should start with the Technical Risk Assessment.",
  alternates: { canonical: "https://thectomentor.com/engage" },
  robots: { index: true, follow: true },
};

export default function EngagePage() {
  return <EngageClient />;
}
