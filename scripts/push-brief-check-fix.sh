#!/usr/bin/env bash
# One-shot: verify brief-check without rg, commit outstanding proof/deploy fixes, push.
set -euo pipefail
export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin
cd "$(dirname "$0")/.."

chmod +x scripts/brief-check.sh

echo "=== brief-check without homebrew (expect no rg) ==="
env PATH=/usr/bin:/bin:/usr/sbin:/sbin ./scripts/brief-check.sh

echo "=== status ==="
git status
git diff --stat

git add \
  scripts/brief-check.sh \
  src/components/proof/ProofBand.tsx \
  src/lib/proof.ts \
  src/lib/proof-name.ts \
  src/lib/proof-name.test.ts \
  src/lib/analytics.ts \
  src/components/proof/ \
  src/assets/logo/ \
  docs/PROOF_PERMISSIONS.md \
  scripts/generate-logo-manifest.mjs \
  package.json \
  package-lock.json \
  .gitignore \
  src/app/page.tsx \
  src/app/book/page.tsx \
  src/app/engagements/page.tsx \
  src/app/globals.css \
  src/components/index.ts \
  2>/dev/null || true

# Stage whatever is still modified for the proof system + brief-check + logo sizing
git add -u scripts/brief-check.sh src/components/proof/ProofBand.tsx 2>/dev/null || true
git add scripts/brief-check.sh src/components/proof/ProofBand.tsx

git status

git commit -m "$(cat <<'EOF'
Fix Vercel brief-check (no ripgrep) and show proof logos larger in color.

Missing rg on the build image was falsely failing CTA guards; logo band drops grayscale and scales marks up for legibility.
EOF
)" || {
  echo "Commit skipped (nothing staged or already committed)."
}

git push -u origin HEAD
echo "HEAD: $(git rev-parse HEAD)"
git status
