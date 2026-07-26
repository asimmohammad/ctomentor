"use client";

import Link from "next/link";
import { Button } from "@/components/Button";
import { PRIMARY_CTA } from "@/lib/cta";

export default function BookError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-measure px-gutter py-16">
      <h1 className="font-display text-h2 text-ink">Could not load booking</h1>
      <p className="mt-4 font-text text-body text-ink-muted">
        Something went wrong loading the calendar. Try again, or start with the assessment.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button type="button" variant="primary" size="lg" onClick={reset}>
          Try again
        </Button>
        <Button asChild variant="secondary" size="lg">
          <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Link>
        </Button>
      </div>
    </div>
  );
}
