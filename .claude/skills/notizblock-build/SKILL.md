---
name: notizblock-build
description: Änderung an der Werkzeugdatei notizblock/notizblock_AKTUELL.html nach Bauauftrag, inkl. Validierung, Screenshots, Artefakt-Fragment und Rückschreibpflicht (Bauplan, Update-Paket, docs). Auslöser: "Bauauftrag", "/notizblock-build", "Werkzeug ändern".
---
# notizblock-build

Zweck: eine Änderung am Notizblock-Werkzeug vollständig und prüfbar umsetzen. Erwartete Ersparnis: keine vergessenen Pflichtschritte, keine zweite Runde wegen Validierungsfehlern.

## Ablauf
1. Bauauftrag lesen (aus dem Chat, aus `notizblock/inbox/` oder aus dem Backend-Export). Zustand der Datei prüfen: `grep -n 'TOOL_VERSION=' notizblock/notizblock_AKTUELL.html`.
2. Änderung additiv einbauen. Entferntes ausdrücklich im Changelog nennen (Backend › Changelog im Seed/`buildSeed()` und `docs/CHANGELOG.md`). Version (`TOOL_VERSION`) anheben: Patch für Korrekturen, Minor für neue Funktionen.
3. Validierung: `node scripts/validate.mjs notizblock/notizblock_AKTUELL.html` → muss „0 Fehler“ melden. Bei Fehlern beheben, erneut prüfen.
4. Screenshots: `node scripts/screenshots.mjs notizblock/notizblock_AKTUELL.html /tmp/nb-shots`, mindestens einen mobil und einen Desktop ansehen.
5. Artefakt-Fassung: `node scripts/fragment.mjs notizblock/notizblock_AKTUELL.html > /tmp/notizblock_fragment.html`, auf die bestehende Artefakt-URL veröffentlichen (Fähigkeiten `sample`, `downloads`; URL in `docs/PROJEKT_Handover_AKTUELL.md`).
6. Rückschreibpflicht: Update-Paket `notizblock/pakete/bauplan_JJJJ-MM-TT_HHMM.json` schreiben (Felder `bauplan.phasen`/`bauauftraege` mit neuem Status, `log`), `docs/BAUPLAN_AKTUELL.md` Abschnitt „Baustand“ aktualisieren, `docs/CHANGELOG.md` ergänzen.
7. Commit mit sprechender Nachricht, Push auf den Arbeits-Branch. Bericht: Kontrollblock (jede Anforderung des Bauauftrags erfüllt oder offen mit Grund), Artefakt-Link, Dateiname.

## Leitplanken
- Keine Abhängigkeiten außer Google Fonts. Keine Schlüssel in der Datei.
- Mobil zuerst, kein horizontaler Überlauf, beide Farbschemata.
- Artefakt-Fähigkeiten nur über `await window.claude.use(name)` mit `null`-Fallback.
