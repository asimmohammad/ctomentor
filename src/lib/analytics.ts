/**
 * Single analytics abstraction. Components call these typed helpers — never vendor SDKs.
 * Fans out to GA4, LinkedIn, Meta, and Reddit when their IDs are present.
 */

export type AssessmentAnalyticsEvent =
  | { name: "assessment_started"; variant: string }
  | { name: "assessment_question_answered"; variant: string; index: number }
  | { name: "assessment_gate_viewed"; variant: string }
  | { name: "assessment_gate_submitted"; variant: string; overall?: number }
  | { name: "assessment_results_viewed"; variant: string; id: string; overall: number }
  | {
      name: "assessment_cta_clicked";
      variant: string;
      id: string;
      which: "book" | "pdf" | "newsletter" | "copy_link";
    }
  | { name: "assessment_shared"; variant: string; id: string };

export type BookingAnalyticsEvent =
  | { name: "book_page_viewed"; assessment_linked: boolean }
  | { name: "cal_embed_loaded" }
  | { name: "cal_slot_selected" }
  | {
      name: "call_booked";
      assessment_linked: boolean;
      scheduled_at: string | null;
    }
  | { name: "booking_cancelled"; assessment_linked?: boolean };

export type AnalyticsEvent = AssessmentAnalyticsEvent | BookingAnalyticsEvent;

type GtagFn = (...args: unknown[]) => void;

function gtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & { gtag?: GtagFn; dataLayer?: unknown[] };
  return typeof w.gtag === "function" ? w.gtag : null;
}

function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
}

function fireGa4(event: AnalyticsEvent) {
  const fn = gtag();
  if (!fn) return;
  const { name, ...params } = event;
  fn("event", name, params);
}

function fireLinkedIn(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  const partnerId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
  if (!partnerId) return;
  const w = window as Window & { lintrk?: (a: string, b: Record<string, unknown>) => void };
  if (typeof w.lintrk !== "function") return;

  const conversionId = process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_ID;
  if (!conversionId) return;
  if (
    event.name === "assessment_gate_submitted" ||
    event.name === "assessment_results_viewed" ||
    event.name === "assessment_cta_clicked" ||
    event.name === "call_booked"
  ) {
    w.lintrk("track", { conversion_id: conversionId });
  }
}

function fireMeta(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  const w = window as Window & { fbq?: (...args: unknown[]) => void };
  if (typeof w.fbq !== "function") return;

  if (event.name === "assessment_started") {
    w.fbq("trackCustom", "AssessmentStarted", { variant: event.variant });
  } else if (event.name === "assessment_gate_submitted") {
    w.fbq("track", "Lead", { content_name: "assessment", variant: event.variant });
  } else if (event.name === "assessment_cta_clicked" && event.which === "book") {
    w.fbq("track", "Schedule", { content_name: "assessment_book" });
  } else if (event.name === "call_booked") {
    w.fbq("track", "Schedule", {
      content_name: "technical_risk_conversation",
      assessment_linked: event.assessment_linked,
    });
  } else {
    w.fbq("trackCustom", event.name, { ...event });
  }
}

function fireReddit(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  const w = window as Window & { rdt?: (...args: unknown[]) => void };
  if (typeof w.rdt !== "function") return;

  if (event.name === "assessment_gate_submitted") {
    w.rdt("track", "Lead");
  } else if (event.name === "assessment_started") {
    w.rdt("track", "Custom", { customEventName: "assessment_started" });
  } else if (event.name === "call_booked") {
    w.rdt("track", "Custom", { customEventName: "call_booked" });
  }
}

export function track(event: AnalyticsEvent): void {
  try {
    pushDataLayer({ event: event.name, ...event });
    fireGa4(event);
    fireLinkedIn(event);
    fireMeta(event);
    fireReddit(event);
  } catch (error) {
    console.warn("[analytics] track failed", event.name, error);
  }
}

export const analytics = {
  assessmentStarted: (variant: string) => track({ name: "assessment_started", variant }),
  questionAnswered: (variant: string, index: number) =>
    track({ name: "assessment_question_answered", variant, index }),
  gateViewed: (variant: string) => track({ name: "assessment_gate_viewed", variant }),
  gateSubmitted: (variant: string, overall?: number) =>
    track({ name: "assessment_gate_submitted", variant, overall }),
  resultsViewed: (variant: string, id: string, overall: number) =>
    track({ name: "assessment_results_viewed", variant, id, overall }),
  ctaClicked: (
    variant: string,
    id: string,
    which: "book" | "pdf" | "newsletter" | "copy_link",
  ) => track({ name: "assessment_cta_clicked", variant, id, which }),
  shared: (variant: string, id: string) => track({ name: "assessment_shared", variant, id }),

  bookPageViewed: (assessmentLinked: boolean) =>
    track({ name: "book_page_viewed", assessment_linked: assessmentLinked }),
  calEmbedLoaded: () => track({ name: "cal_embed_loaded" }),
  calSlotSelected: () => track({ name: "cal_slot_selected" }),
  callBooked: (input: { assessmentLinked: boolean; scheduledAt: string | null }) =>
    track({
      name: "call_booked",
      assessment_linked: input.assessmentLinked,
      scheduled_at: input.scheduledAt,
    }),
  bookingCancelled: (assessmentLinked?: boolean) =>
    track({ name: "booking_cancelled", assessment_linked: assessmentLinked }),
};
