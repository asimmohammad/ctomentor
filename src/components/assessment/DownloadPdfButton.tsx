"use client";

import { Button } from "@/components/Button";

/**
 * Serves the generated report from the permanent /pdf path when `href` is given.
 * Falls back to the browser print dialog only when no report path is available.
 */
export function DownloadPdfButton({
  className,
  href,
  onClick,
  /** Use on dark-band sections so border/text stay light. */
  onDark = false,
}: {
  className?: string;
  href?: string;
  onClick?: () => void;
  onDark?: boolean;
}) {
  const variant = onDark ? "secondaryOnDark" : "secondary";

  if (href) {
    return (
      <Button asChild variant={variant} size="lg" className={className}>
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => onClick?.()}>
          Download the full PDF report
        </a>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={variant}
      size="lg"
      className={className}
      onClick={() => {
        onClick?.();
        window.print();
      }}
    >
      Download the full PDF report
    </Button>
  );
}
