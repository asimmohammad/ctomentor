import type { Lead, LeadRole } from "./machine";

export const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
] as const;

export const ROLE_OPTIONS: { value: LeadRole; label: string }[] = [
  { value: "investor-operating-partner", label: "Investor / Operating Partner" },
  { value: "ceo-founder", label: "CEO / Founder" },
  { value: "cto-vp-engineering", label: "CTO / VP Engineering" },
  { value: "board-member", label: "Board Member" },
  { value: "other", label: "Other" },
];

export const FREE_EMAIL_WARNING =
  "A work email lets me benchmark you against your peer set.";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type LeadErrors = Partial<Record<keyof Lead, string>>;

export function isFreeEmailDomain(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain) return false;
  return (FREE_EMAIL_DOMAINS as readonly string[]).includes(domain);
}

/** Warn — never block — on consumer email domains. */
export function freeEmailWarning(email: string): string | null {
  if (!EMAIL_PATTERN.test(email)) return null;
  return isFreeEmailDomain(email) ? FREE_EMAIL_WARNING : null;
}

export function validateLead(lead: Lead): LeadErrors {
  const errors: LeadErrors = {};

  if (!lead.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!EMAIL_PATTERN.test(lead.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!lead.name.trim()) {
    errors.name = "Enter your name.";
  }

  if (!lead.company.trim()) {
    errors.company = "Enter your company or fund.";
  }

  if (!lead.role) {
    errors.role = "Select your role.";
  }

  return errors;
}

export function hasErrors(errors: LeadErrors): boolean {
  return Object.keys(errors).length > 0;
}
