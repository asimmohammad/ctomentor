"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Confirm-then-remove, deliberately not auto-submitting on load: mail scanners
 * and link prefetchers (Outlook SafeLinks, corporate gateways) follow links in
 * email and would silently unsubscribe people who never clicked.
 */
export function UnsubscribeForm() {
  const searchParams = useSearchParams();
  const prefilled = (searchParams.get("email") ?? searchParams.get("e") ?? "").trim();
  const campaign = (searchParams.get("c") ?? searchParams.get("campaign") ?? "").trim();

  const [email, setEmail] = React.useState(prefilled);
  const [status, setStatus] = React.useState<Status>("idle");
  const [message, setMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (prefilled) setEmail(prefilled);
  }, [prefilled]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, campaign: campaign || undefined }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Unable to process that right now.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setMessage("Unable to process that right now. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-8 max-w-measure border border-border bg-surface p-6">
        <p className="font-display text-h3 text-ink">You are unsubscribed.</p>
        <p className="mt-3 font-text text-body text-ink-muted">
          {email.trim().toLowerCase()} has been removed. You will not receive further outreach from me.
        </p>
        <p className="mt-4 font-text text-caption text-ink-muted">
          Removed by mistake, or want to reach me directly? Email{" "}
          <a className="text-accent hover:text-accent-hover" href="mailto:asim@thectomentor.com">
            asim@thectomentor.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid max-w-measure gap-5" noValidate>
      <Input
        label="Email address"
        type="email"
        name="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        helperText={
          prefilled
            ? "This is the address the email was sent to. Change it if you want a different one removed."
            : "Enter the address you want removed."
        }
      />
      <div>
        <Button type="submit" variant="primary" size="lg" loading={status === "loading"}>
          Unsubscribe
        </Button>
      </div>
      {message ? (
        <p role="alert" className="font-text text-caption text-error">
          {message}
        </p>
      ) : null}
    </form>
  );
}
