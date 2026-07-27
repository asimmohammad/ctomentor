import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { getAssessment } from "@/lib/assessment/store";
import { sendCallBookedConversions } from "@/lib/cal/conversions";
import { readUtmFromCookieHeader } from "@/lib/assessment/utm";
import { createServiceClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type CalWebhookPayload = {
  triggerEvent?: string;
  createdAt?: string;
  payload?: {
    uid?: string;
    title?: string;
    startTime?: string;
    endTime?: string;
    status?: string;
    responses?: Record<string, { label?: string; value?: unknown } | unknown>;
    attendees?: { name?: string; email?: string }[];
    metadata?: Record<string, unknown>;
    bookingFieldsResponses?: Record<string, unknown>;
  };
};

function verifySignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const digest = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(digest);
  const b = Buffer.from(signature.replace(/^sha256=/, ""));
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function pickString(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (value && typeof value === "object" && "value" in value) {
    const inner = (value as { value?: unknown }).value;
    if (typeof inner === "string" && inner.trim()) return inner.trim();
  }
  return null;
}

function extractField(
  payload: CalWebhookPayload["payload"],
  keys: string[],
): string | null {
  if (!payload) return null;
  const bags = [payload.responses, payload.bookingFieldsResponses, payload.metadata];
  for (const bag of bags) {
    if (!bag || typeof bag !== "object") continue;
    for (const key of keys) {
      const hit = pickString((bag as Record<string, unknown>)[key]);
      if (hit) return hit;
    }
  }
  return null;
}

function mapStatus(trigger: string): "created" | "rescheduled" | "cancelled" | null {
  if (trigger === "BOOKING_CREATED") return "created";
  if (trigger === "BOOKING_RESCHEDULED") return "rescheduled";
  if (trigger === "BOOKING_CANCELLED") return "cancelled";
  return null;
}

async function sendInternalBookingEmail(input: {
  status: string;
  name: string | null;
  email: string | null;
  company: string | null;
  driver: string | null;
  scheduledAt: string | null;
  assessmentId: string | null;
  calUid: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ASSESSMENT_ALERT_EMAIL || "asim@thectomentor.com";
  const from = process.env.ASSESSMENT_FROM_EMAIL || "Asim Mohammad <asim@thectomentor.com>";
  if (!apiKey) {
    console.info("[cal-webhook] Resend unset — skip notify", input);
    return;
  }

  let assessmentBlock = "<p>No linked assessment.</p>";
  if (input.assessmentId) {
    const record = await getAssessment(input.assessmentId);
    if (record) {
      const dims = record.score.dimensions
        .map((d) => `<li>${d.name}: ${d.percentage}/100</li>`)
        .join("");
      assessmentBlock = `
        <p><strong>Assessment</strong> — Level ${record.score.tier.level} ${record.score.tier.name}, ${record.score.overall}/100</p>
        <ul>${dims}</ul>
        <p><a href="https://thectomentor.com/assessment/r/${record.id}">Open results</a></p>
      `;
    } else {
      assessmentBlock = `<p>Assessment id ${input.assessmentId} not found in store.</p>`;
    }
  }

  const html = `
    <p><strong>Booking ${input.status}</strong></p>
    <p>When: ${input.scheduledAt ?? "n/a"}</p>
    <p>Name: ${input.name ?? "—"}<br/>Email: ${input.email ?? "—"}<br/>Company: ${input.company ?? "—"}</p>
    <p>Driver: ${input.driver ?? "—"}</p>
    <p>Cal UID: ${input.calUid}</p>
    ${assessmentBlock}
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `[Booking ${input.status}] ${input.company || input.name || input.email || input.calUid}`,
      html,
    }),
  });

  if (!response.ok) {
    console.warn("[cal-webhook] notify failed", await response.text());
  }
}

export async function POST(request: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature =
    request.headers.get("x-cal-signature-256") ||
    request.headers.get("X-Cal-Signature-256");

  if (!verifySignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body: CalWebhookPayload;
  try {
    body = JSON.parse(rawBody) as CalWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const trigger = body.triggerEvent ?? "";
  const status = mapStatus(trigger);
  if (!status) {
    return NextResponse.json({ ok: true, ignored: trigger });
  }

  const payload = body.payload;
  const calUid = payload?.uid;
  if (!calUid) {
    return NextResponse.json({ error: "Missing booking uid" }, { status: 400 });
  }

  const attendee = payload?.attendees?.[0];
  const name =
    attendee?.name ||
    extractField(payload, ["name", "Name"]) ||
    null;
  const email =
    attendee?.email ||
    extractField(payload, ["email", "Email"]) ||
    null;
  const company = extractField(payload, ["company", "Company", "metadata.company"]);
  const driver = extractField(payload, [
    "driving",
    "driver",
    "notes",
    "What's driving this?",
    "whats-driving-this",
  ]);
  const assessmentRaw = extractField(payload, [
    "assessmentId",
    "assessment_id",
    "assessmentid",
  ]);

  let assessmentId: string | null = null;
  if (assessmentRaw) {
    const uuidLike =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        assessmentRaw,
      );
    if (uuidLike) assessmentId = assessmentRaw;
  }

  const scheduledAt = payload?.startTime ?? null;
  const utm = readUtmFromCookieHeader(request.headers.get("cookie"));

  const row = {
    cal_uid: calUid,
    status,
    scheduled_at: scheduledAt,
    name,
    email,
    company,
    driver,
    assessment_id: assessmentId,
    utm_source: utm?.utm_source ?? null,
    utm_medium: utm?.utm_medium ?? null,
    utm_campaign: utm?.utm_campaign ?? null,
    referrer: utm?.referrer ?? null,
    raw: body as unknown as Record<string, unknown>,
    updated_at: new Date().toISOString(),
  };

  const supabase = createServiceClient();
  if (supabase) {
    const { error } = await supabase.from("bookings").upsert(row, { onConflict: "cal_uid" });
    if (error) {
      console.error("[cal-webhook] upsert failed", error);
      return NextResponse.json({ error: "Persist failed" }, { status: 500 });
    }
  } else {
    console.warn("[cal-webhook] Supabase admin unavailable — booking not persisted", row);
  }

  if (status === "created") {
    await sendInternalBookingEmail({
      status,
      name,
      email,
      company,
      driver,
      scheduledAt,
      assessmentId,
      calUid,
    });

    if (email) {
      await sendCallBookedConversions({
        email,
        scheduledAt,
        assessmentLinked: Boolean(assessmentId),
        eventId: calUid,
      });
    }
  }

  return NextResponse.json({ ok: true });
}
