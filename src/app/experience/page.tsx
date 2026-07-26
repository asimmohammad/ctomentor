import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Our Experience | The CTO Mentor",
  description:
    "Battle-tested technology leadership experience across stages, industries, and risk environments underpinning strategic and embedded leadership engagements.",
  alternates: { canonical: "https://thectomentor.com/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="generous" tone="alt">
        <div className="max-w-4xl">
          <h1 className="font-display text-h1 text-ink">
            Our Experience
          </h1>
          <p className="mt-6 text-lead font-text text-ink-muted">
            My credibility comes from repeated exposure to real operating complexity—not abstract theory. This is the
            experience behind my strategic and embedded leadership engagements.
          </p>
          <p className="mt-4 text-lead font-text text-ink">
            When you engage TCM, you're hiring a firm with battle-tested operators who have seen these patterns before.
          </p>
        </div>
      </Section>

      {/* Final CTA */}
      <Section spacing="standard" tone="dark">
        <div className="max-w-2xl">
          <h2 className="font-display text-h2 text-ink-inverse mb-6">
            When technology execution is critical, experience matters.
          </h2>
          <p className="text-lead font-text text-ink-inverse/90 mb-10">
            This experience is what you're hiring when you engage me for embedded leadership. Battle-tested execution
            that has seen these patterns before and delivers immediate impact.
          </p>
          <Link href="/assessment">
            <Button
              variant="outline"
              size="xl"
              className="border-ink-inverse/30 text-ink-inverse hover:bg-ink-inverse hover:text-dark-band"
            >
              Take the Technical Risk Assessment
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
