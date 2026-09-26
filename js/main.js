/* ============================================================
   DES Global — main.js
   Theme toggle, sticky header, active nav link, mobile menu,
   tabs + deep links, clickable cards, counters, scroll reveal,
   hero parallax.
   (The contact form and slide viewer have their own scripts
   inside contact.html / presentations.html.)
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ────────────────────────────────────────
     1. THEME (day / night)
     The saved theme is applied by a tiny inline script in each page's <head>
     (prevents a flash of the wrong theme); this only handles the toggle.
  ──────────────────────────────────────── */
  var root = document.documentElement;

  // Capture phase so the toggle always wins, even inside other clickable areas.
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#themeToggle') || e.target.closest('#mobileThemeToggle');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('des-theme', next); } catch (err) { /* storage blocked: theme just won't persist */ }
  }, true);

  /* ────────────────────────────────────────
     2. STICKY HEADER
  ──────────────────────────────────────── */
  var header = document.querySelector('header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ────────────────────────────────────────
     3. ACTIVE NAV LINK
  ──────────────────────────────────────── */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  // Pages that belong under the "Solutions" nav item
  var solutionPages = ['emrs.html', 'optimaxx.html', 'multimaxx.html', 'combustion.html', 'variability.html', 'audit.html', 'services.html'];
  var isSolutionPage = solutionPages.indexOf(currentPage) !== -1;
  // Pages that belong under the "Resources" nav item
  var resourcePages = ['news.html', 'presentations.html'];
  var isResourcePage = resourcePages.indexOf(currentPage) !== -1;

  document.querySelectorAll('nav a, .mobile-nav a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').split('#')[0].split('?')[0];
    var isMatch = href === currentPage;
    var isSolutionParent = isSolutionPage && href === 'services.html';
    var isResourceParent = isResourcePage && href === 'news.html' && !a.closest('.nav-dropdown');
    if (isMatch || isSolutionParent || isResourceParent) a.classList.add('active');
  });

  /* ────────────────────────────────────────
     4. MOBILE MENU
  ──────────────────────────────────────── */
  var hamburger = document.getElementById('hamburgerBtn');
  var mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    var setMenu = function (open) {
      mobileNav.classList.toggle('open', open);
      hamburger.classList.toggle('open', open);
    };
    hamburger.addEventListener('click', function () { setMenu(!mobileNav.classList.contains('open')); });
    document.getElementById('mobileClose').addEventListener('click', function () { setMenu(false); });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
  }

  /* ────────────────────────────────────────
     5. TABS (markets.html) + DEEP LINKS
     Panels are found by id ("tab-" + data-tab), never by DOM position.
  ──────────────────────────────────────── */
  function activateTab(tabId) {
    var btn = document.querySelector('.tab-btn[data-tab="' + tabId + '"]');
    if (!btn) return;
    document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
    document.querySelectorAll('.tab-content').forEach(function (p) { p.classList.remove('active'); });
    btn.classList.add('active');
    var panel = document.getElementById('tab-' + tabId);
    if (panel) panel.classList.add('active');
  }

  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var tabId = this.dataset.tab;
      if (!tabId) return;
      activateTab(tabId);
      if (history.replaceState) history.replaceState(null, '', '#' + tabId);   // update URL without scrolling
    });
  });

  // Cards that live inside a tab → which tab to open before scrolling to them
  var idToTab = {
    'powerhouses': 'industries',
    'pulp-paper': 'industries',
    'oil-gas': 'industries',
    'chemicals': 'industries',
    'mining-steel': 'industries',
    'commercial': 'industries'
  };

  function activateFromHash() {
    var hash = window.location.hash.replace('#', '');
    if (!hash) return;

    // 1. Hash names a tab directly (e.g. markets.html#processes)
    var tabBtn = document.querySelector('.tab-btn[data-tab="' + hash + '"]');
    if (tabBtn) {
      activateTab(hash);
      setTimeout(function () {
        var section = tabBtn.closest('section');
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return;
    }

    // 2. Hash names a card inside a tab → open that tab, scroll to the card, flash it
    var parentTab = idToTab[hash];
    if (parentTab) {
      activateTab(parentTab);
      setTimeout(function () {
        var el = document.getElementById(hash);
        if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.style.transition = 'box-shadow 0.3s';
        el.style.boxShadow = '0 0 0 3px var(--accent)';
        setTimeout(function () { el.style.boxShadow = ''; }, 1800);
      }, 120);
      return;
    }

    // 3. Any other element id
    var target = document.getElementById(hash);
    if (target) setTimeout(function () { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150);
  }
  activateFromHash();
  window.addEventListener('hashchange', activateFromHash);

  /* ────────────────────────────────────────
     6. CLICKABLE CARDS
     Whole card follows its main link: .svc-link, then .btn-primary, then the first <a>.
     Cards containing a form are never hijacked.
  ──────────────────────────────────────── */
  document.querySelectorAll('.svc-card, .mkt-card').forEach(function (card) {
    if (card.querySelector('form')) return;
    var link = card.querySelector('.svc-link') || card.querySelector('.btn-primary') || card.querySelector('a[href]');
    if (!link) return;
    card.style.cursor = 'pointer';
    card.addEventListener('click', function (e) {
      // real links and form controls handle their own clicks
      if (e.target.closest('a, input, textarea, select, button, label')) return;
      window.location.href = link.href;
    });
  });

  /* ────────────────────────────────────────
     7. COUNTERS  ([data-count] / [data-suffix])
  ──────────────────────────────────────── */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var end = parseFloat(el.dataset.count);
        var suffix = el.dataset.suffix || '';
        var isFloat = String(end).indexOf('.') !== -1;
        var cur = 0;
        var t = setInterval(function () {
          cur = Math.min(cur + end / 60, end);
          el.textContent = (isFloat ? cur.toFixed(1) : Math.floor(cur)) + suffix;
          if (cur >= end) clearInterval(t);
        }, 1600 / 60);
        cObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cObs.observe(el); });
  }

  /* ────────────────────────────────────────
     8. SCROLL REVEAL  (.reveal → .reveal.on)
  ──────────────────────────────────────── */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var rObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var delay = parseInt(entry.target.dataset.delay || 0, 10);
        setTimeout(function () { entry.target.classList.add('on'); }, delay);
        rObs.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    reveals.forEach(function (el, i) {
      el.dataset.delay = (i % 4) * 90;      // light stagger
      rObs.observe(el);
    });
  }

  /* ────────────────────────────────────────
     9. HERO PARALLAX
  ──────────────────────────────────────── */
  var heroDots = document.querySelector('.hero-dots');
  if (heroDots) {
    window.addEventListener('scroll', function () {
      heroDots.style.transform = 'translateY(' + (window.scrollY * 0.18) + 'px)';
    }, { passive: true });
  }

});
