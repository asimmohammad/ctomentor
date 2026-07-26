import { insights, INSIGHT_RECENCY_ORDER } from "./catalog";
import {
  categoryFromSlug,
  estimateReadTimeMinutes,
  isPublishable,
  type InsightCategory,
  type InsightPiece,
} from "./types";

export type { InsightCategory, InsightPiece, ContentKind, ContextualCta } from "./types";
export {
  INSIGHT_CATEGORIES,
  categoryFromSlug,
  categorySlug,
  contextualCtaForCategory,
  estimateReadTimeMinutes,
  isPublishable,
} from "./types";
export { insights } from "./catalog";

export type InsightEntry = [string, InsightPiece];

export function getPublishableInsights(kind?: InsightPiece["kind"]): InsightEntry[] {
  return INSIGHT_RECENCY_ORDER.filter((slug) => {
    const piece = insights[slug];
    if (!piece || !isPublishable(piece)) return false;
    if (kind && piece.kind !== kind) return false;
    return true;
  }).map((slug) => [slug, insights[slug]] as InsightEntry);
}

export function getFeaturedInsight(): InsightEntry | null {
  const featured = getPublishableInsights("article").find(([, p]) => p.featured);
  if (featured) return featured;
  return getPublishableInsights("article")[0] ?? null;
}

export function getInsight(slug: string): InsightPiece | null {
  const piece = insights[slug];
  if (!piece || !isPublishable(piece)) return null;
  return piece;
}

export function filterInsights(
  categoryParam: string | undefined,
  opts?: { kind?: InsightPiece["kind"]; excludeSlug?: string },
): InsightEntry[] {
  const category = categoryFromSlug(categoryParam);
  return getPublishableInsights(opts?.kind).filter(([slug, piece]) => {
    if (opts?.excludeSlug && slug === opts.excludeSlug) return false;
    if (category === "All") return true;
    return piece.category === category;
  });
}

export function relatedInsights(slug: string, limit = 3): InsightEntry[] {
  const current = insights[slug];
  if (!current) return [];
  const same = getPublishableInsights().filter(
    ([s, p]) => s !== slug && p.category === current.category && p.kind === "article",
  );
  if (same.length >= limit) return same.slice(0, limit);
  const rest = getPublishableInsights("article").filter(
    ([s]) => s !== slug && !same.some(([x]) => x === s),
  );
  return [...same, ...rest].slice(0, limit);
}

export function categoriesWithContent(): InsightCategory[] {
  const present = new Set(getPublishableInsights().map(([, p]) => p.category));
  return [...present];
}

/** Back-compat for homepage teasers that still import from @/lib/articles */
export function getRecentArticles(limit = 3): InsightEntry[] {
  return getPublishableInsights("article").slice(0, limit);
}

export function toArticleCompat(piece: InsightPiece) {
  return {
    title: piece.title,
    date: piece.date,
    category: piece.category,
    description: piece.description,
    body: piece.body,
  };
}
