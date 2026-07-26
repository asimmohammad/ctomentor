export const UTM_COOKIE = "tra_utm_v1";
export const UTM_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export type UtmAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  captured_at?: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export function parseUtmFromSearch(search: string): UtmAttribution {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const attribution: UtmAttribution = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) attribution[key] = value.slice(0, 200);
  }
  return attribution;
}

export function mergeAttribution(
  existing: UtmAttribution | null,
  incoming: UtmAttribution,
  referrer?: string | null,
): UtmAttribution {
  const base = existing ?? {};
  const next: UtmAttribution = { ...base };

  for (const key of UTM_KEYS) {
    if (!next[key] && incoming[key]) next[key] = incoming[key];
  }

  if (!next.referrer && referrer && referrer.trim()) {
    next.referrer = referrer.slice(0, 500);
  }

  if (!next.captured_at) next.captured_at = new Date().toISOString();
  return next;
}

export function serializeUtmCookie(value: UtmAttribution): string {
  return encodeURIComponent(JSON.stringify(value));
}

export function deserializeUtmCookie(raw: string | undefined | null): UtmAttribution | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as UtmAttribution;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function readUtmFromCookieHeader(cookieHeader: string | null): UtmAttribution | null {
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${UTM_COOKIE}=`));
  if (!match) return null;
  return deserializeUtmCookie(match.slice(UTM_COOKIE.length + 1));
}
