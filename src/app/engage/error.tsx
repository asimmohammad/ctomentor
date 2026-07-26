"use client";

import Link from "next/link";
import { Button } from "@/components/Button";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/cta";

export default function EngageError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-measure px-gutter py-16">
      <h1 className="font-display text-h2 text-ink">Could not load application</h1>
      <p className="mt-4 font-text text-body text-ink-muted">
        Something went wrong. Try again, or take a lower-friction path first.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button type="button" variant="primary" size="lg" onClick={reset}>
          Try again
        </Button>
        <Button asChild variant="secondary" size="lg">
          <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Link>
        </Button>
        <Button asChild variant="ghost" size="lg">
          <Link href={SECONDARY_CTA.href}>{SECONDARY_CTA.label}</Link>
        </Button>
      </div>
    </div>
  );
}
