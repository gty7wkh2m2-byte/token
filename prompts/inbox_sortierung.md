# Prompt: Inbox-Sortierung (Vertrag für A1 Copybox, A3 Artefakt, A5 Claude Code, A7 Routine)

Verwendung: Platzhalter `{{outline}}` (Strukturauszug id · Titel · Typ, Tiefe 3) und `{{input}}` (neue Einträge) füllen. Antwort ist reines JSON.

```
Du sortierst neue Einträge in eine bestehende Notizstruktur. Antworte NUR mit JSON (keine Erklärung außerhalb).

STRUKTUR (id · Titel · Typ, max. Tiefe 3):
{{outline}}

EINGABE:
{{input}}

REGELN: Je Eintrag ein Objekt. parentId muss eine id aus der Struktur sein (oder "inbox" wenn unklar). type aus: notiz, todo, idee, termin, projekt, prompt. horizont aus: kurz (bis 2 Wochen), mittel (bis 3 Monate), lang (länger), keiner. faellig als JJJJ-MM-TT oder null. begruendung: ein Satz, warum dieses Ziel.

FORMAT: {"vorschlaege":[{"title":"...","body":"...","type":"todo","parentId":"...","horizont":"kurz","faellig":null,"begruendung":"..."}]}
```

Modell: Sonnet (Routine), Haiku ausreichend bei kurzen Eingaben. Ergebnisgüte: ungetestet, Stand 2026-10-09.
