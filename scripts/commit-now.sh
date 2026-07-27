#!/usr/bin/env bash
# One-shot commit: logos + proof band polish. Does not push.
set -euo pipefail
export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin
cd "$(dirname "$0")/.."

echo "=== pre-commit status ==="
git status
git log -5 --oneline

git add -A
git reset HEAD -- .env .env.local .env*.local credentials.json 2>/dev/null || true

if git check-ignore -q src/lib/proof-logos.generated.ts 2>/dev/null; then
  git reset HEAD -- src/lib/proof-logos.generated.ts 2>/dev/null || true
  git rm -r --cached --ignore-unmatch src/lib/proof-logos.generated.ts 2>/dev/null || true
fi

if git diff --cached --quiet; then
  echo "Nothing to commit after staging filters."
  git status
  exit 1
fi

git commit -m "$(cat <<'EOF'
Add customer logos and proof band polish.

Ship logo assets and homepage proof/brief-check sizing so the Customers band matches the live brand set.
EOF
)"

echo "=== post-commit ==="
git log -1 --format='%H%n%s'
git status
git show --name-only --pretty=format: HEAD
