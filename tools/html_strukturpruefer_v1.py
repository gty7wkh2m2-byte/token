#!/usr/bin/env python3
"""html_strukturpruefer_v1.py · Strukturprüfer für große HTML-Werkzeugdateien.

Aufruf:  python3 -I tools/html_strukturpruefer_v1.py <datei.html> [--json-dump ORDNER]

Gibt ohne Volllesen im Chat aus:
  1. Blöcke (<style>, <script>) mit Position und Länge
  2. Base64-Anteil an der Datei
  3. Je <script type="application/json">: Schlüssel mit Größe, getrennt nach Base64 und Text
  4. Funktionsanzahl je Skriptblock, localStorage-Schlüssel

Optional --json-dump: schreibt jeden JSON-Block als Datei in ORDNER (für gezielte Folgeanalysen).
Nur Standardbibliothek. Die Datei wird einmal als Text gelesen, nie in den Chat gegeben.
"""
import json
import os
import re
import sys


def weigh(o):
    """(base64_bytes, text_bytes) eines JSON-Werts, rekursiv."""
    if isinstance(o, str):
        return (len(o), 0) if o.startswith("data:") else (0, len(o))
    if isinstance(o, list):
        b = t = 0
        for x in o:
            bb, tt = weigh(x)
            b += bb
            t += tt
        return b, t
    if isinstance(o, dict):
        b = t = 0
        for x in o.values():
            bb, tt = weigh(x)
            b += bb
            t += tt
        return b, t
    return 0, len(json.dumps(o))


def fmt(n):
    return f"{n:,}".replace(",", ".")


def main(path, dump_dir=None):
    s = open(path, encoding="utf-8").read()
    total = len(s)
    print(f"Datei: {os.path.basename(path)}")
    print(f"Zeichen: {fmt(total)} · Zeilen: {fmt(s.count(chr(10)) + 1)}")

    print("\n== 1 Blöcke ==")
    print(f"{'typ':7}{'attribute':52}{'start':>10}{'länge':>10}")
    blocks = []
    for m in re.finditer(r"<(style|script)([^>]*)>", s):
        tag, attrs = m.group(1), m.group(2).strip()
        end = s.find(f"</{tag}>", m.end())
        if end < 0:
            continue
        # Treffer innerhalb eines JSON-Blocks (eingebettetes HTML) überspringen
        if any(b0 < m.start() < b1 for _, _, b0, b1 in blocks):
            continue
        blocks.append((tag, attrs, m.end(), end))
        print(f"{tag:7}{attrs[:50]:52}{m.start():>10}{end - m.end():>10}")

    b64 = sum(len(x) for x in re.findall(r"data:[a-z/+.-]+;base64,[A-Za-z0-9+/=]+", s))
    print(f"\n== 2 Base64 ==\n{fmt(b64)} Zeichen · {b64 / total * 100:.1f} % der Datei")

    print("\n== 3 JSON-Blöcke ==")
    for tag, attrs, a, b in blocks:
        if tag != "script" or "application/json" not in attrs:
            continue
        ident = re.search(r"id=['\"]([^'\"]+)", attrs)
        name = ident.group(1) if ident else f"json@{a}"
        raw = s[a:b]
        try:
            d = json.loads(raw)
        except Exception as e:
            print(f"{name}: JSON-Fehler {e}")
            continue
        if dump_dir:
            os.makedirs(dump_dir, exist_ok=True)
            with open(os.path.join(dump_dir, f"{name}.json"), "w", encoding="utf-8") as f:
                json.dump(d, f, ensure_ascii=False)
        if not isinstance(d, dict):
            print(f"{name}: {type(d).__name__}, Länge {fmt(len(raw))}")
            continue
        print(f"{name}: {len(d)} Schlüssel, {fmt(len(raw))} Zeichen")
        rows = []
        for k, v in d.items():
            bb, tt = weigh(v)
            n = len(v) if hasattr(v, "__len__") and not isinstance(v, str) else ""
            rows.append((bb + tt, k, bb, tt, n))
        rows.sort(reverse=True)
        print(f"  {'schlüssel':16}{'gesamt':>11}{'base64':>11}{'text':>9}{'n':>6}")
        for tot, k, bb, tt, n in rows:
            print(f"  {k:16}{fmt(tot):>11}{fmt(bb):>11}{fmt(tt):>9}{str(n):>6}")

    print("\n== 4 Skriptblöcke ==")
    for tag, attrs, a, b in blocks:
        if tag != "script" or "application/json" in attrs or "src=" in attrs:
            continue
        js = s[a:b]
        fns = re.findall(r"function\s+([A-Za-z_$][\w$]*)\s*\(", js)
        ls = sorted(set(re.findall(r"localStorage\.(?:get|set|remove)Item\(\s*['\"]([^'\"]+)", js)))
        print(f"script@{a}: {fmt(len(js))} Zeichen · {len(fns)} Funktionen · innerHTML {js.count('innerHTML')} · "
              f"addEventListener {js.count('addEventListener')} · localStorage {ls or '-'}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    dump = None
    if "--json-dump" in sys.argv:
        dump = sys.argv[sys.argv.index("--json-dump") + 1]
    main(sys.argv[1], dump)
