(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const get = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const root = document.documentElement;
  const apply = () => { root.dataset.theme = get('theme') || 'light'; root.dir = get('dir') || 'ltr'; };
  apply();
  const I = d => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
  const ICON = {
    moon: I('<path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5a8.5 8.5 0 1 0 10.8 10.8z"/>'),
    sun: I('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    swap: I('<path d="M4 8h13M14 5l3 3-3 3"/><path d="M20 16H7M10 13l-3 3 3 3"/>'),
    menu: I('<path d="M4 7h16M4 12h16M4 17h16"/>'), close: I('<path d="M6 6l12 12M18 6L6 18"/>'),
    pin: I('<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
    phone: I('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
    mail: I('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'), clock: I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    ln: I('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v6M8 7.5v.01M12 17v-6M12 13a3 3 0 0 1 6 0v4"/>'),
    ig: I('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/>'),
    yt: I('<rect x="2.5" y="6" width="19" height="12" rx="3.5"/><path d="M10 9.5l5 2.5-5 2.5z"/>'),
    wa: I('<path d="M3.5 20.5l1.2-4.2A8.5 8.5 0 1 1 8 19.3z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2z"/>'),
    eye: I('<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>')
  };
  const logo = href => `<a class="logo" href="${href}" aria-label="StartRight Registration &amp; Compliance home"><img class="lg lg-l" src="assets/img/logo-light.png" alt="StartRight - Registration &amp; Compliance"><img class="lg lg-d" src="assets/img/logo-dark.png" alt="" aria-hidden="true"><img class="lg-i" src="assets/img/logo-icon.png" alt="" aria-hidden="true"></a>`;
  const labelToggles = () => {
    const t = $('#theme'), d = $('#dir'), dk = root.dataset.theme === 'dark';
    if (t) { t.innerHTML = dk ? ICON.sun : ICON.moon; t.setAttribute('aria-label', dk ? 'Switch to light mode' : 'Switch to dark mode'); }
    if (d) { d.innerHTML = ICON.swap; d.setAttribute('aria-label', root.dir === 'rtl' ? 'Switch to left-to-right' : 'Switch to right-to-left'); }
  };
  const bindToggles = () => {
    const t = $('#theme'), d = $('#dir');
    if (t) t.onclick = () => { set('theme', root.dataset.theme === 'dark' ? 'light' : 'dark'); apply(); labelToggles(); document.dispatchEvent(new Event('sr:change')); };
    if (d) d.onclick = () => { set('dir', root.dir === 'rtl' ? 'ltr' : 'rtl'); apply(); labelToggles(); document.dispatchEvent(new Event('sr:change')); };
    labelToggles();
  };
  const valid = { email: v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v), phone: v => /^[0-9+\s-]{8,15}$/.test(v) };
  window.SR = { $, $$, get, set, I, ICON, logo, bindToggles, valid };
  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page, layout = document.body.dataset.layout || 'site';
    const tg = '<button class="icon-btn" id="theme" title="Light / dark"></button><button class="icon-btn" id="dir" title="Text direction"></button>';
    if (layout === 'site') {
      const L = (h, k, t) => `<li><a href="${h}" class="${page === k ? 'on' : ''}" ${page === k ? 'aria-current="page"' : ''}>${t}</a></li>`;
      const homeOn = page === 'home1' || page === 'home2';
      $('#site-nav').innerHTML = `<nav class="nav" aria-label="Main"><div class="wrap">${logo('index.html')}
        <button class="icon-btn burger" id="burger" aria-label="Toggle menu" aria-expanded="false">${ICON.menu.replace('<svg', '<svg class="m"')}${ICON.close.replace('<svg', '<svg class="x"')}</button>
        <div class="panel" id="panel"><ul class="links"><li class="dd" id="dd"><button class="dd-btn ${homeOn ? 'on' : ''}" aria-expanded="false">Home <span aria-hidden="true">▾</span></button>
        <ul class="dd-menu"><li><a href="index.html" class="${page === 'home1' ? 'on' : ''}">Home 1<small>Startup-friendly services</small></a></li><li><a href="home-2.html" class="${page === 'home2' ? 'on' : ''}">Home 2<small>Business type finder</small></a></li></ul></li>
        ${L('about.html', 'about', 'About')}${L('services.html', 'services', 'Services')}${L('pricing.html', 'pricing', 'Pricing')}${L('contact.html', 'contact', 'Contact')}${L('dashboard.html', 'dashboard', 'Dashboard')}</ul>
        <div class="actions">${tg}<a class="btn" href="login.html">Login</a><a class="btn btn-p" href="contact.html#consult">Get Started</a></div></div></div></nav>`;
      const soc = (l, i) => `<a href="#" aria-label="${l}">${ICON[i]}</a>`;
      $('#site-footer').innerHTML = `<footer class="foot"><div class="wrap"><div class="cols">
        <div>${logo('index.html')}<p style="margin-top:14px">Company registration, tax and annual compliance for startups and growing businesses across India.</p><div class="soc">${soc('LinkedIn', 'ln')}${soc('Instagram', 'ig')}${soc('YouTube', 'yt')}${soc('WhatsApp', 'wa')}</div></div>
        <div><h4>Explore</h4><ul><li><a href="index.html">Home 1</a></li><li><a href="home-2.html">Home 2</a></li><li><a href="about.html">About</a></li><li><a href="services.html">Services</a></li><li><a href="pricing.html">Pricing</a></li><li><a href="contact.html">Contact</a></li><li><a href="login.html">Client login</a></li></ul></div>
        <div><h4>Contact</h4><ul class="ct"><li>${ICON.pin}<span>Level 3, Prestige Corporate Hub, 128 Anna Salai, Teynampet, Chennai 600018</span></li><li>${ICON.phone}<a href="tel:+914455504100">+91 44 5550 4100</a></li><li>${ICON.mail}<a href="mailto:hello@startright.example">hello@startright.example</a></li><li>${ICON.clock}<span>Mon–Sat 9:30 AM – 6:30 PM</span></li></ul></div>
        <div><h4>Compliance updates</h4><p>Monthly deadlines and law changes in plain English, straight to your inbox.</p><form class="news" id="news" novalidate><input id="news-e" type="email" placeholder="Work email" aria-label="Work email"><button class="btn btn-p" type="submit">Subscribe</button></form><div class="news-m" id="news-m" role="status"></div></div>
        </div><div class="copy">© 2026 StartRight Corporate Services. All rights reserved. · Privacy · Terms · Refund policy</div></div></footer><button class="top" id="top" aria-label="Back to top">↑</button>`;
      const panel = $('#panel'), burger = $('#burger'), dd = $('#dd');
      const closeDD = () => { dd.classList.remove('open'); $('.dd-btn', dd).setAttribute('aria-expanded', 'false'); };
      const closeMenu = () => { panel.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); closeDD(); };
      burger.onclick = () => { const o = panel.classList.toggle('open'); burger.setAttribute('aria-expanded', o); if (!o) closeDD(); };
      $('.dd-btn', dd).onclick = e => { e.stopPropagation(); const o = dd.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o); };
      panel.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
      document.addEventListener('click', e => { if (!dd.contains(e.target)) closeDD(); if (!e.target.closest('.nav')) closeMenu(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
      const top = $('#top'); addEventListener('scroll', () => top.classList.toggle('show', scrollY > 400), { passive: true }); top.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
      $('#news').addEventListener('submit', e => { e.preventDefault(); $('#news-m').textContent = valid.email($('#news-e').value.trim()) ? 'Thank you for subscribing. Your first compliance update arrives this month.' : 'Please enter a valid email address.'; });
      bindToggles();
    } else if (layout === 'auth') {
      $('#auth-nav').innerHTML = `<div class="auth-nav"><div class="wrap">${logo('index.html')}<div class="actions">${tg}</div></div></div>`;
      bindToggles();
    }
    $$('details').forEach(d => d.addEventListener('toggle', () => { if (d.open) $$('details').forEach(o => { if (o !== d && o.parentElement === d.parentElement) o.open = false; }); }));
    $$('.tabs').forEach(t => t.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('button', t).forEach(x => x.classList.toggle('on', x === b)); $$('.tp', t.parentElement).forEach(p => p.classList.toggle('on', p.id === b.dataset.t)); }));
    const sn = $('.sidenav');
    if (sn) { const links = $$('a', sn), blks = links.map(a => $(a.getAttribute('href')));
      const spy = () => { let cur = 0; blks.forEach((b, i) => { if (b && b.getBoundingClientRect().top < 160) cur = i; }); links.forEach((a, i) => a.classList.toggle('on', i === cur)); };
      addEventListener('scroll', spy, { passive: true }); spy(); }
    const bl = $('#bill');
    if (bl) bl.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('button', bl).forEach(x => x.classList.toggle('on', x === b)); const a = b.dataset.m === 'a'; $$('[data-pm]').forEach(p => { p.textContent = '₹' + (a ? p.dataset.pa : p.dataset.pm); }); $$('[data-note]').forEach(n => n.textContent = a ? 'billed yearly · save 17%' : 'billed monthly'); });
    const mt = $('#matcher');
    if (mt) mt.addEventListener('submit', e => { e.preventDefault(); const f = $('#m-fund').value, t = $('#m-team').value, k = $('#m-type').value; let r;
      if (k === 'ngo') r = 'Section 8 Company: best for non-profits and social enterprises. Registration in 12–15 days from ₹14,999.';
      else if (f === 'yes') r = 'Private Limited Company: the investor-preferred structure with limited liability and easy equity issue. Registration in 7 days from ₹6,999.';
      else if (t === '1') r = 'One Person Company (OPC): limited liability with a single founder. Registration in 7 days from ₹5,999.';
      else r = 'Limited Liability Partnership (LLP): flexible, lower compliance, ideal for 2 or more partners. Registration in 6 days from ₹5,499.';
      $('#m-out').textContent = 'Recommended: ' + r; });
    const lf = $('#lead');
    if (lf) lf.addEventListener('submit', e => { e.preventDefault(); const ok = valid.email($('#lead-e').value.trim()); $('#lead-m').textContent = ok ? 'Done! Your free startup compliance checklist is on its way to your inbox.' : 'Please enter a valid work email.'; });
    const cf = $('#consult');
    if (cf) cf.addEventListener('submit', e => {
      e.preventDefault(); let ok = true;
      const chk = (id, test, m) => { const el = $('#' + id), er = $('#' + id + '-e'), bad = !test(el.value.trim()); el.classList.toggle('bad', bad); er.textContent = bad ? m : ''; if (bad) ok = false; };
      chk('k-name', v => v.length > 1, 'Please enter your name.'); chk('k-email', valid.email, 'Enter a valid email address.'); chk('k-phone', valid.phone, 'Enter a valid phone number.'); chk('k-svc', v => v !== '', 'Choose a service.');
      const m = $('#k-msg'); m.classList.add('show'); m.textContent = ok ? 'Thank you, ' + $('#k-name').value.trim().split(' ')[0] + '. Your free consultation is booked. A compliance expert will call you within one working day.' : 'Please fix the highlighted fields.';
    });
  });
})();
