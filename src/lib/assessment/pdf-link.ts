import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/admin";
import { getAssessment } from "./store";
import { generateAndStorePdf } from "./pdf-delivery";
import { updateSubmissionPdf } from "./repository";

const BUCKET = "assessment-pdfs";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function textResponse(message: string, status: number) {
  return new NextResponse(message, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function storageConfig(): { url: string; key: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || process.env.SUPABASE_URL?.trim();
  const key =
    process.env.SUPABASE_SECRET_KEY?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

/**
 * Fetches the stored object. Uses a raw fetch with `cache: "no-store"` rather
 * than the Supabase client: inside a route handler the client's requests were
 * being served from Next's fetch cache, which previously returned signed URLs
 * minted minutes earlier and therefore already expired.
 */
async function fetchObject(path: string): Promise<Response | null> {
  const config = storageConfig();
  if (!config) return null;

  return fetch(`${config.url}/storage/v1/object/${BUCKET}/${path}`, {
    headers: { Authorization: `Bearer ${config.key}`, apikey: config.key },
    cache: "no-store",
  });
}

/**
 * Serves a submission's PDF report from a permanent, never-expiring path.
 *
 * The bytes are streamed through this route instead of redirecting to a signed
 * Storage URL. Signed URLs expire — and these reports get forwarded long after
 * any signature window — so a mailed link would eventually rot. If the stored
 * object is missing, it is rebuilt on demand before serving.
 */
export async function servePdfForSubmission(id: string): Promise<Response> {
  if (!UUID_RE.test(id)) return textResponse("Report not found.", 404);

  const record = await getAssessment(id);
  if (!record) {
    return textResponse(
      "Report not found. If you believe this is an error, email asim@thectomentor.com.",
      404,
    );
  }

  if (!createServiceClient() || !storageConfig()) {
    console.error("[pdf-link] supabase not configured");
    return textResponse("Report storage is temporarily unavailable. Try again shortly.", 503);
  }

  const path = `${record.variant}/${id}.pdf`;
  let source = "stored";

  let upstream = await fetchObject(path);

  // Missing object (cleanup, failed upload, or a submission predating the PDF
  // pipeline) — rebuild it rather than serving a broken link.
  if (!upstream || !upstream.ok) {
    source = "regenerated";
    const regenerated = await generateAndStorePdf(record);
    if (!regenerated) {
      console.error("[pdf-link] regeneration failed", { id });
      return textResponse(
        "The report could not be generated. Email asim@thectomentor.com and it will be sent manually.",
        502,
      );
    }
    await updateSubmissionPdf(id, regenerated).catch((error) =>
      console.error("[pdf-link] pdf_url update failed", error),
    );
    upstream = await fetchObject(path);
  }

  if (!upstream || !upstream.ok || !upstream.body) {
    console.error("[pdf-link] object fetch failed", { id, status: upstream?.status });
    return textResponse("Unable to open the report right now. Try again shortly.", 502);
  }

  const company = record.lead.company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  const filename = `technical-risk-assessment${company ? `-${company}` : ""}.pdf`;

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "private, no-store",
      "X-Pdf-Source": source,
    },
  });
}
