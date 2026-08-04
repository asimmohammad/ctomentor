# Supabase API key migration

Moves this project from the legacy JWT `anon` / `service_role` keys to Supabase's publishable and secret keys, then disables the legacy pair.

## Why

A legacy `anon` JWT for project `mzndfyiejmyeuyshjtfe` was committed to `.env` in this public repository. It has been untracked, but the blob stays reachable in git history.

Straight rotation of a legacy `anon` key is no longer offered. Supabase's own guidance states it "is no longer possible to rotate the legacy anon, service and JWT secrets" without first migrating to asymmetric signing keys, and that regenerating the JWT secret immediately invalidates every API secret and severs all connections using them ([Supabase troubleshooting](https://supabase.com/docs/guides/troubleshooting/rotating-anon-service-and-jwt-secrets-1Jq6yd)).

Migrating to the new key system is the supported path. Both key types work simultaneously, so clients swap one at a time and the legacy keys are deactivated only after nothing depends on them ([Supabase migration guide](https://supabase.com/docs/guides/getting-started/migrating-to-new-api-keys)). Rotating new-format keys does not invalidate user sessions.

Legacy keys are deprecated by the end of 2026, so this migration is required eventually regardless.

## Exposure assessment

The leaked key is low risk. It should still be retired, but there is no incident here.

| Check | Finding |
| --- | --- |
| Key role | `anon` — low privilege, guarded by RLS. Not `service_role` |
| RLS on all five tables | Enabled, with **zero** `anon` or `authenticated` policies |
| Table grants | Every migration runs `revoke all ... from anon, authenticated` |
| Storage | `assessment-pdfs` bucket is private; a policy blocks `anon` reads |
| Code using the anon key | `src/lib/supabaseClient.ts` only — and nothing imports it |

Every read and write in the app goes through `createServiceClient()` in server-side route handlers. The anon key was never on a live path.

## Steps

### 1. Create the new keys

Dashboard → **Settings → API Keys** → **Publishable and secret API keys** tab → **Create new API keys**.

This adds a `default` publishable key and a `default` secret key alongside the legacy pair. Existing keys keep working. Nothing breaks at this step.

### 2. Set the new variables in Vercel

Project → **Settings → Environment Variables**. Add to Production, Preview, and Development:

| Variable | Value |
| --- | --- |
| `SUPABASE_SECRET_KEY` | `sb_secret_...` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_...` |

Leave `SUPABASE_SERVICE_ROLE_KEY` and `NEXT_PUBLIC_SUPABASE_KEY` in place for now. `src/lib/supabase/admin.ts` and `src/lib/supabaseClient.ts` read the new names first and fall back to the legacy names, so ordering does not matter and there is no coordinated-deploy requirement.

### 3. Update the Edge Function secret

The `send-application` function runs on Supabase, not Vercel, and needs its own secret:

```sh
supabase secrets set SUPABASE_SECRET_KEY=sb_secret_... --project-ref mzndfyiejmyeuyshjtfe
supabase functions deploy send-application --project-ref mzndfyiejmyeuyshjtfe
```

Confirm `supabase/functions/send-application/index.ts` reads the new name before relying on it.

### 4. Redeploy and verify

Trigger a Vercel deploy so the new variables are picked up. Then exercise each write path and confirm a row lands in the matching table:

| Path | Table |
| --- | --- |
| `/assessment` submit | `assessment_submissions` |
| `/engage` submit | `engage_submissions` |
| Briefing email gate | `briefing_unlocks` |
| `/vigil` qualify form | `vigil_leads` |
| Cal.com booking webhook | `bookings` |

Also confirm the assessment PDF uploads to the `assessment-pdfs` bucket and its signed URL resolves. Check Vercel function logs for `[supabase-admin]` warnings, which indicate a missing key.

### 5. Disable the legacy keys

Only after step 4 passes end to end. Dashboard → **Settings → API Keys** → disable the `anon` and `service_role` keys.

This is the step that actually neutralises the key exposed in git history. Everything before it is preparation.

The setting is reversible, so re-enable it if something was missed.

### 6. Clean up

Once the legacy keys are disabled and the site is healthy:

- Delete `SUPABASE_SERVICE_ROLE_KEY` and `NEXT_PUBLIC_SUPABASE_KEY` from Vercel.
- Delete the legacy fallback lines from `.env.example`.
- Drop the `|| process.env.SUPABASE_SERVICE_ROLE_KEY` fallback in `src/lib/supabase/admin.ts` and the matching fallback in `src/lib/supabaseClient.ts`.

## Rollback

Before step 5, rollback is trivial: the legacy keys are still active, so removing the new variables restores the previous state.

After step 5, re-enable the legacy keys in the dashboard.
