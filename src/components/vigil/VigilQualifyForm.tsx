"use client";

import * as React from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Textarea } from "@/components/Textarea";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Enter your name."),
  email: z.string().trim().email("Enter a valid work email."),
  company: z.string().trim().min(1, "Enter your company."),
  role: z.string().trim().min(1, "Enter your role."),
  stackSummary: z.string().trim().min(10, "Briefly describe the stack."),
  releaseCadence: z.enum(["daily", "weekly", "biweekly", "monthly", "slower"], {
    required_error: "Select a release cadence.",
  }),
  pain: z.string().trim().min(20, "Describe the quality pain in a few sentences."),
});

type FormValues = z.infer<typeof schema>;

const CADENCE = [
  { value: "daily", label: "Multiple deploys per day" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Biweekly" },
  { value: "monthly", label: "Monthly" },
  { value: "slower", label: "Less than monthly" },
] as const;

type Draft = {
  name: string;
  email: string;
  company: string;
  role: string;
  stackSummary: string;
  releaseCadence: FormValues["releaseCadence"] | "";
  pain: string;
};

const empty: Draft = {
  name: "",
  email: "",
  company: "",
  role: "",
  stackSummary: "",
  releaseCadence: "",
  pain: "",
};

export function VigilQualifyForm() {
  const [values, setValues] = React.useState<Draft>(empty);
  const [errors, setErrors] = React.useState<Partial<Record<keyof Draft, string>>>({});
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setValues((c) => ({ ...c, [key]: value }));
    setErrors((c) => ({ ...c, [key]: undefined }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = schema.safeParse({
      ...values,
      releaseCadence: values.releaseCadence || undefined,
    });
    if (!parsed.success) {
      const next: Partial<Record<keyof Draft, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Draft;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setStatus("loading");
    setSubmitError(null);
    try {
      const response = await fetch("/api/vigil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setStatus("error");
        setSubmitError(data.error ?? "Unable to submit right now.");
        return;
      }
      setStatus("success");
      setValues(empty);
    } catch {
      setStatus("error");
      setSubmitError("Unable to submit right now. Check your connection.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-border bg-surface p-6 sm:p-8" role="status">
        <h3 className="font-display text-h3 text-ink">Received.</h3>
        <p className="mt-3 font-text text-body text-ink-muted">
          Someone from the Helix / Vigil side will follow up. This form does not enroll you in an advisory engagement.
        </p>
      </div>
    );
  }

  return (
    <form
      id="vigil-qualify"
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5 border border-border bg-surface p-6 sm:p-8"
    >
      <div>
        <h3 className="font-display text-h3 text-ink">See if Vigil fits your stack</h3>
        <p className="mt-2 font-text text-small text-ink-muted">
          Short qualification for Helix Platform — separate from the advisory pipeline.
        </p>
      </div>
      <Input
        label="Name"
        name="name"
        required
        value={values.name}
        onChange={(e) => update("name", e.target.value)}
        error={errors.name}
      />
      <Input
        label="Work email"
        type="email"
        name="email"
        required
        value={values.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
      />
      <Input
        label="Company"
        name="company"
        required
        value={values.company}
        onChange={(e) => update("company", e.target.value)}
        error={errors.company}
      />
      <Input
        label="Role"
        name="role"
        required
        value={values.role}
        onChange={(e) => update("role", e.target.value)}
        error={errors.role}
      />
      <Textarea
        label="Stack summary"
        name="stackSummary"
        required
        helperText="Languages, primary apps, CI, and how tests are owned today."
        value={values.stackSummary}
        onChange={(e) => update("stackSummary", e.target.value)}
        error={errors.stackSummary}
      />
      <Select
        label="Release cadence"
        name="releaseCadence"
        required
        placeholder="Select cadence"
        value={values.releaseCadence ?? ""}
        onChange={(e) =>
          update("releaseCadence", e.target.value as Draft["releaseCadence"])
        }
        options={[...CADENCE]}
        error={errors.releaseCadence}
      />
      <Textarea
        label="What is breaking in quality or verification?"
        name="pain"
        required
        value={values.pain}
        onChange={(e) => update("pain", e.target.value)}
        error={errors.pain}
      />
      {submitError ? (
        <p role="alert" className="font-text text-caption text-error">
          {submitError}
        </p>
      ) : null}
      <Button type="submit" variant="primary" size="lg" loading={status === "loading"}>
        Submit to Helix / Vigil
      </Button>
    </form>
  );
}
