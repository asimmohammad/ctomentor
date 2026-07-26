# Funnel: /book and /engage

Two-tier conversion funnel. Cold traffic never lands on `/engage`.

## Canonical CTAs (`src/lib/cta.ts`)

| Key | Label | Href |
|-----|-------|------|
| `PRIMARY_CTA` | Take the Technical Risk Assessment | `/assessment` |
| `SECONDARY_CTA` | Request a confidential conversation | `/book` |

`ENGAGE_PATH` (`/engage`) is bottom-of-funnel only. `/apply` permanently redirects to `/engage`.

## `/book` — Technical Risk Conversation

1. Four pre-booking fields (name, work email, company, what's driving this).
2. Inline Cal.com embed (`NEXT_PUBLIC_CAL_LINK`, default `asim/technical-risk-conversation`).
3. Optional `?assessment=<uuid>` warm-starts copy and prefills from the submission.
4. Confirmation lists three prep items and prompts the assessment if missing.

**Cal.com:** configure email reminders at **24 hours** and **1 hour** on the event type (show rates 70–80% with reminders).

## `/engage` — Engagement application

Eight fields across three steps with progress, inline validation, and `localStorage` save/resume.

Budget options match the offer ladder ($25k sprint / $25–50k mo / $50k+ mo / diligence). Attribution is required.

Submissions → `engage_submissions` (migration `20260726010000_engage_submissions.sql`) + Resend internal alert.
