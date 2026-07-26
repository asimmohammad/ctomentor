import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResultsView } from "@/components/assessment/ResultsView";
import { getPublicAssessment } from "@/lib/assessment/store";

type PageProps = {
  params: { uuid: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const result = await getPublicAssessment(params.uuid);
  if (!result) {
    return { title: "Assessment result", robots: { index: false, follow: false } };
  }

  const title = `Score ${result.score.overall} · Level ${result.score.tier.level} ${result.score.tier.name}`;
  const description = `${result.firstName} at ${result.company} — ${result.framingName} results.`;
  const ogImage = `${result.resultsPathPrefix}/${result.id}/opengraph-image`;

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: `https://thectomentor.com${result.resultsPathPrefix}/${result.id}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function AssessmentResultPage({ params }: PageProps) {
  const result = await getPublicAssessment(params.uuid);
  if (!result) notFound();

  const shareUrl = `https://thectomentor.com${result.resultsPathPrefix}/${result.id}`;

  return <ResultsView result={result} shareUrl={shareUrl} />;
}
