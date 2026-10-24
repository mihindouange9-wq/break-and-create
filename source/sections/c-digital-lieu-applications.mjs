/* 07 Digital, 08 Physical experience, 09 Brand applications, 10 Do / Don't, fin. */
import { planche, motSymbole, symbole, logoEmpile, fragments, trace, eclaboussure, sequence, hachures, faussQr, logoAura, NOIR, ORANGE, BLANC } from '../lib.mjs';

const S7 = '07 — Digital', S8 = '08 — Physical experience', S9 = '09 — Brand applications', S10 = '10 — Do / Don’t';

const post = ({ classe = 'post--noir', etiquette, titre, sous, motif = 'fragments', graine = 5 }) => {
  const clair = classe === 'post--noir';
  const m = motif === 'fragments' ? fragments({ colonnes: 5, lignes: 5, taille: 60, ecart: 9, couleur: clair ? BLANC : NOIR, accent: clair ? ORANGE : (classe === 'post--orange' ? NOIR : ORANGE), graine })
    : motif === 'eclaboussure' ? eclaboussure({ couleur: classe === 'post--orange' ? NOIR : ORANGE, graine })
      : motif === 'trace' ? trace({ couleur: classe === 'post--orange' ? NOIR : ORANGE, graine }) : '';
  return `<div class="post ${classe}">${m}<span class="etiquette-post">${etiquette}</span><p class="titre-post">${titre}</p>${sous ? `<p class="sous-post">${sous}</p>` : ''}${symbole({ fond: classe === 'post--orange' ? NOIR : ORANGE, glyphe: classe === 'post--orange' ? ORANGE : NOIR, taille: 100 })}</div>`;
};

export default function () {
  const planches = [];

  /* 07 — réseaux : système */
  planches.push(planche({ section: S7, titre: 'Réseaux sociaux : reconnaissable sans le logo', sur: 'Instagram, TikTok, Facebook, WhatsApp', corps: `
    <div class="grille-2-1">
      <div class="grille-2" style="gap:18px;max-width:690px;align-content:start">
        ${post({ etiquette: 'NOUVEAU', titre: 'Paint<br>Theme', sous: 'Chaque jeudi, un thème imposé. Cette semaine : la ville la nuit.' })}
        ${post({ classe: 'post--orange', etiquette: 'ÉVÉNEMENT', titre: 'Release<br>Session', sous: 'Samedi 20 h. Casque fourni.', motif: 'eclaboussure', graine: 41 })}
        ${post({ classe: 'post--blanc', etiquette: 'PROMOTION', titre: '2 toiles,<br>1 prix', sous: 'Paint Date, tous les vendredis.', motif: 'trace', graine: 3 })}
        ${post({ etiquette: 'ANNIVERSAIRE', titre: 'Ta fête,<br>ta toile', sous: 'Formule groupe de 6 à 20 personnes.', motif: 'fragments', graine: 17 })}
      </div>
      <div class="colonne">
        <div class="bloc" style="flex:1">
          <h3>Le système</h3>
          <ul class="liste">
            <li><b>Trois fonds</b> : noir (par défaut), orange (temps forts), blanc (informations, tarifs).</li>
            <li><b>Une étiquette</b> en haut à gauche, Space Grotesk 700, 12 à 14 px : NOUVEAU, ÉVÉNEMENT, PROMOTION, ANNIVERSAIRE, RÉSERVATION, PAINT DATE, PAINT PARTY, RELEASE SESSION, CARTE CADEAU.</li>
            <li><b>Un titre</b> de deux à quatre mots, en bas à gauche, sur deux lignes.</li>
            <li><b>Un élément graphique</b> dans l’angle opposé au titre.</li>
            <li><b>Le symbole</b> en bas à droite, à la place du logo complet.</li>
          </ul>
          <p class="note">Un visuel photo suit les mêmes règles : la photo remplace le fond, le titre se pose dans la zone calme, le symbole reste en bas à droite.</p>
        </div>
      </div>
    </div>` }));

  /* 07 — story, reel, profil */
  planches.push(planche({ section: S7, titre: 'Stories, Reels et profil', corps: `
    <div class="grille-4">
      <div class="story post--noir story--noir">${fragments({ colonnes: 4, lignes: 4, taille: 60, ecart: 9, couleur: BLANC, graine: 8 })}<div class="barre-story"><i></i><i></i><i></i></div><span class="etiquette-post" style="top:30px;color:#fff">RÉSERVATION</span><p class="titre-post" style="color:#fff">Il reste<br>4 places<br>ce soir</p><p class="sous-post" style="color:#fff">Paint &amp; Chill · 19 h · lien en bio</p></div>
      <div class="story post--orange story--orange">${trace({ couleur: NOIR, graine: 29 })}<div class="barre-story"><i></i><i></i><i></i></div><span class="etiquette-post" style="top:30px">CARTE CADEAU</span><p class="titre-post">Offre<br>une session</p><p class="sous-post">Valable un an, deux univers.</p></div>
      <div class="colonne">
        <div class="bloc" style="flex:1"><h4>Stories et Reels</h4><ul class="liste"><li>Format 9:16, titre dans le tiers inférieur, rien dans les 250 px du haut ni les 300 px du bas (interface).</li><li>Reels : ouverture par la séquence BREAK → CREATE en 1,5 s, puis images réelles ; sous-titres Inter 600 sur bandeau noir.</li><li>Sons : la playlist du lieu, jamais de musique agressive.</li><li>Une story = un message. Le lien de réservation est toujours le dernier écran.</li></ul></div>
      </div>
      <div class="profil">
        <div class="profil-tete">${symbole({ taille: 100 })}<div><p style="font-family:var(--titrage);font-weight:700;font-size:16px">breakandcreate</p><p class="note">BREAK &amp; CREATE · Akanda</p><div class="profil-stats"><span><b>—</b>publications</span><span><b>—</b>abonnés</span></div></div></div>
        <p style="font-size:13px"><b>CREATE. RELEASE. ENJOY.</b><br>Ton espace pour créer, lâcher prise et t’amuser. Paint Room · Release Room<br>Akanda, Gabon · Réservations ↓</p>
        <div class="profil-grille">
          ${post({ etiquette: '', titre: 'Paint Date' })}${post({ classe: 'post--orange', etiquette: '', titre: 'Release', motif: 'eclaboussure', graine: 41 })}${post({ classe: 'post--blanc', etiquette: '', titre: 'Tarifs', motif: 'trace' })}
          ${post({ classe: 'post--blanc', etiquette: '', titre: 'Coulisses', motif: '' })}${post({ etiquette: '', titre: 'Party', motif: 'fragments', graine: 17 })}${post({ classe: 'post--orange', etiquette: '', titre: 'Thème', motif: '' })}
        </div>
        <p class="mockup-legende">Profil : symbole en avatar, slogan principal en première ligne de bio, grille qui alterne les trois fonds et les photos.</p>
      </div>
    </div>` }));

  /* 07 — site */
  planches.push(planche({ section: S7, titre: 'Site internet', sur: 'breakandcreate.ga (nom de domaine à confirmer)', corps: `
    <div class="grille-2-1">
      <div class="site">
        <div class="site-barre"><i></i><i></i><i></i><span>breakandcreate.ga</span></div>
        <div>
          <div class="site-nav">${motSymbole({ taille: 100 })}<ul><li>Paint Room</li><li>Release Room</li><li>Tarifs</li><li>Groupes</li><li><span class="bouton-bc bouton-bc--orange bouton-bc--petit">Réserver</span></li></ul></div>
          <div class="site-heros">${fragments({ colonnes: 5, lignes: 4, taille: 60, ecart: 9, couleur: BLANC, graine: 12 })}<p class="etiquette">Akanda, Gabon</p><p class="enorme" style="color:#fff">Fais ce que tu<br>ne peux pas faire<br>chez toi.</p><p style="max-width:40ch;position:relative">Deux univers, une sortie : peins ta toile dans le Paint Room, lâche tout dans le Release Room.</p><div style="display:flex;gap:10px;position:relative"><span class="bouton-bc bouton-bc--orange">Réserver une session</span><span class="bouton-bc bouton-bc--contour-blanc">Voir les expériences</span></div></div>
          <div class="site-sections"><div class="carte-ui"><span class="pastille-ui">Paint Room</span><h4>Paint &amp; Chill</h4><p style="font-size:13px">90 min · toile 30 × 40</p><p class="prix">15 000 F</p></div><div class="carte-ui carte-ui--noir"><span class="pastille-ui">Release Room</span><h4>Release Session</h4><p style="font-size:13px">20 min · équipement fourni</p><p class="prix">10 000 F</p></div><div class="carte-ui"><span class="pastille-ui">Groupes</span><h4>Paint Party</h4><p style="font-size:13px">6 à 20 pers. · 2 h</p><p class="prix">sur devis</p></div></div>
        </div>
      </div>
      <div class="colonne">
        <div class="bloc" style="flex:1">
          <h3>Principes</h3>
          <ul class="liste">
            <li>Page d’accueil sombre, sections d’information claires : le contraste ordre × chaos à l’échelle du site.</li>
            <li>Un seul bouton orange par écran : réserver. Les autres sont noirs ou en contour.</li>
            <li>Titres Space Grotesk 700, corps Inter 17 px, largeur de lecture 65 caractères.</li>
            <li>Photos réelles dès la deuxième section ; les motifs ne remplacent pas les images du lieu.</li>
            <li>Mobile d’abord : le titre du héros tient en trois lignes à 375 px.</li>
            <li>Réservation en trois étapes, paiement local (Mobile Money) et sur place.</li>
            <li>Tarifs affichés à titre d’exemple dans cette charte.</li>
          </ul>
        </div>
      </div>
    </div>` }));

  /* 07 — composants */
  planches.push(planche({ section: S7, titre: 'Composants d’interface', corps: `
    <div class="grille-3">
      <div class="bloc"><h4>Boutons</h4>
        <div style="display:grid;gap:12px;justify-items:start"><span class="bouton-bc bouton-bc--orange">Réserver une session →</span><span class="bouton-bc">Voir les tarifs</span><span class="bouton-bc bouton-bc--contour">Annuler</span><span class="bouton-bc bouton-bc--petit bouton-bc--orange">Petit bouton</span></div>
        <p class="note">Angles droits (rayon 4 px au plus), Space Grotesk 700, hauteur 48 px ; petit : 36 px. Survol : le bouton orange passe au noir, le noir à l’orange. Focus : anneau orange de 3 px.</p>
      </div>
      <div class="bloc"><h4>Cartes et badges</h4>
        <div class="carte-ui"><span class="pastille-ui">Paint Date</span><h4>Deux toiles, un moment</h4><p style="font-size:14px">Vendredi et samedi, 19 h – 21 h. Boissons comprises.</p><p class="prix">25 000 F <span style="font-size:13px;font-weight:400">/ duo</span></p></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px"><span class="pastille-ui">Nouveau</span><span class="pastille-ui" style="background:${NOIR};color:#fff">Complet</span><span class="pastille-ui" style="background:#fff;color:${NOIR};border:1.5px solid ${NOIR}">Groupes</span></div>
        <p class="note">Une carte = un fond blanc ou noir, un badge orange, un titre, une ligne d’information, un prix en Space Grotesk 700.</p>
      </div>
      <div class="bloc"><h4>Formulaires</h4>
        <div style="display:grid;gap:12px"><label class="champ"><span>Nom</span><i>Mireille Ondo</i></label><label class="champ"><span>Téléphone</span><i>+241 …</i></label><label class="champ"><span>Nombre de personnes</span><i>4</i></label></div>
        <p class="note">Champs à bord noir 1,5 px, étiquette au-dessus en Space Grotesk 500, erreur en texte noir sur bandeau orange (jamais de rouge : pas de troisième couleur).</p>
      </div>
    </div>` }));

  /* 07 — réservation et billet */
  planches.push(planche({ section: S7, titre: 'Écran de réservation et billet', corps: `
    <div class="grille-2">
      <div class="reservation">
        <div class="etapes-ui"><span class="actif">1 · Expérience</span><span>2 · Date</span><span>3 · Confirmation</span></div>
        <h3 style="font-size:28px">Choisis ton expérience</h3>
        <div class="choix"><div class="actif"><b>Paint &amp; Chill</b><span>90 min · 15 000 F</span></div><div><b>Paint Date</b><span>2 h · 25 000 F / duo</span></div><div><b>Release Session</b><span>20 min · 10 000 F</span></div><div><b>Paint Party</b><span>2 h · sur devis</span></div></div>
        <label class="champ"><span>Nombre de personnes</span><i>2</i></label>
        <div style="display:flex;justify-content:space-between;align-items:center"><p class="note">Paiement Mobile Money ou sur place</p><span class="bouton-bc bouton-bc--orange">Continuer →</span></div>
      </div>
      <div class="colonne">
        <div class="billet">
          <div class="billet-corps">${motSymbole({ taille: 100 })}<p class="grand">Paint &amp; Chill</p><dl><dt>Date</dt><dd>Sam. 18 oct. 2026 · 16 h</dd><dt>Personnes</dt><dd>2</dd><dt>Réservation</dt><dd>BC-2026-0417</dd><dt>Lieu</dt><dd>Akanda, Gabon</dd></dl><p class="note">Présente ce billet à l’accueil. Arrive 10 minutes avant. Tenue qui peut se tacher conseillée.</p></div>
          <div class="billet-talon">${faussQr({ taille: 120, graine: 7 })}<p style="font-family:var(--titrage);font-weight:700;font-size:14px">CREATE. RELEASE. ENJOY.</p><p class="note">Motif QR illustratif : le vrai code est généré à la confirmation.</p></div>
        </div>
        <div class="bloc"><h4>Confirmation</h4><p>Le billet arrive par WhatsApp et par e-mail au format image et PDF : logo principal, expérience en T2, informations en tableau, QR code sur talon noir, slogan principal. Fond blanc pour une impression propre.</p></div>
      </div>
    </div>` }));

  /* 08 — façade et accueil */
  planches.push(planche({ section: S8, titre: 'Façade et accueil', sur: 'Le lieu', corps: `
    <div class="grille-2">
      <div class="colonne">
        <div class="elevation elevation--gris" style="flex:1"><div class="enseigne">${motSymbole({ couleur: BLANC, taille: 100 })}</div><div class="porte"></div></div>
        <div class="bloc"><h4>Façade</h4><p>Enseigne : caisson noir mat, lettres blanches et esperluette orange rétroéclairées, fracture de BREAK conservée. Une seule porte, peinte en Flame Orange : c’est le seul aplat orange de la façade. Pas de vitrophanie chargée ; au plus le symbole sur la vitrine, à hauteur d’œil.</p></div>
      </div>
      <div class="colonne">
        <div class="elevation elevation--blanc" style="flex:1;gap:20px;grid-template-columns:1fr;align-content:center;justify-items:center;padding:40px"><p class="mur-texte" style="font-size:96px;text-align:center">BREAK<br><span style="color:${ORANGE}">&amp;</span> CREATE</p><p style="font-family:var(--titrage);font-size:18px">CREATE. RELEASE. ENJOY.</p></div>
        <div class="bloc"><h4>Accueil</h4><p>Signalétique minimaliste : le nom en lettres noires découpées sur mur blanc, le slogan principal en dessous. Banque d’accueil noire, symbole orange sur le côté. Deux flèches au sol, noires, qui orientent vers PAINT ROOM et RELEASE ROOM. Le contraste des deux univers commence ici : à gauche mur propre, à droite première trace orange.</p></div>
      </div>
    </div>` }));

  /* 08 — paint room */
  planches.push(planche({ section: S8, titre: 'Paint Room : créatif, expressif, lumineux', sur: 'Univers CREATE', corps: `
    <div class="grille-2-1">
      <div class="elevation elevation--blanc" style="padding:40px;align-content:end;justify-items:start;position:relative">${trace({ graine: 7, largeur: 900, hauteur: 140 })}<p class="mur-texte" style="font-size:150px;position:relative">PAINT<br>ROOM</p><div style="position:absolute;right:40px;top:40px;width:140px">${symbole({ taille: 100 })}</div></div>
      <div class="colonne">
        <div class="bloc" style="flex:1">
          <h3>Ambiance</h3>
          <ul class="liste">
            <li>Murs blancs, sol clair, lumière du jour ou continue blanche.</li>
            <li>Un mur d’exposition : les œuvres des visiteurs, accrochées sur une grille noire.</li>
            <li>Un mur typographique : PAINT ROOM en lettres noires massives, une seule trace orange.</li>
            <li>Traces de peinture réelles laissées par les sessions : elles font partie du décor, on ne les nettoie pas toutes.</li>
            <li>Signalétique orange et noire : consignes, thèmes du jour, lavabos.</li>
            <li>Chevalets et matériel noirs : le mobilier reste dans la palette, la couleur vient des toiles.</li>
          </ul>
        </div>
      </div>
    </div>` }));

  /* 08 — release room */
  planches.push(planche({ section: S8, titre: 'Release Room : brut, énergique, encadré', sur: 'Univers BREAK', sombre: true, corps: `
    <div class="grille-2-1">
      <div class="elevation elevation--noir" style="padding:40px;align-content:end;justify-items:start;position:relative;border:1px solid rgba(255,255,255,.15)">${fragments({ colonnes: 8, lignes: 4, taille: 60, ecart: 9, couleur: BLANC, graine: 33 })}<p class="mur-texte orange" style="font-size:150px;position:relative">RELEASE<br>ROOM</p><div style="position:absolute;right:40px;bottom:40px;width:320px">${hachures({ largeur: 320, hauteur: 70 })}</div></div>
      <div class="colonne">
        <div class="bloc" style="flex:1;border-color:rgba(255,255,255,.2)">
          <h3>Ambiance</h3>
          <ul class="liste">
            <li>Surfaces industrielles : béton, métal, bois brut, tout peint en Charcoal Black.</li>
            <li>Typographie massive : RELEASE ROOM en orange sur noir, à l’échelle du mur.</li>
            <li>Lumière contrastée : un point chaud sur la zone d’action, le reste dans la pénombre.</li>
            <li>Éléments fragmentés : blocs blancs au mur, hachures orange au sol pour délimiter les zones.</li>
            <li>La sécurité fait partie de l’identité : consignes en noir sur orange, équipement exposé, nom de l’animateur affiché.</li>
            <li>Ambiance joyeuse et encadrée : jamais de vocabulaire de colère sur les murs.</li>
          </ul>
        </div>
      </div>
    </div>` }));

  /* 08 — signalétique */
  planches.push(planche({ section: S8, titre: 'Signalétique intérieure et sécurité', corps: `
    <div class="grille-3">
      <div class="signal">
        <p class="etiquette">Orientation · noir</p>
        <div class="panneau panneau--noir"><i></i>Paint Room <small>→</small></div>
        <div class="panneau panneau--noir"><i></i>Release Room <small>→</small></div>
        <div class="panneau panneau--noir"><i></i>Accueil · Vestiaires <small>←</small></div>
        <div class="panneau panneau--noir"><i></i>Photobooth <small>↑</small></div>
        <p class="note">Le triangle noir tronqué (un fragment) sert de puce à toute la signalétique.</p>
      </div>
      <div class="signal">
        <p class="etiquette">Consignes et sécurité · noir sur orange</p>
        <div class="panneau panneau--orange"><i></i>Casque et gants obligatoires</div>
        <div class="panneau panneau--orange"><i></i>Zone de projection · 3 m</div>
        <div class="panneau panneau--orange"><i></i>Un animateur présent en permanence</div>
        <div class="panneau panneau--orange"><i></i>Sortie</div>
        <p class="note">Les consignes réglementaires (issues de secours, extincteurs) gardent leur pictogramme normalisé ; seul le cadre suit la charte.</p>
      </div>
      <div class="signal">
        <p class="etiquette">Information · blanc</p>
        <div class="panneau panneau--blanc"><i></i>Thème du jour : la ville la nuit</div>
        <div class="panneau panneau--blanc"><i></i>Lavabos · Séchage des toiles</div>
        <div class="panneau panneau--blanc"><i></i>Tes photos : #breakandcreate</div>
        <div class="bloc bloc--gris" style="margin-top:8px"><h4>Règles</h4><p style="font-size:14px">Space Grotesk 700, 18 à 24 px à un mètre, 40 px à trois mètres. Panneaux rectangulaires, sans arrondi. Une phrase par panneau. Pas d’icône décorative : la puce fragment et une flèche suffisent.</p></div>
      </div>
    </div>` }));

  /* 09 — applications 1 : carte de visite, carte cadeau, QR code */
  planches.push(planche({ section: S9, titre: 'Carte de visite, carte cadeau, QR code', sur: 'Applications 5, 10, 13', corps: `
    <div class="grille-3">
      <div class="colonne">
        <div class="carte-visite carte-visite--noir">${motSymbole({ couleur: BLANC, taille: 100 })}<p><b>Prénom Nom</b>Fondateur · fondatrice<br>+241 00 00 00 00 · contact@breakandcreate.ga</p></div>
        <div class="carte-visite carte-visite--blanc"><div style="display:flex;justify-content:space-between;align-items:start">${symbole({ taille: 100 })}${faussQr({ taille: 54, graine: 3 })}</div><p><b>CREATE. RELEASE. ENJOY.</b>Akanda, Gabon · breakandcreate.ga</p></div>
        <p class="mockup-legende">Carte 85 × 55 mm, papier épais non couché. Recto noir avec le logo et l’identité de la personne ; verso blanc avec le symbole, le slogan et le QR de réservation.</p>
      </div>
      <div class="colonne">
        <div class="carte-cadeau" style="background:${NOIR};color:#fff">${fragments({ colonnes: 4, lignes: 3, taille: 60, ecart: 9, couleur: BLANC, graine: 44 })}<p class="etiquette" style="position:relative">CARTE CADEAU</p><div style="position:relative"><p class="grand" style="font-size:26px;color:#fff">Une session,<br>au choix.</p><p class="note" style="margin-top:6px">Paint Room ou Release Room · valable 12 mois</p></div></div>
        <div class="carte-cadeau" style="background:${ORANGE};color:${NOIR}">${eclaboussure({ couleur: NOIR, graine: 41, taille: 160 }).replace('class="eclaboussure"', 'class="eclaboussure" style="position:absolute;right:-20px;top:-30px;width:45%"')}<p class="etiquette" style="position:relative">CARTE CADEAU</p><div style="position:relative"><p class="grand" style="font-size:26px">Offre le chaos.</p><p class="note" style="color:${NOIR};margin-top:6px">Release Session · valable 12 mois</p></div></div>
        <p class="mockup-legende">Carte cadeau format carte bancaire, noire ou orange selon l’univers offert. Code au dos, sur talon blanc. Existe aussi en version numérique (image envoyée par WhatsApp).</p>
      </div>
      <div class="colonne">
        <div class="bloc bloc--noir" style="align-items:center;padding:30px"><div style="background:#fff;padding:14px;border-radius:4px;width:190px">${faussQr({ taille: 160, graine: 9 })}</div><p style="font-family:var(--titrage);font-weight:700;color:${ORANGE};font-size:18px">Réserve ta session</p><p class="note">breakandcreate.ga</p></div>
        <p class="mockup-legende">QR code : noir sur blanc, marge d’un module blanc, posé dans un bloc noir avec une consigne orange. Jamais recoloré, jamais posé sur orange. Le motif ci-contre est illustratif.</p>
      </div>
    </div>` }));

  /* 09 — applications 3 : affiche, enseigne, photobooth */
  planches.push(planche({ section: S9, titre: 'Affiche événementielle et photobooth', sur: 'Applications 11, 18', corps: `
    <div class="grille-3">
      <div class="affiche post--noir" style="color:#fff">${fragments({ colonnes: 6, lignes: 6, taille: 60, ecart: 9, couleur: BLANC, graine: 51 })}${motSymbole({ couleur: BLANC, taille: 100 })}<p class="titre-affiche">Paint<br>Party<br><span style="color:${ORANGE}">Édition<br>anniversaire</span></p><div class="infos"><b>Samedi 14 novembre · 18 h – 22 h</b><span>Groupes de 6 à 20 · toile, playlist, gâteau</span><span>Réservation : breakandcreate.ga</span></div></div>
      <div class="affiche" style="background:${ORANGE};color:${NOIR}">${trace({ couleur: NOIR, graine: 19 })}${motSymbole({ ampersandCouleur: NOIR, taille: 100 })}<p class="titre-affiche">Release<br>Session<br>Night</p><div class="infos"><b>Vendredi 20 h</b><span>Casques, gants, playlist. 20 minutes pour tout lâcher.</span><span>10 000 F · sur réservation</span></div></div>
      <div class="colonne">
        <div class="photobooth" style="background:${NOIR}"><div class="cadre-photo"><span class="coin"></span><p><b>Photo du groupe</b>cadre 4:5, zone calme en bas</p></div><div class="bande" style="background:${ORANGE};color:${NOIR}">${motSymbole({ ampersandCouleur: NOIR, taille: 100 })}<span>#breakandcreate</span></div></div>
        <p class="mockup-legende">Photobooth : fond noir, bande orange avec le logo et le hashtag. Le cadre imprimé et le visuel partagé sont identiques : ce que le visiteur poste est déjà aux couleurs de la marque.</p>
      </div>
    </div>` }));

  /* 09 — récapitulatif des 25 applications */
  const apps = ['Logo principal', 'Logo secondaire', 'Symbole &', 'Version monochrome', 'Carte de visite', 'Enseigne extérieure', 'Signalétique intérieure', 'Mur du Paint Room', 'Mur du Release Room', 'Carte cadeau', 'Affiche événementielle', 'Publication Instagram', 'Story Instagram', 'Profil Instagram', 'Site internet', 'Écran de réservation', 'Billet / confirmation', 'Photobooth', 'QR code'];
  const ou = ['02', '02', '02', '02', '09', '08', '08', '08', '08', '09', '09', '07', '07', '07', '07', '07', '07', '09', '09'];
  planches.push(planche({ section: S9, titre: 'Les dix-neuf applications, et où les trouver', corps: `
    <ol class="sommaire" style="grid-template-columns:repeat(3,1fr);gap:6px 40px">${apps.map((a, i) => `<li style="font-size:17px;padding:9px 0"><b>${String(i + 1).padStart(2, '0')}</b>${a}<small>chapitre ${ou[i]}</small></li>`).join('')}</ol>
    <p class="note" style="margin-top:18px">Les maquettes de cette charte sont dessinées en vectoriel pour fixer les règles ; les photos de réalisation les remplaceront après la première production.</p>` }));

  /* 10 — do / don't (1) */
  planches.push(planche({ section: S10, titre: 'À faire, à éviter (1/2)', corps: `
    <div class="oui-non">
      <div class="cas cas--oui"><div class="visuel" style="background:#fff;border:1px solid #E9E9E9">${motSymbole()}</div><p>Logo sur fond blanc, zone de protection respectée, &amp; orange.</p></div>
      <div class="cas cas--non"><div class="visuel" style="background:linear-gradient(135deg,#FF5A1F,#8A2BE2)">${motSymbole({ couleur: BLANC, ampersandCouleur: BLANC })}</div><p>Dégradé, couleur étrangère, logo posé sur un fond agité.</p></div>
      <div class="cas cas--oui"><div class="visuel post--noir" style="align-content:end;justify-items:start">${fragments({ colonnes: 4, lignes: 3, taille: 60, ecart: 9, couleur: BLANC, graine: 5 }).replace('class="fragments"', 'class="fragments" style="position:absolute;right:-20px;top:-10px;width:55%"')}<p class="enorme" style="color:#fff;position:relative;font-size:34px">Paint Date</p></div><p>Un élément graphique dans un angle, le titre dans la zone calme.</p></div>
      <div class="cas cas--non"><div class="visuel post--noir" style="place-items:center">${eclaboussure({ graine: 11 }).replace('class="eclaboussure"', 'class="eclaboussure" style="position:absolute;inset:10%;width:80%"')}<p class="enorme" style="color:#fff;position:relative;font-size:34px">Paint Date</p></div><p>L’éclaboussure sous le texte, au centre, trop grande.</p></div>
      <div class="cas cas--oui"><div class="visuel" style="background:${ORANGE}"><span class="bouton-bc">Réserver</span></div><p>Noir sur orange pour un élément d’action.</p></div>
      <div class="cas cas--non"><div class="visuel" style="background:${ORANGE}"><p style="color:#fff;font-size:15px;text-align:center">Réservation conseillée, enfants à partir de 8 ans accompagnés d’un adulte.</p></div><p>Texte blanc sur orange : illisible.</p></div>
      <div class="cas cas--oui"><div class="visuel" style="background:#fff;border:1px solid #E9E9E9"><p class="enorme" style="font-size:36px;text-align:center">Break the routine.<br>Create something.</p></div><p>Un message court, Space Grotesk 700, deux lignes.</p></div>
      <div class="cas cas--non"><div class="visuel" style="background:#fff;border:1px solid #E9E9E9"><p style="font-family:var(--titrage);font-weight:700;font-size:18px;text-align:center;line-height:1.2">CREATE. RELEASE. ENJOY.<br>Ton espace pour créer, lâcher prise et t’amuser.<br>Break. Create. Repeat.</p></div><p>Trois slogans sur le même support.</p></div>
    </div>` }));

  /* 10 — do / don't (2) */
  planches.push(planche({ section: S10, titre: 'À faire, à éviter (2/2)', corps: `
    <div class="oui-non">
      <div class="cas cas--oui"><div class="visuel cadre-photo" style="aspect-ratio:4/3"><span class="coin"></span><p><b>Mains, peinture, rires</b>vraies personnes, lumière naturelle</p></div><p>Photo vivante, sujet réel, zone calme pour le titre.</p></div>
      <div class="cas cas--non"><div class="visuel cadre-photo" style="aspect-ratio:4/3;background:#555"><p><b>Groupe posé face caméra</b>banque d’images, sourire figé</p></div><p>Image corporate ou artificielle.</p></div>
      <div class="cas cas--oui"><div class="visuel" style="background:${NOIR};color:#fff"><div class="panneau panneau--orange" style="width:90%"><i></i>Casque et gants obligatoires</div></div><p>Consigne de sécurité intégrée à l’identité, formulée positivement.</p></div>
      <div class="cas cas--non"><div class="visuel" style="background:${NOIR};color:#fff"><p class="enorme" style="color:${ORANGE};font-size:34px;text-align:center">DÉFOULE<br>TA RAGE</p></div><p>Vocabulaire de colère ou de violence, esthétique « rage room ».</p></div>
      <div class="cas cas--oui"><div class="visuel" style="background:#fff;border:1px solid #E9E9E9">${symbole({ taille: 100 }).replace('class="symbole"', 'class="symbole" style="width:45%"')}</div><p>Le symbole seul en avatar, favicon ou marquage discret.</p></div>
      <div class="cas cas--non"><div class="visuel" style="background:#fff;border:1px solid #E9E9E9"><svg viewBox="0 0 120 120" style="width:45%" aria-hidden="true"><ellipse cx="60" cy="70" rx="40" ry="28" fill="${ORANGE}"/><circle cx="45" cy="62" r="6" fill="#fff"/><circle cx="62" cy="55" r="6" fill="#fff"/><circle cx="78" cy="64" r="6" fill="#fff"/><rect x="70" y="10" width="10" height="55" rx="4" fill="${NOIR}" transform="rotate(30 75 40)"/></svg></div><p>Palette, pinceau, marteau, explosion, personnage : les clichés interdits.</p></div>
      <div class="cas cas--oui"><div class="visuel" style="background:${ORANGE}"><div class="seq" style="width:90%;gap:8px">${sequence({ taille: 120 }).map((s) => s.replace('class="sequence-etape"', 'class="sequence-etape" style="width:100%"')).join('')}</div></div><p>La séquence BREAK → CREATE dans l’ordre, comme frise ou animation.</p></div>
      <div class="cas cas--non"><div class="visuel" style="background:#fff;border:1px solid #E9E9E9"><p style="font-family:Georgia,serif;font-style:italic;font-size:30px;text-align:center">Break &amp; Create<br><span style="font-size:14px">atelier créatif</span></p></div><p>Police de substitution, minuscules, ton « galerie d’art ».</p></div>
    </div>` }));

  /* fin */
  planches.push(`<section class="planche planche--orange" data-section="Fin">
  <header class="planche-tete"><span class="planche-section">Contact et fichiers</span><span class="planche-marque">BREAK &amp; CREATE · Charte graphique</span><span class="planche-num" data-num></span></header>
  <div class="planche-titre"><h2>Tout ce qu’il faut pour produire</h2></div>
  <div class="planche-corps grille-2">
    <div class="colonne">
      <div class="bloc" style="border-color:rgba(23,23,23,.25);flex:1">
        <h3>Fichiers livrés avec cette charte</h3>
        <ul class="liste">
          <li><b>logos/</b> : logo principal (noir, blanc, monochromes), logo secondaire, symbole (variantes), en SVG avec la police embarquée.</li>
          <li><b>charte/</b> : ce document (HTML hors ligne) et sa version PDF.</li>
          <li><b>charte/assets/fonts/</b> : Space Grotesk et Inter, licence SIL Open Font License.</li>
          <li><b>source/</b> : le générateur du document ; on modifie les sources, jamais le HTML à la main.</li>
        </ul>
        <p class="note" style="color:${NOIR}">Les logos SVG embarquent la police pour s’afficher partout dans un navigateur ; pour l’impression et la broderie, faire vectoriser les textes par le prestataire à partir de ces fichiers (aucun outil de vectorisation disponible au moment de la livraison).</p>
      </div>
    </div>
    <div class="colonne" style="justify-content:space-between">
      ${motSymbole({ ampersandCouleur: NOIR, taille: 100 })}
      <div><p class="enorme" style="font-size:64px">CREATE.<br>RELEASE.<br>ENJOY.</p><p style="margin-top:14px">Akanda, Gabon · version 1.0 · septembre 2026</p></div>
    </div>
  </div>
</section>`);

  /* crédit et co-branding */
  planches.push(`<section class="planche" data-section="Crédit">
  <header class="planche-tete"><span class="planche-section">Une charte signée MÉTHODE AURA</span><span class="planche-marque">BREAK &amp; CREATE · Charte graphique</span><span class="planche-num" data-num></span></header>
  <div class="planche-titre"><p class="planche-sur">Partenariat</p><h2>Réalisée par MÉTHODE AURA</h2></div>
  <div class="planche-corps colonne" style="justify-content:space-between">
    <div class="partenariat" style="flex:1">
      ${motSymbole({ taille: 100 })}
      <span class="croix" aria-hidden="true">×</span>
      ${logoAura({ couleur: '#0B0B0D' })}
    </div>
    <div class="credit">
      <div>
        <p class="signature">BREAK &amp; CREATE × MÉTHODE AURA</p>
        <p style="margin-top:10px">Cette charte graphique a été conçue et réalisée par MÉTHODE AURA, studio de marque : positionnement, idée créative, logotype, système graphique, applications numériques et physiques, direction photographique.</p>
      </div>
      <div style="text-align:right">
        <p class="signature">Du concept à l’impact.</p>
        <p class="note" style="margin-top:10px">Version 1.0 · septembre 2026 · Akanda, Gabon. Les logos et polices de MÉTHODE AURA restent la propriété du studio ; ceux de BREAK &amp; CREATE sont livrés à la marque.</p>
      </div>
    </div>
  </div>
</section>`);

  return planches;
}
