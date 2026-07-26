"use client";

import * as React from "react";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import type { Lead, SubmitStatus } from "@/lib/assessment/machine";
import type { AssessmentScore } from "@/lib/assessment/scoring-types";
import {
  ROLE_OPTIONS,
  freeEmailWarning,
  hasErrors,
  validateLead,
  type LeadErrors,
} from "@/lib/assessment/validation";

export interface GateScreenProps {
  score: AssessmentScore;
  gateBody: string;
  lead: Lead;
  submitStatus: SubmitStatus;
  submitError: string | null;
  onLeadChange: (field: keyof Lead, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

function BlurredScore({ score }: { score: AssessmentScore }) {
  return (
    <div aria-hidden="true" className="pointer-events-none select-none blur-[10px] saturate-50">
      <p className="metric font-display text-hero leading-none text-ink">{score.overall}</p>
      <p className="mt-2 font-text text-h4 text-ink">
        Level {score.tier.level} {score.tier.name}
      </p>
      <ul className="mt-6 space-y-3">
        {score.dimensions.map((dimension) => (
          <li
            key={dimension.id}
            className="flex items-center justify-between gap-6 border-b border-border pb-2"
          >
            <span className="font-text text-body text-ink">{dimension.name}</span>
            <span className="metric font-text text-h4 text-ink">{dimension.percentage}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GateScreen({
  score,
  gateBody,
  lead,
  submitStatus,
  submitError,
  onLeadChange,
  onSubmit,
  onBack,
}: GateScreenProps) {
  const [touched, setTouched] = React.useState(false);
  const errors: LeadErrors = touched ? validateLead(lead) : {};
  const emailWarning = freeEmailWarning(lead.email);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (hasErrors(validateLead(lead))) return;
    onSubmit();
  }

  return (
    <div className="relative isolate">
      <div className="absolute inset-0 z-0 overflow-hidden opacity-40">
        <BlurredScore score={score} />
      </div>

      <div className="relative z-10">
        <Eyebrow>Complete</Eyebrow>
        <h2 className="mt-4 font-display text-h1 text-ink">Your score is ready.</h2>
        <p className="mt-4 max-w-measure font-text text-lead text-ink-muted">{gateBody}</p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 grid max-w-measure gap-5">
          <div>
            <Input
              label="Work email"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={lead.email}
              onChange={(e) => onLeadChange("email", e.target.value)}
              error={errors.email}
            />
            {!errors.email && emailWarning ? (
              <p className="mt-2 font-text text-caption text-warning">{emailWarning}</p>
            ) : null}
          </div>

          <Input
            label="Name"
            name="name"
            autoComplete="name"
            required
            value={lead.name}
            onChange={(e) => onLeadChange("name", e.target.value)}
            error={errors.name}
          />

          <Input
            label="Company or fund"
            name="company"
            autoComplete="organization"
            required
            value={lead.company}
            onChange={(e) => onLeadChange("company", e.target.value)}
            error={errors.company}
          />

          <Select
            label="Role"
            name="role"
            required
            value={lead.role}
            onChange={(e) => onLeadChange("role", e.target.value)}
            placeholder="Select your role"
            options={ROLE_OPTIONS.map((option) => ({ value: option.value, label: option.label }))}
            error={errors.role}
          />

          {submitError ? (
            <p role="alert" className="font-text text-caption text-error">
              {submitError}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-4">
            <Button type="submit" variant="primary" size="lg" loading={submitStatus === "loading"}>
              Show my score
            </Button>
            <Button type="button" variant="ghost" size="lg" onClick={onBack}>
              Back
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
