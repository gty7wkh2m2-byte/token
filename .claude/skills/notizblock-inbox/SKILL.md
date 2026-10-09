---
name: notizblock-inbox
description: Inbox-Exporte des Notizblocks (notizblock/inbox/*.json) in die bestehende Struktur sortieren und als Update-Paket (notizblock/pakete/) zurückgeben; Weg A5/A7. Auslöser: "/notizblock-inbox", "Inbox sortieren", Routine.
---
# notizblock-inbox

Zweck: neue Einträge ohne manuelles Kopieren einsortieren. Erwartete Ersparnis: ein Paket statt vieler Einzelvorschläge im Chat.

## Eingabe
- `notizblock/inbox/inbox_*.json`: `{"outline":"<Strukturauszug id · Titel · Typ>","eintraege":["Text 1","Text 2"]}` (Export aus dem Werkzeug, Backend › Export) oder Rohtext.
- Prompt-Vertrag: `prompts/inbox_sortierung.md`.

## Ablauf
1. Neueste Inbox-Datei lesen; bereits verarbeitete Dateien stehen in `notizblock/inbox/VERARBEITET.md`.
2. Je Eintrag nach dem Vertrag einordnen: parentId aus dem Strukturauszug, Typ, Horizont, Fälligkeit, Begründung. Unklar → `parentId: "inbox"`.
3. Update-Paket schreiben: `notizblock/pakete/inbox_JJJJ-MM-TT_HHMM.json` mit `{"paket":"inbox","nodes":[{"id":"neu-…","parentId":"…","title":"…","type":"…","horizont":"…","faellig":null,"quelle":"routine","begruendung":"…"}],"log":["JJJJ-MM-TT · n Einträge sortiert"]}`.
4. `VERARBEITET.md` ergänzen, Commit, Push. Keine Änderung an der Werkzeugdatei.
5. Bericht: Anzahl Einträge, Ziele, Unsicherheiten. Das Werkzeug liest das Paket über Backend › Import.

## Leitplanken
- Nichts erfinden; fehlende Daten leer lassen und in `begruendung` nennen.
- Vor Anlage einer Routine das Nutzungskontingent prüfen (CLAUDE.md).
