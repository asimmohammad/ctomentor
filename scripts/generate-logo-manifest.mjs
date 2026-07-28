#!/usr/bin/env node
/**
 * Scans src/assets/logo/ and emits src/lib/proof-logos.generated.ts
 * with static ES imports for every client logo asset.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const LOGO_DIR = path.join(ROOT, "src/assets/logo");
const OUTPUT = path.join(ROOT, "src/lib/proof-logos.generated.ts");

const ALLOWED_EXT = new Set([".svg", ".png", ".webp"]);

/** Camera-roll / dump names must never ship in production. */
const FORBIDDEN_BASENAME = /^(img|image|screenshot|photo)[-_]?\d+/i;

/** @param {string} slug */
function slugToDisplayName(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/** @param {string} filename */
function parseLogoFilename(filename) {
  const ext = path.extname(filename).toLowerCase();
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

  // Normalize slug case so Ava.png and ava.png share one override key.
  const slug = base.toLowerCase();

  return { slug, isDark, ext, sortOrder, filename, base };
}

/** @param {string} filePath @param {string} ext */
function readImageDimensions(filePath, ext) {
  const buf = fs.readFileSync(filePath);

  if (ext === ".png" && buf.length >= 24) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  if (ext === ".webp") {
    if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
      const chunk = buf.toString("ascii", 12, 16);
      if (chunk === "VP8X" && buf.length >= 30) {
        const width = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
        const height = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16));
        return { width, height };
      }
      if (chunk === "VP8 " && buf.length >= 30) {
        const width = buf.readUInt16LE(26) & 0x3fff;
        const height = buf.readUInt16LE(28) & 0x3fff;
        return { width, height };
      }
    }
  }

  return { width: 120, height: 40 };
}

/** @param {string} slug */
function importId(slug) {
  return `logo_${slug.replace(/[^a-zA-Z0-9]/g, "_")}`;
}

function main() {
  if (!fs.existsSync(LOGO_DIR)) {
    fs.mkdirSync(LOGO_DIR, { recursive: true });
  }

  const files = fs
    .readdirSync(LOGO_DIR)
    .filter((f) => !f.startsWith(".") && fs.statSync(path.join(LOGO_DIR, f)).isFile());

  /** @type {Map<string, { sortOrder: number, base?: object, dark?: object }>} */
  const bySlug = new Map();

  for (const filename of files) {
    const parsed = parseLogoFilename(filename);

    if (!ALLOWED_EXT.has(parsed.ext)) {
      console.error(`FAIL: invalid logo filename "${filename}" — only .svg, .png, .webp are allowed`);
      process.exit(1);
    }

    if (FORBIDDEN_BASENAME.test(parsed.base)) {
      console.error(
        `FAIL: logo filename "${filename}" looks like a camera-roll dump (matches /^(img|image|screenshot|photo)[-_]?\\d+/i). Rename to a company slug (e.g. zappd.png) before shipping.`,
      );
      process.exit(1);
    }

    const relImport = `../assets/logo/${filename}`;
    const absPath = path.join(LOGO_DIR, filename);
    const format = parsed.ext.slice(1);
    const dims =
      parsed.ext === ".svg" ? {} : readImageDimensions(absPath, parsed.ext);

    const asset = {
      filename,
      importPath: relImport,
      format,
      ...dims,
    };

    if (!bySlug.has(parsed.slug)) {
      bySlug.set(parsed.slug, { sortOrder: parsed.sortOrder });
    }

    const entry = bySlug.get(parsed.slug);
    entry.sortOrder = Math.min(entry.sortOrder, parsed.sortOrder);

    if (parsed.isDark) {
      entry.dark = asset;
    } else {
      entry.base = asset;
    }
  }

  for (const [slug, entry] of bySlug) {
    if (entry.dark && !entry.base) {
      console.error(
        `FAIL: dark variant "${entry.dark.filename}" has no matching base file for slug "${slug}"`,
      );
      process.exit(1);
    }
  }

  const slugs = [...bySlug.keys()].sort((a, b) => {
    const orderDiff = bySlug.get(a).sortOrder - bySlug.get(b).sortOrder;
    return orderDiff !== 0 ? orderDiff : a.localeCompare(b);
  });

  const importLines = [];
  const usedIds = new Set();

  /** @param {object} asset @param {string} slug @param {"base"|"dark"} kind */
  function registerImport(asset, slug, kind) {
    let id = importId(slug);
    if (kind === "dark") id += "_dark";
    let unique = id;
    let n = 2;
    while (usedIds.has(unique)) {
      unique = `${id}_${n++}`;
    }
    usedIds.add(unique);
    importLines.push(`import ${unique} from "${asset.importPath}";`);
    return unique;
  }

  const manifestEntries = slugs.map((slug) => {
    const { base, dark, sortOrder } = bySlug.get(slug);
    const baseId = registerImport(base, slug, "base");
    const fields = [
      `slug: ${JSON.stringify(slug)}`,
      `displayName: ${JSON.stringify(slugToDisplayName(slug))}`,
      `sortOrder: ${sortOrder}`,
      `format: ${JSON.stringify(base.format)}`,
      `src: ${baseId}`,
    ];

    if (base.width != null && base.height != null) {
      fields.push(`width: ${base.width}`, `height: ${base.height}`);
    }

    if (dark) {
      const darkId = registerImport(dark, slug, "dark");
      fields.push(`darkSrc: ${darkId}`);
    }

    return `  {\n    ${fields.join(",\n    ")},\n  }`;
  });

  const output = `/* eslint-disable */
// AUTO-GENERATED by scripts/generate-logo-manifest.mjs — do not edit.
import type { StaticImageData } from "next/image";

export type ProofLogoAsset = string | StaticImageData;

export type ProofLogoManifestEntry = {
  slug: string;
  displayName: string;
  sortOrder: number;
  format: "svg" | "png" | "webp";
  src: ProofLogoAsset;
  darkSrc?: ProofLogoAsset;
  width?: number;
  height?: number;
};

${importLines.join("\n")}

export const PROOF_LOGO_MANIFEST: ProofLogoManifestEntry[] = [
${manifestEntries.join(",\n")}
];
`;

  fs.writeFileSync(OUTPUT, output, "utf8");
  console.log(`Generated ${OUTPUT} with ${slugs.length} logo(s).`);
  for (const slug of slugs) {
    console.log(`  - ${slug}: ${slugToDisplayName(slug)}`);
  }
}

main();
