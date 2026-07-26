import Link from "next/link";
import { Button } from "@/components/Button";
import type { ContextualCta } from "@/lib/insights";

export function ContextualArticleCta({ cta }: { cta: ContextualCta }) {
  return (
    <aside className="my-12 border border-border bg-surface-alt px-6 py-8 sm:px-8">
      <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-accent">Next step</p>
      <h2 className="mt-3 font-display text-h3 text-ink">{cta.heading}</h2>
      <p className="mt-3 max-w-measure font-text text-body text-ink-muted">{cta.body}</p>
      <div className="mt-6">
        <Button asChild variant="primary" size="lg">
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      </div>
    </aside>
  );
}
