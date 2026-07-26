#!/usr/bin/env bash
# Commit outstanding work and push to GitHub (triggers the Vercel deploy).
# Usage: ./scripts/commit-and-deploy.sh ["commit message"]
set -euo pipefail
cd "$(dirname "$0")/.."

REMOTE_URL="https://github.com/asimmohammad/ctomentor.git"
MESSAGE="${1:-}"

git add -A
git reset -q HEAD -- .env .env.local .env.production.local 2>/dev/null || true
git status --short

if git diff --cached --quiet; then
  echo "Nothing to commit."
else
  if [ -n "$MESSAGE" ]; then
    git commit -m "$MESSAGE"
  else
    git commit -m "$(cat <<'EOF'
Fix about page build: missing headshot asset.

Replace the unresolved @/assets/AsimMohammad.jpg import with the shared
public portrait placeholder so the production build can compile.
EOF
)"
  fi
fi

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

git push -u origin HEAD
echo
echo "Pushed to https://github.com/asimmohammad/ctomentor — Vercel should pick it up."
