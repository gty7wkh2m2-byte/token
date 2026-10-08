#!/usr/bin/env node
// Prüfkette für einzelne HTML-Werkzeuge. Aufruf: node tools/check.js <datei.html> [--shots] [--out ordner]
// Stufen: 1 EMBEDDED_DATA JSON.parse | 2 Syntax Inline-Skripte | 3 Pflichtmerkmale | 4 JSDOM-Smoke + Klicktest + Autosave | 5 Screenshots (--shots)
// Ausgabe: je Stufe OK/WARN/FAIL, Exit-Code 1 bei FAIL. Keine Modellnutzung, keine Tokens.
const fs = require('fs'), path = require('path'), vm = require('vm');

const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const file = args.find((a, i) => !a.startsWith('--') && i !== (outIdx >= 0 ? outIdx + 1 : -1));
const shots = args.includes('--shots');
const outDir = outIdx >= 0 ? args[outIdx + 1] : 'check_out';
if (!file) { console.error('Aufruf: node tools/check.js <datei.html> [--shots] [--out ordner]'); process.exit(2); }

const html = fs.readFileSync(file, 'utf8');
const res = [];
const add = (stage, status, msg) => { res.push({ stage, status, msg }); console.log(`[${status}] ${stage}: ${msg}`); };

// Stufe 1: EMBEDDED_DATA
const emb = html.match(/<script[^>]*id=["']EMBEDDED_DATA["'][^>]*>([\s\S]*?)<\/script>/i);
if (!emb) add('1 JSON', 'WARN', 'kein EMBEDDED_DATA-Block gefunden');
else { try { JSON.parse(emb[1]); add('1 JSON', 'OK', `EMBEDDED_DATA parsebar (${emb[1].length} Zeichen)`); } catch (e) { add('1 JSON', 'FAIL', e.message); } }

// Stufe 2: Syntax
const scripts = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter(m => !/\bsrc=/.test(m[1]) && !/type=["']application\/(ld\+)?json["']/i.test(m[1]) && m[2].trim());
let synErr = 0;
scripts.forEach((m, i) => { try { new vm.Script(m[2], { filename: `inline#${i + 1}` }); } catch (e) { synErr++; add('2 Syntax', 'FAIL', `Skript ${i + 1}: ${e.message}`); } });
if (!synErr) add('2 Syntax', 'OK', `${scripts.length} Inline-Skript(e) ohne Syntaxfehler`);

// Stufe 3: Pflichtmerkmale (Heuristik, nur WARN)
const must = {
  'localStorage-Autosave': /localStorage/, 'Intervall 1000 ms': /setInterval\([\s\S]{0,400}?1000/,
  'Self-Download': /download\s*=|\.download\b|createObjectURL/, 'JSON-Export': /JSON\.stringify/,
  'Versionsanzeige': /version|v\d+(\.\d+)?/i, 'Herkunftsanzeige': /herkunft|origin|quelle|source/i,
  'externe Abhängigkeit': null,
};
for (const [k, re] of Object.entries(must)) {
  if (re === null) { const ext = [...html.matchAll(/<(?:script|link)[^>]+(?:src|href)=["'](https?:[^"']+)/gi)].map(m => m[1]); add('3 Merkmale', ext.length ? 'WARN' : 'OK', ext.length ? `externe Ressourcen: ${ext.join(', ')}` : 'keine externen Ressourcen'); }
  else add('3 Merkmale', re.test(html) ? 'OK' : 'WARN', k);
}

(async () => {
  // Stufe 4: JSDOM
  let JSDOM, VirtualConsole;
  try { ({ JSDOM, VirtualConsole } = require('jsdom')); } catch { add('4 JSDOM', 'WARN', 'jsdom fehlt (npm i jsdom), Stufe übersprungen'); }
  if (JSDOM) {
    const errors = [];
    const vc = new VirtualConsole();
    vc.on('jsdomError', e => errors.push(e.message)); vc.on('error', m => errors.push(String(m)));
    const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'http://localhost/', virtualConsole: vc,
      beforeParse(w) { w.URL.createObjectURL = () => 'blob:x'; w.URL.revokeObjectURL = () => {}; w.HTMLAnchorElement.prototype.click = function () {}; w.alert = w.confirm = w.prompt = () => true; } });
    await new Promise(r => setTimeout(r, 300));
    const w = dom.window, d = w.document;
    const btns = [...d.querySelectorAll('button, [role=button], summary, input[type=checkbox], select')];
    btns.forEach(b => { try { b.dispatchEvent(new w.Event('click', { bubbles: true })); if (b.tagName === 'SELECT') b.dispatchEvent(new w.Event('change', { bubbles: true })); } catch (e) { errors.push('Klick: ' + e.message); } });
    add('4 Interaktion', errors.length ? 'FAIL' : 'OK', errors.length ? errors.slice(0, 5).join(' | ') : `${btns.length} Elemente ausgelöst, keine Fehler`);
    // Autosave: nach >1,2 s muss localStorage etwas enthalten
    const before = w.localStorage.length;
    await new Promise(r => setTimeout(r, 1300));
    add('4 Autosave', w.localStorage.length > 0 ? 'OK' : 'WARN', `localStorage-Einträge: ${before} → ${w.localStorage.length}`);
    w.close();
  }
  // Stufe 5: Screenshots
  if (shots) {
    let chromium;
    try { ({ chromium } = require('playwright')); } catch { try { ({ chromium } = require('/node-tools/node_modules/playwright')); } catch {} }
    if (!chromium) add('5 Screenshots', 'WARN', 'playwright nicht auffindbar');
    else {
      fs.mkdirSync(outDir, { recursive: true });
      const exe = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
      const br = await chromium.launch(exe ? { executablePath: exe } : {});
      for (const [name, vp] of [['mobil', { width: 390, height: 844 }], ['desktop', { width: 1440, height: 900 }]]) {
        const pg = await br.newPage({ viewport: vp }); const errs = [];
        pg.on('pageerror', e => errs.push(e.message)); pg.on('console', m => m.type() === 'error' && errs.push(m.text()));
        await pg.goto('file://' + path.resolve(file)); await pg.waitForTimeout(500);
        const overflow = await pg.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
        const p = path.join(outDir, `${path.basename(file, '.html')}_${name}.png`);
        await pg.screenshot({ path: p, fullPage: true });
        add(`5 ${name}`, errs.length ? 'FAIL' : (overflow ? 'WARN' : 'OK'), `${p}${overflow ? ' | horizontales Scrollen' : ''}${errs.length ? ' | ' + errs.slice(0, 3).join(' | ') : ''}`);
        await pg.close();
      }
      await br.close();
    }
  }
  const fail = res.filter(r => r.status === 'FAIL').length, warn = res.filter(r => r.status === 'WARN').length;
  console.log(`\nErgebnis: ${fail} FAIL, ${warn} WARN, ${res.length - fail - warn} OK`);
  process.exit(fail ? 1 : 0);
})();
