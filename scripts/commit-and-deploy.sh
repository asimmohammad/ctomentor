#!/usr/bin/env bash
# Commit outstanding work and push to GitHub (triggers the Vercel deploy).
set -euo pipefail
cd "$(dirname "$0")/.."

REMOTE_URL="https://github.com/asimmohammad/ctomentor.git"

git add -A
git reset -q HEAD -- .env .env.local .env.production.local 2>/dev/null || true

if git diff --cached --quiet; then
  echo "Nothing to commit."
else
  git commit -m "$(cat <<'EOF'
Fix next.config for the Next 14 build.

serverExternalPackages is Next 15+, so Vercel rejected the config. Move the
@react-pdf/renderer exclusion to experimental.serverComponentsExternalPackages
and drop swcMinify, which is already the default.
EOF
)"
fi

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

git push -u origin HEAD
echo
echo "Pushed to https://github.com/asimmohammad/ctomentor — Vercel should pick it up."
