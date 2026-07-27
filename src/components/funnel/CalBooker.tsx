"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/Button";
import { PRIMARY_CTA } from "@/lib/cta";
import {
  CAL_LINK,
  CAL_PUBLIC_URL,
  CAL_THEME_LIGHT,
  type BookAssessmentContext,
} from "@/lib/cal/config";
import { canLoadCalEmbed } from "@/lib/consent";
import { analytics } from "@/lib/analytics";

type CalBookerProps = {
  assessment: BookAssessmentContext | null;
};

const SHELL = "min-h-[40rem] w-full";

/**
 * Inline Cal.com Booker. No pre-form — booking happens in the embed.
 * Prefills name/email/company/driver/assessmentId when assessment context exists.
 */
export function CalBooker({ assessment }: CalBookerProps) {
  const router = useRouter();
  const [apiReady, setApiReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [allowed, setAllowed] = React.useState(true);
  const namespace = "risk-conversation";
  const listenersBound = React.useRef(false);

  React.useEffect(() => {
    setAllowed(canLoadCalEmbed());
    analytics.bookPageViewed(Boolean(assessment?.id));
  }, [assessment?.id]);

  React.useEffect(() => {
    if (!allowed) return;

    let cancelled = false;
    const timeout = window.setTimeout(() => {
      if (!cancelled && !apiReady) setFailed(true);
    }, 15000);

    (async () => {
      try {
        const cal = await getCalApi({ namespace });
        if (cancelled) return;

        cal("ui", {
          theme: "light",
          cssVarsPerTheme: {
            light: { ...CAL_THEME_LIGHT },
            dark: { ...CAL_THEME_LIGHT },
          },
          hideEventTypeDetails: true,
          layout: "month_view",
        });

        if (!listenersBound.current) {
          listenersBound.current = true;
          cal("on", {
            action: "bookingSuccessfulV2",
            callback: (e: { detail?: { data?: { uid?: string; startTime?: string } } }) => {
              const data = e?.detail?.data;
              analytics.callBooked({
                assessmentLinked: Boolean(assessment?.id),
                scheduledAt: data?.startTime ?? null,
              });
              const params = new URLSearchParams();
              if (assessment?.id) params.set("assessment", assessment.id);
              if (data?.startTime) params.set("start", data.startTime);
              if (data?.uid) params.set("uid", data.uid);
              router.push(`/book/confirmed?${params.toString()}`);
            },
          });
          cal("on", {
            action: "bookingSuccessful",
            callback: () => {
              analytics.callBooked({
                assessmentLinked: Boolean(assessment?.id),
                scheduledAt: null,
              });
              const params = new URLSearchParams();
              if (assessment?.id) params.set("assessment", assessment.id);
              router.push(`/book/confirmed?${params.toString()}`);
            },
          });
          cal("on", {
            action: "eventTypeSelected",
            callback: () => analytics.calSlotSelected(),
          });
        }

        setApiReady(true);
        analytics.calEmbedLoaded();
      } catch (error) {
        console.warn("[cal] embed init failed", error);
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
    // intentionally omit apiReady — timeout only on first mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowed, assessment?.id, namespace, router]);

  const config = React.useMemo(() => {
    const base: Record<string, string> = {
      layout: "month_view",
      theme: "light",
    };
    if (assessment) {
      base.name = assessment.name;
      base.email = assessment.email;
      base.company = assessment.company;
      base.assessmentId = assessment.id;
      base.notes = assessment.driverSuggestion;
      base.driving = assessment.driverSuggestion;
      base["metadata[company]"] = assessment.company;
      base["metadata[assessmentId]"] = assessment.id;
      base["metadata[driving]"] = assessment.driverSuggestion;
    }
    return base;
  }, [assessment]);

  if (!allowed) {
    return (
      <FallbackPanel
        message="Calendar booking is temporarily unavailable under your cookie preferences."
        assessment={assessment}
      />
    );
  }

  return (
    <div className="space-y-4">
      {assessment ? (
        <aside
          className="border border-border bg-surface-alt p-4"
          aria-label="Assessment context for this booking"
        >
          <p className="font-text text-small text-ink">
            I&apos;ll have your assessment results open —{" "}
            <span className="font-semibold">
              {assessment.tierLabel}, {assessment.overall}/100, weakest area:{" "}
              {assessment.weakestDimension}
            </span>
            .
          </p>
        </aside>
      ) : (
        <aside className="border border-border bg-surface-alt p-4" aria-label="Assessment prompt">
          <p className="font-text text-small text-ink-muted">
            Prefer to arrive with a scored report?{" "}
            <Link
              href={PRIMARY_CTA.href}
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              {PRIMARY_CTA.label}
            </Link>
            . Booking stays open either way.
          </p>
        </aside>
      )}

      <div className={`cal-embed-shell relative overflow-hidden border border-border bg-paper ${SHELL}`}>
        {!apiReady && !failed ? <CalEmbedSkeleton /> : null}

        {failed ? (
          <FallbackPanel
            message="The calendar could not load. Email me or open the booking page directly."
            assessment={assessment}
          />
        ) : (
          <div className={apiReady ? "block h-full" : "pointer-events-none absolute inset-0 opacity-0"}>
            <Cal
              namespace={namespace}
              calLink={CAL_LINK}
              style={{ width: "100%", height: "100%", minHeight: "40rem", overflow: "auto" }}
              config={config}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function CalEmbedSkeleton() {
  return (
    <div
      className={`absolute inset-0 z-10 flex flex-col gap-4 bg-paper p-6 ${SHELL}`}
      aria-busy="true"
      aria-label="Loading calendar"
    >
      <div className="h-8 w-1/3 animate-pulse bg-surface-alt" />
      <div className="grid flex-1 grid-cols-7 gap-2">
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className="min-h-10 animate-pulse bg-surface-alt" />
        ))}
      </div>
      <div className="h-10 w-full animate-pulse bg-surface-alt" />
    </div>
  );
}

function FallbackPanel({
  message,
  assessment,
}: {
  message: string;
  assessment: BookAssessmentContext | null;
}) {
  const mailto = React.useMemo(() => {
    const subject = encodeURIComponent("Technical Risk Conversation");
    const body = encodeURIComponent(
      [
        assessment ? `Name: ${assessment.name}` : "Name:",
        assessment ? `Email: ${assessment.email}` : "Email:",
        assessment ? `Company: ${assessment.company}` : "Company:",
        assessment ? `Assessment: ${assessment.id}` : "",
        assessment ? `Driver: ${assessment.driverSuggestion}` : "What's driving this:",
      ]
        .filter(Boolean)
        .join("\n"),
    );
    return `mailto:asim@thectomentor.com?subject=${subject}&body=${body}`;
  }, [assessment]);

  return (
    <div
      className={`flex flex-col items-start justify-center gap-4 border border-border bg-surface p-6 ${SHELL}`}
    >
      <p className="font-text text-body text-ink-muted">{message}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="primary" size="lg">
          <a href={mailto}>Email asim@thectomentor.com</a>
        </Button>
        <Button asChild variant="secondary" size="lg">
          <a href={CAL_PUBLIC_URL} target="_blank" rel="noopener noreferrer">
            Open Cal.com booking
          </a>
        </Button>
      </div>
    </div>
  );
}
