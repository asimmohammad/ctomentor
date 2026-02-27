import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type ArticleSummary = {
  title: string;
  date: string;
  category: string;
  description: string;
};

const articleSummaries: Record<string, ArticleSummary> = {
  "ai-coding-tools-lying": {
    title: "Your AI Coding Tools Are Lying to You (And Your Engineers Don't Know It Yet)",
    date: "February 21, 2026",
    category: "Engineering Leadership",
    description:
      "Pull request sizes are up 33%. Change failure rates are climbing nearly 30%. The culprit isn't laziness — it's confidence without context. Why context engineering is the CTO-level discipline that separates rigor from recklessness.",
  },
  "soc-2-compliance": {
    title:
      "SOC 2 Compliance: What Every Technology Leader Needs to Know (And How to Get There Without Losing Your Mind)",
    date: "February 15, 2026",
    category: "Security & Compliance",
    description:
      "If you're selling to enterprise, you've heard the question: 'Are you SOC 2 compliant?' Here's what I learned from the SOC 2 journey at Laasy — and the tools that made it manageable.",
  },
  "cto-skill-no": {
    title: 'The CTO Skill Nobody Trains For: Saying "No"',
    date: "February 9, 2026",
    category: "Leadership",
    description:
      "Every technical leader knows the feeling: constant requests, endless priorities, and the quiet pressure to say yes to everything. But the most important technical decision is often deciding what not to build.",
  },
  "fix-after-launch": {
    title: 'Why "We\'ll Fix It After Launch" Is How Startups Die',
    date: "January 11, 2026",
    category: "Leadership",
    description:
      "Nearly every startup makes a quiet promise: 'We'll fix it after launch.' What makes this promise dangerous isn't that it's dishonest—it's that it's based on a future that almost never exists.",
  },
  "many-faces-cto": {
    title: "The Many Faces of the CTO — And Why Most Startups Hire the Wrong One",
    date: "January 25, 2026",
    category: "Technology Strategy",
    description:
      "CTO is one of the most overloaded titles in modern companies. Two people can hold the same title and solve entirely different problems.",
  },
  "decision-rights": {
    title: "Why Decision Rights Matter More Than Technology Choices",
    date: "December 2024",
    category: "Engineering Leadership",
    description:
      "The most common cause of engineering dysfunction isn't technical debt — it's unclear ownership. Here's how to diagnose and fix it.",
  },
  "ai-adoption": {
    title: "AI Adoption in Startups: Strategy Before Tools",
    date: "November 2024",
    category: "AI & Strategy",
    description:
      "Before choosing models or platforms, establish clear governance and success criteria. Most AI initiatives fail due to organizational readiness, not technical limitations.",
  },
  "founder-cto-transition": {
    title: "The Founder-to-CTO Transition Nobody Talks About",
    date: "October 2024",
    category: "Leadership",
    description:
      "Technical founders often struggle to delegate effectively. The path forward requires deliberate role design, not just hiring.",
  },
};

export async function generateStaticParams() {
  return Object.keys(articleSummaries).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = articleSummaries[params.slug];
  if (!article) {
    return {
      title: "Article Not Found | The CTO Mentor",
    };
  }

  return {
    title: `${article.title} | The CTO Mentor`,
    description: article.description,
    alternates: {
      canonical: `https://thectomentor.com/insights/${params.slug}`,
    },
  };
}

export default function InsightArticlePage({ params }: { params: { slug: string } }) {
  const article = articleSummaries[params.slug];

  if (!article) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-body text-subtle mb-3">
              {article.date} · {article.category}
            </p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-heading leading-tight">
              {article.title}
            </h1>
            <p className="mt-6 text-lg font-body text-subtle leading-relaxed">{article.description}</p>
            <div className="mt-6">
              <Link href="/insights" className="text-sm font-body text-accent hover:text-accent/80">
                ← Back to all insights
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content placeholder */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-12 lg:py-20">
          <div className="max-w-3xl prose prose-lg max-w-none">
            <p>
              Full article content is being served from the legacy SPA version today. This Next.js route now exposes the
              article as a fully crawlable page with correct metadata, and the long-form content can be moved here
              verbatim from the SPA when you are ready to fully decommission the Vite app.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

