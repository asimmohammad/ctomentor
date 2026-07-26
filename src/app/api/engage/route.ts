import { NextRequest, NextResponse } from "next/server";
import { engageSchema } from "@/lib/funnel/schemas";
import { createServiceClient } from "@/lib/supabase/admin";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { readUtmFromCookieHeader } from "@/lib/assessment/utm";
import { withRetry } from "@/lib/retry";

export const runtime = "nodejs";

async function notifyInternal(payload: {
  name: string;
  email: string;
  company: string;
  role: string;
  budget: string;
  timeline: string;
  attribution: string;
  challenge: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.info("[engage] internal notify stub", payload);
    return;
  }
  const to = process.env.ASSESSMENT_ALERT_EMAIL?.trim() || "asim@thectomentor.com";
  await withRetry(
    "engage-notify",
    async () => {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.ASSESSMENT_FROM_EMAIL?.trim() || "Asim Mohammad <asim@thectomentor.com>",
          to: [to],
          subject: `[Engage] ${payload.company} — ${payload.name}`,
          html: `<p><strong>New /engage application</strong></p>
<p>${payload.name} · ${payload.email}<br/>${payload.company} · ${payload.role}</p>
<p>Engagement: ${payload.budget}<br/>Timeline: ${payload.timeline}<br/>Heard via: ${payload.attribution}</p>
<p>${payload.challenge}</p>`,
        }),
      });
      if (!response.ok) throw new Error(await response.text());
    },
    { throwOnExhausted: true },
  );
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  const limited = rateLimit(`engage:${ip}`, { limit: 8, windowMs: 60_000 });
  if (!limited.allowed) {
    return NextResponse.json({ error: "Too many submissions. Wait a minute and try again." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = engageSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Check the highlighted fields.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const attributionCookie = readUtmFromCookieHeader(request.headers.get("cookie")) ?? {};
  const supabase = createServiceClient();

  let id: string | null = null;

  if (supabase) {
    const result = await withRetry("engage-insert", async () => {
      const { data: row, error } = await supabase
        .from("engage_submissions")
        .insert({
          name: data.name,
          email: data.email.toLowerCase(),
          company: data.company,
          role: data.role,
          stage: data.stage,
          challenge: data.challenge,
          budget: data.budget,
          timeline: data.timeline,
          attribution: data.attribution,
          equity_alignment: data.equityAlignment || null,
          company_website: data.companyWebsite || null,
          phone: data.phone || null,
          utm_source: attributionCookie.utm_source ?? null,
          utm_medium: attributionCookie.utm_medium ?? null,
          utm_campaign: attributionCookie.utm_campaign ?? null,
          referrer: attributionCookie.referrer ?? null,
          user_agent: request.headers.get("user-agent"),
        })
        .select("id")
        .single();
      if (error) throw error;
      return row as { id: string };
    });

    if (result.ok) {
      id = result.value.id;
      try {
        await notifyInternal({
          name: data.name,
          email: data.email,
          company: data.company,
          role: data.role,
          budget: data.budget,
          timeline: data.timeline,
          attribution: data.attribution,
          challenge: data.challenge,
        });
        await supabase
          .from("engage_submissions")
          .update({ notified_at: new Date().toISOString() })
          .eq("id", id);
      } catch (error) {
        console.error("[engage] notify failed", error);
      }
    } else {
      console.error("[engage] insert failed", result.error);
      return NextResponse.json(
        { error: "Unable to save your application right now. Email asim@thectomentor.com." },
        { status: 503 },
      );
    }
  } else {
    console.warn("[engage] supabase unavailable — accepting submission without persistence");
    id = crypto.randomUUID();
    void notifyInternal({
      name: data.name,
      email: data.email,
      company: data.company,
      role: data.role,
      budget: data.budget,
      timeline: data.timeline,
      attribution: data.attribution,
      challenge: data.challenge,
    }).catch((error) => console.error("[engage] notify failed", error));
  }

  return NextResponse.json({ ok: true, id });
}
