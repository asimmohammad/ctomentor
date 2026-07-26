import Image from "next/image";
import { PROOF_LOGOS, PROOF_METRICS, type ProofLogo, type ProofMetric } from "@/config/proof-bar";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

export interface ProofBarProps {
  logos?: ProofLogo[];
  metrics?: ProofMetric[];
  className?: string;
}

/**
 * Data-driven proof strip: monochrome logos from config, or anonymized metric statements
 * when no logos are configured. Logos are droppable later without a code change.
 */
export function ProofBar({
  logos = PROOF_LOGOS,
  metrics = PROOF_METRICS,
  className,
}: ProofBarProps) {
  const showLogos = logos.length > 0;
  const items = showLogos ? logos : metrics.slice(0, 7);

  return (
    <Section spacing="compact" tone="alt" className={className}>
      {showLogos ? (
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {(items as ProofLogo[]).map((logo) => {
            const mark = (
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={40}
                className="h-8 w-auto object-contain opacity-70 grayscale"
              />
            );
            return (
              <li key={logo.name}>
                {logo.href ? (
                  <a href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={logo.name}>
                    {mark}
                  </a>
                ) : (
                  mark
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {(items as ProofMetric[]).map((metric) => (
            <li
              key={metric.statement}
              className={cn(
                "font-text text-small text-ink-muted",
                "before:mx-4 before:text-ink-faint before:content-['·'] first:before:content-none first:before:mx-0",
              )}
            >
              <span className="metric">{metric.statement}</span>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
