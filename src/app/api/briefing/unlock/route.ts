import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/admin";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { withRetry } from "@/lib/retry";

export const runtime = "nodejs";

const bodySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().min(1).max(160),
  role: z.string().trim().min(1).max(80),
  slug: z.string().trim().min(1).max(120),
  title: z.string().trim().min(1).max(240),
});

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  const limited = rateLimit(`briefing:${ip}`, { limit: 12, windowMs: 60_000 });
  if (!limited.allowed) {
    return NextResponse.json({ error: "Too many attempts. Wait a minute." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Check the form fields." }, { status: 400 });
  }

  const data = parsed.data;
  const supabase = createServiceClient();

  if (supabase) {
    const result = await withRetry("briefing-unlock", async () => {
      const { error } = await supabase.from("briefing_unlocks").insert({
        name: data.name,
        email: data.email.toLowerCase(),
        company: data.company,
        role: data.role,
        slug: data.slug,
        title: data.title,
        user_agent: request.headers.get("user-agent"),
      });
      if (error) throw error;
    });
    if (!result.ok) {
      console.error("[briefing] insert failed", result.error);
    }
  } else {
    console.info("[briefing] unlock (no supabase)", {
      email: data.email,
      slug: data.slug,
    });
  }

  return NextResponse.json({ ok: true });
}
