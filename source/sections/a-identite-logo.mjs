/* Couverture, sommaire, 01 Brand overview, 02 Logo. */
import { planche, motSymbole, symbole, logoEmpile, fragments, sequence, construction, NOIR, ORANGE, BLANC } from '../lib.mjs';

const S1 = '01 — Brand overview', S2 = '02 — Logo';
export default function () {
  const planches = [];

  /* couverture */
  planches.push(`<section class="planche planche--sombre couverture" data-section="Couverture">
  <header class="planche-tete"><span class="planche-section">Charte graphique · version 1.0 · septembre 2026</span><span class="planche-marque">Akanda, Gabon</span><span class="planche-num" data-num></span></header>
  <div class="planche-corps">
    <div class="colonne" style="gap:34px">
      ${motSymbole({ couleur: BLANC, accent: ORANGE, taille: 100 })}
      <p class="grand" style="color:#fff">CREATE. RELEASE. ENJOY.</p>
      <p class="note" style="max-width:52ch">Destination d’expériences créatives et immersives. Ce document fixe l’identité visuelle de la marque : logo, couleurs, typographie, système graphique, photographie, applications numériques et physiques. Il s’adresse à toute personne qui produit un support BREAK &amp; CREATE.</p>
    </div>
    ${fragments({ colonnes: 7, lignes: 6, taille: 64, ecart: 10, couleur: BLANC, accent: ORANGE, graine: 9 })}
  </div>
  <footer class="planche-tete" style="border:0;border-top:1px solid rgba(255,255,255,.15);padding:14px 0 0"><span>Document de référence</span><span>Réalisée par MÉTHODE AURA</span><span>Diffusion : équipe, partenaires, imprimeurs</span></footer>
</section>`);

  /* sommaire */
  planches.push(planche({ section: 'Sommaire', titre: 'Dix chapitres, une seule marque', sur: 'Ce que contient cette charte', corps: `
    <ol class="sommaire">
      <li><b>01</b> Brand overview <small>histoire, concept, mission, vision, valeurs, personnalité, idée centrale, slogans</small></li>
      <li><b>02</b> Logo <small>pistes, logo principal, construction, secondaire, symbole, monochrome, tailles, interdits</small></li>
      <li><b>03</b> Colors <small>deux couleurs, valeurs HEX / RGB / CMJN, combinaisons et contrastes</small></li>
      <li><b>04</b> Typography <small>Space Grotesk, Inter, hiérarchie, tailles, interlignage</small></li>
      <li><b>05</b> Graphic system <small>fragments, traces, éclaboussures, séquence BREAK → CREATE, compositions</small></li>
      <li><b>06</b> Photography <small>direction, sujets, cadrage, lumière, traitement</small></li>
      <li><b>07</b> Digital <small>réseaux sociaux, site, composants, réservation, billet</small></li>
      <li><b>08</b> Physical experience <small>façade, accueil, Paint Room, Release Room, signalétique</small></li>
      <li><b>09</b> Brand applications <small>dix-neuf applications présentées</small></li>
      <li><b>10</b> Do / Don’t <small>ce qu’il faut faire, ce qu’il faut éviter</small></li>
    </ol>` }));

  /* 01 — histoire, concept */
  planches.push(planche({ section: S1, titre: 'Un lieu où l’on fait ce qu’on ne peut pas faire chez soi', sur: 'Histoire et concept', corps: `
    <div class="grille-2">
      <div class="colonne">
        <p class="intro">BREAK &amp; CREATE naît à Akanda, aux portes de Libreville, d’un constat simple : les sorties se ressemblent. On mange, on boit, on regarde. Ici, on fait. On peint, on casse, on éclabousse, on rit, on repart avec une toile, une vidéo et une histoire à raconter.</p>
        <p>Le lieu réunit deux univers complémentaires sous un même toit. Ils portent chacun un mot du nom de la marque, et c’est la tension entre les deux qui fait l’identité.</p>
        <dl class="cles">
          <dt>Lieu</dt><dd>Akanda, Gabon (Grand Libreville)</dd>
          <dt>Public</dt><dd>Jeunes adultes, groupes d’amis, couples, familles, équipes d’entreprise, personnes en quête d’une sortie originale</dd>
          <dt>Promesse</dt><dd>Une destination d’expériences créatives et immersives, pas « un atelier de peinture plus une rage room »</dd>
          <dt>Ambition</dt><dd>Une marque forte à Libreville, déclinable dans d’autres villes africaines</dd>
        </dl>
      </div>
      <div class="colonne">
        <div class="bloc bloc--noir">
          <p class="etiquette">CREATE — Paint Room</p>
          <h3>L’espace de la création</h3>
          <p>Une toile, de la peinture, des pinceaux, des palettes, un chevalet, un tablier. On crée librement ou l’on suit une expérience guidée : Paint &amp; Chill, Paint with Friends, Paint Date, Paint Party, Paint Theme.</p>
        </div>
        <div class="bloc bloc--orange">
          <p class="etiquette">BREAK — Release Room</p>
          <h3>L’espace du lâcher-prise</h3>
          <p>Sessions de défoulement, projection de peinture, casse d’objets spécialement préparés, expériences musicales et créatives, activités de groupe. Un cadre sûr, encadré, joyeux. Jamais présenté comme une thérapie ni un service médical.</p>
        </div>
      </div>
    </div>` }));

  /* 01 — mission, vision, valeurs */
  planches.push(planche({ section: S1, titre: 'Mission, vision, valeurs', corps: `
    <div class="grille-3">
      <div class="bloc">
        <p class="etiquette">Mission</p>
        <h3>Sortir les gens de la routine par l’action</h3>
        <p>Offrir, en une séance, une expérience qu’on ne vit nulle part ailleurs : créer de ses mains, se défouler sans conséquence, partager un moment fort avec ses proches et en garder une trace (une toile, des photos, une vidéo).</p>
      </div>
      <div class="bloc">
        <p class="etiquette">Vision</p>
        <h3>Devenir la référence des expériences créatives en Afrique centrale</h3>
        <p>Un premier lieu à Akanda qui fonctionne comme un modèle : concept, identité, parcours client et exploitation reproductibles dans d’autres villes, avec la même exigence de qualité et la même énergie.</p>
      </div>
      <div class="colonne">
        <div class="bloc bloc--noir" style="flex:1">
          <p class="etiquette">Valeurs</p>
          <ul class="liste liste--sans">
            <li><b>Expression.</b> Chacun a quelque chose à sortir, avec ou sans technique.</li>
            <li><b>Énergie.</b> On vient pour vivre quelque chose, pas pour regarder.</li>
            <li><b>Liberté.</b> Un cadre clair pour que tout soit permis à l’intérieur.</li>
            <li><b>Jeu.</b> Rien n’est grave, tout est sérieux dans l’organisation.</li>
            <li><b>Partage.</b> On repart avec un souvenir commun et des images à montrer.</li>
          </ul>
        </div>
      </div>
    </div>` }));

  /* 01 — personnalité et positionnement */
  planches.push(planche({ section: S1, titre: 'Personnalité : jeune, audacieuse, accessible', sur: 'Ce que la marque est, ce qu’elle n’est pas', corps: `
    <div class="grille-2">
      <div class="colonne">
        <p class="etiquette">La marque est</p>
        <div class="mots-cles"><span>jeune</span><span>audacieuse</span><span>créative</span><span>énergique</span><span>spontanée</span><span>accessible</span><span>expressive</span><span>légèrement rebelle</span><span>amusante</span><span>contemporaine</span><span>photogénique</span><span>mémorable</span></div>
        <p class="etiquette" style="margin-top:14px">Elle n’est pas</p>
        <div class="mots-cles"><span class="non">enfantine</span><span class="non">luxueuse</span><span class="non">institutionnelle</span><span class="non">galerie d’art</span><span class="non">agressive</span><span class="non">sombre</span><span class="non">colère, violence</span></div>
        <hr class="filet">
        <p class="etiquette">Ton de voix</p>
        <p>Direct, chaleureux, à l’impératif quand on invite à agir (« Viens casser ta routine »). Tutoiement sur les réseaux et dans le lieu, vouvoiement dans les documents contractuels et les échanges avec les entreprises. Phrases courtes. Pas de jargon artistique, pas de vocabulaire médical ou psychologique.</p>
      </div>
      <div class="colonne">
        <div class="bloc bloc--orange" style="flex:1;justify-content:center">
          <p class="etiquette">Positionnement</p>
          <p class="enorme" style="font-size:64px">Une destination d’expériences créatives et immersives.</p>
        </div>
        <div class="bloc">
          <h4>Le client vient pour</h4>
          <p>sortir de la routine · créer · expérimenter · se défouler · passer un moment avec ses proches · créer des souvenirs · prendre des photos et des vidéos · partager son expérience.</p>
          <p class="grand" style="font-size:26px">ART × ENERGY × FREEDOM × PLAY × EXPRESSION</p>
        </div>
      </div>
    </div>` }));

  /* 01 — idée centrale */
  planches.push(planche({ section: S1, titre: 'L’idée centrale : la tension entre deux gestes', sur: 'Signature visuelle', sombre: true, corps: `
    <div class="grille-2">
      <div class="colonne" style="justify-content:space-between">
        <div>
          <p class="enorme" style="color:#fff">BREAK</p>
          <p style="max-width:44ch;margin-top:12px">Rupture, mouvement, énergie, spontanéité, destruction contrôlée, lâcher-prise. Dans l’identité : la fracture, le fragment, le décalage, la trace.</p>
        </div>
        <div>
          <p class="enorme" style="color:${ORANGE}">CREATE</p>
          <p style="max-width:44ch;margin-top:12px">Expression, imagination, couleur, construction, art, création. Dans l’identité : le bloc entier, la ligne nette, la composition qui se reconstruit, l’orange.</p>
        </div>
      </div>
      <div class="colonne">
        <div class="bloc" style="border-color:rgba(255,255,255,.2);flex:1;justify-content:center;gap:18px">
          <p class="etiquette">Cinq oppositions, une signature</p>
          <p class="grand" style="font-size:40px;line-height:1.15">ORDRE × CHAOS<br>CONSTRUCTION × DESTRUCTION<br>CONTROL × FREEDOM<br>BLACK × ORANGE<br>CLEAN × MESSY</p>
          <p class="note">Chaque support met en scène ce contraste : une partie nette et construite, une partie fracturée ou tachée. Jamais tout propre, jamais tout chaotique.</p>
        </div>
        <div class="seq">${sequence({ couleur: BLANC, accent: ORANGE }).map((s, i) => `<figure>${s}<figcaption><b>0${i + 1}</b>${['Structure', 'Rupture', 'Fragmentation', 'Recomposition', 'Création'][i]}</figcaption></figure>`).join('')}</div>
      </div>
    </div>` }));

  /* 01 — slogans */
  planches.push(planche({ section: S1, titre: 'Slogans : un principal, des messages secondaires', corps: `
    <div class="grille-2-1">
      <div class="colonne">
        <div class="bloc bloc--noir" style="padding:40px">
          <p class="etiquette">Slogan principal · toujours en capitales, Space Grotesk 700, trois points</p>
          <p class="enorme" style="color:#fff">CREATE.<br>RELEASE.<br>ENJOY.</p>
          <p class="note">Il accompagne le logo sur l’enseigne, le site, les affiches génériques et le profil Instagram. C’est le seul slogan qui peut apparaître avec le logo principal.</p>
        </div>
        <div class="bloc">
          <p class="etiquette">Slogan secondaire · phrase, Inter, jamais en capitales</p>
          <p class="grand">Ton espace pour créer, lâcher prise et t’amuser.</p>
          <p class="note">Explique le principal. Utilisé dans les descriptions, les bios, les pages d’accueil, les présentations partenaires.</p>
        </div>
      </div>
      <div class="colonne">
        <div class="bloc" style="flex:1">
          <p class="etiquette">Messages courts · un seul par support, pour les campagnes et les réseaux</p>
          <ul class="liste liste--sans" style="font-family:var(--titrage);font-weight:700;font-size:22px;gap:14px">
            <li>Create your chaos.</li>
            <li>Make a mess. Make memories.</li>
            <li>Break the routine. Create something.</li>
            <li>Break. Create. Repeat.</li>
          </ul>
          <hr class="filet">
          <h4>Règles</h4>
          <ul class="liste">
            <li>Jamais deux slogans sur le même support.</li>
            <li>Le principal n’est jamais traduit ni reformulé.</li>
            <li>Les messages courts peuvent être fracturés graphiquement (voir chapitre 05), le principal jamais.</li>
            <li>Aucun slogan ne parle de colère, de thérapie ou de bien-être médical.</li>
          </ul>
        </div>
      </div>
    </div>` }));

  /* 02 — pistes */
  planches.push(planche({ section: S2, titre: 'Quatre pistes explorées', sur: 'Le logo', corps: `
    <div class="grille-4">
      <div class="piste">
        <h3>A — Typographique</h3>
        <div class="logo-cadre logo-cadre--blanc">${motSymbole({ fracture: false, ampersandCouleur: NOIR })}</div>
        <p>Le nom, en Space Grotesk 700, rien d’autre. Solide, mais interchangeable : rien ne raconte BREAK ni CREATE.</p>
      </div>
      <div class="piste">
        <h3>B — Contraste</h3>
        <div class="logo-cadre logo-cadre--blanc"><svg viewBox="-10 -20 940 136" class="logo" role="img" aria-label="BREAK et CREATE, piste contraste"><text x="0" y="93" font-family="Space Grotesk" font-weight="300" font-size="100" letter-spacing="-3" fill="${NOIR}">BREAK</text><text x="385" y="93" font-family="Space Grotesk" font-weight="700" font-size="100" fill="${ORANGE}">&amp;</text><text x="487" y="93" font-family="Space Grotesk" font-weight="700" font-size="100" letter-spacing="-3" fill="${NOIR}">CREATE</text></svg></div>
        <p>BREAK en graisse fine, CREATE en gras. Le contraste se lit, mais BREAK paraît faible alors qu’il doit être énergique.</p>
      </div>
      <div class="piste">
        <h3>C — Ampersand</h3>
        <div class="logo-cadre logo-cadre--blanc">${symbole({ taille: 100 })}</div>
        <p>Le &amp; devient le symbole : une tuile noire dont un coin se détache, l’esperluette orange au centre. Fonctionne seul en favicon, avatar et signalétique.</p>
      </div>
      <div class="piste piste--retenue">
        <h3>D — Break / Create</h3>
        <div class="logo-cadre logo-cadre--blanc">${motSymbole()}</div>
        <p>BREAK est fracturé par une coupe diagonale, la moitié haute glisse ; CREATE reste parfaitement construit ; le &amp; orange fait la jonction. Retenue, associée au symbole de la piste C.</p>
      </div>
    </div>` }));

  /* 02 — logo principal */
  planches.push(planche({ section: S2, titre: 'Logo principal', sur: 'Version horizontale, à privilégier partout où la largeur le permet', corps: `
    <div class="grille-2-1">
      <div class="logo-cadre logo-cadre--blanc">${motSymbole({ taille: 100 })}</div>
      <div class="colonne">
        <div class="bloc" style="flex:1">
          <h3>Ce qui le compose</h3>
          <ul class="liste">
            <li><b>BREAK</b>, Space Grotesk 700, capitales, approche resserrée de 3 %. Une coupe diagonale (montante de gauche à droite) sépare le mot en deux ; la partie haute est décalée de 7 % de la hauteur de capitale vers la droite et de 3,5 % vers le haut.</li>
            <li><b>&amp;</b>, même police, en Flame Orange. C’est le seul élément coloré du logo.</li>
            <li><b>CREATE</b>, même police, intact, aligné sur la même ligne de base.</li>
          </ul>
          <p class="note">La fracture n’est pas un effet de style à réinterpréter : ses proportions sont fixes et fournies dans les fichiers vectoriels. On ne redessine jamais le logo.</p>
        </div>
        <div class="bloc bloc--gris">
          <h4>Fichiers fournis</h4>
          <p class="note">logos/break-and-create-principal.svg · principal-blanc.svg · principal-mono-noir.svg · principal-mono-blanc.svg · secondaire.svg · symbole.svg · symbole-blanc.svg (voir chapitre 09 pour les usages).</p>
        </div>
      </div>
    </div>` }));

  /* 02 — construction */
  planches.push(planche({ section: S2, titre: 'Construction et espace de protection', corps: `
    <div class="grille-2-1">
      <div class="logo-cadre logo-cadre--blanc" style="padding:40px">${construction()}</div>
      <div class="colonne">
        <div class="bloc" style="flex:1">
          <h3>Espace de protection</h3>
          <p>Autour du logo, une zone vide égale à <b>x</b>, la hauteur de l’esperluette. Aucun texte, aucune image, aucun élément graphique n’y entre. Le bord d’un support compte comme un élément.</p>
          <h4 style="margin-top:8px">Alignement</h4>
          <p>Le logo s’aligne à gauche ou au centre. Jamais à droite seul sur une composition, sauf en pied de page avec des mentions.</p>
          <h4 style="margin-top:8px">Sur une photo</h4>
          <p>Uniquement sur une zone calme et suffisamment contrastée ; sinon poser le logo dans un bloc noir ou orange qui respecte la zone de protection.</p>
        </div>
      </div>
    </div>` }));

  /* 02 — secondaire et symbole */
  planches.push(planche({ section: S2, titre: 'Logo secondaire et symbole', corps: `
    <div class="grille-3">
      <div class="colonne">
        <div class="logo-cadre logo-cadre--blanc" style="flex:1">${logoEmpile({ taille: 100 })}</div>
        <div class="bloc"><h4>Logo secondaire</h4><p>Version empilée sur trois lignes pour les formats carrés et verticaux : avatar des réseaux, écran de photobooth, signalétique de porte, carte cadeau. Mêmes règles de fracture et de couleur que le principal.</p></div>
      </div>
      <div class="colonne">
        <div class="logo-cadre logo-cadre--blanc" style="flex:1">${symbole({ taille: 100 })}</div>
        <div class="bloc"><h4>Symbole</h4><p>Tuile noire, coin inférieur droit détaché (le fragment), esperluette orange. Il porte seul la marque en favicon, icône d’application, avatar, bouton, signalétique de porte et marquage discret sur les objets.</p></div>
      </div>
      <div class="colonne">
        <div class="grille-2" style="height:auto;flex:1;gap:14px">
          <div class="logo-cadre logo-cadre--noir">${symbole({ fond: ORANGE, glyphe: NOIR, taille: 100 })}</div>
          <div class="logo-cadre logo-cadre--orange">${symbole({ fond: NOIR, glyphe: ORANGE, taille: 100 })}</div>
          <div class="logo-cadre logo-cadre--blanc">${symbole({ fond: NOIR, glyphe: BLANC, taille: 100 })}</div>
          <div class="logo-cadre logo-cadre--noir">${symbole({ fond: BLANC, glyphe: NOIR, taille: 100 })}</div>
        </div>
        <div class="bloc"><h4>Variantes du symbole</h4><p>Sur noir : tuile orange, &amp; noir. Sur orange : tuile noire, &amp; orange. Monochrome : tuile noire et &amp; blanc, ou l’inverse. Le fragment est toujours présent.</p></div>
      </div>
    </div>` }));

  /* 02 — monochrome et fonds */
  planches.push(planche({ section: S2, titre: 'Fonds et versions monochromes', corps: `
    <div class="grille-3" style="grid-template-rows:1fr 1fr">
      <div class="logo-cadre logo-cadre--blanc">${motSymbole()}</div>
      <div class="logo-cadre logo-cadre--noir">${motSymbole({ couleur: BLANC })}</div>
      <div class="logo-cadre logo-cadre--orange">${motSymbole({ ampersandCouleur: NOIR })}</div>
      <div class="logo-cadre logo-cadre--blanc">${motSymbole({ ampersandCouleur: NOIR })}</div>
      <div class="logo-cadre logo-cadre--noir">${motSymbole({ couleur: BLANC, ampersandCouleur: BLANC })}</div>
      <div class="bloc">
        <h3>Règles</h3>
        <ul class="liste">
          <li>Sur blanc : noir avec &amp; orange (version de référence).</li>
          <li>Sur noir : blanc avec &amp; orange.</li>
          <li>Sur orange : tout noir. Le &amp; n’est jamais blanc sur orange (contraste insuffisant).</li>
          <li>Monochrome (gravure, broderie, tampon, fax, une seule encre) : tout noir sur clair, tout blanc sur foncé.</li>
          <li>Aucune autre couleur, aucun dégradé, aucune ombre, aucun contour.</li>
        </ul>
      </div>
    </div>` }));

  /* 02 — tailles et interdits */
  planches.push(planche({ section: S2, titre: 'Tailles minimales et usages interdits', corps: `
    <div class="grille-1-2">
      <div class="colonne">
        <div class="bloc" style="flex:1">
          <h3>Tailles minimales</h3>
          <div class="tailles" style="margin:14px 0">
            <div><div style="width:140px">${motSymbole()}</div><span>Principal · 140 px / 35 mm</span></div>
            <div><div style="width:70px">${logoEmpile()}</div><span>Secondaire · 70 px / 18 mm</span></div>
            <div><div style="width:24px">${symbole()}</div><span>Symbole · 24 px / 6 mm</span></div>
          </div>
          <p>En dessous, la fracture de BREAK ne se lit plus : on passe à la version de taille inférieure (secondaire, puis symbole). Broderie et gravure : au moins 45 mm pour le principal, fracture conservée.</p>
        </div>
      </div>
      <div class="interdits">
        <div class="interdit"><div class="logo-cadre logo-cadre--blanc"><div style="width:80%;transform:scaleX(1.5)">${motSymbole()}</div></div><p>Déformer, étirer, écraser.</p></div>
        <div class="interdit"><div class="logo-cadre logo-cadre--blanc"><div style="width:80%;transform:rotate(-14deg)">${motSymbole()}</div></div><p>Incliner ou faire pivoter (l’énergie vient de la fracture, pas de la rotation).</p></div>
        <div class="interdit"><div class="logo-cadre logo-cadre--blanc"><div style="width:80%;filter:drop-shadow(6px 6px 0 #999)">${motSymbole()}</div></div><p>Ajouter une ombre, un contour, un relief, un dégradé.</p></div>
        <div class="interdit"><div class="logo-cadre logo-cadre--blanc"><div style="width:80%">${motSymbole({ couleur: '#2E6BD6', ampersandCouleur: '#2E6BD6' })}</div></div><p>Changer les couleurs ou en ajouter une troisième.</p></div>
        <div class="interdit"><div class="logo-cadre logo-cadre--blanc"><div style="width:80%">${motSymbole({ fracture: false })}</div></div><p>Supprimer la fracture de BREAK ou la redessiner à sa manière.</p></div>
        <div class="interdit"><div class="logo-cadre logo-cadre--blanc" style="background:repeating-linear-gradient(45deg,#ddd 0 12px,#fff 12px 24px)"><div style="width:80%">${motSymbole()}</div></div><p>Poser le logo sur un fond chargé, une photo agitée ou un motif.</p></div>
      </div>
    </div>` }));

  return planches;
}
