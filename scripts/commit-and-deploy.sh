#!/usr/bin/env bash
# Commit local work and push to https://github.com/asimmohammad/ctomentor
set -euo pipefail
cd "$(dirname "$0")/.."

REMOTE_URL="https://github.com/asimmohammad/ctomentor.git"

git status
git add -A
git reset HEAD -- .env .env.local .env*.local 2>/dev/null || true

if ! git diff --cached --quiet; then
  git commit -m "$(cat <<'EOF'
Ship two-tier funnel, Insights magazine, and Vigil.

Add /book (Cal.com), /engage application, /apply→/engage redirect and lib/cta.ts; rebuild Insights with article bodies, email-gated briefings, RSS, and category CTAs; ship /vigil with COI disclosure and separate vigil_leads table.
EOF
)"
else
  echo "No staged changes to commit (working tree may already be clean)."
fi

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

git remote -v
git push -u origin HEAD
echo "Done → https://github.com/asimmohammad/ctomentor"
