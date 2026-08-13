"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Accessible name. Rendered as the visible heading unless `titleSlot` is given. */
  title: string;
  /** Optional custom heading block; `title` still names the dialog for assistive tech. */
  titleSlot?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  /** Pinned to the bottom of the panel, outside the scrolling body. */
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Design-system dialog on the Radix primitive — focus trap, Escape, scroll lock,
 * and aria-modal come from Radix. Deliberately not src/components/ui/dialog.tsx:
 * that shadcn scaffold ships rounded-lg, shadow-lg, and bg-background, none of
 * which exist in this system (radius 0, no shadow, token colors only).
 */
export function Modal({
  open,
  onOpenChange,
  title,
  titleSlot,
  description,
  children,
  footer,
  className,
}: ModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/70 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-[calc(100vw-2rem)] max-w-2xl",
            "-translate-x-1/2 -translate-y-1/2 flex-col rounded-none border border-ink bg-surface",
            "focus:outline-none data-[state=closed]:animate-out data-[state=open]:animate-in",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className,
          )}
        >
          <div className="flex items-start justify-between gap-6 border-b border-border p-6 md:p-8">
            <div className="min-w-0">
              {titleSlot ? (
                <>
                  <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
                  {titleSlot}
                </>
              ) : (
                <DialogPrimitive.Title className="font-display text-h3 font-semibold text-ink">
                  {title}
                </DialogPrimitive.Title>
              )}
              {description ? (
                <DialogPrimitive.Description className="mt-2 font-text text-body text-ink-muted">
                  {description}
                </DialogPrimitive.Description>
              ) : null}
            </div>
            <DialogPrimitive.Close
              aria-label="Close"
              className="shrink-0 p-1 text-ink-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <X size={20} aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8">{children}</div>

          {footer ? (
            <div className="border-t border-border p-6 md:p-8">{footer}</div>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
