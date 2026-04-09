/* ============================================================
   OZ TRUCK TRAILER - Analytics (Page View Tracking)
   ============================================================ */

(function () {
  'use strict';

  function trackPageView() {
    const page = window.location.pathname || '/';
    const analytics = JSON.parse(localStorage.getItem('ozt_analytics') || '{}');

    // Normalize page key
    let key = page.replace(/^.*\/oztrucktrailer\//, '/').replace(/\/index\.html$/, '/').replace(/\.html$/, '') || '/';
    if (!key.startsWith('/')) key = '/' + key;

    // Increment counter
    analytics[key] = (analytics[key] || 0) + 1;

    // Also track total visits
    analytics['__total__'] = (analytics['__total__'] || 0) + 1;

    // Track date-based visits
    const today = new Date().toISOString().slice(0, 10);
    const dateKey = '__date__' + today;
    analytics[dateKey] = (analytics[dateKey] || 0) + 1;

    localStorage.setItem('ozt_analytics', JSON.stringify(analytics));
  }

  // Run on page load
  document.addEventListener('DOMContentLoaded', function () {
    trackPageView();
  });

  // Expose helper
  window.OZTAnalytics = {
    getAll: function () {
      return JSON.parse(localStorage.getItem('ozt_analytics') || '{}');
    },
    getTotal: function () {
      const a = this.getAll();
      return a['__total__'] || 0;
    },
    getPageViews: function () {
      const a = this.getAll();
      const result = {};
      Object.keys(a).forEach(function (k) {
        if (!k.startsWith('__')) {
          result[k] = a[k];
        }
      });
      return result;
    },
    getLast30Days: function () {
      const a = this.getAll();
      const result = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = '__date__' + d.toISOString().slice(0, 10);
        result.push({
          date: d.toISOString().slice(0, 10),
          count: a[key] || 0
        });
      }
      return result;
    },
    getTopPages: function (limit) {
      const pages = this.getPageViews();
      return Object.entries(pages)
        .sort(function (a, b) { return b[1] - a[1]; })
        .slice(0, limit || 10)
        .map(function (e) { return { page: e[0], views: e[1] }; });
    },
    reset: function () {
      localStorage.setItem('ozt_analytics', JSON.stringify({}));
    }
  };

})();
