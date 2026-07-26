"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Section } from "@/components/layout/Section";
import { DimensionBarChart } from "@/components/assessment/DimensionBarChart";
import { CopyLinkButton } from "@/components/assessment/CopyLinkButton";
import { DownloadPdfButton } from "@/components/assessment/DownloadPdfButton";
import type { PublicAssessmentResult } from "@/lib/assessment/store";
import { analytics } from "@/lib/analytics";
import { SECONDARY_CTA } from "@/lib/cta";

const SHORT_LABELS: Record<string, string> = {
  velocity: "Velocity & delivery",
  quality: "Quality & coverage",
  security: "Security & compliance",
  team: "Team & key-person",
};

export function ResultsView({
  result,
  shareUrl,
}: {
  result: PublicAssessmentResult;
  shareUrl: string;
}) {
  const { score } = result;

  React.useEffect(() => {
    analytics.resultsViewed(result.variant, result.id, score.overall);
  }, [result.variant, result.id, score.overall]);

  return (
    <div className="bg-paper text-ink">
      <Section spacing="standard" tone="paper">
        <Eyebrow>{result.framingName}</Eyebrow>
        <p className="mt-3 font-text text-small text-ink-muted">
          {result.firstName} · {result.company}
        </p>

        <p className="metric mt-8 font-display text-hero leading-none text-ink">{score.overall}</p>
        <p className="mt-3 font-display text-h2 text-ink">
          Level {score.tier.level} {score.tier.name}
        </p>
        <p className="mt-4 max-w-measure font-text text-lead text-ink-muted">
          Overall score is the mean of four dimension scores, each normalized to 0–100.
        </p>

        <div className="mt-8">
          <CopyLinkButton
            url={shareUrl}
            onCopied={() => {
              analytics.ctaClicked(result.variant, result.id, "copy_link");
              analytics.shared(result.variant, result.id);
            }}
          />
        </div>
      </Section>

      <Section spacing="standard" tone="alt">
        <Eyebrow>Dimensions</Eyebrow>
        <h2 className="mt-3 font-display text-h2 text-ink">Against the stage median</h2>
        <div className="mt-8">
          <DimensionBarChart
            dimensions={score.dimensions.map((dimension) => ({
              id: dimension.id,
              label: SHORT_LABELS[dimension.id] ?? dimension.name,
              value: dimension.percentage,
              benchmark: result.benchmarks[dimension.id] ?? 50,
            }))}
          />
        </div>
      </Section>

      <Section spacing="standard" tone="paper">
        <Eyebrow>By dimension</Eyebrow>
        <h2 className="mt-3 font-display text-h2 text-ink">What the answers imply</h2>
        <div className="mt-10 space-y-10">
          {result.narratives.map((narrative) => (
            <article key={narrative.id} className="border-t border-border pt-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-text text-h4 text-ink">{narrative.name}</h3>
                <p className="metric font-display text-h3 text-ink">{narrative.percentage}</p>
              </div>
              <p className="mt-4 max-w-measure font-text text-body text-ink-muted">
                {narrative.interpretation}
              </p>
              <p className="mt-4 max-w-measure font-text text-body text-ink">
                <span className="font-medium">Recommended action. </span>
                {narrative.action}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section spacing="standard" tone="alt">
        <Eyebrow>Priorities</Eyebrow>
        <h2 className="mt-3 font-display text-h2 text-ink">Your three highest-risk areas</h2>
        <ol className="mt-8 list-none space-y-6">
          {result.risks.map((risk, index) => (
            <li key={risk.questionId} className="border border-border bg-surface p-6">
              <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-muted">
                {index + 1} · {risk.dimensionName} · score {risk.score}/3
              </p>
              <h3 className="mt-3 font-text text-h4 text-ink">{risk.prompt}</h3>
              <p className="mt-3 max-w-measure font-text text-body text-ink-muted">{risk.action}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section spacing="standard" tone="dark" className="print:hidden">
        <Eyebrow className="text-ink-inverse/60">Next step</Eyebrow>
        <h2 className="mt-3 font-display text-h2 text-ink-inverse">Turn the score into a plan.</h2>
        <p className="mt-4 max-w-measure font-text text-lead text-ink-inverse/85">
          A confidential conversation is how most Diagnostic Sprints start after this assessment.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <Button asChild variant="primary" size="lg">
            <Link
              href={`/book?assessment=${result.id}`}
              onClick={() => analytics.ctaClicked(result.variant, result.id, "book")}
            >
              {SECONDARY_CTA.label}
            </Link>
          </Button>
          <DownloadPdfButton
            className="border-ink-inverse text-ink-inverse hover:bg-ink-inverse hover:text-dark-band"
            onClick={() => analytics.ctaClicked(result.variant, result.id, "pdf")}
          />
        </div>
      </Section>

      <Section spacing="standard" tone="paper" className="print:hidden" id="newsletter">
        <Eyebrow>Stay informed</Eyebrow>
        <h2 className="mt-3 max-w-measure font-display text-h2 text-ink">
          Operating notes for people who underwrite technology risk.
        </h2>
        <div
          onFocusCapture={() => analytics.ctaClicked(result.variant, result.id, "newsletter")}
        >
          <NewsletterForm />
        </div>
      </Section>
    </div>
  );
}
