# Data inventory — thectomentor.com

**Phase 1 deliverable.** Audit of what the codebase actually collects, stores, and transmits as of 2026-07-26.  
**Status:** For owner review. No policy copy written yet. Phases 2–4 wait on your decisions.

**Controllers on this domain (read carefully):**

| Controller | Scope |
|---|---|
| **Asim Mohammad / The CTO Mentor** (advisory practice) | Assessment, newsletter, engage, book prefill, briefing unlocks, site analytics |
| **Helix Platform, Inc.** (helixbots.ai) | `/vigil` lead form only — product qualification for Vigil |

Two controllers share one domain and (today) one Supabase project. Datasets must not be treated as a single pool in privacy copy or retention jobs without an explicit decision.

---

## 1. Collection points

Recommended **lawful basis** and **retention** below are engineer proposals for you to confirm or replace in Phase 3–4. They are not legal advice.

### 1.1 `/assessment` (and `/engineering-assessment`) — gate + full diagnostic

| | |
|---|---|
| **Routes** | `/assessment`, `/engineering-assessment` → `POST /api/assessment/submit` |
| **UI** | `AssessmentClient` → `GateScreen` |
| **Primary store** | Supabase `assessment_submissions` |
| **Also** | Storage bucket `assessment-pdfs`; fallback JSON under `data/assessments/` if Supabase unavailable |
| **Email** | Resend: results to lead; internal alert to `ASSESSMENT_ALERT_EMAIL` (investor roles or low scores); optional ESP sync via `EMAIL_PLATFORM_*` |

#### Fields

| Field | Required | Source | Stored as |
|---|---|---|---|
| `lead.email` | Yes | Gate form | `email` |
| `lead.name` | Yes | Gate form | `name` |
| `lead.company` | Yes | Gate form | `company` |
| `lead.role` | Yes | Gate form (enum) | `role` |
| `variant` | Yes | Page config (`investor` / `engineering`) | `variant` |
| `answers` | Yes | 12 question selections | `answers` (jsonb) |
| `dimension_scores` | Computed | Server scoring | `dimension_scores` |
| `overall_score` | Computed | Server scoring | `overall_score` |
| `tier` | Computed | Server scoring | `tier` |
| `utm_source` | No | Cookie `tra_utm_v1` | `utm_source` |
| `utm_medium` | No | Cookie `tra_utm_v1` | `utm_medium` |
| `utm_campaign` | No | Cookie `tra_utm_v1` | `utm_campaign` |
| `utm_content` | No | Cookie `tra_utm_v1` | `utm_content` |
| `utm_term` | No | Cookie `tra_utm_v1` | `utm_term` |
| `referrer` | No | Cookie `tra_utm_v1` | `referrer` |
| `user_agent` | No | Request header | `user_agent` |
| `ip` | — | Request (rate limit only) | **Not persisted** |
| `payload_hash` | Computed | Server | `payload_hash` |
| `pdf_url` | Computed | PDF job | `pdf_url` |

**Client storage before submit:** `localStorage` keys `tra:progress:v1:investor` / `tra:progress:v1:engineering` hold answers + progress only (no gate PII). Cleared on success.

**Public permalink** `/assessment/r/[uuid]` exposes first name, company, scores — not email.

| | Recommendation (confirm) |
|---|---|
| **Lawful basis** | Contract / steps prior to contract (Art. 6(1)(b)) for delivering the score and follow-up; legitimate interest for UTM attribution on B2B inbound (or consent if you prefer a stricter posture) |
| **Retention** | **24 months** from last activity, then anonymise scores and delete PII / PDFs; keep aggregate stats without identifiers |

---

### 1.2 Newsletter form (homepage + assessment results)

| | |
|---|---|
| **UI** | `NewsletterForm` |
| **POST** | `/api/newsletter` |
| **Store today** | **None** — server logs stub only (`console.info`); TODO ESP |
| **Email** | None |

| Field | Required | Notes |
|---|---|---|
| `email` | Yes | Work email |
| `role` | Yes | pe-deal-partner / operating-partner / ceo-board / cto-vp-eng / other |
| `company` | Yes | Company or fund |

UI copy says “Used only for this list” / “You are on the list” — **code does not persist a list**.

| | Recommendation (confirm) |
|---|---|
| **Lawful basis** | Consent (checkbox + link to privacy) once storage is real |
| **Retention** | Until unsubscribe + **30 days**, then delete; or never store until ESP is wired |

---

### 1.3 `/engage` — bottom-of-funnel application

| | |
|---|---|
| **POST** | `/api/engage` |
| **Store** | Supabase `engage_submissions` |
| **Email** | Resend internal notify → `ASSESSMENT_ALERT_EMAIL` |
| **Draft** | `localStorage` `tra:engage:draft:v1` (includes email while drafting) |

| Field | Required | UI |
|---|---|---|
| `name` | Yes | Name |
| `email` | Yes | Work email |
| `company` | Yes | Company or fund |
| `role` | Yes | Role (free text) |
| `stage` | Yes | Company stage |
| `challenge` | Yes | Binding technology problem |
| `budget` | Yes | Budget select (ladder options) |
| `timeline` | Yes | Timeline |
| `attribution` | Yes | How did you hear about us? |
| `companyWebsite` | No | Company website |
| `equityAlignment` | No | Equity notes |
| `phone` | Optional in schema | **No UI field** — not collected today |
| `utm_source/medium/campaign` | No | From `tra_utm_v1` (not content/term) |
| `referrer` | No | From cookie |
| `user_agent` | No | Header |
| `ip` | — | Rate limit only; **not stored** |

| | Recommendation (confirm) |
|---|---|
| **Lawful basis** | Steps prior to contract (Art. 6(1)(b)) |
| **Retention** | **36 months** if no engagement; longer if converted to a signed engagement (align with contract records) |

---

### 1.4 `/book` — prefill + Cal.com

| | |
|---|---|
| **First-party API** | **None** — site does not insert booking rows |
| **Prefill fields** | `name`, `email`, `company`, `driving` (all required before calendar shows) |
| **Client store** | `sessionStorage` `tra:book:prefill` |
| **Processor** | **Cal.com** (separate) — iframe + query metadata (`company`, `driving`, `assessmentId`) |
| **Warm-start** | `?assessment=` loads name/email/company from assessment record |

Cal.com holds the booking, calendar invite, and reminder emails. This site is a referral surface, not the booking system of record.

| | Recommendation (confirm) |
|---|---|
| **Lawful basis** | Steps prior to contract; Cal.com under its own DPA as processor (or joint controller — your call with counsel) |
| **Retention (Cal.com)** | Per Cal.com settings / your Cal.com account retention; document in privacy once chosen |
| **Retention (sessionStorage)** | Cleared when tab closes |

---

### 1.5 `/vigil` — Helix Platform, Inc. (separate controller)

> **FLAG — two controllers on one domain.**  
> Submissions go to Supabase `vigil_leads` and Resend alert `VIGIL_ALERT_EMAIL` (configured for Helix). UI states Helix is separate from the advisory pipeline. Migration comments say SEPARATE from advisory.  
> **Do not silently commingle** with assessment / engage / newsletter datasets in ops, exports, or “CRM sync” without an explicit written decision and disclosure.

| Field | Required |
|---|---|
| `name` | Yes |
| `email` | Yes |
| `company` | Yes |
| `role` | Yes |
| `stackSummary` | Yes |
| `releaseCadence` | Yes |
| `pain` | Yes |
| `user_agent` | Header (stored) |
| UTM | **Not captured** for vigil |

| | Recommendation (confirm) |
|---|---|
| **Controller** | Helix Platform, Inc. |
| **Lawful basis** | Steps prior to product evaluation / consent |
| **Retention** | Set by Helix; recommend **24 months** inactive, then delete — confirm with Helix ops |
| **Sharing with advisory** | **Default: never.** Owner must decide if any handoff is allowed |

---

### 1.6 Briefing unlock (gated insights) — found in audit

Not in your minimum list, but live in code:

| | |
|---|---|
| **POST** | `/api/briefing/unlock` |
| **Store** | `briefing_unlocks` |
| **Fields** | `name`, `email`, `company`, `role`, `slug`, `title` + `user_agent` |
| **Email** | **None** (copy implies PDF/notes may be sent; code does not send) |

| | Recommendation (confirm) |
|---|---|
| **Lawful basis** | Consent / contract for gated content |
| **Retention** | **12 months**, then delete |

---

### 1.7 Substack subscribe (footer + insights)

Iframe `https://asimmohammad.substack.com/embed` + outbound link. PII goes to **Substack**, not this app.

---

## 2. Third parties (observers / processors)

| Party | Role | What it sees / receives | Consent category (Phase 2) |
|---|---|---|---|
| **Vercel** | Hosting | IP, URL, headers, logs | Necessary |
| **Supabase** | Database + storage | All table rows + PDFs above | Necessary (for forms that need it) |
| **Resend** | Transactional email | Assessment results, internal alerts, engage/vigil notifies | Necessary for those flows |
| **Cal.com** | Bookings | Prefill + booking PII | Necessary for `/book` |
| **Google Analytics 4** `G-0QB3QYL0LZ` | Analytics | Page views, custom events, client IDs — **loads unconditionally today** | Analytics |
| **Substack** | Newsletter / embed | Subscriber email if they use embed; IP via iframe | Marketing / outbound |
| **Fontshare CDN** | Webfonts (Zodiak, Switzer) | Visitor IP + UA on every page — **GDPR risk** | Prefer eliminate (self-host) |
| **jsDelivr** | JetBrains Mono | Visitor IP + UA | Prefer eliminate (self-host) |
| **Meta / LinkedIn / Reddit pixels** | Ads | Only if `NEXT_PUBLIC_*` env set (stubs exist; Marketing-gated in Phase 2) | Marketing |
| **Optional ESP** (`EMAIL_PLATFORM_*`) | Contact sync | Assessment lead fields | Marketing / CRM — disclose if used |

### Fontshare / jsDelivr — recommendation

Loading fonts from third-party CDNs transmits visitor IP addresses to those CDNs. EU case law on hosted webfonts treats this as personal-data transfer requiring a lawful basis. **Self-host Zodiak, Switzer, and JetBrains Mono as woff2 via `next/font/local`.** Removes a compliance issue and a render-blocking third-party request. Implement in Phase 4.

---

## 3. Cookies and browser storage (today)

| Key | Type | Purpose | Consent today |
|---|---|---|---|
| `tra_utm_v1` | 1P cookie (30d) | First-touch UTM + referrer | None |
| `_ga` / `_ga_*` | Google | GA4 | None — **fires before any choice** |
| Meta / LinkedIn / Reddit | 3P | Only if env IDs set | None |
| Cal.com / Substack | 3P iframe | Their cookies when embeds load | None |
| `tra:progress:v1:*` | localStorage | Assessment draft | — |
| `tra:engage:draft:v1` | localStorage | Engage draft (PII) | — |
| `tra:briefing:unlock:*` | localStorage | Unlock flag | — |
| `tra:book:prefill` | sessionStorage | Book prefill | — |

**No consent manager exists.** No Consent Mode v2 defaults.

---

## 4. Gaps — code vs what a visitor can infer

| Visitor could reasonably believe | Code actually does |
|---|---|
| `/privacy` and `/terms` describe current practice | Stubs only (“will be published…”) while live forms + GA run |
| Newsletter puts them “on the list” | Accepts email/role/company; **does not store or sync** |
| Briefing unlock emails a PDF | Stores lead only; **no email** |
| Site has no tracking (brief historically said minimal analytics) | **GA4 always on**; UTM cookie; optional ad pixels |
| Vigil is clearly separate | UI disclosure exists; **same Supabase project** as advisory — ops risk of silent join |
| Fonts are first-party | Fontshare + jsDelivr see every page load |
| Booking data stays “with us” | Held by **Cal.com** |
| Assessment is private to them | Permalink can expose first name + company + scores if URL is shared |
| Engage collects only what’s on the form | Schema allows `phone` with no UI |

---

## 5. Punch list — decisions only you (or counsel) can make

These block or shape Phases 2–4. Engineer cannot decide them:

1. **Governing law and venue** for `/terms` (which US state?).
2. **Retention durations** — confirm or edit the recommendations in §1 (assessment 24mo, engage 36mo, vigil 24mo, briefing 12mo, newsletter until unsubscribe).
3. **Advisory ↔ Helix data sharing** — never / only with explicit dual consent / other. Default recommendation: **never**.
4. **Is newsletter going live as a real list?** If yes, which ESP and when? If no, remove the form or change copy until storage exists.
5. **Do you sell personal information under CCPA?** Inventory assumes **no** — confirm.
6. **Cal.com relationship** — processor under DPA, or treat as independent controller in the privacy notice?
7. **International transfers** — confirm audience includes EEA/UK visitors; confirm SCCs / DPF posture for Supabase, Vercel, Resend, Google, Cal.com.
8. **Public assessment permalinks** — keep name+company visible, or lock down?
9. **Consent Mode / Analytics** — reject-all must disable GA; confirm you still want GA at all after consent.
10. **Whether Fontshare self-host is approved** for Phase 4 (recommended: yes).

---

## 6. Phase 1 complete — stop

No consent UI, policy MDX, form checkboxes, DSAR form, retention SQL, or font self-hosting has been started.

When you approve this inventory (and answer the punch list items you can), say so and Phase 2 (consent manager) proceeds next.
