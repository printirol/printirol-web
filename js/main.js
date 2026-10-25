(function () {
  'use strict';

  const D = window.PRINTIROL;
  document.documentElement.classList.remove('no-js');

  const ICON = {
    arrow:
      '<svg class="arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    check:
      '<svg class="check" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3.5 10.2 8 14.7 16.5 5.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  const money = (n) => '$ ' + Math.round(n).toLocaleString('es-AR');
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  /* ---------- Header y footer compartidos ---------- */

  const NAV = [
    { href: 'index.html', label: 'Inicio' },
    { href: 'print-on-demand.html', label: 'Print on demand' },
    { href: 'catalogo.html', label: 'Catálogo' },
    { href: 'contacto.html', label: 'Contacto' },
  ];

  const MENU = [
    {
      id: 'productos',
      label: 'Productos',
      pages: ['catalogo'],
      links: [
        { label: 'Catálogo de productos', href: 'catalogo.html' },
        ...D.categories
          .filter((c) => c.id !== 'todos')
          .map((c) => ({ label: c.label, href: `catalogo.html?cat=${c.id}` })),
        { label: 'Muestras con 20% off', href: 'print-on-demand.html#muestras' },
      ],
    },
    {
      id: 'vender',
      label: 'Vendé con Printirol',
      pages: ['pod'],
      links: [
        { label: 'Cómo funciona el print on demand', href: 'print-on-demand.html' },
        { label: 'Así se procesa un pedido', href: 'print-on-demand.html#proceso' },
        { label: 'Cómo ganás plata', href: 'print-on-demand.html#ganancias' },
        { label: 'Tiendanube, Mercado Pago y OCA', href: 'print-on-demand.html#integraciones' },
        { label: 'App de Printirol en Tiendanube', href: D.tiendanubeAppUrl, external: true },
      ],
    },
    {
      id: 'precios',
      label: 'Precios y ganancias',
      links: [
        { label: 'Calculadora de ganancias', href: 'index.html#calculadora' },
        { label: 'Calculá por producto', href: 'catalogo.html#calculadora' },
        { label: 'Muestras con descuento', href: 'print-on-demand.html#muestras' },
      ],
    },
    {
      id: 'recursos',
      label: 'Recursos',
      links: [
        { label: 'Preguntas frecuentes', href: 'index.html#preguntas' },
        { label: 'Preguntas sobre print on demand', href: 'print-on-demand.html#preguntas' },
        { label: 'Política de privacidad', href: 'https://printirol.com/politica-de-privacidad/' },
      ],
    },
    {
      id: 'contacto',
      label: 'Contacto',
      pages: ['contacto'],
      links: [
        { label: 'Escribinos', href: 'contacto.html' },
        { label: D.contactEmail, href: `mailto:${D.contactEmail}` },
      ],
    },
    {
      id: 'plataforma',
      label: 'Plataforma',
      links: [
        { label: 'Crear cuenta gratis', href: D.registerUrl },
        { label: 'Iniciar sesión', href: D.loginUrl },
        { label: 'Ir a app.printirol.com', href: D.appUrl },
      ],
    },
  ];

  const CHEVRON = (d) =>
    `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${d}"/></svg>`;

  const BRAND = `
    <img class="brand-icon" src="img/icon.png" alt="" width="32" height="32">
    <img class="brand-word" src="img/logo.png" alt="Printirol" height="28">`;

  function megaMenu(page) {
    const current = location.pathname.split('/').pop() || 'index.html';
    const active = (MENU.find((g) => g.pages && g.pages.includes(page)) || MENU[0]).id;
    const groups = MENU.map(
      (g) => `
        <button type="button" class="mega-group${g.id === active ? ' is-active' : ''}" data-group="${g.id}">
          <span>${g.label}</span>${CHEVRON('M9 5l7 7-7 7')}
        </button>`
    ).join('');
    const panels = MENU.map(
      (g) => `
        <div class="mega-panel${g.id === active ? ' is-active' : ''}" data-panel="${g.id}">
          <button type="button" class="mega-back">${CHEVRON('M15 19l-7-7 7-7')}<span>${g.label}</span></button>
          ${g.links
            .map(
              (l) =>
                `<a href="${l.href}"${l.external ? ' target="_blank" rel="noopener"' : ''}${l.href === current ? ' aria-current="page"' : ''}>${escapeHtml(l.label)}</a>`
            )
            .join('')}
        </div>`
    ).join('');
    return `
      <div class="mega-overlay" aria-hidden="true"></div>
      <nav class="mega" id="mega-menu" aria-label="Menú principal">
        <div class="mega-groups">${groups}</div>
        <div class="mega-links">${panels}</div>
      </nav>`;
  }

  function renderHeader() {
    const slot = $('#site-header');
    if (!slot) return;

    slot.outerHTML = `
      <header class="site-header" id="top">
        <div class="container">
          <div class="header-left">
            <button class="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="mega-menu">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <a href="index.html" class="brand" aria-label="Printirol, ir al inicio">${BRAND}</a>
          </div>
          <form class="search header-search" action="catalogo.html" method="get" role="search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
            <input class="input" type="search" name="q" placeholder="Buscar en Printirol" aria-label="Buscar productos" autocomplete="off">
          </form>
          <div class="header-actions">
            <a class="header-login" href="${D.loginUrl}" aria-label="Ingresar a la plataforma">
              <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.42 0-8 2.69-8 6v2h16v-2c0-3.31-3.58-6-8-6z"/></svg>
              <span>Iniciar sesión</span>
            </a>
            <a class="btn btn-primary btn-sm btn-register" href="${D.registerUrl}">
              <svg viewBox="0 0 26 20" fill="currentColor" aria-hidden="true"><circle cx="16.5" cy="5" r="4.6"/><path d="M7.5 19.2c0-4.3 4-7.4 9-7.4s9 3.1 9 7.4zM4 5h2.6v3H9.6v2.6H6.6v3H4v-3H1V8h3z"/></svg>
              <span>Registrate</span>
            </a>
          </div>
        </div>
      </header>
      ${megaMenu(document.body.dataset.page)}`;
  }

  function renderFooter() {
    const slot = $('#site-footer');
    if (!slot) return;
    slot.outerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="index.html" class="brand" aria-label="Printirol">
                <img class="brand-icon" src="img/icon.png" alt="" width="32" height="32">
                <img class="brand-word" src="img/logo.png" alt="Printirol" height="26">
              </a>
              <p>Print on demand hecho en Argentina. Vos diseñás y vendés; nosotros producimos, empaquetamos y enviamos cada pedido.</p>
              <div class="footer-pays">
                <a class="logo-tn" href="${D.tiendanubeAppUrl}" target="_blank" rel="noopener" aria-label="Printirol en Tiendanube"><img class="tn" src="img/tiendanube.png" alt=""><span>tiendanube</span></a>
                <img src="img/mercado-pago.png" alt="Mercado Pago">
                <img class="oca" src="img/oca.png" alt="OCA">
              </div>
            </div>
            <div>
              <h4>Sitio</h4>
              <ul>${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}</ul>
            </div>
            <div>
              <h4>Plataforma</h4>
              <ul>
                <li><a href="${D.registerUrl}">Crear cuenta gratis</a></li>
                <li><a href="${D.loginUrl}">Ingresar</a></li>
                <li><a href="index.html#calculadora">Calculadora de ganancias</a></li>
                <li><a href="${D.tiendanubeAppUrl}" target="_blank" rel="noopener">App en Tiendanube</a></li>
              </ul>
            </div>
            <div>
              <h4>Contacto</h4>
              <ul>
                <li><a href="mailto:${D.contactEmail}">${D.contactEmail}</a></li>
                <li><a href="contacto.html">Escribinos</a></li>
                <li><a href="https://printirol.com/politica-de-privacidad/">Política de privacidad</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} Printirol. Hecho en Argentina.</span>
            <span>Producción bajo demanda · Envíos a todo el país</span>
          </div>
        </div>
      </footer>`;
  }

  function initHeader() {
    const toggle = $('.menu-toggle');
    const menu = $('#mega-menu');
    const overlay = $('.mega-overlay');
    if (!toggle || !menu) return;

    const setOpen = (open) => {
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      if (!open) menu.classList.remove('is-drilled');
    };
    toggle.addEventListener('click', () => setOpen(!document.body.classList.contains('menu-open')));
    overlay.addEventListener('click', () => setOpen(false));

    const showGroup = (id) => {
      $$('.mega-group', menu).forEach((b) => b.classList.toggle('is-active', b.dataset.group === id));
      $$('.mega-panel', menu).forEach((p) => p.classList.toggle('is-active', p.dataset.panel === id));
    };
    const canHover = matchMedia('(hover: hover) and (min-width: 640px)');
    $$('.mega-group', menu).forEach((b) => {
      b.addEventListener('click', () => {
        showGroup(b.dataset.group);
        menu.classList.add('is-drilled');
      });
      b.addEventListener('mouseenter', () => canHover.matches && showGroup(b.dataset.group));
    });
    $$('.mega-back', menu).forEach((b) => b.addEventListener('click', () => menu.classList.remove('is-drilled')));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* Links marcados con data-app="register|login|app|tiendanube" */
  function wireAppLinks() {
    const map = { register: D.registerUrl, login: D.loginUrl, app: D.appUrl, tiendanube: D.tiendanubeAppUrl };
    $$('[data-app]').forEach((a) => {
      const url = map[a.dataset.app];
      if (!url) return;
      a.href = url;
      if (a.dataset.app === 'tiendanube') {
        a.target = '_blank';
        a.rel = 'noopener';
      }
    });
    $$('[data-email]').forEach((el) => {
      el.textContent = D.contactEmail;
      if (el.tagName === 'A') el.href = 'mailto:' + D.contactEmail;
    });
  }

  /* ---------- Animaciones al hacer scroll ---------- */

  function initReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    items.forEach((el) => io.observe(el));
  }

  /* ---------- Productos ---------- */

  function sizeRange(sizes) {
    if (!sizes || sizes.length === 0) return '';
    if (sizes.length === 1) return sizes[0];
    return `${sizes[0]} - ${sizes[sizes.length - 1]}`;
  }

  function productCard(p, i) {
    const swatches = p.colors.length
      ? `<ul class="swatches" aria-label="Colores disponibles">${p.colors
          .map((c) => `<li title="${escapeHtml(c.name)}" style="background:${c.hex}"></li>`)
          .join('')}</ul>`
      : '';
    const sizes = p.sizes.length ? `<p class="sizes">${escapeHtml(sizeRange(p.sizes))}</p>` : '';
    const tag = p.tag ? `<span class="badge">${escapeHtml(p.tag)}</span>` : '';
    return `
      <button type="button" class="product-card reveal" style="--delay:${(i % 4) * 0.06}s" data-product="${p.id}" aria-label="Ver ${escapeHtml(p.name)}">
        <div class="thumb">
          <img src="${p.image}" alt="${escapeHtml(p.name)} personalizada" loading="lazy" width="600" height="600">
          ${tag}
        </div>
        <div class="info">
          <h3>${escapeHtml(p.name)}</h3>
          <p class="desc">${escapeHtml(p.description)}</p>
          ${swatches}
          ${sizes}
          <p class="price">desde ${money(p.basePrice)}</p>
        </div>
      </button>`;
  }

  function renderFeatured() {
    const grid = $('[data-featured-products]');
    if (!grid) return;
    grid.innerHTML = D.products.filter((p) => p.featured).slice(0, 4).map(productCard).join('');
  }

  function initCatalog() {
    const grid = $('[data-catalog]');
    if (!grid) return;
    const chips = $('[data-catalog-chips]');
    const search = $('[data-catalog-search]');
    const count = $('[data-catalog-count]');
    const catParam = new URLSearchParams(location.search).get('cat');
    let category = D.categories.some((c) => c.id === catParam) ? catParam : 'todos';

    chips.innerHTML = D.categories
      .map(
        (c) =>
          `<button type="button" class="chip${c.id === category ? ' is-active' : ''}" data-cat="${c.id}" aria-pressed="${c.id === category}">${c.label}</button>`
      )
      .join('');

    const normalize = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const render = () => {
      const q = normalize(search.value.trim());
      const list = D.products.filter(
        (p) =>
          (category === 'todos' || p.category === category) &&
          (!q || normalize(p.name + ' ' + p.description).includes(q))
      );
      grid.innerHTML = list.length
        ? list.map(productCard).join('')
        : `<p class="empty-state" style="grid-column:1/-1">No encontramos productos para esa búsqueda.</p>`;
      if (count) count.textContent = `${list.length} ${list.length === 1 ? 'producto' : 'productos'}`;
      initReveal();
    };

    chips.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-cat]');
      if (!btn) return;
      category = btn.dataset.cat;
      $$('[data-cat]', chips).forEach((b) => {
        const on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      render();
    });
    search.addEventListener('input', render);

    const headerInput = $('.header-search input');
    const initialQ = new URLSearchParams(location.search).get('q');
    if (initialQ) {
      search.value = initialQ;
      if (headerInput) headerInput.value = initialQ;
    }
    if (headerInput) {
      headerInput.closest('form').addEventListener('submit', (e) => {
        e.preventDefault();
        search.value = headerInput.value;
        render();
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      headerInput.addEventListener('input', () => {
        search.value = headerInput.value;
        render();
      });
    }
    render();
  }

  /* Modal de detalle (catálogo e inicio) */
  function initProductModal() {
    const modal = $('#product-modal');
    if (!modal) return;

    document.addEventListener('click', (e) => {
      const card = e.target.closest('[data-product]');
      if (!card) return;
      const p = D.products.find((x) => x.id === card.dataset.product);
      if (p) open(p);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.closest('.modal-close')) modal.close();
    });

    function open(p) {
      const colors = p.colors.length
        ? `<ul class="swatches">${p.colors
            .map((c) => `<li title="${escapeHtml(c.name)}" style="background:${c.hex}"></li>`)
            .join('')}</ul>`
        : '—';
      const cat = D.categories.find((c) => c.id === p.category);
      modal.innerHTML = `
        <div class="modal-body">
          <div class="modal-media"><img src="${p.image}" alt="${escapeHtml(p.name)}"></div>
          <div class="modal-info">
            <button type="button" class="modal-close" aria-label="Cerrar">${ICON.close}</button>
            <span class="badge badge-gray">${cat ? cat.label : ''}</span>
            <h2>${escapeHtml(p.name)}</h2>
            <p class="muted">${escapeHtml(p.description)}</p>
            <dl class="spec-list">
              <div><dt>Técnica</dt><dd>${escapeHtml(p.technique)}</dd></div>
              <div><dt>Área de impresión</dt><dd>${escapeHtml(p.printArea)}</dd></div>
              <div><dt>Colores</dt><dd>${colors}</dd></div>
              <div><dt>Talles / medidas</dt><dd>${p.sizes.length ? escapeHtml(p.sizes.join(' · ')) : 'Único'}</dd></div>
              <div><dt>Envío a todo el país</dt><dd>${money(p.shippingPrice)}</dd></div>
            </dl>
            <div class="modal-price">
              <span class="muted">Costo de producción</span>
              <span class="big">${money(p.basePrice)}</span>
            </div>
            <a class="btn btn-primary btn-lg btn-block" href="${D.registerUrl}">Diseñar este producto ${ICON.arrow}</a>
            <a class="btn btn-sober btn-lg btn-block mt-8" href="index.html#calculadora" data-calc-product="${p.id}">Calcular mi ganancia</a>
          </div>
        </div>`;
      $('[data-calc-product]', modal).addEventListener('click', (e) => {
        const calc = $('[data-calculator]');
        if (calc && calc._select) {
          e.preventDefault();
          modal.close();
          calc._select(p.id);
          calc.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          sessionStorage.setItem('printirol-calc-product', p.id);
        }
      });
      modal.showModal();
    }
  }

  /* ---------- Calculadora (misma lógica que la plataforma) ---------- */

  function saleBounds(unitCost) {
    const step = 100;
    const cost = Math.max(0, unitCost);
    const max = Math.max(step, Math.ceil((cost > 0 ? cost * 4 : 50000) / step) * step);
    const suggested = cost > 0 ? Math.min(max, Math.round((cost * 2) / step) * step) : Math.round((max * 0.5) / step) * step;
    return { max, suggested };
  }

  function initCalculators() {
    $$('[data-calculator]').forEach((root) => {
      const stored = sessionStorage.getItem('printirol-calc-product');
      let product = D.products.find((p) => p.id === stored) || D.products[0];
      if (stored) sessionStorage.removeItem('printirol-calc-product');
      const sales = {};
      let monthly = 30;

      root.innerHTML = `
        <div class="calc-head">
          <h3>Calculadora de rentabilidad</h3>
          <span class="badge badge-green">En vivo</span>
        </div>
        <div class="calc-products" role="radiogroup" aria-label="Producto">
          ${D.products
            .map(
              (p) => `<button type="button" role="radio" data-id="${p.id}"><img src="${p.image}" alt="" loading="lazy">${escapeHtml(p.name.split(' ')[0])}</button>`
            )
            .join('')}
        </div>
        <div class="calc-row">
          <label for="calc-sale">Lo vendés a</label>
          <div class="calc-control calc-money"><span>$</span><input id="calc-sale" type="text" inputmode="numeric" autocomplete="off" aria-label="Precio de venta"></div>
        </div>
        <input class="sale-slider" type="range" min="0" step="100" aria-label="Precio de venta">
        <div class="calc-row">
          <label for="calc-qty">Ventas por mes</label>
          <div class="calc-control calc-money"><input id="calc-qty" type="text" inputmode="numeric" autocomplete="off" aria-label="Ventas por mes" style="text-align:right"><span>u.</span></div>
        </div>
        <dl class="calc-results">
          <div><dt>Costo Printirol</dt><dd data-r="cost"></dd></div>
          <p class="sub" data-r="costSub"></p>
          <div class="total"><dt>Ganancia neta por unidad</dt><dd data-r="profit"></dd></div>
          <div><dt>Margen</dt><dd data-r="margin"></dd></div>
        </dl>
        <div class="calc-highlight">
          <p>Ganancia estimada por mes</p>
          <strong data-r="monthly"></strong>
        </div>
        <a class="btn btn-primary btn-lg btn-block" href="${D.registerUrl}">Empezá a vender ${ICON.arrow}</a>
        <p class="calc-note">Precios de referencia. Pagás el costo solo cuando recibís una venta.</p>`;

      const saleInput = $('#calc-sale', root);
      const qtyInput = $('#calc-qty', root);
      const slider = $('.sale-slider', root);
      const out = (k) => $(`[data-r="${k}"]`, root);
      const digits = (v) => String(v).replace(/\D/g, '');

      const cost = () => product.basePrice + product.shippingPrice;
      const sale = () => sales[product.id] ?? saleBounds(cost()).suggested;

      function update({ fromInput = false } = {}) {
        const unitCost = cost();
        const unitSale = sale();
        const { max } = saleBounds(unitCost);
        const sliderMax = Math.max(max, unitSale);
        const profit = unitSale - unitCost;
        const margin = unitSale > 0 ? (profit / unitSale) * 100 : 0;

        slider.max = sliderMax;
        slider.value = Math.min(unitSale, sliderMax);
        slider.style.setProperty('--sale-pct', `${(Math.min(unitSale, sliderMax) / sliderMax) * 100}%`);
        if (!fromInput) saleInput.value = Math.round(unitSale).toLocaleString('es-AR');
        if (document.activeElement !== qtyInput) qtyInput.value = monthly.toLocaleString('es-AR');

        $$('.calc-products button', root).forEach((b) => {
          const on = b.dataset.id === product.id;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-checked', String(on));
        });

        out('cost').textContent = money(unitCost);
        out('costSub').textContent = `${money(product.basePrice)} producción + ${money(product.shippingPrice)} envío`;
        out('profit').textContent = money(profit);
        out('profit').className = profit >= 0 ? 'pos' : 'neg';
        out('margin').textContent = `${margin.toFixed(1)}%`;
        out('margin').className = margin >= 0 ? 'pos' : 'neg';
        out('monthly').textContent = money(profit * monthly);
        out('monthly').style.color = profit < 0 ? 'var(--red-600)' : '';
      }

      root._select = (id) => {
        const p = D.products.find((x) => x.id === id);
        if (p) {
          product = p;
          update();
        }
      };

      $('.calc-products', root).addEventListener('click', (e) => {
        const b = e.target.closest('button[data-id]');
        if (b) root._select(b.dataset.id);
      });
      slider.addEventListener('input', () => {
        sales[product.id] = Number(slider.value);
        update();
      });
      saleInput.addEventListener('focus', () => {
        saleInput.value = String(Math.round(sale()));
        saleInput.select();
      });
      saleInput.addEventListener('input', () => {
        const d = digits(saleInput.value);
        saleInput.value = d;
        if (d !== '') {
          sales[product.id] = Number(d);
          update({ fromInput: true });
        }
      });
      saleInput.addEventListener('blur', () => update());
      qtyInput.addEventListener('focus', () => {
        qtyInput.value = String(monthly);
        qtyInput.select();
      });
      qtyInput.addEventListener('input', () => {
        const d = digits(qtyInput.value).slice(0, 5);
        qtyInput.value = d;
        monthly = d === '' ? 0 : Number(d);
        update();
      });
      qtyInput.addEventListener('blur', () => update());
      [saleInput, qtyInput].forEach((el) =>
        el.addEventListener('keydown', (e) => e.key === 'Enter' && el.blur())
      );

      update();
    });
  }

  /* ---------- Formulario de contacto ---------- */

  function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;
    const ok = $('#form-success');
    const err = $('#form-error');
    const submit = $('button[type="submit"]', form);

    const params = new URLSearchParams(location.search);
    const motivo = params.get('motivo');
    if (motivo) {
      const radio = $(`input[name="motivo"][value="${CSS.escape(motivo)}"]`, form);
      if (radio) radio.checked = true;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      ok.classList.remove('is-visible');
      err.classList.remove('is-visible');

      let valid = true;
      $$('[required]', form).forEach((el) => {
        const bad = !el.value.trim() || (el.type === 'email' && !/^\S+@\S+\.\S+$/.test(el.value));
        el.classList.toggle('is-invalid', bad);
        if (bad && valid) {
          el.focus();
          valid = false;
        }
      });
      if (!valid) return;
      if ($('input[name="_honey"]', form).value) return;

      const data = Object.fromEntries(new FormData(form));
      const subject = `Contacto web: ${data.motivo || 'Consulta'} — ${data.nombre}`;
      const original = submit.innerHTML;
      submit.disabled = true;
      submit.textContent = 'Enviando…';

      try {
        const res = await fetch(`https://formsubmit.co/ajax/${D.contactEmail}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: subject,
            _template: 'table',
            _replyto: data.email,
            Nombre: data.nombre,
            Email: data.email,
            Teléfono: data.telefono || '—',
            'Tienda / marca': data.tienda || '—',
            Motivo: data.motivo || '—',
            Mensaje: data.mensaje,
          }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || String(json.success) !== 'true') throw new Error(json.message || 'send failed');
        form.reset();
        ok.classList.add('is-visible');
      } catch {
        const body = `Nombre: ${data.nombre}\nEmail: ${data.email}\nTeléfono: ${data.telefono || '—'}\nTienda: ${data.tienda || '—'}\nMotivo: ${data.motivo || '—'}\n\n${data.mensaje}`;
        $('a', err).href = `mailto:${D.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        err.classList.add('is-visible');
      } finally {
        submit.disabled = false;
        submit.innerHTML = original;
      }
    });

    $$('[required]', form).forEach((el) => el.addEventListener('input', () => el.classList.remove('is-invalid')));
  }

  /* ---------- Init ---------- */

  renderHeader();
  renderFooter();
  initHeader();
  wireAppLinks();
  renderFeatured();
  initCatalog();
  initProductModal();
  initCalculators();
  initContactForm();
  initReveal();
})();
