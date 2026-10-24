/* BREAK & CREATE — contenu du site. Tout ce qui se modifie sans toucher au code est ici.
   Les champs marqués « à confirmer » sont affichés tels quels tant que le client ne les a pas fournis. */

export const marque = {
  nom: 'BREAK & CREATE',
  slogan: 'CREATE. RELEASE. ENJOY.',
  sloganSecondaire: 'Ton espace pour créer, lâcher prise et t’amuser.',
  message: 'Break the routine. Create the moment.',
  ville: 'Libreville',
  quartier: 'Akanda',
  adresse: 'Akanda, Grand Libreville · adresse exacte communiquée à la réservation', /* à confirmer */
  horaires: [ /* à confirmer */
    ['Mardi – Jeudi', '15 h – 22 h'],
    ['Vendredi – Samedi', '12 h – 23 h'],
    ['Dimanche', '12 h – 20 h'],
  ],
  horairesAConfirmer: true,
  whatsapp: '241000000000', /* à confirmer : numéro au format international sans + ni espaces */
  email: 'contact@breakandcreate.ga', /* à confirmer */
  instagram: 'breakandcreate', /* à confirmer */
  domaine: 'breakandcreate.ga', /* à confirmer */
};

/* Tarifs en FCFA. Repères de marché relevés le 27 septembre 2026 : Paint & Sip à 15 000 FCFA par personne
   à Cotonou (Paint With Dayaa), Dakar (Route des Almadies) et Yaoundé ; salles de défoulement : environ
   6 000 FCFA par personne à Johannesburg (R175), environ 35 000 FCFA les 20 minutes pour 1 à 2 personnes à
   Nairobi (KES 8 000). Voir README. */
export const experiences = [
  { id: 'paint-chill', univers: 'create', numero: '01', nom: 'Paint & Chill', accroche: 'Une toile, ta playlist, ton rythme.', duree: '90 min', prix: 17000, unite: 'par personne', texte: 'Séance libre. Tu reçois une toile 30 × 40, la peinture, les pinceaux et un tablier. Boissons et snacks au bar, en supplément. Personne ne juge, tout le monde repart avec sa toile.', photo: 'atelier-tablier-rouge', photoAlt: 'Une jeune femme en tablier rouge choisit ses couleurs dans l’atelier', curseur: 'PEINDRE' },
  { id: 'paint-date', univers: 'create', numero: '02', nom: 'Paint Date', accroche: 'Deux chevalets face à face.', duree: '2 h', prix: 32000, unite: 'par duo', texte: 'Deux toiles, un chevalet pour deux, une playlist douce. Le rendez-vous qu’on n’oublie pas, avec une preuve accrochée au mur.', photo: 'couple-chevalet', photoAlt: 'Un couple peint ensemble sur un même chevalet', curseur: 'À DEUX' },
  { id: 'paint-friends', univers: 'create', numero: '03', nom: 'Paint with Friends', accroche: 'Le même thème, six versions.', duree: '2 h', prix: 15000, unite: 'par personne, dès 4', texte: 'Un thème commun, chacun sa toile, et la comparaison finale qui fait rire tout le monde. Bar sur place.', photo: 'groupe-atelier', photoAlt: 'Un groupe d’amis peint sur des chevalets alignés', curseur: 'ENTRE AMIS' },
  { id: 'paint-party', univers: 'create', numero: '04', nom: 'Paint Party', accroche: 'Anniversaire, équipe, EVJF.', duree: '2 h', prix: 14000, unite: 'par personne, dès 8', texte: 'La salle pour vous, un animateur, un thème choisi ensemble, gâteau et playlist bienvenus. Privatisation complète sur devis.', photo: 'homme-exterieur', photoAlt: 'Un jeune homme sourit en peignant, pinceau à la main', curseur: 'LA FÊTE' },
  { id: 'paint-theme', univers: 'create', numero: '05', nom: 'Paint Theme', accroche: 'Chaque jeudi, un sujet imposé.', duree: '90 min', prix: 18000, unite: 'par personne', texte: 'Un thème par semaine, guidé pas à pas par un artiste. Pour ceux qui veulent apprendre un geste, pas seulement passer un moment.', photo: 'peinture-chevalet-femme', photoAlt: 'Une artiste peint sur un chevalet dans un atelier lumineux', curseur: 'APPRENDRE' },
  { id: 'release', univers: 'break', numero: '06', nom: 'Release Session', accroche: 'Vingt minutes pour tout lâcher.', duree: '20 min', prix: 12000, unite: 'par personne · 20 000 le duo', texte: 'Casque, gants, combinaison, une batte et des objets préparés pour ça. Un animateur, une playlist qui tape, et le silence après. Rien de médical : juste du bruit et du rire.', photo: 'casse-guitare-tv', photoAlt: 'Un homme brise une guitare sur un vieux téléviseur', curseur: 'LÂCHER' },
  { id: 'combo', univers: 'both', numero: '07', nom: 'Break & Create', accroche: 'Casser d’abord, peindre ensuite.', duree: '20 min + 60 min', prix: 25000, unite: 'par personne', texte: 'L’expérience complète : une Release Session, puis une toile pour poser ce qui reste. La formule qui porte notre nom.', photo: 'casse-marteau-portrait', photoAlt: 'Un homme en tablier tient un marteau dans un atelier', curseur: 'LES DEUX' },
];

export const formatFcfa = (n) => n.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' FCFA';

export const scenes = {
  hero: { question: 'Et si on arrêtait simplement de faire défiler nos journées ?', cta: 'Entrer dans l’expérience' },
  stepOut: { lignes: ['Sortir de la routine.', 'Faire une pause.', 'Changer d’air.', 'Se libérer du quotidien.'], note: 'Un lieu à Akanda où l’on ne regarde pas : on fait.' },
  create: { titre: 'Créer quelque chose. De tes mains.', texte: 'Tu n’as jamais tenu un pinceau ? Tant mieux. Ici, la toile est à toi, la technique vient après, et le résultat se regarde avec fierté ou avec un fou rire.' },
  release: { titre: 'Lâcher tout. Dans un cadre sûr.', texte: 'Casque, gants, combinaison, objets préparés, animateur présent du début à la fin. Le Release Room est bruyant, joyeux et encadré. Ce n’est ni une thérapie ni un défouloir de colère : c’est un jeu.', mots: ['Casser', 'Crier', 'Rire', 'Respirer'] },
  share: { titre: 'Repartir avec des images.', texte: 'Un photobooth aux couleurs du lieu, un mur pour poser la toile, et une lumière faite pour ça. #breakandcreate', hashtag: '#breakandcreate' },
  pourquoi: {
    titre: 'Pourquoi Break & Create ?',
    points: [
      ['01', 'Sortir de la routine', 'Une sortie qui ne se résume pas à manger, boire ou regarder.'],
      ['02', 'Passer du temps autrement', 'Avec ses amis, son partenaire, sa famille, son équipe.'],
      ['03', 'Créer avec ses proches', 'Deux mains, une toile, et ce qui se dit pendant qu’on peint.'],
      ['04', 'Découvrir une activité', 'Guidé ou libre, avec ou sans technique.'],
      ['05', 'Vivre quelque chose de différent', 'Casser en toute sécurité, puis construire : deux gestes qu’on ne fait nulle part ailleurs.'],
      ['06', 'Repartir avec un souvenir', 'Une toile, des photos, une vidéo. La preuve que c’est arrivé.'],
    ],
  },
  libreville: { titre: 'Libreville', sousTitre: 'Akanda, aux portes de la ville.', texte: 'Un lieu pensé pour ici : la lumière, la musique, les groupes qui arrivent en retard et repartent tard. On vient en famille le dimanche, entre amis le vendredi, à deux quand on veut.' },
  reserver: { titre: 'Réserve ton moment.', texte: 'Choisis une expérience, une date, le nombre de personnes : on confirme sur WhatsApp. Paiement Mobile Money ou sur place.' },
};

/* photos : nom de fichier (sans extension) → texte alternatif */
export const photos = {
  'hero-visage': 'Portrait d’une jeune femme, le visage traversé de traits de peinture colorée',
  'visages-duo': 'Deux amies, visages et t-shirts couverts de peinture, regardent l’objectif',
  'casse-masse-nb': 'Portrait en noir et blanc d’une jeune femme assise, une masse à la main',
  'casse-guitare-tv': 'Un homme brise une guitare sur un vieux téléviseur',
  'casse-marteau-geste': 'Un sculpteur lève son marteau dans un atelier',
  'casse-marteau-detail': 'Gros plan sur un marteau frappant une sculpture d’argile',
  'debris-assiettes-nb': 'Des assiettes brisées en noir et blanc',
  'bouteille-eclat': 'Une bouteille en verre éclate dans le noir',
  'atelier-tablier-rouge': 'Une jeune femme en tablier rouge choisit ses couleurs dans l’atelier',
  'couple-chevalet': 'Un couple peint ensemble sur un même chevalet',
  'couple-etreinte': 'Un couple enlacé entre ses deux toiles',
  'main-pinceau': 'Une main tient un pinceau au-dessus d’une toile',
  'mains-peinture': 'Deux paires de mains couvertes de peinture',
  'groupe-atelier': 'Un groupe d’amis peint sur des chevalets alignés',
  'homme-exterieur': 'Un jeune homme sourit en peignant, pinceau à la main',
  'homme-palette': 'Un homme en tablier tient une palette devant sa toile',
  'femme-toile': 'Une jeune femme regarde la toile qu’elle vient de finir',
  'femme-denim': 'Une jeune femme en chemise en jean peint, concentrée',
  'visage-pinceaux': 'Un visage peint de couleurs vives entouré de pinceaux',
  'casse-homme-marteau': 'Un homme élégant tient un marteau dans un atelier extérieur',
};
