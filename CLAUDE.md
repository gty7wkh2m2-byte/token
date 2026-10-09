# CLAUDE.md · Repo `token` · Notizblock-Ökosystem

Projektregeln für jede Claude-Code-Sitzung in diesem Repository. Stand 2026-10-09, V1.

## Zweck
- Kern: `notizblock/notizblock_AKTUELL.html` (eine HTML-Datei, Werkzeug mit zehn Ansichten und Backend).
- Bauplan: im Backend des Werkzeugs (kanonisch, Entscheidung E12 O2); `docs/BAUPLAN_AKTUELL.md` ist der versionierte Spiegel.
- Entscheidungsdatei Phase 0: `notizblock/entscheidungen_2026-10-09_2236.html` (bearbeitbar, Artefakt).

## Regeln für die Werkzeugdatei
- Eine Datei, alles inline. Keine externen Abhängigkeiten außer Google Fonts (CSS-Link).
- Pflichtbausteine: `EMBEDDED_DATA`-Block, `localStorage`-Autosave (1 s), Self-Download mit Zeitstempel, JSON-Export/-Import, Update-Paket-Import, Herkunftsanzeige, Changelog im Backend.
- Additiv-only: nichts still entfernen. Entferntes im Changelog (Backend › Changelog und `docs/CHANGELOG.md`) nennen.
- Farben als Tokens auf `:root`, Dunkelmodus über `prefers-color-scheme` und `data-theme`. Mobil zuerst, kein horizontaler Seitenüberlauf.
- Artefakt-Fähigkeiten nur über `await window.claude.use(name)`; bei `null` lokaler Modus.

## Dateinamen
- Repo: ohne Zeitstempel (`notizblock_AKTUELL.html`), Git-Historie = Versionen.
- Downloads aus dem Werkzeug: `notizblock_JJJJ-MM-TT_HHMM.html` (Europe/Berlin).
- Pakete: `notizblock/pakete/bauplan_JJJJ-MM-TT_HHMM.json`, Inbox-Exporte: `notizblock/inbox/inbox_JJJJ-MM-TT_HHMM.json`.

## Validierungspflicht (vor jedem Commit der Werkzeugdatei)
1. `node scripts/validate.mjs notizblock/notizblock_AKTUELL.html` → 0 Fehler, kein Überlauf, alle Ansichten rendern.
2. `node scripts/screenshots.mjs notizblock/notizblock_AKTUELL.html` → mobil + Desktop, hell + dunkel.
3. Artefakt-Fassung erzeugen: `node scripts/fragment.mjs notizblock/notizblock_AKTUELL.html > /tmp/notizblock_fragment.html` und diese Datei auf die bestehende Artefakt-URL veröffentlichen (Fähigkeiten: `sample`, `downloads`).

## Rückschreibpflicht
- Jeder Bauauftrag endet mit: Bauplan-Status im Werkzeug (Backend › Bauplan) aktualisiert, Update-Paket in `notizblock/pakete/` abgelegt, `docs/BAUPLAN_AKTUELL.md` aus dem Backend-Export neu geschrieben, Changelog-Eintrag, kurzer Bericht mit Kontrollblock.

## Modellrouting
- Architektur, Entscheidungen, Code-Review: Fable 5.1 / Opus + Extended Thinking.
- Bau und iterative Änderungen: Sonnet.
- Dokumentation: Haiku.
- Kein Modellwechsel mitten in einem Chat.

## Skills in diesem Repo
- `/notizblock-build`: Änderung an der Werkzeugdatei inkl. Validierung, Fragment, Rückschreibpflicht.
- `/notizblock-inbox`: `notizblock/inbox/*.json` sortieren → Update-Paket.
- `/notizblock-handover`: `docs/PROJEKT_Handover_AKTUELL.md` additiv fortschreiben.

## Nicht tun
- Keine Parallel-Dateien zur Werkzeugdatei; Master erweitern.
- Keine Passwörter oder Schlüssel ins Repo.
- Keine Routinen anlegen, ohne das Nutzungskontingent zu prüfen (POLYGLOTT-Lauf 2026-10-09 scheiterte am Limit).
