import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, type CardVariant } from "@/components/Card";
import { Eyebrow } from "@/components/Eyebrow";

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label above the metric (eyebrow treatment). */
  label: string;
  /** Dominant tabular figure — the hero of the card. */
  metric: string;
  /** One or two lines of narrative under the metric. */
  narrative: string;
  variant?: CardVariant;
}

/**
 * Case-study card: number is the hero (Zodiak h1, tabular-nums), not the title.
 */
export function MetricCard({
  label,
  metric,
  narrative,
  variant = "default",
  className,
  ...props
}: MetricCardProps) {
  return (
    <Card variant={variant} className={cn("flex flex-col gap-4", className)} {...props}>
      <Eyebrow>{label}</Eyebrow>
      <p
        className={cn(
          "metric font-display text-h1",
          variant === "dark" ? "text-ink-inverse" : "text-ink",
        )}
      >
        {metric}
      </p>
      <p
        className={cn(
          "font-text text-body",
          variant === "dark" ? "text-ink-inverse/80" : "text-ink-muted",
        )}
      >
        {narrative}
      </p>
    </Card>
  );
}
