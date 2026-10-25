(() => {
  'use strict';
  const isChinese = document.documentElement.lang === 'zh-CN';
  const localized = isChinese ? window.BRAIN_CARRY_ZH : null;
  const message = (key, fallback) => localized?.ui[key] || fallback;
  const config = window.BRAIN_CARRY_SITE || {};
  const repository = config.repository || 'https://github.com/tyyy-z/brain-carry';
  const links = {
    repository,
    download: config.download || `${repository}/releases`,
    contributions: `${repository}/blob/main/brain-carry/references/contributions.md`,
    quickstart: `${repository}#quick-start`, skill: `${repository}/blob/main/brain-carry/SKILL.md`,
    issues: `${repository}/issues`, license: `${repository}/blob/main/LICENSE`, credits: `${repository}#credits`
  };
  document.querySelectorAll('[data-link]').forEach(link => {
    const url = links[link.dataset.link];
    if (url && /^https:\/\//.test(url)) link.href = url;
  });
  document.querySelectorAll('[data-version]').forEach(el => { el.textContent = message('version', config.version || 'main snapshot'); });

  // A single synthetic project supplies every view. No private notes or network requests.
  const evidence = { id: 'S-DEMO-01', project: 'Project Lattice', date: '2026-10-25', path: 'raw/project-brief.md' };
  const englishFiles = {
    brief: {
      path: 'AI_BRIEF.md', caption: 'The brief an authorized assistant reads first.',
      html: `<p class="viewer-title">A little context.<br>A better starting point.</p><p>I’m exploring machine learning for crystal structures through a fictional project called ${evidence.project}.</p><p><strong>How I work</strong><br>Keep sources linked. Separate a research question from a verified result. Ask before publishing.</p><p><strong>Continue here</strong><br><a href="#demo" data-open-file="synthesis">[[${evidence.project}]]</a> holds the current question and next action.</p><p class="viewer-source">Source: ${evidence.path} · ${evidence.id}</p>`
    },
    source: {
      path: evidence.path, caption: 'The original input stays separate from interpretation.',
      html: `<p class="viewer-title">The source stays<br>with the idea.</p><p><strong>Source ID</strong> ${evidence.id}<br><strong>Source date</strong> ${evidence.date}<br><strong>Observed</strong> ${evidence.date}<br><strong>Origin</strong> Fictional project brief</p><p>“I want to compare representations of crystal structures. Start with a literature map and a small, reproducible baseline.”</p><p><strong>Evidence status</strong><br>This records a research intention. It is not an experiment or a verified finding.</p><p class="viewer-source">Connected synthesis: <a href="#demo" data-open-file="synthesis">wiki/project-lattice.md</a></p>`
    },
    synthesis: {
      path: 'wiki/project-lattice.md', caption: 'The synthesis names what is known, planned and still open.',
      html: `<p class="viewer-title">${evidence.project}</p><p><strong>Question</strong><br>Which representations should we compare for learning from crystal structures?</p><p><strong>Current state</strong><br>A research question is recorded. No model has been trained and no result is claimed.</p><p><strong>Next action</strong><br>Build a sourced literature map, then agree on a baseline and evaluation protocol.</p><p><strong>Evidence</strong><br><a href="#demo" data-open-file="source">${evidence.path}</a> [${evidence.id}]</p><p class="viewer-source">Updated ${evidence.date} · Fictional demonstration</p>`
    },
    log: {
      path: 'log.md', caption: 'A change record makes the next handoff easier to inspect.',
      html: `<p class="viewer-title">What changed,<br>and why.</p><p><strong>${evidence.date} · Example ingest</strong></p><ul><li>Preserved the fictional brief in ${evidence.path}.</li><li>Created a linked ${evidence.project} synthesis.</li><li>Added the project to index.md.</li><li>Updated the brief with the current research question.</li></ul><p><strong>Still open</strong><br>No baseline, benchmark or empirical result has been verified.</p><p class="viewer-source">Source record: <a href="#demo" data-open-file="source">${evidence.id}</a> · Synthetic demo</p>`
    }
  };
  const files = localized?.files || englishFiles;
  let selected = 'brief';
  const viewer = document.getElementById('demo-output');
  const body = document.getElementById('demo-body');
  function openFile(key) {
    const file = files[key];
    if (!file) return;
    selected = key;
    document.getElementById('demo-path').textContent = file.path;
    document.getElementById('demo-caption').textContent = file.caption;
    body.innerHTML = file.html;
    viewer.setAttribute('aria-label', `${message('exampleFile', 'Example file')}: ${file.path}`);
    document.querySelectorAll('[data-file]').forEach(button => {
      const active = button.dataset.file === key;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    viewer.classList.remove('is-swapping');
    void viewer.offsetWidth;
    viewer.classList.add('is-swapping');
    updateLanguageLink();
  }
  function updateLanguageLink() {
    const link = document.getElementById('language-switch');
    if (!link) return;
    const target = new URL(isChinese ? 'index.html' : 'zh.html', location.href);
    target.searchParams.set('lang', isChinese ? 'en' : 'zh');
    if (selected !== 'brief') target.searchParams.set('file', selected);
    target.hash = location.hash;
    link.href = target.href;
  }
  const initialFile = new URLSearchParams(location.search).get('file');
  if (files[initialFile]) openFile(initialFile);
  else updateLanguageLink();
  addEventListener('hashchange', updateLanguageLink);
  document.querySelectorAll('[data-file]').forEach(button => button.addEventListener('click', () => openFile(button.dataset.file)));
  body.addEventListener('click', event => {
    const link = event.target.closest('[data-open-file]');
    if (link) { event.preventDefault(); openFile(link.dataset.openFile); viewer.focus({ preventScroll: true }); }
  });

  const toast = document.getElementById('toast');
  let toastTimer;
  function announce(text) {
    clearTimeout(toastTimer);
    toast.textContent = text;
    toast.classList.add('is-visible');
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 4000);
  }
  async function copyText(text, fallbackElement, success) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      announce(success);
    } catch {
      // file:// and permission-denied contexts still get selectable text.
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(fallbackElement);
      selection.removeAllRanges();
      selection.addRange(range);
      announce(message('copyFallback', 'Text selected. Press Ctrl+C or use your device’s Copy action.'));
    }
  }
  document.getElementById('copy-note').addEventListener('click', () => copyText(`# ${files[selected].path}\n\n${body.innerText}`, body, message('noteCopied', 'Example note copied.')));
  document.getElementById('copy-prompt').addEventListener('click', () => {
    const prompt = document.getElementById('starter-prompt');
    copyText(prompt.innerText, prompt, message('promptCopied', 'Starter prompt copied.'));
  });

  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Unobserved content is always visible, including when JavaScript fails.
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-entering');
      observer.unobserve(entry.target);
    }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element, index) => {
      element.style.animationDelay = `${(index % 3) * 70}ms`;
      observer.observe(element);
    });
  }
  const cover = document.querySelector('.vault-cover');
  if (cover && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let scheduled = false;
    const drift = () => {
      const progress = Math.min(window.scrollY / 700, 1);
      cover.style.transform = `translateY(${-progress * 18}px) rotate(${-3 + progress * 3}deg)`;
      scheduled = false;
    };
    cover.addEventListener('animationend', () => {
      cover.style.animation = 'none';
      drift();
      addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(drift); } }, { passive: true });
    }, { once: true });
  }
})();
