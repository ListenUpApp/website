/* ListenUp config builder — progressive enhancement for the Configuration page.
   Reads data from #cfg-data (rendered from data/config.yaml), renders a toggleable
   list, and live-generates Compose / docker run / .env output. No framework, no
   build step; the static reference table is the no-JS fallback. */
(function () {
  var dataEl = document.getElementById('cfg-data');
  var root = document.getElementById('cfg-root');
  if (!dataEl || !root) return; // not the config page
  var CFG;
  try { CFG = JSON.parse(dataEl.textContent); } catch (e) { return; }
  var groups = (CFG && CFG.groups) || [];
  var icons = window.__cfgIcons || {};

  var pre = document.getElementById('cfg-pre');
  var countEl = document.getElementById('cfg-count');
  var fInput = document.getElementById('cfg-filter-input');
  var fcount = document.getElementById('cfg-fcount');

  var state = {};            // name -> string value (presence in map = enabled)
  var fmt = 'compose';
  var meta = CFG.meta || {};                          // project-specific, from the data file
  var IMAGE = meta.image || 'your/image:latest';
  var SVC = meta.service || 'app';                    // compose service + docker --name

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function findVar(name) {
    for (var i = 0; i < groups.length; i++) {
      var vs = groups[i].vars || [];
      for (var j = 0; j < vs.length; j++) if (vs[j].name === name) return vs[j];
    }
    return null;
  }

  /* ---- per-type value control ---- */
  function controlHTML(v) {
    var val = state[v.name] != null ? state[v.name] : '';
    if (v.type === 'bool') {
      var on = val === 'true' || (val === '' && v.default === 'true');
      return '<div class="seg-sm">' +
        '<button type="button" data-val="true"' + (on ? ' class="on"' : '') + '>true</button>' +
        '<button type="button" data-val="false"' + (on ? '' : ' class="on"') + '>false</button></div>';
    }
    if (v.type === 'enum') {
      return '<select>' + (v.options || []).map(function (o) {
        return '<option value="' + esc(o) + '"' + (o === val ? ' selected' : '') + '>' + esc(o) + '</option>';
      }).join('') + '</select>';
    }
    if (v.type === 'secret') {
      return '<button type="button" class="cv-gen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5"/></svg>Generate</button>' +
        '<input type="text" value="' + esc(val) + '" placeholder="32+ byte secret" />';
    }
    return '<input type="text" value="' + esc(val) + '" placeholder="' + esc(v.example || '') + '" />';
  }
  function typeBadge(v) {
    var cls = { bool: 't-bool', enum: 't-enum', secret: 't-secret' }[v.type] || '';
    return '<span class="cv-type ' + cls + '">' + esc(v.type) + '</span>';
  }

  /* ---- render ---- */
  function render() {
    var html = '';
    groups.forEach(function (g) {
      html += '<div class="cfg-group">' +
        '<div class="cfg-group-head"><span class="cgi">' + (icons[g.icon] || '') + '</span>' +
        '<h3>' + esc(g.title) + '</h3><span class="cg-count"></span></div>';
      if (g.note) html += '<p class="cfg-note">' + esc(g.note) + '</p>';
      html += '<div class="cfg-vars">';
      (g.vars || []).forEach(function (v) {
        var on = state[v.name] != null;
        html += '<div class="cfg-var' + (on ? ' set' : '') + '" data-name="' + esc(v.name) +
          '" data-search="' + esc((v.name + ' ' + v.purpose).toLowerCase()) + '">' +
          '<button type="button" class="switch' + (on ? ' on' : '') + '" role="switch" aria-checked="' + on + '" aria-label="Include ' + esc(v.name) + '"></button>' +
          '<div class="cv-main"><div class="cv-head">' +
            '<button type="button" class="cv-name" title="Copy name">' + esc(v.name) + '</button>' +
            typeBadge(v) + (v.generated ? '<span class="cv-badge gen">gen</span>' : '') +
          '</div><p class="cv-purpose">' + esc(v.purpose) + '</p></div>' +
          '<div class="cv-control">' + controlHTML(v) +
            '<span class="cv-def">default: <b>' + esc(v.default) + '</b></span></div>' +
        '</div>';
      });
      html += '</div></div>';
    });
    root.innerHTML = html;
    updateCounts();
    applyFilter();
  }

  /* ---- output ---- */
  function valueFor(v) {
    var s = state[v.name];
    if (s != null && s !== '') return s;
    if (v.type === 'bool') return v.default === 'true' ? 'true' : 'false';
    if (v.type === 'enum') return (v.options && v.options[0]) || '';
    return v.example || '';
  }
  function pairs() {
    var out = [];
    groups.forEach(function (g) {
      (g.vars || []).forEach(function (v) { if (state[v.name] != null) out.push([v.name, valueFor(v)]); });
    });
    return out;
  }
  function q(val) { return /[\s:#'"]/.test(val) || val === ''; }
  function generate() {
    var ps = pairs();
    if (!ps.length) {
      pre.innerHTML = '<span class="t-out-empty"># Toggle a variable to build your config…</span>';
    } else if (fmt === 'env') {
      pre.textContent = ps.map(function (p) { return p[0] + '=' + p[1]; }).join('\n');
    } else if (fmt === 'run') {
      var r = ['docker run -d --name ' + SVC + ' \\'];
      ps.forEach(function (p) { r.push('  -e ' + p[0] + '=' + (/\s/.test(p[1]) ? '"' + p[1] + '"' : p[1]) + ' \\'); });
      r.push('  ' + IMAGE);
      pre.textContent = r.join('\n');
    } else {
      var c = ['services:', '  ' + SVC + ':', '    image: ' + IMAGE, '    restart: unless-stopped', '    environment:'];
      ps.forEach(function (p) { c.push('      ' + p[0] + ': ' + (q(p[1]) ? '"' + p[1] + '"' : p[1])); });
      pre.textContent = c.join('\n');
    }
    if (countEl) countEl.innerHTML = ps.length
      ? '<b>' + ps.length + '</b> variable' + (ps.length === 1 ? '' : 's') + ' set'
      : 'nothing set';
  }
  function updateCounts() {
    root.querySelectorAll('.cfg-group').forEach(function (gel) {
      var total = gel.querySelectorAll('.cfg-var').length;
      var set = gel.querySelectorAll('.cfg-var.set').length;
      var cc = gel.querySelector('.cg-count');
      if (cc) cc.textContent = (set ? set + ' / ' : '') + total;
    });
  }
  function applyFilter() {
    var query = (fInput && fInput.value || '').trim().toLowerCase();
    var shown = 0, total = 0;
    root.querySelectorAll('.cfg-group').forEach(function (gel) {
      var vis = 0;
      gel.querySelectorAll('.cfg-var').forEach(function (el) {
        total++;
        var match = !query || el.getAttribute('data-search').indexOf(query) > -1;
        el.style.display = match ? '' : 'none';
        if (match) { shown++; vis++; }
      });
      gel.style.display = vis ? '' : 'none';
    });
    if (fcount) fcount.textContent = query ? shown + ' / ' + total : '';
  }

  /* ---- state helpers ---- */
  function enable(varEl, name) {
    if (state[name] == null) {
      var ctl = varEl.querySelector('.cv-control input, .cv-control select');
      state[name] = ctl ? ctl.value : '';
    }
    varEl.classList.add('set');
    var sw = varEl.querySelector('.switch');
    if (sw) { sw.classList.add('on'); sw.setAttribute('aria-checked', 'true'); }
    updateCounts();
  }
  function sync(varEl, name) {
    var on = state[name] != null;
    varEl.classList.toggle('set', on);
    var sw = varEl.querySelector('.switch');
    if (sw) { sw.classList.toggle('on', on); sw.setAttribute('aria-checked', on); }
    updateCounts(); generate();
  }
  function genSecret() {
    var bytes = new Uint8Array(32);
    if (window.crypto && crypto.getRandomValues) crypto.getRandomValues(bytes);
    else for (var i = 0; i < 32; i++) bytes[i] = Math.floor(Math.random() * 256);
    var b = '';
    for (var k = 0; k < bytes.length; k++) b += String.fromCharCode(bytes[k]);
    return btoa(b).replace(/[+/=]/g, '').slice(0, 43);
  }

  /* ---- events ---- */
  root.addEventListener('click', function (e) {
    var varEl = e.target.closest('.cfg-var');
    if (!varEl) return;
    var name = varEl.getAttribute('data-name');
    if (e.target.closest('.switch')) {
      if (state[name] != null) delete state[name]; else state[name] = '';
      sync(varEl, name); return;
    }
    if (e.target.closest('.cv-name')) {
      var btn = e.target.closest('.cv-name');
      if (navigator.clipboard) navigator.clipboard.writeText(name).then(function () {
        btn.classList.add('copied'); setTimeout(function () { btn.classList.remove('copied'); }, 1100);
      });
      return;
    }
    var seg = e.target.closest('.seg-sm button');
    if (seg) {
      state[name] = seg.getAttribute('data-val');
      varEl.querySelectorAll('.seg-sm button').forEach(function (b) { b.classList.toggle('on', b === seg); });
      enable(varEl, name); generate(); return;
    }
    if (e.target.closest('.cv-gen')) {
      var input = varEl.querySelector('.cv-control input');
      state[name] = genSecret();
      if (input) input.value = state[name];
      enable(varEl, name); generate(); return;
    }
  });
  root.addEventListener('input', function (e) {
    var varEl = e.target.closest('.cfg-var');
    if (!varEl) return;
    if (e.target.matches('.cv-control input, .cv-control select')) {
      state[varEl.getAttribute('data-name')] = e.target.value;
      enable(varEl, varEl.getAttribute('data-name'));
      generate();
    }
  });

  if (fInput) fInput.addEventListener('input', applyFilter);

  var tabs = Array.prototype.slice.call(document.querySelectorAll('.fmt-tabs button'));
  tabs.forEach(function (b) {
    b.addEventListener('click', function () {
      fmt = b.getAttribute('data-fmt');
      tabs.forEach(function (x) { x.classList.toggle('on', x === b); });
      generate();
    });
  });

  var resetBtn = document.querySelector('.cfg-out .reset');
  if (resetBtn) resetBtn.addEventListener('click', function () { state = {}; render(); generate(); });

  render();
  generate();
})();
