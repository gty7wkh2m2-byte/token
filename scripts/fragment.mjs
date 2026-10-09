// Erzeugt aus der vollständigen Werkzeugdatei die Artefakt-Fassung ohne doctype/html/head/body (das Artefakt-Gerüst ergänzt diese).
// Aufruf: node scripts/fragment.mjs notizblock/notizblock_AKTUELL.html > /tmp/notizblock_fragment.html
import fs from 'node:fs';
const html = fs.readFileSync(process.argv[2], 'utf8');
const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] || ''; const body = html.match(/<body>([\s\S]*?)<\/body>/i)?.[1] || html;
const keep = head.replace(/<meta[^>]*>/gi, '').trim();
process.stdout.write(keep + '\n' + body.trim() + '\n');
