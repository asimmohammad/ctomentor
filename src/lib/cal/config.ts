/**
 * Cal.com booking config — username + event from env.
 * Live event: https://cal.com/asim-mohammad-0ydj0s/technical-risk-conversation
 */

export const CAL_USERNAME =
  process.env.NEXT_PUBLIC_CAL_USERNAME?.trim() || "asim-mohammad-0ydj0s";

export const CAL_EVENT_SLUG =
  process.env.NEXT_PUBLIC_CAL_EVENT_SLUG?.trim() || "technical-risk-conversation";

export const CAL_LINK = `${CAL_USERNAME}/${CAL_EVENT_SLUG}` as const;

export const CAL_PUBLIC_URL = `https://cal.com/${CAL_LINK}` as const;

/** Hex mirrors of design tokens for Cal cssVarsPerTheme (Cal cannot read CSS vars). */
export const CAL_THEME_LIGHT = {
  "cal-brand": "#2a2825",
  "cal-brand-emphasis": "#16130f",
  "cal-brand-text": "#faf8f4",
  "cal-brand-subtle": "#f2efe9",
  "cal-text": "#16130f",
  "cal-text-emphasis": "#16130f",
  "cal-text-muted": "#6b655c",
  "cal-bg": "#faf8f4",
  "cal-bg-emphasis": "#f2efe9",
  "cal-bg-subtle": "#ffffff",
  "cal-bg-muted": "#f2efe9",
  "cal-border": "#ddd8ce",
  "cal-border-emphasis": "#16130f",
  "cal-border-booker": "#ddd8ce",
} as const;

export type BookAssessmentContext = {
  id: string;
  name: string;
  email: string;
  company: string;
  overall: number;
  tierLabel: string;
  weakestDimension: string;
  /** Suggested starting sentence for Cal "What's driving this?" — editable in embed. */
  driverSuggestion: string;
  dimensionBreakdown: { name: string; percentage: number }[];
};
