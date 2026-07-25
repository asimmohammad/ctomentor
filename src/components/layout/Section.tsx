import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionSpacing = "compact" | "standard" | "generous";
type SectionTone = "paper" | "alt" | "dark";

type SectionProps = {
  children: ReactNode;
  className?: string;
  spacing?: SectionSpacing;
  tone?: SectionTone;
  /** Skip the inner Container when composing custom layouts */
  flush?: boolean;
  id?: string;
  as?: "section" | "div" | "header" | "footer";
};

const spacingClass: Record<SectionSpacing, string> = {
  compact: "py-[var(--section-compact)]",
  standard: "py-[var(--section-standard)]",
  generous: "py-[var(--section-generous)]",
};

const toneClass: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  alt: "bg-surface-alt text-ink",
  dark: "bg-dark-band text-ink-inverse",
};

export function Section({
  children,
  className,
  spacing = "standard",
  tone = "paper",
  flush = false,
  id,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag id={id} className={cn(spacingClass[spacing], toneClass[tone], className)}>
      {flush ? children : <Container>{children}</Container>}
    </Tag>
  );
}
