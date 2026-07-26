import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { Section } from "@/components/layout/Section";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/cta";
import { cn } from "@/lib/utils";

export interface CTABandProps {
  heading: string;
  body?: string;
  scarcity?: string;
  className?: string;
}

/**
 * Full-bleed dark band. Primary CTA gets the accent fill; secondary stays ghost-weight.
 */
export function CTABand({ heading, body, scarcity, className }: CTABandProps) {
  return (
    <Section spacing="standard" tone="dark" className={className}>
      <div className="max-w-measure">
        <h2 className="font-display text-h2 font-semibold text-ink-inverse">{heading}</h2>
        {body ? <p className="mt-4 font-text text-lead text-ink-inverse/85">{body}</p> : null}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button asChild variant="onDark" size="lg">
            <Link href={PRIMARY_CTA.href} className="inline-flex items-center gap-2.5">
              <span>{PRIMARY_CTA.label}</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-ink-inverse hover:text-ink-inverse"
          >
            <Link href={SECONDARY_CTA.href}>{SECONDARY_CTA.label}</Link>
          </Button>
        </div>
        {scarcity ? (
          <p className={cn("mt-6 font-text text-small text-ink-inverse/70")}>{scarcity}</p>
        ) : null}
      </div>
    </Section>
  );
}
