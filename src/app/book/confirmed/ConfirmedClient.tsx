"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Section } from "@/components/layout/Section";
import { PRIMARY_CTA, ENGAGE_PATH } from "@/lib/cta";

const READY = [
  "The deal, raise, or operating question that made this call necessary — in one sentence.",
  "Access constraints: who owns architecture, security, and delivery decisions today.",
  "Any hard dates (IC, close, board, customer review) in the next 90 days.",
];

function formatLocal(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

function googleCalendarUrl(startIso: string | null, title: string): string | null {
  if (!startIso) return null;
  const start = new Date(startIso);
  if (Number.isNaN(start.getTime())) return null;
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: "Technical Risk Conversation with Asim Mohammad.",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function BookConfirmedClient() {
  const params = useSearchParams();
  const assessmentId = params.get("assessment");
  const start = params.get("start");
  const localWhen = formatLocal(start);
  const gcal = googleCalendarUrl(start, "Technical Risk Conversation");

  return (
    <Section spacing="standard" tone="paper">
      <Eyebrow>Confirmed</Eyebrow>
      <h1 className="mt-3 max-w-measure font-display text-h1 text-ink">You are on the calendar.</h1>

      {localWhen ? (
        <p className="mt-4 max-w-measure font-text text-lead text-ink">
          Confirmed for <span className="font-semibold">{localWhen}</span>.
        </p>
      ) : (
        <p className="mt-4 max-w-measure font-text text-lead text-ink-muted">
          Check your email for the invite with the confirmed time in your timezone.
        </p>
      )}

      <p className="mt-3 max-w-measure font-text text-body text-ink-muted">
        Reminders go out 24 hours and 1 hour before the call.
      </p>

      {gcal ? (
        <p className="mt-6">
          <Button asChild variant="secondary" size="md">
            <a href={gcal} target="_blank" rel="noopener noreferrer">
              Add to Google Calendar
            </a>
          </Button>
        </p>
      ) : null}

      <div className="mt-10 max-w-measure">
        <h2 className="font-text text-h4 text-ink">Three things to have ready</h2>
        <ol className="mt-4 list-none space-y-4">
          {READY.map((item, index) => (
            <li key={item} className="border border-border bg-surface p-4 font-text text-body text-ink-muted">
              <span className="font-mono text-eyebrow uppercase tracking-[0.12em] text-accent">
                {index + 1}
              </span>
              <p className="mt-2 text-ink">{item}</p>
            </li>
          ))}
        </ol>
      </div>

      {!assessmentId ? (
        <div className="mt-10 max-w-measure border border-border bg-surface-alt p-6">
          <h2 className="font-text text-h4 text-ink">Complete the assessment before we talk</h2>
          <p className="mt-3 font-text text-body text-ink-muted">
            Attendees who arrive with a scored report are substantially better qualified. Twelve questions, four
            minutes — do this before the call.
          </p>
          <div className="mt-6">
            <Button asChild variant="primary" size="lg">
              <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Link>
            </Button>
          </div>
        </div>
      ) : (
        <p className="mt-10 font-text text-body text-ink-muted">
          I will open your assessment (
          <Link
            href={`/assessment/r/${assessmentId}`}
            className="text-accent underline-offset-4 hover:underline"
          >
            view results
          </Link>
          ) at the start of the call.
        </p>
      )}

      <p className="mt-10 max-w-measure font-text text-small text-ink-muted">
        Already clear you need a Diagnostic Sprint or embed?{" "}
        <Link href={ENGAGE_PATH} className="text-accent underline-offset-4 hover:underline">
          Apply for an engagement
        </Link>
        .
      </p>
    </Section>
  );
}
