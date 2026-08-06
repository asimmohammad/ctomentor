import { NextRequest } from "next/server";
import { servePdfForSubmission } from "@/lib/assessment/pdf-link";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Permanent, never-expiring link to a submission's PDF report. Redirects to a
 * freshly signed Storage URL on every request so forwarded email links keep
 * working indefinitely.
 */
export async function GET(request: NextRequest, { params }: { params: { uuid: string } }) {
  const limited = rateLimit(`pdf-link:${clientIp(request)}`, { limit: 30, windowMs: 60_000 });
  if (!limited.allowed) {
    return new Response("Too many requests. Wait a moment and try again.", {
      status: 429,
      headers: { "Retry-After": String(Math.ceil(limited.retryAfterMs / 1000) || 60) },
    });
  }

  return servePdfForSubmission(params.uuid);
}
