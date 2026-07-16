/*
  Effets « signature » — vanilla, sans dépendance.
  Curseur personnalisé, boutons magnétiques, relief 3D des cartes,
  révélation des titres par masque. Tout se désactive proprement sur
  écran tactile ou si prefers-reduced-motion est actif.
*/
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---------- 1. Révélation des titres par masque (mots qui montent) ---------- */
  // Uniquement les titres en texte pur (pas de <br>/<em>/<sup> internes) pour
  // éviter de casser le balisage. Le hero (h1) garde son propre style.
  // Réservé au pointeur fin (bureau) : sur tactile, le déclenchement de
  // l'observer est moins fiable et laisserait des titres masqués.
  if (!reduce && fine && 'IntersectionObserver' in window) {
    const heads = document.querySelectorAll('main h2, .page-hero h1');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const words = e.target.querySelectorAll('.rw-in');
        words.forEach((w, i) => { w.style.transitionDelay = (i * 45) + 'ms'; w.parentElement.classList.add('in'); });
        io.unobserve(e.target);
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });

    heads.forEach((h) => {
      if (h.children.length || h.closest('.hero')) return; // texte pur seulement
      const words = h.textContent.split(/(\s+)/);
      h.textContent = '';
      words.forEach((tok) => {
        if (/^\s+$/.test(tok)) { h.appendChild(document.createTextNode(tok)); return; }
        const outer = document.createElement('span'); outer.className = 'rw';
        const inner = document.createElement('span'); inner.className = 'rw-in';
        inner.textContent = tok; outer.appendChild(inner); h.appendChild(outer);
      });
      h.classList.add('rw-host');
      io.observe(h);
      // Filet de sécurité : si l'observer ne se déclenche pas, on révèle.
      setTimeout(() => { if (!h.querySelector('.rw.in')) h.querySelectorAll('.rw').forEach((w) => w.classList.add('in')); }, 2500);
    });
  }

  if (reduce || !fine) return; // le reste = pointeur fin uniquement

  /* ---------- 2. Boutons magnétiques ---------- */
  document.querySelectorAll('.btn').forEach((btn) => {
    const strength = 0.28, radius = 90;
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      if (Math.hypot(mx, my) < r.width / 2 + radius) {
        btn.style.transform = `translate(${mx * strength}px,${my * strength}px)`;
      }
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });

  /* ---------- 3. Relief 3D des cartes ---------- */
  document.querySelectorAll('.service-card,.value-card,.benefit-grid article').forEach((card) => {
    card.style.transformStyle = 'preserve-3d';
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(820px) rotateY(${px * 5.5}deg) rotateX(${-py * 5.5}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
})();
