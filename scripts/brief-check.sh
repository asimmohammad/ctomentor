#!/usr/bin/env bash
# brief-check.sh — PROJECT_BRIEF.md guardrails for pricing + CTAs.
set -euo pipefail
cd "$(dirname "$0")/.."

ROOT="src"
FAIL=0

echo "== brief-check: pricing + CTA guardrails =="

# 1. Canonical pricing module must exist
if [[ ! -f src/lib/pricing.ts ]]; then
  echo "FAIL: src/lib/pricing.ts missing"
  FAIL=1
else
  echo "OK: src/lib/pricing.ts present"
fi

# 2. No legacy sub-$25k engagement figures in source (exclude pricing.ts itself for floor constant)
#    Ban common low-ticket patterns from the old site.
if rg -n --glob '!src/lib/pricing.ts' -e '\$5,?000|From \$5|\$8,?000|\$10,?000|\$12,?000|\$15,?000' "$ROOT" 2>/dev/null; then
  echo "FAIL: found engagement price figure below \$25,000 outside the floor constant path"
  FAIL=1
else
  echo "OK: no sub-\$25k engagement price strings outside allowed patterns"
fi

# 3. Display ladder strings must not be hardcoded in JSX/TSX (only via pricing imports / pricing.ts)
HARDCODED=$(rg -n --glob '*.tsx' -e '\$25,000 fixed|From \$25,000/month|\$35,000–\$50,000|From \$50,000/month' "$ROOT" || true)
if [[ -n "$HARDCODED" ]]; then
  echo "FAIL: ladder display strings hardcoded in TSX (must read from lib/pricing.ts):"
  echo "$HARDCODED"
  FAIL=1
else
  echo "OK: no ladder display strings hardcoded in TSX"
fi

# 4. Canonical CTAs
if ! rg -q 'Take the Technical Risk Assessment' src/lib/cta.ts; then
  echo "FAIL: primary CTA label missing from cta.ts"
  FAIL=1
else
  echo "OK: primary CTA in cta.ts"
fi
if ! rg -q 'Request a confidential conversation' src/lib/cta.ts; then
  echo "FAIL: secondary CTA label missing from cta.ts"
  FAIL=1
else
  echo "OK: secondary CTA in cta.ts"
fi

# 5. Budget select options live in pricing.ts
if ! rg -q 'BUDGET_SELECT_OPTIONS' src/lib/pricing.ts; then
  echo "FAIL: BUDGET_SELECT_OPTIONS missing from pricing.ts"
  FAIL=1
else
  echo "OK: BUDGET_SELECT_OPTIONS in pricing.ts"
fi

if [[ "$FAIL" -ne 0 ]]; then
  echo
  echo "brief-check FAILED"
  exit 1
fi

echo
echo "brief-check PASSED"
