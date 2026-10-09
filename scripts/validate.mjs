// Validierung der Werkzeugdatei: Syntax aller Skriptblöcke, EMBEDDED_DATA parsebar, Headless-Smoke über alle Ansichten,
// Konsolenfehler, horizontaler Überlauf bei 390 px, Autosave nach Neuladen. Aufruf: node scripts/validate.mjs <datei.html>
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
const req = createRequire(import.meta.url);
let chromium; try { ({ chromium } = req('playwright')); } catch { ({ chromium } = req('/opt/node-tools/node_modules/playwright')); }
const file = path.resolve(process.argv[2] || 'notizblock/notizblock_AKTUELL.html');
const html = fs.readFileSync(file, 'utf8'); const fail = [];
// 1 EMBEDDED_DATA
const m = html.match(/<script id="EMBEDDED_DATA" type="application\/json">([\s\S]*?)<\/script>/);
if (!m) fail.push('EMBEDDED_DATA fehlt'); else { try { JSON.parse(m[1]); } catch (e) { fail.push('EMBEDDED_DATA kein JSON: ' + e.message); } }
// 2 Syntax
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(x => x[1]);
const tmp = path.join(process.env.TMPDIR || '/tmp', 'nb_validate.js'); fs.writeFileSync(tmp, scripts.join('\n'));
try { execFileSync('node', ['--check', tmp], { stdio: 'pipe' }); } catch (e) { fail.push('Syntaxfehler: ' + String(e.stderr || e.message).slice(0, 400)); }
// 3 Headless
const isFragment = !/^\s*<!doctype html>/i.test(html);
const src = isFragment ? (() => { const t = path.join(process.env.TMPDIR || '/tmp', 'nb_validate.html'); fs.writeFileSync(t, `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>:root{color-scheme:light}body{margin:0;font:14px system-ui}[hidden]{display:none!important}</style></head><body>${html}</body></html>`); return t; })() : file;
const browser = await chromium.launch(); const errors = [];
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } }); const page = await ctx.newPage();
page.on('pageerror', e => errors.push('pageerror: ' + e.message)); page.on('console', msg => { if (msg.type() === 'error') errors.push('console: ' + msg.text()); });
await page.goto('file://' + src); await page.waitForTimeout(500);
const views = await page.evaluate(() => [...document.querySelectorAll('nav#nav button[data-view]')].map(b => b.dataset.view));
for (const v of views) { await page.click(`nav#nav button[data-view="${v}"]`); await page.waitForTimeout(150); const ov = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]); if (ov[0] > ov[1]) fail.push(`Überlauf in Ansicht ${v}: ${ov[0]}/${ov[1]}`); }
if (!views.length) { const ov = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]); if (ov[0] > ov[1]) fail.push(`Überlauf: ${ov[0]}/${ov[1]}`); }
const hasD = await page.evaluate(() => typeof D !== 'undefined' && Array.isArray(D.nodes));
if (hasD) { const n0 = await page.evaluate(() => { addNode({ title: 'Validierungs-Knoten', type: 'notiz', parentId: 'inbox' }); return D.nodes.length; }); await page.waitForTimeout(1200); await page.reload(); await page.waitForTimeout(500); const n1 = await page.evaluate(() => D.nodes.length); if (n1 !== n0) fail.push(`Autosave: ${n0} vor, ${n1} nach Neuladen`); await page.evaluate(() => { const n = D.nodes.find(x => x.title === 'Validierungs-Knoten'); if (n) { D.nodes.splice(D.nodes.indexOf(n), 1); save(true); } }); }
await browser.close(); errors.forEach(e => fail.push(e));
console.log(`Datei: ${path.basename(file)} · ${html.length} Bytes · Skriptblöcke: ${scripts.length} · Ansichten: ${views.length || 'n/a'}`);
if (fail.length) { console.log('FEHLER (' + fail.length + '):'); fail.forEach(f => console.log(' - ' + f)); process.exit(1); } else console.log('0 Fehler · kein Überlauf · Autosave ok');
