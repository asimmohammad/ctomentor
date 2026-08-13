import {
  PROOF_LOGO_MANIFEST,
  type ProofLogoManifestEntry,
} from "./proof-logos.generated";

export type ProofLogoMetadata = {
  href?: string;
  context?: string;
  outcome?: string;
  opticalScale?: number;
  sector?: string;
};

/** Exact company capitalization overrides keyed by slug. */
export const DISPLAY_NAME_OVERRIDES: Record<string, string> = {
  meetava: "MeetAva",
  "global-neurodiagnostics": "Global Neurodiagnostics",
  legalguard: "LegalGuard",
  "legalease-solutions": "LegalEase Solutions",
  zappd: "Zappd",
  laasy: "LaaSy Inc.",
  "patron-health": "Patron Health",
  "wow-health": "WoW Health",
};

/** Optional enrichment keyed by slug. Logos without metadata still render. */
export const PROOF_LOGO_METADATA: Record<string, ProofLogoMetadata> = {
  "wow-health": {
    href: "https://www.mywowhealth.com/",
    sector: "Healthcare",
    // Wide horizontal lockup — trimmed so it reads at the same optical weight
    // as LegalGuard / LaaSy rather than dominating the row.
    opticalScale: 0.85,
  },
  // Example:
  // "acme-corp": {
  //   href: "https://example.com",
  //   context: "Series B SaaS diligence",
  //   outcome: "38% cloud spend reduction",
  //   opticalScale: 1.1,
  //   sector: "B2B SaaS",
  // },
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  /** ISO date — required before a testimonial may render. */
  permissionOn: string;
  headshot?: string;
};

export const TESTIMONIALS: Testimonial[] = [];

export type ProofLogo = ProofLogoManifestEntry &
  ProofLogoMetadata & {
    displayName: string;
    opticalScale: number;
  };

function mergeEntry(entry: ProofLogoManifestEntry): ProofLogo {
  const meta = PROOF_LOGO_METADATA[entry.slug] ?? {};
  return {
    ...entry,
    ...meta,
    displayName: DISPLAY_NAME_OVERRIDES[entry.slug] ?? entry.displayName,
    opticalScale: meta.opticalScale ?? 1,
  };
}

/** Manifest entries merged with metadata and display-name overrides, sorted. */
export function getProofLogos(): ProofLogo[] {
  return PROOF_LOGO_MANIFEST.map(mergeEntry).sort((a, b) => {
    const order = a.sortOrder - b.sortOrder;
    return order !== 0 ? order : a.slug.localeCompare(b.slug);
  });
}

/** Up to three logos that have an outcome value — for ProofResults. */
export function getProofOutcomes(max = 3): ProofLogo[] {
  return getProofLogos().filter((logo) => Boolean(logo.outcome)).slice(0, max);
}

/** Testimonials with permission granted, capped for homepage display. */
export function getPermittedTestimonials(max = 2): Testimonial[] {
  return TESTIMONIALS.filter((t) => Boolean(t.permissionOn)).slice(0, max);
}
