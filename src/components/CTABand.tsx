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
  /**
   * Hide the primary (assessment) CTA and promote the secondary
   * ("Request a confidential conversation") CTA to the prominent onDark button.
   */
  hidePrimary?: boolean;
}

/**
 * Full-bleed dark band. Primary CTA uses onDark (light fill); secondary is ghostOnDark.
 * When `hidePrimary` is set, only the secondary CTA renders — promoted to onDark.
 */
export function CTABand({ heading, body, scarcity, className, hidePrimary = false }: CTABandProps) {
  return (
    <Section spacing="standard" tone="dark" className={className}>
      <div className="max-w-measure">
        <h2 className="font-display text-h2 font-semibold text-ink-inverse">{heading}</h2>
        {body ? <p className="mt-4 font-text text-lead text-ink-inverse/85">{body}</p> : null}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          {!hidePrimary ? (
            <Button asChild variant="onDark" size="lg">
              <Link href={PRIMARY_CTA.href} className="inline-flex items-center gap-2.5">
                <span>{PRIMARY_CTA.label}</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            </Button>
          ) : null}
          <Button asChild variant={hidePrimary ? "onDark" : "ghostOnDark"} size="lg">
            <Link
              href={SECONDARY_CTA.href}
              className={hidePrimary ? "inline-flex items-center gap-2.5" : undefined}
            >
              <span>{SECONDARY_CTA.label}</span>
              {hidePrimary ? (
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              ) : null}
            </Link>
          </Button>
        </div>
        {scarcity ? (
          <p className={cn("mt-6 font-text text-small text-ink-inverse/70")}>{scarcity}</p>
        ) : null}
      </div>
    </Section>
  );
}
