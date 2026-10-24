/* Capture une planche (index 1..n) en vue directe : node tools/capturer.mjs 9 */
import { spawn } from 'node:child_process';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { setTimeout as attendre } from 'node:timers/promises';
const port = 9895; const RACINE = process.cwd(); const k = Number(process.argv[2] || 1);
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--hide-scrollbars', '--allow-file-access-from-files', `--remote-debugging-port=${port}`, `--user-data-dir=${process.env.TEMP}/chrome-cap-${port}`, '--window-size=1600,1000', 'about:blank'], { stdio: 'ignore' });
let cible = null; for (let i = 0; i < 60 && !cible; i++) { await attendre(250); try { cible = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page'); } catch {} }
const ws = new WebSocket(cible.webSocketDebuggerUrl); await new Promise((ok) => { ws.onopen = ok; });
let n = 0; const att = new Map(); ws.onmessage = (m) => { const t = JSON.parse(m.data); if (t.id && att.has(t.id)) { att.get(t.id)(t); att.delete(t.id); } };
const envoyer = (method, params = {}) => new Promise((ok) => { const id = ++n; att.set(id, ok); ws.send(JSON.stringify({ id, method, params })); });
const evaluer = async (e) => (await envoyer('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result?.result?.value;
await envoyer('Emulation.setDeviceMetricsOverride', { width: 1600, height: 1000, deviceScaleFactor: 1, mobile: false });
await envoyer('Page.navigate', { url: pathToFileURL(join(RACINE, 'charte', 'index.html')).href }); await attendre(1500);
await evaluer('document.fonts.ready');
await evaluer(`document.querySelector('.barre-lecteur').style.display = 'none'; document.documentElement.style.setProperty('--echelle', 1); document.querySelectorAll('.planche-cadre').forEach((c) => { c.style.marginBottom = '0'; }); document.querySelectorAll('.planche')[${k - 1}].scrollIntoView({ block: 'start', behavior: 'instant' })`);
await attendre(500);
const { data } = (await envoyer('Page.captureScreenshot', { format: 'png' })).result;
await mkdir(join(RACINE, 'tools', 'captures'), { recursive: true });
await writeFile(join(RACINE, 'tools', 'captures', `vue-${String(k).padStart(2, '0')}.png`), Buffer.from(data, 'base64'));
console.log('capture vue-' + k);
ws.close(); chrome.kill();
