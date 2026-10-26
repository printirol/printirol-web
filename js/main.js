(function () {
  'use strict';

  const LINKS = {
    register: 'https://app.printirol.com/register',
    login: 'https://app.printirol.com/login',
  };

  const MENU = [
    { page: 'inicio', label: 'Inicio', href: 'index.html' },
    { page: 'pod', label: 'Print on demand', href: 'print-on-demand.html' },
    { page: 'como-funciona', label: 'Cómo funciona', href: 'como-funciona.html' },
    { page: 'catalogo', label: 'Catálogo', href: 'catalogo.html' },
    { page: 'herramientas', label: 'Editor y herramientas', href: 'herramientas.html' },
    { page: 'integraciones', label: 'Integraciones', href: 'integraciones.html' },
    { page: 'precios', label: 'Precios y envíos', href: 'precios-y-envios.html' },
    { page: 'ayuda', label: 'Ayuda', href: 'ayuda.html' },
    { page: 'contacto', label: 'Contacto', href: 'contacto.html' },
  ];

  document.documentElement.classList.remove('no-js');

  const $ = (sel, root = document) => root.querySelector(sel);

  function renderIcons() {
    document.body.insertAdjacentHTML(
      'afterbegin',
      `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
      <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
      <symbol id="i-chevron" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
      <symbol id="i-left" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></symbol>
      <symbol id="i-right" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></symbol>
      <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
      <symbol id="i-shirt" viewBox="0 0 24 24"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></symbol>
      <symbol id="i-truck" viewBox="0 0 24 24"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></symbol>
      <symbol id="i-box" viewBox="0 0 24 24"><path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/></symbol>
      <symbol id="i-rocket" viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></symbol>
      <symbol id="i-card" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></symbol>
      <symbol id="i-store" viewBox="0 0 24 24"><path d="M3 9l1.5-5h15L21 9"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M5 12v8h14v-8M10 20v-5h4v5"/></symbol>
      <symbol id="i-pen" viewBox="0 0 24 24"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></symbol>
      <symbol id="i-palette" viewBox="0 0 24 24"><circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2a10 10 0 0 0 0 20c.9 0 1.6-.7 1.6-1.6 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.7-1.6 1.6-1.6H16a6 6 0 0 0 6-6c0-4.9-4.5-8.6-10-8.6z"/></symbol>
      <symbol id="i-camera" viewBox="0 0 24 24"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/></symbol>
      <symbol id="i-heart" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/></symbol>
      <symbol id="i-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
      <symbol id="i-music" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></symbol>
      <symbol id="i-briefcase" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></symbol>
      <symbol id="i-image" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/></symbol>
      <symbol id="i-layers" viewBox="0 0 24 24"><path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/></symbol>
      <symbol id="i-tag" viewBox="0 0 24 24"><path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r="1"/></symbol>
      <symbol id="i-pin" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></symbol>
      <symbol id="i-coin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 6v2M12 16v2"/></symbol>
      <symbol id="i-gift" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/></symbol>
      <symbol id="i-mug" viewBox="0 0 24 24"><path d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/></symbol>
      <symbol id="i-chat" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></symbol>
      <symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></symbol>
      <symbol id="i-youtube" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/></symbol>
      <symbol id="i-star" viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></symbol>
      <symbol id="i-tiktok" viewBox="0 0 24 24"><path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .53.04.77.12V9.66a5.7 5.7 0 0 0-.77-.05 5.69 5.69 0 1 0 5.69 5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.25-1.48z"/></symbol>
      <symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>
      </defs></svg>`
    );
  }

  function renderFooter() {
    const slot = $('#site-footer');
    if (!slot) return;
    slot.outerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="brand" aria-label="Printirol, ir al inicio">
              <img class="brand-icon" src="img/icon.png" alt="" width="32" height="32">
              <img class="brand-word" src="media/logos/logo.png" alt="Printirol" height="28">
            </a>
            <p>Plataforma de <span class="hl">print on demand</span> en Argentina. Diseñás productos con tu marca, los vendés donde quieras y nosotros los fabricamos y enviamos.</p>
            <a class="btn btn-primary" href="https://app.printirol.com/register">Empezá gratis</a>
            <p class="footer-follow">Seguinos</p>
            <div class="socials">
              <a href="https://www.instagram.com/printirol/" target="_blank" rel="noopener" aria-label="Instagram de Printirol"><svg><use href="#i-instagram"/></svg></a>
              <a href="https://www.youtube.com/@Printirol" target="_blank" rel="noopener" aria-label="YouTube de Printirol"><svg><use href="#i-youtube"/></svg></a>
              <a href="https://www.tiktok.com/@printirol" target="_blank" rel="noopener" aria-label="TikTok de Printirol"><svg class="ic-fill"><use href="#i-tiktok"/></svg></a>
              <a href="https://www.tiendanube.com/tienda-aplicaciones-nube/printirol-pod" target="_blank" rel="noopener" aria-label="Printirol en Tiendanube"><img src="media/logos/tiendanube.png" alt=""></a>
            </div>
          </div>
          <nav class="footer-col" aria-label="Sitio">
            <h3>Explorá</h3>
            <a href="index.html">Inicio</a>
            <a href="print-on-demand.html">Print on demand</a>
            <a href="catalogo.html">Catálogo</a>
            <a href="ayuda.html">Centro de ayuda</a>
            <a href="contacto.html">Contacto</a>
          </nav>
          <nav class="footer-col" aria-label="Cómo funciona">
            <h3>Cómo funciona</h3>
            <a href="como-funciona.html">Paso a paso</a>
            <a href="herramientas.html">Editor y herramientas</a>
            <a href="integraciones.html">Integraciones</a>
            <a href="precios-y-envios.html">Precios y envíos</a>
            <a href="index.html#calculadora">Calculá tu ganancia</a>
          </nav>
          <nav class="footer-col" aria-label="Plataforma">
            <h3>Plataforma</h3>
            <a href="https://app.printirol.com/register">Crear cuenta</a>
            <a href="https://app.printirol.com/login">Iniciar sesión</a>
            <a href="https://www.tiendanube.com/tienda-aplicaciones-nube/printirol-pod" target="_blank" rel="noopener">App para Tiendanube</a>
            <a href="https://www.instagram.com/printirol/" target="_blank" rel="noopener">Instagram</a>
            <a href="https://www.youtube.com/@Printirol" target="_blank" rel="noopener">YouTube</a>
            <a href="https://www.tiktok.com/@printirol" target="_blank" rel="noopener">TikTok</a>
          </nav>
        </div>
        <div class="container footer-bottom">
          <nav class="footer-legal" aria-label="Legales">
            <a href="terminos.html">Términos y condiciones</a>
            <a href="privacidad.html">Política de privacidad</a>
            <a href="politica-de-envios.html">Política de envíos</a>
            <a href="cancelaciones.html">Cancelaciones y devoluciones</a>
          </nav>
          <p>© <span data-year>2026</span> Printirol · Print on demand en Argentina</p>
        </div>
      </footer>`;
  }

  function renderHeader() {
    const slot = $('#site-header');
    if (!slot) return;
    const page = document.body.dataset.page;

    const items = MENU.map(
      (m) =>
        `<a class="mega-group${m.page === page ? ' is-active' : ''}" href="${m.href}"${m.page === page ? ' aria-current="page"' : ''}>${m.label}</a>`
    ).join('');

    slot.outerHTML = `
      <header class="site-header" id="top">
        <div class="container">
          <div class="header-left">
            <button class="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="mega-menu">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <a href="index.html" class="brand" aria-label="Printirol, ir al inicio">
              <img class="brand-icon" src="img/icon.png" alt="" width="32" height="32">
              <img class="brand-word" src="media/logos/logo.png" alt="Printirol" height="28">
            </a>
          </div>
          <form class="search header-search" role="search" data-search>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
            <input class="input" type="search" name="q" placeholder="Buscar en Printirol" aria-label="Buscar en Printirol" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="search-results" aria-autocomplete="list">
            <div class="search-results" id="search-results" role="listbox" hidden></div>
          </form>
          <div class="header-actions">
            <button class="header-icon header-search-toggle" type="button" aria-label="Buscar" aria-expanded="false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.5-4.5"/></svg>
            </button>
            <a class="header-login" href="${LINKS.login}" aria-label="Ingresar a la plataforma">
              <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.42 0-8 2.69-8 6v2h16v-2c0-3.31-3.58-6-8-6z"/></svg>
              <span>Iniciar sesión</span>
            </a>
            <a class="btn btn-primary btn-register" href="${LINKS.register}">
              <svg viewBox="0 0 26 20" fill="currentColor" aria-hidden="true"><circle cx="16.5" cy="5" r="4.6"/><path d="M7.5 19.2c0-4.3 4-7.4 9-7.4s9 3.1 9 7.4zM4 5h2.6v3H9.6v2.6H6.6v3H4v-3H1V8h3z"/></svg>
              <span>Registrate</span>
            </a>
          </div>
        </div>
      </header>
      <div class="mega-overlay" aria-hidden="true"></div>
      <nav class="mega" id="mega-menu" aria-label="Menú principal">
        <div class="mega-groups">${items}</div>
      </nav>`;
  }

  function initHeader() {
    const toggle = $('.menu-toggle');
    const overlay = $('.mega-overlay');
    if (!toggle) return;

    const setOpen = (open) => {
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };
    toggle.addEventListener('click', () => setOpen(!document.body.classList.contains('menu-open')));
    overlay.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Repite el contenido hasta cubrir la pantalla y lo duplica: la animación
  // recorre -50% del track, así que las dos mitades tienen que ser idénticas.
  function initMarquees() {
    $$('[data-marquee]').forEach((marquee) => {
      const track = $('.marquee-track', marquee);
      if (!track || reduceMotion) return;
      const originals = Array.from(track.children);
      const setWidth = track.scrollWidth || 1;
      const copies = Math.max(1, Math.ceil(window.innerWidth / setWidth));
      for (let i = 1; i < copies * 2; i++) {
        originals.forEach((el) => {
          const clone = el.cloneNode(true);
          clone.setAttribute('aria-hidden', 'true');
          $$('img', clone).forEach((img) => (img.alt = ''));
          track.appendChild(clone);
        });
      }
      const speed = Number(marquee.dataset.speed) || 40;
      track.style.setProperty('--duration', `${(setWidth * copies) / speed}s`);
    });

    // Fuera de pantalla no hace falta animar: libera al navegador mientras se scrollea.
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => e.target.classList.toggle('is-offscreen', !e.isIntersecting));
      });
      $$('[data-marquee]').forEach((m) => io.observe(m));
    }
  }

  // Corre un intervalo solo mientras el elemento está en pantalla y la pestaña visible.
  function visibleInterval(el, fn, ms) {
    let timer = null;
    let onScreen = false;
    let stopped = false;
    const sync = () => {
      const run = onScreen && !stopped && !document.hidden;
      if (run && !timer) timer = setInterval(fn, ms);
      if (!run && timer) {
        clearInterval(timer);
        timer = null;
      }
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      }).observe(el);
    } else {
      onScreen = true;
    }
    document.addEventListener('visibilitychange', sync);
    sync();
    return {
      stop() {
        stopped = true;
        sync();
      },
      restart() {
        clearInterval(timer);
        timer = null;
        sync();
      },
    };
  }

  function initSteps() {
    const root = $('[data-steps]');
    if (!root) return;
    const steps = $$('.step', root);
    let current = 0;
    let auto = null;

    const open = (index) => {
      current = index;
      steps.forEach((step, i) => {
        step.classList.toggle('is-open', i === index);
        $('.step-head', step).setAttribute('aria-expanded', String(i === index));
      });
    };

    steps.forEach((step, i) => {
      $('.step-head', step).addEventListener('click', () => {
        if (auto) auto.stop();
        open(step.classList.contains('is-open') ? -1 : i);
      });
    });

    if (!reduceMotion) {
      auto = visibleInterval(root, () => open((current + 1) % steps.length), 6000);
    }
  }

  function initSlideshows() {
    $$('[data-slideshow]').forEach(initSlideshow);
  }

  function initSlideshow(root) {
    const slides = $$('img', root);
    const dots = $('.slideshow-dots', root);
    let current = 0;

    const buttons = slides.map((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', `Imagen ${i + 1}`);
      b.addEventListener('click', () => {
        show(i);
        restart();
      });
      dots.appendChild(b);
      return b;
    });

    $('[data-slide-prev]', root).addEventListener('click', () => {
      show((current - 1 + slides.length) % slides.length);
      restart();
    });
    $('[data-slide-next]', root).addEventListener('click', () => {
      show((current + 1) % slides.length);
      restart();
    });

    function show(index) {
      current = index;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
      buttons.forEach((b, i) => b.setAttribute('aria-selected', String(i === index)));
    }

    const auto = reduceMotion ? null : visibleInterval(root, () => show((current + 1) % slides.length), 4000);
    function restart() {
      if (auto) auto.restart();
    }

    show(0);
  }

  // Precios de referencia: el catálogo real vive en la plataforma.
  const CALC_PRODUCTS = [
    { name: 'Remera', img: 'media/productos/remera.webp', cost: 18600 },
    { name: 'Buzo', img: 'media/productos/buzo.webp', cost: 24900 },
    { name: 'Taza', img: 'media/productos/taza.webp', cost: 7500 },
    { name: 'Tote bag', img: 'media/productos/tote.webp', cost: 8900 },
    { name: 'Gorra', img: 'media/productos/gorra.webp', cost: 7500 },
    { name: 'Cuadro', img: 'media/productos/cuadro.webp', cost: 14900 },
  ];

  const money = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 });
  const formatMoney = (n) => `${n < 0 ? '-' : ''}$ ${money.format(Math.abs(n))}`;

  // Igual que la calculadora de la plataforma: sugiere el doble del costo y permite hasta 4 veces.
  function saleBounds(cost) {
    return {
      min: Math.ceil(cost / 100) * 100,
      max: Math.ceil((cost * 4) / 100) * 100,
      suggested: Math.round((cost * 2) / 100) * 100,
    };
  }

  function initCalculator() {
    const root = $('[data-calc]');
    if (!root) return;
    const el = {
      img: $('[data-calc-img]', root),
      name: $('[data-calc-name]', root),
      cost: $('[data-calc-cost]', root),
      unit: $('[data-calc-unit]', root),
      total: $('[data-calc-total]', root),
      priceRange: $('[data-calc-price-range]', root),
      price: $('[data-calc-price]', root),
      salesRange: $('[data-calc-sales-range]', root),
      sales: $('[data-calc-sales]', root),
    };
    let index = 0;

    const fill = (range) => {
      const min = Number(range.min);
      const max = Number(range.max);
      const p = max > min ? ((Number(range.value) - min) / (max - min)) * 100 : 0;
      range.style.setProperty('--p', `${p}%`);
    };

    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

    function update() {
      const product = CALC_PRODUCTS[index];
      const price = Number(el.priceRange.value);
      const sales = Number(el.salesRange.value);
      const unit = price - product.cost;
      el.cost.textContent = formatMoney(product.cost);
      el.unit.textContent = formatMoney(unit);
      el.total.textContent = formatMoney(unit * sales);
      fill(el.priceRange);
      fill(el.salesRange);
    }

    function selectProduct(i) {
      index = (i + CALC_PRODUCTS.length) % CALC_PRODUCTS.length;
      const product = CALC_PRODUCTS[index];
      const b = saleBounds(product.cost);
      el.img.src = product.img;
      el.img.alt = product.name;
      el.name.textContent = product.name;
      [el.priceRange, el.price].forEach((input) => {
        input.min = b.min;
        input.max = b.max;
        input.step = 100;
        input.value = b.suggested;
      });
      update();
    }

    el.priceRange.addEventListener('input', () => {
      el.price.value = el.priceRange.value;
      update();
    });
    el.salesRange.addEventListener('input', () => {
      el.sales.value = el.salesRange.value;
      update();
    });
    el.price.addEventListener('change', () => {
      const v = clamp(Number(el.price.value) || 0, Number(el.price.min), Number(el.price.max));
      el.price.value = v;
      el.priceRange.value = v;
      update();
    });
    el.sales.addEventListener('change', () => {
      const v = clamp(Math.round(Number(el.sales.value) || 1), 1, Number(el.sales.max));
      el.sales.value = v;
      el.salesRange.value = v;
      update();
    });
    $('[data-calc-prev]', root).addEventListener('click', () => selectProduct(index - 1));
    $('[data-calc-next]', root).addEventListener('click', () => selectProduct(index + 1));

    selectProduct(0);
  }

  // price, colors y sizes quedan vacíos hasta tener los datos reales de la plataforma; vacíos no se muestran.
  const CATALOG = [
    {
      slug: 'remera-oversize',
      name: 'Remera oversize',
      title: 'Vendé remeras oversize con tu diseño',
      img: 'media/catalogo/Remera-oversize-personalizada.webp',
      desc: 'Calce amplio y hombros caídos, el corte que buscan las marcas de ropa urbana.',
      price: null,
      colors: [],
      sizes: '',
    },
    {
      slug: 'crop-top',
      name: 'Crop top',
      title: 'Vendé crop tops con tu diseño',
      img: 'media/catalogo/crop-top-personalizado-frente.webp',
      desc: 'Remera corta de calce relajado, ideal para sumar a una colección femenina.',
      price: null,
      colors: [],
      sizes: '',
    },
    {
      slug: 'buzo-clasico',
      name: 'Buzo clásico',
      title: 'Vendé buzos estampados con tu diseño',
      img: 'media/catalogo/Buzo-clasico-azul-marino-frente.webp',
      desc: 'Buzo de cuello redondo para tus diseños de otoño e invierno.',
      price: null,
      colors: [],
      sizes: '',
    },
    {
      slug: 'gorra-trucker',
      name: 'Gorra trucker',
      title: 'Vendé gorras trucker con tu diseño',
      img: 'media/catalogo/Gorra-trucker-azul-1.webp',
      desc: 'Frente liso para tu diseño, visera curva y red en la parte de atrás.',
      price: null,
      colors: [],
      sizes: '',
    },
    {
      slug: 'taza',
      name: 'Taza',
      title: 'Vendé tazas personalizadas con tu diseño',
      img: 'media/catalogo/taza-blanca-personalizada.webp',
      desc: 'Taza blanca de 11 oz. En el editor la ves en 3D antes de publicarla.',
      price: null,
      colors: [],
      sizes: '',
    },
    {
      slug: 'tote-bag',
      name: 'Tote bag',
      title: 'Vendé tote bags con tu diseño',
      img: 'media/catalogo/tote-bag.webp',
      desc: 'Bolsa de tela con manijas largas, lista para llevar tu estampa.',
      price: null,
      colors: [],
      sizes: '',
    },
    {
      slug: 'cuadro',
      name: 'Cuadro',
      title: 'Vendé cuadros con tu diseño',
      img: 'media/catalogo/cuadro-personalizado-rectangulosx2.webp',
      desc: 'Tu ilustración o fotografía enmarcada y lista para colgar.',
      price: null,
      colors: [],
      sizes: '',
    },
  ];

  const productUrl = (p) => `producto.html?p=${p.slug}`;
  const priceText = (p) => (p.price ? `$${new Intl.NumberFormat('es-AR').format(p.price)}` : '');

  function catalogCard(p) {
    const meta = p.colors.length || p.sizes
      ? `<div class="catalog-meta">
          <span class="swatches">${p.colors.map((c) => `<span style="background:${c.hex}" title="${c.name}"></span>`).join('')}</span>
          <span>${p.sizes}</span>
        </div>`
      : '';
    return `
      <a class="catalog-card" href="${productUrl(p)}">
        <div class="catalog-img"><img src="${p.img}" alt="${p.name} personalizable" loading="lazy" width="1000" height="1000"></div>
        <div class="catalog-body">
          <h3>${p.name}</h3>
          ${p.price ? `<p class="catalog-price"><span>Desde</span> ${priceText(p)}</p>` : ''}
          <p class="catalog-desc">${p.desc}</p>
          ${meta}
          <span class="btn btn-primary">Ver producto</span>
        </div>
      </a>`;
  }

  const catalogMoreCard = `
    <a class="catalog-card catalog-more" href="contacto.html">
      <span class="catalog-more-icon"><svg><use href="#i-plus"/></svg></span>
      <h3>Se vienen más productos</h3>
      <p class="catalog-desc">¿Querés vender algo que todavía no está? Contanos qué necesitás.</p>
      <span class="btn btn-primary">Escribinos</span>
    </a>`;

  function initCatalog() {
    const grid = $('[data-catalog-grid]');
    if (grid) grid.innerHTML = CATALOG.map(catalogCard).join('') + catalogMoreCard;

    const detail = $('[data-product-detail]');
    if (!detail) return;
    const slug = new URLSearchParams(window.location.search).get('p');
    const p = CATALOG.find((item) => item.slug === slug);
    if (!p) {
      window.location.replace('catalogo.html');
      return;
    }
    document.title = `${p.name} personalizable | Printirol`;
    detail.innerHTML = `
      <div class="split-copy">
        <nav class="breadcrumb" aria-label="Ruta"><a href="catalogo.html">Catálogo</a><span>/</span>${p.name}</nav>
        <h1 class="hero-title">${p.title}</h1>
        <p class="hero-lead">${p.desc} Lo diseñás en el editor, lo publicás en tu tienda y nosotros lo producimos y despachamos cada vez que vendés.</p>
        ${p.price ? `<p class="product-price"><span>Desde</span> ${priceText(p)}</p>` : ''}
        <div class="pod-actions">
          <a class="btn btn-primary" href="${LINKS.register}">Empezá a vender</a>
          <a class="btn btn-primary" href="index.html#como-funciona">Cómo funciona</a>
        </div>
        <ul class="check-list product-checks">
          <li><svg><use href="#i-check"/></svg>Sin inversión inicial</li>
          <li><svg><use href="#i-check"/></svg>Sin stock propio</li>
          <li><svg><use href="#i-check"/></svg>Mockups listos para publicar</li>
          <li><svg><use href="#i-check"/></svg>Envíos con OCA a todo el país</li>
        </ul>
      </div>
      <div class="product-media"><img src="${p.img}" alt="${p.name} personalizable" width="1000" height="1000"></div>`;

    const related = $('[data-catalog-related]');
    if (related) related.innerHTML = CATALOG.filter((item) => item !== p).slice(0, 4).map(catalogCard).join('');
  }

  // kw suma sinónimos que la gente escribe pero que no aparecen en el título.
  const SEARCH_INDEX = [
    { type: 'Inicio', title: 'Cómo funciona', desc: 'De tu idea a tu cliente en 3 pasos: diseñás, publicás y nosotros fabricamos y enviamos.', url: 'index.html#como-funciona', kw: 'pasos empezar editor diseñar publicar' },
    { type: 'Inicio', title: 'Productos para diseñar', desc: 'Remeras, buzos, tazas, totes, gorras y cuadros listos para tu diseño.', url: 'index.html#productos', kw: 'catalogo remera buzo taza tote gorra cuadro' },
    { type: 'Inicio', title: 'Para quién es Printirol', desc: 'Emprendedores, ilustradores, diseñadores, marcas de ropa, comercios, bandas y eventos.', url: 'index.html#para-quien', kw: 'emprendedor artista marca comercio pyme merch banda evento uniforme' },
    { type: 'Inicio', title: 'App para Tiendanube', desc: 'Publicás tus productos en tu tienda y las ventas entran solas como pedidos.', url: 'index.html#tiendanube', kw: 'tiendanube integracion app tienda online sincronizar seguimiento' },
    { type: 'Inicio', title: 'Calculadora de ganancias', desc: 'Elegí un producto, mové el precio y mirá cuánto podés ganar por mes.', url: 'index.html#calculadora', kw: 'ganancia ganar precio costo calcular margen plata' },
    { type: 'Inicio', title: '¿Por qué elegir Printirol?', desc: 'Editor online, mockups por color, Tiendanube, envíos con OCA, ventas por redes y muestra con descuento.', url: 'index.html#por-que-printirol', kw: 'beneficios ventajas mockups editor tipografias 3d redes instagram whatsapp mercado libre' },
    { type: 'Preguntas', title: '¿Qué es el print on demand?', desc: 'Cada producto se fabrica recién cuando alguien lo compra, sin stock.', url: 'index.html#faq-que-es', kw: 'pod a pedido stock' },
    { type: 'Preguntas', title: '¿Cuánto cuesta usar Printirol?', desc: 'Crear la cuenta y usar el editor es gratis. Pagás producción y envío cuando vendés.', url: 'index.html#faq-costo', kw: 'precio gratis costo pagar cuenta' },
    { type: 'Preguntas', title: '¿Necesito tener una Tiendanube?', desc: 'No es obligatorio: también podés cargar pedidos a mano.', url: 'index.html#faq-tiendanube', kw: 'tiendanube instagram whatsapp mercado libre manual' },
    { type: 'Preguntas', title: '¿Cómo funcionan los envíos?', desc: 'OCA a domicilio a todo el país. Si el pedido trae varios productos, se cobra un solo envío.', url: 'index.html#faq-envios', kw: 'envio oca correo despacho entrega domicilio mercado libre etiqueta' },
    { type: 'Preguntas', title: '¿Cómo pago los pedidos?', desc: 'Con Mercado Pago, desde la plataforma.', url: 'index.html#faq-pagos', kw: 'pago pagar mercado pago tarjeta' },
    { type: 'Preguntas', title: '¿Puedo pedir una muestra?', desc: '20% de descuento en la producción de hasta 3 productos, una vez por cuenta.', url: 'index.html#faq-muestra', kw: 'muestra descuento probar calidad' },
    { type: 'Preguntas', title: '¿Cómo sigo el estado de mis pedidos?', desc: 'Borrador, En producción o Enviado, con aviso por mail al despacharse.', url: 'index.html#faq-pedidos', kw: 'pedido estado seguimiento tracking enviado produccion' },
    { type: 'Preguntas', title: '¿Qué archivos puedo subir?', desc: 'JPG, PNG, GIF o WEBP de hasta 20 MB.', url: 'index.html#faq-archivos', kw: 'archivo imagen jpg png gif webp calidad resolucion' },
    { type: 'Print on demand', title: '¿Qué es el print on demand?', desc: 'Vendés productos personalizados que se imprimen recién cuando alguien los compra.', url: 'print-on-demand.html#que-es', kw: 'pod a pedido sin stock' },
    { type: 'Print on demand', title: '¿Stock propio o a pedido?', desc: 'Comparación entre comprar mercadería por adelantado y vender a pedido.', url: 'print-on-demand.html#stock-o-a-pedido', kw: 'stock inversion deposito comparacion' },
    { type: 'Print on demand', title: 'Tu tienda print on demand en 3 pasos', desc: 'Diseñás, publicás y nosotros producimos y despachamos.', url: 'print-on-demand.html#pasos', kw: 'pasos empezar' },
    { type: 'Preguntas', title: '¿Printirol es una alternativa a Printful o Printify?', desc: 'El mismo modelo, producido en Argentina: en pesos y sin impuestos de importación.', url: 'index.html#faq-alternativa', kw: 'printful printify alternativa dolares importacion argentina' },
    { type: 'Preguntas', title: '¿Tengo que manejar stock en mi tienda?', desc: 'No: se publica sin control de stock y nunca aparece agotado.', url: 'index.html#faq-stock', kw: 'stock inventario agotado tiendanube' },
    { type: 'Inicio', title: 'Lo que dicen nuestras tiendas', desc: 'Testimonios de marcas que ya venden con Printirol.', url: 'index.html#testimonios', kw: 'opiniones testimonios reseñas clientes' },
    { type: 'Cómo funciona', title: 'El recorrido de cada pedido', desc: 'Cuenta, producto, diseño, publicación, pago y envío.', url: 'como-funciona.html#recorrido', kw: 'pasos proceso pedido empezar' },
    { type: 'Cómo funciona', title: 'Dos formas de vender', desc: 'Con tu Tiendanube o cargando pedidos de redes y Mercado Libre.', url: 'como-funciona.html#formas-de-vender', kw: 'pedido manual instagram whatsapp mercado libre borrador' },
    { type: 'Cómo funciona', title: 'Estados de los pedidos', desc: 'Borrador, En producción y Enviado, todo en tu panel.', url: 'como-funciona.html#seguimiento', kw: 'estado seguimiento panel filtros' },
    { type: 'Cómo funciona', title: 'Pedí tu muestra', desc: '20% off en la producción de hasta 3 productos.', url: 'como-funciona.html#muestras', kw: 'muestra descuento probar calidad' },
    { type: 'Herramientas', title: 'Editor online', desc: 'Más de 500 tipografías, imágenes de hasta 20 MB y medidas en cm.', url: 'herramientas.html#editor', kw: 'editor diseño tipografias fuentes texto imagen capas cm' },
    { type: 'Herramientas', title: 'Medidor de calidad', desc: 'Resolución real de tu imagen según el tamaño de impresión.', url: 'herramientas.html#calidad', kw: 'calidad ppi dpi resolucion pixelado nitido' },
    { type: 'Herramientas', title: 'Mockups por color', desc: 'Fotos de cada color, descargables en ZIP.', url: 'herramientas.html#mockups', kw: 'mockup fotos zip descargar colores 3d taza' },
    { type: 'Herramientas', title: 'Panel y calculadora', desc: 'Estadísticas, calculadora de rentabilidad y archivos de impresión.', url: 'herramientas.html#panel', kw: 'estadisticas dashboard rentabilidad margen archivos' },
    { type: 'Integraciones', title: 'Tiendanube, Mercado Pago, OCA y Mercado Libre', desc: 'Publicás, cobrás y enviamos sin cargar datos a mano.', url: 'integraciones.html#conexiones', kw: 'integracion tiendanube mercado pago oca mercado libre' },
    { type: 'Integraciones', title: 'Publicar en Tiendanube en 3 pasos', desc: 'Colores y talles, datos y precio.', url: 'integraciones.html#tiendanube', kw: 'publicar tiendanube variantes precio oculto' },
    { type: 'Precios', title: 'Cómo se forma tu ganancia', desc: 'Precio base, tu precio de venta y la diferencia para vos.', url: 'precios-y-envios.html#precios', kw: 'precio costo ganancia comision gratis' },
    { type: 'Precios', title: 'Precios de referencia', desc: 'Remeras desde $18.600, tazas y gorras desde $7.500, cuadros desde $14.900.', url: 'precios-y-envios.html#referencia', kw: 'precio cuanto sale remera taza gorra cuadro' },
    { type: 'Envíos', title: 'Envíos con OCA', desc: 'A domicilio en todo el país, un solo envío por pedido.', url: 'precios-y-envios.html#envios', kw: 'envio oca correo domicilio costo mercado libre' },
    { type: 'Ayuda', title: 'Centro de ayuda', desc: 'Respuestas sobre cuenta, editor, Tiendanube, pedidos, pagos y envíos.', url: 'ayuda.html', kw: 'ayuda soporte dudas problema tutorial' },
    { type: 'Ayuda', title: 'Primeros pasos', desc: 'Crear la cuenta, verificar el mail y por dónde empezar.', url: 'ayuda.html#ayuda-primeros-pasos', kw: 'cuenta registro verificar mail empezar' },
    { type: 'Ayuda', title: 'Ayuda con el editor', desc: 'Archivos, calidad, vistas, mockups y cambios en diseños.', url: 'ayuda.html#ayuda-editor', kw: 'editor archivo svg png calidad mockup editar' },
    { type: 'Ayuda', title: 'Ayuda con Tiendanube', desc: 'Conectar, publicar, ventas, seguimiento y stock.', url: 'ayuda.html#ayuda-tiendanube', kw: 'tiendanube conectar publicar app' },
    { type: 'Ayuda', title: 'Ayuda con pedidos y pagos', desc: 'Pedidos manuales, Mercado Pago, cancelaciones y estados.', url: 'ayuda.html#ayuda-pedidos', kw: 'pedido manual pago cancelar estado' },
    { type: 'Ayuda', title: 'Olvidé mi contraseña', desc: 'Te llega un mail para crear una nueva.', url: 'ayuda.html#ayuda-cuenta', kw: 'contraseña clave password olvide cuenta mail' },
    { type: 'Cómo funciona', title: 'Video tutorial de la plataforma', desc: 'En 5 minutos: configurá tu tienda y hacé tu primer pedido.', url: 'como-funciona.html#video', kw: 'video tutorial youtube ver' },
    { type: 'Legales', title: 'Términos y condiciones', desc: 'Condiciones de uso del sitio y de los servicios de Printirol.', url: 'terminos.html', kw: 'terminos condiciones legal' },
    { type: 'Legales', title: 'Política de privacidad', desc: 'Cómo tratamos y protegemos tus datos personales.', url: 'privacidad.html', kw: 'privacidad datos personales cookies' },
    { type: 'Legales', title: 'Política de envíos', desc: 'Tiempos, costos por categoría, roturas y reclamos de envío.', url: 'politica-de-envios.html', kw: 'envio politica costos roturas reclamo' },
    { type: 'Legales', title: 'Cancelaciones y devoluciones', desc: 'Cuándo se puede cancelar un pedido y cómo pedir una devolución.', url: 'cancelaciones.html', kw: 'cancelar devolucion reclamo cambio' },
    { type: 'Página', title: 'Catálogo', desc: 'Todos los productos que podés personalizar.', url: 'catalogo.html', kw: 'productos catalogo' },
    { type: 'Página', title: 'Contacto', desc: 'Escribinos por el formulario o a hola@printirol.com.', url: 'contacto.html', kw: 'contacto mail email consulta ayuda whatsapp' },
  ];

  const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

  function searchSite(query) {
    const words = normalize(query).split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    const items = [
      ...CATALOG.map((p) => ({ type: 'Producto', title: p.name, desc: p.desc, url: productUrl(p), img: p.img, kw: p.slug.replace(/-/g, ' ') })),
      ...SEARCH_INDEX,
    ];
    return items
      .map((item) => {
        const title = normalize(item.title);
        const haystack = `${title} ${normalize(item.desc)} ${normalize(item.kw || '')}`;
        if (!words.every((w) => haystack.includes(w))) return null;
        const score = words.reduce((n, w) => n + (title.includes(w) ? 3 : 0) + (title.startsWith(w) ? 2 : 0), 0) + (item.type === 'Producto' ? 1 : 0);
        return { item, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 7)
      .map((r) => r.item);
  }

  function initSearchToggle() {
    const header = $('.site-header');
    const toggle = $('.header-search-toggle');
    if (!header || !toggle) return;
    const input = $('.header-search input', header);
    const setOpen = (open) => {
      header.classList.toggle('is-search-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (open) input.focus();
    };
    toggle.addEventListener('click', () => setOpen(!header.classList.contains('is-search-open')));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('is-search-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', (e) => {
      if (header.classList.contains('is-search-open') && !header.contains(e.target)) setOpen(false);
    });
  }

  function initSearch() {
    const form = $('[data-search]');
    if (!form) return;
    const input = $('input', form);
    const panel = $('.search-results', form);
    let results = [];
    let active = -1;

    const close = () => {
      panel.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      active = -1;
    };

    const setActive = (i) => {
      const options = $$('.search-result', panel);
      active = options.length ? (i + options.length) % options.length : -1;
      options.forEach((el, n) => el.classList.toggle('is-active', n === active));
      if (active >= 0) options[active].scrollIntoView({ block: 'nearest' });
    };

    const render = () => {
      const q = input.value.trim();
      if (!q) return close();
      results = searchSite(q);
      panel.innerHTML = results.length
        ? results.map((r) => `
            <a class="search-result" role="option" href="${r.url}">
              ${r.img ? `<img src="${r.img}" alt="" width="40" height="40">` : `<span class="search-result-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></span>`}
              <span class="search-result-text">
                <span class="search-result-type">${r.type}</span>
                <strong>${r.title}</strong>
                <span>${r.desc}</span>
              </span>
            </a>`).join('')
        : `<div class="search-empty">No encontramos nada para “${escapeHtml(q)}”. <a href="contacto.html">Escribinos</a> y te ayudamos.</div>`;
      panel.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      active = -1;
    };

    input.addEventListener('input', render);
    input.addEventListener('focus', () => input.value.trim() && render());
    input.addEventListener('keydown', (e) => {
      if (panel.hidden) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
      if (e.key === 'Escape') { close(); }
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const target = results[active >= 0 ? active : 0];
      if (target) {
        close();
        window.location.href = target.url;
      }
    });
    panel.addEventListener('click', (e) => {
      const link = e.target.closest('.search-result');
      if (!link) return;
      close();
      // Mismo destino que la URL actual: el navegador no dispara hashchange.
      if (link.href === window.location.href) {
        e.preventDefault();
        revealHashTarget();
      }
    });
    document.addEventListener('click', (e) => {
      if (!form.contains(e.target)) close();
    });
  }

  // Al llegar a una sección desde el buscador: abre la pregunta y la resalta un momento.
  function revealHashTarget() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id && document.getElementById(id);
    if (!target) return;
    if (target.tagName === 'DETAILS') target.open = true;
    target.scrollIntoView({ block: target.tagName === 'DETAILS' ? 'center' : 'start' });
    target.classList.remove('is-found');
    void target.offsetWidth;
    target.classList.add('is-found');
  }

  function initHelpFilter() {
    const input = $('[data-help-filter]');
    const root = $('[data-help]');
    if (!input || !root) return;
    const groups = $$('.help-group', root);
    const empty = $('[data-help-empty]', root);

    input.addEventListener('input', () => {
      const words = normalize(input.value).split(/\s+/).filter(Boolean);
      let shown = 0;
      groups.forEach((group) => {
        let groupShown = 0;
        $$('details', group).forEach((d) => {
          const match = words.every((w) => normalize(d.textContent).includes(w));
          d.hidden = !match;
          d.open = words.length > 0 && match && groupShown === 0 && shown === 0;
          if (match) groupShown++;
        });
        group.hidden = groupShown === 0;
        shown += groupShown;
      });
      empty.hidden = shown > 0;
    });
  }

  function initVideos() {
    $$('[data-youtube]').forEach((poster) => {
      poster.addEventListener('click', (e) => {
        if (location.protocol === 'file:') return;
        e.preventDefault();
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${poster.dataset.youtube}?autoplay=1&rel=0`;
        iframe.title = poster.getAttribute('aria-label');
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.allowFullscreen = true;
        poster.replaceWith(iframe);
      });
    });
  }

  // Carga la próxima página antes del clic para que la navegación sea instantánea.
  function initPrefetch() {
    if (location.protocol === 'file:') return;
    if (HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules')) {
      const rules = document.createElement('script');
      rules.type = 'speculationrules';
      rules.textContent = JSON.stringify({
        prerender: [{ where: { href_matches: '/*.html*' }, eagerness: 'moderate' }],
      });
      document.head.appendChild(rules);
      return;
    }
    const done = new Set();
    const prefetch = (e) => {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.origin !== location.origin || a.target === '_blank') return;
      const url = a.href.split('#')[0];
      if (url === location.href.split('#')[0] || done.has(url)) return;
      done.add(url);
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    };
    document.addEventListener('pointerover', prefetch, { passive: true });
    document.addEventListener('touchstart', prefetch, { passive: true });
  }

  function renderWhatsApp() {
    document.body.insertAdjacentHTML('beforeend', `
      <a class="wa-float" href="https://wa.me/5491123919842" target="_blank" rel="noopener" aria-label="Escribinos por WhatsApp">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.69 8.24-8.23 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg>
      </a>`);
  }

  function initContactForm() {
    const form = $('[data-contact-form]');
    if (!form) return;
    const error = $('[data-contact-error]', form);
    const field = (name) => form.elements[name];

    form.addEventListener('input', (e) => e.target.classList.remove('is-invalid'));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const invalid = ['nombre', 'email', 'mensaje'].filter((name) => !field(name).checkValidity() || !field(name).value.trim());
      ['nombre', 'email', 'mensaje'].forEach((name) => field(name).classList.toggle('is-invalid', invalid.includes(name)));
      if (invalid.length) {
        error.textContent = invalid.includes('email') && field('email').value.trim()
          ? 'Revisá que el email esté bien escrito.'
          : 'Completá nombre, email y mensaje.';
        error.hidden = false;
        field(invalid[0]).focus();
        return;
      }
      error.hidden = true;

      const name = [field('nombre').value, field('apellido').value].map((v) => v.trim()).filter(Boolean).join(' ');
      const whatsapp = field('whatsapp').value.trim();
      const body = [
        field('mensaje').value.trim(),
        '',
        `Nombre: ${name}`,
        `Email: ${field('email').value.trim()}`,
        ...(whatsapp ? [`WhatsApp: ${whatsapp}`] : []),
      ].join('\n');

      window.location.href = `mailto:hola@printirol.com?subject=${encodeURIComponent(`Consulta de ${name}`)}&body=${encodeURIComponent(body)}`;
    });
  }

  renderIcons();
  renderHeader();
  renderFooter();
  renderWhatsApp();
  initCatalog();
  initHeader();
  initSearch();
  initSearchToggle();
  initHelpFilter();
  initVideos();
  window.addEventListener('hashchange', revealHashTarget);
  if (window.location.hash) window.addEventListener('load', revealHashTarget, { once: true });
  // Se mide después de cargar Inter: con la fuente de reemplazo el ancho cambia y el loop salta.
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(initMarquees);
  initSteps();
  initSlideshows();
  initCalculator();
  initContactForm();
  initPrefetch();
  $$('[data-year]').forEach((n) => (n.textContent = new Date().getFullYear()));
})();
