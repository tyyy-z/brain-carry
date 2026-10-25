# BrainCarry website

The public landing page is published with GitHub Pages at:

**https://tyyy-z.github.io/brain-carry/**

The site source lives at the root of the **gh-pages** branch. The **main** branch keeps the skill, documentation, tests and release allowlist. This separation keeps website fonts and artwork out of the skill package.

## Edit the site

Open the gh-pages branch and edit:

| File | What to change |
| --- | --- |
| index.html | English page copy and default links that work without JavaScript |
| site.config.js | Repository URL, download URL and displayed source/release label |
| styles.css | Color/type tokens and responsive layouts |
| script.js | Synthetic four-file example and interactions |
| assets/braincarry-banner.png | Public README and social-preview image |

Preview locally by opening index.html. For an HTTP preview with Python, run `python -m http.server 4173 --bind 127.0.0.1` from the website checkout.

Commit reviewed edits to gh-pages to publish them. Pages is configured to publish from that branch's root. This is a website publishing process; it does not back up or synchronize a personal vault.

## Keep copy accurate

- Check main's README, SKILL.md and transports reference before updating claims.
- The recommended setup is Engram Cloud + Obsidian, with per-client authorization and real read/write checks. Local-only Markdown remains an offline fallback.
- Shared cloud notes do not change a model's built-in memory or reload an active conversation automatically.
- The primary download is currently main's source ZIP. The initial v0.1.0 release predates the cloud-first documentation updates; do not label it as containing them.
- Keep the interview-preparation example and S-DEMO-01 labeled as fictional. Use ordinary scenarios such as job interviews, study plans, side projects or writing. Never replace the example with a private vault screenshot.

## Publication checks

Check the full page on desktop, tablet and phone; exercise source links, copy buttons and keyboard navigation; confirm the release/source URL; check reduced motion and JavaScript-disabled fallback. Verify the published URL, not just a local preview.

Cabinet Grotesk is by Indian Type Foundry / Fontshare. Source and license information are retained in the website's assets/FONTS.md and footer.

## English / Chinese

Use the header's 中文 / English link to switch language. The homepage defaults to English even if a browser previously saved a Chinese preference. Selecting the language link or visiting a language-specific URL explicitly chooses that language. The link preserves the selected example file and section. English: https://tyyy-z.github.io/brain-carry/?lang=en . Chinese: https://tyyy-z.github.io/brain-carry/zh.html .

The two static pages have their own lang, canonical and reciprocal hreflang links. Both remain readable without JavaScript; filenames, commands and product names stay in English.

Edit index.html for English copy and translations/zh-CN.json for Chinese copy. In the website branch checkout run:

```text
python scripts/build_locales.py
```

Commit the generated zh.html and i18n.js along with source changes. language.js routes explicit language URLs without a stored preference overriding the English homepage; script.js manages the demo. The generator uses Python's standard library and checks that English source strings still match their translations. Hosting remains static with no build step. Chinese glyphs use a local Noto Sans SC subset; font source/license and subset update guidance are in assets/FONTS.md.

## Writing for the public

Lead with what a person can do and a familiar example. Explain the next action before introducing filenames or architecture. Define necessary terms once. Keep metadata, synchronization limits and concurrency mechanics in the technical guides. Update both languages, demo states and no-JavaScript fallback together; regenerate the Chinese font subset when adding glyphs.
