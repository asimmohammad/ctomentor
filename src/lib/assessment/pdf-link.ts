import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/admin";
import { withRetry } from "@/lib/retry";
import { getAssessment } from "./store";
import { generateAndStorePdf } from "./pdf-delivery";
import { updateSubmissionPdf } from "./repository";

const BUCKET = "assessment-pdfs";
/** Short life: the URL is minted per request and consumed by an immediate redirect. */
const SIGNED_URL_TTL_SECONDS = 300;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function notFound(message: string) {
  return new NextResponse(message, {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}

/**
 * Resolves a permanent results-PDF path to a freshly signed Storage URL.
 *
 * The stored `pdf_url` is a signed URL that expires, so any link mailed to a
 * recipient dies once the signature lapses — and forwarded reports outlive that
 * window routinely. This mints a new signature per request instead, and
 * regenerates the file if the object is missing, so the public path never rots.
 */
export async function servePdfForSubmission(id: string): Promise<Response> {
  if (!UUID_RE.test(id)) {
    return notFound("Report not found.");
  }

  const record = await getAssessment(id);
  if (!record) {
    return notFound("Report not found. If you believe this is an error, email asim@thectomentor.com.");
  }

  const supabase = createServiceClient();
  if (!supabase) {
    console.error("[pdf-link] supabase not configured");
    return new NextResponse("Report storage is temporarily unavailable. Try again shortly.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  const path = `${record.variant}/${id}.pdf`;

  const existing = await withRetry("pdf-link-exists", async () => {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list(record.variant, { search: `${id}.pdf`, limit: 1 });
    if (error) throw error;
    return (data ?? []).length > 0;
  });

  // Missing object (cleanup, failed upload, or a submission that predates the
  // PDF pipeline) — rebuild it on demand rather than serving a broken link.
  if (!existing.ok || !existing.value) {
    const regenerated = await generateAndStorePdf(record);
    if (!regenerated) {
      console.error("[pdf-link] regeneration failed", { id });
      return new NextResponse(
        "The report could not be generated. Email asim@thectomentor.com and it will be sent manually.",
        {
          status: 502,
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
        },
      );
    }
    await updateSubmissionPdf(id, regenerated).catch((error) =>
      console.error("[pdf-link] pdf_url update failed", error),
    );
  }

  const signed = await withRetry("pdf-link-sign", async () => {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(path, SIGNED_URL_TTL_SECONDS, {
        download: `technical-risk-assessment-${id.slice(0, 8)}.pdf`,
      });
    if (error) throw error;
    return data.signedUrl;
  });

  if (!signed.ok) {
    console.error("[pdf-link] signing failed", signed.error);
    return new NextResponse("Unable to open the report right now. Try again shortly.", {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  return NextResponse.redirect(signed.value, {
    status: 302,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
