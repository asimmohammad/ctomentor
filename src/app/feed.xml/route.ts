import { getPublishableInsights } from "@/lib/insights";

export const runtime = "nodejs";
export const revalidate = 3600;

const SITE = "https://thectomentor.com";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = getPublishableInsights();
  const lastBuild = items[0]?.[1].dateIso ?? new Date().toISOString().slice(0, 10);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>thectomentor.com Insights</title>
    <link>${SITE}/insights</link>
    <description>Technology risk, diligence, and engineering quality — Asim Mohammad.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items
      .map(([slug, piece]) => {
        const link = `${SITE}/insights/${slug}`;
        return `<item>
      <title>${escapeXml(piece.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(piece.dateIso).toUTCString()}</pubDate>
      <category>${escapeXml(piece.category)}</category>
      <description>${escapeXml(piece.description)}</description>
    </item>`;
      })
      .join("\n    ")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
