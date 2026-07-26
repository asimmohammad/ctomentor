import { createServiceClient } from "@/lib/supabase/admin";
import { withRetry } from "@/lib/retry";
import { renderAssessmentPdf } from "./pdf";
import { toPublicResult, type StoredAssessment } from "./store";

/**
 * Generate the branded PDF, upload to Supabase Storage, return a signed URL.
 * Returns null on failure so the submit path can degrade gracefully.
 */
export async function generateAndStorePdf(
  record: StoredAssessment,
): Promise<string | null> {
  const supabase = createServiceClient();
  if (!supabase) {
    console.warn("[pdf] skipped — supabase admin not configured");
    return null;
  }

  try {
    const publicResult = toPublicResult(record);
    const rendered = await withRetry("pdf-render", () => renderAssessmentPdf(publicResult), {
      attempts: 2,
    });
    if (!rendered.ok) {
      console.error("[pdf] render failed", rendered.error);
      return null;
    }

    const path = `${record.variant}/${record.id}.pdf`;
    const uploaded = await withRetry("pdf-upload", async () => {
      const { error } = await supabase.storage
        .from("assessment-pdfs")
        .upload(path, rendered.value, {
          contentType: "application/pdf",
          upsert: true,
        });
      if (error) throw error;
      return path;
    });

    if (!uploaded.ok) {
      console.error("[pdf] upload failed", uploaded.error);
      return null;
    }

    const signed = await withRetry("pdf-signed-url", async () => {
      const { data, error } = await supabase.storage
        .from("assessment-pdfs")
        .createSignedUrl(uploaded.value, 60 * 60 * 24 * 30);
      if (error) throw error;
      return data.signedUrl;
    });

    if (!signed.ok) {
      console.error("[pdf] signed URL failed", signed.error);
      return null;
    }

    return signed.value;
  } catch (error) {
    console.error("[pdf] unexpected failure", error);
    return null;
  }
}
