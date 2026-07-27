/**
 * Derive a display name from a logo filename slug.
 * Numeric sort prefixes and ".dark" suffixes are stripped before title-casing.
 */
export function slugToDisplayName(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/** Parse a logo filename into slug, dark-variant flag, extension, and sort order. */
export function parseLogoFilename(filename: string): {
  slug: string;
  isDark: boolean;
  ext: string;
  sortOrder: number;
} {
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  let base = filename.slice(0, filename.length - ext.length);

  let isDark = false;
  if (base.endsWith(".dark")) {
    isDark = true;
    base = base.slice(0, -5);
  }

  let sortOrder = 0;
  const prefixMatch = base.match(/^(\d+)-(.+)$/);
  if (prefixMatch) {
    sortOrder = Number.parseInt(prefixMatch[1], 10);
    base = prefixMatch[2];
  }

  return { slug: base, isDark, ext, sortOrder };
}
