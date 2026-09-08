# Contra Profile — Copy/Paste Content

> Re-synced against the current source of truth in this repo — `scripts/generate_cvs.py`
> (`SKILLS` / `PROJECTS` / `ADDITIONAL_PROJECTS`) and `CLAUDE.md`'s positioning + content-policy
> sections — since the previous version of this file predated the September 2026 title change
> and had gone stale on a few project details. See **What changed in this pass** at the bottom.

## Headline (one-liner)

Product Engineer for Real-World Operations | React · Next.js · Node.js — 3 tools in daily port production use

## Short Bio (compact bio field, ~2–3 sentences)

12+ years of hands-on port operations experience at Mongla Port Authority (wharfrent billing,
cargo/vehicle tracking, C&F agent workflows) combined with full-stack development (React,
Next.js, Node.js, MongoDB). I've independently designed, built, and shipped 3 web tools now
in daily use by C&F agents and the Traffic Department at Mongla Port — real production
software solving real workplace problems, not class projects.

## Full About / Overview

I'm a Product Engineer for Real-World Operations — a port-operations insider who also
personally designs and ships the software that runs port operations. Not a generalist
developer, not a pure ops person: the combination of domain judgment and engineering execution.

I bring 12+ years of professional experience at Mongla Port Authority — Bangladesh's
second-largest international seaport — working in wharfrent billing, cargo dwell-time
management, terminal operations, and C&F agent coordination.

I used that operational background to identify real workplace problems and built 3
self-initiated web applications that are still used daily by C&F agents and port staff at
Mongla Port. Alongside that, I worked through a large part of an intensive, project-based
full-stack curriculum (HTML/CSS, JavaScript, React, part of Node.js/Express and Next.js),
and go deeper through self-directed study (The Odin Project, Full Stack Open) and
AI-assisted development (Claude Code) for backend and data work.

Describe the workflow and where it breaks down, and I'll ask questions until the requirement
is clear and written down — using 12+ years of port operations experience to judge what
actually fits — then design, build, and deploy the solution. Every build gets manually
tested against the real business rules before I call it done.

I'm open to remote work worldwide, no time zone constraints, on:

* Full-stack web apps (React/Next.js frontend, Node.js/Express + MongoDB backend)
* Billing & tracking dashboards
* Turning paper/Excel-based workflows into deployed web tools
* Port, logistics, or operations-adjacent software (my specialty)

Every project below is publicly verifiable before you hire.

## Skills / Tags

Domain: Port billing & tariff systems, wharfrent/VAT/levy calculation, cargo & vessel
tracking, C&F agent workflows, customs/regulatory compliance context

Frontend: HTML5 (Semantic), CSS3, Responsive Design, Tailwind CSS, DaisyUI, JavaScript
(ES6+), React (Hooks, Context), React Router, React Hook Form, TanStack Query, Axios,
Next.js (App Router), NextAuth

Backend & Data: Node.js & Express, REST APIs (CRUD), MongoDB (Atlas), Aggregation Pipeline,
JWT Auth, Firebase Auth & Admin SDK, Next.js API Routes, Stripe Payments

Deployment & Tooling: Git & GitHub (Branching, PRs), Cloudflare Pages/Workers, Firebase,
Netlify, PWA Development, Chart.js, Bash Scripting, AI-Assisted Development (Claude Code)

TypeScript — in progress, not a completed skill.

## Services / Packages

1. **Full-Stack Web App Development** — React/Next.js on the frontend, Node.js/Express +
   MongoDB on the backend — REST APIs, JWT/Firebase authentication, and Stripe payments
   when the job needs them. Scope starts from a written, agreed requirement, not a guess.
2. **Billing & Tracking Dashboards** — custom billing calculators, tracking dashboards, and
   operational tools — the same kind of tool built to solve real problems at my own
   workplace, after talking through exactly how the numbers are supposed to work with the
   people who use them.
3. **Port & Logistics Workflow Digitisation** — turning paper-based or Excel-based port and
   logistics workflows into deployed, team-wide web tools, backed by first-hand operational
   knowledge.
4. **Manual Process Automation** — for any company or industry: map how a process actually
   runs today, find the step still done by hand, and replace it with a deployed tool the
   whole team can use, not just a one-off script.

## Rate / Availability

**[FILL IN — this is your call, I have no basis to set it.]** Availability: open to remote
work worldwide, no time zone constraints.

---

## Project 1: Port Billing Calculator (portbill.pages.dev)

**Problem:** The port billing system creates permanent entries — C&F agents had no way to
estimate wharfrent charges before committing, causing billing disputes, excessive dwell time,
and repeated counter visits.

**Solution:** Real-time advance wharfrent calculator — slab-based charge computation, VAT and
levy calculation, inside/outside cargo split, hoisting charge auto-calculation, print-ready
A4 output.

**Result:** Actively used by C&F agents at Mongla Port daily to verify expected charges before
final submission.

**Tags:** JavaScript, HTML/CSS, Cloudflare Pages, PWA, Print Output
**Links:** [portbill.pages.dev](https://portbill.pages.dev) | [github.com/samiulAsumel/portbill](https://github.com/samiulAsumel/portbill)

## Project 2: Daily Car Balance & Location Tracking System ("carview")

**Problem:** Vehicle positions across warehouse, shed, and yard were recorded in one person's
personal Excel file — invisible to all other staff. When that person was unavailable, the
whole team lost visibility, creating bottlenecks and single-person dependency.

**Solution:** Offline-first PWA tracking 8 port locations, with a Cloudflare Worker + private
GitHub repo sync so all staff see current positions with no single-person dependency. Includes
a Chart.js analytics dashboard (7 charts + KPIs), 13 report sections, and Excel export.

**Result:** Now the Traffic Department's shared, version-controlled tracking system at Mongla
Port Authority.

**Tags:** PWA, Cloudflare Worker, Chart.js, GitHub Sync, Excel Export
**Links:** [carview.pages.dev](https://carview.pages.dev) | [github.com/samiulAsumel/carview](https://github.com/samiulAsumel/carview)

## Project 3: OT Bill Management System (otbill.pages.dev)

**Problem:** Overtime billing was a fully manual Excel process — multi-step hourly rate
calculations, date-wise OT entry, and final bill generation done by hand every cycle.

**Solution:** Staff enters an employee profile once; the system generates the complete final
OT bill instantly with correct hourly rate, cumulative date-wise OT calculation, and A4
print-ready output.

**Result:** Reduced billing cycle time from hours to minutes and eliminated manual calculation
errors.

**Tags:** JavaScript, Employee DB, Auto-Calc, A4 Print, Cloudflare Pages
**Links:** [otbill.pages.dev](https://otbill.pages.dev) | [github.com/samiulAsumel/otbill](https://github.com/samiulAsumel/otbill)

## Project 4: Client Intake Form (clif91.pages.dev)

**Problem:** Collecting project requirements from a client over email or chat is unstructured
— details get missed, and following up to fill gaps wastes time on both sides.

**Solution:** Single-file, client-side project requirement intake form — structured questions,
no backend required, mailto-based report so the completed brief lands directly in an inbox,
ready to work from.

**Tags:** JavaScript, HTML/CSS, Client-Side Only
**Links:** [clif91.pages.dev](https://clif91.pages.dev) | [github.com/samiulAsumel/client-intake-form](https://github.com/samiulAsumel/client-intake-form)

## Project 5: SalahSync (salahsync.pages.dev)

**Problem:** A static printed daily-routine sheet couldn't adapt when Fajr time or office
hours shifted, and couldn't track whether a prayer was actually made in jamaah, alone, or
missed.

**Solution:** Offline-first installable PWA: set Fajr time/location and office hours once,
and the full day's schedule (Tahajjud through sleep) recalculates itself, with a prayer/amal
tracker, streaks, and offline solar prayer-time calculation — no API dependency.

**Note:** Personal daily-use tool, bilingual Bangla/English UI — single-user, not a
multi-user product, included here for range and build quality, not team adoption.

**Tags:** PWA, Offline-First, Vanilla JS, i18n
**Links:** [salahsync.pages.dev](https://salahsync.pages.dev) | [github.com/samiulAsumel/salahsync](https://github.com/samiulAsumel/salahsync)

## Project 6: World Kitchen Atlas (kitchenatlas.pages.dev)

**Problem:** Most recipe content online skips real culinary history, and asserts uncertain
food history as settled fact rather than acknowledging what isn't actually confirmed.

**Solution:** Next.js static-export culinary encyclopedia on Cloudflare Pages: continent →
country → dish browsing, client-side search, and a per-dish confidence rating instead of
presenting every entry as equally certain. A Cloudflare Worker proxies a private GitHub data
repo so the access token never reaches the browser, plus admin CRUD and a
Durable-Object-backed visit counter for analytics without a database.

**Note:** Asia is live (7 countries, 280 dishes); other continents are planned. No exported
traffic numbers, so this is presented as live and real, not as a "daily use" claim.

**Tags:** Next.js, TypeScript, Cloudflare Worker, Durable Objects, Static Export
**Links:** [kitchenatlas.pages.dev](https://kitchenatlas.pages.dev) | [github.com/samiulAsumel/world-kitchen-atlas](https://github.com/samiulAsumel/world-kitchen-atlas)

## Project 7: Outreach Copilot (outreach-copilot.pages.dev)

**Solution:** Single-user AI-drafted cold-outreach tool — Cloudflare Pages + Workers API,
D1-backed leads/analytics, Workers AI draft generation across email/LinkedIn/WhatsApp/cover
letter. Every send stays a manual, deliberate step — nothing goes out automatically.

**Tags:** Cloudflare Workers, D1, Workers AI, Single-User Tool
**Links:** [outreach-copilot.pages.dev](https://outreach-copilot.pages.dev) | [github.com/samiulAsumel/outreach-copilot](https://github.com/samiulAsumel/outreach-copilot)

## Project 8: JARVIS — Personal AI Assistant (source available)

**Solution:** Self-hosted personal AI assistant with multi-model routing (Groq, OpenRouter,
Claude, Gemini, local Ollama), voice I/O, and persistent memory.

**Note:** Source available on GitHub; no public live demo.

**Tags:** Multi-LLM Routing, Voice I/O, Self-Hosted
**Links:** [github.com/samiulAsumel/jarvis](https://github.com/samiulAsumel/jarvis)

## Contact

Email: sa.sumel91@gmail.com
Portfolio: [sasumel.pages.dev](https://sasumel.pages.dev)
GitHub: [github.com/samiulAsumel](https://github.com/samiulAsumel)
LinkedIn: [linkedin.com/in/samiul-alam-sumel](https://linkedin.com/in/samiul-alam-sumel)

---

## What changed in this pass (not part of the profile — delete before publishing)

- **Title updated** to "Product Engineer for Real-World Operations" — matches the current
  site/CV headline (`CLAUDE.md`'s Positioning section, set 2026-09-04). The old headline
  here ("Port Operations Technologist & Product Engineer") was a prior, since-reversed
  version; don't reintroduce it without checking `CLAUDE.md` first, since it's flipped three
  times already.
- **Skills list flattened** — dropped the "Own: / AI-assisted:" split that was in the CV
  skills matrix (and, before this pass, implied here too via the "AI-Assisted Development"
  tag sitting alongside everything else). Per-skill authorship labels read as a hedge on a
  hiring/client-facing profile; the general AI-assisted-development framing stays in the
  About section instead, where it's an honest description of process rather than a flag on
  specific line items.
- **Tags corrected**: portbill and otbill were tagged "Vercel" in the old version; the actual
  deployment (per `generate_cvs.py`/site) is Cloudflare Pages.
- **Project list re-synced to current canonical set**: added SalahSync and Outreach Copilot
  (both now in `generate_cvs.py`'s `PROJECTS`/`ADDITIONAL_PROJECTS` since the 2026-08-28
  sweep — they weren't yet when this file was first drafted). Removed the Port Community
  System (PCS) architecture-showcase entry — it isn't in the canonical project list and
  doesn't appear on the live site; `CLAUDE.md` only describes how it *should* be labeled if
  it's ever added, not that it currently is. Add it back here only after it's actually live
  on the site/CVs.
- **Rate is still blank** — that's a business call only you can make, not something inferable
  from the repo. Fill it in before you paste this anywhere.
