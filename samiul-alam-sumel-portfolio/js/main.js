/* ============================================================
   Samiul Alam Sumel — Portfolio JS v6.0
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
  const STAGGER_STEP_MS = 60;
  const STAGGER_MAX_MS = 300;

  function revealElement(el, delayMs) {
    if (delayMs) {
      el.style.transitionDelay = delayMs + 'ms';
      window.setTimeout(() => { el.style.transitionDelay = ''; }, delayMs + 750);
    }
    el.classList.add('v');
  }

  if ('IntersectionObserver' in window) {
    const animObs = new IntersectionObserver(entries => {
      let staggerIndex = 0;
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animObs.unobserve(entry.target);
        const inHero = entry.target.closest('#hero');
        const delay = inHero ? 0 : Math.min(staggerIndex * STAGGER_STEP_MS, STAGGER_MAX_MS);
        revealElement(entry.target, delay);
        if (!inHero) staggerIndex++;
      });
    }, { threshold: 0.1 });

    animated.forEach(el => animObs.observe(el));
  } else {
    animated.forEach(el => revealElement(el, 0));
  }

  window.setTimeout(() => {
    document.querySelectorAll('#hero .fi, #hero .fl, #hero .fr').forEach(el => el.classList.add('v'));
  }, 80);

  /* ----------------------------------------------------------
     COUNTER ANIMATION
  ---------------------------------------------------------- */
  function animateCounter(el, end, suffix = '', duration = 1600) {
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

  const statsEl = document.querySelector('#stats .trust');
  if (statsEl && 'IntersectionObserver' in window) {
    const statsObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(document.getElementById('c1'), 12, '+');
          animateCounter(document.getElementById('c2'), 3);
          animateCounter(document.getElementById('c3'), 8);
          animateCounter(document.getElementById('c4'), 7);
          statsObs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    statsObs.observe(statsEl);
  }

  const aboutEl = document.getElementById('about');
  if (aboutEl && 'IntersectionObserver' in window) {
    const aboutObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(document.getElementById('ab-c-yrs'), 12, '', 1200);
          animateCounter(document.getElementById('ab-c-apps'), 3, '', 1200);
          aboutObs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    aboutObs.observe(aboutEl);
  }

  /* ----------------------------------------------------------
     ABOUT READING RAIL — active-paragraph spotlight + fill progress
  ---------------------------------------------------------- */
  const abTl = document.querySelector('.ab-tl');
  if (abTl && aboutEl) {
    const abParas = Array.prototype.slice.call(abTl.querySelectorAll('p'));
    let abTicking = false;

    function updateAboutRail() {
      abTicking = false;
      const rect = abTl.getBoundingClientRect();
      const focusY = window.innerHeight * 0.5;
      let fillPx = focusY - rect.top;
      fillPx = Math.max(0, Math.min(fillPx, rect.height - 20));
      abTl.style.setProperty('--fill', fillPx + 'px');

      let closest = null, closestDist = Infinity;
      abParas.forEach(p => {
        const r = p.getBoundingClientRect();
        const dist = Math.abs((r.top + r.height / 2) - focusY);
        if (dist < closestDist) { closestDist = dist; closest = p; }
      });
      abParas.forEach(p => p.classList.toggle('active', p === closest));
    }

    function onAboutScroll() {
      if (!abTicking) {
        window.requestAnimationFrame(updateAboutRail);
        abTicking = true;
      }
    }

    if ('IntersectionObserver' in window) {
      const abRailObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', onAboutScroll, { passive: true });
            updateAboutRail();
          } else {
            window.removeEventListener('scroll', onAboutScroll);
          }
        });
      }, { threshold: 0 });
      abRailObs.observe(aboutEl);
    } else {
      updateAboutRail();
    }
  }

  /* ----------------------------------------------------------
     SPOTLIGHT CARDS — cursor-tracked radial highlight
  ---------------------------------------------------------- */
  const SPOTLIGHT_SELECTOR = '.sk-card,.pc,.dc,.ec,.tl-card,.rm-phase,.mtd-card,.bento-tile,.fw-card,' +
    '.vf-card,.flow-node,.case-study,.mat-card,.connect-card';
  const canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canHover && !reducedMotion) {
    document.addEventListener('pointermove', event => {
      const card = event.target.closest(SPOTLIGHT_SELECTOR);
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((event.clientX - rect.left) / rect.width) * 100 + '%');
      card.style.setProperty('--my', ((event.clientY - rect.top) / rect.height) * 100 + '%');
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     HERO BACKGROUND ORBS — subtle pointer-driven parallax
  ---------------------------------------------------------- */
  const orbs = document.querySelectorAll('.bg-orb');
  if (canHover && !reducedMotion && orbs.length) {
    let targetX = 0, targetY = 0, curX = 0, curY = 0;
    window.addEventListener('pointermove', event => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    function tickOrbs() {
      curX += (targetX - curX) * 0.04;
      curY += (targetY - curY) * 0.04;
      orbs.forEach((orb, i) => {
        const strength = (i + 1) * 10;
        orb.style.transform = `translate(${curX * strength}px, ${curY * strength}px)`;
      });
      window.requestAnimationFrame(tickOrbs);
    }
    window.requestAnimationFrame(tickOrbs);
  }

  /* ----------------------------------------------------------
     CARD TILT — cursor-driven 3D tilt, same card family as the
     spotlight glow above, plus About's highlight cards
  ---------------------------------------------------------- */
  const tiltCards = document.querySelectorAll(SPOTLIGHT_SELECTOR + ',.hl-item');
  if (canHover && !reducedMotion && tiltCards.length) {
    const TILT_MAX = 3;
    tiltCards.forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const rotY = (px - 0.5) * TILT_MAX * 2;
        const rotX = (0.5 - py) * TILT_MAX * 2;
        card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
      }, { passive: true });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ----------------------------------------------------------
     COMMAND PALETTE (Ctrl/Cmd+K)
  ---------------------------------------------------------- */
  const cmdkOverlay = document.getElementById('cmdk');
  const cmdkInput = document.getElementById('cmdk-input');
  const cmdkList = document.getElementById('cmdk-list');
  const cmdkEmpty = document.getElementById('cmdk-empty');
  const cmdkToggle = document.getElementById('cmdk-tgl');

  if (cmdkOverlay && cmdkInput && cmdkList) {
    const cmdkItems = Array.from(cmdkList.querySelectorAll('li'));
    let lastFocused = null;

    function visibleItems() {
      return cmdkItems.filter(item => !item.hidden);
    }

    function setActive(item) {
      cmdkItems.forEach(el => el.classList.remove('active'));
      if (!item) return;
      item.classList.add('active');
      item.scrollIntoView({ block: 'nearest' });
    }

    function filterItems() {
      const q = cmdkInput.value.trim().toLowerCase();
      let anyVisible = false;
      cmdkItems.forEach(item => {
        const text = (item.textContent + ' ' + (item.dataset.group || '')).toLowerCase();
        const match = q === '' || text.includes(q);
        item.hidden = !match;
        if (match) anyVisible = true;
      });
      cmdkEmpty.hidden = anyVisible;
      setActive(visibleItems()[0] || null);
    }

    function runItem(item) {
      if (!item) return;
      if (item.dataset.action === 'theme' && themeToggle) {
        themeToggle.click();
        closeCmdk();
        return;
      }
      const href = item.dataset.href;
      if (!href) return;
      if (item.dataset.download === 'true') {
        const a = document.createElement('a');
        a.href = href;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else if (item.dataset.external === 'true') {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.hash = href;
      }
      closeCmdk();
    }

    function openCmdk() {
      lastFocused = document.activeElement;
      cmdkOverlay.hidden = false;
      cmdkInput.value = '';
      filterItems();
      document.body.style.overflow = 'hidden';
      window.setTimeout(() => cmdkInput.focus(), 10);
    }

    function closeCmdk() {
      cmdkOverlay.hidden = true;
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    document.addEventListener('keydown', event => {
      const isK = event.key === 'k' || event.key === 'K';
      if ((event.metaKey || event.ctrlKey) && isK) {
        event.preventDefault();
        cmdkOverlay.hidden ? openCmdk() : closeCmdk();
      } else if (event.key === 'Escape' && !cmdkOverlay.hidden) {
        closeCmdk();
      }
    });

    if (cmdkToggle) cmdkToggle.addEventListener('click', openCmdk);
    cmdkOverlay.addEventListener('click', event => {
      if (event.target === cmdkOverlay) closeCmdk();
    });
    cmdkInput.addEventListener('input', filterItems);
    cmdkInput.addEventListener('keydown', event => {
      const visible = visibleItems();
      const activeIdx = visible.findIndex(el => el.classList.contains('active'));
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActive(visible[Math.min(activeIdx + 1, visible.length - 1)] || visible[0]);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActive(visible[Math.max(activeIdx - 1, 0)] || visible[0]);
      } else if (event.key === 'Enter') {
        event.preventDefault();
        runItem(visible[activeIdx] || visible[0]);
      }
    });
    cmdkItems.forEach(item => {
      item.addEventListener('click', () => runItem(item));
      item.addEventListener('mouseenter', () => setActive(item));
    });
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
