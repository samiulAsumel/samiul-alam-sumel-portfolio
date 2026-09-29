/* ============================================================
   OpsFlow page — module status filter.
   Cards ship visible; the buttons only hide cards, so the page is
   complete without JS.
   ============================================================ */
(function () {
  'use strict'; // Same convention as main.js.

  const filter = document.querySelector('.of-filter');
  const cards = Array.from(document.querySelectorAll('.of-mod'));
  if (!filter || !cards.length) return;
  const buttons = Array.from(filter.querySelectorAll('button'));
  const live = document.getElementById('of-count'); // Polite live region: announces how many modules match.

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const wanted = button.dataset.filter;
      buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      let shown = 0;
      cards.forEach(card => {
        const match = wanted === 'all' || card.dataset.status === wanted;
        card.hidden = !match;
        if (match) shown++;
      });
      if (live) live.textContent = `${shown} modules shown`;
    });
  });
})();
