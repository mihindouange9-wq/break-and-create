/* Planche-contact des captures téléphone : node tools/planche-mobile.mjs [prefixe] → tools/planche-mobile.png */
import { spawn } from 'node:child_process';
import { readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { setTimeout as attendre } from 'node:timers/promises';
const ICI = dirname(fileURLToPath(import.meta.url)); const prefixe = process.argv[2] || 'telephone';
const dossier = join(ICI, 'captures-site');
const fichiers = readdirSync(dossier).filter((f) => f.startsWith(prefixe + '-')).sort();
const html = `<!doctype html><meta charset="utf-8"><body style="margin:0;background:#333"><div style="display:flex;flex-wrap:wrap;gap:8px;padding:8px">${fichiers.map((f) => `<figure style="margin:0"><img src="${pathToFileURL(join(dossier, f)).href}" style="width:300px;display:block"><figcaption style="color:#fff;font:12px sans-serif;padding:2px">${f}</figcaption></figure>`).join('')}</div></body>`;
const page = join(ICI, 'planche-mobile.html'); writeFileSync(page, html);
const port = 9770; const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${process.env.TEMP}/chrome-pm-${port}`, '--window-size=1600,1400', 'about:blank'], { stdio: 'ignore' });
let cible = null; for (let i = 0; i < 60 && !cible; i++) { await attendre(250); try { cible = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page'); } catch { /* attente */ } }
const ws = new WebSocket(cible.webSocketDebuggerUrl); await new Promise((ok) => { ws.onopen = ok; });
let n = 0; const att = new Map(); ws.onmessage = (m) => { const t = JSON.parse(m.data); if (t.id && att.has(t.id)) { att.get(t.id)(t); att.delete(t.id); } };
const envoyer = (method, params = {}) => new Promise((ok) => { const id = ++n; att.set(id, ok); ws.send(JSON.stringify({ id, method, params })); });
await envoyer('Emulation.setDeviceMetricsOverride', { width: 1600, height: 1400, deviceScaleFactor: 1, mobile: false });
await envoyer('Page.navigate', { url: pathToFileURL(page).href }); await attendre(2500);
const { data } = (await envoyer('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })).result;
writeFileSync(join(ICI, 'planche-mobile.png'), Buffer.from(data, 'base64')); console.log('planche-mobile.png', fichiers.length); ws.close(); chrome.kill();
