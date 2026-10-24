/* BREAK & CREATE — génère charte/index.html, charte/assets/style.css et les logos SVG autonomes.
   Lancer : node source/build.mjs   (depuis le dossier break-and-create) */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { motSymbole, symbole, logoEmpile, NOIR, ORANGE, BLANC } from './lib.mjs';
import a from './sections/a-identite-logo.mjs';
import b from './sections/b-couleurs-typo-systeme-photo.mjs';
import c from './sections/c-digital-lieu-applications.mjs';

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = join(ICI, '..');
const CHARTE = join(RACINE, 'charte');
await mkdir(join(CHARTE, 'assets'), { recursive: true });
await mkdir(join(RACINE, 'logos'), { recursive: true });

/* ---------- feuille de style ---------- */
const fonts = await readFile(join(ICI, 'fonts.css'), 'utf8');
const style = await readFile(join(ICI, 'style.css'), 'utf8');
await writeFile(join(CHARTE, 'assets', 'style.css'), fonts + '\n' + style);

/* ---------- planches ---------- */
const planches = [...a(), ...b(), ...c()];
const sections = [...new Set(planches.map((p) => /data-section="([^"]+)"/.exec(p)[1]))].filter((s) => /^\d\d/.test(s));
const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BREAK &amp; CREATE — Charte graphique</title>
<meta name="description" content="Charte graphique de BREAK &amp; CREATE, destination d’expériences créatives et immersives à Akanda (Gabon) : logo, couleurs, typographie, système graphique, applications.">
<link rel="stylesheet" href="assets/style.css">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
</head>
<body>
<div class="barre-lecteur">
  <strong>BREAK &amp; CREATE · Charte graphique</strong>
  <nav aria-label="Chapitres">${sections.map((s, i) => `<a href="#s-${i + 1}">${s.replace(/ — /, ' ')}</a>`).join('')}</nav>
  <a class="telecharger" href="BREAK-AND-CREATE-charte.pdf" download>PDF</a>
</div>
<main class="lecteur">
${planches.map((p, i) => { const s = /data-section="([^"]+)"/.exec(p)[1]; const k = sections.indexOf(s); const ancre = k >= 0 && sections.indexOf(s) === k && planches.findIndex((q) => /data-section="([^"]+)"/.exec(q)[1] === s) === i ? ` id="s-${k + 1}"` : ''; return `<div class="planche-cadre"${ancre}>${p.replace('data-num></span>', `data-num>${String(i + 1).padStart(2, '0')} / ${planches.length}</span>`)}</div><div class="planche-espace" aria-hidden="true"></div>`; }).join('\n')}
</main>
<script>
(function () {
  /* met les planches (1600 × 1000) à l'échelle de la fenêtre et réserve leur hauteur réelle */
  var cadres = document.querySelectorAll('.planche-cadre'), espaces = document.querySelectorAll('.planche-espace');
  function ajuster() {
    var e = Math.min(1, (window.innerWidth - 32) / 1600);
    document.documentElement.style.setProperty('--echelle', e);
    for (var i = 0; i < cadres.length; i++) { cadres[i].style.marginBottom = (-1000 * (1 - e)) + 'px'; }
  }
  ajuster(); window.addEventListener('resize', ajuster);
})();
</script>
</body>
</html>`;
await writeFile(join(CHARTE, 'index.html'), html);

/* ---------- favicon et logos autonomes (police embarquée) ---------- */
const woff = (await readFile(join(CHARTE, 'assets', 'fonts', 'SpaceGrotesk-latin.woff2'))).toString('base64');
const embarquer = (svg) => svg.replace('<svg ', '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/(<svg[^>]*>)/, `$1<style>@font-face{font-family:"Space Grotesk";src:url(data:font/woff2;base64,${woff}) format("woff2");font-weight:300 700}</style>`).replace(/ class="[^"]*"/, '');
const logos = {
  'break-and-create-principal.svg': motSymbole(),
  'break-and-create-principal-blanc.svg': motSymbole({ couleur: BLANC }),
  'break-and-create-principal-sur-orange.svg': motSymbole({ ampersandCouleur: NOIR }),
  'break-and-create-principal-mono-noir.svg': motSymbole({ ampersandCouleur: NOIR }),
  'break-and-create-principal-mono-blanc.svg': motSymbole({ couleur: BLANC, ampersandCouleur: BLANC }),
  'break-and-create-secondaire.svg': logoEmpile(),
  'break-and-create-secondaire-blanc.svg': logoEmpile({ couleur: BLANC }),
  'break-and-create-symbole.svg': symbole(),
  'break-and-create-symbole-sur-noir.svg': symbole({ fond: ORANGE, glyphe: NOIR }),
  'break-and-create-symbole-mono-noir.svg': symbole({ fond: NOIR, glyphe: BLANC }),
  'break-and-create-symbole-mono-blanc.svg': symbole({ fond: BLANC, glyphe: NOIR }),
};
for (const [nom, svg] of Object.entries(logos)) await writeFile(join(RACINE, 'logos', nom), embarquer(svg) + '\n');
await writeFile(join(CHARTE, 'assets', 'favicon.svg'), embarquer(symbole()) + '\n');
console.log(`généré : charte/index.html (${planches.length} planches), charte/assets/style.css, ${Object.keys(logos).length} logos SVG`);
