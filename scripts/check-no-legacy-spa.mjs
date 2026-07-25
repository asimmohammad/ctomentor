#!/usr/bin/env node
/**
 * Fails the build if the phrase "legacy SPA" appears in source that can ship
 * as rendered UI copy. PROJECT_BRIEF.md and other docs are excluded.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(process.cwd(), "src");
const FORBIDDEN = /legacy SPA/i;
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".mdx", ".md"]);

const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full);
      continue;
    }
    const ext = name.slice(name.lastIndexOf("."));
    if (!EXTENSIONS.has(ext)) continue;
    const text = readFileSync(full, "utf8");
    if (FORBIDDEN.test(text)) {
      hits.push(relative(process.cwd(), full));
    }
  }
}

walk(ROOT);

if (hits.length > 0) {
  console.error(
    'Build check failed: forbidden phrase "legacy SPA" found in rendered-source files:\n' +
      hits.map((f) => `  - ${f}`).join("\n"),
  );
  process.exit(1);
}

console.log('OK: no "legacy SPA" phrase in src/');
