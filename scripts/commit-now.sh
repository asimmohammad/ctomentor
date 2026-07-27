#!/usr/bin/env bash
# One-shot commit. Does not push.
set -euo pipefail
export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin
cd "$(dirname "$0")/.."

git status
git log -5 --oneline

git add -A
git reset HEAD -- .env .env.local .env*.local credentials.json 2>/dev/null || true
if git check-ignore -q src/lib/proof-logos.generated.ts 2>/dev/null; then
  git reset HEAD -- src/lib/proof-logos.generated.ts 2>/dev/null || true
  git rm -r --cached --ignore-unmatch src/lib/proof-logos.generated.ts 2>/dev/null || true
fi

if git diff --cached --quiet; then
  echo "Nothing to commit."
  git status
  exit 1
fi

git commit -m "$(cat <<'EOF'
Polish homepage hero, insights headline, and customer proof band.

Use Surface.svg at natural size on the home hero, tighten the insights title so it stays on one line, and keep logo/brief-check changes deployable.
EOF
)"

git log -1 --format='%H%n%s'
git status
git show --name-only --pretty=format: HEAD
