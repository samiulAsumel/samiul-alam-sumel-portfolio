/* ============================================================
   Case study pages — screenshot zoom.
   A native <dialog> gives Escape-to-close and focus containment
   for free, so this script only wires the trigger and focus return.
   ============================================================ */
(function () {
  'use strict'; // Same convention as main.js.

  const dialog = document.querySelector('.cs-lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return; // Without <dialog> support the image simply stays inline.
  const image = dialog.querySelector('img');
  const closeButton = dialog.querySelector('button');
  let opener = null; // The trigger that had focus, so closing returns the user to where they were.

  document.querySelectorAll('.cs-zoom').forEach(trigger => {
    trigger.addEventListener('click', () => {
      opener = trigger;
      image.src = trigger.dataset.full;
      image.alt = trigger.dataset.alt || '';
      dialog.showModal();
    });
  });
  closeButton.addEventListener('click', () => dialog.close());
  // A click on the backdrop lands on the dialog element itself, not on its content.
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { if (opener) opener.focus(); });
})();
