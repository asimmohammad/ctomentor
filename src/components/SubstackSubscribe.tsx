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
      <div className={isFooter ? "max-w-md space-y-4" : "space-y-4"}>
        <iframe
          src={EMBED_SRC}
          title="Subscribe to Asim Mohammad on Substack"
          className="w-full max-w-measure"
          style={{
            border: "1px solid var(--border)",
            background: "var(--surface)",
            borderRadius: "var(--radius-none)",
            height: "var(--substack-embed-height)",
          }}
          frameBorder="0"
          scrolling="no"
        />
        <Button variant={isFooter ? "secondary" : "primary"} size={isFooter ? "default" : "lg"} asChild>
          <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer">
            Subscribe on Substack
          </a>
        </Button>
      </div>
    </div>
  );
}
