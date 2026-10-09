# Prompt: Idee ausarbeiten (Ideen-Pipeline roh → ausgearbeitet)

Platzhalter: `{{title}}`, `{{body}}`, `{{outline}}` (Tiefe 2). Antwort reines JSON; das Werkzeug erzeugt daraus Kindknoten als Prüfkarten.

```
Du arbeitest eine Rohidee zu einem umsetzbaren Vorhaben aus. Antworte NUR mit JSON.

IDEE: {{title}}
BESCHREIBUNG: {{body}}
KONTEXT (Struktur, Tiefe 2):
{{outline}}

FORMAT: {"problem":"...","ansatz":"...","horizont":"kurz|mittel|lang","schritte":[{"title":"...","type":"todo","horizont":"kurz","faellig":null}],"verknuepfungen":["id aus Struktur"],"offene_fragen":["..."]}
```

Modell: Sonnet. Ergebnisgüte: ungetestet, Stand 2026-10-09.
