# thectomentor.com

Marketing and lead-generation site for an independent technology-advisory practice. The site converts a visitor into a completed Technical Risk Assessment, then into a booked conversation, then into a paid diagnostic engagement.

`PROJECT_BRIEF.md` is the source of truth for positioning, voice, and design tokens. Read it before changing copy or layout.

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| UI | React 18, shadcn/ui, Radix primitives |
| Styling | Tailwind CSS |
| Data | Supabase (Postgres, RLS, Edge Functions) |
| Email | Resend |
| Scheduling | Cal.com embed plus webhook |
| PDF | `@react-pdf/renderer` |
| Tests | Vitest |
| Hosting | Vercel |

## Local development

Requires Node.js 20 or later. The lockfile is Bun (`bun.lockb`); `package-lock.json` is also committed, so npm works.

```sh
git clone https://github.com/asimmohammad/ctomentor.git
cd ctomentor
npm install
cp .env.example .env.local   # fill in the values described below
npm run dev
```

The dev server runs on `http://localhost:3000`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Next dev server |
| `npm run build` | Guards against legacy SPA files, then builds. `prebuild` regenerates the logo manifest and runs the brief check |
| `npm start` | Serves the production build |
| `npm run lint` | ESLint across the repo |
| `npm test` | Vitest suite (scoring, proof-name, utils) |
| `npm run generate:logos` | Regenerates `src/lib/proof-logos.generated.ts` (gitignored) |

## Environment variables

Copy `.env.example` to `.env.local` and fill it in. Never commit a populated env file — `.env` and `.env*.local` are gitignored.

Required:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_KEY` — client-safe Supabase project URL and anon key
- `SUPABASE_SERVICE_ROLE_KEY` — server only, never expose to the client
- `RESEND_API_KEY` — transactional email
- `ASSESSMENT_FROM_EMAIL`, `ASSESSMENT_ALERT_EMAIL` — sender and internal alert recipient
- `NEXT_PUBLIC_CAL_USERNAME`, `NEXT_PUBLIC_CAL_EVENT_SLUG` — Cal.com embed target
- `CAL_WEBHOOK_SECRET`, `CAL_API_KEY` — booking webhook verification

Optional: ad pixels (`NEXT_PUBLIC_*_PIXEL_ID`), server-side Conversions API tokens, ESP contact sync, and `VIGIL_ALERT_EMAIL` for the separate Vigil lead stream. See `.env.example` for the full annotated list.

## Architecture

### Routes

Marketing pages live in `src/app`: `/`, `/about`, `/experience`, `/engagements`, `/case-studies`, `/insights`, `/investors`, `/government`, `/circle`, `/vigil`, `/styleguide`, plus `/privacy` and `/terms`.

Funnel pages: `/assessment` and `/engineering-assessment` (with shareable results at `/{...}/r/[uuid]`), `/book` and `/book/confirmed`, `/engage` and `/engage/confirmation`.

API routes under `src/app/api`: `assessment`, `assessment/submit`, `briefing/unlock`, `cal/webhook`, `engage`, `newsletter`, `send-application`, `vigil`. RSS is served from `src/app/feed.xml/route.ts`.

Legacy paths (`/services`, `/pricing`, `/apply`) redirect permanently — declared in both `next.config.mjs` and `vercel.json`.

### Assessment engine

`src/lib/assessment` holds the whole flow: question configs and interpretation copy for the investor and engineering variants, a step machine, Zod validation, scoring with unit tests, PDF rendering, and delivery. Submissions persist through `repository.ts` to Supabase.

### Supabase

Migrations in `supabase/migrations` cover assessment submissions, engage submissions, briefing unlocks, vigil leads, and bookings. The `send-application` Edge Function lives in `supabase/functions`.

Deploy the function and set its secret:

```sh
supabase link --project-ref <project-ref>
supabase secrets set RESEND_API_KEY=<key> --project-ref <project-ref>
supabase functions deploy send-application --project-ref <project-ref>
```

If email is not arriving, confirm the function is listed under Edge Functions in the Supabase dashboard and check its logs.

## Deployment

Pushing to `main` deploys through Vercel. `npm run build` must pass locally first — the `prebuild` brief check and the legacy-SPA guard both fail the build on violations.
