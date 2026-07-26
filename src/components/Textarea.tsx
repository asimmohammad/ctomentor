import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, helperText, error, className, disabled, required, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const helperId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;
    const describedBy = [helperText ? helperId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex w-full flex-col gap-2">
        <label htmlFor={textareaId} className="font-text text-small font-medium text-ink">
          {label}
          {required ? (
            <span className="text-accent" aria-hidden="true">
              {" "}
              *
            </span>
          ) : null}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "min-h-32 w-full rounded-input border bg-surface px-4 py-3 font-text text-body text-ink placeholder:text-ink-faint",
            "transition-colors duration-standard ease-standard",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-error" : "border-border",
            className,
          )}
          {...props}
        />
        {helperText && !error ? (
          <p id={helperId} className="font-text text-caption text-ink-muted">
            {helperText}
          </p>
        ) : null}
        {error ? (
          <p id={errorId} role="alert" className="font-text text-caption text-error">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
