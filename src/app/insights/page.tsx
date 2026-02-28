import type { Metadata } from "next";
import InsightsClient from "./InsightsClient";

export const metadata: Metadata = {
  title: "Technology Leadership Insights | The CTO Mentor Blog",
  description:
    "Weekly insights on CTO strategy, engineering leadership, security compliance, and scaling technology teams.",
  alternates: { canonical: "https://thectomentor.com/insights" },
};

export default function InsightsPage() {
  return <InsightsClient />;
}

