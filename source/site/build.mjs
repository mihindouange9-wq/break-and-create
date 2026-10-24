/* BREAK & CREATE — génère site/index.html à partir de donnees.mjs. Lancer : node source/site/build.mjs */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marque, experiences, formatFcfa, scenes, photos } from './donnees.mjs';
import { motSymbole, symbole, sequence, fragments, trace, eclaboussure, hachures, logoAura } from '../lib.mjs';
const motif = (svg, classe, anim) => `<div class="motif ${classe}" data-motif="${anim}" aria-hidden="true">${svg}</div>`;

const ICI = dirname(fileURLToPath(import.meta.url));
const SITE = join(ICI, '..', '..', 'site');
const e = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const credits = JSON.parse(await readFile(join(SITE, 'assets', 'img', 'credits.json'), 'utf8'));

/* image réactive : WebP 1600 / 800, repli JPEG, chargement différé sauf demande */
const image = (nom, { classe = '', eager = false, tailles = '(max-width: 760px) 100vw, 60vw' } = {}) => `<picture class="${classe}"><source type="image/webp" srcset="assets/img/${nom}-800.webp 800w, assets/img/${nom}-1600.webp 1600w" sizes="${tailles}"><img src="assets/img/${nom}.jpg" alt="${e(photos[nom] || '')}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}></picture>`;

/* séparation d'un titre en mots et lettres pour l'animation, avec le texte lisible pour les lecteurs d'écran */
const lettres = (texte, classeMot = 'mot') => `<span class="visuellement-cache">${e(texte)}</span><span aria-hidden="true">${texte.split(' ').map((m) => `<span class="${classeMot}">${[...m].map((c) => `<span class="car">${e(c)}</span>`).join('')}</span>`).join(' ')}</span>`;
const lignes = (liste) => liste.map((l) => `<span class="ligne"><span>${e(l)}</span></span>`).join('');

const seq = sequence({ couleur: '#FFFFFF', accent: '#FF5A1F', taille: 120 });
const lienWhatsapp = (texte) => `https://wa.me/${marque.whatsapp}?text=${encodeURIComponent(texte)}`;

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>BREAK &amp; CREATE — Paint Room et Release Room à Libreville</title>
<meta name="description" content="Break &amp; Create, à Akanda (Libreville) : peindre ta toile dans le Paint Room, tout lâcher dans le Release Room. Paint &amp; Chill, Paint Date, Paint Party, Release Session. Réservation WhatsApp, tarifs en FCFA.">
<meta name="theme-color" content="#171717">
<meta property="og:title" content="BREAK &amp; CREATE — Break the routine. Create the moment.">
<meta property="og:description" content="Destination d’expériences créatives et immersives à Libreville : Paint Room et Release Room.">
<meta property="og:image" content="https://break-and-create.onrender.com/assets/img/hero-visage-1600.webp">
<meta property="og:url" content="https://break-and-create.onrender.com/">
<link rel="canonical" href="https://break-and-create.onrender.com/">
<meta property="og:locale" content="fr_GA">
<link rel="preload" as="image" imagesrcset="assets/img/hero-visage-800.webp 800w, assets/img/hero-visage-1600.webp 1600w" imagesizes="(max-width: 760px) 100vw, 50vw">
<link rel="stylesheet" href="assets/css/site.css">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
</head>
<body>
<a class="evitement" href="#experiences">Aller aux expériences</a>

<div class="rideau" id="rideau" aria-hidden="true">
  <div class="rideau-mot">${motSymbole({ couleur: '#FFFFFF', taille: 100 })}</div>
</div>

<header class="entete" id="entete">
  <a class="entete-marque" href="#haut" aria-label="BREAK &amp; CREATE, retour en haut">${symbole({ taille: 100 })}<span>BREAK &amp; CREATE</span></a>
  <nav class="entete-nav" aria-label="Sections">
    <a href="#experiences" data-curseur="VOIR">Expériences</a>
    <a href="#pourquoi" data-curseur="LIRE">Pourquoi</a>
    <a href="#libreville" data-curseur="VENIR">Libreville</a>
    <a href="#tarifs" data-curseur="FCFA">Tarifs</a>
  </nav>
  <a class="bouton bouton--orange bouton--petit" href="#reserver" data-magnetique data-curseur="RÉSERVER">Réserver</a>
  <button class="entete-menu" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="menu" data-menu><span></span><span></span></button>
</header>
<div class="menu" id="menu" hidden>
  <nav aria-label="Menu">
    <a href="#experiences">Expériences</a><a href="#create">Paint Room</a><a href="#release">Release Room</a><a href="#pourquoi">Pourquoi</a><a href="#libreville">Libreville</a><a href="#tarifs">Tarifs</a><a href="#reserver">Réserver</a>
  </nav>
  <p class="menu-pied">${e(marque.slogan)}<br><a href="https://instagram.com/${e(marque.instagram)}" rel="noopener" target="_blank">Instagram</a> · <a href="${lienWhatsapp('Bonjour Break & Create')}" rel="noopener" target="_blank">WhatsApp</a></p>
</div>

<div class="curseur" aria-hidden="true"><span class="curseur-point"></span><span class="curseur-mot"></span></div>

<main id="haut">
  <!-- SCÈNE 01 — BREAK -->
  <section class="scene heros" id="break" data-fond="noir" aria-labelledby="titre-heros">
    ${motif(fragments({"colonnes":6,"lignes":4,"taille":60,"ecart":9,"couleur":"#FFFFFF","accent":"#FF5A1F","graine":9}), 'motif--heros', 'eclate')}
    <h1 id="titre-heros" class="heros-titre">
      <span class="heros-break" data-fracture><span class="visuellement-cache">Break</span><span class="fracture" aria-hidden="true"><span class="fracture-haut">BREAK</span><span class="fracture-bas">BREAK</span></span></span>
      <span class="heros-amp" aria-hidden="true">&amp;</span>
      <span class="heros-create"><span class="visuellement-cache">Create</span><span aria-hidden="true">${[...'CREATE'].map((c) => `<span class="car">${c}</span>`).join('')}</span></span>
    </h1>
    <div class="heros-photo" data-parallaxe="0.12">${image('hero-visage', { eager: true, tailles: '(max-width: 760px) 100vw, 46vw' })}</div>
    <p class="heros-question" data-reveal>${e(scenes.hero.question)}</p>
    <div class="heros-actions" data-reveal>
      <a class="bouton bouton--orange" href="#step-out" data-magnetique data-curseur="ENTRER">${e(scenes.hero.cta)}</a>
      <span class="heros-lieu">${e(marque.quartier)} · ${e(marque.ville)}</span>
    </div>
    <p class="heros-indice" aria-hidden="true"><span>Défiler</span><i></i></p>
  </section>

  <!-- SCÈNE 02 — STEP OUT -->
  <section class="scene step-out" id="step-out" data-fond="noir" aria-labelledby="titre-step-out">
    <div class="step-out-pin">
      <p class="scene-num">01 · Break</p>
      <h2 id="titre-step-out" class="step-out-lignes">${lignes(scenes.stepOut.lignes)}</h2>
      <p class="step-out-note" data-reveal>${e(scenes.stepOut.note)}</p>
      <div class="step-out-photo" data-masque>${image('casse-masse-nb', { tailles: '(max-width: 760px) 80vw, 34vw' })}</div>
      ${motif(trace({"couleur":"#FF5A1F","largeur":1600,"hauteur":90,"graine":7}), 'motif--trace-step', 'trace')}
    </div>
  </section>

  <!-- SCÈNE 03 — PLAY : les expériences -->
  <section class="scene experiences" id="experiences" data-fond="blanc" aria-labelledby="titre-experiences">
    ${motif(fragments({"colonnes":5,"lignes":3,"taille":60,"ecart":9,"couleur":"#171717","accent":"#FF5A1F","graine":21}), 'motif--exp', 'eclate')}
    <div class="experiences-tete">
      <p class="scene-num">02 · Play</p>
      <h2 id="titre-experiences" class="titre-scene">${lettres('Choisis ton expérience')}</h2>
      <p class="experiences-aide" data-reveal>Sept façons de casser la routine. Passe la souris, ou fais défiler.</p>
    </div>
    <div class="experiences-piste" data-piste>
      ${experiences.map((x) => `
      <article class="experience experience--${x.univers}" id="exp-${x.id}" data-curseur="${e(x.curseur)}">
        <div class="experience-visuel" aria-hidden="true">${image(x.photo, { tailles: '(max-width: 760px) 100vw, 34vw' })}</div>
        <span class="experience-num">${x.numero}</span>
        <h3 class="experience-nom">${e(x.nom)}</h3>
        <p class="experience-accroche">${e(x.accroche)}</p>
        <p class="experience-infos"><span>${e(x.duree)}</span><span>${formatFcfa(x.prix)} <small>${e(x.unite)}</small></span></p>
        <p class="experience-texte"><span>${e(x.texte)}</span></p>
        <a class="experience-lien" href="#reserver" data-experience="${x.id}">Réserver ${x.nom === 'Break & Create' ? 'la formule' : e(x.nom)} <i aria-hidden="true">→</i></a>
      </article>`).join('')}
    </div>
  </section>

  <!-- TRANSITION — le mot CREATE grandit jusqu'à devenir la scène -->
  <section class="scene zoom" id="zoom" data-fond="blanc" aria-hidden="true">
    <div class="zoom-pin">${motif(eclaboussure({"couleur":"#FF5A1F","taille":160,"graine":41}), 'motif--zoom', 'tache')}<p class="zoom-mot">CREATE</p></div>
  </section>

  <!-- SCÈNE 04 — CREATE : Paint Room -->
  <section class="scene create" id="create" data-fond="orange" aria-labelledby="titre-create">
    <div class="create-texte">
      <p class="scene-num">03 · Create · Paint Room</p>
      <h2 id="titre-create" class="titre-scene">${lettres(scenes.create.titre)}</h2>
      ${motif(trace({"couleur":"#171717","largeur":600,"hauteur":70,"graine":19}), 'motif--trace-create', 'trace')}
      <p class="scene-para" data-reveal>${e(scenes.create.texte)}</p>
      <a class="bouton" href="#reserver" data-magnetique data-curseur="PEINDRE">Réserver une toile</a>
    </div>
    ${motif(eclaboussure({"couleur":"#171717","taille":160,"graine":23}), 'motif--create', 'tache')}
    <div class="create-photos">
      <div class="create-photo create-photo--1" data-parallaxe="-0.08">${image('couple-chevalet', { tailles: '(max-width: 760px) 70vw, 30vw' })}</div>
      <div class="create-photo create-photo--2" data-parallaxe="0.1">${image('main-pinceau', { tailles: '(max-width: 760px) 50vw, 22vw' })}</div>
      <div class="create-photo create-photo--3" data-parallaxe="-0.04">${image('femme-denim', { tailles: '(max-width: 760px) 60vw, 26vw' })}</div>
    </div>
  </section>

  <!-- SCÈNE 05 — BREAK : Release Room -->
  <section class="scene release" id="release" data-fond="noir" aria-labelledby="titre-release">
    ${motif(fragments({"colonnes":5,"lignes":4,"taille":60,"ecart":9,"couleur":"#FFFFFF","accent":"#FF5A1F","graine":33}), 'motif--release', 'eclate')}
    ${motif(hachures({"couleur":"#FF5A1F","largeur":600,"hauteur":80,"pas":14,"epaisseur":3}), 'motif--hachures', 'hachures')}
    <div class="release-photo" data-masque>${image('casse-guitare-tv', { tailles: '(max-width: 760px) 100vw, 56vw' })}</div>
    <div class="release-texte">
      <p class="scene-num">04 · Break · Release Room</p>
      <h2 id="titre-release" class="titre-scene">${lettres(scenes.release.titre)}</h2>
      <p class="scene-para" data-reveal>${e(scenes.release.texte)}</p>
      <ul class="release-mots" aria-label="Ce qu’on y fait">${scenes.release.mots.map((m) => `<li>${e(m)}</li>`).join('')}</ul>
      <a class="bouton bouton--orange" href="#reserver" data-magnetique data-curseur="LÂCHER">Réserver une Release Session</a>
    </div>
    <div class="release-detail" data-parallaxe="0.06">${image('casse-marteau-detail', { tailles: '(max-width: 760px) 50vw, 22vw' })}</div>
  </section>

  <!-- SCÈNE 06 — SHARE -->
  <section class="scene share" id="share" data-fond="blanc" aria-labelledby="titre-share">
    <div class="share-tete">
      <p class="scene-num">05 · Share</p>
      <h2 id="titre-share" class="titre-scene">${lettres(scenes.share.titre)}</h2>
      <p class="scene-para" data-reveal>${e(scenes.share.texte)}</p>
    </div>
    <div class="galerie" data-galerie aria-label="Photos partagées par les visiteurs">
      <div class="galerie-piste">
        ${['visages-duo', 'couple-etreinte', 'mains-peinture', 'homme-palette', 'visage-pinceaux', 'femme-toile', 'casse-marteau-geste', 'groupe-atelier'].map((p) => `<figure class="galerie-photo">${image(p, { tailles: '(max-width: 760px) 70vw, 30vw' })}</figure>`).join('')}
      </div>
    </div>
    <div class="share-pied">${motif(trace({"couleur":"#FF5A1F","largeur":900,"hauteur":80,"graine":3}), 'motif--trace-share', 'trace')}<p class="share-hashtag" aria-hidden="true">${e(scenes.share.hashtag)}</p></div>
  </section>

  <!-- SCÈNE 07 — REMEMBER : pourquoi -->
  <section class="scene pourquoi" id="pourquoi" data-fond="noir" aria-labelledby="titre-pourquoi">
    <div class="pourquoi-tete">
      <p class="scene-num">06 · Remember</p>
      <h2 id="titre-pourquoi" class="titre-scene">${lettres(scenes.pourquoi.titre)}</h2>
      <div class="sequence" aria-hidden="true">${seq.join('')}</div>
    </div>
    <ol class="pourquoi-liste">
      ${scenes.pourquoi.points.map(([n, t, d]) => `<li data-reveal><span class="pourquoi-num">${n}</span><h3>${e(t)}</h3><p>${e(d)}</p></li>`).join('')}
    </ol>
  </section>

  <!-- SCÈNE 08 — LIBREVILLE -->
  <section class="scene libreville" id="libreville" data-fond="blanc" aria-labelledby="titre-libreville">
    <p class="libreville-geant" aria-hidden="true" data-defilement-x><span>LIBREVILLE</span><span>LIBREVILLE</span></p>
    ${motif(eclaboussure({"couleur":"#FF5A1F","taille":160,"graine":11}), 'motif--libreville', 'tache')}
    <div class="libreville-corps">
      <div>
        <p class="scene-num">07 · Ici</p>
        <h2 id="titre-libreville" class="titre-scene">${lettres(scenes.libreville.sousTitre)}</h2>
        <p class="scene-para" data-reveal>${e(scenes.libreville.texte)}</p>
      </div>
      <dl class="infos" data-reveal>
        <div><dt>Adresse</dt><dd>${e(marque.adresse)}</dd></div>
        <div><dt>Horaires${marque.horairesAConfirmer ? ' <small>(à confirmer)</small>' : ''}</dt><dd>${marque.horaires.map(([j, h]) => `<span>${e(j)}</span><span>${e(h)}</span>`).join('')}</dd></div>
        <div><dt>Contact</dt><dd><a href="${lienWhatsapp('Bonjour Break & Create')}" rel="noopener" target="_blank">WhatsApp</a> · <a href="mailto:${e(marque.email)}">${e(marque.email)}</a> · <a href="https://instagram.com/${e(marque.instagram)}" rel="noopener" target="_blank">@${e(marque.instagram)}</a></dd></div>
      </dl>
    </div>
    <div class="libreville-photo" data-parallaxe="0.08">${image('homme-tablier-sourire', { tailles: '(max-width: 760px) 80vw, 28vw' })}</div>
  </section>

  <!-- SCÈNE 09 — TARIFS -->
  <section class="scene tarifs" id="tarifs" data-fond="blanc" aria-labelledby="titre-tarifs">
    <div class="tarifs-tete">
      <p class="scene-num">08 · Tarifs</p>
      <h2 id="titre-tarifs" class="titre-scene">${lettres('Les tarifs')}</h2>
      <p class="scene-para" data-reveal>Toile, matériel, tablier et animateur compris. Boissons et snacks en supplément, au bar. Paiement Mobile Money ou sur place.</p>
    </div>
    <ul class="tarifs-liste">
      ${experiences.map((x) => `<li class="tarif" data-reveal><span class="tarif-num">${x.numero}</span><span class="tarif-nom">${e(x.nom)}<small>${e(x.duree)}</small></span><span class="tarif-prix">${formatFcfa(x.prix)}<small>${e(x.unite)}</small></span><a class="tarif-lien" href="#reserver" data-experience="${x.id}" data-curseur="RÉSERVER">Réserver</a></li>`).join('')}
    </ul>
    <p class="tarifs-note" data-reveal>Groupes de plus de 20 personnes, entreprises et privatisations : sur devis. Enfants à partir de 8 ans accompagnés dans le Paint Room ; Release Room à partir de 16 ans.</p>
  </section>

  <!-- SCÈNE 10 — RÉSERVER -->
  <section class="scene reserver" id="reserver" data-fond="orange" aria-labelledby="titre-reserver">
    ${motif(fragments({"colonnes":5,"lignes":4,"taille":60,"ecart":9,"couleur":"#171717","accent":"#171717","graine":44}), 'motif--reserver', 'eclate')}
    <div class="reserver-texte">
      <p class="scene-num">09 · Book your break</p>
      <h2 id="titre-reserver" class="titre-scene">${lettres(scenes.reserver.titre)}</h2>
      <p class="scene-para" data-reveal>${e(scenes.reserver.texte)}</p>
    </div>
    <form class="formulaire" data-formulaire data-whatsapp="${e(marque.whatsapp)}" data-email="${e(marque.email)}">
      <label class="champ"><span>Expérience</span><select name="experience" required>${experiences.map((x) => `<option value="${x.id}">${e(x.nom)} · ${formatFcfa(x.prix)} ${e(x.unite)}</option>`).join('')}</select></label>
      <div class="champ-2">
        <label class="champ"><span>Date souhaitée</span><input type="date" name="date" required></label>
        <label class="champ"><span>Personnes</span><input type="number" name="personnes" min="1" max="40" value="2" required></label>
      </div>
      <div class="champ-2">
        <label class="champ"><span>Prénom</span><input type="text" name="prenom" autocomplete="given-name" required></label>
        <label class="champ"><span>Téléphone</span><input type="tel" name="telephone" autocomplete="tel" placeholder="+241 …" required></label>
      </div>
      <label class="champ"><span>Un mot (facultatif)</span><input type="text" name="mot" maxlength="140" placeholder="Anniversaire, thème, question…"></label>
      <div class="formulaire-actions">
        <button class="bouton" type="submit" data-magnetique data-curseur="ENVOYER">Envoyer sur WhatsApp</button>
        <p class="formulaire-note">Réponse dans la journée. Aucune donnée n’est stockée : le message part directement de ton téléphone.</p>
      </div>
      <p class="formulaire-etat" aria-live="polite" data-etat></p>
    </form>
  </section>
</main>

<!-- DERNIÈRE SCÈNE — pied de page -->
<footer class="pied" id="pied" data-fond="noir">
  ${motif(fragments({"colonnes":6,"lignes":3,"taille":60,"ecart":9,"couleur":"#FFFFFF","accent":"#FF5A1F","graine":51}), 'motif--pied', 'eclate')}
  <div class="pied-marque" aria-hidden="true">${motSymbole({ couleur: '#FFFFFF', taille: 100 })}</div>
  <p class="pied-slogan">${e(marque.slogan)}</p>
  <div class="pied-colonnes">
    <div><h3>Venir</h3><p>${e(marque.quartier)}, ${e(marque.ville)}<br>${e(marque.adresse)}</p></div>
    <div><h3>Horaires</h3><p>${marque.horaires.map(([j, h]) => `${e(j)} · ${e(h)}`).join('<br>')}${marque.horairesAConfirmer ? '<br><small>Horaires à confirmer à l’ouverture.</small>' : ''}</p></div>
    <div><h3>Contact</h3><p><a href="${lienWhatsapp('Bonjour Break & Create')}" rel="noopener" target="_blank">WhatsApp</a><br><a href="mailto:${e(marque.email)}">${e(marque.email)}</a><br><a href="https://instagram.com/${e(marque.instagram)}" rel="noopener" target="_blank">Instagram @${e(marque.instagram)}</a></p></div>
    <div><h3>Réserver</h3><p><a href="#reserver">Choisir une expérience</a><br><a href="#tarifs">Voir les tarifs</a></p></div>
  </div>
  <section class="collab" aria-labelledby="collab-titre">
    <p class="collab-sur" id="collab-titre">Une collaboration</p>
    <div class="collab-lockup">
      <div class="collab-bc">${motSymbole({ couleur: '#FFFFFF', taille: 100 })}</div>
      <span class="collab-croix" aria-hidden="true">×</span>
      <a class="collab-aura" href="https://methode-aura.onrender.com" rel="noopener" target="_blank" data-curseur="AURA">${logoAura({ couleur: '#F5F2EA' })}</a>
    </div>
    <p class="collab-texte">BREAK &amp; CREATE × MÉTHODE AURA. Identité visuelle, charte graphique et site conçus et réalisés par <a href="https://methode-aura.onrender.com" rel="noopener" target="_blank">MÉTHODE AURA</a>, studio de marque. <span class="collab-slogan">Du concept à l’impact.</span></p>
  </section>
  <div class="pied-bas">
    <p>© 2026 BREAK &amp; CREATE · ${e(marque.quartier)}, Gabon · <a href="#credits" data-credits>Crédits photos</a></p>
    <a class="pied-haut" href="#haut" data-curseur="HAUT">Remonter ↑</a>
  </div>
  <details class="credits" id="credits">
    <summary>Crédits photos</summary>
    <p>Photographies libres de droits (licence Pexels), utilisées pour illustrer le concept avant la première séance photo du lieu. ${Object.entries(credits).map(([nom, c]) => `<a href="${e(c.page)}" rel="noopener" target="_blank">${e(nom)}</a>`).join(' · ')}</p>
  </details>
</footer>

<script src="assets/vendor/gsap.min.js" defer></script>
<script src="assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="assets/vendor/lenis.min.js" defer></script>
<script src="assets/js/app.js" defer></script>
</body>
</html>`;
await writeFile(join(SITE, 'index.html'), html);
console.log('site/index.html généré :', experiences.length, 'expériences,', Object.keys(credits).length, 'photos');
