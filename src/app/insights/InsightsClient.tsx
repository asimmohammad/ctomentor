"use client";

import Link from "next/link";
import { useState } from "react";
import { SubstackSubscribe } from "@/components/SubstackSubscribe";
import { Section } from "@/components/layout/Section";
import { Grid, GridItem } from "@/components/layout/Grid";
import { getPublishableArticles } from "@/lib/articles";

export const INSIGHTS_CATEGORIES = [
  "All",
  "Technology Strategy",
  "Engineering Leadership",
  "Leadership",
  "AI & Strategy",
  "Security & Compliance",
  "Due Diligence",
  "Government Technology",
] as const;

const posts = getPublishableArticles().map(([slug, article]) => ({
  slug,
  title: article.title,
  excerpt: article.description,
  date: article.date,
  category: article.category,
  readTime: Math.max(4, Math.ceil(article.body.join(" ").split(/\s+/).length / 200)),
  featured: true,
}));

export default function InsightsClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredPosts =
    selectedCategory === "All" ? posts : posts.filter((p) => p.category === selectedCategory);

  const featuredPosts = posts.filter((p) => p.featured).slice(0, 3);
  const categoriesForFilter = INSIGHTS_CATEGORIES.filter(
    (c) => c !== "All" && posts.some((p) => p.category === c),
  );
  const allCategories = ["All", ...categoriesForFilter];

  return (
    <>
      {/* Hero */}
      <Section spacing="generous" tone="alt">
        <div className="max-w-3xl">
          <h1 className="font-display text-h1 text-ink">
            CTO Insights
          </h1>
          <p className="mt-6 text-lead font-text text-ink-muted">
            Writing on technology leadership, scaling engineering teams, and CTO strategy.
          </p>
        </div>
      </Section>

      {featuredPosts.length > 0 && (
        <Section spacing="compact" tone="paper" className="border-b border-border">
          <h2 className="eyebrow text-accent mb-6">
            Featured
          </h2>
          <Grid>
            {featuredPosts.map((post) => (
              <GridItem key={post.slug} span={12} md={4}>
                <Link
                  href={`/insights/${post.slug}`}
                  className="group block h-full p-6 border border-border hover:border-ink transition-colors duration-standard"
                >
                  <span className="text-small font-text text-ink-muted">
                    {post.date} · {post.readTime} min read
                  </span>
                  <h3 className="mt-2 font-text text-h4 text-ink group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-small font-text text-ink-muted line-clamp-2">{post.excerpt}</p>
                  <span className="mt-3 inline-block text-small font-medium text-accent">Read more →</span>
                </Link>
              </GridItem>
            ))}
          </Grid>
        </Section>
      )}

      <Section spacing="standard" tone="paper">
        {posts.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-small font-text font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-accent text-accent-foreground"
                    : "bg-card border border-border text-ink-muted hover:text-ink hover:border-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
        <div className="max-w-3xl space-y-12">
          {filteredPosts.length === 0 ? (
            <p className="text-body font-text text-ink-muted">
              New articles will appear here when published. Subscribe below to get them first.
            </p>
          ) : (
            filteredPosts.map((post, index) => (
              <article
                key={post.slug}
                className={index !== filteredPosts.length - 1 ? "pb-12 border-b border-border" : ""}
              >
                <div className="flex flex-wrap items-center gap-3 text-small font-text text-ink-muted">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>{post.readTime} min read</span>
                </div>
                <h2 className="mt-4 font-display text-h3 text-ink">
                  <Link href={`/insights/${post.slug}`} className="hover:text-accent transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 text-body font-text text-ink-muted">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/insights/${post.slug}`}
                    className="text-small font-text font-medium text-ink hover:text-accent transition-colors"
                  >
                    Read more →
                  </Link>
                  <Link
                    href="/about"
                    className="text-small font-text text-ink-muted hover:text-ink transition-colors"
                  >
                    By Asim Mohammad
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </Section>

      {/* Substack subscribe */}
      <Section spacing="standard" tone="alt" className="border-y border-border">
        <div className="max-w-2xl">
          <h2 className="font-display text-h2 text-ink mb-4">
            Subscribe on Substack
          </h2>
          <SubstackSubscribe variant="inline" />
        </div>
      </Section>
    </>
  );
}
