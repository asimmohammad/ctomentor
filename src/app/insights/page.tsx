import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/layout/Section";
import { Grid, GridItem } from "@/components/layout/Grid";
import { SubstackSubscribe } from "@/components/SubstackSubscribe";
import {
  categoriesWithContent,
  categoryFromSlug,
  categorySlug,
  estimateReadTimeMinutes,
  filterInsights,
  getFeaturedInsight,
  getPublishableInsights,
} from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights — technology risk, diligence, and engineering quality",
  description:
    "Long-form writing and gated briefings on technical diligence, security, AI verification, and CTO operating practice.",
  alternates: {
    canonical: "https://thectomentor.com/insights",
    types: { "application/rss+xml": "https://thectomentor.com/feed.xml" },
  },
};

type PageProps = {
  searchParams?: { category?: string };
};

export default function InsightsPage({ searchParams }: PageProps) {
  const active = categoryFromSlug(searchParams?.category);
  const featured = getFeaturedInsight();
  const articles = filterInsights(searchParams?.category, {
    kind: "article",
    excludeSlug: featured?.[0],
  });
  const briefings = getPublishableInsights("briefing");
  const cats = categoriesWithContent();

  return (
    <>
      <Section spacing="compact" tone="paper">
        <Eyebrow>Insights</Eyebrow>
        <h1 className="mt-3 max-w-measure font-display text-[clamp(1.875rem,3.25vw,2.875rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink">
          Technology risk, written for people who price it.
        </h1>
        <p className="mt-4 max-w-measure font-text text-lead text-ink-muted">
          Diligence patterns, security operating reality, and what breaks when teams ship AI-generated code faster than
          they can verify it.
        </p>
        <p className="mt-4 font-text text-small text-ink-muted">
          <Link href="/feed.xml" className="text-accent underline-offset-4 hover:underline">
            RSS feed
          </Link>
        </p>
      </Section>

      {featured ? (
        <Section spacing="compact" tone="alt">
          <Eyebrow>Featured</Eyebrow>
          <article className="mt-4 max-w-measure">
            <p className="font-text text-caption text-ink-muted">
              {featured[1].date} · {featured[1].category} · {estimateReadTimeMinutes(featured[1])} min read
            </p>
            <h2 className="mt-3 font-display text-h2 text-ink">
              <Link href={`/insights/${featured[0]}`} className="hover:text-accent">
                {featured[1].title}
              </Link>
            </h2>
            <p className="mt-4 font-text text-lead text-ink-muted">{featured[1].description}</p>
            <Link
              href={`/insights/${featured[0]}`}
              className="mt-6 inline-block font-text text-small font-medium text-accent underline-offset-4 hover:underline"
            >
              Read article →
            </Link>
          </article>
        </Section>
      ) : null}

      {briefings.length > 0 ? (
        <Section spacing="compact" tone="paper">
          <Eyebrow>Briefings</Eyebrow>
          <h2 className="mt-3 font-display text-h3 text-ink">Gated field guides</h2>
          <p className="mt-2 max-w-measure font-text text-body text-ink-muted">
            Longer checklists for deal partners and CTOs — unlock with the same email gate as the assessment.
          </p>
          <Grid className="mt-8">
            {briefings.map(([slug, piece]) => (
              <GridItem key={slug} span={12} md={6} lg={4}>
                <Link
                  href={`/insights/${slug}`}
                  className="block h-full border border-border bg-surface p-6 transition-colors hover:border-ink"
                >
                  <span className="font-mono text-eyebrow uppercase tracking-[0.12em] text-accent">Briefing</span>
                  <h3 className="mt-3 font-text text-h4 text-ink">{piece.title}</h3>
                  <p className="mt-2 font-text text-small text-ink-muted line-clamp-3">{piece.description}</p>
                </Link>
              </GridItem>
            ))}
          </Grid>
        </Section>
      ) : null}

      <Section spacing="standard" tone="alt">
        <div className="mb-10 flex flex-wrap gap-2" role="navigation" aria-label="Filter by category">
          <FilterLink label="All" href="/insights" active={active === "All"} />
          {cats.map((cat) => (
            <FilterLink
              key={cat}
              label={cat}
              href={`/insights?category=${categorySlug(cat)}`}
              active={active === cat}
            />
          ))}
        </div>

        {articles.length === 0 ? (
          <p className="font-text text-body text-ink-muted">No articles in this category yet.</p>
        ) : (
          <Grid>
            {articles.map(([slug, piece]) => (
              <GridItem key={slug} span={12} md={6}>
                <article className="h-full border-b border-border pb-8 md:border-b-0 md:pb-0">
                  <p className="font-text text-caption text-ink-muted">
                    {piece.date} · {piece.category} · {estimateReadTimeMinutes(piece)} min
                  </p>
                  <h2 className="mt-3 font-display text-h4 text-ink">
                    <Link href={`/insights/${slug}`} className="hover:text-accent">
                      {piece.title}
                    </Link>
                  </h2>
                  <p className="mt-3 font-text text-body text-ink-muted">{piece.description}</p>
                  <Link
                    href={`/insights/${slug}`}
                    className="mt-4 inline-block font-text text-small font-medium text-accent underline-offset-4 hover:underline"
                  >
                    Read →
                  </Link>
                </article>
              </GridItem>
            ))}
          </Grid>
        )}
      </Section>

      <Section spacing="standard" tone="paper">
        <div className="max-w-measure">
          <h2 className="font-display text-h3 text-ink">Subscribe on Substack</h2>
          <div className="mt-4">
            <SubstackSubscribe variant="inline" />
          </div>
        </div>
      </Section>
    </>
  );
}

function FilterLink({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "bg-accent px-4 py-2 font-text text-small font-medium text-ink-inverse"
          : "border border-border bg-surface px-4 py-2 font-text text-small font-medium text-ink-muted hover:border-ink hover:text-ink"
      }
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}
