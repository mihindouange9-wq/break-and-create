# BREAK & CREATE — charte graphique

Identité visuelle de BREAK & CREATE, destination d’expériences créatives et immersives à Akanda (Gabon) : Paint Room (CREATE) et Release Room (BREAK). Version 1.0, septembre 2026.

## Ouvrir

- `charte/index.html` : la charte complète, 40 planches (double-clic, tout est hors ligne). La dernière planche signe le document : BREAK & CREATE × MÉTHODE AURA, studio qui a réalisé la charte (logo reconstruit en vectoriel dans `source/lib.mjs`, police Sora dans `charte/assets/fonts/`).
- `charte/BREAK-AND-CREATE-charte.pdf` : la même charte en PDF, une planche par page (format 1600 × 1000 px, paysage).
- `logos/` : les logos en SVG (principal, blanc, sur orange, monochromes, secondaire empilé, symbole et ses variantes), police Space Grotesk embarquée pour un affichage fidèle dans tout navigateur. Pour l’impression, la broderie ou la gravure, demander au prestataire de vectoriser les textes à partir de ces fichiers.
- `charte/assets/fonts/` : Space Grotesk et Inter (licence SIL Open Font License).

## Contenu de la charte

01 Brand overview · 02 Logo (quatre pistes, logo retenu, construction, secondaire, symbole, fonds, tailles, interdits) · 03 Colors (Charcoal Black #171717, Flame Orange #FF5A1F, blanc fonctionnel, combinaisons avec contrastes mesurés) · 04 Typography (Space Grotesk, Inter, six niveaux) · 05 Graphic system (fragments, traces, éclaboussures contrôlées, séquence BREAK → CREATE, hachures, règles d’assemblage) · 06 Photography · 07 Digital (réseaux, stories, profil, site, composants, réservation, billet) · 08 Physical experience (façade, accueil, Paint Room, Release Room, signalétique) · 09 Brand applications (dix-neuf applications : les objets dérivés, vêtements, gobelets, packaging et stickers ont été retirés à la demande du client) · 10 Do / Don’t.

## Modifier

Le document est généré : on modifie les sources, jamais le HTML.

```
node source/build.mjs      # régénère charte/index.html, le CSS et les logos SVG
node tools/verifier.mjs    # Chrome sans interface : polices, débordements, textes, console, captures dans tools/captures/
node tools/pdf.mjs         # export PDF
```

- `source/lib.mjs` : couleurs, logos (mot-symbole fracturé, logo empilé, symbole), système graphique (fragments, trace, éclaboussure, séquence, hachures), planche, utilitaires CMJN et contraste.
- `source/sections/*.mjs` : les planches, chapitre par chapitre.
- `source/style.css` : la mise en page du document (planches 1600 × 1000, impression).
- `tools/capturer.mjs N` capture une planche en vue directe ; `tools/evaluer.mjs "expr"` évalue une expression dans la page.

## Choix à connaître

- Le logo retenu combine la piste D (BREAK fracturé par une coupe diagonale, CREATE intact, & orange) et la piste C (symbole : tuile noire au coin détaché, esperluette orange).
- Les mockups sont dessinés en vectoriel : aucune photo n’est fournie ; le chapitre 06 décrit les sujets à produire.
- Les tarifs et dates qui apparaissent dans les maquettes sont des exemples de mise en page, signalés comme tels.
- Les valeurs CMJN sont indicatives (conversion mathématique) : à caler avec l’imprimeur sur un nuancier.

## Le site (`site/`)

Site expérientiel d’une page, hors ligne et déployable tel quel sur Netlify ou tout hébergeur statique : `site/index.html`, généré par `node source/site/build.mjs` à partir de `source/site/donnees.mjs` (textes, expériences, tarifs, adresse, horaires, numéro WhatsApp, courriel, Instagram).

- **Narration** : Break (héros, BREAK fracturé qui suit la souris) → Step out → Play (piste horizontale épinglée des sept expériences, photo au survol) → transition « CREATE » qui grandit → Create (Paint Room, orange) → Break (Release Room, noir) → Share (galerie qui file avec la vitesse de défilement) → Remember (pourquoi, séquence BREAK → CREATE) → Libreville (mot géant, Akanda, infos) → Tarifs → Réserver (formulaire qui compose un message WhatsApp) → pied de page, dernière scène.
- **Technique** : HTML, CSS et JavaScript sans framework ni bundler (GSAP 3.13, ScrollTrigger et Lenis copiés dans `site/assets/vendor/`), polices Space Grotesk et Inter auto-hébergées, photos en WebP 1600 et 800 px avec repli JPEG (`node tools/images.mjs`, conversion par Chrome), curseur contextuel et boutons magnétiques seulement à la souris, tout statique en `prefers-reduced-motion`, compositions repensées sous 760 px. React n’a pas été retenu : une page statique est plus légère, plus rapide et sans chaîne de compilation (les binaires npm récents sont bloqués sur ce poste).
- **Tarifs (FCFA)** : alignés sur les studios de la sous-région relevés le 27 septembre 2026 : Paint & Sip à 15 000 FCFA par personne à Cotonou ([Paint With Dayaa](https://www.paintwithdaya.site/)), à Dakar ([Au Sénégal](https://www.au-senegal.com/paint-and-sip,16658.html?lang=fr)) et à Yaoundé ([Showbook Africa](https://showbook.africa/events/sip-and-paint-experience-02-march-2025-in-yaounde)) ; salles de défoulement : R175 par personne à Johannesburg ([RageRoomSA](http://rageroomsa.co.za/services/)) et KES 8 000 les 20 minutes pour 1 à 2 personnes à Nairobi ([Rage Room Kenya](https://x.com/rageroomke/status/1471650993221906433)). Grille retenue (relevée légèrement au-dessus du marché à la demande du client, boissons non comprises) : Paint & Chill 17 000, Paint Theme 18 000, Paint with Friends 15 000, Paint Party 14 000, Paint Date 32 000 le duo, Release Session 12 000 (20 000 le duo), formule Break & Create 25 000.
- **Collaboration** : le pied de page porte le lockup BREAK & CREATE × MÉTHODE AURA (mot-symbole blanc, croix orange, logo AURA en Ivoire #F5F2EA conformément à la charte du studio, lien vers methode-aura.onrender.com) et la mention « Identité visuelle, charte graphique et site conçus et réalisés par MÉTHODE AURA ». Sora est auto-hébergée dans  uniquement pour ce lockup.
- **Photos** : libres de droits (licence Pexels), personnes noires et métisses en train de peindre ou de casser, listées avec leur lien dans `site/assets/img/credits.json` et dans le pied de page. À remplacer par les photos du lieu après la première séance.
- **À compléter par le client** (`source/site/donnees.mjs`) : numéro WhatsApp (tant qu’il vaut 241000000000, le formulaire bascule sur le courriel), adresse exacte, horaires, courriel, compte Instagram, nom de domaine.

```
node source/site/build.mjs        # régénère site/index.html
node tools/site-verifier.mjs      # bureau 1440, tablette 820, téléphone 390 : défilement, images, textes, contrastes, formulaire, console, captures dans tools/captures-site/
node tools/images.mjs             # reconvertit les photos en WebP après un ajout
```

## Publication

Dépôt GitHub public https://github.com/mihindouange9-wq/break-and-create. `render.yaml` décrit un site statique Render servi directement depuis `site/` (aucune compilation) ; `tools/render-deploy.mjs` crée ou redéploie le service par l'API (`RENDER_API_KEY=rnd_… node tools/render-deploy.mjs`), car un push sur `main` ne redéploie pas forcément. Le dossier `site-partage/` n'est pas versionné (copie de `site/` sans `credits.json`).
