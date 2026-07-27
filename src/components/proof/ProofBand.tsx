"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Section } from "@/components/layout/Section";
import { analytics } from "@/lib/analytics";
import { getProofLogos, type ProofLogo } from "@/lib/proof";
import type { ProofLogoAsset } from "@/lib/proof-logos.generated";
import { cn } from "@/lib/utils";

type ProofBandProps = {
  className?: string;
  /**
   * When true, skip the outer Section/Container — for nesting inside a column
   * (e.g. /book left rail under "Who this is for").
   */
  embedded?: boolean;
  /** Skip lazy-load when the band is above the fold (homepage). */
  priority?: boolean;
};

function resolveAssetSrc(asset: ProofLogoAsset): string {
  return typeof asset === "string" ? asset : asset.src;
}

function logoMarkClass(hasDarkVariant: boolean) {
  return cn(
    "object-contain opacity-70 grayscale transition-[opacity,filter] duration-[var(--duration-standard)] ease-[var(--ease-standard)]",
    "group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100 group-focus-visible:grayscale-0",
    !hasDarkVariant &&
      "dark:brightness-0 dark:invert dark:group-hover:brightness-100 dark:group-hover:invert-0",
  );
}

function ProofLogoMark({
  logo,
  lazy,
  onLinkClick,
}: {
  logo: ProofLogo;
  lazy: boolean;
  onLinkClick?: () => void;
}) {
  const scale = logo.opticalScale ?? 1;
  const maxBoxWidth = 140 * scale;
  const hasDark = Boolean(logo.darkSrc);
  const markClass = cn(logoMarkClass(hasDark), "h-[22px] w-auto max-h-[22px] lg:h-[28px] lg:max-h-[28px]");
  const markStyle = { maxWidth: maxBoxWidth };

  const lightMark =
    logo.format === "svg" ? (
      // Third-party SVG via <img> — never inline untrusted markup.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolveAssetSrc(logo.src)}
        alt={logo.displayName}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        className={cn(markClass, hasDark && "dark:hidden")}
        style={markStyle}
      />
    ) : (
      <Image
        src={logo.src as StaticImageData}
        alt={logo.displayName}
        width={logo.width ?? 120}
        height={logo.height ?? 40}
        loading={lazy ? "lazy" : "eager"}
        className={cn(markClass, hasDark && "dark:hidden")}
        style={{ ...markStyle, height: "auto", width: "auto", maxHeight: "28px" }}
      />
    );

  const darkMark = hasDark ? (
    logo.format === "svg" ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolveAssetSrc(logo.darkSrc!)}
        alt={logo.displayName}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        className={cn(markClass, "hidden dark:block")}
        style={markStyle}
      />
    ) : (
      <Image
        src={logo.darkSrc as StaticImageData}
        alt={logo.displayName}
        width={logo.width ?? 120}
        height={logo.height ?? 40}
        loading={lazy ? "lazy" : "eager"}
        className={cn(markClass, "hidden dark:block")}
        style={{ ...markStyle, height: "auto", width: "auto", maxHeight: "28px" }}
      />
    )
  ) : null;

  const content = (
    <>
      {lightMark}
      {darkMark}
    </>
  );

  if (logo.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex shrink-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        onClick={onLinkClick}
      >
        {content}
      </a>
    );
  }

  return <span className="group inline-flex shrink-0 items-center">{content}</span>;
}

function LogoRow({
  logos,
  marquee,
  lazy,
}: {
  logos: ProofLogo[];
  marquee: boolean;
  lazy: boolean;
}) {
  const handleLogoClick = useCallback((slug: string) => {
    analytics.proofLogoClicked(slug);
  }, []);

  if (marquee) {
    return (
      <div className="proof-marquee group/marquee relative overflow-hidden">
        <ul className="proof-marquee-track flex w-max items-center">
          {logos.map((logo) => (
            <li key={logo.slug} className="flex shrink-0 items-center px-6">
              <ProofLogoMark
                logo={logo}
                lazy={lazy}
                onLinkClick={logo.href ? () => handleLogoClick(logo.slug) : undefined}
              />
            </li>
          ))}
          {logos.map((logo) => (
            <li key={`${logo.slug}-dup`} className="flex shrink-0 items-center px-6" aria-hidden="true">
              <ProofLogoMark logo={logo} lazy={lazy} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const count = logos.length;
  const layoutClass =
    count <= 6
      ? "flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
      : "grid grid-cols-2 place-items-center gap-x-10 gap-y-6 sm:grid-cols-3 lg:grid-cols-4";

  return (
    <ul className={layoutClass}>
      {logos.map((logo) => (
        <li key={logo.slug} className="flex items-center justify-center">
          <ProofLogoMark
            logo={logo}
            lazy={lazy}
            onLinkClick={logo.href ? () => handleLogoClick(logo.slug) : undefined}
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * Client logo band — auto-discovered from src/assets/logo/.
 * Renders nothing when the manifest is empty.
 */
export function ProofBand({ className, embedded = false, priority = false }: ProofBandProps) {
  const logos = getProofLogos();
  const observeRef = useRef<HTMLDivElement>(null);
  const [viewTracked, setViewTracked] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (logos.length === 0 || viewTracked) return;
    const node = observeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          analytics.proofBandViewed(logos.length);
          setViewTracked(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [logos.length, viewTracked]);

  if (logos.length === 0) {
    return null;
  }

  const count = logos.length;
  const useMarquee = count > 8 && !reduceMotion;
  const orgLabel = count === 1 ? "1 organization" : `${count} organizations`;

  const inner = (
    <div ref={observeRef}>
      <h2
        id={embedded ? "proof-band-heading-embedded" : "proof-band-heading"}
        className={cn(
          "font-mono text-eyebrow font-medium uppercase tracking-[0.12em] text-ink-muted",
          embedded ? "mb-5 text-left" : "mb-8 text-center",
        )}
      >
        {orgLabel}
      </h2>
      <LogoRow logos={logos} marquee={useMarquee} lazy={!priority} />
    </div>
  );

  if (embedded) {
    return <div className={cn("w-full", className)}>{inner}</div>;
  }

  return (
    <Section spacing="compact" tone="alt" className={className} aria-labelledby="proof-band-heading">
      {inner}
    </Section>
  );
}
