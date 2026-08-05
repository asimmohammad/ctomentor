import { createServiceClient } from "@/lib/supabase/admin";
import { withRetry } from "@/lib/retry";

export type SuppressionInput = {
  email: string;
  /** Where the request came from, e.g. "unsubscribe-page". */
  source?: string | null;
  /** Optional campaign identifier passed through the unsubscribe link. */
  campaign?: string | null;
  reason?: string | null;
  userAgent?: string | null;
};

/**
 * Adds an address to the suppression list. Idempotent — re-unsubscribing an
 * existing address refreshes updated_at rather than erroring.
 */
export async function suppressEmail(input: SuppressionInput): Promise<boolean> {
  const supabase = createServiceClient();
  if (!supabase) {
    console.error("[suppressions] Supabase not configured — unsubscribe not recorded", {
      email: input.email,
    });
    return false;
  }

  const email = input.email.trim().toLowerCase();

  const existing = await withRetry("suppression-lookup", async () => {
    const { data, error } = await supabase
      .from("email_suppressions")
      .select("id")
      .ilike("email", email)
      .maybeSingle();
    if (error) throw error;
    return data as { id: string } | null;
  });

  if (existing.ok && existing.value?.id) {
    const refreshed = await withRetry("suppression-refresh", async () => {
      const { error } = await supabase
        .from("email_suppressions")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", existing.value!.id);
      if (error) throw error;
      return true;
    });
    return refreshed.ok;
  }

  const inserted = await withRetry("suppression-insert", async () => {
    const { error } = await supabase.from("email_suppressions").insert({
      email,
      source: input.source ?? null,
      campaign: input.campaign ?? null,
      reason: input.reason ?? null,
      user_agent: input.userAgent ?? null,
    });
    if (error) throw error;
    return true;
  });

  if (!inserted.ok) {
    console.error("[suppressions] insert failed", inserted.error);
    return false;
  }
  return true;
}

/**
 * True when an address has unsubscribed. Check this before any marketing send.
 * Transactional mail the person asked for (assessment results) is exempt.
 */
export async function isEmailSuppressed(email: string): Promise<boolean> {
  const supabase = createServiceClient();
  if (!supabase) return false;

  const result = await withRetry("suppression-check", async () => {
    const { data, error } = await supabase
      .from("email_suppressions")
      .select("id")
      .ilike("email", email.trim().toLowerCase())
      .maybeSingle();
    if (error) throw error;
    return data as { id: string } | null;
  });

  return result.ok && Boolean(result.value);
}
