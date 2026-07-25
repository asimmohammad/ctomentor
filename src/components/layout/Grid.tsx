import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type GridProps = {
  children: ReactNode;
  className?: string;
};

type GridItemProps = {
  children: ReactNode;
  className?: string;
  span?: ColSpan;
  md?: ColSpan;
  lg?: ColSpan;
};

const spanClass: Record<ColSpan, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

const mdSpanClass: Record<ColSpan, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  9: "md:col-span-9",
  10: "md:col-span-10",
  11: "md:col-span-11",
  12: "md:col-span-12",
};

const lgSpanClass: Record<ColSpan, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  9: "lg:col-span-9",
  10: "lg:col-span-10",
  11: "lg:col-span-11",
  12: "lg:col-span-12",
};

export function Grid({ children, className }: GridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-12 gap-x-[var(--gutter)] gap-y-[var(--space-5)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function GridItem({ children, className, span = 12, md, lg }: GridItemProps) {
  return (
    <div
      className={cn(
        spanClass[span],
        md ? mdSpanClass[md] : null,
        lg ? lgSpanClass[lg] : null,
        className,
      )}
    >
      {children}
    </div>
  );
}
