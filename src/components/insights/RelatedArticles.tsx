import Link from "next/link";
import { estimateReadTimeMinutes, type InsightEntry } from "@/lib/insights";

export function RelatedArticles({ items }: { items: InsightEntry[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-16 border-t border-border pt-10">
      <h2 className="font-display text-h3 text-ink">Related</h2>
      <ul className="mt-6 list-none space-y-6">
        {items.map(([slug, piece]) => (
          <li key={slug}>
            <p className="font-text text-caption text-ink-muted">
              {piece.category} · {estimateReadTimeMinutes(piece)} min
            </p>
            <Link
              href={`/insights/${slug}`}
              className="mt-1 block font-text text-h4 text-ink underline-offset-4 hover:text-accent hover:underline"
            >
              {piece.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
