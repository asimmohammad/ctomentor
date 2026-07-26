import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorCard } from "@/components/insights/AuthorCard";
import { BriefingGate } from "@/components/insights/BriefingGate";
import { ContextualArticleCta } from "@/components/insights/ContextualArticleCta";
import { ReadingProgress } from "@/components/insights/ReadingProgress";
import { RelatedArticles } from "@/components/insights/RelatedArticles";
import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/layout/Section";
import {
  contextualCtaForCategory,
  estimateReadTimeMinutes,
  getInsight,
  getPublishableInsights,
  relatedInsights,
} from "@/lib/insights";

type PageProps = { params: { slug: string } };

export async function generateStaticParams() {
  return getPublishableInsights().map(([slug]) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const piece = getInsight(params.slug);
  if (!piece) {
    return { title: "Not found" };
  }

  const path = `https://thectomentor.com/insights/${params.slug}`;
  const canonical = piece.substackUrl ?? path;

  return {
    title: piece.title,
    description: piece.description,
    alternates: { canonical },
    openGraph: {
      title: piece.title,
      description: piece.description,
      type: "article",
      url: path,
      publishedTime: piece.dateIso,
    },
  };
}

export default function InsightArticlePage({ params }: PageProps) {
  const piece = getInsight(params.slug);
  if (!piece) notFound();

  const readTime = estimateReadTimeMinutes(piece);
  const related = relatedInsights(params.slug);
  const cta = contextualCtaForCategory(piece.category);
  const path = `https://thectomentor.com/insights/${params.slug}`;
  const insertAt = Math.max(1, Math.floor(piece.body.length * 0.6));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": piece.kind === "briefing" ? "TechArticle" : "Article",
    headline: piece.title,
    description: piece.description,
    datePublished: piece.dateIso,
    dateModified: piece.dateIso,
    author: {
      "@type": "Person",
      name: "Asim Mohammad",
      url: "https://thectomentor.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "thectomentor.com",
      url: "https://thectomentor.com",
    },
    mainEntityOfPage: path,
    articleSection: piece.category,
    ...(piece.substackUrl ? { isBasedOn: piece.substackUrl } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />

      <Section spacing="compact" tone="paper">
        <p className="font-text text-small text-ink-muted">
          <Link href="/insights" className="text-accent underline-offset-4 hover:underline">
            Insights
          </Link>
          {piece.kind === "briefing" ? " / Briefing" : ""}
        </p>
        <Eyebrow className="mt-4">{piece.category}</Eyebrow>
        <h1 className="mt-3 max-w-[68ch] font-display text-h1 text-ink">{piece.title}</h1>
        <p className="mt-4 max-w-[68ch] font-text text-lead text-ink-muted">{piece.description}</p>
        <p className="mt-6 font-text text-caption text-ink-faint">
          {piece.date} · {readTime} min read · Asim Mohammad
          {piece.substackUrl ? (
            <>
              {" · "}
              <a
                href={piece.substackUrl}
                className="text-accent underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Originally on Substack
              </a>
            </>
          ) : null}
        </p>
      </Section>

      <Section spacing="standard" tone="alt">
        <article className="mx-auto max-w-[68ch]">
          {piece.kind === "briefing" ? (
            <BriefingGate slug={params.slug} title={piece.title} teaser={piece.teaser ?? []}>
              <ArticleBody paragraphs={piece.body} cta={cta} insertAt={insertAt} />
            </BriefingGate>
          ) : (
            <ArticleBody paragraphs={piece.body} cta={cta} insertAt={insertAt} />
          )}

          <AuthorCard />
          <RelatedArticles items={related} />
        </article>
      </Section>
    </>
  );
}

function ArticleBody({
  paragraphs,
  cta,
  insertAt,
}: {
  paragraphs: string[];
  cta: ReturnType<typeof contextualCtaForCategory>;
  insertAt: number;
}) {
  return (
    <div className="space-y-6">
      {paragraphs.map((paragraph, index) => (
        <div key={`${index}-${paragraph.slice(0, 20)}`}>
          <p className="font-text text-lead text-ink">{paragraph}</p>
          {index + 1 === insertAt ? <ContextualArticleCta cta={cta} /> : null}
        </div>
      ))}
    </div>
  );
}
