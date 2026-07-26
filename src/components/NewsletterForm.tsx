"use client";

import * as React from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";

const ROLE_OPTIONS = [
  { value: "pe-deal-partner", label: "PE / VC deal partner" },
  { value: "operating-partner", label: "Operating partner" },
  { value: "ceo-board", label: "CEO / board" },
  { value: "cto-vp-eng", label: "CTO / VP Engineering" },
  { value: "other", label: "Other" },
];

export function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = React.useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, company }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Unable to subscribe right now.");
        return;
      }

      setStatus("success");
      setMessage("You are on the list.");
      setEmail("");
      setRole("");
      setCompany("");
    } catch {
      setStatus("error");
      setMessage("Unable to subscribe right now.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid max-w-measure gap-5" noValidate>
      <Input
        label="Work email"
        type="email"
        name="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        helperText="Used only for this list."
      />
      <Select
        label="Role"
        name="role"
        required
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Select your role"
        options={ROLE_OPTIONS}
      />
      <Input
        label="Company or fund"
        name="company"
        autoComplete="organization"
        required
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <div>
        <Button type="submit" variant="primary" size="lg" loading={status === "loading"}>
          Subscribe
        </Button>
      </div>
      {message ? (
        <p
          role={status === "error" ? "alert" : "status"}
          className={
            status === "error" ? "font-text text-caption text-error" : "font-text text-caption text-ink-muted"
          }
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
