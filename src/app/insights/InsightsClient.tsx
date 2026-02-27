"use client";

import Link from "next/link";
import { useState } from "react";
import { NewsletterSignup } from "@/components/NewsletterSignup";

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

const posts = [
  {
    slug: "ai-coding-tools-lying",
    title: "Your AI Coding Tools Are Lying to You (And Your Engineers Don't Know It Yet)",
    excerpt:
      "Pull request sizes are up 33%. Change failure rates are climbing nearly 30%. The culprit isn't laziness — it's confidence without context. Why context engineering is the CTO-level discipline that separates rigor from recklessness.",
    date: "February 2026",
    category: "Engineering Leadership",
    readTime: 9,
    featured: true,
  },
  {
    slug: "soc-2-compliance",
    title:
      "SOC 2 Compliance: What Every Technology Leader Needs to Know (And How to Get There Without Losing Your Mind)",
    excerpt:
      "If you're selling to enterprise, you've heard the question: 'Are you SOC 2 compliant?' Here's what I learned from the SOC 2 journey at Laasy — and the tools that made it manageable.",
    date: "February 2026",
    category: "Security & Compliance",
    readTime: 10,
    featured: true,
  },
  {
    slug: "cto-skill-no",
    title: 'The CTO Skill Nobody Trains For: Saying "No"',
    excerpt:
      "Every technical leader knows the feeling: constant requests, endless priorities, and the quiet pressure to say yes to everything. But the most important technical decision is often deciding what not to build.",
    date: "February 2026",
    category: "Engineering Leadership",
    readTime: 8,
    featured: true,
  },
  {
    slug: "fix-after-launch",
    title: 'Why "We\'ll Fix It After Launch" Is How Startups Die',
    excerpt:
      "Nearly every startup makes a quiet promise: 'We'll fix it after launch.' What makes this promise dangerous isn't that it's dishonest—it's that it's based on a future that almost never exists.",
    date: "January 2026",
    category: "Leadership",
    readTime: 7,
    featured: true,
  },
  {
    slug: "many-faces-cto",
    title: "The Many Faces of the CTO — And Why Most Startups Hire the Wrong One",
    excerpt:
      "CTO is one of the most overloaded titles in modern companies. Two people can hold the same title and solve entirely different problems.",
    date: "January 2026",
    category: "Technology Strategy",
    readTime: 9,
    featured: true,
  },
  {
    slug: "decision-rights",
    title: "Why Decision Rights Matter More Than Technology Choices",
    excerpt:
      "The most common cause of engineering dysfunction isn't technical debt — it's unclear ownership. Here's how to diagnose and fix it.",
    date: "December 2024",
    category: "Engineering Leadership",
    readTime: 8,
    featured: false,
  },
  {
    slug: "ai-adoption",
    title: "AI Adoption in Startups: Strategy Before Tools",
    excerpt:
      "Before choosing models or platforms, establish clear governance and success criteria. Most AI initiatives fail due to organizational readiness, not technical limitations.",
    date: "November 2024",
    category: "AI & Strategy",
    readTime: 7,
    featured: false,
  },
  {
    slug: "founder-cto-transition",
    title: "The Founder-to-CTO Transition Nobody Talks About",
    excerpt:
      "Technical founders often struggle to delegate effectively. The path forward requires deliberate role design, not just hiring.",
    date: "October 2024",
    category: "Leadership",
    readTime: 6,
    featured: false,
  },
];

export default function InsightsClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredPosts =
    selectedCategory === "All" ? posts : posts.filter((p) => p.category === selectedCategory);

  const featuredPosts = posts.filter((p) => p.featured);
  const categoriesForFilter = INSIGHTS_CATEGORIES.filter(
    (c) => c !== "All" && posts.some((p) => p.category === c),
  );
  const allCategories = ["All", ...categoriesForFilter];

  return (
    <>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              CTO Insights
            </h1>
            <p className="mt-6 text-xl font-body text-subtle">
              Writing on technology leadership, scaling engineering teams, and CTO strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-background border-b border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <h2 className="font-heading text-sm font-semibold text-accent uppercase tracking-wider mb-6">
            Featured
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="group block p-6 rounded-lg border border-divider hover:border-accent/30 transition-colors"
              >
                <span className="text-xs font-body text-subtle">
                  {post.date} · {post.readTime} min read
                </span>
                <h3 className="mt-2 font-heading text-xl font-semibold text-heading group-hover:text-accent transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm font-body text-subtle line-clamp-2">{post.excerpt}</p>
                <span className="mt-3 inline-block text-sm font-medium text-accent">Read more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-accent text-accent-foreground"
                    : "bg-card border border-divider text-subtle hover:text-heading hover:border-accent/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All posts */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-12 lg:py-20">
          <div className="max-w-3xl space-y-12">
            {filteredPosts.map((post, index) => (
              <article
                key={post.slug}
                className={index !== filteredPosts.length - 1 ? "pb-12 border-b border-divider" : ""}
              >
                <div className="flex flex-wrap items-center gap-3 text-sm font-body text-subtle">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-divider" />
                  <span>{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-divider" />
                  <span>{post.readTime} min read</span>
                </div>
                <h2 className="mt-4 font-heading text-2xl md:text-3xl font-semibold text-heading leading-tight">
                  <Link href={`/insights/${post.slug}`} className="hover:text-accent transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 text-base font-body text-subtle leading-relaxed">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/insights/${post.slug}`}
                    className="text-sm font-body font-medium text-heading hover:text-accent transition-colors"
                  >
                    Read more →
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm font-body text-subtle hover:text-heading transition-colors"
                  >
                    By Asim Mohammad
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-heading mb-4">
              Get insights in your inbox
            </h2>
            <NewsletterSignup variant="inline" />
          </div>
        </div>
      </section>
    </>
  );
}

