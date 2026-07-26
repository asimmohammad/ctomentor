/**
 * Proof bar configuration.
 * Drop logo files under /public/logos and add entries here — no component code change required.
 */
export type ProofLogo = {
  /** Accessible name of the client / mark. */
  name: string;
  /** Path under /public, e.g. /logos/acme.svg */
  src: string;
  href?: string;
};

export type ProofMetric = {
  statement: string;
};

export const PROOF_LOGOS: ProofLogo[] = [
  // Example (disabled until assets exist):
  // { name: "Acme Capital", src: "/logos/acme.svg" },
];

export const PROOF_METRICS: ProofMetric[] = [
  { statement: "$600M exit — technical readiness" },
  { statement: "SOC 2 Type II in 6 months" },
  { statement: "38% cloud spend reduction" },
  { statement: "15+ portfolio companies advised" },
];
