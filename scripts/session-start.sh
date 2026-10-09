#!/usr/bin/env bash
# SessionStart-Hook: prüft die Toolchain für die Validierung der Werkzeugdatei und meldet den Stand.
cd "$(dirname "$0")/.." || exit 0
echo "Notizblock-Repo · Toolchain-Check"
command -v node >/dev/null && echo "node $(node --version)" || echo "node fehlt: Validierung nicht möglich"
if node -e "require.resolve('playwright')" >/dev/null 2>&1; then echo "playwright: vorhanden"; else
  if [ -d /opt/node-tools/node_modules/playwright ]; then echo "playwright: über NODE_PATH=/opt/node-tools/node_modules nutzbar"; else echo "playwright fehlt: npm i -D playwright (Chromium unter /opt/pw-browsers, kein playwright install nötig)"; fi; fi
[ -f notizblock/notizblock_AKTUELL.html ] && echo "Werkzeugdatei: $(wc -c < notizblock/notizblock_AKTUELL.html) Bytes" || echo "Werkzeugdatei fehlt"
echo "Validierung: node scripts/validate.mjs notizblock/notizblock_AKTUELL.html"
exit 0
