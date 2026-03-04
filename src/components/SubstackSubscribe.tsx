"use client";

import { Button } from "@/components/ui/button";

const SUBSTACK_URL = "https://asimmohammad.substack.com";
const EMBED_SRC = "https://asimmohammad.substack.com/embed";

interface SubstackSubscribeProps {
  variant?: "inline" | "footer";
  className?: string;
}

export function SubstackSubscribe({ variant = "inline", className = "" }: SubstackSubscribeProps) {
  const isFooter = variant === "footer";

  return (
    <div className={className}>
      <p
        className={
          isFooter
            ? "text-sm text-primary-foreground/90 font-body mb-4"
            : "text-base text-subtle font-body mb-4"
        }
      >
        Private equity, portfolio company technology, and what actually drives exit value.
      </p>
      <div className={isFooter ? "max-w-md space-y-4" : "space-y-4"}>
        <iframe
          src={EMBED_SRC}
          width="100%"
          height={320}
          style={{ border: "1px solid #eee", background: "white", borderRadius: "6px" }}
          frameBorder="0"
          scrolling="no"
          title="Subscribe to Asim Mohammad on Substack"
          className="max-w-[480px] w-full"
        />
        <Button
          variant={isFooter ? "secondary" : "primary"}
          size={isFooter ? "default" : "lg"}
          asChild
        >
          <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
            Subscribe on Substack
          </a>
        </Button>
      </div>
    </div>
  );
}
