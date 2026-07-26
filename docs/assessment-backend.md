# Assessment backend

## 1. Apply the migration

Run `supabase/migrations/20260726000000_assessment_submissions.sql` in the Supabase SQL editor
(or `supabase db push`).

This creates:

- `assessment_submissions` with RLS enabled and **no anon/authenticated policies**
  (writes only via `SUPABASE_SERVICE_ROLE_KEY` on the server)
- private Storage bucket `assessment-pdfs`

## 2. Environment

Copy `.env.example` and set at minimum:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (server only — never `NEXT_PUBLIC_`)
- `RESEND_API_KEY`

Optional: `EMAIL_PLATFORM_URL` + `EMAIL_PLATFORM_API_KEY` for ESP contact tagging.

## 3. Flow

1. `UtmCapture` stores first-touch UTMs in cookie `tra_utm_v1`
2. `POST /api/assessment/submit` validates (Zod), rate-limits by IP, upserts by email+variant,
   returns permalink uuid immediately
3. Downstream (async): PDF → Storage → Resend email → ESP tags → internal alert when
   role is Investor/Operating Partner **or** overall &lt; 40
4. If Supabase is down, submit falls back to local `data/assessments/` so results still render
