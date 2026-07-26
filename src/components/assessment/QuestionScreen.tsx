"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { Dimension, Question } from "@/lib/assessment/types";
import { Eyebrow } from "@/components/Eyebrow";

export interface QuestionScreenProps {
  question: Question;
  dimension: Dimension;
  selectedOptionId: string | null;
  pendingOptionId: string | null;
  onSelect: (optionId: string) => void;
  focusedIndex: number;
  onFocusedIndexChange: (index: number) => void;
  keyboardActive: boolean;
}

export function QuestionScreen({
  question,
  dimension,
  selectedOptionId,
  pendingOptionId,
  onSelect,
  focusedIndex,
  onFocusedIndexChange,
  keyboardActive,
}: QuestionScreenProps) {
  const optionRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    if (!keyboardActive) return;
    optionRefs.current[focusedIndex]?.focus({ preventScroll: true });
  }, [focusedIndex, keyboardActive, question.id]);

  return (
    <div>
      <Eyebrow>{dimension.name}</Eyebrow>
      <h2 id={`${question.id}-prompt`} className="mt-4 max-w-measure font-display text-h2 text-ink">
        {question.prompt}
      </h2>
      {question.helper ? (
        <p className="mt-3 max-w-measure font-text text-body text-ink-muted">{question.helper}</p>
      ) : null}

      <div
        role="radiogroup"
        aria-labelledby={`${question.id}-prompt`}
        className="mt-8 flex flex-col gap-3"
      >
        {question.options.map((option, optionIndex) => {
          const isSelected = selectedOptionId === option.id;
          const isPending = pendingOptionId === option.id;

          return (
            <button
              key={option.id}
              ref={(element) => {
                optionRefs.current[optionIndex] = element;
              }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={optionIndex === focusedIndex ? 0 : -1}
              onClick={() => {
                onFocusedIndexChange(optionIndex);
                onSelect(option.id);
              }}
              className={cn(
                "flex w-full items-start gap-4 border p-5 text-left transition-colors duration-standard ease-standard",
                "min-h-[4rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                isSelected || isPending ? "border-ink bg-surface" : "border-border bg-surface hover:border-ink",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center border font-mono text-eyebrow",
                  isSelected || isPending
                    ? "border-accent bg-accent text-ink-inverse"
                    : "border-border text-ink-faint",
                )}
              >
                {optionIndex + 1}
              </span>
              <span className="font-text text-body text-ink">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
