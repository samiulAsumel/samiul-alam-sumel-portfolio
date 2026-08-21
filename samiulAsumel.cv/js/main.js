/* ============================================================
   Samiul Alam Sumel — Portfolio JS v4.0
   ============================================================ */
(function () {
  'use strict';

  /* ----------------------------------------------------------
     THEME TOGGLE
  ---------------------------------------------------------- */
  const THEME_KEY = 'sas-theme';
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-tgl');

  function readStoredTheme() {
    try {
      return window.localStorage.getItem(THEME_KEY);
    } catch (err) {
      return null;
    }
  }

  function storeTheme(value) {
    try {
      window.localStorage.setItem(THEME_KEY, value);
    } catch (err) {
      /* private mode / storage disabled — theme just won't persist */
    }
  }

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(value) {
    if (value === 'light' || value === 'dark') {
      root.setAttribute('data-theme', value);
    } else {
      root.removeAttribute('data-theme');
    }
  }

  const storedTheme = readStoredTheme();
  applyTheme(storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || (systemPrefersDark() ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  }

  /* ----------------------------------------------------------
     SCROLL PROGRESS BAR + NAV STATE
  ---------------------------------------------------------- */
  const progressBar = document.getElementById('spb');
  const navbar = document.getElementById('nb');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = Array.from(document.querySelectorAll('section[id]'));

  function updateProgress() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar && total > 0) {
      progressBar.style.width = ((window.scrollY / total) * 100).toFixed(2) + '%';
    }
  }

  function getActiveSection() {
    const y = window.scrollY + 130;
    let active = null;
    for (const section of sections) {
      if (section.offsetTop <= y) active = section.id;
    }
    return active;
  }

  function updateNav() {
    if (navbar) navbar.classList.toggle('sc', window.scrollY > 50);
    updateProgress();
    const active = getActiveSection();
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href').slice(1) === active);
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ----------------------------------------------------------
     MOBILE MENU
  ---------------------------------------------------------- */
  const hamburger = document.getElementById('hbg');
  const mobileMenu = document.getElementById('mob');
  const mobileClose = document.getElementById('mobx');

  function setMobileMenu(open) {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.toggle('op', open);
    mobileMenu.classList.toggle('op', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => setMobileMenu(!hamburger.classList.contains('op')));
    if (mobileClose) mobileClose.addEventListener('click', () => setMobileMenu(false));
    document.querySelectorAll('.mob a').forEach(link => link.addEventListener('click', () => setMobileMenu(false)));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && mobileMenu.classList.contains('op')) setMobileMenu(false);
    });
  }

  /* ----------------------------------------------------------
     SCROLL REVEAL
  ---------------------------------------------------------- */
  const animated = document.querySelectorAll('.fi, .fl, .fr');

  function revealElement(el) {
    el.classList.add('v');
  }

  if ('IntersectionObserver' in window) {
    const animObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) revealElement(entry.target);
      });
    }, { threshold: 0.1 });

    animated.forEach(el => animObs.observe(el));
  } else {
    animated.forEach(revealElement);
  }

  window.setTimeout(() => {
    document.querySelectorAll('#hero .fi, #hero .fl, #hero .fr').forEach(el => el.classList.add('v'));
  }, 80);

  /* ----------------------------------------------------------
     COUNTER ANIMATION
  ---------------------------------------------------------- */
  function animateCounter(el, end, suffix = '', duration = 1900) {
    if (!el) return;
    let t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      const e = p < 1 ? 1 - Math.pow(1 - p, 3) : 1;
      el.textContent = Math.floor(e * end) + (p >= 1 ? suffix : '');
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  const statsEl = document.querySelector('.h-stats');
  if (statsEl && 'IntersectionObserver' in window) {
    const statsObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(document.getElementById('c1'), 12, '+');
          animateCounter(document.getElementById('c2'), 3);
          animateCounter(document.getElementById('c3'), 6);
          statsObs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    statsObs.observe(statsEl);
  }

  /* ----------------------------------------------------------
     SERVICE WORKER
  ---------------------------------------------------------- */
  if ('serviceWorker' in navigator && /^(https?:)$/.test(window.location.protocol)) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }
})();
