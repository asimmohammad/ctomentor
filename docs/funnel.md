# Funnel: /book and /engage

## Canonical CTAs (`src/lib/cta.ts`)

| Constant | Label | Href |
|---|---|---|
| `PRIMARY_CTA` | Take the Technical Risk Assessment | `/assessment` |
| `SECONDARY_CTA` | Request a confidential conversation | `/book` |

## `/book` — Book a Conversation

1. Two-column layout: left copy + pricing line + bio; right Cal.com **inline** embed (`@calcom/embed-react`).
2. Env: `NEXT_PUBLIC_CAL_USERNAME`, `NEXT_PUBLIC_CAL_EVENT_SLUG`, `CAL_WEBHOOK_SECRET`, `CAL_API_KEY`.
3. Live event: `https://cal.com/asim-mohammad-0ydj0s/book-a-conversation`. Slug renamed
   12 Aug 2026; Cal.com left no redirect, so links shared before then are dead.
4. Assessment handoff: `?assessment=` loads context card + prefill (name, email, company, driver suggestion, assessmentId).
5. Webhook: `POST /api/cal/webhook` → `bookings` table + Resend notify + optional CAPI.
6. Success: `/book/confirmed` (legacy `/book/confirmation` redirects).

Configure in Cal.com: 24h/1h reminders, custom fields (`company`, `driving`/`notes`, hidden `assessmentId`), webhook signature secret, success redirect to `/book/confirmed`.

## `/engage`

Bottom-of-funnel application only. Cold traffic → assessment.
