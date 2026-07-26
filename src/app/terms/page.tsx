import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Terms",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <Section spacing="standard" tone="paper">
      <div className="measure">
        <h1 className="font-display text-h1 text-ink">Terms</h1>
        <p className="mt-6 font-text text-body text-ink-muted">
          Engagement terms, assessment disclaimers, and site terms of use will be published here before the Technical
          Risk Assessment is opened to cold traffic.
        </p>
        <p className="mt-4 font-text text-body text-ink-muted">
          Contact:{" "}
          <a className="text-accent hover:text-accent-hover" href="mailto:asim@thectomentor.com">
            asim@thectomentor.com
          </a>
        </p>
      </div>
    </Section>
  );
}
