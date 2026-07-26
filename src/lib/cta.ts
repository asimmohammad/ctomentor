/**
 * Canonical site-wide CTAs. Do not invent a third label.
 * @see PROJECT_BRIEF.md §2
 */
export const PRIMARY_CTA = {
  label: "Take the Technical Risk Assessment",
  href: "/assessment",
} as const;

export const SECONDARY_CTA = {
  label: "Request a confidential conversation",
  href: "/book",
} as const;

export type CtaKey = "primary" | "secondary";

export const CTAS = {
  primary: PRIMARY_CTA,
  secondary: SECONDARY_CTA,
} as const;

/** Bottom-of-funnel only — never link cold traffic here. */
export const ENGAGE_PATH = "/engage" as const;
