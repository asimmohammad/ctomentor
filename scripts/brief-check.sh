#!/usr/bin/env bash
# brief-check.sh — PROJECT_BRIEF.md guardrails for pricing + CTAs.
# Portable: uses ripgrep when present, otherwise grep (Vercel/CI have no rg).
set -euo pipefail
cd "$(dirname "$0")/.."

ROOT="src"
FAIL=0

echo "== brief-check: pricing + CTA guardrails =="

has_rg() {
  command -v rg >/dev/null 2>&1
}

# Quiet match in a single file. Returns 0 if found.
file_has() {
  local pattern="$1"
  local file="$2"
  if has_rg; then
    rg -q -- "$pattern" "$file"
  else
    grep -qE -- "$pattern" "$file"
  fi
}

# 1. Canonical pricing module must exist
if [[ ! -f src/lib/pricing.ts ]]; then
  echo "FAIL: src/lib/pricing.ts missing"
  FAIL=1
else
  echo "OK: src/lib/pricing.ts present"
fi

# 2. No legacy sub-$25k engagement figures in source (exclude pricing.ts itself for floor constant)
SUBPRICE_HITS=""
if has_rg; then
  SUBPRICE_HITS=$(rg -n --glob '!src/lib/pricing.ts' -e '\$5,?000|From \$5|\$8,?000|\$10,?000|\$12,?000|\$15,?000' "$ROOT" 2>/dev/null || true)
else
  SUBPRICE_HITS=$(
    grep -RInE --include='*.ts' --include='*.tsx' --include='*.js' --include='*.jsx' --include='*.mdx' \
      -e '\$5,?000|From \$5|\$8,?000|\$10,?000|\$12,?000|\$15,?000' "$ROOT" 2>/dev/null \
      | grep -v 'src/lib/pricing.ts' || true
  )
fi
if [[ -n "$SUBPRICE_HITS" ]]; then
  echo "FAIL: found engagement price figure below \$25,000 outside the floor constant path"
  echo "$SUBPRICE_HITS"
  FAIL=1
else
  echo "OK: no sub-\$25k engagement price strings outside allowed patterns"
fi

# 3. Display ladder strings must not be hardcoded in JSX/TSX (only via pricing imports / pricing.ts)
HARDCODED=""
if has_rg; then
  HARDCODED=$(rg -n --glob '*.tsx' -e '\$25,000 fixed|From \$25,000/month|\$35,000–\$50,000|From \$50,000/month' "$ROOT" || true)
else
  HARDCODED=$(
    grep -RInE --include='*.tsx' \
      -e '\$25,000 fixed|From \$25,000/month|\$35,000–\$50,000|From \$50,000/month' "$ROOT" 2>/dev/null || true
  )
fi
if [[ -n "$HARDCODED" ]]; then
  echo "FAIL: ladder display strings hardcoded in TSX (must read from lib/pricing.ts):"
  echo "$HARDCODED"
  FAIL=1
else
  echo "OK: no ladder display strings hardcoded in TSX"
fi

# 4. Canonical CTAs
if ! file_has 'Take the Technical Risk Assessment' src/lib/cta.ts; then
  echo "FAIL: primary CTA label missing from cta.ts"
  FAIL=1
else
  echo "OK: primary CTA in cta.ts"
fi
if ! file_has 'Request a confidential conversation' src/lib/cta.ts; then
  echo "FAIL: secondary CTA label missing from cta.ts"
  FAIL=1
else
  echo "OK: secondary CTA in cta.ts"
fi

# 5. Budget select options live in pricing.ts
if ! file_has 'BUDGET_SELECT_OPTIONS' src/lib/pricing.ts; then
  echo "FAIL: BUDGET_SELECT_OPTIONS missing from pricing.ts"
  FAIL=1
else
  echo "OK: BUDGET_SELECT_OPTIONS in pricing.ts"
fi

# 6. Testimonials must include permissionOn
if [[ -f src/lib/proof.ts ]]; then
  if node --input-type=module -e "
    import fs from 'node:fs';
    const src = fs.readFileSync('src/lib/proof.ts', 'utf8');
    const m = src.match(/export const TESTIMONIALS[^=]*=\\s*(\\[[\\s\\S]*?\\]);/);
    if (!m) process.exit(0);
    const arr = m[1].replace(/\\/\\*[\\s\\S]*?\\*\\//g, '').replace(/\\/\\/.*\$/gm, '');
    const objects = arr.match(/\\{[\\s\\S]*?\\}/g) || [];
    const bad = objects.filter((o) => /quote\\s*:/.test(o) && !/permissionOn\\s*:/.test(o));
    if (bad.length) {
      console.error('FAIL: testimonial(s) missing permissionOn');
      bad.forEach((o) => console.error(o.trim().slice(0, 120)));
      process.exit(1);
    }
  "; then
    echo "OK: testimonials include permissionOn when present"
  else
    FAIL=1
  fi
else
  echo "FAIL: src/lib/proof.ts missing (required for proof system)"
  FAIL=1
fi

if [[ "$FAIL" -ne 0 ]]; then
  echo
  echo "brief-check FAILED"
  exit 1
fi

echo
echo "brief-check PASSED"
