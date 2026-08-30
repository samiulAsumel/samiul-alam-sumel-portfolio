# CLAUDE.md — samiul-alam-sumel-portfolio

Project-specific instructions for Claude Code working in this repo. This
supplements (does not replace) the user's global instructions.

## What this is

Samiul Alam Sumel's personal portfolio: a static site (`index.html` +
`css/style.css` + `js/main.js`) deployed on Cloudflare Pages, plus two CV
`.docx` files generated from the same source facts as the site
(`scripts/generate_cvs.py`). No framework, no build step, no backend.

## Private learning-protocol docs (not for the site)

`private/` (gitignored, added 2026-08-21) holds four personal Claude-session
curriculum prompts the user pastes into other sessions to drive his own
learning: `learning-protocol-germany-visa-v3.3.md` / `ai_product_engineer`
(a 12-month "Build Twice, Explain Thrice" + Drill-First hands-on coding
protocol, explicitly tied to a Germany §19c(2) visa route) and
`learning-protocol-unified-master.md` / `ai_product_founder` (a broader,
long-horizon "AI Product Founder & Engineer" curriculum, Phase 0–23,
business/product/leadership-heavy). `ai_product_engineer` and
`ai_product_founder` are newer copies of the same two curricula and were
found untracked at the repo root on 2026-08-21 — moved into `private/`
immediately; if either reappears at repo root, move it back before staging
anything.

**Policy reversed 2026-08-21 (explicit user instruction, two confirmation
rounds via AskUserQuestion — see commit `feat(site): reposition as AI
Product Engineer, rebuild visual system`).** The site now surfaces the
curricula's **identity, method, and phase roadmap** — not just one generic
line: the "How I Build" section (`#method`) states plainly that projects are
AI-assisted and describes the Tool ≠ Skill principle and the Build → Rebuild
→ Explain discipline; the "Engineering Roadmap" section (`#roadmap`)
publishes the Phase 0–5 plan (English, visa phase dropped) plus a live,
honestly-worded status readout (current phase/module, in progress, last
completed).

**Still never surfaced, no exception:** the Germany §19c(2) visa route, any
salary/rate figures, the MPA reference-letter open item, the self-graded
per-skill matrix with ❌ marks, and any Bengali/Banglish source text — the
site is English-only. Before any future edit near `#method`, `#roadmap`, the
Growth section, or the CVs, grep for `19c|blue card|visa|salary|৳|reference
letter` and for Bengali script (`grep -P '[\x{0980}-\x{09FF}]'`) — both must
return nothing. If asked to update the roadmap/status readout to reflect
real progress, keep it in that same honest-but-generic register: state the
actual current phase/topic, never re-add gap-matrix or visa content.

## Positioning — read before editing content

The site's identity is **AI Product Engineer — Port & Logistics Domain**
(React/Next.js, Node.js/Express, MongoDB). This is a **second deliberate
reversal (2026-08-21, explicit user instruction, two confirmation rounds via
AskUserQuestion)** of the prior "Port Operations Technologist"-primary
identity (set 2026-08-09, itself a reversal of "Product Engineer"-primary
set 2026-07-28). **Do not drift this back toward "Port Operations
Technologist" as the primary title without being explicitly asked** — the
12+ year port-operations background is now positioned as domain context and
the source of every project's problem (see the `#domain` section, née
`#experience`), not the headline. The concrete job targets (AI Product
Engineer / Full-Stack / Frontend / Web Developer / Logistics Systems
Engineer) stay listed alongside the primary title for ATS matching and
junior/mid honesty. Given this identity has now flipped twice in six weeks,
treat any future positioning request as needing the same explicit
confirmation before touching the primary title again.

**Tone (2026-07-28, explicit user correction):** no marketing slogans, no
consulting-deck "identify → analyze → design → build → iterate" arrow-chain
formulas, no emoji-driven "process" step cards. Say what was built and why
in plain sentences — the same register as the rest of this file's hard
content rules. "AI-Assisted Development" (not "AI-Native") is the correct
term: it accurately scopes AI as a tool used during the build, not a claim
that the practice is AI-first. If you catch yourself writing a tagline or
a stepwise methodology graphic for this site, stop and rewrite it as prose.

### Hard content rules (no sugarcoating)

- **Every skill or claim must be traceable** to either (a) a module actually
  *reached* in the Programming Hero course (`Let's Code Your Career -
  Fixed-Main.docx` — 81 modules / 14 milestones total, kept locally, not
  committed; the course was **not finished**, see below — only the portion
  actually studied counts) or (b) a real, verifiable public GitHub repo
  (`github.com/samiulAsumel`). If you're about to add a skill/tech pill,
  grep the course doc or check the actual repo first — don't assume.
- **Do not re-add**: SELinux, Podman, firewalld, Ansible, n8n,
  TypeScript as a *completed* skill (it's real but only "in progress" —
  keep it in the Growth section, not Core Competencies), SQL/Mongoose
  (never covered by the course — the course uses the native MongoDB
  driver), Arabic/German languages (removed at the user's request).
- **RHCSA/RHCE (2026-08-15, reversed again — do not re-add):** the user is
  no longer pursuing RHCSA/RHCE and is not certified. Do not claim or imply
  an in-progress certification track anywhere on the site or CVs. The
  small "Linux & Automation Practice" section (`#infra` on the site;
  "Linux / Automation Practice" in the standard CV) stays, but framed only
  as daily Linux/Ubuntu use plus self-directed Bash automation practice —
  no RHEL, no RHCSA/RHCE, no certification-track language. It is backed by
  real public repos: `auto-deploy-pipeline`, `auto-ssl-manager`,
  `log-analyzer-alert` (all verified public Shell repos under
  `github.com/samiulAsumel`) — keep those, drop the cert framing around them.
- **The Programming Hero course is NOT completed (corrected 2026-08-21,
  explicit user correction) — do not claim or imply it is finished
  anywhere, on the site or in either CV.** The user worked through a real,
  meaningful portion of it (HTML/CSS, JavaScript, React, part of
  Node/Express and Next.js) between Jul 2025 and Aug 2026, then
  stopped/is not continuing it — no exact module or milestone count is
  available, so don't invent one; frame it as self-directed study, not a
  completed credential, and drop any 100%-progress-bar or
  checkmark-list-as-proof-of-completion treatment. The skill pills it used
  to justify (React, Node/Express, MongoDB, Next.js, etc.) remain valid —
  they're backed by real shipped projects plus the AI-assisted-development
  framing (see the `skill-tiering-odin` memory), not by a finished course.
  Current active self-study, purely for code comprehension (not a second
  certificate): The Odin Project, starting from its "Intermediate HTML and
  CSS" course inside the Full Stack JavaScript path, then Full Stack Open
  (fullstackopen.com).
- Job history (Mongla Port Authority, both roles) is real and is now part
  of the headline positioning, not just background — see Positioning above.
- **9 featured projects** (2026-08-28: added Outreach Copilot and SalahSync
  after a GitHub + Cloudflare dashboard sweep — see below), each verified
  before use — don't assume link status, re-check if it's been a while:
  - Live + GitHub, in daily production use: Port Billing Calculator
    (`portbill`), carview, OT Bill Management System (`otbill`), Client
    Intake Form.
  - Live + GitHub, not production tools: World Kitchen Atlas
    (`world-kitchen-atlas`, live at `kitchenatlas.pages.dev`), Outreach
    Copilot (`outreach-copilot`, live frontend at
    `outreach-copilot.pages.dev` + a separate live API Worker), SalahSync
    (`salahsync`, live at `salahsync.pages.dev` — personal PWA, entire
    README/UI is in Bengali but the site card is English-only, per the
    Bengali-script grep check below).
  - **Explicitly excluded, do not add** (found in the same 2026-08-28
    sweep): `pts-sas` (personal 880-lesson curriculum tracker; its own
    README names "Germany EU Blue Card" as a target market and RHCSA/RHCE
    tracks — exactly the content the rules below ban) and
    `devops-command-summary` (a RHCSA/DevOps/SELinux/Ansible/Podman command
    reference — directly hits the banned-terms grep). Both are real,
    live-deployed repos; they are excluded on content-policy grounds, not
    because they're unverified. `deskora` (live at
    `deskora.sasas.workers.dev`) was deliberately deferred — its own README
    says the core booking/concurrency logic (the actual selling point) is
    still a skeleton; revisit once M4 (the concurrency tests) lands.
    `onboard-signup-form` (GitHub only, no live link, Odin Project exercise
    extended) was deferred as too small to add given the site's project
    bar.
  - GitHub only, **no working live link** — do not label "Live":
    `pcs-port-system` (its only public URL is a GitHub Pages *docs* site,
    not a running app — label as "Architecture Showcase" with a Docs
    link) and `jarvis` (Vercel deploy times out, GitHub Pages only
    renders the README — GitHub-only card, explicitly noted as
    "source available, no public demo").
  Don't add project cards for anything not actually deployed/pushed (e.g.
  course exercises like "Zap Shift" or "Payooo" only count once they're
  actually public with a real repo). A standalone "Sasumel" project card
  (from the Personal Brand Kit) is **not yet added** — check it's live
  with a public repo before adding.

## Keeping the site and CVs in sync

`index.html` (Skills, Services, Experience, Projects, Infra, Growth
sections) and `scripts/generate_cvs.py` (`SKILLS`, `PROJECTS`,
`ADDITIONAL_PROJECTS`, `INFRA_NOTE`, `COURSE_SUMMARY` constants) must tell
the same story. When you change one, change the other, then regenerate:

```bash
python3 scripts/generate_cvs.py
```

Verify page count stays at 2 pages per CV (`soffice --headless
--convert-to pdf ... && pdfinfo`) — if it grows to 3, tighten spacing in
the script's helper functions before adding more content.

## Style conventions already in place

- CSS: single `css/style.css`, design tokens in `:root`, BEM-ish flat class
  names (`.sk-card`, `.pc-ds`, `.dc-note`), mobile-first isn't used but
  `@media(max-width:900px/768px/480px)` breakpoints are — check all three
  after layout changes.
- Body-copy paragraphs (`.h-desc`, `.ab-text p`, `.svc-intro`, `.svc-desc`,
  `.pc-pb`, `.pc-ds`, `.dc-note`, `.ct-text p`) are `text-align: justify`
  with `hyphens: auto`. Keep this pattern for any new long-form paragraph
  class; never justify nav links, buttons, tags/pills, or bulleted lists
  (`.tl-ul`, `.dc-ul`, `.svc-ready-item`) — it looks wrong on short/flex
  content.
- `js/main.js` is vanilla JS, no dependencies. Don't add a framework for a
  single-page static site.
- Bump `CACHE_NAME` in `sw.js` (`sas-portfolio-vN` → `vN+1`) on **every**
  content change to `index.html`/`css`/`js` — the service worker is
  cache-first and stale content will otherwise stick for return visitors.

## Before pushing

1. Tag-balance check (`grep -c` open vs. close on `div`/`section`/`a`, or
   just view in a browser).
2. `grep -niE 'selinux|podman|devops|ansible|n8n|rhcsa|rhce|rhel'` on
   `index.html` should return nothing at all — see Positioning above.
2a. `grep -niE '19c|blue card|visa|salary|৳|reference letter' index.html
   scripts/generate_cvs.py` and `grep -P '[\x{0980}-\x{09FF}]' index.html
   scripts/generate_cvs.py` should both return nothing — see Private
   learning-protocol docs above.
3. Load the page locally, check the browser console for errors, click
   through nav anchors and both CV download buttons.
4. Regenerate CVs if content changed; check they're still 2 pages.
5. Only stage files relevant to the site/CVs. `learning.txt` and `Let's
   Code Your Career - Fixed-Main.docx` are the user's personal working
   documents (source material, not site content) — do not commit them
   unless explicitly asked.
6. Commit with a Conventional Commits message (`feat(site): ...`,
   `fix(site): ...`) and only push when the user has asked for it.
