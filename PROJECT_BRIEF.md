# PROJECT_BRIEF.md

> Drop this file in the repo root. Reference it in every Cursor prompt with `@PROJECT_BRIEF.md`.
> It is the persistent source of truth for positioning, design tokens, and copy rules.

---

## 1. What this site is

The marketing site for an independent technology-advisory practice run by **Asim Mohammad** — a 25-year technology executive (Duke MBA, current SaaS CTO, AWS GovCloud/FedRAMP, SOC 2 Type II, technical due diligence supporting a $600M exit).

**Primary buyer (beachhead ICP):** PE/VC deal partners and operating partners at funds with $100M–$2B AUM who need independent technical due diligence and portfolio-company CTO support.

**Secondary buyer:** CEOs and boards at Series A–C software companies, 50–500 employees.

**Tertiary:** CTOs and VPs of Engineering — the audience for the Vigil product line (see §7).

**The job of this site:** convert a skeptical, time-poor, sophisticated buyer into a completed Technical Risk Assessment, then into a booked 30-minute call, then into a $25,000 Diagnostic Sprint.

## 2. Non-negotiable positioning rules

These override any default marketing-site pattern an AI would otherwise reach for.

1. **The word "mentor" never appears in page copy.** It prices the practice at $500/hour. It may remain in the domain name and the newsletter brand only.
2. **The lowest price shown anywhere on the site is $25,000.** The old "From $5,000/mo" tier is deleted, permanently. Do not reintroduce it in any comparison table, FAQ, or schema markup.
3. **Exactly two CTAs exist site-wide.**
   - Primary: **"Take the Technical Risk Assessment"** → `/assessment`
   - Secondary: **"Request a confidential conversation"** → `/book`
   No other CTA label may be introduced. The old site had six.
4. **Never send cold traffic to the application form.** `/engage` is bottom-of-funnel only.
5. **No stock photography, ever.** No handshakes, no laptops, no diverse-people-in-a-meeting. Where imagery is unavailable, use typography and whitespace.
6. **No emoji, no exclamation points, no "In today's fast-paced world."** The voice is a senior operator writing to a peer.
7. **Every claim carries a number or it gets cut.**

## 3. Voice and copy rules

- First person singular. "I" not "we," except when referring to the bench.
- Sentences under 25 words. Paragraphs under 4 lines.
- Concrete over abstract: "reduced cloud spend 38%" not "drove significant efficiencies."
- The buyer's fear, in the buyer's words: technical debt discovered after close; an engineering org that cannot survive the growth case in the model; a security posture that fails the first enterprise review.
- Disqualify openly. "Who this is not for" is a conversion asset.

## 4. The offer ladder

| Tier | Price | Shape |
|---|---|---|
| Diagnostic Sprint | **$25,000** fixed | 3 weeks. Findings report, scored risk register, 90-day remediation plan, board/deal-team readout. The standard first engagement. |
| Embedded Technology Leadership | **$25,000/mo** | 3-month minimum. 1–2 days/week embedded. Flag as "most common engagement." |
| Technical Due Diligence | **$35,000–$50,000** per transaction | Pre-acquisition. Architecture, security, scalability, team. IC-ready written report. |
| Portfolio Technology Partner | **$50,000/mo** | Multi-company fund retainer. Standing diligence capacity plus portfolio support via the bench. |

## 5. Design tokens — use these exact values

### Light mode

| Role | Hex | Usage |
|---|---|---|
| `--paper` | `#FAF8F4` | Page background |
| `--surface` | `#FFFFFF` | Cards |
| `--surface-alt` | `#F2EFE9` | Alternating sections |
| `--ink` | `#16130F` | Headings, primary text |
| `--ink-muted` | `#6B655C` | Secondary text |
| `--ink-faint` | `#A39C90` | Captions, placeholders |
| `--border` | `#DDD8CE` | Dividers, card borders |
| `--accent` | `#8A2B22` | Links, primary buttons, single points of emphasis |
| `--accent-hover` | `#6E211A` | Hover |
| `--ink-inverse` | `#FAF8F4` | Text on dark bands |
| `--dark-band` | `#16130F` | Full-bleed dark sections |
| `--success` | `#3F6B32` | |
| `--warning` | `#8A5A17` | |
| `--error` | `#A12C2C` | |

### Dark mode

| Role | Hex |
|---|---|
| `--paper` | `#14120F` |
| `--surface` | `#1A1815` |
| `--surface-alt` | `#201D19` |
| `--ink` | `#E8E4DC` |
| `--ink-muted` | `#9A9388` |
| `--ink-faint` | `#6B655C` |
| `--border` | `#33302B` |
| `--accent` | `#C9564A` |
| `--accent-hover` | `#DE6B5E` |

**Rule:** one accent plus neutrals. If more than ~5% of a viewport is accent-colored, it is wrong. Semantic colors appear only in the assessment results UI.

### Typography

Both faces load from **Fontshare** (not Google Fonts — Roboto and Open Sans are being removed precisely because they read as template).

- **Display — `Zodiak`**, weights 700 and 800. Headings only, 28px and above.
- **Text — `Switzer`**, weights 400, 500, 600. All body, UI, nav, buttons.
- **Mono — `JetBrains Mono`**, weight 500. Eyebrow labels only, uppercase, 12px, 0.12em tracking.

```html
<link rel="preconnect" href="https://api.fontshare.com" crossorigin>
<link href="https://api.fontshare.com/v2/css?f[]=zodiak@700,800&f[]=switzer@400,500,600&display=swap" rel="stylesheet">
```

Fallback stacks: `Zodiak, 'Iowan Old Style', Georgia, serif` and `Switzer, -apple-system, 'Segoe UI', sans-serif`.

### Type scale

| Token | Size | Line height | Tracking | Face |
|---|---|---|---|---|
| `--fs-hero` | `clamp(2.75rem, 6vw, 5rem)` | 1.03 | -0.03em | Zodiak 800 |
| `--fs-h1` | `clamp(2.25rem, 4vw, 3.5rem)` | 1.08 | -0.025em | Zodiak 700 |
| `--fs-h2` | `clamp(1.75rem, 3vw, 2.5rem)` | 1.15 | -0.02em | Zodiak 700 |
| `--fs-h3` | `1.5rem` | 1.25 | -0.01em | Switzer 600 |
| `--fs-h4` | `1.25rem` | 1.35 | 0 | Switzer 600 |
| `--fs-lead` | `1.1875rem` | 1.6 | 0 | Switzer 400 |
| `--fs-body` | `1.0625rem` | 1.65 | 0 | Switzer 400 |
| `--fs-small` | `0.9375rem` | 1.55 | 0 | Switzer 400 |
| `--fs-caption` | `0.8125rem` | 1.45 | 0.01em | Switzer 500 |
| `--fs-eyebrow` | `0.75rem` | 1 | 0.12em | JetBrains Mono 500, uppercase |

Numerals in metrics and tables: `font-variant-numeric: tabular-nums lining-nums`.

### Layout and spacing

- Base unit 4px. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.
- Content max width **1200px**. Long-form measure **68ch**.
- 12-column grid, 24px gutters desktop / 16px mobile.
- Section padding: compact 64px, standard 96px, generous 144px (vertical, desktop); scale to 48/64/80 on mobile.

### Components

- **Border radius 0** on buttons, cards, and bands — the sharp-cornered institutional look is deliberate and is retained from the current site. Inputs get **2px** only.
- Buttons: primary is solid `--accent` with `--paper` text; secondary is a 1px `--ink` outline on transparent; ghost is text plus underline on hover. All need `:hover`, `:focus-visible` (2px offset outline), `:active`, and `:disabled`.
- Cards: 1px `--border`, no shadow. Hover raises border to `--ink` — no lift, no shadow.

### Motion

- Durations: 150ms micro, 250ms standard, 400ms entrance. Easing `cubic-bezier(0.2, 0, 0.13, 1)`.
- The only entrance animation permitted: fade from 0 to 1 with a 16px upward translate, triggered by IntersectionObserver.
- No parallax, no scroll-jacking, no counting-up numbers, no marquee.
- `@media (prefers-reduced-motion: reduce)` must disable all of it.

### Accessibility floor

WCAG AA throughout: 4.5:1 body, 3:1 large text. Visible focus states on every interactive element. Full keyboard operability. 16px minimum body size on mobile. Semantic landmarks. Alt text on all imagery.

## 6. Known defects in the current production site

Fix these first; they are all real and all verified live on 25 July 2026.

1. **TLS certificate expired 70 days ago** on both apex and `www` — every visitor sees `NET::ERR_CERT_DATE_INVALID`.
2. **All 8 articles under `/insights/[slug]` render a developer placeholder** in production: *"Full article content is being served from the legacy SPA version today… when you are ready to fully decommission the Vite app."*
3. **Mobile nav drawer clips every label on its left edge** at 390px ("Services" → "vices", "About" → "out"). Overlay is semi-transparent and does not lock background scroll.
4. **The Substack iframe renders twice on the homepage.**
5. **`/experience` has the heading "Where We've Been Brought In" with no content beneath it.**
6. **The "Insights" nav item shows a dropdown chevron that opens nothing.**
7. No email address or phone number published anywhere on the site.
8. No analytics, no pixels, no privacy policy, no cookie consent.

## 7. The Vigil relationship

The principal is co-founder and CEO of **Helix Platform, Inc.** (helixbots.ai), whose product **Vigil** is a spec-driven autonomous QA platform built on a 10-agent pipeline on AWS AgentCore. The advisory practice diagnoses engineering-quality failure; Vigil is what gets deployed to fix it. This relationship must be stated plainly on the site with an explicit conflict-of-interest disclosure — the transparency is what makes it credible.

## 8. Stack

Next.js 14 App Router, TypeScript, Tailwind, deployed on Vercel. Server components by default; `"use client"` only where interactivity genuinely requires it. Target Lighthouse 95+ on performance, accessibility, best practices, and SEO.
