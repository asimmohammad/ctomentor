import { describe, expect, it } from "vitest";
import { parseLogoFilename, slugToDisplayName } from "./proof-name";

describe("slugToDisplayName", () => {
  it("title-cases hyphenated slugs", () => {
    expect(slugToDisplayName("acme-corp")).toBe("Acme Corp");
  });

  it("handles single-word slugs", () => {
    expect(slugToDisplayName("stripe")).toBe("Stripe");
  });
});

describe("parseLogoFilename", () => {
  it("parses a base svg file", () => {
    expect(parseLogoFilename("acme-corp.svg")).toEqual({
      slug: "acme-corp",
      isDark: false,
      ext: ".svg",
      sortOrder: 0,
    });
  });

  it("parses a dark variant", () => {
    expect(parseLogoFilename("acme-corp.dark.svg")).toEqual({
      slug: "acme-corp",
      isDark: true,
      ext: ".svg",
      sortOrder: 0,
    });
  });

  it("strips numeric sort prefix", () => {
    expect(parseLogoFilename("20-acme-corp.svg")).toEqual({
      slug: "acme-corp",
      isDark: false,
      ext: ".svg",
      sortOrder: 20,
    });
  });

  it("combines numeric prefix and dark variant", () => {
    expect(parseLogoFilename("20-acme-corp.dark.webp")).toEqual({
      slug: "acme-corp",
      isDark: true,
      ext: ".webp",
      sortOrder: 20,
    });
  });
});
