---
name: notizblock-handover
description: Rollende Übergabedatei docs/PROJEKT_Handover_AKTUELL.md additiv fortschreiben (Kanon vorne, datierte Nachträge), Obsolet-Liste pflegen, Folgechat-Prompt erzeugen. Auslöser: "handover", "uebergabe", "/notizblock-handover", Kontext über 75 %.
---
# notizblock-handover

## Ablauf
1. Gesamten Chat prüfen auf: Entscheidungen, Ergebnisse, Empfehlungen, Zwischenstände, offene Punkte.
2. `docs/PROJEKT_Handover_AKTUELL.md` additiv ergänzen: Kanon-Abschnitt aktualisieren (Dateien, Links, Versionen), neuen datierten Nachtrag anhängen. Kein neuer Dateiname.
3. Obsolet-Liste: ersetzte Dateien mit Grund und Nachfolger; Löschung erst nach Bestätigung.
4. `docs/BAUPLAN_AKTUELL.md` Abschnitt „Baustand“ angleichen.
5. Folgechat-Prompt als Copybox ausgeben: Repo, Branch, Dateien, Artefakt-Links, nächste Phase, offene Entscheidungen.
6. Commit, Push.
