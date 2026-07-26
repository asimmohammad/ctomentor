import { describe, expect, it } from "vitest";
import { cn } from "./utils";

/**
 * Regression guard for the contrast bug: tailwind-merge must treat the brief's
 * word-token type scale as font sizes, not as text colors. When it does not,
 * `cn()` drops the color and buttons inherit their surrounding ink — producing
 * charcoal-on-black and cream-on-cream fills.
 */
describe("cn", () => {
  it("keeps a text color when a type-scale token follows it", () => {
    const result = cn("bg-accent text-ink-inverse", "h-11 px-6 text-small");
    expect(result).toContain("text-ink-inverse");
    expect(result).toContain("text-small");
  });

  it("keeps the onDark fill readable (cream fill, ink label)", () => {
    const result = cn("bg-ink-inverse text-ink", "h-12 px-8 text-body");
    expect(result).toContain("text-ink");
    expect(result).toContain("text-body");
  });

  it("still lets a later color override an earlier color", () => {
    const result = cn("text-eyebrow text-ink-muted", "text-ink-inverse/60");
    expect(result).toContain("text-ink-inverse/60");
    expect(result).not.toContain("text-ink-muted");
    expect(result).toContain("text-eyebrow");
  });

  it("still resolves conflicts between two type-scale tokens", () => {
    expect(cn("text-small", "text-body")).toBe("text-body");
  });
});
