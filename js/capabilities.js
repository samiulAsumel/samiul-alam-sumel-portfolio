/* ============================================================
   Capabilities — skills matrix.
   Selecting (or hovering / focusing) a skill fills one shared detail
   panel and highlights the projects that show it. The buttons carry
   their own text, so nothing here is required to read the page.
   ============================================================ */
(function () {
  'use strict'; // Same convention as main.js.

  const matrix = document.getElementById('cap-matrix');
  if (!matrix) return;
  const buttons = Array.from(matrix.querySelectorAll('.sk'));
  const detail = document.getElementById('cap-detail');
  const projects = Array.from(matrix.querySelectorAll('[data-project]'));
  let selected = null; // The clicked skill; hover and focus only preview, then fall back to this.

  // Lights the projects named by a skill; an empty list clears the highlight.
  function highlight(button) {
    const linked = button ? (button.dataset.projects || '').split(' ').filter(Boolean) : [];
    projects.forEach(item => item.classList.toggle('is-linked', linked.includes(item.dataset.project)));
  }

  function show(button) {
    detail.querySelector('.cap-detail__t').textContent = button.dataset.label;
    const linked = (button.dataset.projects || '').split(' ').filter(Boolean);
    const evidence = linked.length
      ? ' Shown in: ' + linked.map(key => projects.find(p => p.dataset.project === key).textContent).join(', ') + '.'
      : ' Self-study or experience in the workflow itself; no single project.';
    detail.querySelector('.cap-detail__p').textContent = button.dataset.detail + evidence;
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      selected = button;
      buttons.forEach(b => b.setAttribute('aria-expanded', String(b === button)));
      show(button);
      highlight(button);
    });
    ['mouseenter', 'focus'].forEach(type => button.addEventListener(type, () => highlight(button)));
    ['mouseleave', 'blur'].forEach(type => button.addEventListener(type, () => highlight(selected)));
  });
})();
