import * as React from "react";
import { cn } from "@/lib/utils";

export type CardVariant = "default" | "emphasized" | "dark";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Disable hover border elevation (e.g. static display). */
  static?: boolean;
}

const variantClass: Record<CardVariant, string> = {
  default: "bg-surface text-ink border-border",
  emphasized: "bg-surface text-ink border-ink",
  dark: "bg-dark-band text-ink-inverse border-ink-inverse/20",
};

/**
 * Card — 1px border, radius 0, no shadow. Hover raises border to ink (except dark/static).
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", static: isStatic = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-none border p-6 transition-colors duration-standard ease-standard",
          variantClass[variant],
          !isStatic && variant !== "dark" && "hover:border-ink",
          !isStatic && variant === "dark" && "hover:border-ink-inverse/50",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Card.displayName = "Card";
