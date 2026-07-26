type Bucket = { count: number; resetAt: number };

type GlobalRate = { __assessmentRateLimit?: Map<string, Bucket> };

function store(): Map<string, Bucket> {
  const g = globalThis as unknown as GlobalRate;
  if (!g.__assessmentRateLimit) g.__assessmentRateLimit = new Map();
  return g.__assessmentRateLimit;
}

/**
 * Simple in-memory IP rate limit. Adequate for a single Node instance;
 * replace with Redis/Upstash when running multi-region.
 */
export function rateLimit(
  key: string,
  options: { limit: number; windowMs: number },
): { allowed: boolean; remaining: number; retryAfterMs: number } {
  const now = Date.now();
  const buckets = store();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + options.windowMs });
    return { allowed: true, remaining: options.limit - 1, retryAfterMs: 0 };
  }

  if (existing.count >= options.limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: Math.max(0, existing.resetAt - now),
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: options.limit - existing.count,
    retryAfterMs: 0,
  };
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
