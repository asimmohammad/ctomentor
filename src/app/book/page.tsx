import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Request a confidential conversation",
  description: "Book a confidential conversation about technology risk, diligence, or an engagement.",
  robots: { index: true, follow: true },
};

type PageProps = {
  searchParams?: { assessment?: string };
};

export default function BookPage({ searchParams }: PageProps) {
  const assessmentId = searchParams?.assessment;

  return (
    <Section spacing="standard" tone="paper">
      <Eyebrow>Conversation</Eyebrow>
      <h1 className="mt-3 max-w-measure font-display text-h1 text-ink">
        Request a confidential conversation
      </h1>
      <p className="mt-6 max-w-measure font-text text-lead text-ink-muted">
        Scheduling is being wired to calendar. Until then, email me directly and reference your assessment if you
        have one.
      </p>
      {assessmentId ? (
        <p className="mt-4 font-text text-body text-ink">
          Assessment reference:{" "}
          <code className="font-mono text-caption">{assessmentId}</code>
        </p>
      ) : null}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button asChild variant="primary" size="lg">
          <a href={`mailto:asim@thectomentor.com?subject=${encodeURIComponent(
            assessmentId
              ? `Confidential conversation — assessment ${assessmentId}`
              : "Confidential conversation",
          )}`}>
            Email asim@thectomentor.com
          </a>
        </Button>
        {assessmentId ? (
          <Button asChild variant="secondary" size="lg">
            <Link href={`/assessment/r/${assessmentId}`}>Back to results</Link>
          </Button>
        ) : null}
      </div>
    </Section>
  );
}
