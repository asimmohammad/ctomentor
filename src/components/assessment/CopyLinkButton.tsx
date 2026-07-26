"use client";

import * as React from "react";
import { Button } from "@/components/Button";

export function CopyLinkButton({
  url,
  onCopied,
}: {
  url: string;
  onCopied?: () => void;
}) {
  const [status, setStatus] = React.useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
      onCopied?.();
      window.setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button type="button" variant="secondary" size="md" onClick={copy}>
        {status === "copied" ? "Link copied" : "Copy share link"}
      </Button>
      {status === "error" ? (
        <p role="alert" className="font-text text-caption text-error">
          Could not copy. Select the URL from the address bar.
        </p>
      ) : null}
    </div>
  );
}
