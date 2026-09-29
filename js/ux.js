/* ============================================================
   UX layer — nav scroll-spy, transform-based progress bar,
   timeline "seen" state, copy-to-clipboard.
   Everything here is progressive: pages read and navigate the same
   without it, and nothing runs continuously.
   ============================================================ */
(function () {
  'use strict'; // Same convention as main.js.

  /* ---- Progress bar: one transform write per animation frame, no layout ---- */
  const bar = document.getElementById('spb');
  if (bar) {
    let ticking = false;
    const draw = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${total > 0 ? Math.min(1, window.scrollY / total) : 0})`;
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; window.requestAnimationFrame(draw); } }, { passive: true });
    window.addEventListener('resize', draw, { passive: true });
    draw();
  }

  /* ---- Scroll-spy: a thin band across the middle of the viewport picks exactly one section ---- */
  const spyLinks = Array.from(document.querySelectorAll('.nav-links a[data-spy]'));
  if (spyLinks.length && 'IntersectionObserver' in window) {
    const targets = spyLinks.flatMap(link => link.dataset.spy.split(' ')).map(id => document.getElementById(id)).filter(Boolean);
    const inBand = new Set();
    let current = null; // Kept when the band sits in a gap between sections, so the highlight never blinks off.

    const apply = () => {
      const first = targets.find(el => inBand.has(el.id)); // Document order; the band is thin, so usually one match.
      if (first) current = first.id;
      spyLinks.forEach(link => {
        const isActive = current !== null && link.dataset.spy.split(' ').includes(current);
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'true');
        else if (link.getAttribute('aria-current') === 'true') link.removeAttribute('aria-current');
      });
    };
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) inBand.add(entry.target.id); else inBand.delete(entry.target.id); });
      apply();
    }, { rootMargin: '-45% 0px -54% 0px', threshold: 0 });
    targets.forEach(el => spy.observe(el));
  }

  /* ---- Timeline steps gain a "seen" state as they pass through view (dates are never added) ---- */
  const steps = document.querySelectorAll('.ev__list > li');
  if (steps.length && 'IntersectionObserver' in window) {
    const seen = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-seen'); seen.unobserve(entry.target); } });
    }, { threshold: 0.6 });
    steps.forEach(step => seen.observe(step));
  }

  /* ---- Copy to clipboard: visible + announced confirmation, and a selectable fallback ---- */
  document.querySelectorAll('[data-copy]').forEach(button => {
    const status = button.parentElement.querySelector('.copy-status');
    const label = button.textContent;
    let timer = null;
    const say = (text, isError) => {
      if (status) { status.textContent = text; status.classList.toggle('is-error', Boolean(isError)); }
      button.textContent = isError ? label : 'Copied';
      window.clearTimeout(timer);
      timer = window.setTimeout(() => { button.textContent = label; if (status) status.textContent = ''; }, 2500);
    };
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        say('Email address copied', false);
      } catch (error) {
        // Clipboard blocked or unavailable: select the address so Ctrl+C works, and say so.
        const target = document.querySelector(button.dataset.copyTarget || '');
        if (target) {
          const range = document.createRange();
          range.selectNodeContents(target);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        }
        say(`Copy blocked. Press Ctrl+C to copy: ${value}`, true);
      }
    });
  });
})();
