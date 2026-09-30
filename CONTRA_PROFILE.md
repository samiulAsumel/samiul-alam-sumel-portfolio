# Contra Profile — Copy/Paste Content

> Synced with the live portfolio (sasumel.pages.dev) and `scripts/generate_cvs.py` on 2026-09-30,
> after the five-step positioning pass. Facts come from the site's case studies; keep them in step.
> Delete this note before publishing.

## Headline (one-liner)

Port & Logistics Operations | Business Systems & Automation | AI-Assisted Product Builder

## Short Bio (compact bio field, ~2–3 sentences)

12+ years inside real port operations at Mongla Port Authority, building practical business
systems that turn operational workflows, business rules and repetitive Excel processes into
working software. Three of my systems (billing, vehicle tracking, overtime billing) are in
daily use. I build with AI-assisted development; requirements, rules, testing and validation
stay with me.

## Full About / Overview

Most developers learn software first. I learned the operation first.

I have 12+ years of hands-on experience in port operations at Mongla Port Authority
(Traffic Department, Revenue Branch), Bangladesh's second-largest international seaport:
cargo and vehicle workflows, wharf-rent billing, revenue reporting, documentation, and
coordination with C&F agents and shipping stakeholders.

From that work I build business systems. I start from the real workflow, write the business
rules down, then build and validate the software around them. AI-assisted development speeds
up the implementation; I own the requirements, the rules, the testing and the deployment.

I am open to remote work worldwide on:

* Internal business systems and workflow automation
* Billing, calculation and tariff tools
* Tracking and reporting systems (quantity and movement records, not GPS)
* Operational software for port, logistics and transport teams

Education: Higher Secondary Certificate (HSC), Business Studies, 2011. Languages: Bengali
(native), English (professional).

## Skills / Tags

Domain systems: Port billing and tariff systems, wharf-rent / VAT / levy calculation, cargo and
vehicle workflows, revenue reporting, C&F agent workflows, operational tracking, business-rule
modelling, workflow automation

Proven in live projects: HTML5, CSS3, JavaScript, PWA / offline-first, Cloudflare Pages and
Workers, Firebase Auth and Firestore, Chart.js and Excel export, Git and GitHub, React and
Next.js (World Kitchen Atlas), AI-assisted development (Claude Code)

Working knowledge (OpsFlow, in development): TypeScript, Tailwind CSS, Vite, Hono, Zod,
Cloudflare D1 (SQL), Vitest, GitHub Actions

Being developed: Node.js / Express depth, automated testing depth, TypeScript depth

## What I can help with

1. **Operational workflow digitisation** — replace a repetitive manual or Excel workflow with a
   structured, deployed tool the whole team can use.
2. **Billing and calculation systems** — turn tariffs, slabs, taxes and rules into reliable,
   testable calculation tools with print-ready output.
3. **Internal business systems** — applications built around how a team actually works.
4. **Reporting and automation** — cut repeated spreadsheet and reporting work through
   structured records, reports and exports.

Scope always starts from a written, agreed requirement.

## Rate / Availability

Open to remote work worldwide, no time zone constraints. Rates are agreed per project after a
short scoping conversation.

---

## Project 1: Port Billing System (portbill.pages.dev) — Live · daily use

**Problem:** The port's billing system creates permanent entries, so C&F agents could not check
wharf rent before committing. The result was billing disputes, longer cargo dwell time and
repeat trips to the counter.

**Solution:** A browser-based billing system for car, general cargo and re-export bills: slab
wharf rent with free time, payable charges, VAT and levy from the port's own rules, inside /
outside storage totals, a rate-change split, saved bills with search, and print-ready A4
invoices. The calculation runs in the browser and works offline.

**Validation:** Automated tests cover VAT rounding, tonnage rounding, slab progression, money
rounding and amount in words, and results were compared with real bills. No accuracy figure is
claimed.

**Use:** Used at the billing counter to check charges before final submission.

**Tags:** JavaScript, HTML/CSS, PWA, Cloudflare Pages and Worker, A4 print output
**Links:** [portbill.pages.dev](https://portbill.pages.dev) | [Case study](https://sasumel.pages.dev/projects/portbill)

## Project 2: Vehicle Tracking / CarView — Live · daily use

**Problem:** Vehicle positions across warehouse, shed and yard were kept in one person's
spreadsheet. When they were unavailable, the team lost visibility.

**Solution:** A shared, offline-capable system for daily vehicle receipts, deliveries and
balances across eight storage locations, with carry-forward balances, transfers, seven charts,
thirteen report sections, Excel export and a full change history. Quantity tracking, not GPS.

**Architecture note:** A PWA with a Cloudflare Worker and a private GitHub repository as data
store. Chosen for one small departmental workflow (simple deployment, version history,
controlled writes); not a general replacement for a transactional database.

**Tags:** PWA, Cloudflare Worker, Chart.js, Excel export
**Links:** [Case study](https://sasumel.pages.dev/projects/carview) (no public demo: the running system shows real operating figures)

## Project 3: OT Bill Management / Automation — Live · daily use

**Problem:** Preparing an overtime bill was a repetitive, multi-step manual calculation that
was easy to get wrong.

**Solution:** Employee profiles are entered once; daily hours are the only per-bill input. The
hourly rate, cumulative total and amount in words are derived automatically and printed as an
A4 bill. Overtime billing, not payroll.

**Tags:** JavaScript, Firebase Auth and Firestore, A4 print output, Cloudflare Pages
**Links:** [Case study](https://sasumel.pages.dev/projects/otbill) (login-gated internal tool, no public demo)

## Project 4: OpsFlow — Building (product case study)

A connected operations system for small and mid-sized transport and logistics businesses:
customer, order, trip, invoice, payment, outstanding balance and reports. **Status:** tenant-
isolated accounts and roles, customers, routes and rate cards, fleet records and quotations are
implemented; orders and trips are in development; invoices, payments, outstanding balances and
reports are planned. A portfolio product project with no customers or revenue.

**Tags:** TypeScript, React, Cloudflare Workers, Hono, D1
**Links:** [Product page](https://sasumel.pages.dev/projects/opsflow) | [Early build](https://opsflow91.pages.dev)

## Other projects (shorter)

* **Client Intake Form** — 18-section requirement form with a serverless submission API and a
  password-protected lead dashboard. [clif91.pages.dev](https://clif91.pages.dev)
* **World Kitchen Atlas** — Next.js static-export culinary encyclopedia on Cloudflare (Asia
  live: 7 countries, 295 dishes; per-dish confidence rating). [kitchenatlas.pages.dev](https://kitchenatlas.pages.dev)
* **SalahSync** — personal offline-first PWA for a daily routine; single-user.
  [salahsync.pages.dev](https://salahsync.pages.dev)
* **Outreach Copilot** — single-user AI-drafted outreach tool on Cloudflare Workers and D1.
  [outreach-copilot.pages.dev](https://outreach-copilot.pages.dev)

## Contact

Email: sa.sumel91@gmail.com
Portfolio: [sasumel.pages.dev](https://sasumel.pages.dev)
GitHub: [github.com/samiulAsumel](https://github.com/samiulAsumel)
LinkedIn: [linkedin.com/in/samiul-alam-sumel](https://linkedin.com/in/samiul-alam-sumel)
