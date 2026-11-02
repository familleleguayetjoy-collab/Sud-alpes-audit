
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
      if (scroll && window.matchMedia('(max-width: 920px)').matches) {
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
    if (articles.some((article) => article.id === initialId)) {
      openArticle(initialId);
      if (location.hash) {
        // onglet demandé par un lien (ex. depuis l'accueil) : on affiche directement son écran
        requestAnimationFrame(() => expertiseAccordion.closest('section')?.scrollIntoView({ behavior: 'auto', block: 'start' }));
      }
    }
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


  const cookiePanel = document.querySelector('[data-cookie-panel]');
  document.querySelectorAll('[data-cookie-settings]').forEach((button) => button.addEventListener('click', () => {
    if (cookiePanel) cookiePanel.hidden = false;
  }));
  document.querySelector('[data-cookie-close]')?.addEventListener('click', () => {
    if (cookiePanel) cookiePanel.hidden = true;
  });

  /* Mobile : défilement libre et naturel (aucun calage « molette »).
     - barre fixe Appeler / Rendez-vous ;
     - articles de la page Ressources dépliables au toucher. */
  const mqMobile = window.matchMedia('(max-width: 920px)');
  if (mqMobile.matches) {
    const bar = document.createElement('div');
    bar.className = 'mobile-bar';
    bar.innerHTML = '<a href="tel:+33497031530">Appeler</a><a href="contact.html">Rendez-vous</a>';
    document.body.appendChild(bar);
    document.querySelectorAll('.article-grid-large article').forEach((card) => {
      card.addEventListener('click', () => card.classList.toggle('expanded'));
    });
  }

  /* Contact : présélection de la demande depuis un lien (?sujet=transmission…) */
  const subjectParam = new URLSearchParams(location.search).get('sujet');
  const subjectSelect = document.querySelector('select[name="sujet"]');
  if (subjectParam && subjectSelect && Array.from(subjectSelect.options).some((o) => o.value === subjectParam)) subjectSelect.value = subjectParam;

  /* Hauteur du pied de page : la dernière section + le pied tiennent dans un écran. */
  const footerEl = document.querySelector('.site-footer');
  if (footerEl) {
    const setFooterH = () => document.documentElement.style.setProperty('--footer-h', footerEl.offsetHeight + 'px');
    setFooterH();
    window.addEventListener('resize', setFooterH);
    window.addEventListener('load', setFooterH);
  }
})();

