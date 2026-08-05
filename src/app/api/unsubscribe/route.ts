import { NextRequest, NextResponse } from "next/server";
import { suppressEmail } from "@/lib/suppressions";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/unsubscribe
 * Adds an address to the suppression list. Deliberately does not reveal whether
 * the address was on any list — it always reports success for a valid address.
 */
export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  const limited = rateLimit(`unsubscribe:${ip}`, { limit: 20, windowMs: 60_000 });
  if (!limited.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Wait a minute and try again." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(limited.retryAfterMs / 1000) || 60) },
      },
    );
  }

  let body: { email?: unknown; campaign?: unknown; reason?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const campaign =
    typeof body.campaign === "string" && body.campaign.trim()
      ? body.campaign.trim().slice(0, 120)
      : null;
  const reason =
    typeof body.reason === "string" && body.reason.trim()
      ? body.reason.trim().slice(0, 500)
      : null;

  const recorded = await suppressEmail({
    email,
    source: "unsubscribe-page",
    campaign,
    reason,
    userAgent: request.headers.get("user-agent"),
  });

  if (!recorded) {
    return NextResponse.json(
      { error: "Unable to process that right now. Email asim@thectomentor.com and it will be handled manually." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
