
(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');

  const closeNav = () => {
    if (!toggle || !nav) return;
    toggle.classList.remove('open');
    nav.classList.remove('open');
    header?.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = !nav.classList.contains('open');
      toggle.classList.toggle('open', isOpen);
      nav.classList.toggle('open', isOpen);
      header?.classList.toggle('nav-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
    window.addEventListener('resize', () => { if (window.innerWidth > 920) closeNav(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeNav(); });
  }

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  document.querySelectorAll('.accordion article').forEach((item) => {
    const button = item.querySelector('button');
    button?.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });

  // Variante : applique les effets d'apparition et de lueur sur toutes les pages,
  // sans avoir à annoter chaque élément dans le HTML.
  const autoRevealSelectors = [
    '.section-heading', '.split-heading > div', '.service-card', '.person-card',
    '.values-grid article', '.benefit-grid article', '.sector-tile', '.sector-grid .sector-all',
    '.expertise-accordion article', '.expertise-nav', '.contact-method', '.contact-form',
    '.jobs article', '.article-grid-large article', '.article-grid article',
    '.location-cards article', '.case-card', '.deadline-card', '.priority-card',
    '.value-card', '.team-story-card', '.team-quote', '.expertise-copy',
    '.expertise-visual', '.commercial-band', '.kpi-inline article', '.journey article',
    '.comparison-grid article', '.accordion article', '.mini-proof',
    '.related-grid a', '.diagnostic-preview', '.diagnostic-score', '.resource-filter'
  ];
  document.querySelectorAll(autoRevealSelectors.join(',')).forEach((el) => {
    if (!el.closest('.reveal')) el.classList.add('reveal');
  });
  const autoGlowSelectors = [
    '.service-card', '.case-card', '.location-cards article', '.values-grid article',
    '.sector-detail-grid > article', '.jobs article', '.benefit-grid article',
    '.person-card', '.article-grid-large article', '.contact-method', '.team-story-card'
  ];
  document.querySelectorAll(autoGlowSelectors.join(',')).forEach((el) => {
    el.setAttribute('data-glow-card', '');
  });

  const revealItems = document.querySelectorAll('.reveal');
  const siblingIndex = (el) => Array.from(el.parentElement?.querySelectorAll(':scope > .reveal') || []).indexOf(el);
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${Math.min(siblingIndex(entry.target), 5) * 65}ms`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const filters = document.querySelectorAll('[data-filter]');
  const resourceCards = document.querySelectorAll('[data-resource-grid] article');
  filters.forEach((button) => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle('active', item === button));
    resourceCards.forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
  }));

  const expertiseAccordion = document.querySelector('[data-expertise-accordion]');
  if (expertiseAccordion) {
    const articles = Array.from(expertiseAccordion.querySelectorAll('article'));
    const navLinks = Array.from(document.querySelectorAll('[data-expertise-nav] a'));
    const openArticle = (id, { scroll } = {}) => {
      articles.forEach((article) => {
        const isTarget = article.id === id;
        article.classList.toggle('open', isTarget);
        article.querySelector('button')?.setAttribute('aria-expanded', String(isTarget));
      });
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
      if (scroll) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    articles.forEach((article) => {
      article.querySelector('button')?.addEventListener('click', () => {
        openArticle(article.classList.contains('open') ? '' : article.id);
      });
    });
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const id = link.getAttribute('href').slice(1);
        openArticle(id, { scroll: true });
        history.replaceState(null, '', `#${id}`);
      });
    });
    const initialId = location.hash ? location.hash.slice(1) : articles[0]?.id;
    if (articles.some((article) => article.id === initialId)) openArticle(initialId);
  }

  const countEls = document.querySelectorAll('[data-count-to]');
  if (countEls.length && 'IntersectionObserver' in window) {
    const animateCount = (el) => {
      const target = parseFloat(el.dataset.countTo);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1300;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = (target * eased).toFixed(decimals).replace('.', ',');
        el.textContent = prefix + value + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    countEls.forEach((el) => countObserver.observe(el));
  }

  const charts = document.querySelectorAll('[data-chart]');
  if (charts.length && 'IntersectionObserver' in window) {
    const chartObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('grown');
          chartObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    charts.forEach((chart) => chartObserver.observe(chart));
  }

  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);
  const updateScrollProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    scrollProgress.style.width = `${Math.min(pct, 100)}%`;
  };
  updateScrollProgress();
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY, 500) * 0.06;
        heroVisual.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
    }, { passive: true });
  }

  const rotateEl = document.querySelector('[data-rotate-words]');
  if (rotateEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const words = rotateEl.dataset.rotateWords.split(',');
    let i = 0;
    setInterval(() => {
      rotateEl.style.opacity = '0';
      rotateEl.style.transform = 'translateY(8px)';
      setTimeout(() => {
        i = (i + 1) % words.length;
        rotateEl.textContent = words[i];
        rotateEl.style.transform = 'translateY(-8px)';
        requestAnimationFrame(() => {
          rotateEl.style.opacity = '1';
          rotateEl.style.transform = 'translateY(0)';
        });
      }, 320);
    }, 2800);
  }

  document.querySelectorAll('[data-glow-card]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--gx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--gy', `${event.clientY - rect.top}px`);
      card.classList.add('glow-active');
    });
    card.addEventListener('pointerleave', () => card.classList.remove('glow-active'));
  });

  const cookiePanel = document.querySelector('[data-cookie-panel]');
  document.querySelectorAll('[data-cookie-settings]').forEach((button) => button.addEventListener('click', () => {
    if (cookiePanel) cookiePanel.hidden = false;
  }));
  document.querySelector('[data-cookie-close]')?.addEventListener('click', () => {
    if (cookiePanel) cookiePanel.hidden = true;
  });

  /* Calage doux « section par section ».
     Petit défilement : rien ne bouge. Quand le défilement s'arrête PRÈS du
     début d'une section (dans une marge réduite), on s'aligne en douceur.
     Loin d'une limite : on laisse défiler librement (lecture des sections
     longues). Beaucoup plus doux et réglable que le scroll-snap CSS.
     Actif : sur mobile (toutes pages) ET sur les pages internes en version
     ordinateur (l'accueil garde son propre snap CSS plein écran). */
  const mqMobile = window.matchMedia('(max-width: 899px)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const innerDesktop = window.matchMedia('(min-width: 900px)').matches
    && !document.documentElement.classList.contains('snap-home');
  if ((mqMobile.matches || innerDesktop) && !reduceMotion.matches) {
    const headerEl = document.querySelector('.site-header');
    // Pages internes desktop : sections en plein écran (contenu centré) → on
    // aligne pile le haut de section (comme l'accueil, offset 0) et on cale de
    // façon plus décisive (grande zone). Mobile : contenu aligné en haut → on
    // décale sous l'en-tête collant, zone plus discrète.
    const HEADER = () => innerDesktop ? 0 : ((headerEl ? headerEl.offsetHeight : 60) + 8);
    const SNAP_ZONE = 0.30;                       // mobile : petite zone, calage doux
    const sections = Array.from(document.querySelectorAll('main > section'));
    let idleTimer = 0;
    let programmatic = false;
    let releaseTimer = 0;

    const boundaries = () => sections.map((s) => s.getBoundingClientRect().top + window.scrollY - HEADER());

    const goTo = (target, y, maxY) => {
      const clamped = Math.max(0, Math.min(target, maxY));
      if (Math.abs(clamped - y) <= 3) return;
      programmatic = true;
      window.scrollTo({ top: clamped, behavior: 'smooth' });
      clearTimeout(releaseTimer);
      releaseTimer = window.setTimeout(() => { programmatic = false; }, 800);
    };

    const settle = () => {
      if (programmatic) return;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const maxY = document.documentElement.scrollHeight - vh;
      if (y <= 4 || y >= maxY - 4) return;         // pas de calage tout en haut / tout en bas
      const tops = boundaries();

      if (innerDesktop) {
        // Pages internes (ordinateur) : reproduire le calage décisif de
        // l'accueil QUAND la section tient dans l'écran. Section « courte »
        // (≤ ~1 écran) → on cale franchement sur le bord le plus proche
        // (haut de la section actuelle ou de la suivante), comme l'accueil.
        // Section « longue » (grille de portraits, accordéon) → défilement
        // libre au milieu, calage seulement tout près de ses deux bords.
        let i = 0;
        for (let k = 0; k < tops.length; k++) { if (tops[k] <= y + 2) i = k; }
        const curTop = tops[i];
        const nextTop = (i + 1 < tops.length) ? tops[i + 1] : maxY;
        const secH = nextTop - curTop;
        const SHORT = vh * 1.15;
        const EDGE = vh * 0.28;
        let target = null;
        if (secH <= SHORT) {
          target = (y - curTop) < secH * 0.4 ? curTop : nextTop;   // > 40 % → on avance
        } else if (y - curTop < EDGE) {
          target = curTop;                                          // entrée nette
        } else if (nextTop - y < EDGE) {
          target = nextTop;                                         // sortie nette
        }
        if (target != null) goTo(target, y, maxY);
        return;
      }

      // Mobile : calage doux dans une petite zone autour du bord le plus proche.
      let target = null, best = Infinity;
      for (const b of tops) {
        const d = Math.abs(b - y);
        if (d < best) { best = d; target = b; }
      }
      if (target != null && best > 3 && best < vh * SNAP_ZONE) goTo(target, y, maxY);
    };

    window.addEventListener('scroll', () => {
      if (programmatic) return;
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(settle, 150);   // attend la fin de l'inertie
    }, { passive: true });
  }
})();

