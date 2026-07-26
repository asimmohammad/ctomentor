"use client";

import * as React from "react";
import {
  UTM_COOKIE,
  UTM_COOKIE_MAX_AGE,
  deserializeUtmCookie,
  mergeAttribution,
  parseUtmFromSearch,
  serializeUtmCookie,
} from "@/lib/assessment/utm";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  return match ? match.slice(name.length + 1) : null;
}

function writeCookie(name: string, value: string, maxAge: number) {
  const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

/**
 * Capture UTM params on first landing into a first-party cookie.
 * Mount once in the root layout — does not re-overwrite existing attribution.
 */
export function UtmCapture() {
  React.useEffect(() => {
    const incoming = parseUtmFromSearch(window.location.search);
    const existing = deserializeUtmCookie(readCookie(UTM_COOKIE));
    const hasIncoming = Object.keys(incoming).length > 0;
    const referrer = document.referrer || null;

    if (!hasIncoming && !referrer && existing) return;

    const next = mergeAttribution(existing, incoming, referrer);
    const hadUtm = Boolean(
      existing?.utm_source ||
        existing?.utm_medium ||
        existing?.utm_campaign ||
        existing?.utm_content ||
        existing?.utm_term,
    );
    const gotNewUtm = Boolean(
      (!existing?.utm_source && next.utm_source) ||
        (!existing?.utm_medium && next.utm_medium) ||
        (!existing?.utm_campaign && next.utm_campaign) ||
        (!existing?.utm_content && next.utm_content) ||
        (!existing?.utm_term && next.utm_term),
    );

    if (!hadUtm && (gotNewUtm || (!existing?.referrer && next.referrer))) {
      writeCookie(UTM_COOKIE, serializeUtmCookie(next), UTM_COOKIE_MAX_AGE);
    } else if (!existing) {
      writeCookie(UTM_COOKIE, serializeUtmCookie(next), UTM_COOKIE_MAX_AGE);
    }
  }, []);

  return null;
}
