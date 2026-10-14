# Samiul Alam Sumel — Portfolio

Portfolio of **MD Samiul Alam Sumel**, a web developer who builds business systems and internal tools, with 12+ years of
operations experience at Mongla Port Authority, Bangladesh. The site shows the systems he built to replace manual work
(port billing, vehicle tracking, overtime billing), how he builds them, and how to get in touch.

**Live:** https://sasumel.pages.dev/

It is a static site (HTML, CSS and vanilla JavaScript) hosted on Cloudflare Pages. There is no framework and no backend.
CSS has one build step; everything else is hand-written.

## What is on the site

| Page | Content |
|---|---|
| `/` | Hero with a "What do you need built?" selector, three production systems, other engineering work, experience summary, how I build, engineering decisions, OpsFlow, FAQ and a contact composer |
| `/about/`, `/experience/`, `/capabilities/`, `/resume/` | Background, full operations profile, skills by evidence tier, CV downloads |
| `/engineering/` | Method, AI-assisted development, two real bug fixes, roadmap |
| `/projects/*` | One case study per system: Port Billing, CarView, OT Bill, OpsFlow (in development), Client Intake Form, SalahSync, World Kitchen Atlas, English Mastery, this portfolio |
| `/privacy/`, `/llms.txt`, `/.well-known/security.txt` | Privacy and cookies, a plain-text summary for AI tools, security contact |

## Requirements

- Python 3 (build scripts and local server).
- A modern browser.
- To regenerate the CVs: [`python-docx`](https://python-docx.readthedocs.io/) (in a virtual environment) and LibreOffice (`soffice`) for the PDFs.

## Run it locally

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

Chrome caches the default server's CSS aggressively. If styles look stale, serve with `Cache-Control: no-store` or hard-reload.

## Build commands

Run these after editing, then commit the generated files.

```bash
python3 scripts/build_css.py          # css/*.css  ->  css/bundle-<group>.min.css  (--check lists stale bundles)
python3 scripts/minify_html.py        # strips indentation from every page
python3 scripts/generate_sitemap.py   # rebuilds sitemap.xml from the pages and git dates
```

Each page loads one CSS bundle. The groups are defined in `scripts/css-bundles.json`; a new CSS file must be added to the right group.
Bump `CACHE_NAME` in `sw.js` on every content change, because the service worker is cache-first.

## CVs

Two CVs are generated from the same facts as the site, so they cannot drift apart:

- `MD-Samiul-Alam-Sumel-CV` — Global Operations & Systems CV, for operations, process automation and business-systems roles.
- `MD-Samiul-Alam-Sumel-Project-CV` — Product Building CV, for remote and contract work.

```bash
python3 -m venv /tmp/cvenv && /tmp/cvenv/bin/pip install python-docx
/tmp/cvenv/bin/python scripts/generate_cvs.py            # writes both .docx files to the repo root
soffice --headless --convert-to pdf --outdir /tmp/cvpdf MD-Samiul-Alam-Sumel-CV.docx MD-Samiul-Alam-Sumel-Project-CV.docx
```

Edit the content constants in `scripts/generate_cvs.py`, not the generated files. Each CV must stay at two pages.

## Quality checks

Before pushing: build scripts run, no broken links, one `<h1>` per page, no console errors, no horizontal scroll at 390px, and
the FAQ text equals its structured data. Lighthouse results (local, 14 October 2026): ten pages scored 100 for accessibility,
best practices and SEO; homepage desktop performance 100, mobile performance 92 to 98. These are local lab numbers, not field data.

## Deployment

Cloudflare Pages is connected to this repository and deploys `main`. Pushing to `main` is the deploy. Allow one to three minutes.
Security headers and the content security policy live in `_headers`; redirects for the old CV filenames live in `_redirects`.

## Repository layout

```
index.html, about/, capabilities/, experience/, resume/, privacy/, engineering/, projects/   pages
css/        sources, tokens.css (design tokens) and the generated bundle-*.min.css files
js/         main, ux, hero, contact, how-i-build, opsflow, case-study, capabilities
assets/     self-hosted fonts, brand mark, screenshots
scripts/    build_css, minify_html, generate_sitemap, generate_cvs, generate_cover_letter
sw.js, manifest.json, _headers, _redirects, robots.txt, sitemap.xml, llms.txt
CLAUDE.md   rules for AI-assisted work in this repository
```

## Content and privacy policy

- Every claim on the site and in the CVs has to trace to real code, a live site or something the author confirmed. Nothing is invented.
- Some screenshots show real live apps. They contain no personal records; a screenshot with employee data is never published.
- Fonts and scripts are self-hosted. The only third-party service is cookie-free Cloudflare Web Analytics.
- Private notes and working documents are kept out of the repository.

## Credits and licence

Fonts: [Inter](https://rsms.me/inter/) and [JetBrains Mono](https://www.jetbrains.com/lp/mono/), both under the SIL Open Font License,
self-hosted. Site content and code © 2026 MD Samiul Alam Sumel, all rights reserved.

## Contact

sa.sumel91@gmail.com · [LinkedIn](https://linkedin.com/in/samiul-alam-sumel) · [GitHub](https://github.com/samiulAsumel)
