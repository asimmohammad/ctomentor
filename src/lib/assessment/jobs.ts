import {
  generateAndStorePdf,
} from "./pdf-delivery";
import {
  sendInternalAlert,
  sendResultsEmail,
  shouldAlertInternally,
  syncContactTags,
} from "./delivery";
import { markNotified, updateSubmissionPdf } from "./repository";
import type { StoredAssessment } from "./store";
import { getAssessmentConfig } from "./questions";

/**
 * Downstream jobs after a successful insert. Failures are logged; they must
 * never block the user from seeing results.
 */
export async function runAssessmentDownstreamJobs(record: StoredAssessment): Promise<void> {
  const config = getAssessmentConfig(record.variant);
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://thectomentor.com";
  const resultsUrl = `${site}${config.framing.resultsPathPrefix}/${record.id}`;

  let pdfUrl: string | null = null;
  try {
    pdfUrl = await generateAndStorePdf(record);
    if (pdfUrl) {
      await updateSubmissionPdf(record.id, pdfUrl);
    }
  } catch (error) {
    console.error("[jobs] pdf pipeline failed", error);
  }

  try {
    await sendResultsEmail({ record, resultsUrl, pdfUrl });
  } catch (error) {
    console.error("[jobs] results email failed", error);
  }

  try {
    await syncContactTags(record);
  } catch (error) {
    console.error("[jobs] contact sync failed", error);
  }

  if (shouldAlertInternally(record)) {
    try {
      const sent = await sendInternalAlert({ record, resultsUrl });
      if (sent) await markNotified(record.id);
    } catch (error) {
      console.error("[jobs] internal alert failed", error);
    }
  }
}
