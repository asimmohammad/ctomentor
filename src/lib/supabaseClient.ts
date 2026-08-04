import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

/**
 * Low-privilege browser client. Currently unimported — every Supabase read and
 * write goes through createServiceClient() in server route handlers. Kept for
 * future client-side use; delete if that never materialises.
 *
 * Prefers the new publishable key (sb_publishable_...) and falls back to the
 * legacy anon JWT during the key migration.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  // eslint-disable-next-line no-console
  console.error(
    "[SUPABASE CLIENT] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Supabase calls will fail until these are set.",
  );
}

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient<Database>(supabaseUrl, supabaseKey)
    : null;

