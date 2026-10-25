# BrainCarry website

[English](https://tyyy-z.github.io/brain-carry/?lang=en) · [中文](https://tyyy-z.github.io/brain-carry/zh.html)

This branch contains the static website. The skill, tests and release instructions live on [main](https://github.com/tyyy-z/brain-carry).

Edit index.html for English copy, translations/zh-CN.json for Chinese copy, site.config.js for downloads, styles.css for appearance and script.js for the English demo. Run `python scripts/build_locales.py` after copy edits to generate zh.html and i18n.js. No npm or hosting build is required.

The header language link remembers a choice locally and preserves the selected demo file and section. Both language pages remain readable without JavaScript. Filenames and commands stay in English. Reciprocal hreflang links and distinct canonical URLs identify both versions.

Open index.html or zh.html locally, or serve this directory with a local HTTP server. GitHub Pages publishes this branch's root. See [website maintenance](https://github.com/tyyy-z/brain-carry/blob/main/docs/website.md).

Font credits, sources and licenses: [assets/FONTS.md](assets/FONTS.md). Cabinet Grotesk provides Latin type; a local Noto Sans SC subset provides Chinese glyphs. The interview-preparation example is fictional. No private vault data is included.
