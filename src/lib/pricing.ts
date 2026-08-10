/**
 * Offer ladder — single source of truth for published engagement prices.
 * Display strings, meta lines, and schema priceFrom live here only.
 * Do not hardcode price strings in JSX.
 */

export type PricingTierId =
  | "fractional-cto"
  | "advisory"
  | "diagnostic-sprint"
  | "due-diligence"
  | "embedded"
  | "interim"
  | "portfolio-partner";

export type PricingTier = {
  id: PricingTierId;
  name: string;
  /** Exact display string shown on cards and tables. */
  priceDisplay: string;
  /** Cadence / shape line under the price. */
  meta: string;
  /** Lowest USD amount for schema Offer markup. */
  priceFrom: number;
  /** Optional upper bound for ranged offers (schema). */
  priceTo?: number;
  /**
   * Second commitment option, where a tier is sold at two lengths (brief §4).
   * Always a fixed total — never a monthly equivalent.
   */
  secondary?: {
    priceDisplay: string;
    meta: string;
    /** Why this option is the recommended one. */
    note?: string;
  };
  /** Hours-per-month band. Stated on every tier so the campaign's "20 hours" resolves. */
  effort: string;
  /** Published disqualifier. The "who this is not for" pattern, per tier. */
  notFor: string;
};

/**
 * Order is meaningful: it drives the services-page card order, the comparison
 * table columns, and the ItemList schema. The fractional seat leads because it
 * is the highest-volume engagement; Portfolio Technology Partner is last and is
 * kept off the homepage entirely — it is a fund product, not an operating-company one.
 */
export const PRICING_TIERS: readonly PricingTier[] = [
  {
    id: "fractional-cto",
    name: "Fractional CTO",
    priceDisplay: "$30,000",
    meta: "three-month minimum",
    priceFrom: 30000,
    secondary: {
      priceDisplay: "$50,000",
      meta: "six months",
      note: "the engagement that actually compounds — 17% below the three-month rate",
    },
    effort: "20–40 hrs per month",
    notFor:
      "Teams that already have a strong CTO who needs occasional advice, or anyone who needs a read in under three weeks — that is the Diagnostic Sprint.",
  },
  {
    id: "advisory",
    name: "Advisory",
    priceDisplay: "$15,000",
    meta: "three months",
    priceFrom: 15000,
    effort: "4–8 hrs per month",
    notFor:
      "Companies that need someone to own the roadmap. That is the fractional seat.",
  },
  {
    id: "diagnostic-sprint",
    name: "Diagnostic Sprint",
    priceDisplay: "$25,000 fixed",
    meta: "3 weeks · fixed scope",
    priceFrom: 25000,
    effort: "3 weeks, full attention",
    notFor:
      "Anyone who needs someone to stay and execute the plan. The Sprint ends with the plan.",
  },
  {
    id: "due-diligence",
    name: "Technical Due Diligence",
    priceDisplay: "$35,000–$50,000",
    meta: "per transaction",
    priceFrom: 35000,
    priceTo: 50000,
    effort: "2–4 weeks per transaction",
    notFor: "Post-close remediation. That is the Diagnostic Sprint or the fractional seat.",
  },
  {
    id: "embedded",
    name: "Embedded Technology Leadership",
    priceDisplay: "From $50,000",
    meta: "six months · 1–2 days per week",
    priceFrom: 50000,
    effort: "1–2 days per week",
    notFor: "Teams that need direction more than they need capacity.",
  },
  {
    id: "interim",
    name: "Interim / Transition",
    priceDisplay: "$50,000",
    meta: "six months · embedded",
    priceFrom: 50000,
    effort: "1–2 days per week",
    notFor: "Indefinite coverage. This tier is designed to end.",
  },
  {
    id: "portfolio-partner",
    name: "Portfolio Technology Partner",
    priceDisplay: "From $50,000/month",
    meta: "fund retainer",
    priceFrom: 50000,
    effort: "Standing capacity across the portfolio",
    notFor: "Single-company engagements. This is a fund-level retainer.",
  },
];

export type PricingTierEntry = (typeof PRICING_TIERS)[number];

export const PRICING_BY_ID: Record<PricingTierId, PricingTierEntry> = {
  "fractional-cto": PRICING_TIERS[0],
  advisory: PRICING_TIERS[1],
  "diagnostic-sprint": PRICING_TIERS[2],
  "due-diligence": PRICING_TIERS[3],
  embedded: PRICING_TIERS[4],
  interim: PRICING_TIERS[5],
  "portfolio-partner": PRICING_TIERS[6],
};

/**
 * Homepage Engagement Models cards. Portfolio Technology Partner is deliberately
 * absent — it maps to no operating-company buyer (brief §4).
 */
export const HOMEPAGE_PRICING_TIERS = [
  PRICING_BY_ID.advisory,
  PRICING_BY_ID["fractional-cto"],
  PRICING_BY_ID.embedded,
  PRICING_BY_ID.interim,
] as const;

/**
 * Qualification callouts — composed from ladder figures so JSX never hardcodes them.
 */
export const ENTRY_ENGAGEMENT_LINE =
  `Most engagements start with a $${PRICING_BY_ID["fractional-cto"].priceFrom.toLocaleString("en-US")} fractional quarter or a $${PRICING_BY_ID["diagnostic-sprint"].priceFrom.toLocaleString("en-US")} Diagnostic Sprint.` as const;

export const DILIGENCE_PRICE_LINE =
  `${PRICING_BY_ID["due-diligence"].priceDisplay} ${PRICING_BY_ID["due-diligence"].meta}` as const;

/**
 * Why the fractional seat has a three-month floor. Published rather than
 * defended in the call (brief §4).
 */
export const FRACTIONAL_MINIMUM_RATIONALE =
  "The first thirty days are mostly listening — every engineer, the codebase, the incident history. The plan lands at day 30. Month two is when your team starts executing it. An engagement shorter than that buys you a diagnosis you do not have time to act on, and I would rather sell you the Diagnostic Sprint." as const;

/** Floor for published prices site-wide (brief §2 / §4). */
export const PRICE_FLOOR_USD = 15000 as const;

export const PRICE_FLOOR_DISPLAY = `$${PRICE_FLOOR_USD.toLocaleString("en-US")}` as const;

/**
 * /engage Budget select — labels match the ladder; no option below $25,000.
 */
export const BUDGET_SELECT_OPTIONS = [
  {
    value: "sprint-25k",
    label: "$25,000 fixed-scope Diagnostic Sprint",
  },
  {
    value: "monthly-25-50k",
    label: "$25,000–$50,000 per month",
  },
  {
    value: "monthly-50k-plus",
    label: "$50,000+ per month",
  },
  {
    value: "diligence",
    label: "Per-transaction diligence",
  },
  {
    value: "not-sure",
    label: "Not sure yet",
  },
] as const;

export type BudgetSelectValue = (typeof BUDGET_SELECT_OPTIONS)[number]["value"];

/** Aggregate priceRange for Service / ItemList schema. */
export const SITE_PRICE_RANGE = `${PRICE_FLOOR_DISPLAY}–$${PRICING_BY_ID["portfolio-partner"].priceFrom.toLocaleString("en-US")}+` as const;

export function offerForTier(tier: PricingTier) {
  const offer: {
    "@type": "Offer";
    priceCurrency: "USD";
    price: string;
    priceSpecification?: {
      "@type": "PriceSpecification";
      priceCurrency: "USD";
      minPrice: string;
      maxPrice: string;
    };
  } = {
    "@type": "Offer",
    priceCurrency: "USD",
    price: String(tier.priceFrom),
  };

  if (tier.priceTo != null) {
    offer.priceSpecification = {
      "@type": "PriceSpecification",
      priceCurrency: "USD",
      minPrice: String(tier.priceFrom),
      maxPrice: String(tier.priceTo),
    };
  }

  return offer;
}

export function serviceSchemaForTier(tier: PricingTier, site: string, description: string) {
  return {
    "@type": "Service" as const,
    name: tier.name,
    description,
    provider: { "@type": "Person" as const, name: "Asim Mohammad", url: site },
    url: `${site}/engagements#${tier.id}`,
    priceRange: tier.priceDisplay,
    offers: offerForTier(tier),
  };
}
