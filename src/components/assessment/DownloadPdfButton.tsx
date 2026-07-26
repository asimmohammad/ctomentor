"use client";

import { Button } from "@/components/Button";

/** Secondary CTA — print/PDF via browser print until Storage URL is available. */
export function DownloadPdfButton({
  className,
  onClick,
  /** Use on dark-band sections so border/text stay light. */
  onDark = false,
}: {
  className?: string;
  onClick?: () => void;
  onDark?: boolean;
}) {
  return (
    <Button
      type="button"
      variant={onDark ? "secondaryOnDark" : "secondary"}
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
