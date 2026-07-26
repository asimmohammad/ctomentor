"use client";

import * as React from "react";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import {
  ROLE_OPTIONS,
  freeEmailWarning,
  hasErrors,
  validateLead,
  type LeadErrors,
} from "@/lib/assessment/validation";
import type { Lead } from "@/lib/assessment/machine";

const STORAGE_PREFIX = "tra:briefing:unlock:";

type BriefingGateProps = {
  slug: string;
  title: string;
  teaser: string[];
  children: React.ReactNode;
};

const emptyLead: Lead = {
  name: "",
  email: "",
  company: "",
  role: "" as Lead["role"],
};

export function BriefingGate({ slug, title, teaser, children }: BriefingGateProps) {
  const [unlocked, setUnlocked] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);
  const [lead, setLead] = React.useState<Lead>(emptyLead);
  const [touched, setTouched] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "error">("idle");
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      if (localStorage.getItem(`${STORAGE_PREFIX}${slug}`) === "1") {
        setUnlocked(true);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [slug]);

  const errors: LeadErrors = touched ? validateLead(lead) : {};
  const emailWarning = freeEmailWarning(lead.email);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setTouched(true);
    if (hasErrors(validateLead(lead))) return;
    setStatus("loading");
    setSubmitError(null);
    try {
      const response = await fetch("/api/briefing/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, slug, title }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setStatus("error");
        setSubmitError(data.error ?? "Unable to unlock right now.");
        return;
      }
      try {
        localStorage.setItem(`${STORAGE_PREFIX}${slug}`, "1");
      } catch {
        /* ignore */
      }
      setUnlocked(true);
      setStatus("idle");
    } catch {
      setStatus("error");
      setSubmitError("Unable to unlock right now. Check your connection.");
    }
  }

  if (!hydrated) {
    return (
      <div className="space-y-6" aria-busy="true">
        {teaser.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="font-text text-lead text-ink">
            {paragraph}
          </p>
        ))}
        <p className="font-text text-body text-ink-muted">Loading…</p>
      </div>
    );
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="relative isolate">
      <div className="space-y-6">
        {teaser.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="font-text text-lead text-ink">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="relative mt-10">
        <div
          aria-hidden="true"
          className="pointer-events-none select-none space-y-4 blur-[8px] saturate-50"
        >
          <p className="font-text text-lead text-ink">
            Full checklist sections, artifact requests, and red-flag patterns appear after you unlock.
          </p>
          <p className="font-text text-lead text-ink">
            Architecture · Delivery · Security · Team · Commercial technical risk
          </p>
        </div>

        <div className="relative z-10 mt-[-6rem] border border-border bg-paper p-6 shadow-sm sm:p-8">
          <Eyebrow>Email gate</Eyebrow>
          <h2 className="mt-3 font-display text-h3 text-ink">Unlock this briefing</h2>
          <p className="mt-3 font-text text-body text-ink-muted">
            Same pattern as the Technical Risk Assessment — work email preferred so we can send the PDF-ready version
            and related notes.
          </p>
          <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-4">
            <Input
              label="Name"
              name="name"
              required
              autoComplete="name"
              value={lead.name}
              onChange={(e) => setLead((c) => ({ ...c, name: e.target.value }))}
              error={errors.name}
            />
            <Input
              label="Work email"
              type="email"
              name="email"
              required
              autoComplete="email"
              value={lead.email}
              onChange={(e) => setLead((c) => ({ ...c, email: e.target.value }))}
              error={errors.email}
              helperText={emailWarning ?? undefined}
            />
            <Input
              label="Company or fund"
              name="company"
              required
              autoComplete="organization"
              value={lead.company}
              onChange={(e) => setLead((c) => ({ ...c, company: e.target.value }))}
              error={errors.company}
            />
            <Select
              label="Role"
              name="role"
              required
              placeholder="Select role"
              value={lead.role}
              onChange={(e) => setLead((c) => ({ ...c, role: e.target.value as Lead["role"] }))}
              options={[...ROLE_OPTIONS]}
              error={errors.role}
            />
            {submitError ? (
              <p role="alert" className="font-text text-caption text-error">
                {submitError}
              </p>
            ) : null}
            <Button type="submit" variant="primary" size="lg" loading={status === "loading"}>
              Unlock briefing
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
