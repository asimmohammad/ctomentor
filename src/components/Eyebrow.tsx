import * as React from "react";
import { cn } from "@/lib/utils";

export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div";
}

/**
 * Section eyebrow — JetBrains Mono, uppercase, 12px, 0.12em tracking, ink-muted.
 */
export function Eyebrow({ as: Tag = "p", className, children, ...props }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "font-mono text-eyebrow font-medium uppercase tracking-[0.12em] text-ink-muted",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
