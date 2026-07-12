
(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');

  const closeNav = () => {
    if (!toggle || !nav) return;
    toggle.classList.remove('open');
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = !nav.classList.contains('open');
      toggle.classList.toggle('open', isOpen);
      nav.classList.toggle('open', isOpen);
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
})();

