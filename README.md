# AI Video Creation Tutorial

A practical tutorial hub for creating high-resolution AI videos using Claude, Google Gemini (Veo), Meta AI, and finishing tools.

**Live site:** https://dwolfpack.github.io/ai-video-tutorial/

## Pages

- [index.html](index.html) — hub landing page linking to everything below
- [tutorial.html](tutorial.html) — the full guide (pipeline, Claude prompting, Veo, Meta AI, upscaling)
- [workshop.html](workshop.html) — hands-on, fill-in-the-blank exercises that assemble a ready-to-paste Claude prompt
- [prompts.html](prompts.html) — a filterable library of tested video-generation prompts by genre
- [he/tutorial.html](he/tutorial.html) — Hebrew (RTL) translation of the tutorial
- [ai-video-creation-tutorial.md](ai-video-creation-tutorial.md) — markdown source of the original tutorial

## Notes

- All pages are self-contained static HTML (no build step) — safe to open locally or serve via GitHub Pages.
- `assets/og-image.svg` and `assets/favicon.svg` are used for social-preview cards and the browser tab icon.
- **Producing an actual demo video** (the "show it working" idea) needs a human in the loop: it requires an authenticated Google AI Pro/Ultra or Meta AI account to actually generate clips. The [workshop](workshop.html) and [prompt library](prompts.html) pages are set up so you can walk through that yourself using the site's own workflow, then drop the finished video into a future `demo/` folder.
- Analytics were intentionally left out — adding a third-party analytics snippet (e.g. GoatCounter/Plausible) requires creating an account, which needs to be done by a person, not automated. Wire one up whenever you're ready to track visits.
