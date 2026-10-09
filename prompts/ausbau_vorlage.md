# Prompt: Ausbau-Vorlage (Prompt-Fläche → Bauauftrag für Claude Code)

Das Werkzeug füllt `{{version}}`, `{{stand}}`, `{{zustand}}`, `{{id}}`, `{{titel}}`, `{{text}}` automatisch (Ausbau › „Als Bauauftrag exportieren“). Einfügeort: neue Claude-Code-Sitzung auf Repo `gty7wkh2m2-byte/token`, Branch `claude/epic-lamport-gdityd`.

```
Du arbeitest im Repository gty7wkh2m2-byte/token auf Branch claude/epic-lamport-gdityd an der Werkzeugdatei notizblock/notizblock_AKTUELL.html (Version {{version}}, Stand {{stand}}).

REGELN (CLAUDE.md): eine HTML-Datei, alles inline, keine externen Abhängigkeiten außer Google Fonts; EMBEDDED_DATA-Block, localStorage-Autosave, Self-Download, JSON-Export; additiv-only (Entferntes im Changelog listen); Validierung vor Auslieferung: node scripts/validate.mjs → 0 Fehler, Screenshots mobil und Desktop; danach Commit + Push + Artefakt-Republish; Rückschreibpflicht: Bauplan-Status im Backend aktualisieren (Update-Paket notizblock/pakete/bauplan_JJJJ-MM-TT_HHMM.json) und docs/BAUPLAN_AKTUELL.md exportieren.

ZUSTAND DES WERKZEUGS: {{zustand}}

BAUAUFTRAG ({{id}} · {{titel}}):
{{text}}

ERGEBNIS: geänderte Datei, Changelog-Eintrag, Update-Paket, kurzer Bericht mit Kontrollblock (jede Anforderung erfüllt oder offen mit Grund).
```

Modell: Sonnet für Bau, Fable/Opus bei Architekturänderungen. Skill: `/notizblock-build`.
