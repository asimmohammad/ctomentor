import { NextRequest, NextResponse } from "next/server";

export type NewsletterPayload = {
  email: string;
  role: string;
  company: string;
};

/**
 * Newsletter capture — provider call stubbed until ESP is wired.
 * Accepts email, role, and company for list segmentation.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<NewsletterPayload>;
    const email = body.email?.trim() ?? "";
    const role = body.role?.trim() ?? "";
    const company = body.company?.trim() ?? "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid work email." }, { status: 400 });
    }
    if (!role) {
      return NextResponse.json({ error: "Select your role." }, { status: 400 });
    }
    if (!company) {
      return NextResponse.json({ error: "Enter your company or fund." }, { status: 400 });
    }

    // TODO: forward to ESP (Resend / Buttondown / etc.)
    console.info("[newsletter] stub capture", { email, role, company });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to subscribe right now." }, { status: 500 });
  }
}
