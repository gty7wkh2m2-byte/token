// Screenshots mobil (390×844) und Desktop (1440×900), hell und dunkel, je Ansicht. Aufruf: node scripts/screenshots.mjs <datei.html> [ausgabeordner]
import fs from 'node:fs'; import path from 'node:path'; import { createRequire } from 'node:module';
const req = createRequire(import.meta.url); let chromium; try { ({ chromium } = req('playwright')); } catch { ({ chromium } = req('/opt/node-tools/node_modules/playwright')); }
const file = path.resolve(process.argv[2] || 'notizblock/notizblock_AKTUELL.html'); const out = path.resolve(process.argv[3] || 'screenshots'); fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
for (const [name, vp, scheme] of [['mobil-hell', { width: 390, height: 844 }, 'light'], ['desktop-dunkel', { width: 1440, height: 900 }, 'dark']]) {
  const ctx = await browser.newContext({ viewport: vp, colorScheme: scheme }); const page = await ctx.newPage(); await page.goto('file://' + file); await page.waitForTimeout(500);
  const views = await page.evaluate(() => [...document.querySelectorAll('nav#nav button[data-view]')].map(b => b.dataset.view));
  if (!views.length) await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
  for (const v of views) { await page.click(`nav#nav button[data-view="${v}"]`); await page.waitForTimeout(250); await page.screenshot({ path: `${out}/${name}-${v}.png` }); }
  await ctx.close();
}
await browser.close(); console.log('Screenshots in ' + out);
