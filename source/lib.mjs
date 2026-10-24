/* BREAK & CREATE — bibliothèque du générateur de charte : couleurs, logos SVG, système graphique, planches. */
export const NOIR = '#171717';
export const ORANGE = '#FF5A1F';
export const BLANC = '#FFFFFF';

export const echapper = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------- logotype ----------
   Le mot BREAK est « fracturé » : sa moitié haute est découpée le long d'une diagonale et décalée,
   CREATE reste intact. Le & est le symbole de la marque. Tout est en Space Grotesk 700, capitales. */
let compteurId = 0;
const id = (p) => `${p}-${(compteurId += 1).toString(36)}`;

export function motSymbole({ couleur = NOIR, accent = ORANGE, fracture = true, taille = 100, ampersandCouleur = accent } = {}) {
  const h = id('h'), b = id('b');
  const fs = taille;
  /* largeurs mesurées dans Chrome, Space Grotesk 700 à 100 px avec approche −3 % : BREAK 296, & 59, CREATE 336, hauteur de capitale 70 */
  const largeur = fs * 7.75, hauteur = fs * 1.16;
  const yBase = fs * 0.93;
  const xBreak = 0, xAmp = fs * 2.96 + fs * 0.3, xCreate = xAmp + fs * 0.59 + fs * 0.3;
  const yCoupe1 = fs * 0.62, yCoupe2 = fs * 0.5;
  const texte = (t, x, coul) => `<text x="${x}" y="${yBase}" font-family="Space Grotesk, Arial, sans-serif" font-weight="700" font-size="${fs}" letter-spacing="${-fs * 0.03}" fill="${coul}">${t}</text>`;
  const breakSvg = fracture
    ? `<defs><clipPath id="${h}"><polygon points="${-fs * 0.1},${-fs * 0.2} ${fs * 3.1},${-fs * 0.2} ${fs * 3.1},${yCoupe2} ${-fs * 0.1},${yCoupe1}"/></clipPath><clipPath id="${b}"><polygon points="${-fs * 0.1},${yCoupe1} ${fs * 3.1},${yCoupe2} ${fs * 3.1},${fs * 1.3} ${-fs * 0.1},${fs * 1.3}"/></clipPath></defs>
      <g clip-path="url(#${h})" transform="translate(${fs * 0.07} ${-fs * 0.035})">${texte('BREAK', xBreak, couleur)}</g>
      <g clip-path="url(#${b})">${texte('BREAK', xBreak, couleur)}</g>`
    : texte('BREAK', xBreak, couleur);
  const contenu = `${breakSvg}${texte('&amp;', xAmp, ampersandCouleur)}${texte('CREATE', xCreate, couleur)}`;
  if (arguments[0] && arguments[0].interne) return { contenu, largeurTexte: fs * 7.51, hautCap: fs * 0.23, basCap: fs * 0.93, x: fs * 0.7 };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-fs * 0.1} ${-fs * 0.2} ${largeur} ${hauteur + fs * 0.2}" role="img" aria-label="BREAK &amp; CREATE" class="logo">${contenu}</svg>`;
}

/* schéma de construction : le logo, ses limites, la zone de protection égale à x (hauteur du &) */
export function construction() {
  const m = motSymbole({ interne: true });
  const x = m.x, l = m.largeurTexte, h = m.basCap - m.hautCap;
  const g = (a, b, c, d, coul = ORANGE, tiret = '6 6') => `<rect x="${a}" y="${b}" width="${c}" height="${d}" fill="none" stroke="${coul}" stroke-width="1.5" stroke-dasharray="${tiret}"/>`;
  const cote = (cx, cy, t) => `<text x="${cx}" y="${cy}" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-size="16" fill="${ORANGE}">${t}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-x - 40} ${m.hautCap - x - 40} ${l + 2 * x + 80} ${h + 2 * x + 80}" role="img" aria-label="Construction du logo" class="logo logo-construction">
    ${g(-x, m.hautCap - x, l + 2 * x, h + 2 * x, ORANGE, '8 6')}${g(0, m.hautCap, l, h, '#9A9A9A', '4 4')}
    <line x1="${-x}" y1="${m.hautCap - x / 2}" x2="0" y2="${m.hautCap - x / 2}" stroke="${ORANGE}" stroke-width="1.5"/>${cote(-x / 2, m.hautCap - x / 2 - 8, 'x')}
    <line x1="${l}" y1="${m.hautCap - x / 2}" x2="${l + x}" y2="${m.hautCap - x / 2}" stroke="${ORANGE}" stroke-width="1.5"/>${cote(l + x / 2, m.hautCap - x / 2 - 8, 'x')}
    <line x1="${l + x / 2}" y1="${m.hautCap}" x2="${l + x / 2}" y2="${m.basCap}" stroke="${ORANGE}" stroke-width="1.5"/>${cote(l + x / 2 + 18, (m.hautCap + m.basCap) / 2 + 6, 'x')}
    <line x1="${-x / 2}" y1="${m.basCap}" x2="${-x / 2}" y2="${m.basCap + x}" stroke="${ORANGE}" stroke-width="1.5"/>${cote(-x / 2 - 18, m.basCap + x / 2 + 6, 'x')}
    ${m.contenu}
    ${cote(l / 2, m.basCap + x + 30, 'zone de protection = x = hauteur de capitale (= hauteur du &amp;)')}
  </svg>`;
}

/* symbole : tuile carrée dont un coin se détache, esperluette au centre */
export function symbole({ fond = NOIR, glyphe = ORANGE, taille = 100, fragment = true, rayon = 0 } = {}) {
  const s = taille, c = s * 0.3, d = s * 0.07;
  const corps = fragment
    ? `<path d="M0 0H${s}V${s - c}L${s - c} ${s}H0Z" fill="${fond}"${rayon ? ` rx="${rayon}"` : ''}/><polygon points="${s - c + d},${s + d} ${s + d},${s - c + d} ${s + d},${s + d}" fill="${fond}"/>`
    : `<rect width="${s}" height="${s}" fill="${fond}" rx="${rayon}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-d} ${-d} ${s + d * 3} ${s + d * 3}" role="img" aria-label="Symbole BREAK &amp; CREATE" class="symbole">${corps}<text x="${s * 0.5}" y="${s * 0.73}" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-weight="700" font-size="${s * 0.68}" fill="${glyphe}">&amp;</text></svg>`;
}

/* logo secondaire : empilé sur trois lignes, pour les formats carrés et verticaux */
export function logoEmpile({ couleur = NOIR, accent = ORANGE, taille = 100 } = {}) {
  const fs = taille, h = id('h'), b = id('b');
  const texte = (t, y, coul, x = fs * 2.1) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-weight="700" font-size="${fs}" letter-spacing="${-fs * 0.03}" fill="${coul}">${t}</text>`;
  const y1 = fs * 0.93, y2 = fs * 1.93, y3 = fs * 2.93;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 ${-fs * 0.1} ${fs * 4.2} ${fs * 3.35}" role="img" aria-label="BREAK &amp; CREATE" class="logo logo-empile">
    <defs><clipPath id="${h}"><polygon points="0,${-fs * 0.2} ${fs * 4.2},${-fs * 0.2} ${fs * 4.2},${fs * 0.5} 0,${fs * 0.62}"/></clipPath><clipPath id="${b}"><polygon points="0,${fs * 0.62} ${fs * 4.2},${fs * 0.5} ${fs * 4.2},${fs * 1.2} 0,${fs * 1.2}"/></clipPath></defs>
    <g clip-path="url(#${h})" transform="translate(${fs * 0.07} ${-fs * 0.035})">${texte('BREAK', y1, couleur)}</g><g clip-path="url(#${b})">${texte('BREAK', y1, couleur)}</g>
    ${texte('&amp;', y2, accent)}${texte('CREATE', y3, couleur)}</svg>`;
}

/* ---------- système graphique ---------- */
/* blocs fragmentés : une grille de blocs dont certains sont tranchés en diagonale et décalés */
export function fragments({ colonnes = 6, lignes = 4, taille = 60, ecart = 8, couleur = NOIR, accent = ORANGE, graine = 3 } = {}) {
  let g = graine;
  const alea = () => { g = (g * 9301 + 49297) % 233280; return g / 233280; };
  const w = colonnes * (taille + ecart) - ecart, h = lignes * (taille + ecart) - ecart;
  let out = '';
  for (let l = 0; l < lignes; l++) for (let c = 0; c < colonnes; c++) {
    const x = c * (taille + ecart), y = l * (taille + ecart), r = alea();
    const coul = r > 0.92 ? accent : couleur;
    if (r > 0.55 && r < 0.8) {
      const d = 4 + Math.round(alea() * 8);
      out += `<polygon points="${x},${y} ${x + taille},${y} ${x + taille},${y + taille * 0.35} ${x},${y + taille * 0.65}" fill="${coul}" transform="translate(${d} ${-d * 0.6})"/><polygon points="${x},${y + taille * 0.65} ${x + taille},${y + taille * 0.35} ${x + taille},${y + taille} ${x},${y + taille}" fill="${coul}"/>`;
    } else if (r >= 0.86 && r <= 0.92) {
      out += '';
    } else out += `<rect x="${x}" y="${y}" width="${taille}" height="${taille}" fill="${coul}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 ${w + 24} ${h + 24}" class="fragments" aria-hidden="true">${out}</svg>`;
}

/* trace : un geste de pinceau large, aux bords irréguliers mais nets (pas de dégradé) */
export function trace({ couleur = ORANGE, largeur = 600, hauteur = 120, graine = 7 } = {}) {
  let g = graine; const alea = () => { g = (g * 9301 + 49297) % 233280; return g / 233280; };
  const n = 14; let haut = '', bas = '';
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * largeur;
    haut += `${i ? 'L' : 'M'}${x.toFixed(1)} ${(hauteur * (0.28 + alea() * 0.18) - (i === 0 || i === n ? 0 : 0)).toFixed(1)} `;
  }
  for (let i = n; i >= 0; i--) { const x = (i / n) * largeur; bas += `L${x.toFixed(1)} ${(hauteur * (0.62 + alea() * 0.2)).toFixed(1)} `; }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${largeur} ${hauteur}" class="trace" aria-hidden="true" preserveAspectRatio="none"><path d="${haut}${bas}Z" fill="${couleur}"/></svg>`;
}

/* éclaboussure contrôlée : un noyau et quelques gouttes, toujours d'une seule couleur */
export function eclaboussure({ couleur = ORANGE, taille = 160, graine = 11 } = {}) {
  let g = graine; const alea = () => { g = (g * 9301 + 49297) % 233280; return g / 233280; };
  const c = taille / 2; let d = '';
  const pts = 18;
  for (let i = 0; i < pts; i++) {
    const a = (i / pts) * Math.PI * 2, r = c * (0.42 + alea() * 0.22);
    d += `${i ? 'L' : 'M'}${(c + Math.cos(a) * r).toFixed(1)} ${(c + Math.sin(a) * r).toFixed(1)} `;
  }
  let gouttes = '';
  for (let i = 0; i < 6; i++) { const a = alea() * Math.PI * 2, r = c * (0.7 + alea() * 0.28), rr = 3 + alea() * 9; gouttes += `<circle cx="${(c + Math.cos(a) * r).toFixed(1)}" cy="${(c + Math.sin(a) * r).toFixed(1)}" r="${rr.toFixed(1)}" fill="${couleur}"/>`; }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${taille} ${taille}" class="eclaboussure" aria-hidden="true"><path d="${d}Z" fill="${couleur}"/>${gouttes}</svg>`;
}

/* séquence BREAK → CREATE : forme structurée, rupture, fragmentation, recomposition, création */
export function sequence({ couleur = NOIR, accent = ORANGE, taille = 120 } = {}) {
  const s = taille, etapes = [];
  etapes.push(`<rect width="${s}" height="${s}" fill="${couleur}"/>`);
  etapes.push(`<polygon points="0,0 ${s},0 ${s},${s * 0.4} 0,${s * 0.6}" fill="${couleur}" transform="translate(4 -3)"/><polygon points="0,${s * 0.6} ${s},${s * 0.4} ${s},${s} 0,${s}" fill="${couleur}"/>`);
  etapes.push(`<polygon points="0,0 ${s * 0.55},0 ${s * 0.5},${s * 0.45} 0,${s * 0.6}" fill="${couleur}" transform="translate(-8 -6)"/><polygon points="${s * 0.55},0 ${s},0 ${s},${s * 0.4} ${s * 0.5},${s * 0.45}" fill="${couleur}" transform="translate(10 -8)"/><polygon points="0,${s * 0.6} ${s * 0.5},${s * 0.45} ${s * 0.45},${s}" fill="${couleur}" transform="translate(-6 8)"/><polygon points="${s * 0.5},${s * 0.45} ${s},${s * 0.4} ${s},${s} ${s * 0.45},${s}" fill="${accent}" transform="translate(8 6)"/>`);
  etapes.push(`<polygon points="0,${s * 0.15} ${s * 0.55},0 ${s * 0.5},${s * 0.45} 0,${s * 0.6}" fill="${couleur}"/><polygon points="${s * 0.55},0 ${s},${s * 0.12} ${s},${s * 0.4} ${s * 0.5},${s * 0.45}" fill="${couleur}"/><polygon points="0,${s * 0.6} ${s * 0.5},${s * 0.45} ${s * 0.45},${s} ${s * 0.05},${s * 0.9}" fill="${couleur}"/><polygon points="${s * 0.5},${s * 0.45} ${s},${s * 0.4} ${s * 0.95},${s * 0.92} ${s * 0.45},${s}" fill="${accent}"/>`);
  etapes.push(`<circle cx="${s / 2}" cy="${s / 2}" r="${s / 2}" fill="${accent}"/><text x="${s / 2}" y="${s * 0.72}" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-weight="700" font-size="${s * 0.62}" fill="${couleur}">&amp;</text>`);
  return etapes.map((e, i) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-14 -14 ${s + 28} ${s + 28}" class="sequence-etape" aria-hidden="true" data-etape="${i + 1}">${e}</svg>`);
}

/* hachures diagonales : texture de fond, jamais sur du texte */
export function hachures({ couleur = ORANGE, largeur = 400, hauteur = 200, pas = 14, epaisseur = 3 } = {}) {
  let l = '';
  for (let x = -hauteur; x < largeur + hauteur; x += pas) l += `<line x1="${x}" y1="${hauteur}" x2="${x + hauteur}" y2="0" stroke="${couleur}" stroke-width="${epaisseur}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${largeur} ${hauteur}" class="hachures" aria-hidden="true" preserveAspectRatio="none">${l}</svg>`;
}

/* motif « façon QR » : illustratif, déterministe ; le vrai code est généré au moment de l'impression */
export function faussQr({ taille = 120, modules = 21, couleur = NOIR, graine = 5 } = {}) {
  let g = graine; const alea = () => { g = (g * 9301 + 49297) % 233280; return g / 233280; };
  const m = taille / modules; let out = '';
  const oeil = (x, y) => `<rect x="${x * m}" y="${y * m}" width="${m * 7}" height="${m * 7}" fill="${couleur}"/><rect x="${(x + 1) * m}" y="${(y + 1) * m}" width="${m * 5}" height="${m * 5}" fill="#fff"/><rect x="${(x + 2) * m}" y="${(y + 2) * m}" width="${m * 3}" height="${m * 3}" fill="${couleur}"/>`;
  for (let y = 0; y < modules; y++) for (let x = 0; x < modules; x++) {
    const dansOeil = (x < 8 && y < 8) || (x >= modules - 8 && y < 8) || (x < 8 && y >= modules - 8);
    if (!dansOeil && alea() > 0.55) out += `<rect x="${x * m}" y="${y * m}" width="${m}" height="${m}" fill="${couleur}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${taille} ${taille}" class="faux-qr" aria-label="Emplacement du QR code (motif illustratif)"><rect width="${taille}" height="${taille}" fill="#fff"/>${out}${oeil(0, 0)}${oeil(modules - 7, 0)}${oeil(0, modules - 7)}</svg>`;
}

/* ---------- planche ---------- */
export function planche({ section, titre, sur = '', corps, classe = '', sombre = false, sansTitre = false }) {
  return `<section class="planche ${sombre ? 'planche--sombre' : ''} ${classe}" data-section="${echapper(section)}">
  <header class="planche-tete"><span class="planche-section">${echapper(section)}</span><span class="planche-marque">BREAK &amp; CREATE · Charte graphique</span><span class="planche-num" data-num></span></header>
  ${sansTitre ? '' : `<div class="planche-titre">${sur ? `<p class="planche-sur">${sur}</p>` : ''}<h2>${titre}</h2></div>`}
  <div class="planche-corps">${corps}</div>
</section>`;
}

/* ---------- MÉTHODE AURA : lockup horizontal (marque tracée + MÉTHODE en Sora 300, AURA en Sora 800) ----------
   Reproduit le fichier lockup_horizontal_white du studio ; couleurs autorisées par sa charte : Ivoire #F5F2EA ou Obsidienne #0B0B0D. */
const MARQUE_AURA = `<path d="M2964 4857 c-56 -95 -147 -251 -204 -347 -56 -96 -134 -229 -173 -295 -39 -66 -104 -176 -145 -245 -345 -572 -428 -709 -487 -805 -70 -113 -372 -612 -800 -1320 -132 -220 -346 -573 -474 -785 -180 -297 -536 -888 -568 -942 -2 -5 238 -8 534 -7 l538 0 67 102 c293 449 599 924 935 1452 128 201 678 1085 868 1395 76 124 190 308 253 410 64 102 127 205 142 230 15 25 68 112 119 193 80 131 89 151 79 170 -6 12 -56 96 -111 187 -55 91 -121 201 -147 245 -26 44 -91 152 -145 240 -54 88 -115 188 -136 223 -20 35 -39 65 -41 67 -2 2 -49 -73 -104 -168z"/><path d="M5206 4913 c-38 -60 -86 -135 -106 -168 -20 -33 -89 -143 -152 -245 -63 -102 -149 -241 -191 -310 -45 -72 -75 -131 -72 -139 3 -8 95 -164 204 -346 180 -301 334 -560 721 -1210 75 -126 170 -286 210 -355 40 -69 116 -199 170 -290 53 -91 134 -230 180 -310 46 -80 111 -192 145 -250 34 -58 80 -136 102 -175 118 -208 475 -814 531 -902 l64 -103 569 0 c313 0 569 4 569 8 0 10 -107 198 -225 397 -46 77 -154 262 -241 410 -86 149 -193 331 -237 405 -141 240 -211 359 -412 705 -109 187 -219 376 -245 420 -244 418 -508 869 -675 1155 -111 190 -245 419 -297 510 -325 564 -525 900 -537 900 -4 0 -38 -48 -75 -107z"/><path d="M4099 2337 c-36 -56 -100 -154 -141 -217 -41 -63 -121 -187 -178 -275 -56 -88 -123 -190 -147 -228 -74 -115 -76 -94 22 -268 48 -85 109 -190 135 -234 26 -44 82 -143 125 -220 109 -194 245 -436 334 -592 42 -72 84 -145 93 -162 l17 -31 576 0 c316 0 575 3 575 6 0 8 -114 218 -185 339 -29 50 -78 135 -110 190 -160 277 -465 803 -525 905 -37 63 -109 187 -160 275 -52 88 -139 237 -195 330 -56 94 -116 196 -134 228 -18 31 -33 57 -34 57 -1 0 -32 -46 -68 -103z"/>`;
export function logoAura({ couleur = '#0B0B0D' } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1240 300" role="img" aria-label="MÉTHODE AURA" class="logo-aura">
    <g transform="translate(0 0) scale(0.6104)"><g transform="translate(-11.314923,502.531334) scale(0.1,-0.1)" fill="${couleur}">${MARQUE_AURA}</g></g>
    <text x="560" y="98" font-family="Sora, Arial, sans-serif" font-weight="300" font-size="72" letter-spacing="14" fill="${couleur}">MÉTHODE</text>
    <text x="552" y="280" font-family="Sora, Arial, sans-serif" font-weight="800" font-size="196" letter-spacing="-2" fill="${couleur}">AURA</text>
  </svg>`;
}

export const cmyk = (hex) => {
  const v = parseInt(hex.slice(1), 16), r = ((v >> 16) & 255) / 255, g = ((v >> 8) & 255) / 255, b = (v & 255) / 255;
  const k = 1 - Math.max(r, g, b); if (k === 1) return 'C0 M0 J0 N100';
  return `C${Math.round(((1 - r - k) / (1 - k)) * 100)} M${Math.round(((1 - g - k) / (1 - k)) * 100)} J${Math.round(((1 - b - k) / (1 - k)) * 100)} N${Math.round(k * 100)}`;
};
export const rgb = (hex) => { const v = parseInt(hex.slice(1), 16); return `${(v >> 16) & 255} / ${(v >> 8) & 255} / ${v & 255}`; };
const lum = (hex) => { const v = parseInt(hex.slice(1), 16); const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }; return 0.2126 * f((v >> 16) & 255) + 0.7152 * f((v >> 8) & 255) + 0.0722 * f(v & 255); };
export const contraste = (a, b) => { const l1 = lum(a), l2 = lum(b); const r = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); return Math.round(r * 10) / 10; };
