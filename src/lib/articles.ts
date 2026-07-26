/**
 * @deprecated Import from `@/lib/insights` for new code.
 * Thin compatibility layer for existing homepage imports.
 */
import {
  estimateReadTimeMinutes as estimateFromInsights,
  getPublishableInsights,
  getRecentArticles as recentFromInsights,
  insights,
  toArticleCompat,
  type InsightPiece,
} from "@/lib/insights";

export type Article = {
  title: string;
  date: string;
  category: string;
  description: string;
  body: string[];
};

export const articles: Record<string, Article> = Object.fromEntries(
  Object.entries(insights).map(([slug, piece]) => [slug, toArticleCompat(piece)]),
);

export function getPublishableArticles(): [string, Article][] {
  return getPublishableInsights("article").map(([slug, piece]) => [slug, toArticleCompat(piece)]);
}

export function getRecentArticles(limit = 3): [string, Article][] {
  return recentFromInsights(limit).map(([slug, piece]) => [slug, toArticleCompat(piece)]);
}

export function estimateReadTimeMinutes(article: Article | InsightPiece): number {
  if ("kind" in article) return estimateFromInsights(article);
  return estimateFromInsights({
    ...article,
    category: article.category as InsightPiece["category"],
    dateIso: "",
    kind: "article",
    body: article.body,
  });
}
