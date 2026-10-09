# PLAN: Notizblock-Ökosystem V1 (Hierarchie, To-do, Kalender, Mindmap, Sprache, KI-Sortierung) auf Basis des gesamten Instrumentariums

**Stand:** 2026-10-09 (Plan V2, Instrumentarium integriert) | **Branch:** `claude/epic-lamport-gdityd` | **Repo:** `gty7wkh2m2-byte/token` (leer, nur README)

**Legende:** 🟢 funktioniert/empfohlen · 🟡 unter Bedingung/Option · 🔴 nicht möglich/Klärung · 🔵 neutral-kategorial · ⏳ wartet auf Bestätigung · ℹ️ Info
**Belegstufen:** VERIFIZIERT (Toolprüfung/offizielle Doku) · WAHRSCHEINLICH · UNSICHER

---

## 0. KONTEXT-COCKPIT

| Feld | Wert |
|---|---|
| **Modell-Empfehlung** | Plan/Architektur: **Fable 5.1 + Extended Thinking** (läuft). Bau V1: Sonnet 5.5 ausreichend, **kein Wechsel mitten im Chat** → aktives Modell beibehalten |
| **Token** (Schätzung) | ▓▓▓░░░░░░░ ca. 14–18 % (Grundlast + Skill-Vertrag + Inventarabfragen, davon Routinen-Liste ≈ 5 %) |
| **Turn** | 3 |
| **Handover fällig** | nein |
| **Tool-Version** | V0 = Plan V2 |
| **Notes-Check** | entfällt (keine Werkzeugdatei vorhanden) |
| **Eingeflossen** | Prompt 1+2 [U] · README.md [P] · Skill `artifact-capabilities` 0.2.75 [T] · `ListSkills`, `ListPlugins`, Zapier-Aktionsliste, `list_repos`, `list_environments`, `list_triggers` (3 Routinen), lokale Claude-Konfiguration [T] |
| **Erzeugt** | diese Plandatei (V2) |
| **Plausibilitätsbox** | „die hiesige Struktur sinnvoll nutzen“ interpretiert als: *vorhandene Konnektoren, Skills, Routinen, Repo-Mechanik und Cloud-Dienste werden zur Architekturgrundlage, nicht zur späteren Ergänzung* · „Flächen als Prompts“ interpretiert als: *jeder Knoten kann als Prompt markiert, exportiert und über Claude Code/Routine ausgeführt werden* · Prompt-1-Interpretationen aus Plan V1 bleiben |
| **Widerspruch Regel/Plan-Modus** | Präferenz „gerenderte Widgets“ ↔ Plan-Modus erlaubt nur diese Datei → Tabellen hier, **gerenderte Entscheidungs- und Architekturkarte = Phase 0** |

**Chat-Überblick:** Prompt 1 (Werkzeugwunsch) + 4 Antworten + Prompt 2 (Instrumentarium zuerst) → Ergebnis: Plan V2 → Position: Plan vor Freigabe → Ziel: Freigabe → Phase 0 (Architekturkarte + Entscheidungen + Layoutvorschauen) → Phase 1 Bau.

---

## 1. KONTEXT UND ZIEL

- **Problem:** mehrere begonnene, nicht abgeschlossene Projekte; kein Ort, der Notizen, To-dos, Termine, Struktur und die vorhandene Werkzeuglandschaft zusammenhält.
- **Ziel:** eine selbst erweiterbare HTML-Werkzeugdatei als **Kern eines Ökosystems**, das vom ersten Tag an die vorhandene Infrastruktur nutzt: Repo, Skills, Befehle, Prompts, Konnektoren, Routinen, Cloudflare, GitHub.
- **Prinzip 1:** **eine Datenstruktur, mehrere Ansichten** (Outliner, To-do, Kalender, Mindmap, Workflow).
- **Prinzip 2:** jede KI-Aktion = **Vorschlag → Prüfung → Übernahme → Protokoll**.
- **Prinzip 3:** **Instrumente sind Knoten im Tool** (Typ `instrument`), damit Workflow, Abhängigkeiten und Status aller Mittel im Tool selbst sichtbar sind.
- **Repo-Befund:** keine Konventionen, kein Code → Neubau; dein Werkzeugmuster aus POLYGLOTT/USINE (HTML-Master + `EMBEDDED_DATA` + Update-Paket JSON + `CMD_AKTUELL.md` + Validierungspipeline) wird übernommen [T: Routinen-Prompts].

---

## 2. INSTRUMENTARIUM-INVENTAR (Ist-Stand, geprüft 2026-10-09)

### 2A. Verbunden und in dieser Sitzung nutzbar

| Instrument | Befund | Rolle im Ökosystem | Belegstufe |
|---|---|---|---|
| **GitHub-Repo `token`** | einziges Repo, öffentlich, Push-Recht, Branch gesetzt | **Quelle der Wahrheit**: Werkzeugdatei, Skills, Prompts, Handover, Changelog | VERIFIZIERT |
| **Claude Code Remote** | Umgebung „Test“ (Cloud), Sitzungen/Routinen/Nachrichten per Tool | **Bau- und Automationsschicht**: Routinen (Inbox-Sortierung), Folgesitzungen aus Prompt-Flächen | VERIFIZIERT |
| **Routinen (bestehend)** | 1 aktiv: POLYGLOTT-Abgleich täglich (letzter Lauf 09.10. fehlgeschlagen: Nutzungslimit) · 2 pausiert: USINE Regel-Scan, Wohnungssuche | Muster für Notizblock-Routinen; **Alt-Projekt-Kandidaten** | VERIFIZIERT |
| **Google Calendar** | Konnektor geladen | **Kalender-Backend Option** (lesen/schreiben), Outlook-Brücke per Abonnement | VERIFIZIERT |
| **Gmail / Google Drive** | geladen | Inbox-Quelle (Mails → Knoten), Dateiablage für Exporte | VERIFIZIERT |
| **Zapier** | Apps freigeschaltet: **Microsoft Outlook (32 Aktionen, Konto nicht verbunden)**, OneDrive (verbunden: hotmail), Google Tasks, Google Sheets, Google Drive, PDF.co (ohne Konto) | **Outlook-Schreib-/Leseweg ohne Azure** nach Kontoverbindung (B4) | VERIFIZIERT |
| **Wispr Flow** | geladen | Diktat systemweit (ergänzt Web Speech), Meeting-Notizen → Inbox | VERIFIZIERT |
| **Whimsical** | geladen | Mindmap-Export/Import als Austauschformat, Diagramme für Dokumentation | VERIFIZIERT |
| **Notion** | geladen, Datenbank „Wohnungspool“ existiert | optional: Langzeitablage, Memory; **nicht** Kern | VERIFIZIERT |
| **Claude Docs** | geladen | Handover-/Spezifikationsdokumente mit Kommentaren | VERIFIZIERT |
| **Artefakt-Laufzeit** | Fähigkeiten `sample`, `db`, `downloads`, `mcp`, `artifact`, `user`, `room`, `assets`, `comments`, `files` | **Laufzeitschicht**: Claude fragen, Geräteabgleich, Konnektoraufrufe aus der Seite | VERIFIZIERT [T] |
| **Skills (eigene)** | `flugsuche`, `polyglott-abrechnung-scans` | Muster für `notizblock-*`-Skills | VERIFIZIERT |
| **Skills (Anthropic, relevant)** | `session-start-hook`, `update-config`, `skill-creator`, `artifact-design/-diagramming/-capabilities`, `dataviz`, `code-review`, `security-review`, `docs`, `deep-research` | Bau, Validierung, Hooks, Skill-Erstellung | VERIFIZIERT |
| **Plugins** | keine aktiviert | Vorschlag erst bei wiederholtem Bedarf | VERIFIZIERT |
| **Lokale Toolchain** | Node 22, npm, Python 3, git, gh, Chromium/Playwright; **kein** Wrangler | Validierungspipeline sofort möglich; Cloudflare-CLI nachinstallierbar | VERIFIZIERT |

### 2B. Vorhanden im Konto, in dieser Sitzung nicht geladen

| Instrument | Befund | Nutzung | Nächster Schritt |
|---|---|---|---|
| **Cloudflare Developer Platform** | Konnektor im Konto (in Routinen-Liste sichtbar) | Pages/Worker/KV/D1 für Phase 3 (Backend, Schlüssel, Outlook-Abgleich) | für Sitzung/Umgebung freigeben, dann Prüfung |
| **Todoist, Dropbox, Mem, Lucid, tldraw, Figma, Lovable, Context7, monday** | Konnektoren im Konto | optional; Dropbox als Ablage, Todoist als To-do-Spiegel | nur bei Bedarf |
| **DeepL, PayPal, Superhuman, TomTom, Windsor** | Autorisierung fehlt | nicht benötigt | keiner |

### 2C. Alt-Projekt-Kandidaten (aus Routinen abgeleitet, **bestätigen**)

| Projekt | Art | Stand laut Quelle | Eingliederung |
|---|---|---|---|
| **POLYGLOTT MASTER v2.41 / abrechnung_scans_v8** | HTML-Master, Update-Paket, tägliche Routine | aktiv, Routine am Nutzungslimit gescheitert | als Tool-Knoten mit Workflow + Routine-Status |
| **USINE DASHBOARDS Cockpit** | HTML-Cockpit, `CMD_AKTUELL.md`, Regel-Scan-Routine | Routine pausiert | als Tool-Knoten; Regel-Scan-Muster für Notizblock übernehmen |
| **TOKEN_Cockpit_v1** | Präferenz-/Regelwerkzeug (aus Präferenzen) | unbekannt | als Tool-Knoten; Regelupdates dorthin |
| **Wohnungssuche (Notion Wohnungspool)** | Routine + Notion-DB | pausiert | als Projekt-Knoten mit Horizont |
| **weitere** | (fehlt, bitte liefern) | | |

---

## 3. ARCHITEKTUR-EBENEN (Soll)

| Ebene | Inhalt | Instrumente | Phase |
|---|---|---|---|
| **E1 Quelle** | Werkzeugdatei, Skills, Prompts, Regeln, Handover, Changelog | GitHub-Repo `token`, Branch, Git-Historie = Versionen | 1 |
| **E2 Laufzeit** | HTML-Datei im Browser: lokal, als Artefakt, später Pages | Artefakt (`sample`, `downloads`, `db`, `mcp`), GitHub Pages (Ausweich), Cloudflare Pages (Phase 3) | 1 / 3 |
| **E3 Intelligenz** | Sortierung, Ideen-Ausarbeitung, Prompt-Flächen | A1 Copybox · A3 `sample` · A5 Claude Code · A6 `mcp`→Claude Code Remote · A7 Routine | 1 / 2 |
| **E4 Automation** | wiederkehrende Abläufe | Routinen (`create_trigger`), Zapier-Zaps, SessionStart-Hook im Repo | 2 |
| **E5 Konnektoren** | Kalender, Mail, Diktat, Ablage | Google Calendar, Gmail, Drive, Wispr Flow, Zapier→Outlook, Whimsical | 1 (Export) / 2 (Live) |
| **E6 Steuerung** | Regeln, Skills, Befehle, Modellrouting | `CLAUDE.md`, `.claude/skills/*`, `.claude/settings.json`, Präferenzen, TOKEN_Cockpit | 1 |

**Datenfluss (Kurzform):** Eingabe (Tastatur/Sprache/Mail/Wispr) → Inbox → Sortierung (lokal/KI) → Struktur → Ansichten → Export (JSON/ICS/Repo) → Automation (Routine/Zapier/Claude Code) → zurück in Struktur, alles protokolliert.

---

## 4. REPO-GRUNDGERÜST (Phase 1, wird mit V1 angelegt)

```
token/
├── CLAUDE.md                         Projektregeln: Dateinamen, Additiv-only, Validierungspflicht, Modellrouting
├── README.md                         Überblick, Links, Schnellstart
├── .claude/
│   ├── settings.json                 SessionStart-Hook: Toolchain prüfen (Node, Playwright), Validierung lauffähig
│   └── skills/
│       ├── notizblock-build/SKILL.md     Bau/Änderung der Werkzeugdatei + Validierungspipeline (/notizblock-build)
│       ├── notizblock-inbox/SKILL.md     Inbox-JSON sortieren → Vorschlags-JSON (/notizblock-inbox)
│       └── notizblock-handover/SKILL.md  Handover-Datei fortschreiben, Changelog, Obsolet-Liste (/handover)
├── notizblock/
│   ├── notizblock_AKTUELL.html       Werkzeugdatei (Kanon, Git = Versionen)
│   ├── entscheidungen_2026-10-09_HHMM.html   Phase-0-Datei (Architekturkarte, Optionen, Layoutvorschauen)
│   ├── inbox/                        exportierte Inbox-Pakete (A5-Weg)
│   └── pakete/                       Update-Pakete JSON (Rückweg, Muster POLYGLOTT)
├── prompts/
│   ├── ausbau_vorlage.md             Vorlage „Fläche als Prompt“ → Claude Code
│   ├── inbox_sortierung.md           Prompt + JSON-Vertrag für A1/A3/A5
│   └── idee_ausarbeiten.md           Prompt + JSON-Vertrag Ideen-Pipeline
├── scripts/
│   ├── validate.mjs                  JSON.parse, Syntax, JSDOM-Smoke
│   └── screenshots.mjs               Playwright mobil/desktop, hell/dunkel
└── docs/
    ├── PROJEKT_Handover_AKTUELL.md   rollende Übergabe
    └── CHANGELOG.md                  V1 → V2 …
```

- **Dateinamen-Regel (Annahme):** Repo ohne Zeitstempel (Git = Versionen); Self-Download aus dem Tool mit `notizblock_JJJJ-MM-TT_HHMM.html` (Europe/Berlin).
- **Skills** werden mit `skill-creator` nach dem Muster deiner vorhandenen Skills angelegt; Auslöser und Ersparnis je Skill in der Datei.
- **Hook** über `session-start-hook`-Skill, damit jede Cloud-Sitzung die Validierung sofort ausführen kann.

---

## 5. ENTSCHEIDUNGSSTAND

| # | Punkt | Status | Inhalt |
|---|---|---|---|
| E1 | Ablage | 🟢 entschieden | Repo + Artefakt-Link; Vergleich in 6C |
| E2 | Vorschau-Runden | 🟢 entschieden | je Element abfragen, protokollieren, Regel ableiten (Abschnitt 11) |
| E3 | KI-Anbindung | ⏳ Phase 0 | Optionen 6A visuell |
| E4 | Outlook | ⏳ Phase 0 | Optionen 6B visuell; **B4 Zapier jetzt realistischer** (Outlook-App bereits freigeschaltet) |
| E5 | Layout V1 | ⏳ Phase 0 | 6 Vorschauen |
| E6 | Instrumentarium zuerst | 🟢 entschieden | Abschnitte 2–4, Phase 0 enthält Architekturkarte |
| E7 | Alt-Projekte | ⏳ | Kandidaten 2C bestätigen/ergänzen |

---

## 6. ARCHITEKTUR-OPTIONEN (Tabellenfassung; gerendert in Phase 0)

### 6A. KI-Anbindung

| Opt | Weg | Schlüssel/Konto | Nachvollziehbarkeit | Funktioniert wo | Belegstufe | Bewertung |
|---|---|---|---|---|---|---|
| **A1 Prompt-Copybox** | Tool baut Prompt (Strukturauszug + Eingabe + JSON-Vertrag) → Claude → JSON zurück | keiner | 🟢 maximal | überall | VERIFIZIERT | 🟢 **Basisschicht** |
| **A2 API-Schlüssel direkt** | Browser → Anthropic-API | API-Schlüssel, nur Sitzungsspeicher | 🟡 | lokal + gehostet | WAHRSCHEINLICH | 🟡 Option |
| **A3 Artefakt `sample`** | Seite fragt Claude | claude.ai-Konto | 🟡 | nur Artefakt | VERIFIZIERT [T] | 🟢 **Komfortweg** |
| **A4 Cloudflare Worker** | Worker hält Schlüssel, optional D1/KV | Cloudflare-Konnektor (vorhanden, nicht geladen) | 🟡 | gehostet | WAHRSCHEINLICH | 🟡 Phase 3 |
| **A5 Claude Code über Repo** | Inbox/Prompt-Fläche → Repo → Claude-Code-Sitzung → Commit | GitHub (vorhanden) | 🟢 Git | überall | VERIFIZIERT | 🟢 **Ausbau-Standard** |
| **A6 Artefakt `mcp` → Claude Code Remote** | Seite startet Sitzung mit Prompt-Fläche | claude.ai-Konto | 🟢 | nur Artefakt | WAHRSCHEINLICH | 🟡 Phase 2 |
| **A7 Routine** | zeitgesteuerte Inbox-Sortierung (Muster POLYGLOTT) | wie A5 | 🟢 | überall | VERIFIZIERT (3 Routinen existieren) | 🟡 Phase 2; **Nutzungslimit beachten** (POLYGLOTT-Lauf 09.10. daran gescheitert) |

**Empfehlung aus Sachlage:** A1 + A3 + A5 in V1; A2 abschaltbar; A6/A7 Phase 2; A4 Phase 3. **Aus Verhalten:** automatisch > manuell → A3/A6 bevorzugen, A1 Sicherheitsnetz.

### 6B. Outlook-Kalender

| Opt | Weg | Voraussetzung | Lesen | Schreiben | Automatisch | Belegstufe | Bewertung |
|---|---|---|---|---|---|---|---|
| **B1 ICS-Datei** | Export/Import manuell | keine | 🟢 | 🟢 | 🔴 | VERIFIZIERT | 🟢 V1-Basis |
| **B2 Veröffentlichte ICS-URL** | Tool liest Outlook-URL | URL | 🟡 | 🔴 | 🟢 | UNSICHER (CORS) | 🟡 V1-Versuch |
| **B3 Microsoft Graph + MSAL** | Anmeldung im Tool | Azure-App, https-Ursprung | 🟢 | 🟢 | 🟢 | WAHRSCHEINLICH, Artefakt UNSICHER | 🟡 Phase 2 (C3/C4) |
| **B4 Zapier → Outlook** | Tool/Artefakt-`mcp`/Claude → Zapier-Aktion | **Outlook-Konto in Zapier verbinden (App bereits freigeschaltet)** | 🟢 | 🟢 | 🟢 | VERIFIZIERT (App) / Aktionen ungetestet | 🟢 **Phase 1b: schnellster Live-Weg** |
| **B5 Microsoft-365-Konnektor** | Artefakt-`mcp` | Konnektor verfügbar? | 🟡 | 🟡 | 🟢 | UNSICHER | 🟡 prüfen |
| **B6 Google Calendar als Brücke** | Tool ↔ Google-Konnektor; Outlook abonniert Google | Abonnement in Outlook | 🟢 | 🟢 | 🟢 | VERIFIZIERT (Konnektor) | 🟡 Alternative, wenn Google ohnehin genutzt |
| **B7 Cloudflare Worker + Graph** | serverseitiger Abgleich | Azure + Cloudflare | 🟢 | 🟢 | 🟢 | WAHRSCHEINLICH | 🟡 Phase 3 |

**Empfehlung aus Sachlage:** V1 = B1 + B2-Versuch; **Phase 1b = B4** (ein Schritt durch dich: Outlook-Konto in Zapier verbinden); Phase 2 = B3 oder B7. Offen: Outlook-Kontotyp (hotmail laut OneDrive-Verbindung → privat → Azure-Registrierung selbst möglich, WAHRSCHEINLICH).

### 6C. Ablage / Hosting (E1 entschieden: C2)

| Opt | Struktur | https | Geräteabgleich | Mikrofon | KI direkt | B3 möglich | Belegstufe | Bewertung |
|---|---|---|---|---|---|---|---|---|
| **C1 Nur Repo, lokal** | `file://` | 🔴 | 🔴 | 🟢 | 🔴 | 🔴 | VERIFIZIERT | 🔵 Sicherheitsnetz |
| **C2 Repo + Artefakt** | Repo = Quelle, Artefakt = Laufzeit | 🟢 | 🟡 `db` Phase 2 | 🟡 UNSICHER | 🟢 A3 | 🟡 UNSICHER | VERIFIZIERT [T] | 🟢 **gewählt** |
| **C3 GitHub Pages** | Branch → statische Seite | 🟢 | 🔴 | 🟢 | 🔴 | 🟢 | VERIFIZIERT | 🟡 Ausweich für B3/Mikrofon |
| **C4 Cloudflare Pages + Worker + D1/KV** | Seite + Backend | 🟢 | 🟢 | 🟢 | 🟢 A4 | 🟢 | WAHRSCHEINLICH, Konnektor vorhanden | 🟡 Phase 3 |
| **C5 Notion** | Konnektor | 🟢 | 🟢 | 🟡 | 🟡 | 🔴 | VERIFIZIERT | 🔴 abgelehnt für Kern |
| **C6 PWA-Zusatz** | Manifest + Service Worker auf C2/C3/C4 | 🟢 | wie Basis | wie Basis | wie Basis | wie Basis | VERIFIZIERT | 🟡 Phase 2 |

---

## 7. PHASENPLAN

| Phase | Inhalt | Ergebnis | Gate |
|---|---|---|---|
| **0 Entscheidung** | gerenderte Datei: **(1) Architekturkarte** (Ebenen E1–E6 als SVG mit Ist/Soll-Status je Instrument, Abschnitt 2–3), **(2) Optionsmatrizen 6A–6C** als Kartenreihen mit Datenfluss-Diagrammen, **(3) 6 Layout-Vorschauen**, **(4) Alt-Projekt-Kandidaten** zum Bestätigen; Auswahl → Entscheidungs-JSON als Copybox | `notizblock/entscheidungen_2026-10-09_HHMM.html` | ⏳ deine Wahl E3/E4/E5/E7 |
| **1 Bau V1 + Repo-Gerüst** | Werkzeugdatei (Abschnitt 8–9) + Grundgerüst (Abschnitt 4: CLAUDE.md, Skills, Hook, Prompts, Scripts, Handover) | Dateien im Repo | – |
| **1b Outlook-Schnellweg** | falls B4 gewählt: Anleitung als Schrittkarten (Outlook-Konto in Zapier verbinden) → Aktionsprüfung → Tool-Knopf „Termin nach Outlook“ | Zapier-Aktion verifiziert | ⏳ dein Zapier-Schritt |
| **2 Validierung** | Abschnitt 10 | 0 Fehler, Screenshots | – |
| **3 Auslieferung** | Commit + Push, Artefakt-Publish (`sample`, `downloads`; `mcp` nur bei B4/A6), Link | Link + Datei | – |
| **4 Ausbau** (Folgechats) | Routine Inbox (A7), `db`-Abgleich, A6, PWA, B3/B7, Cloudflare (C4), Alt-Projekte eingliedern | V2, V3 … | je Element Vorschau-Abfrage |

---

## 8. SPEZIFIKATION V1

### 8.1 Datenmodell (eine Struktur, alle Ansichten)

- **Knoten**: `id`, `parentId`, `order`, `title`, `body`, `type` ∈ {`bereich`, `notiz`, `todo`, `idee`, `projekt`, `prompt`, `termin`, `tool`, **`instrument`**}, `horizont` ∈ {`kurz`, `mittel`, `lang`, `keiner`}, `status` ∈ {`offen`, `aktiv`, `wartet`, `erledigt`, `verworfen`}, `faellig`, `start`/`ende`, `tags[]`, `links[]`, `quelle` (`manuell` | `ki-vorschlag` | `ics` | `seed` | `routine` | `zapier`), `erstellt`, `geaendert`.
- **Ideen-Pipeline** (`stufe`): `roh → ausgearbeitet → geplant → umsetzung → integriert`.
- **Tool-Knoten** (`type=tool`): `workflow[]` (Schritte mit Status), `version`, `repoPfad`, `routineId`; Notizblock selbst = Tool Nr. 1.
- **Instrument-Knoten** (`type=instrument`): `kategorie` (Repo/Skill/Befehl/Prompt/Plugin/Konnektor/Routine/Cloud), `status` (verbunden/vorhanden/fehlt), `nutzung[]` (Verweise auf Tool-Knoten), `naechsterSchritt` → speist Architekturkarte im Tool (Abschnitt 2 als lebende Daten).
- **Protokoll** (`log[]`): Zeit, Aktion, Prompt-Kurzfassung, Vorschlag, Entscheidung, Knoten-IDs, Instrument.
- **Einstellungen**: Layout, Fristen-Farben, KI-Weg, ICS-URL, Zapier-Aktion, Sprache.
- **Version**: `schema`, `toolVersion`, `changelog[]`.

### 8.2 Ansichten

| Ansicht | Funktion | Instrument-Bezug |
|---|---|---|
| **Outliner** | Baum, Drag-and-drop, Inline-Bearbeitung, Pillen Typ/Horizont/Status | – |
| **To-do** | Filter, Gruppierung Horizont/Bereich, Fälligkeit | Todoist-Spiegel optional |
| **Kalender** | Monat/Woche/Tag, Termine + fällige To-dos, ICS-Import/-Export, ICS-URL | B1/B2 V1, B4 Phase 1b, Google Calendar Phase 2 |
| **Mindmap global** | eigenes SVG-Radiallayout, Zoom/Pan, Farbe = Horizont, Form = Typ | Whimsical-Export (Markdown-Gliederung) |
| **Mindmap Fokus** | Klick → Knoten als hervorgehobenes Zentrum, Teilbaum + Brotkrumen, „Gesamt“-Knopf | – |
| **Ideen** | Kanban nach Stufe, „Ausarbeiten“ → KI-Vorschlag → Prüfkarte → Kindknoten | A1/A3 |
| **Workflow** | Pipeline je Tool-Knoten + Gesamtfluss (Abschnitt 3 Datenfluss) | Routine-Status (letzter Lauf) als Pille |
| **Instrumente** (**neu**) | Architekturkarte E1–E6 aus Instrument-Knoten: Status-Ampel, Nutzung, nächster Schritt, Freischalt-Anleitung als Schrittkarten | Abschnitt 2 lebend |
| **Ausbau** | Prompt-Flächen: „Als Prompt exportieren“ (vollständiger Claude-Code-Prompt mit Zustand, Pfad, Branch, Validierungsregeln) → Copybox; Phase 2: direkt per A6 | A5/A6, `prompts/ausbau_vorlage.md` |
| **Protokoll** | KI-Vorschläge Vorher/Nachher, Rückgängig | – |

### 8.3 Eingabefeld mit Auto-Sortierung

- Schwebend, überall, Tastatur + Mikrofon.
- **Lokal**: Präfixe (`todo:`, `idee:`, `termin:`, `#Bereich`, `!kurz/!mittel/!lang`), Datumsausdrücke, Titelabgleich → Vorschlagskarte.
- **KI** (A1/A3/A5): Prompt aus `prompts/inbox_sortierung.md` + Strukturauszug (Tiefe 3) → JSON `{parentId, type, horizont, faellig, title, body, begruendung}` → Vorschlagskarte mit Begründung → Übernehmen/Ändern/Verwerfen → Protokoll.
- **Quellen Phase 2**: Gmail (markierte Mails), Wispr-Flow-Notizen, Routine-Paket.

### 8.4 Sprachsteuerung

- Web Speech API `de-DE`, kontinuierlich, in jedem Feld + global; Sprachbefehle („neuer Punkt“, „erledigt“, „Unterpunkt“).
- Chrome/Edge/Safari 🟢, Firefox 🔴 (Hinweis im Tool). Wispr Flow systemweit unabhängig davon.
- Artefakt-Iframe: Mikrofon UNSICHER → Phase-2-Test, Fallback C3.

### 8.5 Fristen

- kurz/mittel/lang/keiner, Farbe konsistent in allen Ansichten (Vorschlag in Vorschau), Status-Ampel getrennt, Legende überall.

### 8.6 Startinhalt (Seed)

- **„Gründungsnotiz“**: Prompt 1 + Prompt 2 wortgetreu (`quelle: seed`).
- **„Instrumente“**: alle Zeilen aus Abschnitt 2A–2B als Instrument-Knoten mit Status.
- **„Ideen“** (roh): Outlook via Zapier · Routine Inbox · `db`-Abgleich · PWA · A6 Prompt-Fläche direkt · Cloudflare-Backend · Gmail→Inbox · Wispr→Inbox · Whimsical-Export · Alt-Projekte eingliedern.
- **„Alt-Projekte“**: Kandidaten 2C als Projekt-Knoten `status: wartet` + Vorlage je Projekt.
- **Tool-Knoten „Notizblock“** mit Workflow: Plan ✅ → Entscheidung → Bau → Validierung → Auslieferung → Phase 2 …; Changelog V1.
- **Prompt-Fläche „Ausbau-Vorlage“**.

---

## 9. TECHNISCHE LEITPLANKEN

- Eine HTML-Datei, alles inline, keine externen Abhängigkeiten (eigenes SVG-Radiallayout, eigenes Kalender-Grid, eigener ICS-Parser).
- `EMBEDDED_DATA` + `localStorage`-Autosave 1×/s + Self-Download mit Zeitstempel + JSON-Export/-Import + **Update-Paket-Import** (Muster POLYGLOTT, für Routine-Rückweg) + Herkunftsanzeige + Versionierung, kein Passwort.
- Artefakt-Erkennung über `await claude.use(...)`, bei `null` lokaler Modus [T: Vertrag 0.2.75].
- Mobil zuerst, Farb-Tokens, Dunkelmodus, additiv-only, Rückgängig je Protokolleintrag.
- API-Schlüssel (A2) nur `sessionStorage`.

---

## 10. VALIDIERUNG (vor Auslieferung, als `scripts/validate.mjs` + `scripts/screenshots.mjs` im Repo, per Skill `/notizblock-build` aufrufbar)

1. `JSON.parse` `EMBEDDED_DATA` + Export-JSON + Seed-Paket → 0 Fehler.
2. `node --check` auf extrahiertem Skript → 0 Fehler.
3. JSDOM-Smoke: alle Tabs, Knoten anlegen/verschieben/löschen, Ideen-Stufe, ICS-Import Testdatei, Mindmap Fokus/Gesamt, Heuristik 5 Testeingaben, Update-Paket-Import → 0 Konsolenfehler.
4. Playwright: Screenshots mobil 390×844 + Desktop 1440×900, hell/dunkel, je Ansicht; Interaktionstest Eingabe → Vorschlag → Übernahme; Autosave (Änderung → Neuladen); Self-Download.
5. Sprache: API-Vorhandensein geprüft, Erkennung manuell durch dich → offener Punkt.
6. Artefakt: `sample`-Pfad einmal manuell (Konsent), bei B4 eine Zapier-Leseaktion vor der ersten Schreibaktion.
7. Repo: `code-review`-Skill auf dem Diff vor Push.

---

## 11. HINWEISE (Annahmen, Lücken, Kosten)

- **Lücke:** Alt-Projekte bestätigen/ergänzen (2C).
- **Lücke:** Outlook-Kontotyp (Indiz hotmail → privat, WAHRSCHEINLICH).
- **Annahme:** Repo-Dateien ohne Zeitstempel (Abschnitt 4).
- **UNSICHER:** Mikrofon und B2-CORS im Artefakt; Zapier-Outlook-Aktionen bis zur Kontoverbindung ungetestet.
- **Nutzungslimit:** POLYGLOTT-Routine scheiterte heute daran → neue Routinen (A7) erst nach Prüfung des Wochenkontingents; Kosten je Lauf in Routine-Knoten festhalten.
- **Kostenfolge:** Phase 0 ≈ 3–4 % Kontext; Phase 1+2 ≈ 10–14 % (Werkzeugdatei + Gerüst + Validierung); Übergabe bei > 75 %.
- **Nicht in V1:** B3, `db`, A6, PWA, Cloudflare, Gmail/Wispr-Inbox → Phase 4.
- **Regelupdate Vorschau** (Abschnitt 12) betrifft Präferenzen, nicht dieses Repo.

---

## 12. REGELUPDATE (Vorschlag, Einfügeort: Präferenzen › 4. Entscheidungen › „Vorschauen“)

> **Vorschau-Runde je Element abfragen:** vor jedem neuen Element O1 Vorschau-Runde / O2 direkt bauen anbieten; Wahl im Tool-Protokoll festhalten; nach **3 gleichen Entscheidungen** feste Regel vorschlagen.

> **Instrumentarium zuerst:** bei jedem neuen Werkzeugprojekt zuerst Bestand erheben (Repos, Skills, Befehle, Prompts, Plugins, Konnektoren, Routinen, Cloud) und als Instrument-Knoten im Werkzeug führen; Bau erst nach Zuordnung der Instrumente zu Ebenen.

---

## 13. KONTROLLBLOCK (Prompt-Anforderungen → Plan-Abdeckung)

| # | Anforderung | Abdeckung | Status |
|---|---|---|---|
| 1 | Hierarchien | 8.1, Outliner | 🟢 |
| 2 | To-do-Listen | 8.2 | 🟢 |
| 3 | Kalender | 8.2 | 🟢 |
| 4 | Sprachsteuerung überall | 8.4 | 🟢, Artefakt-Mikrofon 🟡 |
| 5 | Eingabefeld Auto-Sortierung | 8.3 | 🟢 |
| 6 | Mindmap gesamt | 8.2 | 🟢 |
| 7 | Fokus-Mindmaps hervorgehoben | 8.2 | 🟢 |
| 8 | Prompt als Notiz im Tool | 8.6 | 🟢 |
| 9 | Ideenbereich KI-gestützt, nachvollziehbar | 8.2, 8.1 Protokoll | 🟢 |
| 10 | Alt-Projekte, Ökosystem | 2C, 8.6, Phase 4 | 🟡 bestätigen |
| 11 | Kurz/Mittel/Lang visuell | 8.5 | 🟢 |
| 12 | Kalender ↔ To-do ↔ Mindmap | 8.1 | 🟢 |
| 13 | Outlook im Hintergrund | 6B, Phase 1b B4 | 🟡 Entscheidung Phase 0 + Zapier-Schritt |
| 14 | Tool im Tool ausbauen, Flächen als Prompts | 8.2 Ausbau, A5/A6, `prompts/` | 🟢 |
| 15 | Workflow sichtbar für Tool und geplante Tools | 8.2 Workflow, Tool-Knoten | 🟢 |
| 16 | Optionen visuell (KI/Outlook/Ablage) | Phase 0 | 🟢 geplant |
| 17 | Vorschau je Element entscheiden | E2, 12 | 🟢 |
| 18 | Repo + Artefakt | Phase 3 | 🟢 |
| **19** | **Hiesige Struktur von Anfang an nutzen: Repos, Skills, Befehle, Prompts, Plugins, Konnektoren, Cloudflare, GitHub** | **2 Inventar, 3 Ebenen, 4 Repo-Gerüst, 8.2 Instrumente-Ansicht, 8.1 Instrument-Knoten, Phase 0 Architekturkarte** | 🟢 |

**Nächster Schritt:** Freigabe → Phase 0 (Architekturkarte + Optionen + Layoutvorschauen + Alt-Projekt-Bestätigung als eine gerenderte Datei) → deine Wahl → Phase 1.

---

# NACHTRAG V3 · 2026-10-09 · Baustand, Freigabe-Verlauf, Backend-Fenster

## 14. BAUSTAND (was gebaut wurde, was nicht)

| Schritt | Status | Beleg |
|---|---|---|
| Plan V1 → V2 (Plan-Modus) | 🟢 abgeschlossen | diese Datei, Abschnitte 0–13 |
| **Freigabe des Plans** | 🟢 erteilt | Klick „Plan genehmigen“ im Plan-Modus (Harness-Meldung „User has approved your plan“) |
| **Phase 0: Entscheidungsdatei** | 🟢 abgeschlossen | `notizblock/entscheidungen_2026-10-09_2236.html`, Commit 6e93c24, Artefakt https://claude.ai/artifact/2ukztfz9d5rYBVs5F9VqRe |
| Phase 1: Bau V1 (Werkzeugdatei + Repo-Gerüst) | 🔴 **nicht begonnen** | wartet auf Entscheidungs-JSON oder „go“ |
| Phase 1b, 2, 3, 4 | 🔴 nicht begonnen | – |

**Interpretation der Freigabe:** Die Plan-Genehmigung deckte den Plan als Ganzes; der Plan selbst setzt nach Phase 0 ein **Gate** (deine Wahl der Optionen). Gebaut wurde deshalb nur die Entscheidungsdatei, kein Teil des Notizblocks.

## 15. FREIGABE-VERLAUF (wo gedrückt wurde, welche Optionen standen)

| Zeitpunkt | Deine Handlung | Optionen | Deine Wahl |
|---|---|---|---|
| Turn 1 | Prompt: Notizblock-Wunsch | – | – |
| Turn 1, Rückfrage 1 | KI-Anbindung | O1 Copybox · O2 API-Schlüssel · O3 beides | „visuell alle nebeneinander + Alternativen“ |
| Turn 1, Rückfrage 2 | Outlook | O1 ICS · O2 Graph · O3 gestuft | „gleiche Antwort“ |
| Turn 1, Rückfrage 3 | Vorschau-Runde | O1 Vorschau zuerst · O2 direkt bauen | „jedes Mal entscheiden, später festlegen“ |
| Turn 1, Rückfrage 4 | Ablage | O1 nur Repo · O2 Repo + Artefakt | O2 + visueller Vergleich |
| Turn 3 | Prompt: Instrumentarium zuerst | – | eingearbeitet (Abschnitte 2–4) |
| Turn 3 | **Plan genehmigen** (Plan-Modus-Dialog) | genehmigen · ablehnen · ändern | genehmigt |
| Turn 4 | – | Phase-0-Datei mit A1–A7, B1–B7, C1–C6, L1–L6, F1–F3, M1–M2, E1–E3 | **offen** (JSON noch nicht eingefügt) |

## 16. NEUE ANFORDERUNG 20: BACKEND-FENSTER (Bauplan live im Tool, bearbeitbar)

### 16.1 Ziel
- Der Bauplan (diese Datei) ist **im Tool selbst** sichtbar, aktuell und bearbeitbar, in einer eigenen Ansicht **„Backend“**.
- Änderungen im Backend werden zu Bauaufträgen (Prompt-Flächen) und fließen über Claude Code zurück ins Repo.

### 16.2 Eine-Quelle-Regel: Optionen

| Opt | Quelle der Wahrheit | Fluss | Vorteil | Nachteil | Bewertung |
|---|---|---|---|---|---|
| **O1 Repo-Markdown kanonisch** | `docs/BAUPLAN_AKTUELL.md` | Tool liest Markdown ein (Import), zeigt an, Notizen nur lokal | einfach, Git-Historie | Bearbeitung nicht im Tool | 🟡 |
| **O2 Tool kanonisch** | Backend-Ansicht im Tool (`EMBEDDED_DATA.bauplan`) | Tool exportiert Markdown → Repo (Commit durch Claude Code bei jedem Phasenabschluss) | Bearbeitung dort, wo gearbeitet wird; Versionierung je Änderung im Protokoll | Repo-Datei kann kurzzeitig hinterherhinken | 🟢 **Empfehlung aus Sachlage** |
| **O3 beidseitig** | beide, mit Abgleich über Update-Paket | Tool ↔ Repo, Konflikte manuell | flexibel | Doppelpflege, Konfliktrisiko | 🔴 widerspricht Eine-Quelle-Regel |

**Empfehlung:** O2. Repo-Markdown bleibt als **versionierter Spiegel**, den Claude Code bei jedem Phasenabschluss aus dem Tool-Export schreibt. **Aus Verhalten:** mehr Sichtbarkeit > weniger, automatisch > manuell.

### 16.3 Spezifikation Backend-Ansicht (V1)

| Bereich | Inhalt | Bearbeitung |
|---|---|---|
| **Bauplan** | Phasen 0–4 als Schrittkarten mit Status (grün/gelb/rot), je Phase Inhalt, Ergebnis, Gate | Status umschalten, Text inline bearbeiten, Phase hinzufügen |
| **Entscheidungen** | E1–E7 + Phase-0-Wahl (JSON aus der Entscheidungsdatei importierbar) | Wert ändern = neuer Protokolleintrag mit Vorher/Nachher |
| **Anforderungen (Kontrollblock)** | Nr. 1–20 mit Status und Verweis auf Abschnitt | abhaken, ergänzen |
| **Offene Punkte / Lücken** | Abschnitt 11 als Liste | erledigen, ergänzen |
| **Bauaufträge (Prompt-Flächen)** | jede Änderung kann als Bauauftrag markiert werden → Knopf **„Als Bauauftrag exportieren“** erzeugt vollständigen Claude-Code-Prompt (Zustand, Datei, Branch, Änderung, Validierungsregeln, Rückschreibpflicht in den Bauplan) als Copybox | Phase 2: direkt per A6 starten |
| **Protokoll** | jede Backend-Änderung: Zeit, Feld, Vorher, Nachher, Quelle (manuell / Claude Code) | Rückgängig je Eintrag |
| **Export / Import** | Markdown-Export (`BAUPLAN_AKTUELL.md`, Copybox + Download), JSON-Export; Import von Markdown (Repo-Stand) und Update-Paket (Claude-Code-Rückweg) | – |
| **Regeln** | Spiegel von `CLAUDE.md` (Dateinamen, Additiv-only, Validierungspflicht) | Änderung = Bauauftrag |

### 16.4 Rückschreibpflicht für Claude Code (in `CLAUDE.md` und Skill `notizblock-build`)
- Jeder Bauauftrag endet mit: Bauplan-Status im Tool aktualisieren (Update-Paket `pakete/bauplan_JJJJ-MM-TT_HHMM.json`) **und** `docs/BAUPLAN_AKTUELL.md` neu exportieren.
- Kein Phasenabschluss ohne Eintrag im Backend-Protokoll.

### 16.5 Auswirkung auf Phase 1
- Ansicht **Backend** wird in 8.2 ergänzt (neunte Ansicht wird zehnte).
- Seed enthält diesen Bauplan vollständig (Abschnitte 0–16) als strukturierte Daten, nicht nur als Text.
- Kontrollblock Zeile 20: **Backend-Fenster mit Bauplan, bearbeitbar** → 🟡 Phase 1.

**Nächster Schritt:** Entscheidungs-JSON aus der Phase-0-Datei im Chat einfügen **oder** „go“ (Bau nach Empfehlung) → Phase 1 beginnt, inkl. Backend-Ansicht.
