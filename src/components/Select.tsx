import * as React from "react";
import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label: string;
  helperText?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { id, label, helperText, error, options, placeholder, className, disabled, required, ...props },
    ref,
  ) => {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;
    const helperId = `${selectId}-helper`;
    const errorId = `${selectId}-error`;
    const describedBy = [helperText ? helperId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex w-full flex-col gap-2">
        <label htmlFor={selectId} className="font-text text-small font-medium text-ink">
          {label}
          {required ? (
            <span className="text-accent" aria-hidden="true">
              {" "}
              *
            </span>
          ) : null}
        </label>
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "w-full appearance-none rounded-input border bg-surface px-4 py-3 font-text text-body text-ink",
            "transition-colors duration-standard ease-standard",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-error" : "border-border",
            className,
          )}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
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
Select.displayName = "Select";
