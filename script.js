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

  // Fictional interview notes use the real file structure. No personal data or network requests.
  const englishFiles = {
  "brief": {
    "path": "AI_BRIEF.md",
    "caption": "Your background and how you like to work.",
    "html": "<p class=\"viewer-title\">Start with<br>what matters.</p><p>I’m preparing for a customer support interview next week.</p><p><strong>How I like help</strong><br>Keep practice sessions short. Give direct feedback. Ask before sharing personal details.</p><p><strong>Next step</strong><br>Open <a href=\"#demo\" data-open-file=\"synthesis\">[[Interview prep]]</a> and help me practice a 60-second introduction.</p><p class=\"viewer-source\">Source: raw/interview-request.md · S-DEMO-01 · Fictional example</p>"
  },
  "source": {
    "path": "raw/interview-request.md",
    "caption": "The original request, kept as a reference.",
    "html": "<p class=\"viewer-title\">What I<br>actually said.</p><p>“My customer support interview is next week. Help me prepare a 60-second introduction. I prefer short practice sessions and direct feedback.”</p><p><strong>What this tells us</strong><br>The goal and preferences came from this request. It does not say any practice is complete.</p><p><strong>Source details</strong><br>S-DEMO-01 · Fictional user request<br>Source date and recorded date: 2026-10-25</p><p class=\"viewer-source\">Saved plan: <a href=\"#demo\" data-open-file=\"synthesis\">wiki/interview-prep.md</a></p>"
  },
  "synthesis": {
    "path": "wiki/interview-prep.md",
    "caption": "The current plan and the next thing to do.",
    "html": "<p class=\"viewer-title\">Interview prep</p><p><strong>The goal</strong><br>Prepare for a customer support interview next week.</p><p><strong>Where we are</strong><br>A 60-second introduction is the first task. No practice session is recorded yet.</p><p><strong>What the next assistant should do</strong><br>Ask me to try my introduction, then give short, direct feedback.</p><p><strong>Based on</strong><br><a href=\"#demo\" data-open-file=\"source\">raw/interview-request.md</a> [S-DEMO-01]</p><p class=\"viewer-source\">Updated 2026-10-25 · Fictional example</p>"
  },
  "log": {
    "path": "log.md",
    "caption": "A short record of what was saved or changed.",
    "html": "<p class=\"viewer-title\">Ready for the<br>next assistant.</p><p><strong>2026-10-25 · Interview plan saved</strong></p><ul><li>Saved the original request in raw/interview-request.md.</li><li>Added the goal and feedback preferences to the brief.</li><li>Created wiki/interview-prep.md with the next practice task.</li><li>Linked the plan from index.md.</li></ul><p><strong>Still to do</strong><br>Practice the introduction. A saved plan is not a completed session.</p><p class=\"viewer-source\">Source: <a href=\"#demo\" data-open-file=\"source\">S-DEMO-01</a> · Fictional example</p>"
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
