/* ============================================================
   Hero interactions: the pain word, the proof counters and the
   step-through of the manual-to-system flow.
   Each effect runs once, then rests. The static HTML already holds
   the final state, so no-JS and reduced-motion visitors lose nothing.
   ============================================================ */
(function () {
  'use strict'; // Same convention as main.js.

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Pain word: cycles through the listed words once and ends on the last (the static text) ---- */
  const swap = document.querySelector('.hm-swap');
  if (swap && !reduceMotion) {
    const words = (swap.dataset.words || '').split('|').filter(Boolean);
    let index = 0;
    const next = () => {
      if (index >= words.length - 1) return;
      swap.classList.add('is-out');
      window.setTimeout(() => {
        index += 1;
        swap.textContent = words[index];
        swap.classList.remove('is-out');
        window.setTimeout(next, 1300);
      }, 220); // Matches --dur-base so the old word is fully hidden before the swap.
    };
    // The static word is the last in the list, so start from the first.
    if (words.length > 1) {
      swap.textContent = words[0];
      window.setTimeout(next, 1300);
    }
  }

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

  /* ---- Flow: steps through 01 to 05 once, then rests on "Live"; any hover, focus or click takes over ---- */
  const flow = document.querySelector('.hm-flow');
  const nodes = flow ? Array.from(flow.querySelectorAll('.hm-flow__node')) : [];
  if (nodes.length) {
    let current = -1;
    let timer = 0;
    const show = i => {
      current = i;
      nodes.forEach((node, n) => node.classList.toggle('is-active', n === i));
      const node = nodes[i];
      flow.style.setProperty('--dot-y', `${node.offsetTop + node.offsetHeight / 2}px`);
    };
    const stop = () => { window.clearTimeout(timer); timer = 0; };
    const advance = () => {
      if (current >= nodes.length - 1) return;
      show(current + 1);
      timer = window.setTimeout(advance, 1500);
    };

    nodes.forEach((node, i) => {
      node.addEventListener('click', () => { stop(); show(i); });
      node.addEventListener('focus', () => { stop(); show(i); });
    });
    flow.addEventListener('pointerenter', stop);

    if (reduceMotion) show(nodes.length - 1);
    else { show(0); timer = window.setTimeout(advance, 1500); }
    window.addEventListener('resize', () => { if (current >= 0) show(current); }, { passive: true });
  }
})();
