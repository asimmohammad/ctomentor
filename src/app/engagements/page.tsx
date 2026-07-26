import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Engagements",
  description:
    "Diagnostic Sprint ($25,000), Embedded Technology Leadership ($25,000/mo), and Technical Due Diligence ($35,000–$50,000).",
};

export default function EngagementsPage() {
  return (
    <Section spacing="standard" tone="paper">
      <Eyebrow>Engagements</Eyebrow>
      <h1 className="mt-3 max-w-measure font-display text-h1 text-ink">Engagement models</h1>
      <p className="mt-6 max-w-measure font-text text-lead text-ink-muted">
        Full engagement detail pages are in progress. For now, start with the assessment or a confidential conversation.
      </p>
      <ul className="mt-8 max-w-measure space-y-4 font-text text-body text-ink">
        <li>
          <Link href="/assessment" className="text-accent underline-offset-4 hover:underline">
            Take the Technical Risk Assessment
          </Link>
        </li>
        <li>
          <Link href="/book" className="text-accent underline-offset-4 hover:underline">
            Request a confidential conversation
          </Link>
        </li>
      </ul>
    </Section>
  );
}
