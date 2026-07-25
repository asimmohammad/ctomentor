"use client";

import { useReveal } from "@/hooks/use-reveal";

export function StyleguideRevealDemo() {
  const reveal = useReveal<HTMLDivElement>();

  return (
    <div
      ref={reveal.ref}
      className={`${reveal.className} border border-border bg-surface p-8`}
      data-revealed={reveal["data-revealed"]}
    >
      <p className="font-text text-h3">Revealed block</p>
      <p className="mt-3 text-body text-ink-muted">
        This card uses useReveal. It animates once when it enters the viewport.
      </p>
    </div>
  );
}
