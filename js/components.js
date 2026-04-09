/* ============================================================
   OZ TRUCK TRAILER - Dynamic Components (Nav + Footer)
   ============================================================ */

(function () {
  'use strict';

  // ---- Helpers ----
  function getRoot() {
    // Determine relative path to root based on current page depth
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length - 1;
    if (depth <= 1) return './';
    return '../'.repeat(depth - 1);
  }

  const root = getRoot();

  // ---- Build Navbar ----
  function buildNavbar() {
    const settings = (window.OZT && window.OZT.getSettings()) || {};
    const social = settings.socialLinks || {};

    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.id = 'mainNavbar';
    nav.innerHTML = `
      <div class="navbar-inner">
        <a href="${root}index.html" class="navbar-logo">
          <img src="${root}assets/logo.png" alt="OZ Truck Trailer" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
          <span style="display:none;font-size:1.1rem;font-weight:900;color:#C41E2E">OZ</span>
          <span>OZ Truck Trailer TP/BTP</span>
        </a>

        <ul class="navbar-menu" id="navMenu">
          <!-- Accueil -->
          <li class="nav-item">
            <a href="${root}index.html" class="nav-link">Accueil</a>
          </li>

          <!-- Nos Produits -->
          <li class="nav-item">
            <a href="${root}produits/tous-nos-produits.html" class="nav-link">
              Nos Produits <i class="fas fa-chevron-down"></i>
            </a>
            <div class="dropdown">
              <!-- Remorques -->
              <div class="has-submenu">
                <a href="${root}produits/remorques-semi-remorques.html" class="dropdown-link">
                  Remorque &amp; Semi-Remorque <i class="fas fa-chevron-right" style="font-size:0.7rem"></i>
                </a>
                <div class="submenu">
                  <a href="${root}produits/remorques-semi-remorques.html?sub=remorque">Remorque</a>
                  <a href="${root}produits/remorques-semi-remorques.html?sub=semi-remorque">Semi-Remorque</a>
                  <a href="${root}produits/remorques-semi-remorques.html?sub=porte-voitures">Porte-Voitures</a>
                  <a href="${root}produits/remorques-semi-remorques.html?sub=porte-container">Porte-Container</a>
                  <a href="${root}produits/remorques-semi-remorques.html?sub=plateau">Plateau</a>
                  <a href="${root}produits/remorques-semi-remorques.html?sub=benne-tp">Benne TP</a>
                  <a href="${root}produits/remorques-semi-remorques.html?sub=autres">Autres</a>
                </div>
              </div>
              <!-- Matériel TP -->
              <div class="has-submenu">
                <a href="${root}produits/materiel-tp.html" class="dropdown-link">
                  Matériel De TP <i class="fas fa-chevron-right" style="font-size:0.7rem"></i>
                </a>
                <div class="submenu">
                  <a href="${root}produits/materiel-tp.html?sub=pelle-pneu">Pelle À Pneu</a>
                  <a href="${root}produits/materiel-tp.html?sub=pelle-chenille">Pelle À Chenille</a>
                  <a href="${root}produits/materiel-tp.html?sub=tractopelle">Tractopelle</a>
                  <a href="${root}produits/materiel-tp.html?sub=mini-pelle">Mini-Pelle</a>
                  <a href="${root}produits/materiel-tp.html?sub=chargeuse">Chargeuse</a>
                  <a href="${root}produits/materiel-tp.html?sub=chariot-telescopique">Chariot Télescopique</a>
                  <a href="${root}produits/materiel-tp.html?sub=autres">Autres</a>
                  <a href="${root}produits/materiel-tp.html" style="color:#C41E2E;font-weight:700">Tous Les Produits</a>
                </div>
              </div>
              <!-- Poids Lourds -->
              <div class="has-submenu">
                <a href="${root}produits/poids-lourds.html" class="dropdown-link">
                  Poids-Lourds, Utilitaires &amp; Véhicules <i class="fas fa-chevron-right" style="font-size:0.7rem"></i>
                </a>
                <div class="submenu">
                  <a href="${root}produits/poids-lourds.html?sub=poids-lourds">Poids-Lourds</a>
                  <a href="${root}produits/poids-lourds.html?sub=utilitaires">Utilitaires</a>
                  <a href="${root}produits/poids-lourds.html?sub=vehicules">Véhicules</a>
                  <a href="${root}produits/poids-lourds.html?sub=autres">Autres</a>
                  <a href="${root}produits/poids-lourds.html" style="color:#C41E2E;font-weight:700">Tous Les Produits</a>
                </div>
              </div>
              <a href="${root}produits/machines.html" class="dropdown-link">Machines</a>
              <a href="${root}produits/occasions.html" class="dropdown-link">Occasions</a>
              <a href="${root}produits/pieces-detachees.html" class="dropdown-link">Pièces-Détachées</a>
              <a href="${root}produits/tous-nos-produits.html" class="dropdown-link" style="color:#C41E2E;font-weight:700">
                <i class="fas fa-th-large" style="margin-right:6px;font-size:0.8rem"></i> Tous Nos Produits
              </a>
            </div>
          </li>

          <!-- Entretien & Réparation -->
          <li class="nav-item">
            <a href="${root}services/reparation.html" class="nav-link">
              Entretien &amp; Réparation <i class="fas fa-chevron-down"></i>
            </a>
            <div class="dropdown">
              <a href="${root}services/entretien.html" class="dropdown-link">Entretien</a>
              <a href="${root}services/reparation.html" class="dropdown-link">Réparation</a>
            </div>
          </li>

          <!-- Entreprise -->
          <li class="nav-item">
            <a href="${root}entreprise/a-propos.html" class="nav-link">
              Entreprise <i class="fas fa-chevron-down"></i>
            </a>
            <div class="dropdown">
              <a href="${root}entreprise/a-propos.html" class="dropdown-link">À Propos De Nous</a>
              <a href="${root}entreprise/notre-entreprise.html" class="dropdown-link">Notre Entreprise</a>
              <a href="${root}entreprise/actualites.html" class="dropdown-link">Actualités &amp; Nouveautés</a>
            </div>
          </li>

          <!-- Contact -->
          <li class="nav-item">
            <a href="${root}contact.html" class="nav-link">Contact</a>
          </li>

          <!-- Photos & Vidéos -->
          <li class="nav-item">
            <a href="${root}photos-videos.html" class="nav-link">Photos &amp; Vidéos</a>
          </li>

          <!-- Ventes Réalisées -->
          <li class="nav-item">
            <a href="${root}ventes-realisees.html" class="nav-link">Ventes Réalisées</a>
          </li>
        </ul>

        <!-- Search -->
        <div class="navbar-search">
          <form class="search-form" id="navSearchForm" onsubmit="return handleNavSearch(event)">
            <input type="text" class="search-input" placeholder="Rechercher..." id="navSearchInput" autocomplete="off">
            <button type="submit" class="search-btn"><i class="fas fa-search"></i></button>
          </form>
        </div>

        <!-- Hamburger -->
        <button class="navbar-toggle" id="navToggle" aria-label="Menu">
          <i class="fas fa-bars" id="navToggleIcon"></i>
        </button>
      </div>
    `;

    document.body.insertBefore(nav, document.body.firstChild);
    initNavbar();
  }

  function initNavbar() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const icon = document.getElementById('navToggleIcon');

    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        menu.classList.toggle('open');
        icon.className = menu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
      });

      // Mobile: toggle dropdowns on click
      if (window.innerWidth <= 1024) {
        menu.querySelectorAll('.nav-link').forEach(function (link) {
          link.addEventListener('click', function (e) {
            const parent = this.parentElement;
            if (parent.querySelector('.dropdown')) {
              e.preventDefault();
              parent.classList.toggle('open');
            }
          });
        });

        menu.querySelectorAll('.has-submenu > .dropdown-link').forEach(function (link) {
          link.addEventListener('click', function (e) {
            const parent = this.parentElement;
            if (parent.querySelector('.submenu')) {
              e.preventDefault();
              parent.classList.toggle('open');
            }
          });
        });
      }
    }

    // Active link
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link, .dropdown-link, .submenu a').forEach(function (link) {
      if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href').replace(/^\.\.\//, '').replace(/^\.\//, ''))) {
        link.classList.add('active');
      }
    });

    // Sticky shadow
    window.addEventListener('scroll', function () {
      const navbar = document.getElementById('mainNavbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
        } else {
          navbar.style.boxShadow = 'none';
        }
      }
    });
  }

  // ---- Build Footer ----
  function buildFooter() {
    const settings = (window.OZT && window.OZT.getSettings()) || {};
    const social = settings.socialLinks || {};

    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <!-- Brand -->
          <div class="footer-brand">
            <a href="${root}index.html">
              <img src="${root}assets/logo.png" alt="OZ Truck Trailer" class="footer-logo" onerror="this.style.height='40px';this.alt='OZ Truck Trailer'">
            </a>
            <p class="footer-desc">
              Spécialiste de la vente, réparation et location de remorques, semi-remorques, matériel TP, poids lourds et utilitaires en Pays de la Loire.
            </p>
            <div style="margin-top:12px;">
              <p style="font-size:0.83rem;color:#555;margin-bottom:6px;"><i class="fas fa-map-marker-alt" style="color:#C41E2E;margin-right:6px"></i>8 Allée Du Foirail, 44110 Châteaubriant</p>
              <p style="font-size:0.83rem;color:#555;margin-bottom:6px;"><i class="fas fa-phone" style="color:#C41E2E;margin-right:6px"></i><a href="tel:0244051090" style="color:#aaa">02 44 05 10 90</a></p>
              <p style="font-size:0.83rem;color:#555;"><i class="fas fa-envelope" style="color:#C41E2E;margin-right:6px"></i><a href="mailto:oz-truck-trailer@outlook.com" style="color:#aaa">oz-truck-trailer@outlook.com</a></p>
            </div>
            <div class="footer-social">
              ${social.facebook ? `<a href="${social.facebook}" target="_blank" class="social-link" title="Facebook"><i class="fab fa-facebook-f"></i></a>` : '<a href="#" class="social-link" title="Facebook"><i class="fab fa-facebook-f"></i></a>'}
              ${social.instagram ? `<a href="${social.instagram}" target="_blank" class="social-link" title="Instagram"><i class="fab fa-instagram"></i></a>` : '<a href="#" class="social-link" title="Instagram"><i class="fab fa-instagram"></i></a>'}
              ${social.linkedin ? `<a href="${social.linkedin}" target="_blank" class="social-link" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>` : '<a href="#" class="social-link" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>'}
              ${social.youtube ? `<a href="${social.youtube}" target="_blank" class="social-link" title="YouTube"><i class="fab fa-youtube"></i></a>` : '<a href="#" class="social-link" title="YouTube"><i class="fab fa-youtube"></i></a>'}
            </div>
          </div>

          <!-- Produits -->
          <div class="footer-col">
            <h4>Nos Produits</h4>
            <div class="footer-links">
              <a href="${root}produits/remorques-semi-remorques.html" class="footer-link">Remorques & Semi-Remorques</a>
              <a href="${root}produits/remorques-semi-remorques.html?sub=plateau" class="footer-link">Plateaux</a>
              <a href="${root}produits/remorques-semi-remorques.html?sub=porte-container" class="footer-link">Porte-Containers</a>
              <a href="${root}produits/remorques-semi-remorques.html?sub=benne-tp" class="footer-link">Bennes TP</a>
              <a href="${root}produits/materiel-tp.html" class="footer-link">Matériel TP</a>
              <a href="${root}produits/materiel-tp.html?sub=pelle-chenille" class="footer-link">Pelles Chenilles</a>
              <a href="${root}produits/materiel-tp.html?sub=mini-pelle" class="footer-link">Mini-Pelles</a>
              <a href="${root}produits/materiel-tp.html?sub=tractopelle" class="footer-link">Tractopelles</a>
            </div>
          </div>

          <!-- Véhicules -->
          <div class="footer-col">
            <h4>Véhicules</h4>
            <div class="footer-links">
              <a href="${root}produits/poids-lourds.html" class="footer-link">Poids-Lourds</a>
              <a href="${root}produits/poids-lourds.html?sub=utilitaires" class="footer-link">Utilitaires</a>
              <a href="${root}produits/machines.html" class="footer-link">Machines</a>
              <a href="${root}produits/occasions.html" class="footer-link">Occasions</a>
              <a href="${root}produits/pieces-detachees.html" class="footer-link">Pièces Détachées</a>
              <a href="${root}produits/tous-nos-produits.html" class="footer-link">Tous Nos Produits</a>
            </div>
          </div>

          <!-- Services -->
          <div class="footer-col">
            <h4>Services</h4>
            <div class="footer-links">
              <a href="${root}services/entretien.html" class="footer-link">Entretien</a>
              <a href="${root}services/reparation.html" class="footer-link">Réparation</a>
              <a href="${root}entreprise/a-propos.html" class="footer-link">À Propos De Nous</a>
              <a href="${root}entreprise/notre-entreprise.html" class="footer-link">Notre Entreprise</a>
              <a href="${root}entreprise/actualites.html" class="footer-link">Actualités</a>
              <a href="${root}photos-videos.html" class="footer-link">Photos &amp; Vidéos</a>
              <a href="${root}ventes-realisees.html" class="footer-link">Ventes Réalisées</a>
            </div>
          </div>

          <!-- Contact -->
          <div class="footer-col">
            <h4>Contact</h4>
            <div class="footer-links">
              <a href="${root}contact.html" class="footer-link">Formulaire de contact</a>
              <a href="tel:0244051090" class="footer-link">02 44 05 10 90</a>
              <a href="mailto:oz-truck-trailer@outlook.com" class="footer-link">Email</a>
            </div>
            <div style="margin-top:18px;">
              <p style="font-size:0.78rem;color:#444;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;font-weight:700">Horaires</p>
              <p style="font-size:0.82rem;color:#555;">Lun-Ven : 8h - 18h</p>
              <p style="font-size:0.82rem;color:#555;">Sam : 8h - 12h</p>
              <p style="font-size:0.82rem;color:#555;">Dim : Fermé</p>
            </div>
            <div style="margin-top:18px;">
              <p style="font-size:0.78rem;color:#444;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;font-weight:700">SIRET</p>
              <p style="font-size:0.82rem;color:#555;">80926449200012</p>
            </div>
          </div>
        </div>
      </div>
      <div style="background:#050505;border-top:1px solid #1a1a1a;">
        <div class="container">
          <div class="footer-bottom">
            <p class="footer-copy">© 2026 OZ Truck Trailer TP/BTP. Tous droits réservés.</p>
            <div class="footer-bottom-links">
              <a href="${root}contact.html">Mentions légales</a>
              <a href="${root}contact.html">Politique de confidentialité</a>
              <a href="${root}admin/login.html">Admin</a>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(footer);
  }

  // ---- Product Card ----
  window.renderProductCard = function (product) {
    const imgs = product.images && product.images.length > 0 ? product.images : [];
    const firstImg = imgs[0] || '';
    const root2 = getRoot();

    return `
      <div class="product-card fade-in-up" onclick="window.location.href='${root2}detail/index.html?id=${product.id}&type=product'">
        <div class="product-card-img" id="img-${product.id}">
          ${firstImg
            ? `<img src="${firstImg}" alt="${product.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'no-img\\'><i class=\\'fas fa-image\\'></i><span>Pas d\\'image</span></div>'">`
            : `<div class="no-img"><i class="fas fa-image"></i><span>Pas d'image</span></div>`
          }
          ${product.category ? `<span class="product-badge">${getCategoryLabel(product.category)}</span>` : ''}
          ${imgs.length > 1 ? `
            <button class="product-img-arrow prev" onclick="event.stopPropagation();changeCardImg('${product.id}', -1)"><i class="fas fa-chevron-left"></i></button>
            <button class="product-img-arrow next" onclick="event.stopPropagation();changeCardImg('${product.id}', 1)"><i class="fas fa-chevron-right"></i></button>
            <div class="product-img-nav">
              ${imgs.map((_, i) => `<div class="product-img-dot ${i === 0 ? 'active' : ''}" onclick="event.stopPropagation();setCardImg('${product.id}', ${i}, ${imgs.length})" data-index="${i}" data-product="${product.id}"></div>`).join('')}
            </div>
          ` : ''}
        </div>
        <div class="product-card-body">
          ${product.brand ? `<div class="product-brand">${product.brand}</div>` : ''}
          <h3 class="product-name">${product.name}</h3>
          <p class="product-desc">${product.description || ''}</p>
          ${product.specs && Object.keys(product.specs).length > 0 ? `
            <div class="product-specs">
              ${Object.entries(product.specs).slice(0, 3).map(([k, v]) => `<span class="spec-tag">${k}: ${v}</span>`).join('')}
            </div>
          ` : ''}
          <div class="product-footer">
            <div>
              ${product.price ? `<div class="product-price">${product.price} €</div>` : `<div class="product-price" style="font-size:0.95rem;color:#888">${product.priceLabel || 'Sur devis'}</div>`}
            </div>
            <a href="${root2}detail/index.html?id=${product.id}&type=product" class="btn btn-primary btn-sm" onclick="event.stopPropagation()">
              <i class="fas fa-eye"></i> Détails
            </a>
          </div>
        </div>
      </div>
    `;
  };

  window._cardImgIndex = {};

  window.changeCardImg = function (productId, dir) {
    const product = OZT.getProductById(productId);
    if (!product || !product.images || product.images.length < 2) return;
    const total = product.images.length;
    if (!window._cardImgIndex[productId]) window._cardImgIndex[productId] = 0;
    window._cardImgIndex[productId] = ((window._cardImgIndex[productId] + dir) + total) % total;
    setCardImg(productId, window._cardImgIndex[productId], total);
  };

  window.setCardImg = function (productId, index, total) {
    const product = OZT.getProductById(productId);
    if (!product || !product.images) return;
    window._cardImgIndex[productId] = index;
    const container = document.getElementById('img-' + productId);
    if (!container) return;
    const img = container.querySelector('img');
    if (img) img.src = product.images[index];
    container.querySelectorAll('.product-img-dot').forEach(function (dot, i) {
      dot.classList.toggle('active', i === index);
    });
  };

  function getCategoryLabel(cat) {
    const map = {
      'remorques': 'Remorques',
      'materiel-tp': 'Matériel TP',
      'poids-lourds': 'Poids Lourds',
      'machines': 'Machines',
      'occasions': 'Occasions',
      'pieces-detachees': 'Pièces'
    };
    return map[cat] || cat;
  }

  // ---- Search handler ----
  window.handleNavSearch = function (e) {
    e.preventDefault();
    const q = document.getElementById('navSearchInput').value.trim();
    if (!q) return false;
    const r = getRoot();
    window.location.href = r + 'produits/tous-nos-produits.html?q=' + encodeURIComponent(q);
    return false;
  };

  // ---- Init ----
  document.addEventListener('DOMContentLoaded', function () {
    buildNavbar();
    buildFooter();
  });

})();
