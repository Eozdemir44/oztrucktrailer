/* ============================================================
   OZ TRUCK TRAILER - Admin JavaScript
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // AUTH CHECK (run on all admin pages except login)
  // ============================================================

  window.adminCheckAuth = function () {
    if (!sessionStorage.getItem('ozt_admin_logged')) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  };

  // ============================================================
  // SIDEBAR TOGGLE
  // ============================================================

  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('adminToggle');
    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (toggle && sidebar) {
      toggle.addEventListener('click', function () {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('show');
      });
    }

    if (overlay) {
      overlay.addEventListener('click', function () {
        if (sidebar) sidebar.classList.remove('open');
        overlay.classList.remove('show');
      });
    }

    // Logout buttons
    document.querySelectorAll('.admin-logout').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (window.OZT) OZT.logout();
        window.location.href = 'login.html';
      });
    });
  });

  // ============================================================
  // MODAL
  // ============================================================

  window.openModal = function (id) {
    const overlay = document.getElementById(id);
    if (overlay) overlay.classList.add('active');
  };

  window.closeModal = function (id) {
    const overlay = document.getElementById(id);
    if (overlay) overlay.classList.remove('active');
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.modal-close').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const overlay = this.closest('.modal-overlay');
        if (overlay) overlay.classList.remove('active');
      });
    });

    document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) overlay.classList.remove('active');
      });
    });
  });

  // ============================================================
  // IMAGE UPLOAD (base64)
  // ============================================================

  window.initImageUpload = function (areaId, inputId, previewId, onChangeCallback) {
    const area = document.getElementById(areaId);
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    if (!area || !input) return;

    area.addEventListener('click', function () { input.click(); });

    area.addEventListener('dragover', function (e) {
      e.preventDefault();
      area.classList.add('drag-over');
    });

    area.addEventListener('dragleave', function () {
      area.classList.remove('drag-over');
    });

    area.addEventListener('drop', function (e) {
      e.preventDefault();
      area.classList.remove('drag-over');
      handleFiles(e.dataTransfer.files);
    });

    input.addEventListener('change', function () {
      handleFiles(this.files);
    });

    function handleFiles(files) {
      if (!files || !files.length) return;
      Array.from(files).forEach(function (file) {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = function (e) {
          const base64 = e.target.result;
          if (preview) addPreviewItem(base64);
          if (onChangeCallback) onChangeCallback(base64);
        };
        reader.readAsDataURL(file);
      });
    }

    function addPreviewItem(src) {
      if (!preview) return;
      const item = document.createElement('div');
      item.className = 'img-preview-item';
      item.innerHTML = `
        <img src="${src}" alt="Preview">
        <button class="img-preview-remove" onclick="this.parentElement.remove();updateImagesFromPreview('${previewId}')"><i class="fas fa-times"></i></button>
      `;
      item.dataset.src = src;
      preview.appendChild(item);
    }
  };

  window.getImagesFromPreview = function (previewId) {
    const preview = document.getElementById(previewId);
    if (!preview) return [];
    return Array.from(preview.querySelectorAll('.img-preview-item')).map(function (item) {
      const img = item.querySelector('img');
      return img ? img.src : null;
    }).filter(Boolean);
  };

  window.updateImagesFromPreview = function (previewId) {
    // Called after removing a preview item
  };

  window.setPreviewImages = function (previewId, images) {
    const preview = document.getElementById(previewId);
    if (!preview) return;
    preview.innerHTML = '';
    (images || []).forEach(function (src) {
      const item = document.createElement('div');
      item.className = 'img-preview-item';
      item.innerHTML = `
        <img src="${src}" alt="Image">
        <button class="img-preview-remove" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
      `;
      item.dataset.src = src;
      preview.appendChild(item);
    });
  };

  // ============================================================
  // TOAST
  // ============================================================

  window.adminToast = function (message, type) {
    let toast = document.getElementById('adminToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'adminToast';
      toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#1a1a1a;color:#fff;padding:14px 22px;border-radius:8px;border-left:4px solid #C41E2E;box-shadow:0 10px 30px rgba(0,0,0,0.4);font-size:0.88rem;font-weight:500;z-index:9999;transform:translateX(120%);transition:transform 0.4s cubic-bezier(0.68,-0.55,0.265,1.55);max-width:320px;font-family:Inter,sans-serif;';
      document.body.appendChild(toast);
    }
    const colors = { success: '#28a745', error: '#C41E2E', warning: '#ffc107', info: '#007bff' };
    toast.style.borderLeftColor = colors[type] || '#C41E2E';
    toast.textContent = message;
    setTimeout(function () { toast.style.transform = 'translateX(0)'; }, 50);
    setTimeout(function () { toast.style.transform = 'translateX(120%)'; }, 3500);
  };

  // ============================================================
  // CONFIRM DIALOG
  // ============================================================

  window.adminConfirm = function (message, callback) {
    let dialog = document.getElementById('confirmDialog');
    if (!dialog) {
      dialog = document.createElement('div');
      dialog.id = 'confirmDialog';
      dialog.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:9000;display:flex;align-items:center;justify-content:center;padding:20px;';
      dialog.innerHTML = `
        <div style="background:#1a1a1a;border:1px solid #333;border-radius:12px;padding:30px;max-width:380px;width:100%;text-align:center;">
          <i class="fas fa-exclamation-triangle" style="font-size:2.5rem;color:#C41E2E;margin-bottom:16px;display:block;"></i>
          <h3 id="confirmMsg" style="color:#fff;font-size:1rem;margin-bottom:8px;"></h3>
          <p style="color:#888;font-size:0.85rem;margin-bottom:24px;">Cette action est irréversible.</p>
          <div style="display:flex;gap:12px;justify-content:center;">
            <button id="confirmCancel" style="padding:10px 22px;background:#2a2a2a;border:1px solid #444;color:#aaa;border-radius:7px;cursor:pointer;font-family:Inter,sans-serif;font-size:0.87rem;">Annuler</button>
            <button id="confirmOk" style="padding:10px 22px;background:#C41E2E;border:none;color:#fff;border-radius:7px;cursor:pointer;font-family:Inter,sans-serif;font-size:0.87rem;font-weight:600;">Supprimer</button>
          </div>
        </div>
      `;
      document.body.appendChild(dialog);
    }

    document.getElementById('confirmMsg').textContent = message;
    dialog.style.display = 'flex';

    document.getElementById('confirmCancel').onclick = function () {
      dialog.style.display = 'none';
    };
    document.getElementById('confirmOk').onclick = function () {
      dialog.style.display = 'none';
      if (callback) callback();
    };
  };

  // ============================================================
  // STATS UPDATE
  // ============================================================

  window.updateDashboardStats = function () {
    const analytics = JSON.parse(localStorage.getItem('ozt_analytics') || '{}');
    const products = JSON.parse(localStorage.getItem('ozt_products') || '[]');
    const news = JSON.parse(localStorage.getItem('ozt_news') || '[]');
    const sales = JSON.parse(localStorage.getItem('ozt_sales') || '[]');
    const medias = JSON.parse(localStorage.getItem('ozt_medias') || '[]');

    const totalVisits = analytics['__total__'] || 0;
    const pubProducts = products.filter(function (p) { return p.published; }).length;
    const pubSales = sales.filter(function (s) { return s.published; }).length;
    const pubMedias = medias.filter(function (m) { return m.published; }).length;

    function setEl(id, val) {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    }

    setEl('statVisits', totalVisits.toLocaleString('fr-FR'));
    setEl('statProducts', pubProducts);
    setEl('statSales', pubSales);
    setEl('statMedias', pubMedias);
    setEl('statNews', news.filter(function (n) { return n.published; }).length);
  };

  // ============================================================
  // CHART (simple canvas-less bar chart)
  // ============================================================

  window.renderVisitsChart = function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = (window.OZTAnalytics && OZTAnalytics.getLast30Days()) || [];
    const max = Math.max(...data.map(function (d) { return d.count; }), 1);

    const bars = document.createElement('div');
    bars.className = 'chart-bars';
    bars.style.height = '200px';

    data.forEach(function (d) {
      const heightPct = Math.round((d.count / max) * 100);
      const group = document.createElement('div');
      group.className = 'chart-bar-group';
      group.innerHTML = `
        <div class="chart-value">${d.count || ''}</div>
        <div class="chart-bar" style="height:${heightPct}%" title="${d.date}: ${d.count} visite(s)"></div>
        <div class="chart-label">${d.date.slice(5)}</div>
      `;
      bars.appendChild(group);
    });

    container.innerHTML = '';
    container.appendChild(bars);
  };

  // ============================================================
  // SPECS MANAGER
  // ============================================================

  window.initSpecsManager = function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '<p style="color:#555;font-size:0.85rem;">Ajoutez des caractéristiques</p>';

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'add-spec-btn';
    addBtn.innerHTML = '<i class="fas fa-plus"></i> Ajouter une caractéristique';
    addBtn.onclick = function () { addSpecRow(container, '', ''); };
    container.appendChild(addBtn);
  };

  function addSpecRow(container, key, value) {
    // Remove placeholder
    const placeholder = container.querySelector('p');
    if (placeholder) placeholder.remove();

    const addBtn = container.querySelector('.add-spec-btn');

    const row = document.createElement('div');
    row.className = 'specs-input-group';
    row.innerHTML = `
      <input type="text" class="form-control spec-key" placeholder="Nom (ex: Puissance)" value="${key}" style="flex:1">
      <input type="text" class="form-control spec-value" placeholder="Valeur (ex: 140 cv)" value="${value}" style="flex:1">
      <button type="button" class="btn btn-danger btn-icon" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;

    if (addBtn) {
      container.insertBefore(row, addBtn);
    } else {
      container.appendChild(row);
    }
  }

  window.getSpecsFromManager = function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) return {};
    const specs = {};
    container.querySelectorAll('.specs-input-group').forEach(function (row) {
      const key = row.querySelector('.spec-key').value.trim();
      const val = row.querySelector('.spec-value').value.trim();
      if (key) specs[key] = val;
    });
    return specs;
  };

  window.setSpecsInManager = function (containerId, specs) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'add-spec-btn';
    addBtn.innerHTML = '<i class="fas fa-plus"></i> Ajouter une caractéristique';
    addBtn.onclick = function () { addSpecRow(container, '', ''); };
    container.appendChild(addBtn);

    if (specs && Object.keys(specs).length > 0) {
      Object.entries(specs).forEach(function (e) {
        addSpecRow(container, e[0], e[1]);
      });
    }
  };

})();
