import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <Section spacing="standard" tone="paper">
      <div className="measure">
        <h1 className="font-display text-h1 text-ink">Privacy Policy</h1>
        <p className="mt-6 font-text text-body text-ink-muted">
          This page will describe how contact, assessment, and engagement data is collected and used. Full policy copy
          will be published before paid traffic is sent to the assessment.
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
