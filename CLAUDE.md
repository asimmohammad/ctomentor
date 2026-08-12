# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev            # next dev
npm run build          # check-no-legacy-spa.mjs, then next build
npm run lint           # eslint .
npm run test           # vitest run
npm run test:watch     # vitest
npm run generate:logos # regenerate src/lib/proof-logos.generated.ts

npx vitest run src/lib/assessment/scoring.test.ts       # single test file
npx vitest run -t "keeps a text color"                  # single test by name
```

`prebuild` runs `generate-logo-manifest.mjs` and `brief-check.sh` — both gate every build, local and on Vercel. Vitest only collects `src/**/*.test.ts` (not `.tsx`) and runs in the `node` environment.

Deploy is `git push` to `origin` (`github.com/asimmohammad/ctomentor`); Vercel builds from it. `scripts/commit-and-deploy.sh` wraps this and unstages `.env*` files.

## PROJECT_BRIEF.md is the source of truth

`PROJECT_BRIEF.md` defines positioning, copy rules, and design tokens, and it overrides default marketing-site instincts. Read it before writing page copy or styles. The rules that are mechanically enforced by `scripts/brief-check.sh` at build time:

- **The published price floor is $15,000** (Advisory, three-month total — revised down from $25,000 on 10 Aug 2026; brief §2). `brief-check.sh` fails the build on `$5,000`, `$8,000`, `$8,333`, `$10,000`, `$12,000`, or `From $5` anywhere in `src/` except `pricing.ts`. Monthly-equivalent framing is blocked regardless of size — the brief publishes fixed totals only, never monthly rates.
- **Ladder display strings must not be hardcoded in TSX** — they come from `src/lib/pricing.ts`, which is the single source for `priceDisplay`, `meta`, `priceFrom`, budget select options, and schema.org `Offer` markup.
- **Exactly two CTAs site-wide**, defined in `src/lib/cta.ts`: `PRIMARY_CTA` → `/assessment`, `SECONDARY_CTA` → `/book`. Do not introduce a third label. `/engage` is bottom-of-funnel only — never link cold traffic to it.
- **Testimonials in `src/lib/proof.ts` require a `permissionOn` ISO date** or the build fails. See `docs/PROOF_PERMISSIONS.md` before adding a client logo or quote.

`scripts/check-no-legacy-spa.mjs` fails the build if the phrase "legacy SPA" appears in `src/` — it guards against reintroducing the placeholder copy that once shipped on `/insights/[slug]`.

Also from the brief, not machine-checked: no stock photography, no emoji or exclamation points, first person singular, every claim carries a number, and the word "mentor" never appears in page copy.

## Stack note

**Next.js 14 App Router** + TypeScript + Tailwind on Vercel. `README.md` is accurate and covers routes, env vars, and scripts — start there for orientation.

Leftover `tsconfig.app.json`, `tsconfig.node.json`, and the `react-refresh` ESLint plugin are Vite-era residue; the real config is `tsconfig.json`, which excludes the now-deleted `src/main.tsx`, `src/App.tsx`, and `src/pages`.

Server components by default; `"use client"` only where interactivity requires it. Import via the `@/*` → `src/*` alias. Local env goes in `.env.local` — `.env` and `.env*.local` are gitignored.

Two component layers coexist. `src/components/*.tsx` re-exported from the `@/components` barrel (`Button`, `Card`, `MetricCard`, `Input`, `Select`, `Accordion`, `Nav`, `Footer`, `CTABand`, `ProofBar`, …) is the brief's design system and the default for new work. `src/components/ui/*` is the untrimmed shadcn/ui set from the Lovable-era scaffold — most of it is unused, but roughly nine files still import from it. Don't add new pages against `ui/`; don't bulk-delete it either without checking those importers.

## Design token system

Hex values may appear in **exactly two files**: `src/app/styles/tokens.css` (the runtime source) and `src/lib/token-values.ts` (a mirror used only for contrast math and `/styleguide`). Everything else references CSS variables, usually through Tailwind — `tailwind.config.ts` maps every color, font, and type-scale utility to a `var(--token)`.

Consequences worth knowing:

- The type scale is word-token based: `text-hero`, `text-h1`, `text-lead`, `text-body`, `text-caption`, `text-eyebrow`. These collide with Tailwind's color utilities in `tailwind-merge`, so `src/lib/utils.ts` configures `cn()` to classify them as font sizes. `src/lib/utils.test.ts` is a regression guard for that — a black-on-black button bug traced back to it. Don't change `cn()`'s config without running that test.
- Dark bands rely on a `.bg-dark-band` rule in `globals.css` that flips `--ink-muted` / `--ink-faint` to inverse ramps and sets inherited text to `--ink-inverse`. `--ink` is deliberately *not* remapped, because `Button variant="onDark"` paints a cream fill and needs `text-ink` to stay dark. A light-filled panel nested inside a dark band must set its own muted colors.
- Border radius is 0 on buttons, cards, and bands (2px on inputs only) — deliberate, not an oversight.

## Assessment engine

The core product surface. Two variants share one engine:

| Variant | Quiz route | Results permalink | Config |
|---|---|---|---|
| `investor` | `/assessment` | `/assessment/r/[uuid]` | `src/lib/assessment/configs/investor.ts` |
| `engineering` | `/engineering-assessment` | `/engineering-assessment/r/[uuid]` | `src/lib/assessment/configs/engineering.ts` |

An `AssessmentConfig` (`src/lib/assessment/types.ts`) bundles framing copy, dimensions, 12 questions, benchmarks, and an interpretation matrix. `questions.ts` is the registry — `getAssessmentConfig(variant)`. Adding a variant means adding a config plus its route pair; nothing in the scoring or delivery path should need to change.

- **Scoring** (`scoring.ts`) is pure and config-driven: sum 0–3 option scores per dimension, normalize to 0–100, overall is the mean of the four dimension percentages, then map to a 5-level maturity tier. Covered by `scoring.test.ts`.
- **UI state** (`machine.ts`) is a reducer factory, `createAssessmentReducer(totalQuestions)`, plus localStorage persistence for resume. Phases: `intro` → `question` → `gate`. The exported `assessmentReducer` const is deprecated.
- **Submit** (`src/app/api/assessment/submit/route.ts`, also re-exported as `POST` from `src/app/api/assessment/route.ts` so both paths accept a submission) is the pattern to follow for the other API routes: Zod validate → IP rate limit (`src/lib/rate-limit.ts`) → SHA-256 payload-hash idempotency check → upsert → schedule downstream jobs → return the permalink uuid. PDF and email failures must never fail the response.
  - Post-response work **must** be wrapped in `waitUntil()` from `@vercel/functions`, not a bare `void promise`. A bare floating promise is killed the instant the response returns, which silently dropped emails and PDFs in production. Same applies in `src/app/api/engage/route.ts`.
- **Persistence** has a deliberate two-tier fallback: `repository.ts` writes to Supabase via the service role; if that throws, `store.ts` writes to `data/assessments/` plus an in-memory map so results still render locally. `getAssessment` reads DB → memory → disk.
- **Public results** never expose email or role — `toPublicResult()` in `store.ts` defines the shared payload shape.

- **PDF delivery** goes through a permanent route, `/{assessment|engineering-assessment}/r/[uuid]/pdf`, implemented in `src/lib/assessment/pdf-link.ts`. Emails and the results page must link that path — never a signed Storage URL, because reports get forwarded long after a signature expires. The route *streams the bytes* and regenerates the PDF on demand if the stored object is missing. Two non-obvious constraints: it fetches Storage with raw `fetch(..., { cache: "no-store" })` because the Supabase client's requests were being served from Next's fetch cache (returning already-expired signed URLs), and the route sets `maxDuration = 30` for the rebuild path.
- **Email suppression**: `src/lib/suppressions.ts` + `/api/unsubscribe` + `/unsubscribe` back an idempotent `email_suppressions` table. Check it before sending any new bulk or lifecycle email.

`docs/assessment-backend.md` covers migrations and env setup. `scripts/*.mts` are local probes (PDF layout, regeneration, email links) run with `tsx`, e.g. `npx tsx scripts/pdf-probe.mts` — they are not part of the build.

## Supabase

Migrations in `supabase/migrations/` create one table per funnel surface (`assessment_submissions`, `engage_submissions`, `briefing_unlocks`, `vigil_leads`, `bookings`, `email_suppressions`). **RLS is on with no anon or authenticated policies plus an explicit `revoke all`** — every access path goes through `createServiceClient()` in `src/lib/supabase/admin.ts`, server-side only. The `assessment-pdfs` Storage bucket is private.

Keys are mid-migration from JWT to the new Supabase format. `admin.ts` prefers `SUPABASE_SECRET_KEY` (`sb_secret_...`) and falls back to the legacy `SUPABASE_SERVICE_ROLE_KEY` so the two can be swapped without coordinated deploys; the client side likewise prefers `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` over `NEXT_PUBLIC_SUPABASE_KEY`. Never prefix a secret key with `NEXT_PUBLIC_`. See `docs/SUPABASE_KEY_MIGRATION.md`; remove the fallbacks once the legacy keys are disabled.

`supabase/functions/send-application/` is a Deno edge function deployed separately from the Next.js app; the App Router route `src/app/api/send-application/route.ts` is the in-app path.

## Outbound email and external calls

There is no Resend SDK dependency. Every send is a raw `fetch("https://api.resend.com/emails", …)` with `Authorization: Bearer ${RESEND_API_KEY}` — six call sites across `src/lib/assessment/delivery.ts`, `/api/engage`, `/api/vigil`, `/api/cal/webhook`, and `/api/send-application`. Match that shape rather than adding a client library.

Wrap external calls in `withRetry(label, fn)` from `src/lib/retry.ts`. It retries three times with linear backoff and **returns** `{ ok: false, error }` instead of throwing unless `throwOnExhausted` is set, so callers degrade explicitly. `runAssessmentDownstreamJobs` (`jobs.ts`) is the reference: PDF, results email, contact-tag sync, and internal alert each fail independently and only log.

`src/lib/rate-limit.ts` is an in-memory `Map` on `globalThis`, so limits are per serverless instance and reset on cold start. Adequate today; it needs Redis before it can be treated as a real control.

Assessment result emails are personal plain-styled HTML with inline hex — deliberately not tokenized, because email clients have no CSS variables. That's the one sanctioned exception to the two-files-only hex rule.

## Other conventions

- **Analytics**: components call typed helpers in `src/lib/analytics.ts`, never vendor SDKs directly. It fans out to GA4, LinkedIn, Meta, and Reddit when their env IDs are present. Server-side conversions for `call_booked` fire from the Cal.com webhook via `src/lib/cal/conversions.ts`.
- **Cal.com** booking flow, assessment→booking handoff via `?assessment=`, and the `/api/cal/webhook` contract are documented in `docs/funnel.md`.
- **Insights** are a typed TS catalog (`src/lib/insights/catalog.ts`), not MDX. `isPublishable()` gates rendering; always go through the `src/lib/insights/index.ts` helpers rather than reading the catalog directly. `src/lib/articles.ts` is a back-compat shim.
- **Client logos**: drop `slug.svg|png|webp` (optionally `slug.dark.*`, optionally a `10-` numeric sort prefix) into `src/assets/logo/`, run `npm run generate:logos`, add metadata to `src/lib/proof.ts` (`DISPLAY_NAME_OVERRIDES`, `PROOF_LOGO_METADATA`), and record permission in `docs/PROOF_PERMISSIONS.md`. `proof-logos.generated.ts` is gitignored and regenerated by `prebuild`, so it self-heals on Vercel. The generator rejects camera-roll basenames (`img_1234.png`); its `LEGACY_RENAMES` map is now inert since those files were renamed in the repo, but it will still rewrite matching filenames on disk if they reappear.
- **Redirects are duplicated** in `next.config.mjs` and `vercel.json` (`/services` → `/engagements`, `/pricing` → `/engagements`, `/apply` → `/engage`). Update both.
- `@react-pdf/renderer` is in `serverComponentsExternalPackages` and `@calcom/embed-react` in `transpilePackages` — both required. Note the comment in `next.config.mjs`: `serverExternalPackages` is Next 15+ syntax and breaks this config.
