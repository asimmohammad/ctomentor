/**
 * Retry helper for external calls. Failures after retries are returned, never thrown
 * unless `throwOnExhausted` is set — callers decide how to degrade.
 */
export async function withRetry<T>(
  label: string,
  fn: () => Promise<T>,
  options: { attempts?: number; delayMs?: number; throwOnExhausted?: boolean } = {},
): Promise<{ ok: true; value: T } | { ok: false; error: unknown }> {
  const attempts = options.attempts ?? 3;
  const delayMs = options.delayMs ?? 400;
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const value = await fn();
      return { ok: true, value };
    } catch (error) {
      lastError = error;
      console.warn(`[retry] ${label} attempt ${attempt}/${attempts} failed`, error);
      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
      }
    }
  }

  if (options.throwOnExhausted) {
    throw lastError;
  }
  return { ok: false, error: lastError };
}
