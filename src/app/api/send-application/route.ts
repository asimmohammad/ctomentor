import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();

/** Application payload from the apply form (matches ApplyClient schema) */
interface ApplicationData {
  name: string;
  email: string;
  phone?: string;
  company: string;
  companyWebsite?: string;
  role: string;
  stage?: string;
  teamSize?: string;
  stack?: string;
  challenge: string;
  budget?: string;
  timeline?: string;
  equityAlignment?: string;
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();

  if (!RESEND_API_KEY) {
    console.error("[send-application] RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "Email service is not configured. Please contact support." },
      { status: 500 }
    );
  }

  try {
    const data: ApplicationData = await request.json();

    const emailHtml = `
      <h1>New Application Received</h1>
      <h2>Contact Information</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
      
      <h2>Company Details</h2>
      <p><strong>Company:</strong> ${data.company}</p>
      ${data.companyWebsite ? `<p><strong>Website:</strong> ${data.companyWebsite}</p>` : ""}
      <p><strong>Role:</strong> ${data.role}</p>
      <p><strong>Stage:</strong> ${data.stage || "Not specified"}</p>
      <p><strong>Team Size:</strong> ${data.teamSize || "Not specified"}</p>
      <p><strong>Tech Stack:</strong> ${data.stack || "Not specified"}</p>
      
      <h2>Project Details</h2>
      <p><strong>Biggest Challenge:</strong></p>
      <p>${data.challenge}</p>
      
      <h2>Engagement & Timeline</h2>
      <p><strong>Engagement:</strong> ${data.budget || "Not specified"}</p>
      <p><strong>Timeline:</strong> ${data.timeline || "Not specified"}</p>
      ${data.equityAlignment ? `<p><strong>Equity alignment:</strong> ${data.equityAlignment}</p>` : ""}
      
      <hr>
      <p><em>Reply directly to this email to respond to ${data.name}</em></p>
    `;

    const emailPayload = {
      from: "The CTO Mentor <noreply@thectomentor.com>",
      to: ["asim@thectomentor.com"],
      reply_to: data.email,
      subject: `New Application: ${data.name} from ${data.company}`,
      html: emailHtml,
    };

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailPayload),
    });

    const responseText = await emailResponse.text();

    if (!emailResponse.ok) {
      let userMessage = `Failed to send email (${emailResponse.status}).`;
      if (emailResponse.status === 401) {
        userMessage =
          "Email service configuration error: invalid API key. Please add a valid RESEND_API_KEY in Vercel (Settings → Environment Variables) and redeploy.";
      } else {
        try {
          const err = JSON.parse(responseText) as { message?: string };
          if (err.message) userMessage = err.message;
        } catch {
          userMessage = responseText || userMessage;
        }
      }
      console.error("[send-application] Resend API error:", {
        status: emailResponse.status,
        statusText: emailResponse.statusText,
        response: responseText,
      });
      return NextResponse.json(
        { error: userMessage, requestId },
        { status: 500 }
      );
    }

    const totalDuration = Date.now() - startTime;
    console.log(`[send-application] Request ${requestId} completed in ${totalDuration}ms`);

    return NextResponse.json({ success: true, requestId });
  } catch (error: unknown) {
    const totalDuration = Date.now() - startTime;
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    console.error(`[send-application] Request ${requestId} failed after ${totalDuration}ms:`, error);

    return NextResponse.json(
      {
        error: message,
        requestId,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
