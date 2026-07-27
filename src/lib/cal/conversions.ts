import { createHash } from "crypto";

/** SHA-256 hex of normalized email for Conversions APIs. */
export function hashEmail(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

/**
 * Server-side conversion for call_booked — LinkedIn + Meta CAPI when tokens are set.
 * Failures are logged; they must not fail the webhook.
 */
export async function sendCallBookedConversions(input: {
  email: string;
  scheduledAt: string | null;
  assessmentLinked: boolean;
  eventId: string;
}): Promise<void> {
  const hashed = hashEmail(input.email);
  await Promise.allSettled([
    sendMetaPurchaseLike(hashed, input),
    sendLinkedInConversion(hashed, input),
  ]);
}

async function sendMetaPurchaseLike(
  hashedEmail: string,
  input: { scheduledAt: string | null; assessmentLinked: boolean; eventId: string },
) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !token) return;

  const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`;
  const body = {
    data: [
      {
        event_name: "Schedule",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: "website",
        event_source_url: "https://thectomentor.com/book",
        user_data: { em: [hashedEmail] },
        custom_data: {
          content_name: "technical_risk_conversation",
          assessment_linked: input.assessmentLinked,
          scheduled_at: input.scheduledAt,
        },
      },
    ],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    console.warn("[capi] Meta failed", response.status, await response.text());
  }
}

async function sendLinkedInConversion(
  _hashedEmail: string,
  input: { eventId: string },
) {
  // LinkedIn Conversions API requires an access token + conversion rule URN.
  const token = process.env.LINKEDIN_CAPI_ACCESS_TOKEN;
  const conversionUrn = process.env.LINKEDIN_CAPI_CONVERSION_URN;
  if (!token || !conversionUrn) return;

  const response = await fetch("https://api.linkedin.com/rest/conversionEvents", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "LinkedIn-Version": "202405",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      conversion: conversionUrn,
      conversionHappenedAt: Date.now(),
      eventId: input.eventId,
      user: {
        userIds: [],
      },
    }),
  });

  if (!response.ok) {
    console.warn("[capi] LinkedIn failed", response.status, await response.text());
  }
}
