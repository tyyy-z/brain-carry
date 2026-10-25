/* English is the homepage default. Explicit language URLs still work without stored preferences. */
(() => {
  'use strict';
  const current = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
  const explicit = new URLSearchParams(location.search).get('lang');
  const preferred = ['en', 'zh'].includes(explicit) ? explicit : current;
  if (preferred !== current) {
    const target = new URL(preferred === 'zh' ? 'zh.html' : 'index.html', location.href);
    target.search = location.search;
    target.hash = location.hash;
    location.replace(target.href);
  }
})();
