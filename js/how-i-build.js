/* ============================================================
   How I Build — tab component for the process and example sections.
   Markup ships as plain stacked articles (readable without JS and on
   phones); this script upgrades them to ARIA tabs where there is room.
   ============================================================ */
(function () {
  'use strict'; // Same convention as main.js: fail loudly on accidental globals.

  // Builds the tablist from the panels' data-* attributes so the markup has no dead controls without JS.
  function buildTabs(root, panels) {
    const tablist = document.createElement('div');
    tablist.setAttribute('role', 'tablist');
    tablist.setAttribute('aria-label', root.dataset.tabsLabel || 'Stages');
    tablist.className = root.dataset.tabsClass || 'hb__tabs';
    const tabs = panels.map((panel, i) => {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.id = `${root.id}-tab-${i + 1}`;
      tab.className = 'tab';
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panel.id);
      const num = panel.dataset.num ? `<span class="tab__num" aria-hidden="true">${panel.dataset.num}</span>` : '';
      // The check glyph and hidden text mark completed stages without relying on colour alone.
      const done = panel.dataset.num ? '<span class="tab__check" aria-hidden="true">✓</span><span class="visually-hidden tab__state"></span>' : '';
      tab.innerHTML = `${num}${done}<span class="tab__label"></span>`;
      tab.querySelector('.tab__label').textContent = panel.dataset.label;
      tablist.appendChild(tab);
      return tab;
    });
    if (root.hasAttribute('data-progress')) {
      const track = document.createElement('span');
      track.className = 'hb__track';
      track.setAttribute('aria-hidden', 'true');
      track.innerHTML = '<span class="hb__fill"></span>';
      tablist.appendChild(track);
    }
    const slot = root.querySelector('[data-tablist-slot]');
    slot.replaceWith(tablist);
    return { tablist, tabs };
  }

  function initTabs(root) {
    const panels = Array.from(root.querySelectorAll('[data-tab-panel]'));
    if (!panels.length || !root.id) return;
    const { tablist, tabs } = buildTabs(root, panels);
    const railItems = Array.from(root.querySelectorAll('[data-rail-item]'));
    const stackBelow = Number(root.dataset.stackBelow) || 0;
    const stackedQuery = stackBelow ? window.matchMedia(`(max-width: ${stackBelow - 1}px)`) : null;
    let current = 0;
    let observer = null;

    // Reflects the active index everywhere: tabs, panels, progress variable and the decorative rail.
    function select(index, focusTab) {
      current = index;
      root.style.setProperty('--hb-step', String(index));
      root.style.setProperty('--hb-count', String(panels.length));
      tabs.forEach((tab, i) => {
        const isActive = i === index;
        tab.setAttribute('aria-selected', String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
        tab.classList.toggle('is-active', isActive);
        tab.classList.toggle('is-done', i < index);
        const state = tab.querySelector('.tab__state');
        if (state) state.textContent = i < index ? '(completed)' : '';
      });
      panels.forEach((panel, i) => {
        panel.classList.toggle('is-active', i === index);
        panel.classList.toggle('is-done', i < index);
        if (!root.classList.contains('is-stacked')) panel.hidden = i !== index;
      });
      railItems.forEach((item, i) => {
        item.classList.toggle('is-active', i === index);
        item.classList.toggle('is-done', i < index);
      });
      if (focusTab) tabs[index].focus();
    }

    // Gives every panel the height of the tallest one, so switching stages never moves the content below.
    function equalize() {
      if (!root.classList.contains('is-tabs')) return;
      panels.forEach(panel => { panel.style.minHeight = ''; });
      let tallest = 0;
      panels.forEach(panel => {
        const wasHidden = panel.hidden;
        panel.hidden = false; // Measured within one task, so the user never sees the other panels.
        tallest = Math.max(tallest, panel.offsetHeight);
        panel.hidden = wasHidden;
      });
      panels.forEach(panel => { panel.style.minHeight = `${tallest}px`; });
    }

    // Measuring forces layout, so it runs when the browser is idle instead of during first paint.
    function scheduleEqualize() {
      if ('requestIdleCallback' in window) window.requestIdleCallback(equalize, { timeout: 800 });
      else window.setTimeout(equalize, 200);
    }

    // Tabs mode: wide screens get roles, one visible panel and the roving-tabindex keyboard model.
    function enterTabsMode() {
      root.classList.add('is-tabs');
      root.classList.remove('is-stacked');
      tablist.hidden = false;
      panels.forEach((panel, i) => {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', tabs[i].id);
        panel.tabIndex = 0;
      });
      select(current, false);
      scheduleEqualize();
    }

    // Stacked mode: every stage stays visible; the one nearest mid-screen gets the active state.
    function enterStackedMode() {
      root.classList.add('is-stacked');
      root.classList.remove('is-tabs');
      tablist.hidden = true;
      panels.forEach(panel => {
        panel.hidden = false;
        panel.style.minHeight = '';
        panel.removeAttribute('role');
        panel.removeAttribute('aria-labelledby');
        panel.removeAttribute('tabindex');
      });
      select(current, false);
    }

    function watchStackedScroll() {
      if (observer) observer.disconnect();
      if (!('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && root.classList.contains('is-stacked')) select(panels.indexOf(entry.target), false);
        });
      }, { rootMargin: '-45% 0px -45% 0px' });
      panels.forEach(panel => observer.observe(panel));
    }

    function applyMode() {
      if (stackedQuery && stackedQuery.matches) { enterStackedMode(); watchStackedScroll(); }
      else { if (observer) observer.disconnect(); enterTabsMode(); }
    }

    tabs.forEach((tab, i) => tab.addEventListener('click', () => select(i, false)));
    tablist.addEventListener('keydown', event => {
      const last = tabs.length - 1;
      const moves = { ArrowRight: current === last ? 0 : current + 1, ArrowLeft: current === 0 ? last : current - 1, Home: 0, End: last };
      if (!(event.key in moves)) return;
      event.preventDefault();
      select(moves[event.key], true);
    });

    if (stackedQuery) stackedQuery.addEventListener('change', applyMode);
    applyMode();
    // Re-measure after web fonts load and when the width changes (debounced), since both change wrapping.
    let resizeTimer = null;
    window.addEventListener('resize', () => { window.clearTimeout(resizeTimer); resizeTimer = window.setTimeout(equalize, 150); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(equalize);
  }

  document.querySelectorAll('[data-tabs]').forEach(initTabs);
})();
