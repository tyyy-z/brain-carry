/* Static pages work without JavaScript. This only remembers an explicit choice. */
(() => {
  'use strict';
  const current = document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
  const explicit = new URLSearchParams(location.search).get('lang');
  let saved;
  try { saved = localStorage.getItem('braincarry-language'); } catch { /* Storage is optional. */ }
  const preferred = ['en', 'zh'].includes(explicit) ? explicit : current === 'zh' ? 'zh' : saved === 'zh' ? 'zh' : 'en';
  if (preferred !== current) {
    const target = new URL(preferred === 'zh' ? 'zh.html' : 'index.html', location.href);
    target.search = location.search;
    target.hash = location.hash;
    location.replace(target.href);
    return;
  }
  try { localStorage.setItem('braincarry-language', current); } catch { /* Links still work. */ }
})();
