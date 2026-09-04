/* ============================================================
   Samiul Alam Sumel — Portfolio JS v7.0
   ============================================================ */
// Everything below runs inside an IIFE (Immediately Invoked Function
// Expression). Wrapping the whole file this way keeps every variable and
// helper function private to this file instead of leaking onto the global
// `window` object, so this script can't accidentally clash with other
// scripts on the page (or with itself if it were ever loaded twice).
(function () {
  'use strict'; // Opts into stricter JS parsing: catches silent bugs like
  // assigning to an undeclared variable, and disallows some legacy syntax.

  /* ----------------------------------------------------------
     THEME TOGGLE
     Lets the visitor switch between light/dark mode and remembers
     their choice across visits using localStorage.
  ---------------------------------------------------------- */
  const THEME_KEY = 'sas-theme'; // localStorage key used to persist the theme.
  const root = document.documentElement; // The <html> element — theme is set here via a data-attribute so CSS can react to it globally.
  const themeToggle = document.getElementById('theme-tgl'); // The button the user clicks to flip the theme.

  // Reads the previously saved theme ('light' | 'dark' | null) from
  // localStorage. Wrapped in try/catch because some browsers throw when
  // localStorage is blocked (e.g. private browsing mode, disabled cookies).
  function readStoredTheme() {
    try {
      return window.localStorage.getItem(THEME_KEY);
    } catch (err) {
      return null; // Fail silently — theme simply won't be remembered.
    }
  }

  // Persists the chosen theme so it survives page reloads/future visits.
  function storeTheme(value) {
    try {
      window.localStorage.setItem(THEME_KEY, value);
    } catch (err) {
      /* private mode / storage disabled — theme just won't persist */
    }
  }

  // Checks the OS/browser-level color scheme preference, used as the
  // fallback when the user hasn't explicitly picked a theme on this site.
  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Applies the theme to the page by toggling a `data-theme` attribute on
  // <html>. The CSS file keys its dark/light variable overrides off this
  // attribute. Passing anything other than 'light'/'dark' (e.g. null on
  // first visit) removes the attribute entirely, letting the CSS fall back
  // to the OS-level `prefers-color-scheme` media query.
  function applyTheme(value) {
    if (value === 'light' || value === 'dark') {
      root.setAttribute('data-theme', value);
    } else {
      root.removeAttribute('data-theme');
    }
  }

  // On page load: apply whatever theme (if any) was saved from a previous visit.
  const storedTheme = readStoredTheme();
  applyTheme(storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      // Determine the theme currently in effect: explicit data-theme attribute
      // if set, otherwise infer from the OS preference.
      const current = root.getAttribute('data-theme') || (systemPrefersDark() ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark'; // Simple toggle between the two.
      applyTheme(next);
      storeTheme(next);
    });
  }

  /* ----------------------------------------------------------
     SCROLL PROGRESS BAR + NAV STATE
     Drives the thin progress bar at the top of the page and keeps the
     navbar's "scrolled" style and active nav link in sync with scroll position.
  ---------------------------------------------------------- */
  const progressBar = document.getElementById('spb'); // The visual progress bar element (its width = % scrolled).
  const navbar = document.getElementById('nb'); // Main site navbar.
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]'); // Only in-page anchor links get "active" highlighting.
  const sections = Array.from(document.querySelectorAll('section[id]')); // Every section with an id — these are the scroll-spy targets.

  // Computes how far down the page the user has scrolled as a percentage
  // and sets the progress bar's width to match.
  function updateProgress() {
    // Total scrollable distance = full document height minus one viewport
    // height (you can't scroll past the point where the bottom of the
    // document meets the bottom of the viewport).
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar && total > 0) {
      progressBar.style.width = ((window.scrollY / total) * 100).toFixed(2) + '%';
    }
  }

  // Determines which section is "active" for the purpose of nav-link
  // highlighting: the last section whose top has scrolled above a fixed
  // offset (130px, roughly the navbar height plus some breathing room).
  function getActiveSection() {
    const y = window.scrollY + 130;
    let active = null;
    for (const section of sections) {
      // Sections are assumed to be in document order, so the loop keeps
      // overwriting `active` — the final match is the lowest section whose
      // top has already scrolled past the threshold, i.e. the one currently
      // occupying the viewport near the top.
      if (section.offsetTop <= y) active = section.id;
    }
    return active;
  }

  // Runs on every scroll event: toggles the navbar's "scrolled" style,
  // updates the progress bar, and highlights the matching nav link.
  function updateNav() {
    if (navbar) navbar.classList.toggle('sc', window.scrollY > 50); // 'sc' = "scrolled" styling once past 50px.
    updateProgress();
    const active = getActiveSection();
    navLinks.forEach(link => {
      // href is like "#about" — strip the leading '#' to compare against the section id.
      link.classList.toggle('active', link.getAttribute('href').slice(1) === active);
    });
  }

  // { passive: true } tells the browser this listener never calls
  // preventDefault(), so it can optimize scroll performance instead of
  // waiting to see if scrolling should be blocked.
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // Run once immediately so the UI is correct even before the first scroll (e.g. page loaded mid-scroll via back/forward).

  /* ----------------------------------------------------------
     MOBILE MENU
     Handles opening/closing the off-canvas navigation used on small screens.
  ---------------------------------------------------------- */
  const hamburger = document.getElementById('hbg'); // The hamburger icon/button that opens the mobile menu.
  const mobileMenu = document.getElementById('mob'); // The mobile nav panel itself.
  const mobileClose = document.getElementById('mobx'); // Explicit close ("X") button inside the panel.

  // Single source of truth for open/close state: toggles CSS classes,
  // updates ARIA attributes for screen readers, and locks page scroll
  // while the menu is open (so the page behind it doesn't scroll too).
  function setMobileMenu(open) {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.toggle('op', open);
    mobileMenu.classList.toggle('op', open);
    hamburger.setAttribute('aria-expanded', String(open)); // Tells assistive tech whether the menu is currently expanded.
    hamburger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    document.body.style.overflow = open ? 'hidden' : ''; // Prevents background scroll while the menu overlay is open.
  }

  if (hamburger && mobileMenu) {
    // Clicking the hamburger flips the current state.
    hamburger.addEventListener('click', () => setMobileMenu(!hamburger.classList.contains('op')));
    if (mobileClose) mobileClose.addEventListener('click', () => setMobileMenu(false));
    // Clicking any link inside the mobile menu should also close it
    // (otherwise it would stay open after navigating to a new section).
    document.querySelectorAll('.mob a').forEach(link => link.addEventListener('click', () => setMobileMenu(false)));
    // Escape key closes the menu — standard accessibility expectation for overlays.
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && mobileMenu.classList.contains('op')) setMobileMenu(false);
    });
  }

  /* ----------------------------------------------------------
     SCROLL REVEAL
     Fades/slides elements into view as they enter the viewport, using the
     IntersectionObserver API (much cheaper than listening to scroll events
     and measuring positions manually).
  ---------------------------------------------------------- */
  const animated = document.querySelectorAll('.fi, .fl, .fr'); // Elements tagged for "fade in / from left / from right" entrance animations.
  const STAGGER_STEP_MS = 60; // Delay added per subsequent element so groups animate in one-by-one instead of all at once.
  const STAGGER_MAX_MS = 300; // Cap on the stagger so long lists don't take forever to finish animating.

  // Adds the 'v' (visible) class that the CSS keys its transition off of.
  // `delayMs` staggers the transition start time; the class is removed
  // again once the transition has had time to finish, so later
  // re-triggers (if any) wouldn't inherit a stale delay.
  function revealElement(el, delayMs) {
    if (delayMs) {
      el.style.transitionDelay = delayMs + 'ms';
      window.setTimeout(() => { el.style.transitionDelay = ''; }, delayMs + 750);
    }
    el.classList.add('v');
  }

  if ('IntersectionObserver' in window) {
    // threshold: 0.1 means the callback fires once at least 10% of the
    // element is visible in the viewport.
    const animObs = new IntersectionObserver(entries => {
      let staggerIndex = 0;
      entries.forEach(entry => {
        if (!entry.isIntersecting) return; // Ignore elements leaving the viewport — this observer only reveals, never hides.
        animObs.unobserve(entry.target); // One-shot: stop watching once revealed, since it should never re-hide.
        const inHero = entry.target.closest('#hero');
        // Hero content should appear immediately (no stagger) since it's
        // the first thing visible on load; everything else staggers in.
        const delay = inHero ? 0 : Math.min(staggerIndex * STAGGER_STEP_MS, STAGGER_MAX_MS);
        revealElement(entry.target, delay);
        if (!inHero) staggerIndex++;
      });
    }, { threshold: 0.1 });

    animated.forEach(el => animObs.observe(el));
  } else {
    // Fallback for very old browsers without IntersectionObserver support:
    // just reveal everything immediately rather than leaving it invisible.
    animated.forEach(el => revealElement(el, 0));
  }

  // Safety net: force the hero section visible shortly after load in case
  // the IntersectionObserver hasn't fired yet (e.g. the hero is technically
  // just below the fold on some viewport, or observer timing is delayed).
  window.setTimeout(() => {
    document.querySelectorAll('#hero .fi, #hero .fl, #hero .fr').forEach(el => el.classList.add('v'));
  }, 80);

  /* ----------------------------------------------------------
     COUNTER ANIMATION
     Animates a number counting up from 0 to a target value — used for the
     "years of experience", "apps shipped" style stats.
  ---------------------------------------------------------- */
  // Animates `el`'s text content counting from 0 up to `end` over `duration`
  // milliseconds, using requestAnimationFrame for a smooth, frame-synced
  // animation (rather than setInterval, which can drift/jank).
  function animateCounter(el, end, suffix = '', duration = 1600) {
    if (!el) return;
    let t0 = null; // Timestamp of the first animation frame, set lazily on first call.
    function step(ts) {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1); // Progress from 0 to 1 over the animation's lifetime.
      // Ease-out cubic: fast at the start, settling gently at the end,
      // rather than a linear (mechanical-looking) count.
      const e = p < 1 ? 1 - Math.pow(1 - p, 3) : 1;
      el.textContent = Math.floor(e * end) + (p >= 1 ? suffix : ''); // Suffix (e.g. '+') only appears once the count finishes.
      if (p < 1) window.requestAnimationFrame(step); // Keep animating until progress reaches 1.
    }
    window.requestAnimationFrame(step);
  }

  // Trigger the "trust stats" counters once that section scrolls into view,
  // rather than animating them immediately on page load (which the user
  // wouldn't even see yet).
  const statsEl = document.querySelector('#stats .trust');
  if (statsEl && 'IntersectionObserver' in window) {
    const statsObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(document.getElementById('c1'), 12, '+');
          animateCounter(document.getElementById('c2'), 3);
          animateCounter(document.getElementById('c3'), 8);
          animateCounter(document.getElementById('c4'), 7);
          statsObs.disconnect(); // One-shot — no need to keep observing after the counters have run.
        }
      });
    }, { threshold: 0.3 }); // Requires 30% visibility before triggering, so it fires once meaningfully in view.
    statsObs.observe(statsEl);
  }

  // Same pattern for the smaller counter pair inside the About section.
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
     A vertical "timeline rail" next to the About text that fills as you
     scroll and highlights whichever paragraph is currently nearest the
     center of the viewport (a reading-progress affordance).
  ---------------------------------------------------------- */
  const abTl = document.querySelector('.ab-tl'); // The rail element itself.
  if (abTl && aboutEl) {
    const abParas = Array.prototype.slice.call(abTl.querySelectorAll('p')); // All paragraphs tracked by the rail.
    let abTicking = false; // rAF throttle flag — see onAboutScroll below.

    // Recomputes the rail's fill height and which paragraph is "active".
    function updateAboutRail() {
      abTicking = false;
      const rect = abTl.getBoundingClientRect();
      const focusY = window.innerHeight * 0.5; // The vertical "focus line" is the middle of the viewport.
      // Fill height = distance from the rail's top to the focus line,
      // clamped so it never goes negative or exceeds the rail's height
      // (minus a small 20px margin so the fill doesn't overshoot the end).
      let fillPx = focusY - rect.top;
      fillPx = Math.max(0, Math.min(fillPx, rect.height - 20));
      abTl.style.setProperty('--fill', fillPx + 'px'); // CSS custom property the stylesheet uses to size the fill bar.

      // Find whichever paragraph's vertical center is closest to the focus line.
      let closest = null, closestDist = Infinity;
      abParas.forEach(p => {
        const r = p.getBoundingClientRect();
        const dist = Math.abs((r.top + r.height / 2) - focusY);
        if (dist < closestDist) { closestDist = dist; closest = p; }
      });
      abParas.forEach(p => p.classList.toggle('active', p === closest));
    }

    // Throttles scroll-driven updates to once per animation frame instead
    // of once per scroll event (scroll events can fire far more often than
    // the screen can repaint, wasting work).
    function onAboutScroll() {
      if (!abTicking) {
        window.requestAnimationFrame(updateAboutRail);
        abTicking = true;
      }
    }

    if ('IntersectionObserver' in window) {
      // Only listen to scroll while the About section is actually on
      // screen — no point recalculating the rail when it's nowhere near
      // the viewport. This keeps the scroll listener attached/detached
      // dynamically instead of running for the entire page lifetime.
      const abRailObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', onAboutScroll, { passive: true });
            updateAboutRail(); // Run once immediately so it's correct the moment the section appears.
          } else {
            window.removeEventListener('scroll', onAboutScroll);
          }
        });
      }, { threshold: 0 }); // threshold 0 = fires as soon as even one pixel is visible/hidden.
      abRailObs.observe(aboutEl);
    } else {
      updateAboutRail(); // No IntersectionObserver support: just compute it once statically.
    }
  }

  /* ----------------------------------------------------------
     SPOTLIGHT CARDS — cursor-tracked radial highlight
     Gives cards a soft glow that follows the mouse cursor, implemented
     entirely via CSS custom properties (--mx/--my) that the stylesheet
     uses as the center point of a radial-gradient.
  ---------------------------------------------------------- */
  // Every selector here targets a different card-style component across
  // the site that shares the same hover-glow visual treatment.
  const SPOTLIGHT_SELECTOR = '.sk-card,.pc,.dc,.ec,.tl-card,.rm-phase,.mtd-card,.bento-tile,.fw-card,' +
    '.vf-card,.flow-node,.case-study,.mat-card,.connect-card';
  // Only enable cursor-driven hover effects on devices that actually have
  // a precise pointer with real hover support (i.e. not touchscreens,
  // where "hover" doesn't meaningfully exist).
  const canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  // Respect the OS-level "reduce motion" accessibility setting — skip
  // decorative motion effects for users who've asked for less animation.
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canHover && !reducedMotion) {
    // A single document-level listener (rather than one per card) is more
    // efficient; event.target.closest(...) finds the nearest matching card
    // ancestor of whatever element the pointer is currently over.
    document.addEventListener('pointermove', event => {
      const card = event.target.closest(SPOTLIGHT_SELECTOR);
      if (!card) return; // Pointer isn't over any spotlight-enabled card — nothing to do.
      const rect = card.getBoundingClientRect();
      // Convert the cursor position to a percentage of the card's own
      // width/height, so the CSS gradient's origin tracks the cursor
      // regardless of the card's size or position on the page.
      card.style.setProperty('--mx', ((event.clientX - rect.left) / rect.width) * 100 + '%');
      card.style.setProperty('--my', ((event.clientY - rect.top) / rect.height) * 100 + '%');
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     HERO BACKGROUND ORBS — subtle pointer-driven parallax
     The soft background "orb" shapes drift slightly opposite/along the
     cursor to create a subtle depth effect.
  ---------------------------------------------------------- */
  const orbs = document.querySelectorAll('.bg-orb');
  if (canHover && !reducedMotion && orbs.length) {
    // target = where the cursor currently implies the orbs should be;
    // cur = the orbs' actual current (lagging) position. Interpolating
    // between them each frame produces a smooth "catch-up" easing effect
    // instead of the orbs snapping directly to the cursor.
    let targetX = 0, targetY = 0, curX = 0, curY = 0;
    window.addEventListener('pointermove', event => {
      // Normalize cursor position to a -1..1 range centered on the viewport middle.
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // Runs every animation frame regardless of pointer movement, so the
    // easing keeps animating toward the latest target even between moves.
    function tickOrbs() {
      // Simple exponential easing: move 4% of the remaining distance to
      // the target each frame — a cheap way to get smooth "lag" motion.
      curX += (targetX - curX) * 0.04;
      curY += (targetY - curY) * 0.04;
      orbs.forEach((orb, i) => {
        const strength = (i + 1) * 10; // Later orbs drift further, adding a sense of layered depth.
        orb.style.transform = `translate(${curX * strength}px, ${curY * strength}px)`;
      });
      window.requestAnimationFrame(tickOrbs); // Self-scheduling loop — runs indefinitely once started.
    }
    window.requestAnimationFrame(tickOrbs);
  }

  /* ----------------------------------------------------------
     CARD TILT — cursor-driven 3D tilt, same card family as the
     spotlight glow above, plus About's highlight cards
  ---------------------------------------------------------- */
  const tiltCards = document.querySelectorAll(SPOTLIGHT_SELECTOR + ',.hl-item');
  if (canHover && !reducedMotion && tiltCards.length) {
    const TILT_MAX = 3; // Maximum tilt angle in degrees — kept small for a subtle, professional effect rather than a gimmicky one.
    tiltCards.forEach(card => {
      // Unlike the spotlight glow (one shared document listener), tilt is
      // attached per-card because the rotation calculation and CSS
      // transform are specific to each card's own bounding box.
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width; // Cursor x position as 0..1 across the card.
        const py = (event.clientY - rect.top) / rect.height; // Cursor y position as 0..1 down the card.
        // Map cursor position to a rotation: center of the card = no tilt;
        // edges = maximum tilt. Y-axis rotation follows horizontal cursor
        // movement and vice versa, matching how a real tilted surface would look.
        const rotY = (px - 0.5) * TILT_MAX * 2;
        const rotX = (0.5 - py) * TILT_MAX * 2;
        card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
      }, { passive: true });
      // Reset the tilt back to flat once the cursor leaves the card.
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ----------------------------------------------------------
     COMMAND PALETTE (Ctrl/Cmd+K)
     A searchable quick-navigation overlay, similar to VS Code's/GitHub's
     command palette — lets keyboard users jump to any section, link, or
     action (like toggling the theme) without touching the mouse.
  ---------------------------------------------------------- */
  const cmdkOverlay = document.getElementById('cmdk'); // The full palette overlay/modal container.
  const cmdkInput = document.getElementById('cmdk-input'); // Search input inside the palette.
  const cmdkList = document.getElementById('cmdk-list'); // <ul> of selectable commands/links.
  const cmdkEmpty = document.getElementById('cmdk-empty'); // "No results" message, shown when the filter matches nothing.
  const cmdkToggle = document.getElementById('cmdk-tgl'); // Optional visible button that also opens the palette.

  if (cmdkOverlay && cmdkInput && cmdkList) {
    const cmdkItems = Array.from(cmdkList.querySelectorAll('li')); // Snapshot of every command item, as a real array (not a live NodeList) for easy filtering.
    let lastFocused = null; // Element that had focus before the palette opened, so focus can be restored on close (accessibility best practice).

    // Returns only the items currently passing the search filter (not hidden).
    function visibleItems() {
      return cmdkItems.filter(item => !item.hidden);
    }

    // Marks exactly one item as the "active" (keyboard-highlighted) selection.
    function setActive(item) {
      cmdkItems.forEach(el => el.classList.remove('active'));
      if (!item) return;
      item.classList.add('active');
      item.scrollIntoView({ block: 'nearest' }); // Keeps the active item visible if the list scrolls.
    }

    // Filters the command list as the user types, matching against both
    // the item's visible text and its data-group (a hidden category label
    // used to widen what a search term can match against).
    function filterItems() {
      const q = cmdkInput.value.trim().toLowerCase();
      let anyVisible = false;
      cmdkItems.forEach(item => {
        const text = (item.textContent + ' ' + (item.dataset.group || '')).toLowerCase();
        const match = q === '' || text.includes(q); // Empty query matches everything.
        item.hidden = !match;
        if (match) anyVisible = true;
      });
      cmdkEmpty.hidden = anyVisible; // Show the "no results" message only when nothing matched.
      setActive(visibleItems()[0] || null); // Auto-highlight the first visible result after filtering.
    }

    // Executes whichever action a command item represents: toggling the
    // theme, triggering a file download, opening an external link in a new
    // tab, jumping to an in-page anchor, or navigating to another URL.
    function runItem(item) {
      if (!item) return;
      if (item.dataset.action === 'theme' && themeToggle) {
        themeToggle.click(); // Reuse the existing theme-toggle button's own click handler rather than duplicating its logic.
        closeCmdk();
        return;
      }
      const href = item.dataset.href;
      if (!href) return;
      if (item.dataset.download === 'true') {
        // Programmatically create, click, and remove a temporary <a> tag —
        // the standard trick for triggering a file download from JS without
        // navigating the current page away.
        const a = document.createElement('a');
        a.href = href;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else if (item.dataset.external === 'true') {
        // 'noopener,noreferrer' prevents the newly opened page from being
        // able to access `window.opener` — a standard security precaution
        // for links to external/untrusted sites.
        window.open(href, '_blank', 'noopener,noreferrer');
      } else if (href.charAt(0) === '#') {
        window.location.hash = href; // In-page anchor — lets the browser handle the smooth scroll/jump natively.
      } else {
        window.location.href = href; // Regular same-site navigation.
      }
      closeCmdk();
    }

    // Opens the palette: remembers current focus, resets/reruns the
    // filter, locks page scroll, and focuses the input after a short delay
    // (the delay lets the overlay's CSS transition/visibility change apply
    // first, so focus doesn't get lost on an element that's still hidden).
    function openCmdk() {
      lastFocused = document.activeElement;
      cmdkOverlay.hidden = false;
      cmdkInput.value = '';
      filterItems();
      document.body.style.overflow = 'hidden';
      window.setTimeout(() => cmdkInput.focus(), 10);
    }

    // Closes the palette and restores focus to whatever had it before
    // opening — important for keyboard/screen-reader users so focus
    // doesn't get lost after the overlay disappears.
    function closeCmdk() {
      cmdkOverlay.hidden = true;
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    // Global keyboard shortcut handling: Ctrl/Cmd+K toggles the palette
    // from anywhere on the page; Escape closes it if open.
    document.addEventListener('keydown', event => {
      const isK = event.key === 'k' || event.key === 'K';
      if ((event.metaKey || event.ctrlKey) && isK) {
        event.preventDefault(); // Stops the browser's own Ctrl/Cmd+K behavior (e.g. address bar search in some browsers).
        cmdkOverlay.hidden ? openCmdk() : closeCmdk();
      } else if (event.key === 'Escape' && !cmdkOverlay.hidden) {
        closeCmdk();
      }
    });

    if (cmdkToggle) cmdkToggle.addEventListener('click', openCmdk);
    // Clicking the dimmed backdrop (but not the palette content itself)
    // closes the overlay — a standard modal UX pattern.
    cmdkOverlay.addEventListener('click', event => {
      if (event.target === cmdkOverlay) closeCmdk();
    });
    cmdkInput.addEventListener('input', filterItems);
    // Arrow keys move the highlighted selection; Enter runs the currently
    // highlighted (or first) item — mirrors familiar command-palette UX.
    cmdkInput.addEventListener('keydown', event => {
      const visible = visibleItems();
      const activeIdx = visible.findIndex(el => el.classList.contains('active'));
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActive(visible[Math.min(activeIdx + 1, visible.length - 1)] || visible[0]); // Clamp at the last item instead of wrapping.
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActive(visible[Math.max(activeIdx - 1, 0)] || visible[0]); // Clamp at the first item instead of wrapping.
      } else if (event.key === 'Enter') {
        event.preventDefault();
        runItem(visible[activeIdx] || visible[0]);
      }
    });
    // Mouse users get the same behavior: click to run, hover to highlight.
    cmdkItems.forEach(item => {
      item.addEventListener('click', () => runItem(item));
      item.addEventListener('mouseenter', () => setActive(item));
    });
  }

  /* ----------------------------------------------------------
     MAGNETIC BUTTONS — CTAs pull gently toward the cursor within
     a small radius. Desktop pointer only; off entirely on touch
     and under prefers-reduced-motion.
  ---------------------------------------------------------- */
  const magneticBtns = document.querySelectorAll('.btn');
  if (canHover && !reducedMotion && magneticBtns.length) {
    const MAG_STRENGTH = 0.25; // Fraction of the cursor's offset from center that the button actually moves — keeps the effect subtle.
    const MAG_MAX = 7; // Hard cap (in px) on how far a button can shift, so it never drifts too far from its layout position.
    magneticBtns.forEach(btn => {
      btn.addEventListener('pointermove', event => {
        const rect = btn.getBoundingClientRect();
        // Offset of the cursor from the button's own center point.
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        // Scale the offset down by MAG_STRENGTH and clamp to +/-MAG_MAX
        // pixels, producing the gentle "magnetic pull" translate effect.
        const mx = Math.max(-MAG_MAX, Math.min(MAG_MAX, dx * MAG_STRENGTH));
        const my = Math.max(-MAG_MAX, Math.min(MAG_MAX, dy * MAG_STRENGTH));
        btn.style.transform = `translate(${mx}px, ${my}px)`;
      }, { passive: true });
      // Snap back to the original position once the cursor leaves the button.
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  /* ----------------------------------------------------------
     BACK TO TOP — fades in once you've scrolled past the hero
  ---------------------------------------------------------- */
  const totop = document.getElementById('totop'); // The floating "back to top" button.
  if (totop) {
    let totopTicking = false; // rAF throttle flag, same pattern as the About rail above.
    function updateTotop() {
      totopTicking = false;
      // Only show the button once scrolled past 80% of one viewport height
      // — i.e. once the hero is mostly out of view, not immediately.
      totop.classList.toggle('show', window.scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener('scroll', () => {
      // Throttle to one recalculation per animation frame instead of
      // running on every single scroll event (which can fire dozens of
      // times per second).
      if (!totopTicking) {
        window.requestAnimationFrame(updateTotop);
        totopTicking = true;
      }
    }, { passive: true });
    updateTotop(); // Set correct initial state in case the page loads already scrolled down.
  }

  /* ----------------------------------------------------------
     SMOOTH CASE-STUDY EXPAND/COLLAPSE — animates the native
     <details> open/close with WAAPI instead of the default snap.
     Falls back to plain native behaviour when Element#animate or
     prefers-reduced-motion isn't available.
  ---------------------------------------------------------- */
  const caseStudies = document.querySelectorAll('.case-study'); // Each is a native <details> element used as an expandable project case study.
  // Only attach the custom animation if the browser supports the Web
  // Animations API (`Element.animate`) and the user hasn't asked for
  // reduced motion — otherwise <details> just uses its default instant
  // open/close behavior, which is perfectly accessible on its own.
  if (caseStudies.length && !reducedMotion && document.documentElement.animate) {
    const DURATION = 320; // Animation length in ms.
    const EASING = 'cubic-bezier(.4,0,.2,1)'; // A standard "ease-out" style curve for natural-feeling expand/collapse motion.

    caseStudies.forEach(details => {
      const summary = details.querySelector('summary'); // The always-visible clickable header.
      const body = details.querySelector('.cs-body'); // The collapsible content region.
      if (!summary || !body) return; // Skip malformed markup defensively.

      let anim = null; // Currently running WAAPI Animation object, if any.
      let closing = false; // True while a collapse animation is in flight.
      let opening = false; // True while an expand animation is in flight.

      // Called once an open/close animation completes: syncs the native
      // `open` attribute to match, clears animation state, and removes the
      // temporary inline height/overflow styles used to drive the animation
      // (so the element returns to being sized naturally by its content/CSS).
      function onFinish(openState) {
        details.open = openState;
        anim = null;
        closing = false;
        opening = false;
        details.style.height = '';
        details.style.overflow = '';
      }

      // anim.onfinish is the primary signal; the setTimeout is a safety net
      // in case a backgrounded/throttled tab never fires it, so the panel
      // can never get stuck mid-animation.
      function runAnim(startHeight, endHeight, openState) {
        if (anim) anim.cancel(); // Cancel any in-flight animation first (e.g. rapid double-click) so they don't fight each other.
        const thisAnim = details.animate({ height: [startHeight, endHeight] }, { duration: DURATION, easing: EASING });
        anim = thisAnim;
        // Captured in a closure so both the natural finish event and the
        // fallback timeout call the exact same completion logic exactly once.
        const finish = () => { if (anim === thisAnim) onFinish(openState); };
        thisAnim.onfinish = finish;
        thisAnim.oncancel = () => {
          // If this animation was cancelled (superseded by a newer one),
          // just clear the in-flight flags — the newer animation will
          // handle its own onFinish when it completes.
          if (anim === thisAnim) { closing = false; opening = false; }
        };
        window.setTimeout(finish, DURATION + 80); // Safety-net fallback described in the comment above.
      }

      // Animates the panel shrinking from its full open height down to
      // just the summary's height (i.e. visually closing it).
      function shrink() {
        closing = true;
        const startHeight = details.offsetHeight + 'px';
        const endHeight = summary.offsetHeight + 'px';
        details.style.overflow = 'hidden'; // Clip content during the height animation so it doesn't overflow/reflow oddly mid-transition.
        runAnim(startHeight, endHeight, false);
      }

      // Animates the panel growing from the summary's height up to summary
      // + body height (i.e. visually opening it).
      function expand() {
        opening = true;
        details.style.overflow = 'hidden';
        const startHeight = details.offsetHeight + 'px';
        const endHeight = summary.offsetHeight + body.offsetHeight + 'px';
        runAnim(startHeight, endHeight, true);
      }

      // Native <details> elements snap open instantly and only THEN reveal
      // their content — there's no "closed height" to animate from unless
      // we first set `open = true` while pinning the element's height to
      // its old (closed) value, then let the animation grow it on the next
      // frame. This function does exactly that hand-off.
      function open() {
        details.style.height = details.offsetHeight + 'px'; // Pin the current (closed) height before revealing content.
        details.open = true; // Now the full content exists in the DOM/layout, but the element is still visually pinned to its old height.
        window.requestAnimationFrame(() => expand()); // Next frame: let expand() animate from that pinned height to the full height.
      }

      summary.addEventListener('click', event => {
        event.preventDefault(); // Suppress the browser's own instant native toggle — this code drives the transition manually instead.
        details.style.overflow = 'hidden';
        if (closing || !details.open) {
          // Either currently mid-close (reverse direction) or fully closed — open it.
          open();
        } else if (opening || details.open) {
          // Either currently mid-open (reverse direction) or fully open — close it.
          shrink();
        }
      });
    });
  }

  /* ----------------------------------------------------------
     PIPELINE COMPONENT — the recurring problem-to-product flow
     diagram (hero, and later #work/#method/#ai-eng use the same
     markup pattern). Hover or focus a node to see its explanation;
     click/Enter does the same, so touch and keyboard get parity.
  ---------------------------------------------------------- */
  // This markup pattern (a [data-pipeline] container of nodes, next to a
  // sibling [data-pipeline-panel] that shows the selected node's detail)
  // repeats in multiple sections, so this wires up every instance found on
  // the page in one pass rather than duplicating the logic per section.
  document.querySelectorAll('[data-pipeline]').forEach(container => {
    const nodes = Array.from(container.querySelectorAll('.pipeline-node')); // The clickable/hoverable steps in the diagram.
    // The explanation panel lives alongside the pipeline container (as a
    // sibling), not inside it, so it's looked up via the shared parent.
    const panel = container.parentElement && container.parentElement.querySelector('[data-pipeline-panel]');
    if (!nodes.length || !panel) return; // Nothing to wire up if either piece is missing.
    const lbl = panel.querySelector('[data-pipeline-panel-lbl]'); // Panel's title/label region.
    const text = panel.querySelector('[data-pipeline-panel-text]'); // Panel's explanatory text region.

    // Updates the panel to reflect whichever node was just
    // hovered/focused/clicked, and marks that node as expanded for
    // styling + accessibility (aria-expanded).
    function show(node) {
      nodes.forEach(n => n.setAttribute('aria-expanded', String(n === node)));
      const k = node.querySelector('.pipeline-node-k'); // The node's short key/label sub-element.
      if (lbl) lbl.textContent = k ? k.textContent.trim() : '';
      if (text) text.textContent = node.dataset.explain || ''; // Longer explanation is stored in a data-attribute on the node itself.
      panel.hidden = false;
    }

    // mouseenter (hover), focus (keyboard tab), and click all trigger the
    // same `show` — this is what gives mouse, keyboard, and touch users
    // equivalent access to the same information.
    nodes.forEach(node => {
      node.addEventListener('mouseenter', () => show(node));
      node.addEventListener('focus', () => show(node));
      node.addEventListener('click', () => show(node));
    });
  });

  /* ----------------------------------------------------------
     SERVICE WORKER
     Registers the offline/caching service worker (sw.js) so the site can
     serve cached assets on repeat visits and work offline.
  ---------------------------------------------------------- */
  // Service workers require a secure context (http/https — not e.g.
  // file:// during local testing), hence the protocol check alongside the
  // feature-detection check.
  if ('serviceWorker' in navigator && /^(https?:)$/.test(window.location.protocol)) {
    // Registering after the 'load' event avoids competing with the initial
    // page load for network/CPU resources, since the service worker isn't
    // needed for the very first render.
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {}); // Silently ignore registration failures (e.g. unsupported browser edge cases) — the site still works without it.
    });
  }
})();
