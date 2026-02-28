import type { Metadata } from "next";
import ApplyClient from "./ApplyClient";

export const metadata: Metadata = {
  title: "Book a Discovery Call | The CTO Mentor",
  description:
    "Apply to work with The CTO Mentor. Discovery call for founders, boards, and investors where technology execution is critical and stakes are high.",
  alternates: { canonical: "https://thectomentor.com/apply" },
};

export default function ApplyPage() {
  return <ApplyClient />;
}

