import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { articles, getPublishableArticles } from "@/lib/articles";

export async function generateStaticParams() {
  return getPublishableArticles().map(([slug]) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = articles[params.slug];
  if (!article || article.body.length === 0) {
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
  const article = articles[params.slug];

  if (!article || article.body.length === 0) {
    notFound();
  }

  return (
    <>
      <Section spacing="standard" tone="alt">
        <div className="max-w-3xl">
          <p className="text-small font-text text-ink-muted mb-3">
            {article.date} · {article.category}
          </p>
          <h1 className="font-display text-h1 text-ink">
            {article.title}
          </h1>
          <p className="mt-6 text-lead font-text text-ink-muted">{article.description}</p>
          <div className="mt-6">
            <Link href="/insights" className="text-small font-text text-accent hover:text-accent-hover">
              ← Back to all insights
            </Link>
          </div>
        </div>
      </Section>

      <Section spacing="standard" tone="paper">
        <div className="max-w-3xl space-y-6">
          {article.body.map((paragraph, index) => (
            <p key={index} className="text-body font-text text-ink">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>
    </>
  );
}
