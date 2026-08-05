import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/layout/Section";
import { UnsubscribeForm } from "@/components/UnsubscribeForm";

export const metadata: Metadata = {
  title: "Unsubscribe | The CTO Mentor",
  description: "Remove your address from outreach from Asim Mohammad.",
  robots: { index: false, follow: false },
};

export default function UnsubscribePage() {
  return (
    <Section spacing="standard" tone="paper">
      <div className="measure">
        <h1 className="font-display text-h1 text-ink">Unsubscribe</h1>
        <p className="mt-6 font-text text-body text-ink-muted">
          One click and you are off the list. No survey, no confirmation email, and no further
          outreach from me.
        </p>
        <Suspense fallback={null}>
          <UnsubscribeForm />
        </Suspense>
        <p className="mt-10 font-text text-caption text-ink-muted">
          This removes you from outreach only. If you have taken the Technical Risk Assessment, your
          results link keeps working. See the{" "}
          <a className="text-accent hover:text-accent-hover" href="/privacy">
            privacy policy
          </a>{" "}
          for how contact data is handled.
        </p>
      </div>
    </Section>
  );
}
