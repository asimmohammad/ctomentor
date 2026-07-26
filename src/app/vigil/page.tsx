import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { VigilQualifyForm } from "@/components/vigil/VigilQualifyForm";
import { Grid, GridItem } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { PRIMARY_CTA } from "@/lib/cta";

export const metadata: Metadata = {
  title: "Vigil — autonomous QA and the advisory practice",
  description:
    "Teams are shipping AI-generated code faster than they can verify it. How Vigil (Helix Platform) relates to the advisory practice — with an explicit conflict-of-interest disclosure.",
  alternates: { canonical: "https://thectomentor.com/vigil" },
};

export default function VigilPage() {
  return (
    <>
      <Section spacing="standard" tone="paper">
        <Eyebrow>Vigil · Helix Platform</Eyebrow>
        <h1 className="mt-3 max-w-measure font-display text-h1 text-ink">
          Teams are shipping AI-generated code faster than they can verify it.
        </h1>
        <p className="mt-6 max-w-measure font-text text-lead text-ink-muted">
          That is the 2026 operating problem. Merge volume goes up. Review capacity does not. Escaped defects show up in
          the metrics before anyone names the cause.
        </p>
      </Section>

      <Section spacing="standard" tone="alt">
        <h2 className="font-display text-h2 text-ink">What I find in diagnostics</h2>
        <p className="mt-4 max-w-measure font-text text-lead text-ink-muted">
          The recurring pattern is not “engineers are lazy.” It is confidence without context: plausible code against
          weak specs, tests that assert the easy path, and a release gate that cannot keep pace with how fast diffs
          arrive — especially when AI assistants fill the backlog.
        </p>
        <ul className="mt-8 max-w-measure list-none space-y-4">
          {[
            "Change failure rate and rollback climb in the same quarter AI coding tools land.",
            "Coverage looks fine on paper; customer-visible failures still escape.",
            "QA headcount is flat while merge rate is not — verification becomes the scarce resource.",
          ].map((item) => (
            <li key={item} className="font-text text-body text-ink-muted">
              <span className="text-accent" aria-hidden="true">
                —{" "}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section spacing="standard" tone="paper">
        <h2 className="font-display text-h2 text-ink">What Vigil does about it</h2>
        <p className="mt-4 max-w-measure font-text text-lead text-ink-muted">
          Vigil is a spec-driven autonomous QA platform built on a 10-agent pipeline on AWS AgentCore. Outcome framing
          only — not a feature tour:
        </p>
        <Grid className="mt-10">
          {[
            {
              title: "Coverage that tracks risk",
              body: "Verification effort concentrates where product risk concentrates — not where unit tests are cheapest to write.",
            },
            {
              title: "Fewer escaped defects",
              body: "Failures that would have reached customers are caught against executable intent before release.",
            },
            {
              title: "QA capacity without linear headcount",
              body: "Teams displace the need to grow manual QA one-for-one with merge volume.",
            },
          ].map((card) => (
            <GridItem key={card.title} span={12} md={4}>
              <h3 className="font-text text-h4 text-ink">{card.title}</h3>
              <p className="mt-3 font-text text-body text-ink-muted">{card.body}</p>
            </GridItem>
          ))}
        </Grid>
        <p className="mt-10 max-w-measure font-text text-small text-ink-muted">
          Product site:{" "}
          <a
            href="https://helixbots.ai"
            className="text-accent underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            helixbots.ai
          </a>
        </p>
      </Section>

      <Section spacing="standard" tone="dark">
        <Eyebrow className="text-ink-inverse/60">Conflict of interest</Eyebrow>
        <h2 className="mt-3 max-w-measure font-display text-h2 text-ink-inverse">
          I co-founded Helix Platform and serve as its CEO.
        </h2>
        <p className="mt-6 max-w-measure font-text text-lead text-ink-inverse/90">
          Vigil is built by <strong className="text-ink-inverse">Helix Platform, Inc.</strong> I have an ownership
          interest. When advisory work surfaces a quality-system failure, Vigil may be one implementation path I name —
          clearly labeled as such.
        </p>
        <p className="mt-4 max-w-measure font-text text-body text-ink-inverse/85">
          Advisory clients are never obligated to adopt Vigil. You can take the Technical Risk Assessment, book a
          conversation, or run a Diagnostic Sprint without ever speaking to Helix. Choosing another vendor, hiring QA,
          or fixing process alone is always on the table.
        </p>
        <p className="mt-4 max-w-measure font-text text-body text-ink-inverse/85">
          The transparency is the point. Buried affiliations destroy trust; stated ones let you weight the recommendation
          yourself.
        </p>
      </Section>

      <Section spacing="standard" tone="alt">
        <Grid className="items-start">
          <GridItem span={12} lg={5}>
            <h2 className="font-display text-h2 text-ink">Next step</h2>
            <p className="mt-4 font-text text-body text-ink-muted">
              If the binding problem is verification capacity, use the form. If you need an independent read of risk
              first, start with the assessment — that path stays on the advisory side.
            </p>
            <div className="mt-8">
              <Button asChild variant="secondary" size="lg">
                <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Link>
              </Button>
            </div>
          </GridItem>
          <GridItem span={12} lg={7}>
            <VigilQualifyForm />
          </GridItem>
        </Grid>
      </Section>
    </>
  );
}
