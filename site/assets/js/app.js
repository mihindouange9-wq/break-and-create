/* BREAK & CREATE — moteur d'expérience.
   Défilement fluide (Lenis), scènes GSAP + ScrollTrigger, curseur contextuel, boutons magnétiques, menu,
   fonds qui changent de scène en scène, formulaire de réservation vers WhatsApp.
   Tout se dégrade proprement : mouvement réduit → contenu statique ; écran tactile → pas de curseur ni de survol. */
const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fin = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const mobile = window.matchMedia('(max-width: 760px)').matches;
const q = (s, r = document) => r.querySelector(s);
const qa = (s, r = document) => Array.from(r.querySelectorAll(s));

/* ---------- fonds par scène (le body change de couleur, les scènes restent transparentes) ---------- */
function fonds() {
  const scenes = qa('[data-fond]');
  const appliquer = () => {
    const milieu = window.innerHeight * 0.55;
    let courant = scenes[0];
    for (const s of scenes) { if (s.getBoundingClientRect().top <= milieu) courant = s; }
    const f = courant.dataset.fond;
    if (document.body.dataset.fond !== f) document.body.dataset.fond = f;
  };
  appliquer();
  return appliquer;
}

/* ---------- menu ---------- */
function menu() {
  const bouton = q('[data-menu]'), panneau = q('#menu');
  if (!bouton || !panneau) return;
  const fermer = () => { panneau.hidden = true; bouton.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-ouvert'); window.lenis && window.lenis.start(); };
  bouton.addEventListener('click', () => {
    const ouvert = panneau.hidden;
    panneau.hidden = !ouvert; bouton.setAttribute('aria-expanded', String(ouvert)); document.body.classList.toggle('menu-ouvert', ouvert);
    if (window.lenis) ouvert ? window.lenis.stop() : window.lenis.start();
    if (ouvert && window.gsap && !reduit) gsap.from(qa('#menu nav a'), { y: 30, opacity: 0, stagger: .06, duration: .6, ease: 'power3.out' });
  });
  qa('a', panneau).forEach((a) => a.addEventListener('click', fermer));
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape' && !panneau.hidden) { fermer(); bouton.focus(); } });
}

/* ---------- curseur contextuel ---------- */
function curseur() {
  if (!fin || reduit) return;
  const el = q('.curseur'), mot = q('.curseur-mot');
  document.body.classList.add('curseur-actif');
  const versX = gsap.quickTo(el, 'x', { duration: .18, ease: 'power3' }), versY = gsap.quickTo(el, 'y', { duration: .18, ease: 'power3' });
  window.addEventListener('pointermove', (ev) => { versX(ev.clientX); versY(ev.clientY); }, { passive: true });
  document.addEventListener('pointerover', (ev) => {
    const cible = ev.target.closest('[data-curseur]');
    const lien = ev.target.closest('a, button, select, input, label, summary');
    if (cible) { mot.textContent = cible.dataset.curseur; el.classList.add('a-mot'); el.classList.remove('sur-lien'); }
    else { el.classList.remove('a-mot'); el.classList.toggle('sur-lien', !!lien); }
  });
  document.addEventListener('mouseleave', () => { el.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { el.style.opacity = '1'; });
}

/* ---------- boutons magnétiques (avec parcimonie : les appels à l'action seulement) ---------- */
function magnetique() {
  if (!fin || reduit) return;
  qa('[data-magnetique]').forEach((b) => {
    const x = gsap.quickTo(b, 'x', { duration: .4, ease: 'power3' }), y = gsap.quickTo(b, 'y', { duration: .4, ease: 'power3' });
    b.addEventListener('pointermove', (ev) => { const r = b.getBoundingClientRect(); x((ev.clientX - (r.left + r.width / 2)) * .22); y((ev.clientY - (r.top + r.height / 2)) * .3); });
    b.addEventListener('pointerleave', () => { gsap.to(b, { x: 0, y: 0, duration: .7, ease: 'elastic.out(1, .45)' }); });
  });
}

/* ---------- formulaire → message WhatsApp ---------- */
function formulaire() {
  const f = q('[data-formulaire]'); if (!f) return;
  const etat = q('[data-etat]', f);
  qa('[data-experience]').forEach((a) => a.addEventListener('click', () => { const s = q('select[name=experience]', f); if (s) s.value = a.dataset.experience; }));
  f.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const d = new FormData(f);
    const nomExp = q('select[name=experience] option:checked', f)?.textContent || '';
    const date = d.get('date') ? new Date(d.get('date') + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }) : '';
    if (!date || !d.get('prenom') || !d.get('telephone')) { etat.textContent = 'Il manque une information : date, prénom ou téléphone.'; etat.classList.add('est-erreur'); return; }
    etat.classList.remove('est-erreur');
    const message = `Bonjour Break & Create ! Je souhaite réserver : ${nomExp}. Date : ${date}. Personnes : ${d.get('personnes')}. Prénom : ${d.get('prenom')}. Téléphone : ${d.get('telephone')}.${d.get('mot') ? ' Précision : ' + d.get('mot') + '.' : ''}`;
    const numero = f.dataset.whatsapp;
    if (!numero || /^2410{9}$/.test(numero)) {
      /* numéro pas encore renseigné : on ouvre le courriel à la place et on le dit */
      etat.textContent = 'Le numéro WhatsApp sera activé à l’ouverture : ta demande part par e-mail.';
      window.location.href = `mailto:${f.dataset.email}?subject=${encodeURIComponent('Réservation ' + nomExp)}&body=${encodeURIComponent(message)}`;
      return;
    }
    etat.textContent = 'WhatsApp s’ouvre avec ta demande.';
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
}

/* ---------- scènes animées ---------- */
function scenes() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out' });
  const entete = q('#entete');

  /* défilement fluide */
  if (window.Lenis && !reduit) {
    const lenis = new Lenis({ lerp: .09, smoothWheel: true });
    window.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    qa('a[href^="#"]').forEach((a) => a.addEventListener('click', (ev) => { const cible = q(a.getAttribute('href')); if (!cible) return; ev.preventDefault(); lenis.scrollTo(cible, { offset: -20, duration: 1.4 }); }));
  }

  /* fonds et en-tête qui se cache en descendant */
  const majFond = fonds();
  let dernierY = 0;
  ScrollTrigger.create({ onUpdate: (st) => { majFond(); const y = st.scroll(); entete.classList.toggle('est-cache', y > 200 && y > dernierY && !document.body.classList.contains('menu-ouvert')); dernierY = y; } });

  /* rideau d'ouverture : le mot-symbole apparaît, la fracture claque, le rideau glisse */
  const rideau = q('#rideau');
  let dejaVu = false; try { dejaVu = sessionStorage.getItem('bc-rideau') === '1'; } catch { /* stockage indisponible */ }
  const ouverture = gsap.timeline({ onComplete: () => rideau.classList.add('est-fini') });
  if (dejaVu) ouverture.set(rideau, { autoAlpha: 0 });
  else {
    try { sessionStorage.setItem('bc-rideau', '1'); } catch { /* rien */ }
    ouverture.from('.rideau-mot', { opacity: 0, y: 24, duration: .5 }).to('.rideau-mot', { opacity: 0, duration: .25 }, '+=.35').to(rideau, { yPercent: -100, duration: .7, ease: 'power4.inOut' }, '-=.1');
  }

  /* héros : BREAK arrive fracturé, CREATE lettre à lettre, la photo se révèle, la fracture suit la souris */
  const heros = gsap.timeline({ delay: dejaVu ? .1 : 0 });
  heros
    .from('.fracture-haut', { xPercent: -8, yPercent: -18, opacity: 0, duration: 1, ease: 'expo.out' })
    .from('.fracture-bas', { xPercent: 8, yPercent: 18, opacity: 0, duration: 1, ease: 'expo.out' }, '<')
    .from('.heros-amp', { scale: 0, rotate: -30, opacity: 0, duration: .6, ease: 'back.out(2)' }, '-=.4')
    .from('.heros-create .car', { yPercent: 60, opacity: 0, stagger: .04, duration: .8, ease: 'expo.out' }, '-=.4')
    .from('.heros-photo', { clipPath: 'polygon(0 0, 100% 0, 100% 0, 82% 0, 0 0)', duration: 1.1, ease: 'expo.inOut' }, 0)
    .from('.heros [data-reveal]', { y: 24, opacity: 0, stagger: .12, duration: .7 }, '-=.6');
  ouverture.add(heros, dejaVu ? 0 : '-=.6');
  if (fin) {
    const haut = gsap.quickTo('.fracture-haut', 'x', { duration: .6, ease: 'power3' }), bas = gsap.quickTo('.fracture-bas', 'x', { duration: .6, ease: 'power3' });
    q('.heros').addEventListener('pointermove', (ev) => { const nx = ev.clientX / window.innerWidth - .5; haut(nx * 26); bas(-nx * 26); });
    q('.heros').addEventListener('pointerleave', () => { haut(0); bas(0); });
  } else {
    gsap.to('.fracture-haut', { x: 4, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 });
    gsap.to('.fracture-bas', { x: -4, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 });
  }
  gsap.to('.heros-photo img', { scale: 1, ease: 'none', scrollTrigger: { trigger: '.heros', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.heros-titre', { yPercent: 18, opacity: .3, ease: 'none', scrollTrigger: { trigger: '.heros', start: 'top top', end: 'bottom top', scrub: true } });

  /* parallaxe légère des images */
  qa('[data-parallaxe]').forEach((el) => { const v = Number(el.dataset.parallaxe); gsap.fromTo(el, { yPercent: -v * 100 }, { yPercent: v * 100, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }); });

  /* masques d'images : la photo se révèle de haut en bas */
  qa('[data-masque]').forEach((el) => { gsap.to(el, { clipPath: 'inset(0 0 0% 0)', duration: 1.3, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 82%', once: true } }); gsap.to(q('img', el), { scale: 1, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 82%', once: true } }); });

  /* révélations sobres (une montée en fondu, pas plus) */
  qa('[data-reveal]').forEach((el) => { if (el.closest('.heros')) return; gsap.from(el, { y: 22, opacity: 0, duration: .8, scrollTrigger: { trigger: el, start: 'top 90%', once: true } }); });

  /* titres de scène : les lettres montent depuis la ligne de base */
  qa('.titre-scene').forEach((h) => { gsap.from(qa('.car', h), { yPercent: 70, opacity: 0, stagger: .018, duration: .9, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 85%', once: true } }); });

  /* step out : les lignes s'écrivent une à une pendant qu'on défile, le trait orange annonce la scène suivante */
  gsap.timeline({ scrollTrigger: { trigger: '.step-out', start: 'top 70%', end: 'bottom 60%', scrub: .6 } })
    .from('.step-out-lignes .ligne > span', { yPercent: 110, stagger: .5, duration: 1.2, ease: 'power3.out' });

  /* expériences : piste horizontale épinglée sur ordinateur, liste verticale sur téléphone */
  const piste = q('[data-piste]');
  if (!mobile && piste) {
    // la gouttière est un clamp() : on lit le padding résolu en pixels de la scène, jamais la variable brute (parseFloat donnerait NaN)
    const gouttiere = () => parseFloat(getComputedStyle(q('.experiences')).paddingLeft) || 0;
    const distance = () => Math.max(0, piste.scrollWidth - window.innerWidth + gouttiere() * 2);
    gsap.to(piste, { x: () => -distance(), ease: 'none', scrollTrigger: { trigger: '.experiences', start: 'top top', end: () => '+=' + distance(), pin: true, scrub: .8, anticipatePin: 1, invalidateOnRefresh: true } });
    // molette ou pavé tactile en horizontal sur la section : le geste latéral fait avancer la piste (converti en défilement vertical)
    q('.experiences').addEventListener('wheel', (ev) => {
      if (Math.abs(ev.deltaX) <= Math.abs(ev.deltaY)) return;
      ev.preventDefault();
      const cible = window.scrollY + ev.deltaX;
      if (window.lenis) window.lenis.scrollTo(cible, { duration: .4 }); else window.scrollTo(0, cible);
    }, { passive: false });
  } else if (piste) {
    qa('.experience', piste).forEach((c) => gsap.from(c, { y: 40, opacity: 0, duration: .8, scrollTrigger: { trigger: c, start: 'top 90%', once: true } }));
  }
  /* clavier et tactile : une carte se « survole » au focus ou au toucher */
  qa('.experience').forEach((c) => { c.addEventListener('focusin', () => c.classList.add('est-active')); c.addEventListener('focusout', () => c.classList.remove('est-active')); c.addEventListener('touchstart', () => { qa('.experience.est-active').forEach((o) => o !== c && o.classList.remove('est-active')); c.classList.toggle('est-active'); }, { passive: true }); });

  /* zoom : le mot CREATE grandit jusqu'à remplir l'écran, puis la scène orange arrive */
  gsap.set('.zoom-mot', { position: 'relative', zIndex: 1 });
  // le mot est visible dès l'entrée (opacité acquise sur le premier tiers), puis grandit jusqu'à remplir l'écran
  gsap.fromTo('.zoom-mot', { opacity: 0 }, { opacity: 1, ease: 'power1.out', scrollTrigger: { trigger: '.zoom', start: 'top 80%', end: 'top 30%', scrub: .5 } });
  gsap.fromTo('.zoom-mot', { scale: .6 }, { scale: 14, ease: 'power2.in', scrollTrigger: { trigger: '.zoom', start: 'top 80%', end: 'bottom top', scrub: .5 } });

  /* release : les mots se décalent au défilement, comme des coups */
  gsap.from('.release-mots li', { x: -30, opacity: 0, stagger: .12, duration: .7, scrollTrigger: { trigger: '.release-mots', start: 'top 85%', once: true } });

  /* galerie : file selon la vitesse de défilement, inclinée par la vitesse */
  const galerie = q('.galerie-piste');
  if (galerie) {
    gsap.to(galerie, { x: () => -(galerie.scrollWidth - window.innerWidth), ease: 'none', scrollTrigger: { trigger: '.share', start: 'top bottom', end: 'bottom top', scrub: 1.2, invalidateOnRefresh: true } });
    const incliner = gsap.quickTo(galerie, 'skewX', { duration: .5, ease: 'power3' });
    let repos;
    ScrollTrigger.create({ trigger: '.share', start: 'top bottom', end: 'bottom top', onUpdate: (st) => { incliner(gsap.utils.clamp(-8, 8, st.getVelocity() / 260)); clearTimeout(repos); repos = setTimeout(() => incliner(0), 120); } });
  }

  /* séquence BREAK → CREATE : les cinq étapes s'allument avec l'avancée de la liste */
  const etapes = qa('.sequence .sequence-etape');
  if (etapes.length) ScrollTrigger.create({ trigger: '.pourquoi-liste', start: 'top 70%', end: 'bottom 60%', onUpdate: (st) => { const k = Math.min(etapes.length - 1, Math.floor(st.progress * etapes.length)); etapes.forEach((e, i) => e.classList.toggle('est-active', i <= k)); }, onLeaveBack: () => etapes.forEach((e) => e.classList.remove('est-active')) });

  /* libreville : le mot géant traverse l'écran avec le défilement */
  const geant = q('[data-defilement-x]');
  if (geant) gsap.fromTo(geant, { x: 0 }, { x: () => -(geant.scrollWidth / 2), ease: 'none', scrollTrigger: { trigger: '.libreville', start: 'top bottom', end: 'bottom top', scrub: 1, invalidateOnRefresh: true } });

  /* motifs du système graphique */
  qa('[data-motif="eclate"]').forEach((m) => {
    const blocs = qa('rect, polygon', m);
    blocs.forEach((b) => { b.dataset.dx = (Math.random() - .5) * 90; b.dataset.dy = (Math.random() - .5) * 90; b.dataset.r = (Math.random() - .5) * 40; });
    /* assemblage à l'entrée : les blocs arrivent en ordre, comme posés un à un */
    gsap.from(blocs, { opacity: 0, scale: .4, transformOrigin: '50% 50%', stagger: { each: .02, from: 'random' }, duration: .6, ease: 'back.out(1.6)', scrollTrigger: { trigger: m, start: 'top 90%', once: true } });
    /* éclatement au défilement : chaque bloc part dans sa direction (BREAK), puis revient (CREATE) en remontant */
    gsap.to(blocs, { x: (i, b) => Number(b.dataset.dx), y: (i, b) => Number(b.dataset.dy), rotation: (i, b) => Number(b.dataset.r), transformOrigin: '50% 50%', ease: 'none', scrollTrigger: { trigger: m, start: m.closest('.heros') ? 'top top' : 'top 60%', end: m.closest('.heros') ? '+=900' : 'bottom -20%', scrub: 1 } });
  });
  qa('[data-motif="trace"]').forEach((m) => gsap.fromTo(m, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: m, start: 'top 100%', once: true } }));
  qa('[data-motif="tache"]').forEach((m) => {
    gsap.from(m, { scale: 0, rotation: -25, transformOrigin: '50% 50%', duration: .9, ease: 'elastic.out(1, .5)', scrollTrigger: { trigger: m, start: 'top 85%', once: true } });
    gsap.to(m, { rotation: 18, ease: 'none', scrollTrigger: { trigger: m, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  });
  qa('[data-motif="hachures"]').forEach((m) => gsap.fromTo(m, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)', duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: m, start: 'top 100%', once: true } }));
  /* la tache du zoom grandit avec le mot */
  gsap.fromTo('.motif--zoom', { opacity: 0 }, { opacity: .28, ease: 'power1.out', scrollTrigger: { trigger: '.zoom', start: 'top 80%', end: 'top 30%', scrub: .5 } });
  gsap.fromTo('.motif--zoom', { scale: .3 }, { scale: 4, ease: 'power2.in', scrollTrigger: { trigger: '.zoom', start: 'top 80%', end: 'bottom top', scrub: .5 } });

  /* pied : le mot-symbole final se révèle */
  gsap.from('.pied-marque', { yPercent: 30, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.pied', start: 'top 70%', once: true } });
  /* collaboration : les deux marques arrivent l'une après l'autre, la croix en dernier */
  gsap.from('.collab-bc, .collab-aura', { y: 24, opacity: 0, duration: .9, stagger: .18, ease: 'power3.out', scrollTrigger: { trigger: '.collab', start: 'top 85%', once: true } });
  gsap.from('.collab-croix', { scale: 0, rotation: -90, transformOrigin: '50% 50%', duration: .7, delay: .3, ease: 'back.out(2)', scrollTrigger: { trigger: '.collab', start: 'top 85%', once: true } });

  window.addEventListener('load', () => ScrollTrigger.refresh());
}

/* ---------- mouvement réduit : tout est visible, sans animation ---------- */
function statique() {
  q('#rideau')?.classList.add('est-fini');
  qa('.sequence .sequence-etape').forEach((e) => e.classList.add('est-active'));
  qa('.experience').forEach((c) => c.classList.add('est-active'));
  fonds();
  window.addEventListener('scroll', fonds(), { passive: true });
}

function demarrer() {
  menu(); formulaire();
  if (reduit || !window.gsap || !window.ScrollTrigger) { statique(); return; }
  scenes(); curseur(); magnetique();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer); else demarrer();
