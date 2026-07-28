#!/usr/bin/env bash
# Rename poorly named logo assets to company slugs, then regenerate manifest.
set -euo pipefail
export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/src/assets/logo"

rename_one() {
  local from="$1" to="$2"
  if [[ -f "$from" ]]; then
    if [[ -f "$to" && "$from" != "$to" ]]; then
      rm -f "$from"
      echo "removed duplicate $from (kept $to)"
      return
    fi
    mv -f "$from" "$to"
    echo "OK: $from → $to"
  else
    echo "skip (missing): $from"
  fi
}

rename_one "Ava.png" "meetava.png"
rename_one "ava.png" "meetava.png"
rename_one "GBND.png" "global-neurodiagnostics.png"
rename_one "gbnd.png" "global-neurodiagnostics.png"
rename_one "Img_3083.png" "zappd.png"
rename_one "IMG_3083.png" "zappd.png"
rename_one "img_3083.png" "zappd.png"

echo
ls -la
cd "$ROOT"
node scripts/generate-logo-manifest.mjs
