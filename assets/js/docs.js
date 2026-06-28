/* ListenUp docs — shared behaviour: theme toggle, ⌘K search, copy, scrollspy, mobile nav.
   Vanilla JS, no build step → drops into a Hugo theme's /assets/js unchanged. */
(function () {
  /* ---- theme (persisted) ---- */
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem('lu-docs-theme');
    if (saved) root.setAttribute('data-theme', saved);
    else if (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) root.setAttribute('data-theme', 'dark');
  } catch (e) {}
  window.toggleTheme = function () {
    var apply = function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('lu-docs-theme', next); } catch (e) {}
    };
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduce) { apply(); return; }
    // Record the toggle's centre so the wipe can originate there (and so swapping
    // to a circular reveal needs only the CSS change documented in the stylesheet).
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      var r = btn.getBoundingClientRect();
      root.style.setProperty('--vt-x', (r.left + r.width / 2) + 'px');
      root.style.setProperty('--vt-y', (r.top + r.height / 2) + 'px');
    }
    document.startViewTransition(apply);
  };

  /* ---- platform toggle (iOS/Android screenshots) ---- */
  function syncPlatformButtons() {
    var os = root.getAttribute('data-platform') || 'ios';
    Array.prototype.forEach.call(document.querySelectorAll('.seg button[data-os]'), function (b) {
      b.classList.toggle('on', b.getAttribute('data-os') === os);
    });
  }
  window.luSetPlatform = function (os) {
    var prev = root.getAttribute('data-platform') || 'ios';
    root.setAttribute('data-platform', os);
    try { localStorage.setItem('lu-docs-platform', os); } catch (e) {}
    syncPlatformButtons();
    if (prev === os) return;                 // re-tap of the active platform: nothing to do

    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;                      // CSS idle rules already swapped it; honour the preference

    // Iris the incoming layer in over the outgoing one, per frame on the page.
    Array.prototype.forEach.call(document.querySelectorAll('.shots .scr'), function (scr) {
      var to = scr.querySelector('.layer[data-os="' + os + '"]');
      var from = scr.querySelector('.layer[data-os="' + prev + '"]');
      if (!to || !from) return;              // single-platform frame: no transition
      to.classList.remove('lu-enter');
      void scr.offsetWidth;                  // reflow so the animation re-fires on every toggle
      from.classList.add('lu-leave');
      to.classList.add('lu-enter');
      var clear = function () {
        to.classList.remove('lu-enter');
        from.classList.remove('lu-leave');
        to.removeEventListener('animationend', clear);
      };
      to.addEventListener('animationend', clear);
      setTimeout(clear, 900);               // safety net if animationend is missed
    });
  };
  document.addEventListener('DOMContentLoaded', syncPlatformButtons);

  /* ---- search index (generated; fetched from index.json) ---- */
  var INDEX = [];
  var indexLoaded = false;
  function loadIndex(cb) {
    if (indexLoaded) { cb(); return; }
    var url = (document.body && document.body.dataset.searchIndex) || 'index.json';
    fetch(url).then(function (r) { return r.json(); }).then(function (data) {
      INDEX = data || []; indexLoaded = true; cb();
    }).catch(function () { indexLoaded = true; cb(); });
  }

  function ico(name) {
    var P = {
      home: '<path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5"/>',
      download: '<path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"/>',
      rocket: '<path d="M5 15c-1.5 1-2 5-2 5s4-.5 5-2m9.5-13.5C19 6 18 11 14 15l-5-5C13 6 18 5 19.5 5.5ZM9 13l-2 2m6 0 2-2"/>',
      chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3m6-3v3M9 20v3m6-3v3M1 9h3m-3 6h3m17-6h2m-2 6h2"/>',
      sliders: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M8 14v6"/>',
      lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
      refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
      folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
      sparkles: '<path d="M12 3l1.8 4.7L18 9.5l-4.2 1.8L12 16l-1.8-4.7L6 9.5l4.2-1.8ZM19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9Z"/>',
      apple: '<path d="M16 12c0-2 1.6-3 1.7-3-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .6 1 1.4 2 2.4 2 .9 0 1.3-.6 2.4-.6 1.1 0 1.4.6 2.4.6s1.7-.9 2.3-1.9c.7-1 1-2 1-2.1-.1 0-2.9-1.1-2.9-3.9ZM14 5.5c.5-.7.9-1.6.8-2.5-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9 0 1.8-.4 2.3-1.1Z"/>',
      android: '<path d="M5 10v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6M5 10a7 7 0 0 1 14 0M5 10h14M9 6.5 7.5 4.5M15 6.5 16.5 4.5M9.5 13h.01M14.5 13h.01M8 17v2.5M16 17v2.5"/>',
      help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 0 1 4 2c0 1.5-2 2-2 3.5M12 17.5h.01"/>',
      tag: '<path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9ZM8 8h.01"/>'
    };
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + (P[name] || P.help) + '</svg>';
  }

  /* ---- search modal ---- */
  var overlay, input, resultsEl, active = -1, flat = [];
  function buildModal() {
    overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.innerHTML =
      '<div class="search-box" role="dialog" aria-modal="true" aria-label="Search docs">' +
        '<div class="search-head">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>' +
          '<input type="text" placeholder="Search the documentation…" autocomplete="off" spellcheck="false" />' +
          '<span class="esc">ESC</span>' +
        '</div>' +
        '<div class="search-results"></div>' +
        '<div class="search-foot"><span><kbd>↑↓</kbd>navigate</span><span><kbd>↵</kbd>open</span><span style="margin-left:auto">Search by ListenUp</span></div>' +
      '</div>';
    document.body.appendChild(overlay);
    input = overlay.querySelector('input');
    resultsEl = overlay.querySelector('.search-results');
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeSearch(); });
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); closeSearch(); return; }
      if (e.key !== 'Tab') return;
      var f = overlay.querySelectorAll('input, a[href]');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    input.addEventListener('input', render);
    input.addEventListener('keydown', onKey);
    render();
  }
  function render() {
    var q = (input.value || '').trim().toLowerCase();
    var list = q ? INDEX.filter(function (x) { return (x.t + ' ' + x.d + ' ' + x.g).toLowerCase().indexOf(q) > -1; }) : INDEX;
    flat = list; active = list.length ? 0 : -1;
    if (!list.length) { resultsEl.innerHTML = '<div class="search-empty">No results for “' + q.replace(/</g,'&lt;') + '”</div>'; return; }
    var html = '', lastG = null;
    list.forEach(function (x, idx) {
      if (x.g !== lastG) { html += '<div class="sr-group-label">' + x.g + '</div>'; lastG = x.g; }
      html += '<a class="sr' + (idx === active ? ' active' : '') + '" data-idx="' + idx + '" href="' + x.p + '">' +
        '<span class="sric">' + ico(x.i) + '</span>' +
        '<span><div class="srt">' + x.t + '</div><div class="srd">' + x.d + '</div></span>' +
        '<span class="srpath">' + (x.p === '#' ? 'soon' : x.p.split('/').pop()) + '</span></a>';
    });
    resultsEl.innerHTML = html;
    Array.prototype.forEach.call(resultsEl.querySelectorAll('.sr'), function (el) {
      el.addEventListener('mousemove', function () { setActive(+el.dataset.idx); });
    });
  }
  function setActive(i) {
    active = i;
    Array.prototype.forEach.call(resultsEl.querySelectorAll('.sr'), function (el) {
      el.classList.toggle('active', +el.dataset.idx === active);
    });
  }
  function onKey(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (active < flat.length - 1) setActive(active + 1); ensureVisible(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (active > 0) setActive(active - 1); ensureVisible(); }
    else if (e.key === 'Enter') { e.preventDefault(); var x = flat[active]; if (x && x.p !== '#') location.href = x.p; }
    else if (e.key === 'Escape') { closeSearch(); }
  }
  function ensureVisible() {
    var el = resultsEl.querySelector('.sr.active');
    if (!el) return;
    var r = el.getBoundingClientRect(), pr = resultsEl.getBoundingClientRect();
    if (r.bottom > pr.bottom) resultsEl.scrollTop += r.bottom - pr.bottom + 8;
    if (r.top < pr.top) resultsEl.scrollTop -= pr.top - r.top + 8;
  }
  var lastFocus = null;
  window.openSearch = function () {
    if (!overlay) buildModal();
    lastFocus = document.activeElement;
    overlay.classList.add('open'); input.value = '';
    loadIndex(function () { render(); });
    setTimeout(function () { input.focus(); }, 30);
  };
  function closeSearch() {
    if (!overlay) return;
    overlay.classList.remove('open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---- global keys ---- */
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); window.openSearch(); }
    if (e.key === '/' && !/input|textarea/i.test((document.activeElement || {}).tagName || '')) { e.preventDefault(); window.openSearch(); }
  });

  /* ---- mobile nav ---- */
  window.toggleNav = function () { document.body.classList.toggle('nav-open'); };

  /* ---- copy buttons ---- */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.copy-btn');
    if (!btn) return;
    var pre = btn.closest('.code').querySelector('pre');
    var text = pre.innerText.replace(/^\s*\$\s/gm, '').replace(/\u200b/g, '');
    navigator.clipboard && navigator.clipboard.writeText(text);
    var orig = btn.querySelector('.lbl');
    btn.classList.add('done');
    if (orig) orig.textContent = 'Copied';
    setTimeout(function () { btn.classList.remove('done'); if (orig) orig.textContent = 'Copy'; }, 1600);
  });

  /* ---- heading anchors: click to copy a deep link ---- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('.h-anchor');
    if (!a || !navigator.clipboard) return;
    e.preventDefault();
    var href = a.getAttribute('href');
    navigator.clipboard.writeText(location.origin + location.pathname + href).then(function () {
      history.replaceState(null, '', href);
      a.classList.add('copied');
      setTimeout(function () { a.classList.remove('copied'); }, 1200);
    });
  });

  /* ---- lightbox (click a screenshot to enlarge) ---- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a.lightbox');
    if (!a) return;
    e.preventDefault();
    var img = a.querySelector('img');
    openLightbox(a.getAttribute('href'), img ? img.getAttribute('alt') : '');
  });
  function openLightbox(src, alt) {
    var ov = document.createElement('div');
    ov.className = 'lightbox-overlay';
    var im = document.createElement('img');
    im.src = src; im.alt = alt || '';
    ov.appendChild(im);
    function close() {
      ov.classList.remove('open');
      document.removeEventListener('keydown', onKey);
      setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); }, 180);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    ov.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    document.body.appendChild(ov);
    requestAnimationFrame(function () { ov.classList.add('open'); });
  }

  /* ---- TOC scrollspy ---- */
  window.addEventListener('DOMContentLoaded', function () {
    var links = Array.prototype.slice.call(document.querySelectorAll('.toc a[href^="#"]'));
    if (!links.length) return;
    var map = links.map(function (l) { var el = document.getElementById(l.getAttribute('href').slice(1)); return { l: l, el: el }; }).filter(function (x) { return x.el; });
    function onScroll() {
      var top = window.scrollY + parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) + 60;
      var cur = map[0];
      map.forEach(function (m) { if (m.el.offsetTop <= top) cur = m; });
      links.forEach(function (l) { l.classList.remove('on'); });
      if (cur) cur.l.classList.add('on');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  });
})();
