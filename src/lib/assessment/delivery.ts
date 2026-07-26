import { withRetry } from "@/lib/retry";
import type { StoredAssessment } from "./store";
import { getAssessmentConfig } from "./questions";
import { ROLE_OPTIONS } from "./validation";

function roleLabel(role: string): string {
  return ROLE_OPTIONS.find((option) => option.value === role)?.label ?? role;
}

function lowestDimension(record: StoredAssessment): string {
  const sorted = [...record.score.dimensions].sort((a, b) => a.percentage - b.percentage);
  return sorted[0]?.name ?? "Unknown";
}

/**
 * Personal plain-text-styled HTML — no marketing template, no header image.
 */
export function buildResultsEmailHtml(input: {
  record: StoredAssessment;
  resultsUrl: string;
  pdfUrl: string | null;
}): string {
  const { record, resultsUrl, pdfUrl } = input;
  const config = getAssessmentConfig(record.variant);
  const firstName = record.lead.name.trim().split(/\s+/)[0] || "there";
  const tier = `Level ${record.score.tier.level} ${record.score.tier.name}`;

  const pdfLine = pdfUrl
    ? `<p>Your PDF report: <a href="${pdfUrl}">Download the report</a></p>`
    : `<p>Your PDF is still generating — the online results link below has the full detail.</p>`;

  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;background:#FAF8F4;color:#16130F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:16px;line-height:1.6;">
  <p>Hi ${firstName},</p>
  <p>Your ${config.framing.name} score is <strong>${record.score.overall}</strong> — ${tier}.</p>
  <p>I scored four dimensions against a stage median. The detailed interpretation and recommended actions are here:</p>
  <p><a href="${resultsUrl}">${resultsUrl}</a></p>
  ${pdfLine}
  <p>If you want to walk through the findings, reply to this email or request a confidential conversation from the results page.</p>
  <p style="margin-top:32px;">Asim<br/>
  <a href="mailto:asim@thectomentor.com" style="color:#2A2825;">asim@thectomentor.com</a></p>
</body>
</html>
`.trim();
}

export async function sendResultsEmail(input: {
  record: StoredAssessment;
  resultsUrl: string;
  pdfUrl: string | null;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY missing — skipping results email");
    return false;
  }

  const from =
    process.env.ASSESSMENT_FROM_EMAIL?.trim() ||
    "Asim Mohammad <asim@thectomentor.com>";

  const html = buildResultsEmailHtml(input);
  const subject = `Your score: ${input.record.score.overall} — Level ${input.record.score.tier.level} ${input.record.score.tier.name}`;

  const result = await withRetry("resend-results-email", async () => {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [input.record.lead.email],
        reply_to: "asim@thectomentor.com",
        subject,
        html,
        text: `Hi,\n\nYour score is ${input.record.score.overall} (Level ${input.record.score.tier.level} ${input.record.score.tier.name}).\n\nResults: ${input.resultsUrl}\n\nAsim`,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Resend ${response.status}: ${body}`);
    }
    return true;
  });

  if (!result.ok) {
    console.error("[email] results email failed", result.error);
    return false;
  }
  return true;
}

/**
 * Push contact to the ESP with role, tier, and lowest-scoring dimension tags
 * so nurture sequences can branch.
 */
export async function syncContactTags(record: StoredAssessment): Promise<boolean> {
  const apiKey = process.env.EMAIL_PLATFORM_API_KEY?.trim();
  const endpoint = process.env.EMAIL_PLATFORM_URL?.trim();

  if (!apiKey || !endpoint) {
    console.info("[contacts] EMAIL_PLATFORM_* not configured — stub sync", {
      email: record.lead.email,
      role: record.lead.role,
      tier: `Level ${record.score.tier.level} ${record.score.tier.name}`,
      lowestDimension: lowestDimension(record),
    });
    return false;
  }

  const tags = [
    `role:${roleLabel(record.lead.role)}`,
    `tier:Level ${record.score.tier.level} ${record.score.tier.name}`,
    `lowest:${lowestDimension(record)}`,
    `variant:${record.variant}`,
  ];

  const result = await withRetry("esp-contact-sync", async () => {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: record.lead.email,
        name: record.lead.name,
        company: record.lead.company,
        tags,
        metadata: {
          overall_score: record.score.overall,
          role: record.lead.role,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`ESP ${response.status}: ${await response.text()}`);
    }
    return true;
  });

  if (!result.ok) {
    console.error("[contacts] sync failed", result.error);
    return false;
  }
  return true;
}

export async function sendInternalAlert(input: {
  record: StoredAssessment;
  resultsUrl: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return false;

  const to =
    process.env.ASSESSMENT_ALERT_EMAIL?.trim() || "asim@thectomentor.com";
  const { record, resultsUrl } = input;

  const html = `
<p><strong>Hand-raiser assessment</strong></p>
<p>${record.lead.name} · ${record.lead.company}<br/>
${record.lead.email} · ${roleLabel(record.lead.role)}</p>
<p>Score: <strong>${record.score.overall}</strong> — Level ${record.score.tier.level} ${record.score.tier.name}</p>
<p>Lowest dimension: ${lowestDimension(record)}</p>
<p><a href="${resultsUrl}">${resultsUrl}</a></p>
<p>Contact same day.</p>
`.trim();

  const result = await withRetry("internal-alert", async () => {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.ASSESSMENT_FROM_EMAIL?.trim() || "Asim Mohammad <asim@thectomentor.com>",
        to: [to],
        subject: `[Assessment] ${record.lead.company} — ${record.score.overall} (${roleLabel(record.lead.role)})`,
        html,
      }),
    });
    if (!response.ok) throw new Error(`Resend ${response.status}: ${await response.text()}`);
    return true;
  });

  return result.ok;
}

export function shouldAlertInternally(record: StoredAssessment): boolean {
  return (
    record.lead.role === "investor-operating-partner" || record.score.overall < 40
  );
}
