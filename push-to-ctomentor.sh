#!/bin/bash
set -euo pipefail
export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/opt/homebrew/bin:$PATH
cd "$(dirname "$0")"

echo "=== status ==="
git status
echo "=== remotes ==="
git remote -v
echo "=== branch ==="
git branch -vv
echo "=== log ==="
git log -3 --oneline

if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git reset HEAD -- .env .env.local 2>/dev/null || true
  if [ -n "$(git diff --cached --name-only)" ]; then
    git commit -m "$(cat <<'EOF'
Ship two-tier funnel, Insights magazine, and Vigil.

Add /book (Cal.com), /engage application, /apply→/engage redirect and lib/cta.ts; rebuild Insights with article bodies, email-gated briefings, RSS, and category CTAs; ship /vigil with COI disclosure and separate vigil_leads table.

EOF
)"
  fi
fi

DESIRED="https://github.com/asimmohammad/ctomentor.git"
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$DESIRED"
else
  git remote add origin "$DESIRED"
fi

echo "=== remotes after ==="
git remote -v
echo "=== push ==="
git push -u origin HEAD
echo "=== done ==="
git rev-parse HEAD
echo "https://github.com/asimmohammad/ctomentor"
