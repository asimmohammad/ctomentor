"use client";

import { Button } from "@/components/Button";

/** Secondary CTA — print/PDF via browser print until Storage URL is available. */
export function DownloadPdfButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Button
      type="button"
      variant="secondary"
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
