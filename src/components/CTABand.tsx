import Link from "next/link";
import { Button } from "@/components/Button";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

export interface CTABandProps {
  /** Section heading. */
  heading: string;
  /** Optional supporting copy. */
  body?: string;
  /** Scarcity or capacity line under the CTAs. */
  scarcity?: string;
  className?: string;
}

/**
 * Full-bleed dark band restating both site-wide CTAs.
 */
export function CTABand({ heading, body, scarcity, className }: CTABandProps) {
  return (
    <Section spacing="standard" tone="dark" className={className}>
      <div className="max-w-measure">
        <h2 className="font-display text-h2 text-ink-inverse">{heading}</h2>
        {body ? <p className="mt-4 font-text text-lead text-ink-inverse/85">{body}</p> : null}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button asChild variant="primary" size="lg">
            <Link href="/assessment" className="inline-flex items-center gap-2">
              Take the Technical Risk Assessment
              <span aria-hidden="true">→</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="border-ink-inverse text-ink-inverse hover:bg-ink-inverse hover:text-dark-band"
          >
            <Link href="/book">Request a confidential conversation</Link>
          </Button>
        </div>
        {scarcity ? (
          <p className={cn("mt-6 font-text text-small text-ink-inverse/70")}>{scarcity}</p>
        ) : null}
      </div>
    </Section>
  );
}
