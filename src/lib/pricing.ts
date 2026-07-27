/**
 * Offer ladder — single source of truth for published engagement prices.
 * Display strings, meta lines, and schema priceFrom live here only.
 * Do not hardcode price strings in JSX.
 */

export type PricingTierId =
  | "diagnostic-sprint"
  | "embedded"
  | "due-diligence"
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
};

export const PRICING_TIERS = [
  {
    id: "diagnostic-sprint",
    name: "Diagnostic Sprint",
    priceDisplay: "$25,000 fixed",
    meta: "3 weeks · fixed scope",
    priceFrom: 25000,
  },
  {
    id: "embedded",
    name: "Embedded Technology Leadership",
    priceDisplay: "From $25,000/month",
    meta: "3-month minimum · 1–2 days per week",
    priceFrom: 25000,
  },
  {
    id: "due-diligence",
    name: "Technical Due Diligence",
    priceDisplay: "$35,000–$50,000",
    meta: "per transaction",
    priceFrom: 35000,
    priceTo: 50000,
  },
  {
    id: "portfolio-partner",
    name: "Portfolio Technology Partner",
    priceDisplay: "From $50,000/month",
    meta: "fund retainer",
    priceFrom: 50000,
  },
] as const satisfies readonly PricingTier[];

export type PricingTierEntry = (typeof PRICING_TIERS)[number];

export const PRICING_BY_ID: Record<PricingTierId, PricingTierEntry> = {
  "diagnostic-sprint": PRICING_TIERS[0],
  embedded: PRICING_TIERS[1],
  "due-diligence": PRICING_TIERS[2],
  "portfolio-partner": PRICING_TIERS[3],
};

/** Homepage Engagement Models cards — three entry tiers. */
export const HOMEPAGE_PRICING_TIERS = [
  PRICING_BY_ID["diagnostic-sprint"],
  PRICING_BY_ID.embedded,
  PRICING_BY_ID["due-diligence"],
] as const;

/**
 * Qualification callouts — composed from ladder figures so JSX never hardcodes them.
 */
export const ENTRY_ENGAGEMENT_LINE =
  `Most engagements start with a $${PRICING_BY_ID["diagnostic-sprint"].priceFrom.toLocaleString("en-US")} Diagnostic Sprint.` as const;

export const DILIGENCE_PRICE_LINE =
  `${PRICING_BY_ID["due-diligence"].priceDisplay} ${PRICING_BY_ID["due-diligence"].meta}` as const;

/** Floor for published prices site-wide (brief §2 / §4). */
export const PRICE_FLOOR_USD = 25000 as const;

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

export function offerForTier(tier: PricingTierEntry) {
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

export function serviceSchemaForTier(tier: PricingTierEntry, site: string, description: string) {
  return {
    "@type": "Service" as const,
    name: tier.name,
    description,
    provider: { "@type": "Person" as const, name: "Asim Mohammad", url: site },
    url: `${site}/engagements#${tier.id}`,
    priceRange: tier.priceTo != null ? `${tier.priceDisplay}` : tier.priceDisplay,
    offers: offerForTier(tier),
  };
}
