/* 03 Colors, 04 Typography, 05 Graphic system, 06 Photography. */
import { planche, motSymbole, symbole, fragments, trace, eclaboussure, sequence, hachures, cmyk, rgb, contraste, NOIR, ORANGE, BLANC } from '../lib.mjs';

const S3 = '03 — Colors', S4 = '04 — Typography', S5 = '05 — Graphic system', S6 = '06 — Photography';
export default function () {
  const planches = [];

  /* 03 — palette */
  planches.push(planche({ section: S3, titre: 'Deux couleurs. Pas une de plus.', sur: 'Palette chromatique', corps: `
    <div class="pastilles">
      <div class="pastille pastille--noir">
        <div><p class="etiquette">01</p><h3>Charcoal Black</h3><p style="max-width:44ch;margin-top:10px">Fonds, logo, textes, signalétique, mobilier graphique, éléments structurels. Matière, profondeur, contraste, brut, industriel, destruction, sophistication.</p></div>
        <div class="valeurs"><span><b>HEX</b>${NOIR}</span><span><b>RGB</b>${rgb(NOIR)}</span><span><b>CMJN (indicatif)</b>${cmyk(NOIR)}</span></div>
      </div>
      <div class="pastille pastille--orange">
        <div><p class="etiquette">02</p><h3>Flame Orange</h3><p style="max-width:44ch;margin-top:10px">Accents, boutons, appels à l’action, signalétique, détails graphiques, éléments interactifs, communication événementielle. Énergie, créativité, peinture, mouvement, chaleur, spontanéité.</p></div>
        <div class="valeurs"><span><b>HEX</b>${ORANGE}</span><span><b>RGB</b>${rgb(ORANGE)}</span><span><b>CMJN (indicatif)</b>${cmyk(ORANGE)}</span></div>
      </div>
    </div>` }));

  /* 03 — règles de combinaison */
  const combi = (fond, texte, nom) => { const c = contraste(fond, texte); const ok = c >= 4.5; return `<div class="combinaison" style="background:${fond};color:${texte};border-color:${fond === BLANC ? '#E9E9E9' : fond}"><p class="grand">${nom}</p><small>Texte ${texte} sur ${fond}</small><p class="verdict">Contraste ${String(c).replace('.', ',')}:1 · ${ok ? 'texte courant autorisé' : c >= 3 ? 'grands titres seulement' : 'interdit'}</p></div>`; };
  planches.push(planche({ section: S3, titre: 'Règles de combinaison', sur: 'Le blanc n’est qu’un outil de lisibilité', corps: `
    <div class="grille-2-1">
      <div class="colonne">
        <div class="combinaisons">
          ${combi(BLANC, NOIR, 'Noir sur blanc')}${combi(NOIR, BLANC, 'Blanc sur noir')}${combi(NOIR, ORANGE, 'Orange sur noir')}
          ${combi(ORANGE, NOIR, 'Noir sur orange')}${combi(BLANC, ORANGE, 'Orange sur blanc')}${combi(ORANGE, BLANC, 'Blanc sur orange')}
        </div>
        <div class="repartition"><div style="flex:6;background:${NOIR};color:#fff">Noir · 60 %</div><div style="flex:3;background:${BLANC};color:${NOIR};border:1px solid #E9E9E9">Blanc · 30 %</div><div style="flex:1;background:${ORANGE};color:${NOIR}">10 %</div></div>
        <p class="legende">Répartition indicative d’un support : le noir structure, le blanc aère, l’orange frappe. Un support majoritairement orange est réservé aux temps forts (événement, promotion, Release Session).</p>
      </div>
      <div class="colonne">
        <div class="bloc" style="flex:1">
          <h3>Règles</h3>
          <ul class="liste">
            <li>Deux couleurs de marque. Le blanc sert à la lisibilité et à l’aération, jamais comme couleur d’identité.</li>
            <li>Pas de troisième couleur, pas de dégradé, pas de transparence colorée. Les gris de ce document servent à sa mise en page, pas à la marque.</li>
            <li>Orange sur blanc : titres à partir de 28 px, jamais de texte courant.</li>
            <li>Blanc sur orange : interdit pour du texte, toléré pour le symbole en grand format.</li>
            <li>Noir sur orange : la combinaison d’accent de référence (boutons, badges, tags).</li>
            <li>Les couleurs des peintures et des expériences du lieu ne font pas partie de la palette : elles apparaissent en photo, jamais dans un aplat graphique.</li>
          </ul>
        </div>
      </div>
    </div>` }));

  /* 04 — typographie principale */
  planches.push(planche({ section: S4, titre: 'Space Grotesk, la voix des titres', sur: 'Typographie principale', corps: `
    <div class="grille-2-1">
      <div class="colonne">
        <p class="alphabet">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
        <p class="alphabet" style="font-weight:500">abcdefghijklmnopqrstuvwxyz</p>
        <p class="alphabet" style="font-weight:300">0123456789 &amp; ! ? × → « » @ #</p>
        <div class="specimen">
          <div class="ligne"><small>700 · Bold</small><p style="font-family:var(--titrage);font-weight:700;font-size:30px">Break the routine. Create something.</p></div>
          <div class="ligne"><small>500 · Medium</small><p style="font-family:var(--titrage);font-weight:500;font-size:30px">Paint Date, ce vendredi à 19 h</p></div>
          <div class="ligne"><small>300 · Light</small><p style="font-family:var(--titrage);font-weight:300;font-size:30px">Akanda, Gabon</p></div>
        </div>
      </div>
      <div class="colonne">
        <div class="bloc" style="flex:1">
          <h3>Usage</h3>
          <p>Titres, navigation, affiches, signalétique, interfaces, boutons, étiquettes, communication digitale. Sa géométrie légèrement irrégulière (le a, le g, le &amp;) donne le côté contemporain et un peu rebelle sans agressivité.</p>
          <h4 style="margin-top:8px">Réglages</h4>
          <ul class="liste">
            <li>Titres en 700, approche −2 % à −3 %, interlignage 0,95 à 1,05.</li>
            <li>Capitales réservées aux titres courts (moins de 30 caractères) et aux étiquettes.</li>
            <li>Jamais en dessous de 13 px à l’écran.</li>
            <li>Police libre (licence SIL OFL), fournie dans le dossier des fichiers.</li>
          </ul>
        </div>
      </div>
    </div>` }));

  /* 04 — secondaire + hiérarchie */
  planches.push(planche({ section: S4, titre: 'Inter pour lire, et une hiérarchie en six niveaux', sur: 'Typographie secondaire et échelle', corps: `
    <div class="grille-2">
      <div class="colonne">
        <p class="alphabet alphabet--texte">ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789</p>
        <div class="bloc" style="flex:1">
          <h3>Inter</h3>
          <p>Textes longs, informations pratiques, tarifs, descriptions, réservations, contenus fonctionnels, mentions. Extrêmement lisible à petite taille, sur écran comme imprimée.</p>
          <ul class="liste">
            <li>Corps de texte 16 à 18 px, interlignage 1,5 ; jamais en dessous de 13 px.</li>
            <li>Graisses : 400 pour le texte, 600 pour les mises en avant, 700 pour les prix.</li>
            <li>Pas d’italique de marque (l’énergie vient des titres, pas du style du texte).</li>
            <li>Chiffres tabulaires pour les tarifs et les horaires.</li>
          </ul>
        </div>
      </div>
      <div class="colonne echelle">
        <div class="specimen">
          <div class="ligne"><small>T1 · 72 / 1 · Space Grotesk 700</small><p class="t1">Paint Party</p></div>
          <div class="ligne"><small>T2 · 44 / 1,05 · 700</small><p class="t2">Six amis, six toiles, un mur</p></div>
          <div class="ligne"><small>T3 · 26 / 1,2 · 500</small><p class="t3">Session de deux heures, matériel fourni</p></div>
          <div class="ligne"><small>T4 · 17 / 1,55 · Inter 400</small><p class="t4">Vous recevez une toile, la peinture, les pinceaux, un tablier. Vous repartez avec votre œuvre, séchée et emballée.</p></div>
          <div class="ligne"><small>T5 · 14 / 1,5 · Inter 400</small><p class="t5">Réservation conseillée. Enfants à partir de 8 ans accompagnés d’un adulte.</p></div>
          <div class="ligne"><small>T6 · 13 · Space Grotesk 700</small><p class="t6">ÉTIQUETTE · NOUVEAU · RELEASE SESSION</p></div>
        </div>
      </div>
    </div>` }));

  /* 04 — exemples */
  planches.push(planche({ section: S4, titre: 'La typographie en situation', corps: `
    <div class="grille-3">
      <div class="bloc bloc--noir" style="justify-content:space-between">
        <div><p class="etiquette">Affiche</p><p class="enorme" style="color:#fff;font-size:72px;margin-top:10px">Paint<br>Date</p></div>
        <div><p class="t3" style="font-family:var(--titrage);font-weight:500;font-size:22px">Vendredi 19 h – 21 h</p><p style="font-size:15px;opacity:.8;margin-top:6px">Deux toiles, un chevalet pour deux, une playlist. Réservation sur breakandcreate.ga</p></div>
      </div>
      <div class="bloc">
        <p class="etiquette">Page tarifs</p>
        <h3 style="font-size:30px">Paint &amp; Chill</h3>
        <p style="font-size:16px">Séance libre de 90 minutes, toile 30 × 40 cm, peinture acrylique, tablier et boissons fraîches comprises.</p>
        <p style="font-family:var(--titrage);font-weight:700;font-size:34px;font-variant-numeric:tabular-nums">15 000 <span style="font-size:16px;font-weight:500">FCFA / personne</span></p>
        <p class="note">Tarif d’exemple pour la mise en page, à remplacer par la grille réelle.</p>
        <a class="bouton-bc bouton-bc--orange" href="#">Réserver une séance</a>
      </div>
      <div class="bloc bloc--orange" style="justify-content:space-between">
        <div><p class="etiquette">Signalétique</p><p class="enorme" style="font-size:64px;margin-top:10px">Release<br>Room</p></div>
        <div><p style="font-family:var(--titrage);font-weight:700;font-size:18px">Casque et gants obligatoires</p><p style="font-size:15px;margin-top:4px">Un animateur vous équipe avant d’entrer. Session de 20 minutes.</p></div>
      </div>
    </div>` }));

  /* 05 — fragments */
  planches.push(planche({ section: S5, titre: 'Les fragments : un ordre qui se casse', sur: 'Système graphique · élément 1', corps: `
    <div class="grille-2-1">
      <div class="logo-cadre logo-cadre--blanc" style="padding:30px">${fragments({ colonnes: 10, lignes: 6, taille: 70, ecart: 10, graine: 21 })}</div>
      <div class="colonne">
        <div class="bloc" style="flex:1">
          <h3>Principe</h3>
          <p>Une grille de blocs carrés, nette. Un bloc sur quatre environ est tranché par une diagonale (toujours montante de gauche à droite, comme dans le logo) et sa moitié haute glisse. Un bloc sur douze environ est orange. Quelques blocs manquent.</p>
          <h4 style="margin-top:8px">Règles</h4>
          <ul class="liste">
            <li>Blocs carrés, sans arrondi, espacés d’un septième de leur côté.</li>
            <li>Décalage des fragments entre 5 et 15 % du côté, jamais plus.</li>
            <li>Une seule couleur de bloc plus l’accent : noir et orange sur blanc, blanc et orange sur noir, noir seul sur orange.</li>
            <li>Les fragments occupent un bord ou un coin du support, jamais le centre, et ne passent jamais sous du texte.</li>
          </ul>
        </div>
      </div>
    </div>` }));

  /* 05 — traces et éclaboussures */
  planches.push(planche({ section: S5, titre: 'Traces et éclaboussures contrôlées', sur: 'Système graphique · éléments 2 et 3', corps: `
    <div class="grille-2">
      <div class="colonne">
        <div class="logo-cadre logo-cadre--blanc" style="flex:1;padding:40px;gap:30px;grid-template-rows:auto auto">${trace({ graine: 7 })}${trace({ couleur: NOIR, graine: 19 })}</div>
        <div class="bloc"><h4>La trace</h4><p>Un geste de pinceau large, d’un seul coup, aux bords irréguliers mais nets. Une trace par composition au maximum. Elle souligne un mot, barre un élément ou coupe une image. Toujours horizontale ou dans la diagonale du logo ; jamais courbe.</p></div>
      </div>
      <div class="colonne">
        <div class="logo-cadre logo-cadre--noir" style="flex:1;padding:40px;grid-template-columns:1fr 1fr 1fr;gap:20px">${eclaboussure({ graine: 11 })}${eclaboussure({ graine: 23, couleur: BLANC })}${eclaboussure({ graine: 37, taille: 160 })}</div>
        <div class="bloc"><h4>L’éclaboussure</h4><p>Un noyau et quelques gouttes, d’une seule couleur, aplat sans dégradé ni texture. Elle est « contrôlée » : au plus une par support, dans un angle, jamais sur le logo ni sur un visage. Pas d’éclaboussure multicolore : la peinture réelle est réservée aux photos.</p></div>
      </div>
    </div>` }));

  /* 05 — séquence */
  planches.push(planche({ section: S5, titre: 'La séquence BREAK → CREATE', sur: 'Système graphique · élément 4', corps: `
    <div class="colonne" style="justify-content:space-between">
      <div class="seq">${sequence({ taille: 120 }).map((s, i) => `<figure>${s}<figcaption><b>0${i + 1}</b>${['Forme structurée', 'Rupture', 'Fragmentation', 'Recomposition', 'Création'][i]}</figcaption></figure>`).join('')}</div>
      <div class="grille-3" style="height:auto">
        <div class="bloc"><h4>Ce qu’elle raconte</h4><p>Le passage du contrôle à la liberté puis à une forme nouvelle : le carré (l’ordre, la routine) se fend, éclate, se réassemble différemment et devient le &amp;, symbole de la marque. C’est le concept entier en cinq images.</p></div>
        <div class="bloc"><h4>Où l’utiliser</h4><p>Animation d’ouverture du site et des vidéos, frise murale de l’accueil, bande au dos des billets, écran d’attente du photobooth, transition des Reels. Chaque étape peut vivre seule comme icône.</p></div>
        <div class="bloc"><h4>Règles</h4><p>Toujours dans l’ordre, de gauche à droite ou de haut en bas. L’orange n’apparaît qu’à partir de l’étape 3 et domine à l’étape 5. On ne mélange pas la séquence avec une éclaboussure sur le même support.</p></div>
      </div>
    </div>` }));

  /* 05 — compositions */
  planches.push(planche({ section: S5, titre: 'Compositions : du net, du cassé', sur: 'Système graphique · règles d’assemblage', corps: `
    <div class="grille-2">
      <div class="grille-2" style="gap:16px">
        <div class="compo compo--noir">${fragments({ colonnes: 5, lignes: 5, taille: 60, ecart: 9, couleur: BLANC, graine: 5 })}<p class="titre-compo" style="color:#fff">Break the routine.</p></div>
        <div class="compo compo--orange">${eclaboussure({ couleur: NOIR, graine: 41 })}<p class="titre-compo">Make a mess.<br>Make memories.</p></div>
        <div class="compo compo--blanc">${trace({ graine: 3 })}<p class="titre-compo">Paint Party</p></div>
        <div class="compo compo--noir">${hachures({ largeur: 400, hauteur: 120 })}<p class="titre-compo" style="color:#fff;bottom:auto;top:24px">Release Session</p></div>
      </div>
      <div class="colonne">
        <div class="bloc" style="flex:1;gap:16px">
          <h3>Règles d’assemblage</h3>
          <div class="regle"><b>1</b><p>Un élément graphique par support (fragments, trace, éclaboussure, hachures ou séquence). Deux seulement sur les grands formats (mur, façade).</p></div>
          <div class="regle"><b>2</b><p>L’élément occupe un bord ou un angle ; le texte occupe la zone calme. Ils ne se superposent pas.</p></div>
          <div class="regle"><b>3</b><p>La diagonale de la marque monte de gauche à droite. Fragments, coupes et traces la respectent.</p></div>
          <div class="regle"><b>4</b><p>Les éléments fonctionnent sans le logo : une publication avec fragments noirs, un titre Space Grotesk et un point orange est déjà reconnaissable.</p></div>
          <div class="regle"><b>5</b><p>Hachures : texture de fond en bas ou en haut d’un support, sur 30 % de la hauteur au plus, jamais derrière du texte.</p></div>
          <div class="regle"><b>6</b><p>Les motifs sont fournis en vectoriel ; on ne les déforme pas, on les recadre.</p></div>
        </div>
      </div>
    </div>` }));

  /* 06 — photo direction */
  const cadre = (titre, texte) => `<div class="cadre-photo"><span class="coin"></span><p><b>${titre}</b>${texte}</p></div>`;
  planches.push(planche({ section: S6, titre: '« Je veux être là. »', sur: 'Direction photographique', corps: `
    <div class="grille-2-1">
      <div class="grille-3" style="gap:14px;grid-template-rows:1fr 1fr">
        ${cadre('Amis qui rient', 'quatre personnes, pinceaux en main, une toile ratée et assumée')}
        ${cadre('Mains couvertes de peinture', 'gros plan, lumière du jour, peinture fraîche')}
        ${cadre('Couple en Paint Date', 'deux chevalets face à face, regards échangés')}
        ${cadre('Release Room en mouvement', 'flou de mouvement, éclaboussure captée en plein vol')}
        ${cadre('Avant / après', 'toile blanche, puis la même toile à la sortie')}
        ${cadre('Coulisses', 'préparation des toiles, tabliers suspendus, palettes')}
      </div>
      <div class="colonne">
        <div class="bloc" style="flex:1">
          <h3>Ce qu’on photographie</h3>
          <p>De vraies personnes, de vrais moments. Amis, couples, groupes, familles ; mains, toiles, éclaboussures, mouvements ; expressions naturelles, rires, concentration ; détails du lieu, coulisses, avant et après une expérience.</p>
          <h4 style="margin-top:8px">Ce qu’on évite</h4>
          <p>Poses corporate, sourires figés face caméra, banques d’images, retouches lisses, mise en scène de colère, objets cassés présentés comme violents.</p>
          <p class="note">Les cadres ci-contre indiquent les sujets à produire lors de la première séance photo ; aucune image d’illustration n’est fournie dans cette charte.</p>
        </div>
      </div>
    </div>` }));

  /* 06 — cadrage, lumière, traitement */
  planches.push(planche({ section: S6, titre: 'Cadrage, lumière, traitement', corps: `
    <div class="grille-3">
      <div class="bloc"><p class="etiquette">Cadrage</p><h3>Près, vivant, un peu penché</h3><ul class="liste"><li>Plans serrés sur les gestes et les visages ; plans larges pour montrer le lieu et le groupe.</li><li>Cadrages légèrement inclinés autorisés dans le Release Room, jamais dans le Paint Room.</li><li>Formats : 4:5 et 9:16 pour les réseaux, 3:2 pour le site et l’impression.</li><li>Laisser une zone calme (mur, sol, ciel) pour poser un titre, en haut ou à gauche.</li></ul></div>
      <div class="bloc"><p class="etiquette">Lumière</p><h3>Naturelle dans le Paint Room, contrastée dans le Release Room</h3><ul class="liste"><li>Paint Room : lumière du jour ou continue, douce, blanche ; couleurs des peintures fidèles.</li><li>Release Room : lumière dure, ombres franches, un seul point de lumière chaude possible.</li><li>Pas de flash frontal, pas de filtre coloré sur l’ensemble de l’image.</li></ul></div>
      <div class="bloc"><p class="etiquette">Traitement</p><h3>Contraste marqué, couleurs vraies</h3><ul class="liste"><li>Noirs profonds proches du Charcoal Black, blancs propres, contraste relevé.</li><li>Saturation naturelle : les couleurs de peinture ne sont ni poussées ni désaturées.</li><li>Grain léger accepté ; pas de vignettage, pas de teinte orange ajoutée.</li><li>Noir et blanc autorisé pour les portraits et les coulisses.</li><li>Sur une photo, le logo ou un élément graphique n’apparaît que dans la zone calme.</li></ul></div>
    </div>` }));

  return planches;
}
