import Image, { type StaticImageData } from "next/image";
import { Section } from "@/components/layout/Section";
import { getProofOutcomes } from "@/lib/proof";
import type { ProofLogoAsset } from "@/lib/proof-logos.generated";
import { cn } from "@/lib/utils";

function resolveAssetSrc(asset: ProofLogoAsset): string {
  return typeof asset === "string" ? asset : asset.src;
}

function OutcomeLogo({
  src,
  displayName,
  format,
}: {
  src: ProofLogoAsset;
  displayName: string;
  format: "svg" | "png" | "webp";
}) {
  if (format === "svg") {
    return (
      // Third-party SVG via <img> — never inline untrusted markup.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolveAssetSrc(src)}
        alt={displayName}
        loading="lazy"
        decoding="async"
        className="h-5 w-auto max-w-[6rem] object-contain opacity-80"
      />
    );
  }

  const data = src as StaticImageData;
  return (
    <Image
      src={data}
      alt={displayName}
      width={data.width ?? 80}
      height={data.height ?? 24}
      loading="lazy"
      className="h-5 w-auto max-w-[6rem] object-contain opacity-80"
    />
  );
}

type ProofResultsProps = {
  className?: string;
};

/**
 * Large outcome statements for logos with `outcome` metadata.
 * Renders nothing when no outcomes are configured.
 */
export function ProofResults({ className }: ProofResultsProps) {
  const outcomes = getProofOutcomes(3);

  if (outcomes.length === 0) {
    return null;
  }

  return (
    <Section spacing="standard" tone="paper" className={className} aria-labelledby="proof-results-heading">
      <h2 id="proof-results-heading" className="sr-only">
        Client outcomes
      </h2>
      <ul className="divide-y divide-border border-y border-border">
        {outcomes.map((item) => (
          <li key={item.slug} className="py-10 first:pt-0 last:pb-0">
            <div className={cn("flex flex-col gap-6 md:flex-row md:items-start md:justify-between")}>
              <div className="max-w-measure flex-1">
                <p className="font-display text-h2 font-semibold text-ink">{item.outcome}</p>
                {item.context ? (
                  <p className="mt-3 font-text text-body text-ink-muted">{item.context}</p>
                ) : null}
              </div>
              <div className="shrink-0 md:pt-1">
                <OutcomeLogo src={item.src} displayName={item.displayName} format={item.format} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
