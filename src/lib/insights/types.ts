/**
 * Insights content model and catalog.
 * @see PROJECT_BRIEF.md §6–7
 */

export const INSIGHT_CATEGORIES = [
  "Technology Strategy",
  "Engineering Leadership",
  "Leadership",
  "AI & Strategy",
  "Security & Compliance",
  "Due Diligence",
  "Government Technology",
  "QA & Quality",
] as const;

export type InsightCategory = (typeof INSIGHT_CATEGORIES)[number];

export type ContentKind = "article" | "briefing";

export type InsightPiece = {
  title: string;
  date: string;
  dateIso: string;
  category: InsightCategory;
  description: string;
  /** Full body paragraphs. Briefings: unlocked content only. */
  body: string[];
  kind: ContentKind;
  featured?: boolean;
  /** When set, metadata canonical points here (cross-post / Substack original). */
  substackUrl?: string;
  /** Briefing only — shown before email gate. */
  teaser?: string[];
};

export type ContextualCta = {
  heading: string;
  body: string;
  label: string;
  href: string;
};

/** Mid-article CTA destination by category. */
export function contextualCtaForCategory(category: InsightCategory): ContextualCta {
  if (category === "Security & Compliance" || category === "Government Technology") {
    return {
      heading: "How exposed is the stack?",
      body: "Twelve questions. A scored report you can share with partners before the next diligence call.",
      label: "Take the Technical Risk Assessment",
      href: "/assessment",
    };
  }
  if (category === "Due Diligence") {
    return {
      heading: "See how diligence work is scoped.",
      body: "Diagnostic Sprint, embedded leadership, and per-transaction diligence — artifacts, not activities.",
      label: "View engagement models",
      href: "/engagements",
    };
  }
  if (category === "AI & Strategy" || category === "QA & Quality") {
    return {
      heading: "When the finding is quality failure.",
      body: "Vigil is the product path for teams shipping AI-generated code faster than they can verify it.",
      label: "See if Vigil fits your stack",
      href: "/vigil",
    };
  }
  return {
    heading: "Surface the risk before the next decision.",
    body: "A short scored assessment beats another generic discovery call.",
    label: "Take the Technical Risk Assessment",
    href: "/assessment",
  };
}

export function estimateReadTimeMinutes(piece: InsightPiece): number {
  const parts =
    piece.kind === "briefing"
      ? [piece.title, piece.description, ...(piece.teaser ?? []), ...piece.body]
      : [piece.title, piece.description, ...piece.body];
  const words = parts.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(4, Math.round(words / 200));
}

export function isPublishable(piece: InsightPiece): boolean {
  if (piece.kind === "briefing") {
    return (piece.teaser?.length ?? 0) > 0 && piece.body.length > 0;
  }
  return piece.body.length > 0;
}

export function categorySlug(category: InsightCategory | "All"): string {
  if (category === "All") return "all";
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function categoryFromSlug(slug: string | undefined): InsightCategory | "All" {
  if (!slug || slug === "all") return "All";
  const match = INSIGHT_CATEGORIES.find((c) => categorySlug(c) === slug.toLowerCase());
  return match ?? "All";
}
