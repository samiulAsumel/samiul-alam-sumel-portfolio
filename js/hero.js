/* ============================================================
   Hero interactions: the proof counters and the
   "what do you need built" capability selector.
   Each effect runs once, then rests. The static HTML already holds
   the final state, so no-JS and reduced-motion visitors lose nothing.
   ============================================================ */
(function () {
  'use strict'; // Same convention as main.js.

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Proof counters: 0 to value over ~900ms, then exactly the published figure ---- */
  const counters = document.querySelectorAll('.hm-hero__proof [data-count]');
  if (counters.length && !reduceMotion) {
    const duration = 900;
    const start = window.performance.now();
    const tick = now => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      counters.forEach(el => {
        const target = Number(el.dataset.count);
        el.textContent = `${Math.round(target * eased)}${progress === 1 ? el.dataset.suffix || '' : ''}`;
      });
      if (progress < 1) window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  }

  /* ---- Capability selector: ARIA tabs; steps through the four needs once, then rests on the first.
         Any hover, focus or click hands control to the visitor. ---- */
  const cap = document.getElementById('hero-cap');
  const tabs = cap ? Array.from(cap.querySelectorAll('[role="tab"]')) : [];
  const panels = cap ? Array.from(cap.querySelectorAll('[role="tabpanel"]')) : [];
  if (tabs.length && tabs.length === panels.length) {
    cap.classList.add('is-enhanced');
    let timer = 0;
    const select = (i, focus) => {
      tabs.forEach((tab, n) => {
        const isOn = n === i;
        tab.setAttribute('aria-selected', String(isOn));
        tab.tabIndex = isOn ? 0 : -1;
        panels[n].classList.toggle('is-on', isOn);
      });
      if (focus) tabs[i].focus();
    };
    const stop = () => { window.clearTimeout(timer); timer = 0; };
    const advance = i => {
      if (i >= tabs.length) { select(0); return; }
      select(i);
      timer = window.setTimeout(() => advance(i + 1), 3200); // Long enough to read one Before/After pair.
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => { stop(); select(i); });
      tab.addEventListener('keydown', event => {
        const keys = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
        if (!(event.key in keys)) return;
        event.preventDefault();
        stop();
        select((keys[event.key] + tabs.length) % tabs.length, true);
      });
    });
    ['pointerenter', 'focusin'].forEach(type => cap.addEventListener(type, stop));

    if (!reduceMotion) timer = window.setTimeout(() => advance(1), 3200);
  }
})();
