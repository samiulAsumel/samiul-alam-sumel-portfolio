# Contra Profile — Copy/Paste Content

> Built from the canonical, verified project list in this repo (`scripts/generate_cvs.py`
> `PROJECTS` / `ADDITIONAL_PROJECTS`, and `CLAUDE.md`'s content policy), not from the earlier
> draft — a few claims there (project count, live-vs-showcase labeling) didn't match what's
> actually verified. See **Notes for Samiul** at the bottom for what changed and one open item
> (rate) I can't fill in for you.

## Headline (one-liner)

Port Operations Technologist & Product Engineer | React · Next.js · Node.js — 3 tools in daily port production use

## Short Bio (compact bio field, ~2–3 sentences)

12+ years of hands-on port operations experience at Mongla Port Authority (wharfrent billing,
cargo/vehicle tracking, C&F agent workflows) combined with full-stack development (React,
Next.js, Node.js, MongoDB). I've independently designed, built, and shipped 3 web tools now
in daily use by C&F agents and the Traffic Department at Mongla Port — real production
software solving real workplace problems, not class projects.

## Full About / Overview

I'm a Port Operations Technologist and Product Engineer — a port-operations insider who also
personally designs and ships the software that runs port operations. Not a generalist
developer, not a pure ops person: the combination of domain judgment and engineering execution.

I bring 12+ years of professional experience at Mongla Port Authority — Bangladesh's second-largest
international seaport — working in wharfrent billing, cargo dwell-time management, terminal
operations, and C&F agent coordination.

I used that operational background to identify real workplace problems and built 3
self-initiated web applications that are still used daily by C&F agents and port staff at
Mongla Port. Alongside that, I completed an intensive, project-based full-stack curriculum
(React, Node.js/Express, MongoDB, Next.js — 81 modules, 14 milestones, July 2025–July 2026),
using AI-assisted development throughout.

I'm open to remote work worldwide, any time zone, on:

* Full-stack web apps (React/Next.js frontend, Node.js/Express + MongoDB backend)
* Billing & tracking dashboards
* Turning paper/Excel-based workflows into deployed web tools
* Port, logistics, or operations-adjacent software (my specialty)

Every project below is publicly verifiable before you hire.

## Skills / Tags

React, Next.js, Node.js, Express.js, MongoDB (Atlas), JavaScript (ES6+), TypeScript (in
progress), Tailwind CSS, DaisyUI, REST APIs, JWT Authentication, Firebase, Stripe Payments,
Cloudflare Workers, Cloudflare Pages, PWA Development, Chart.js, Git/GitHub, Bash Scripting,
AI-Assisted Development

## Services / Packages

1. **Full-Stack Web App Development** — React/Next.js + Node.js/Express + MongoDB, REST APIs,
   auth (JWT/Firebase), Stripe payments when needed.
2. **Billing & Tracking Dashboards** — custom calculators, tracking dashboards, operational
   tools built for real daily use.
3. **Workflow Digitization** — converting paper-based or Excel-based operational workflows
   into deployed, team-wide web tools.
4. **Port & Logistics Systems Consulting** — first-hand operational knowledge of wharfrent
   billing, cargo/vehicle tracking, and C&F coordination applied to software design.

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

**Tags:** JavaScript, HTML/CSS, Vercel, PWA, Print Output
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

**Tags:** JavaScript, Employee DB, Auto-Calc, A4 Print, Vercel
**Links:** [otbill.pages.dev](https://otbill.pages.dev) | [github.com/samiulAsumel/otbill](https://github.com/samiulAsumel/otbill)

## Project 4: Client Intake Form (clif91.pages.dev)

**Problem:** Collecting project requirements from a client over email or chat is unstructured
— details get missed, and following up to fill gaps wastes time on both sides.

**Solution:** Single-file, client-side project requirement intake form — structured questions,
no backend required, mailto-based report so the completed brief lands directly in an inbox,
ready to work from.

**Tags:** JavaScript, HTML/CSS, Client-Side Only
**Links:** [clif91.pages.dev](https://clif91.pages.dev) | [github.com/samiulAsumel/client-intake-form](https://github.com/samiulAsumel/client-intake-form)

## Project 5: World Kitchen Atlas (kitchenatlas.pages.dev)

**Problem:** A global culinary reference needs fast, structured browsing by continent and
country, with an admin workflow to add/edit entries without touching code or redeploying by
hand.

**Solution:** Next.js static-export site on Cloudflare Pages, with a Cloudflare Worker
proxying a private GitHub data repo so the access token never reaches the browser, admin
login and CRUD over that same Worker, and a Durable-Object-backed visit counter for real-time
analytics without a database.

**Tags:** Next.js, TypeScript, Cloudflare Worker, Durable Objects, Admin CRUD
**Links:** [kitchenatlas.pages.dev](https://kitchenatlas.pages.dev) | [github.com/samiulAsumel/world-kitchen-atlas](https://github.com/samiulAsumel/world-kitchen-atlas)

## Project 6: Port Community System (PCS) — Architecture Showcase

**Problem:** A Gulf seaport needs a cloud-native, standards-compliant way to digitize the
vessel-call lifecycle and cargo manifest intake — a problem too large to solve with a single
deployed demo, but worth designing properly.

**Solution:** A full system-design exercise: FastAPI + PostgreSQL + Kafka on Kubernetes (EKS),
provisioned with Terraform, modeling vessel-call workflow and ZATCA customs integration, with
detailed architecture and contribution docs.

**Note:** This is a design/documentation showcase, not a running production deployment — no
live app, only published docs.

**Tags:** FastAPI, PostgreSQL, Kafka, Kubernetes (EKS), Terraform, System Design
**Links:** [Docs](https://samiulAsumel.github.io/pcs-port-system) | [github.com/samiulAsumel/pcs-port-system](https://github.com/samiulAsumel/pcs-port-system)

## Project 7: JARVIS — Personal AI Assistant (source available)

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

## Notes for Samiul (not part of the profile — delete before publishing)

Cross-checked this against `00.Resume/samiulAsumel.cv/scripts/generate_cvs.py` and its
`CLAUDE.md` content policy, since that's your actual source of truth with the "every claim
must be traceable" rule already enforced. Changes from the draft you pasted earlier:

- **"3 tools" not the whole portfolio** — Port Billing Calculator, carview, and OT Bill are
  the ones actually used daily by port staff. Client Intake Form is real and live but it's
  *your* freelance-intake tool, not a port-staff tool, so I kept it separate in the bio.
- **Added PCS and JARVIS** from your canonical `ADDITIONAL_PROJECTS` list, correctly labeled
  per your own rule: PCS is a docs-only architecture showcase (not "live"), JARVIS is
  GitHub-only with no public demo. Your earlier draft didn't include these two — worth having
  them for range even on a freelance platform, since they show systems-design depth beyond
  the port-billing tools.
- **Dropped "TypeScript" as a completed skill claim** — your `CLAUDE.md` explicitly says
  it's in-progress, not done, so I kept it tagged that way rather than listing it plain.
- **Added LinkedIn** from your `CONTACT` block since it's already public on your CV/site.
- **outreach-copilot is not included.** I read its README directly and it's real, live
  (`outreach-copilot.pages.dev` + a Worker API), and well-documented — but it isn't in your
  `generate_cvs.py`/`CLAUDE.md` project list yet (the project folder was touched *after* that
  file's last edit, so it's just not synced yet, not excluded on purpose as far as I can tell).
  Run it through your own verification step and add it to `PROJECTS`/`ADDITIONAL_PROJECTS`
  there first if you want it treated as canonical — then I can add it here too.
- **Rate is still blank** — that's a business call only you can make, not something I can
  infer from the repo. Fill it in before you paste this anywhere.
