"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { bookPrefillSchema, type BookPrefill } from "@/lib/funnel/schemas";

export type AssessmentWarmStart = {
  id: string;
  name: string;
  email: string;
  company: string;
  overall: number;
  tierLabel: string;
};

type BookSchedulerProps = {
  calLink: string;
  warmStart: AssessmentWarmStart | null;
};

/**
 * Four pre-booking fields, then Cal.com embed with prefilled name/email.
 * Reminders (24h / 1h) are configured in Cal.com — document in .env.example.
 */
export function BookScheduler({ calLink, warmStart }: BookSchedulerProps) {
  const router = useRouter();
  const [step, setStep] = React.useState<"details" | "calendar">(
    warmStart ? "details" : "details",
  );
  const [values, setValues] = React.useState<BookPrefill>({
    name: warmStart?.name ?? "",
    email: warmStart?.email ?? "",
    company: warmStart?.company ?? "",
    driving: "",
  });
  const [errors, setErrors] = React.useState<Partial<Record<keyof BookPrefill, string>>>({});
  const [calReady, setCalReady] = React.useState(false);
  const [calError, setCalError] = React.useState(false);

  function update<K extends keyof BookPrefill>(key: K, value: BookPrefill[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function continueToCalendar(event: React.FormEvent) {
    event.preventDefault();
    const parsed = bookPrefillSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof BookPrefill, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof BookPrefill;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setStep("calendar");
    // Persist context for confirmation page
    try {
      sessionStorage.setItem(
        "tra:book:prefill",
        JSON.stringify({ ...parsed.data, assessmentId: warmStart?.id ?? null }),
      );
    } catch {
      /* ignore */
    }
  }

  const embedSrc = React.useMemo(() => {
    const base = `https://cal.com/${calLink}`;
    const params = new URLSearchParams({
      embed: "true",
      theme: "light",
      layout: "month_view",
    });
    if (values.name) params.set("name", values.name);
    if (values.email) params.set("email", values.email);
    if (values.company) params.set("metadata[company]", values.company);
    if (values.driving) params.set("metadata[driving]", values.driving);
    if (warmStart?.id) params.set("metadata[assessmentId]", warmStart.id);
    return `${base}?${params.toString()}`;
  }, [calLink, values, warmStart?.id]);

  React.useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (typeof event.data !== "object" || !event.data) return;
      const type = (event.data as { type?: string }).type;
      if (!type || !type.startsWith("CAL:")) return;
      if (type === "CAL:bookingSuccessful" || type === "CAL:bookingSuccessfulV2") {
        const params = new URLSearchParams();
        if (warmStart?.id) params.set("assessment", warmStart.id);
        router.push(`/book/confirmation?${params.toString()}`);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router, warmStart?.id]);

  if (step === "details") {
    return (
      <form onSubmit={continueToCalendar} noValidate className="flex flex-col gap-5">
        {warmStart ? (
          <p className="border border-border bg-surface-alt p-4 font-text text-small text-ink">
            I will have your assessment results open —{" "}
            <span className="font-semibold">
              {warmStart.tierLabel}, {warmStart.overall}/100
            </span>
            .
          </p>
        ) : null}
        <Input
          label="Name"
          name="name"
          autoComplete="name"
          required
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          error={errors.name}
        />
        <Input
          label="Work email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
        />
        <Input
          label="Company or fund"
          name="company"
          autoComplete="organization"
          required
          value={values.company}
          onChange={(e) => update("company", e.target.value)}
          error={errors.company}
        />
        <Input
          label="What's driving this?"
          name="driving"
          required
          helperText="One line — deal timing, portfolio pressure, or a specific risk."
          value={values.driving}
          onChange={(e) => update("driving", e.target.value)}
          error={errors.driving}
        />
        <Button type="submit" variant="primary" size="lg">
          Choose a time
        </Button>
      </form>
    );
  }

  return (
    <div>
      <button
        type="button"
        className="mb-4 font-text text-small text-accent underline-offset-4 hover:underline"
        onClick={() => setStep("details")}
      >
        Edit details
      </button>
      <div className="relative min-h-[32rem] border border-border bg-surface">
        {!calReady && !calError ? (
          <p className="absolute inset-0 flex items-center justify-center font-text text-body text-ink-muted">
            Loading calendar…
          </p>
        ) : null}
        {calError ? (
          <div className="flex min-h-[32rem] flex-col items-center justify-center gap-4 p-6 text-center">
            <p className="font-text text-body text-ink-muted">
              The calendar could not load. Email me and I will send times.
            </p>
            <Button asChild variant="primary" size="md">
              <a
                href={`mailto:asim@thectomentor.com?subject=${encodeURIComponent(
                  "Technical Risk Conversation",
                )}&body=${encodeURIComponent(
                  `Name: ${values.name}\nEmail: ${values.email}\nCompany: ${values.company}\nDriving: ${values.driving}`,
                )}`}
              >
                Email asim@thectomentor.com
              </a>
            </Button>
          </div>
        ) : (
          <iframe
            title="Technical Risk Conversation calendar"
            src={embedSrc}
            className="h-[40rem] w-full"
            loading="lazy"
            onLoad={() => setCalReady(true)}
            onError={() => setCalError(true)}
          />
        )}
      </div>
      <p className="mt-3 font-text text-caption text-ink-faint">
        You will get email reminders 24 hours and 1 hour before the call.
      </p>
    </div>
  );
}
