#!/usr/bin/env python3
"""Baut das USINE PLAN-DASHBOARD aus Vorlage + Quelldatei (ARTEFAKT - DESKTOP v2).

Aufruf:  python3 -I dashboard/build.py [--stamp JJJJ-MM-TT_HHMM]
Ergebnis: dashboard/plan_dashboard_v1_<stamp>.html  (neuester Zeitstempel = kanonisch)
"""
import json, re, sys, os, datetime, zoneinfo

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'quelle', 'artefakt_desktop_v2_2026-09-26_2218.html')
TPL = os.path.join(HERE, 'src', 'plan_dashboard.template.html')
VERSION = 'v1.1.0'
BUILD = 2
AUTH = {
    'outlook': 'https://mcp.zapier.com/api/v1/connect-auth/MicrosoftOutlookCLIAPI?accountId=28195533',
    'todo': 'https://mcp.zapier.com/api/v1/connect-auth/MSTodoCLIAPI?accountId=28195533',
    'onenote': 'https://mcp.zapier.com/api/v1/connect-auth/OneNoteCLIAPI?accountId=28195533',
    'config': 'https://mcp.zapier.com/mcp/servers/25fd2499-ecbd-4b7c-a78c-e0ff065bad05/config',
}
# Rest-Abschnitte der Quelldatei, die als Ideen vorbelegt werden (Titelteil, Kurztag)
IDEA_SECTIONS = [
    ('Claude-Tools & KI-Ideen', 'ki-ideen'),
    ('Schaltzentrale / Mindmap-Ideen', 'schaltzentrale'),
    ('Weitere Sofort-Ideen', 'sofort-ideen'),
    ('Kalender/Klarna-Ideen', 'kalender'),
    ('Weitere Tool-Ideen', 'tool-ideen'),
    ('AI / Ziele', 'ai-ziele'),
    ('Tools suchen', 'tools'),
]


def stamp_now():
    tz = zoneinfo.ZoneInfo('Europe/Berlin')
    return datetime.datetime.now(tz).strftime('%Y-%m-%d_%H%M')


def main():
    stamp = stamp_now()
    if '--stamp' in sys.argv:
        stamp = sys.argv[sys.argv.index('--stamp') + 1]
    html = open(SRC, encoding='utf-8').read()
    m = re.search(r'<script id="embeddedDataScript" type="application/json">(.*?)</script>', html, re.S)
    src = json.loads(m.group(1))
    items = [i for i in src['items'] if not i.get('deleted')]
    items.sort(key=lambda i: ({'lenki': 0, 'money': 1, 'rest': 2}.get(i['list'], 3), i.get('ord', 0)))
    plans = []
    for i in items:
        plans.append({
            'id': i['id'], 'text': i['text'], 'list': i['list'],
            'secPath': [s for s in (i.get('secPath') or []) if s],
            'ind': i.get('ind', 0) or 0, 'tag': i.get('tag'), 'chk': bool(i.get('chk')),
        })
    plan_chk = {str(p['id']): src['meta'].get('aktualisiert', '') for p in plans if p['chk']}
    ideas = []
    for p in plans:
        if p['list'] != 'rest':
            continue
        top = p['secPath'][0] if p['secPath'] else ''
        for name, tag in IDEA_SECTIONS:
            if top.startswith(name):
                text = p['text']
                title = re.sub(r'\*\*', '', text)[:70]
                ideas.append({
                    'id': 'i_src%d' % p['id'], 'title': title, 'text': text if len(text) > 70 else '',
                    'area': 'ideen', 'tags': [tag, 'aus Rest-Dump'], 'status': 'neu',
                    'ts': '2026-09-26T22:18:00+02:00', 'editedTs': '2026-09-26T22:18:00+02:00',
                    'onenotePageId': '', 'onenoteTs': '', 'planId': p['id'],
                    'quelle': ' › '.join(p['secPath']),
                })
                break
    data = {
        'meta': {'tool': 'USINE PLAN-DASHBOARD', 'version': VERSION, 'buildVersion': BUILD, 'erstellt': stamp,
                 'aktualisiert': stamp, 'projekt': 'USINE DASHBOARDS',
                 'quelle': os.path.basename(SRC), 'quelleBuild': src['meta'].get('buildVersion'),
                 'quelleStand': src['meta'].get('aktualisiert')},
        'plans': plans, 'planChk': plan_chk, 'ideas': ideas, 'blocks': [], 'todos': [], 'notes': [],
        'settings': {'dayStart': '08:00', 'dayEnd': '20:00', 'calendarTarget': 'google', 'googleCalendarId': '', 'calendarId': '', 'todoListId': '',
                     'onenoteNotebookId': '', 'onenoteNotebookName': '', 'onenoteSectionId': '',
                     'onenoteSectionName': 'USINE Dashboard', 'onenoteContentType': 'text', 'onenoteLastPull': ''},
        'auth': AUTH,
        'versions': [{'v': VERSION, 'd': stamp,
                      't': 'Kalenderziel Google Kalender (claude.ai-Konnektor, taata.diawara@gmail.com) als Standard: Zeitblöcke anlegen/aktualisieren/löschen, Wochentermine lesen, Google-Web-Link, Kalenderauswahl in D07. Outlook über Zapier bleibt wählbar.'},
                     {'v': 'v1.0.0', 'd': '2026-10-09_2358',
                      't': 'Erstbau: Überblick/Wochenplaner, Zeitblöcke→Outlook, To-dos→To Do, Ideen, Pläne (Lesefassung, %d Positionen), OneNote-Abschnitt (additiver Sync), Einrichtung, Export/Import. %d Ideen aus Rest-Dump vorbelegt.' % (len(plans), len(ideas))}],
    }
    tpl = open(TPL, encoding='utf-8').read()
    payload = json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
    assert '/*__EMBEDDED__*/' in tpl
    out = tpl.replace('/*__EMBEDDED__*/', payload, 1)
    out = out.replace('Quelle ARTEFAKT - DESKTOP v2.0.0 (Stand 2026-09-26_2218)', 'Quelle ARTEFAKT - DESKTOP v2.0.0 (Stand %s) · Build %s' % (src['meta'].get('aktualisiert'), stamp))
    name = 'plan_dashboard_v1_%s.html' % stamp
    path = os.path.join(HERE, name)
    open(path, 'w', encoding='utf-8').write(out)
    # Pruefung: eingebetteter Block wieder parsebar
    m2 = re.search(r'<script id="embeddedDataScript" type="application/json">(.*?)</script>', out, re.S)
    json.loads(m2.group(1).replace('<\\/', '</'))
    print('OK', name, 'plans=%d ideas=%d chk=%d bytes=%d' % (len(plans), len(ideas), len(plan_chk), len(out.encode('utf-8'))))
    return path


if __name__ == '__main__':
    main()
