import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "onDark"
  | "ghostOnDark"
  | "secondaryOnDark"
  | "outlineOnDark";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders a trailing arrow icon. */
  arrow?: boolean;
  /** Shows a spinner, sets aria-busy, and disables interaction. */
  loading?: boolean;
  /** Merge props onto the child element (e.g. Next.js Link). */
  asChild?: boolean;
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-ink-inverse hover:bg-accent-hover active:bg-accent-hover disabled:bg-accent/40",
  /** Solid light fill for use on dark-band sections (charcoal accent would disappear). */
  onDark:
    "bg-ink-inverse text-ink hover:bg-paper active:bg-paper disabled:bg-ink-inverse/40",
  secondary:
    "border border-ink bg-transparent text-ink hover:bg-ink hover:text-ink-inverse active:bg-ink disabled:border-ink-faint disabled:text-ink-faint",
  ghost:
    "bg-transparent text-ink underline-offset-4 hover:underline active:underline disabled:text-ink-faint disabled:no-underline",
  /** Ghost/link weight for dark-band — charcoal text-ink would disappear. */
  ghostOnDark:
    "bg-transparent text-ink-inverse underline-offset-4 hover:underline hover:text-ink-inverse active:underline disabled:text-ink-inverse/50 disabled:no-underline",
  /** Outlined control for dark-band (Download PDF, secondary CTAs). */
  secondaryOnDark:
    "border border-ink-inverse bg-transparent text-ink-inverse hover:bg-ink-inverse hover:text-dark-band active:bg-ink-inverse disabled:border-ink-inverse/40 disabled:text-ink-inverse/50",
  /** Alias of secondaryOnDark for pages still using the outlineOnDark name. */
  outlineOnDark:
    "border border-ink-inverse/30 bg-transparent text-ink-inverse hover:bg-ink-inverse hover:text-dark-band active:bg-ink-inverse disabled:border-ink-inverse/40 disabled:text-ink-inverse/50",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-caption",
  md: "h-11 px-6 text-small",
  lg: "h-12 px-8 text-body",
};

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      arrow = false,
      loading = false,
      asChild = false,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-none font-text font-medium transition-colors duration-standard ease-standard",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
      "disabled:pointer-events-none disabled:opacity-50",
      // Size first so the variant's text color is never the loser of a merge conflict.
      sizeClass[size],
      variantClass[variant],
      className,
    );

    if (asChild) {
      return (
        <Slot className={classes} ref={ref} aria-busy={loading || undefined} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        {...props}
      >
        {loading ? <Spinner /> : null}
        <span>{children}</span>
        {arrow && !loading ? <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      </button>
    );
  },
);
Button.displayName = "Button";
