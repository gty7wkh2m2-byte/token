# USINE PLAN-DASHBOARD

Dashboard für die Pläne aus `ARTEFAKT - DESKTOP v2` (LENKI, MONEY, Rest) mit Zeitblöcken → **Google Kalender**
(claude.ai-Konnektor, taata.diawara@gmail.com; seit v1.1.0 Standard, Outlook über Zapier wählbar),
To-dos → Microsoft To Do (Outlook-Aufgaben), Ideensammlung und OneNote-Abschnitt (additiver Sync).
To Do und OneNote laufen über den Zapier-Konnektor (Konto taata@hotmail.de in Zapier verbinden).

## Dateien

| Pfad | Zweck |
|---|---|
| `plan_dashboard_v1_<JJJJ-MM-TT_HHMM>.html` | fertige Werkzeugdatei (neuester Zeitstempel = kanonisch) |
| `src/plan_dashboard.template.html` | Vorlage (HTML, CSS, JS) mit Platzhalter `/*__EMBEDDED__*/` |
| `build.py` | baut die Werkzeugdatei aus Vorlage + Quelldatei, prüft den eingebetteten JSON-Block |
| `quelle/artefakt_desktop_v2_2026-09-26_2218.html` | Quelldatei (Pläne, eingebetteter Datenblock Build 5) |

## Bauen

```
python3 -I dashboard/build.py
```

## Prüfen (Playwright, Chromium)

Syntaxprüfung des Skripts, Konsolenfehler, horizontaler Überlauf (Desktop 1380 px, Mobil 400 px),
Screenshots hell/dunkel, Interaktion (Idee, Zeitblock, To-do, Plan-Häkchen), Autosave (localStorage, 1×/s),
Persistenz nach Neuladen, Dialog öffnen/schließen. Ergebnis Erstbau: 0 Fehler, 0 px Überlauf.

## Datenhaltung

- `EMBEDDED_DATA` (Script-Block `embeddedDataScript`): Pläne (406 Positionen, wortgetreu), 65 vorbelegte Ideen
  aus den Rest-Abschnitten mit „Ideen“/„Tools“/„AI“, Einstellungen, Zapier-Verbindungslinks.
- Browser-Autosave 1×/s (`localStorage`, Schlüssel `usine_plan_dashboard_v1`).
- Artefakt-Datenbank (claude.ai), falls freigegeben: Sammlungen `ideas`, `blocks`, `todos`, `notes`,
  Dokumente `settings/main`, `plans/chk`. Geräteübergreifend; DB-Stand gilt, lokale Einträge werden einmalig hochgeladen.
- Self-Download mit Zeitstempel (Knopf „Als Datei sichern“, nur im Artefakt-Viewer), JSON-Export, Sync-Paket für den Chat.
