# CLAUDE.md — samiul-alam-sumel-portfolio

Project instructions for Claude Code. They supplement the user's global instructions; where the two
disagree, the global safety rules win. Last rewritten 2026-10-15 to match the site as deployed.

## What this is

MD Samiul Alam Sumel's portfolio: a static site (HTML, CSS, vanilla JS) on Cloudflare Pages, plus two CVs
(DOCX and PDF) generated from the same facts. No framework, no backend, no JS bundler. CSS has one build step.
Deploy = push to `main` (Pages builds from GitHub; allow 1 to 3 minutes).

## Commands

```bash
# Serve locally. Use a no-store server: Chrome caches python's default CSS and shows stale styles.
python3 - <<'EOF'
import http.server, socketserver
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self): self.send_header('Cache-Control', 'no-store'); super().end_headers()
class S(socketserver.ThreadingTCPServer): allow_reuse_address = True
S(('127.0.0.1', 8766), H).serve_forever()
EOF

python3 scripts/build_css.py            # after ANY css/*.css edit; `--check` lists stale bundles
python3 scripts/minify_html.py          # after editing any page (strips indentation)
python3 scripts/generate_sitemap.py     # after adding or editing a page (reads git dates; 404 excluded)
```

CVs (needs `python-docx`; use a throwaway venv, never global Python):
`python3 -m venv /tmp/v && /tmp/v/bin/pip install python-docx && /tmp/v/bin/python scripts/generate_cvs.py`, then
`soffice --headless --convert-to pdf --outdir <dir> <docx files>` and copy the PDFs to the repo root.
Both CVs must stay exactly 2 pages (`pdfinfo`). If a third page appears, shorten text first.

Lighthouse is not a dependency. A copy is cached under `~/.npm/_npx/*/node_modules/lighthouse`; run it with
`CHROME_PATH=/usr/bin/google-chrome node <that>/cli/index.js <url> --chrome-flags="--headless=new --no-sandbox"`
(add `--preset=desktop` for desktop). Local numbers are not field numbers; say "local" when quoting them.

## Repository map

| Path | Purpose |
|---|---|
| `index.html` | Homepage (8 sections, below) |
| `about/ capabilities/ experience/ resume/ privacy/ engineering/**` | Section pages (`<dir>/index.html`) |
| `projects/*.html` | Case studies: portbill, carview, otbill, opsflow, client-intake-form, salahsync, world-kitchen-atlas, english-mastery, portfolio-site |
| `css/*.css` | Sources. Pages load ONE bundle each: `css/bundle-<group>.min.css`, groups in `scripts/css-bundles.json` |
| `css/tokens.css` | The only place raw colours, scales and durations live |
| `js/` | `main.js` (nav, command palette), `ux.js` (scroll-spy, progress bar), `hero.js`, `contact.js`, `how-i-build.js`, `opsflow.js`, `case-study.js`, `capabilities.js` |
| `sw.js` | Service worker, cache-first. Bump `CACHE_NAME` (`sas-portfolio-vN`) on EVERY change to HTML, CSS or JS |
| `_headers`, `_redirects` | Cloudflare headers (CSP etc.) and the old-CV-filename redirects |
| `llms.txt`, `robots.txt`, `sitemap.xml`, `.well-known/security.txt` | Discovery files |
| `MD-Samiul-Alam-Sumel-CV.*`, `...-Project-CV.*` | CVs: "Global Operations & Systems CV" and "Product Building CV (remote / contract)" |
| `scripts/` | Build and generator scripts |
| `CONTRA_PROFILE.md`, `Samiul_Alam_Sumel_Cover_Letter.docx` | Freelance profile and cover-letter template (fill `[Role]`, `[Company]` per use) |
| `private/`, `DESIGN.md`, `.playwright-mcp/` | Never published (gitignored) |

## Identity and tone

- Identity everywhere: **Web Developer · Business Systems & Workflow Automation**, plus the tag line "AI-Assisted Product Builder".
  Homepage H1: "I build systems that take manual work off your team." "Business process automation" is a domain term only.
  Never "AI engineer"; "Product Engineer" appears only as a target role. JSON-LD `jobTitle` is the real current title
  (Senior Outdoor Assistant, Revenue Branch, Traffic Department), never a target role.
- Plain sentences, no marketing slogans, no emoji. "AI-assisted development" (not "AI-native"): AI is a tool during the build;
  requirements, rules, review and testing stay with the author.
- Changing the primary title needs the user's explicit confirmation. It has changed many times.
- The hero text (incl. the word "approvals") is kept at the user's request. No system on the site demonstrates an approval
  workflow, so do not add further "approvals" claims anywhere else.

## Content rules (hard)

- Every claim must trace to real code, a live site, CI, or something the user confirmed. Never quote an unmeasured metric. Numbers
  allowed because a case study states them: eight locations, seven charts, thirteen report sections (CarView); 295 dish pages in
  7 countries (World Kitchen Atlas); 88 lessons, 87 writing tasks and 87 speaking drills (English Mastery); 18 form sections
  (Client Intake). Re-verify before changing them. Repo READMEs can be stale; check the live site.
- No percentage bars, ratings, certificates or time-saving figures.
- Skills follow the `/capabilities/` tiers (Proven / Working knowledge / Currently developing / Engineering practice). Linux and
  Bash appear only as small self-directed practice, never as a DevOps identity. Do not list: MongoDB, Docker, PostgreSQL, Vercel,
  SELinux, Podman, firewalld, Ansible, n8n, RHEL, German or English-as-a-skill.
- No RHCSA/RHCE claim or in-progress certification track. The Programming Hero course is NOT completed; never imply it is.
  Self-study is "The Odin Project, then Full Stack Open, not certificates".
- Education is exactly "Higher Secondary Certificate (HSC), Business Studies, 2011" on the site (no institutions or scores).
  The CVs may add institution names. Languages: Bengali (native), English (professional).
- Experience facts: Mongla Port Authority, Traffic Department, Nov 2013 to present. Junior Outdoor Assistant Nov 2013 to Nov 2017;
  Senior Outdoor Assistant (Revenue Branch) Nov 2017 to present. User-confirmed areas: container tallying and statistics;
  stuffing, delivery and shipping bills and demurrage; customs-related vehicle (auction) reporting; challan workflow and monthly
  statements; shipping-agent and stevedoring coordination. Career milestones carry no dates. No management or volume claims.
- Port Billing: C&F agents, importers and shipping agents ask what a bill will be; revenue staff used to work each estimate out
  by hand or in Excel. Port staff use the calculator; agents still work from paper. Rule order: slabs, payable charges into
  the base, VAT on the base, levy added after VAT (re-check `portbill` `src/car.js` before editing the flow).
- OT Bill is overtime billing, not payroll. CarView is quantity and movement tracking, not GPS. Keep the word "guaranteed"
  in CarView's offline sentence (a site-analyzer trust check keys on it).
- OpsFlow: never say customers, revenue or live SaaS. Labelled "In development". Status source is the private repo; as last
  checked (HEAD 4478e5e): implemented = tenancy, auth and roles, master data (API), fleet, quotations; in development = orders and
  trips; planned = invoices, payments, outstanding balances, reports. Every dashboard image is labelled "Concept". Re-check the
  repo before changing any label.
- Never publish: salary or rate figures, job-search or relocation specifics, private study documents, or any Bengali text on the
  site (it is English-only; images of the real UIs are the one exception). Before pushing, both of these must print nothing:
  `grep -niE '19c|blue card|visa|salary|reference letter|selinux|podman|ansible|n8n|rhcsa|rhce|rhel' index.html scripts/generate_cvs.py`
  `grep -P '[\x{0980}-\x{09FF}]' index.html scripts/generate_cvs.py`
- Do not stage the user's personal working files (`learning.txt`, `Let's Code Your Career - Fixed-Main.docx`).

## Homepage

Sections, in order: `#hero`, `#work`, `#experience`, `#how-i-build`, `#decisions`, `#opsflow`, `#faq`, `#contact`.
Nav: Systems / Experience / How I Build / Expertise (/capabilities/) / About / CV / Contact.

- **One idea per section.** Do not reintroduce a section that repeats another (removed as duplicates: credentials strip, "What I
  automate", capabilities summary, repeated decision cards, the AI-workflow chain, the process chain on case studies).
- `#hero`: outcome-led H1, role line, tag line, sub-headline, hook line ("Done by hand / email / spreadsheet ? I'll turn it into a
  system."), CTAs ("See live systems", "Contact me"), proof chips (12+, 3, 8+), and the "What do you need built?" selector
  (`#hero-cap`, ARIA tabs: Billing, Tracking, Overtime, Web apps) driven by `js/hero.js`.
- `#work`: three production systems as By hand / Now cards (Port Billing flagship, CarView, OT Bill) with real screenshots and
  honest captions, then "Other engineering work" cards (Live or Source only, stack, links to the live app, case study and GitHub).
- `#how-i-build`: seven stages (Observe to Ship) as tabs from 900px up, collapsing on phones; "A Real Example of the Approach"
  walks the same stage names through Port Billing and CarView using only published text.
- `#faq` and its FAQPage JSON-LD must be word-for-word identical. Its Lighthouse sentence is a measured, dated result: re-measure
  before editing it.
- `#contact`: composer on the left, "Elsewhere" links and the CV picker on the right (see Behaviours).
- The 8+ live deployments are: portbill, opsflow (`opsflow.sasas.workers.dev`; `opsflow91.pages.dev` no longer resolves), clif91,
  salahsync, kitchenatlas, outreach-copilot, englishmastery, this site (carview and otbill are extra). Recount if one is retired,
  and keep the JSON-LD `ItemList` in step.
- Budget: keep the homepage under 1500 DOM elements (static about 1165, about 1450 after JS runs). Prefer text over extra list items.
- Case studies share the `otbill.html` shell. New pages need a `BreadcrumbList` JSON-LD block. Cloudflare Pages 308-redirects
  `/x.html` to `/x`: link, canonicalise and sitemap by the extensionless URL. `404.html` keeps root-absolute asset paths and no
  canonical tag.

## Design system (`DESIGN.md`, local only, supersedes older style notes)

- Dark only, one accent `#4DB8D0`. Primitives are in `css/tokens.css` (`--bg`, `--surface-1/2`, `--text`, `--text-muted`, `--accent`,
  `--on-accent`, `--border-subtle`, `--border-control`, status colours); older `--color-*` and legacy names alias onto them. Never
  write a hex value in a component. No light theme or toggle.
- Banned: shadows (except the modal), gradients, blur, glow, emoji icons, keyframe animations, view transitions, scroll-reveal
  (only the hero fades in), a second accent colour, centred long paragraphs, the same diagram on several pages.
- Scales: spacing 4/8/12/16/24/32/48/72/112; radius 8 (controls) and 12 (cards); container 1120; type 0.75 to 3.5rem; body 16px at
  line-height 1.6; buttons at least 44px tall; links underlined in running text; focus ring `2px solid var(--accent)`, offset 3px.
- **Deliberate exceptions (user decisions):** the hero keeps count-up numbers, the auto-stepping selector, its fade-in and the
  justified lead paragraphs; the homepage screenshots show the real live apps (see Projects) instead of "fictional data".
- Derived values: `color-mix()` tints of the accent, status colours and muted text; `--radius-full` for status dots; two extra teal
  shades in `favicon.svg` and the app icons.
- Fonts are self-hosted Inter and JetBrains Mono (`assets/fonts`, latin subset) plus a metric-matched `Inter Fallback` that keeps
  layout shift at 0. Do not add Google Fonts or any third-party origin without updating the CSP in `_headers`.
- Re-check contrast with Lighthouse after any colour change (10 pages scored 100 for accessibility on 2026-10-14).

## Projects: status and privacy

| System | Public status on the site | Notes |
|---|---|---|
| Port Billing | Live · daily use, link to `portbill.pages.dev` | Repo is private: no GitHub link. Homepage image is a real guest-mode capture. |
| CarView | Live · daily use, case study only | Homepage image is a real capture of the public read-only view (shows the authority name and aggregate figures, by the user's explicit decision). Case study stays synthetic. |
| OT Bill | Live · daily use, case study only | Real data includes employee names, IC numbers and salaries. **Claude must not browse `otbill.pages.dev`**; the user supplies any new capture (homepage uses their own cropped screenshot of the empty dashboard). |
| OpsFlow | In development | Private repo, early build at `opsflow.sasas.workers.dev`. |
| Client Intake Form, SalahSync, World Kitchen Atlas, English Mastery, Outreach Copilot | Live | Plain "Live" badge; SalahSync is a personal tool and says so. |
| Anchora Commerce, JARVIS | Source only | Portfolio build, no live demo; link to GitHub. |

Deliberately not featured: `deskora` (booking logic still a skeleton; the old Workers URL returns 404), `talentforge-ai` (no
evidence), `pcs-port-system` (Kafka/EKS/Terraform would imply a DevOps identity), the Linux and Bash repos, `pts-sas`,
`devops-command-summary`, and the private repos `serviceflow` and `postcadence`. `portbill-thumb.webp` is unused but kept.
Do not add a card for anything that is not deployed or public with a real repo.

## Behaviours

- `js/hero.js` (homepage): counters, selector. One-shot: steps through the tabs once, rests on the first, and hover, focus or click
  takes over. Arrow keys, Home and End work. Honours `prefers-reduced-motion`.
- `js/contact.js`: purpose chips (hiring, business system, logistics product, other) write a short WhatsApp message
  (`wa.me/8801312312512`) and a detailed email (`mailto:` with subject and body) into the two rows `#cc-wa` and `#cc-mail`, editable
  under "Preview and edit the messages", with Copy buttons and a `[brackets]` reminder. Without JavaScript both rows still work.
  Nothing is sent or stored. Keep the templates honest (no promises about price, speed or availability).
- `js/main.js`: nav, command palette (`CMDK_ITEMS`), mobile menu. `js/ux.js`: scroll-spy via `data-spy`, progress bar.
- Every control must work by keyboard, and the console must be clean.

## Platform notes

- `_headers` sets a strict CSP (`script-src 'self'`, one hashed inline `speculationrules` block, Cloudflare Web Analytics).
  If that `speculationrules` JSON changes, recompute its sha256. Cloudflare Web Analytics must be enabled in the Pages dashboard.
- `/.well-known/security.txt` expires 2027-10-06: renew it. Unfixable: CAA record on `pages.dev`, SRI on the injected beacon.
- Old CV filenames redirect through `_redirects`.
- `sitemap.xml` and `llms.txt` list pages; keep `llms.txt` statements true (homepage shows real screenshots; the CarView and
  OT Bill case studies use labelled mockups).

## Before pushing

1. `python3 scripts/build_css.py --check` clean; `minify_html.py` and `generate_sitemap.py` run; `sw.js` cache bumped.
2. Tag balance on the pages touched; no broken internal links; FAQ text equals its JSON-LD.
3. The two greps under Content rules print nothing.
4. Local browser check: console clean, keyboard path works, no horizontal scroll at 390px.
5. CVs regenerated if facts changed, and still 2 pages.
6. Stage only site files (never `.playwright-mcp/`, `private/`, `DESIGN.md`, personal documents). Review `git diff --cached`.
7. Conventional Commit (`feat(site): ...`, `fix(site): ...`, `docs(cv): ...`). Push to `main` only when the user asks.
