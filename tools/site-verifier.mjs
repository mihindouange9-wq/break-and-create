/* Vérification du site dans Chrome sans interface : bureau 1440, tablette 820, téléphone 390 (tactile).
   Contrôle console, images chargées, débordement horizontal, textes trop petits, contrastes des textes,
   formulaire, puis défile en huit positions et enregistre des captures dans tools/captures-site/.
   Lancer : node tools/site-verifier.mjs [--sans-captures] */
import { spawn } from 'node:child_process';
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { setTimeout as attendre } from 'node:timers/promises';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const captures = !process.argv.includes('--sans-captures');
const chromes = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', process.env.CHROME_PATH].filter(Boolean);
let CHROME = null; for (const c of chromes) { try { await access(c); CHROME = c; break; } catch { /* suivant */ } }
const port = 9820 + Math.floor(Math.random() * 60);
const chrome = spawn(CHROME, ['--headless=new', '--hide-scrollbars', '--no-first-run', '--disable-extensions', `--remote-debugging-port=${port}`, `--user-data-dir=${process.env.TEMP}/chrome-bcsite-${port}`, '--window-size=1440,900', 'about:blank'], { stdio: 'ignore' });
let cible = null;
for (let i = 0; i < 60 && !cible; i++) { await attendre(250); try { cible = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page'); } catch { /* attente */ } }
const ws = new WebSocket(cible.webSocketDebuggerUrl);
await new Promise((ok) => { ws.onopen = ok; });
let n = 0; const attentes = new Map(); let journal = []; const urls = new Map();
ws.onmessage = (m) => { const t = JSON.parse(m.data); if (t.id && attentes.has(t.id)) { attentes.get(t.id)(t); attentes.delete(t.id); return; } if (t.method === 'Runtime.exceptionThrown') journal.push('exception : ' + (t.params.exceptionDetails?.exception?.description || t.params.exceptionDetails?.text || '').split('\n')[0]); if (t.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(t.params.type)) journal.push(t.params.type + ' : ' + t.params.args.map((a) => a.value ?? a.description ?? '').join(' ').slice(0, 200)); if (t.method === 'Network.requestWillBeSent') urls.set(t.params.requestId, t.params.request.url); if (t.method === 'Network.loadingFailed') journal.push('chargement échoué : ' + t.params.errorText + ' ' + (urls.get(t.params.requestId) || '').split('/').pop()); };
const envoyer = (method, params = {}) => new Promise((ok) => { const id = ++n; attentes.set(id, ok); ws.send(JSON.stringify({ id, method, params })); });
const evaluer = async (e) => { const r = await envoyer('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); return r.result?.exceptionDetails ? 'ERREUR ' + r.result.exceptionDetails.exception?.description : r.result?.result?.value; };
await envoyer('Page.enable'); await envoyer('Runtime.enable'); await envoyer('Network.enable');
const dossier = join(RACINE, 'tools', 'captures-site'); if (captures) await mkdir(dossier, { recursive: true });
let anomalies = 0;
const lum = (r, g, b) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
for (const [nom, largeur, hauteur, tactile] of [['bureau', 1440, 900, false], ['tablette', 820, 1180, true], ['telephone', 390, 844, true]]) {
  journal = [];
  await envoyer('Emulation.setDeviceMetricsOverride', { width: largeur, height: hauteur, deviceScaleFactor: 1, mobile: tactile });
  await envoyer('Emulation.setTouchEmulationEnabled', { enabled: tactile });
  await envoyer('Page.navigate', { url: pathToFileURL(join(RACINE, 'site', 'index.html')).href });
  await attendre(4500);
  const problemes = []; const petits = new Set(), faibles = new Set();
  const positions = [0, .1, .2, .32, .45, .58, .7, .82, .93, 1];
  for (const p of positions) {
    await evaluer(`(() => { const y = (document.documentElement.scrollHeight - innerHeight) * ${p}; if (window.lenis) window.lenis.scrollTo(y, { immediate: true }); window.scrollTo(0, y); })()`);
    await attendre(p === 0 ? 400 : 900);
    const m = await evaluer(`(() => { const de = document.documentElement; return { largeurDoc: de.scrollWidth, deb: [...document.querySelectorAll('body *')].filter((el) => { const r = el.getBoundingClientRect(); return r.right > ${largeur} + 2 && r.width > 0 && r.height > 0 && getComputedStyle(el).position !== 'fixed' && !el.closest('.experiences, .galerie, .libreville, .zoom, .curseur, .rideau, .menu'); }).slice(0, 3).map((el) => el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className ? '.' + el.className.split(' ')[0] : '')) }; })()`);
    const textes = await evaluer(`(() => { const petits = [], faibles = []; const lum = (r, g, b) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); }; const rgb = (s) => (s.match(/[\\d.]+/g) || []).map(Number); const fondCorps = rgb(getComputedStyle(document.body).backgroundColor); document.querySelectorAll('p, li, a, span, small, dt, dd, label, h3').forEach((el) => { if (!el.offsetParent || el.closest('svg, .visuellement-cache, .curseur, .rideau, .menu, .experience-visuel')) return; const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight || r.width === 0) return; const t = el.textContent.trim(); if (t.length < 20 || el.children.length > 2) return; const cs = getComputedStyle(el); const fs = parseFloat(cs.fontSize); if (fs < 13) petits.push((el.className || el.tagName) + ' ' + fs); if (parseFloat(cs.opacity) < .5) return; let fond = null, p = el; while (p && p !== document.documentElement) { const b = rgb(getComputedStyle(p).backgroundColor); if (b.length >= 3 && (b.length === 3 || b[3] > .9)) { fond = b; break; } p = p.parentElement; } if (!fond) fond = fondCorps; const c = rgb(cs.color); if (c.length >= 3 && fond.length >= 3 && !(c.length === 4 && c[3] < .5)) { const l1 = lum(c[0], c[1], c[2]), l2 = lum(fond[0], fond[1], fond[2]); const ratio = (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05); if (ratio < 4.5 && fs < 24) faibles.push((el.className.split(' ')[0] || el.tagName) + ' ' + ratio.toFixed(1)); } }); return { petits, faibles }; })()`);
    textes.petits.forEach((x) => petits.add(x)); textes.faibles.forEach((x) => faibles.add(x));
    if (m.largeurDoc > largeur + 2) problemes.push(`débordement ${m.largeurDoc}px à ${Math.round(p * 100)} % (${m.deb.join(', ')})`);
    if (captures) { const { data } = (await envoyer('Page.captureScreenshot', { format: 'png' })).result; await writeFile(join(dossier, `${nom}-${String(Math.round(p * 100)).padStart(3, '0')}.png`), Buffer.from(data, 'base64')); }
  }
  /* images : toutes chargées et non vides */
  const images = await evaluer(`(() => { const l = [...document.images]; return { total: l.length, cassees: l.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc.split('/').pop()).slice(0, 5), sansAlt: l.filter((i) => !i.hasAttribute('alt')).length }; })()`);
  if (images.cassees.length) problemes.push(`images cassées : ${images.cassees.join(', ')}`);
  if (images.sansAlt) problemes.push(`${images.sansAlt} image(s) sans alt`);
  if (petits.size) problemes.push(`textes < 13 px : ${[...petits].slice(0, 4).join(', ')}`);
  if (faibles.size) problemes.push(`contrastes < 4,5 : ${[...faibles].slice(0, 6).join(', ')}`);
  /* formulaire : les champs requis existent et le bouton d'envoi est atteignable */
  const form = await evaluer(`(() => { const f = document.querySelector('[data-formulaire]'); return f ? { requis: f.querySelectorAll('[required]').length, select: f.querySelector('select').options.length } : null; })()`);
  if (!form || form.requis < 5 || form.select < 7) problemes.push('formulaire incomplet');
  problemes.push(...journal.filter((l) => !/favicon/.test(l)));
  if (problemes.length) { anomalies += problemes.length; console.log(`✗ ${nom} ${largeur}px : ${problemes.join(' | ')}`); }
  else console.log(`✓ ${nom} ${largeur}px : défilement, images (${images.total}), textes, contrastes, formulaire, console`);
}
console.log(anomalies ? `\n${anomalies} anomalie(s)` : '\naucune anomalie');
try { ws.close(); } catch { /* fermé */ }
chrome.kill();
process.exit(anomalies ? 1 : 0);
