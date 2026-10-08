# Regeln für Claude-Sitzungen in diesem Repo

## Prüfpflicht vor Auslieferung jedes HTML-Werkzeugs
- Befehl: `npm i` (einmalig), dann `node tools/check.js <datei.html> --shots`
- Stufen: 1 JSON.parse EMBEDDED_DATA, 2 Syntax Inline-Skripte, 3 Pflichtmerkmale, 4 JSDOM-Smoke + Klicktest + Autosave, 5 Screenshots mobil/Desktop
- Ausliefern erst bei **0 FAIL**. WARN einzeln bewerten und im Ergebnis nennen.
- Skript nur ergänzen, nie Stufen entfernen (additiv-only). Änderungen im Kommentarkopf von `tools/check.js` vermerken.

## Arbeitsteilung (Qualitätsregel)
- Urteil, Architektur, Bau: Hauptmodell. Mechanische Prüfung: Skript, keine Modellzeit.
- Prüfergebnis (Kernzeilen) in der Antwort zeigen, kein Rohprotokoll.
