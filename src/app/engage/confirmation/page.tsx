import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/layout/Section";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/cta";

export const metadata: Metadata = {
  title: "Application received",
  robots: { index: false, follow: false },
};

export default function EngageConfirmationPage() {
  return (
    <Section spacing="standard" tone="paper">
      <Eyebrow>Received</Eyebrow>
      <h1 className="mt-3 max-w-measure font-display text-h1 text-ink">Application received.</h1>
      <p className="mt-4 max-w-measure font-text text-lead text-ink-muted">
        I review applications personally. You will hear back within a few business days — either with a conversation
        invite or a clear decline. Silence is not the plan.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button asChild variant="primary" size="lg">
          <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Link>
        </Button>
        <Button asChild variant="secondary" size="lg">
          <Link href={SECONDARY_CTA.href}>{SECONDARY_CTA.label}</Link>
        </Button>
      </div>
    </Section>
  );
}
