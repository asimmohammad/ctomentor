"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Textarea } from "@/components/Textarea";
import { Section } from "@/components/layout/Section";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/cta";
import {
  BUDGET_OPTIONS,
  STAGE_OPTIONS,
  TIMELINE_OPTIONS,
  engageSchema,
  type EngageFormValues,
} from "@/lib/funnel/schemas";

const STORAGE_KEY = "tra:engage:draft:v1";

type Step = 1 | 2 | 3;

type EngageDraft = {
  name: string;
  email: string;
  company: string;
  role: string;
  stage: EngageFormValues["stage"] | "";
  challenge: string;
  budget: EngageFormValues["budget"] | "";
  timeline: EngageFormValues["timeline"] | "";
  attribution: string;
  equityAlignment?: string;
  companyWebsite?: string;
  phone?: string;
};

const emptyValues: EngageDraft = {
  name: "",
  email: "",
  company: "",
  role: "",
  stage: "",
  challenge: "",
  budget: "",
  timeline: "",
  attribution: "",
  equityAlignment: "",
  companyWebsite: "",
  phone: "",
};

const stepFields: Record<Step, (keyof EngageDraft)[]> = {
  1: ["name", "email", "company", "role"],
  2: ["stage", "challenge", "budget", "timeline"],
  3: ["attribution"],
};

export function EngageClient() {
  const router = useRouter();
  const [step, setStep] = React.useState<Step>(1);
  const [values, setValues] = React.useState<EngageDraft>(emptyValues);
  const [errors, setErrors] = React.useState<Partial<Record<keyof EngageDraft, string>>>({});
  const [status, setStatus] = React.useState<"idle" | "loading" | "error">("idle");
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [resumeAvailable, setResumeAvailable] = React.useState(false);
  const hydrated = React.useRef(false);

  React.useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { values?: EngageDraft; step?: Step };
      if (parsed.values && Object.values(parsed.values).some(Boolean)) {
        setValues({ ...emptyValues, ...parsed.values });
        if (parsed.step) setStep(parsed.step);
        setResumeAvailable(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  React.useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ values, step }));
    } catch {
      /* ignore */
    }
  }, [values, step]);

  function update<K extends keyof EngageDraft>(key: K, value: EngageDraft[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validateStep(current: Step): boolean {
    const pick = stepFields[current].reduce(
      (acc, key) => {
        acc[key] = values[key];
        return acc;
      },
      {} as Record<string, unknown>,
    );
    const schema =
      current === 1
        ? engageSchema.pick({ name: true, email: true, company: true, role: true })
        : current === 2
          ? engageSchema.pick({
              stage: true,
              challenge: true,
              budget: true,
              timeline: true,
            })
          : engageSchema.pick({ attribution: true });

    const parsed = schema.safeParse(pick);
    if (parsed.success) {
      setErrors({});
      return true;
    }
    const next: Partial<Record<keyof EngageDraft, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof EngageDraft;
      if (!next[key]) next[key] = issue.message;
    }
    setErrors(next);
    return false;
  }

  function nextStep() {
    if (!validateStep(step)) return;
    setStep((s) => (s === 3 ? 3 : ((s + 1) as Step)));
  }

  function prevStep() {
    setStep((s) => (s === 1 ? 1 : ((s - 1) as Step)));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validateStep(3)) return;
    const parsed = engageSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof EngageFormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof EngageFormValues;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setStatus("loading");
    setSubmitError(null);
    try {
      const response = await fetch("/api/engage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json()) as { error?: string; id?: string };
      if (!response.ok) {
        setStatus("error");
        setSubmitError(data.error ?? "Unable to submit right now.");
        return;
      }
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      router.push("/engage/confirmation");
    } catch {
      setStatus("error");
      setSubmitError("Unable to submit right now. Check your connection.");
    }
  }

  return (
    <>
      <Section spacing="compact" tone="paper">
        <Eyebrow>Bottom of funnel</Eyebrow>
        <h1 className="mt-3 max-w-measure font-display text-h1 text-ink">
          Apply for an engagement
        </h1>
        <p className="mt-4 max-w-measure font-text text-lead text-ink-muted">
          I take a limited number of Diagnostic Sprints and embeds each quarter. This form is how we decide whether
          there is a fit — not a rejection letter. If you are exploring casually, start with the{" "}
          <Link href={PRIMARY_CTA.href} className="text-accent underline-offset-4 hover:underline">
            Technical Risk Assessment
          </Link>{" "}
          or{" "}
          <Link href={SECONDARY_CTA.href} className="text-accent underline-offset-4 hover:underline">
            request a confidential conversation
          </Link>
          .
        </p>
      </Section>

      <Section spacing="standard" tone="alt">
        <div className="mx-auto max-w-measure">
          {resumeAvailable ? (
            <p className="mb-6 border border-border bg-surface p-4 font-text text-small text-ink">
              Draft restored from this browser.{" "}
              <button
                type="button"
                className="text-accent underline-offset-4 hover:underline"
                onClick={() => {
                  setValues(emptyValues);
                  setStep(1);
                  setResumeAvailable(false);
                  try {
                    localStorage.removeItem(STORAGE_KEY);
                  } catch {
                    /* ignore */
                  }
                }}
              >
                Start over
              </button>
            </p>
          ) : null}

          <div
            className="mb-8"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuenow={step}
            aria-label="Application progress"
          >
            <div className="flex justify-between font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-muted">
              <span>
                Step {step} of 3
              </span>
              <span>{step === 1 ? "You" : step === 2 ? "Engagement" : "Attribution"}</span>
            </div>
            <div className="mt-3 h-[2px] w-full bg-border">
              <div
                className="h-full bg-accent transition-[width] duration-standard ease-standard"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
            {step === 1 ? (
              <>
                <Input
                  label="Name"
                  name="name"
                  required
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  error={errors.name}
                />
                <Input
                  label="Work email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  error={errors.email}
                />
                <Input
                  label="Company or fund"
                  name="company"
                  required
                  autoComplete="organization"
                  value={values.company}
                  onChange={(e) => update("company", e.target.value)}
                  error={errors.company}
                />
                <Input
                  label="Role"
                  name="role"
                  required
                  helperText="Deal partner, CEO, board member, CTO…"
                  value={values.role}
                  onChange={(e) => update("role", e.target.value)}
                  error={errors.role}
                />
              </>
            ) : null}

            {step === 2 ? (
              <>
                <Select
                  label="Company stage"
                  name="stage"
                  required
                  placeholder="Select stage"
                  value={values.stage ?? ""}
                  onChange={(e) =>
                    update("stage", e.target.value as EngageDraft["stage"])
                  }
                  options={[...STAGE_OPTIONS]}
                  error={errors.stage}
                />
                <Textarea
                  label="What is the binding technology problem?"
                  name="challenge"
                  required
                  helperText="Stakes, timing, and what happens if nothing changes."
                  value={values.challenge}
                  onChange={(e) => update("challenge", e.target.value)}
                  error={errors.challenge}
                />
                <Select
                  label="Budget range"
                  name="budget"
                  required
                  placeholder="Select range"
                  value={values.budget ?? ""}
                  onChange={(e) =>
                    update("budget", e.target.value as EngageDraft["budget"])
                  }
                  options={[...BUDGET_OPTIONS]}
                  error={errors.budget}
                />
                <Select
                  label="Timeline"
                  name="timeline"
                  required
                  placeholder="Select timeline"
                  value={values.timeline ?? ""}
                  onChange={(e) =>
                    update("timeline", e.target.value as EngageDraft["timeline"])
                  }
                  options={[...TIMELINE_OPTIONS]}
                  error={errors.timeline}
                />
              </>
            ) : null}

            {step === 3 ? (
              <>
                <Input
                  label="How did you hear about us?"
                  name="attribution"
                  required
                  helperText="Assessment, referral, LinkedIn, search…"
                  value={values.attribution}
                  onChange={(e) => update("attribution", e.target.value)}
                  error={errors.attribution}
                />
                <Input
                  label="Company website (optional)"
                  name="companyWebsite"
                  value={values.companyWebsite ?? ""}
                  onChange={(e) => update("companyWebsite", e.target.value)}
                />
                <Textarea
                  label="Equity notes (optional)"
                  name="equityAlignment"
                  helperText="Cash is the default. Note only if equity alongside cash is relevant."
                  value={values.equityAlignment ?? ""}
                  onChange={(e) => update("equityAlignment", e.target.value)}
                />
              </>
            ) : null}

            {submitError ? (
              <p role="alert" className="font-text text-caption text-error">
                {submitError}
              </p>
            ) : null}

            <div className="mt-2 flex flex-wrap gap-3">
              {step > 1 ? (
                <Button type="button" variant="ghost" size="lg" onClick={prevStep}>
                  Back
                </Button>
              ) : null}
              {step < 3 ? (
                <Button type="button" variant="primary" size="lg" onClick={nextStep}>
                  Continue
                </Button>
              ) : (
                <Button type="submit" variant="primary" size="lg" loading={status === "loading"}>
                  Submit application
                </Button>
              )}
            </div>
          </form>
        </div>
      </Section>
    </>
  );
}
