import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client with elevated privileges (bypasses RLS).
 * Never import this module from client components.
 *
 * Prefers the new secret key (sb_secret_...) and falls back to the legacy
 * service_role JWT so the two can be swapped without coordinated deploys.
 * Remove the legacy fallback once SUPABASE_SECRET_KEY is set everywhere and
 * the legacy keys are disabled in the Supabase dashboard.
 */
export function createServiceClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || process.env.SUPABASE_URL?.trim();
  const serviceKey =
    process.env.SUPABASE_SECRET_KEY?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceKey) {
    console.warn("[supabase-admin] SUPABASE_SECRET_KEY (or legacy SUPABASE_SERVICE_ROLE_KEY) or URL missing");
    return null;
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
