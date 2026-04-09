/* ============================================================
   OZ TRUCK TRAILER - Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initHeroSlider();
    initProductFilters();
    initSearchPage();
    initLightbox();
    initAccordions();
    initAOS();
  });

  // ============================================================
  // HERO SLIDER
  // ============================================================

  function initHeroSlider() {
    const slidesContainer = document.getElementById('heroSlides');
    if (!slidesContainer) return;

    const settings = (window.OZT && window.OZT.getSettings()) || {};
    const heroImages = settings.heroImages || [];
    const heroSlides = settings.heroSlides || [];

    if (heroImages.length === 0) return;

    let current = 0;
    let timer = null;
    const total = heroImages.length;

    // Build slides
    slidesContainer.innerHTML = '';
    heroImages.forEach(function (img, i) {
      const slide = heroSlides[i] || {};
      const div = document.createElement('div');
      div.className = 'hero-slide' + (i === 0 ? ' active' : '');
      div.innerHTML = `
        <img src="${img}" alt="Slide ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}">
        <div class="hero-slide-overlay"></div>
        <div style="position:absolute;inset:0;display:flex;align-items:center;padding:0 60px;max-width:1400px;margin:0 auto;left:0;right:0;">
          <div class="hero-text" style="opacity:${i === 0 ? 1 : 0};transform:translateY(${i === 0 ? 0 : 30}px);transition:all 0.8s ease 0.3s;">
            ${slide.badge ? `<div class="hero-badge"><i class="fas fa-map-marker-alt"></i> ${slide.badge}</div>` : ''}
            <h1 class="hero-title">${slide.title || 'OZ Truck Trailer <span>TP/BTP</span>'}</h1>
            <p class="hero-subtitle">${slide.subtitle || ''}</p>
            <div class="hero-actions">
              <a href="${slide.btnLink || 'produits/tous-nos-produits.html'}" class="btn btn-primary btn-lg btn-pulse">
                <i class="fas fa-search"></i> ${slide.btnText || 'Voir nos produits'}
              </a>
              <a href="contact.html" class="btn btn-outline btn-lg">
                <i class="fas fa-phone"></i> Nous contacter
              </a>
            </div>
          </div>
        </div>
      `;
      slidesContainer.appendChild(div);
    });

    // Dots
    const dotsContainer = document.getElementById('heroDots');
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      heroImages.forEach(function (_, i) {
        const dot = document.createElement('div');
        dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', function () { goTo(i); });
        dotsContainer.appendChild(dot);
      });
    }

    // Arrows
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

    function goTo(index) {
      const slides = slidesContainer.querySelectorAll('.hero-slide');
      if (!slides.length) return;

      // Deactivate current
      slides[current].classList.remove('active');
      const currentText = slides[current].querySelector('.hero-text');
      if (currentText) {
        currentText.style.opacity = '0';
        currentText.style.transform = 'translateY(30px)';
      }

      // Update dots
      const dots = document.querySelectorAll('.hero-dot');
      if (dots[current]) dots[current].classList.remove('active');

      // New index
      current = ((index % total) + total) % total;

      // Activate new
      slides[current].classList.add('active');
      const newText = slides[current].querySelector('.hero-text');
      if (newText) {
        setTimeout(function () {
          newText.style.opacity = '1';
          newText.style.transform = 'translateY(0)';
        }, 100);
      }

      // Update slide positions
      slidesContainer.style.transform = 'translateX(-' + (current * 100) + '%)';

      if (dots[current]) dots[current].classList.add('active');

      clearInterval(timer);
      startTimer();
    }

    function startTimer() {
      timer = setInterval(function () {
        goTo(current + 1);
      }, 5000);
    }

    startTimer();

    // Touch/swipe
    let touchStartX = 0;
    slidesContainer.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    slidesContainer.addEventListener('touchend', function (e) {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? current + 1 : current - 1);
      }
    }, { passive: true });
  }

  // ============================================================
  // PRODUCT FILTERS
  // ============================================================

  function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!filterBtns.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = this.dataset.filter;
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        const cards = document.querySelectorAll('.product-card[data-category], [data-sub]');
        cards.forEach(function (card) {
          if (filter === 'all') {
            card.style.display = '';
          } else {
            const cat = card.dataset.category || '';
            const sub = card.dataset.sub || '';
            if (cat === filter || sub === filter) {
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          }
        });

        updateFilterCounts();
      });
    });
  }

  function updateFilterCounts() {
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      const filter = btn.dataset.filter;
      const countEl = btn.querySelector('.filter-count');
      if (!countEl) return;
      const cards = document.querySelectorAll('.product-card[data-category]');
      let count = 0;
      cards.forEach(function (card) {
        if (filter === 'all' || card.dataset.category === filter || card.dataset.sub === filter) {
          count++;
        }
      });
      countEl.textContent = count;
    });
  }

  // ============================================================
  // SEARCH PAGE
  // ============================================================

  function initSearchPage() {
    const searchContainer = document.getElementById('searchResults');
    if (!searchContainer) return;

    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (!q) return;

    const input = document.getElementById('pageSearchInput');
    if (input) input.value = q;

    const queryDisplay = document.getElementById('searchQuery');
    if (queryDisplay) queryDisplay.textContent = '"' + q + '"';

    if (!window.OZT) return;
    const results = OZT.searchAll(q);
    const countEl = document.getElementById('searchCount');
    if (countEl) countEl.textContent = results.length;

    if (results.length === 0) {
      searchContainer.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-search"></i>
          <h3>Aucun résultat</h3>
          <p>Aucun résultat pour "${q}". Essayez d'autres mots-clés.</p>
        </div>
      `;
      return;
    }

    searchContainer.innerHTML = results.map(function (r) {
      if (r.type === 'product') {
        return renderProductCard(r.item);
      } else if (r.type === 'news') {
        return `
          <div class="news-card fade-in-up" onclick="window.location.href='../detail/index.html?id=${r.item.id}&type=news'">
            <div class="news-card-img">
              <img src="${r.item.image || ''}" alt="${r.item.title}" loading="lazy">
            </div>
            <div class="news-card-body">
              <div class="news-date">${formatDate(r.item.date)}</div>
              <h3>${r.item.title}</h3>
              <p>${r.item.excerpt || ''}</p>
            </div>
          </div>
        `;
      }
      return '';
    }).join('');
  }

  // ============================================================
  // LIGHTBOX
  // ============================================================

  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        lightbox.classList.remove('active');
      });
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        lightbox.classList.remove('active');
      }
    });

    window.openLightbox = function (src) {
      if (lightboxImg) lightboxImg.src = src;
      lightbox.classList.add('active');
    };
  }

  // ============================================================
  // ACCORDIONS
  // ============================================================

  function initAccordions() {
    document.querySelectorAll('.accordion-header').forEach(function (header) {
      header.addEventListener('click', function () {
        const item = this.parentElement;
        const body = item.querySelector('.accordion-body');
        const bodyInner = item.querySelector('.accordion-body-inner');

        if (item.classList.contains('open')) {
          item.classList.remove('open');
          body.style.maxHeight = '0';
        } else {
          // Close others in same group
          const parent = item.parentElement;
          parent.querySelectorAll('.accordion-item.open').forEach(function (el) {
            el.classList.remove('open');
            el.querySelector('.accordion-body').style.maxHeight = '0';
          });
          item.classList.add('open');
          body.style.maxHeight = (bodyInner ? bodyInner.scrollHeight + 30 : 300) + 'px';
        }
      });
    });
  }

  // ============================================================
  // SIMPLE AOS (Animate On Scroll)
  // ============================================================

  function initAOS() {
    const elements = document.querySelectorAll('.fade-in-up');
    if (!elements.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // ============================================================
  // TOAST NOTIFICATION
  // ============================================================

  window.showToast = function (message, type) {
    let toast = document.getElementById('mainToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.id = 'mainToast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = 'toast ' + (type || '');
    setTimeout(function () { toast.classList.add('show'); }, 50);
    setTimeout(function () {
      toast.classList.remove('show');
    }, 3500);
  };

  // ============================================================
  // URL PARAM HELPERS
  // ============================================================

  window.getUrlParam = function (name) {
    return new URLSearchParams(window.location.search).get(name);
  };

  // ============================================================
  // DATE FORMAT
  // ============================================================

  window.formatDate = function (dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // ============================================================
  // LOAD PRODUCTS INTO GRID
  // ============================================================

  window.loadProductsGrid = function (containerId, products) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!products || products.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <i class="fas fa-boxes"></i>
          <h3>Aucun produit disponible</h3>
          <p>Revenez bientôt pour découvrir nos nouveautés.</p>
        </div>
      `;
      return;
    }
    container.innerHTML = products.map(function (p) {
      const html = renderProductCard(p);
      return html.replace('class="product-card', `class="product-card" data-category="${p.category}" data-sub="${p.subCategory || ''}" `);
    }).join('');
    initAOS();
  };

  // ============================================================
  // COUNTER ANIMATION
  // ============================================================

  window.animateCounters = function () {
    document.querySelectorAll('.stat-number[data-target]').forEach(function (el) {
      const target = parseInt(el.dataset.target) || 0;
      const duration = 1500;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(function () {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current) + (el.dataset.suffix || '');
      }, 16);
    });
  };

  // Trigger counters when visible
  const counterSection = document.querySelector('.stats-bar');
  if (counterSection) {
    const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(counterSection);
  }

})();
