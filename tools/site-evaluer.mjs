/* Évalue une expression JS dans la charte ouverte en Chrome sans interface. Usage : node tools/evaluer.mjs "expression" */
import { spawn } from 'node:child_process';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { setTimeout as attendre } from 'node:timers/promises';
const port = 9880 + Math.floor(Math.random() * 15); const RACINE = process.cwd();
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${process.env.TEMP}/chrome-eval-${port}`, '--window-size=1440,900', 'about:blank'], { stdio: 'ignore' });
let cible = null; for (let i = 0; i < 60 && !cible; i++) { await attendre(250); try { cible = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page'); } catch {} }
const ws = new WebSocket(cible.webSocketDebuggerUrl); await new Promise((ok) => { ws.onopen = ok; });
let n = 0; const att = new Map(); ws.onmessage = (m) => { const t = JSON.parse(m.data); if (t.id && att.has(t.id)) { att.get(t.id)(t); att.delete(t.id); } };
const envoyer = (method, params = {}) => new Promise((ok) => { const id = ++n; att.set(id, ok); ws.send(JSON.stringify({ id, method, params })); });
const largeur = Number(process.argv[4] || 1440); await envoyer('Emulation.setDeviceMetricsOverride', { width: largeur, height: largeur < 800 ? 844 : 900, deviceScaleFactor: 1, mobile: largeur < 800 }); if (largeur < 800) await envoyer('Emulation.setTouchEmulationEnabled', { enabled: true });
await envoyer('Page.navigate', { url: pathToFileURL(join(RACINE, 'site', 'index.html')).href }); await attendre(Number(process.argv[3] || 5000));
const r = await envoyer('Runtime.evaluate', { expression: process.argv[2], returnByValue: true, awaitPromise: true });
console.log(r.result?.exceptionDetails ? 'ERREUR ' + r.result.exceptionDetails.exception?.description : JSON.stringify(r.result?.result?.value));
if (process.argv[5]) { const { writeFileSync } = await import('node:fs'); const cap = await envoyer('Page.captureScreenshot', { format: 'png' }); writeFileSync(process.argv[5], Buffer.from(cap.result.data, 'base64')); console.log('capture', process.argv[5]); }
ws.close(); chrome.kill();
