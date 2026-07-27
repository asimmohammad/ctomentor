/**
 * Consent gate stub until Phase 2 CMP ships.
 * Cal.com booking is treated as Necessary — always allowed.
 * When tra_consent_v1 exists, respect its categories.
 */

export type ConsentCategory = "necessary" | "analytics" | "marketing";

type ConsentPayload = {
  v?: number;
  necessary?: boolean;
  analytics?: boolean;
  marketing?: boolean;
};

const CONSENT_COOKIE = "tra_consent_v1";

function readConsentCookie(): ConsentPayload | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${CONSENT_COOKIE}=`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match.slice(CONSENT_COOKIE.length + 1))) as ConsentPayload;
  } catch {
    return null;
  }
}

/** Returns whether a category may load scripts. Pre-CMP: necessary=true, others=false if cookie absent? 
 *  Pre-CMP reality: GA loads anyway. For Cal we always allow necessary.
 */
export function hasConsentFor(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  const consent = readConsentCookie();
  if (!consent) {
    // No CMP yet — do not block necessary tools; block marketing until CMP grants.
    return false;
  }
  if (category === "analytics") return Boolean(consent.analytics);
  if (category === "marketing") return Boolean(consent.marketing);
  return true;
}

/** Cal.com booking embed is Necessary for the /book conversion path. */
export function canLoadCalEmbed(): boolean {
  return hasConsentFor("necessary");
}
