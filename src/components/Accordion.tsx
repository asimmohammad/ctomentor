"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export interface AccordionProps {
  items: AccordionItem[];
  /** When true, only one panel may be open at a time. Default true. */
  singleOpen?: boolean;
  className?: string;
  defaultOpenIds?: string[];
}

/**
 * FAQ accordion — button/region semantics, keyboard operable, height animation
 * that is disabled under prefers-reduced-motion.
 */
export function Accordion({
  items,
  singleOpen = true,
  className,
  defaultOpenIds = [],
}: AccordionProps) {
  const [openIds, setOpenIds] = React.useState<string[]>(defaultOpenIds);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = (id: string) => {
    setOpenIds((current) => {
      const isOpen = current.includes(id);
      if (singleOpen) {
        return isOpen ? [] : [id];
      }
      return isOpen ? current.filter((x) => x !== id) : [...current, id];
    });
  };

  return (
    <div className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const panelId = `${item.id}-panel`;
        const buttonId = `${item.id}-button`;

        return (
          <div key={item.id}>
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-text text-h4 font-semibold text-ink transition-colors duration-standard hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-ink-muted transition-transform duration-standard ease-standard",
                    isOpen && "rotate-180",
                    reduceMotion && "transition-none",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-standard ease-standard",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                reduceMotion && "transition-none",
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-5 font-text text-body text-ink-muted">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
