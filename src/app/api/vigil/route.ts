import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/admin";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { withRetry } from "@/lib/retry";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().min(1).max(160),
  role: z.string().trim().min(1).max(120),
  stackSummary: z.string().trim().min(10).max(2000),
  releaseCadence: z.enum(["daily", "weekly", "biweekly", "monthly", "slower"]),
  pain: z.string().trim().min(20).max(4000),
});

async function notifyHelix(payload: {
  name: string;
  email: string;
  company: string;
  role: string;
  stackSummary: string;
  releaseCadence: string;
  pain: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.info("[vigil] notify stub", payload);
    return;
  }
  const to =
    process.env.VIGIL_ALERT_EMAIL?.trim() ||
    process.env.ASSESSMENT_ALERT_EMAIL?.trim() ||
    "asim@thectomentor.com";

  await withRetry(
    "vigil-notify",
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
          subject: `[Vigil / Helix] ${payload.company} — ${payload.name}`,
          html: `<p><strong>New Vigil qualification (Helix pipeline)</strong></p>
<p>${payload.name} · ${payload.email}<br/>${payload.company} · ${payload.role}</p>
<p>Cadence: ${payload.releaseCadence}</p>
<p><strong>Stack</strong><br/>${payload.stackSummary}</p>
<p><strong>Pain</strong><br/>${payload.pain}</p>
<p><em>Not an advisory /engage lead.</em></p>`,
        }),
      });
      if (!response.ok) throw new Error(await response.text());
    },
    { throwOnExhausted: true },
  );
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  const limited = rateLimit(`vigil:${ip}`, { limit: 8, windowMs: 60_000 });
  if (!limited.allowed) {
    return NextResponse.json({ error: "Too many submissions. Wait a minute." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Check the highlighted fields." }, { status: 400 });
  }

  const data = parsed.data;
  const supabase = createServiceClient();
  let id: string | null = null;

  if (supabase) {
    const result = await withRetry("vigil-insert", async () => {
      const { data: row, error } = await supabase
        .from("vigil_leads")
        .insert({
          name: data.name,
          email: data.email.toLowerCase(),
          company: data.company,
          role: data.role,
          stack_summary: data.stackSummary,
          release_cadence: data.releaseCadence,
          pain: data.pain,
          user_agent: request.headers.get("user-agent"),
        })
        .select("id")
        .single();
      if (error) throw error;
      return row as { id: string };
    });

    if (!result.ok) {
      console.error("[vigil] insert failed", result.error);
      return NextResponse.json(
        { error: "Unable to save right now. Email asim@helixbots.ai." },
        { status: 503 },
      );
    }
    id = result.value.id;
  } else {
    console.warn("[vigil] supabase unavailable — accepting without persistence");
    id = crypto.randomUUID();
  }

  try {
    await notifyHelix(data);
    if (supabase && id) {
      await supabase
        .from("vigil_leads")
        .update({ notified_at: new Date().toISOString() })
        .eq("id", id);
    }
  } catch (error) {
    console.error("[vigil] notify failed", error);
  }

  return NextResponse.json({ ok: true, id });
}
