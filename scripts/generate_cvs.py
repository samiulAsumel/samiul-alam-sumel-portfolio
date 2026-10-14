#!/usr/bin/env python3
"""Generate MD-Samiul-Alam-Sumel-CV.docx and MD-Samiul-Alam-Sumel-Project-CV.docx.

Content is sourced strictly from the portfolio site (../index.html) -- same
facts, same honest framing, no sugarcoating, no claims beyond what real
GitHub projects and self-directed study actually support.

Usage: python3 scripts/generate_cvs.py
Requires: pip install python-docx
Output files are written to the repo root (one level up from this script).
"""
from pathlib import Path

from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

OUT_DIR = Path(__file__).resolve().parent.parent

NAVY = RGBColor(0x1E, 0x3A, 0x5F)
GOLD = RGBColor(0xB8, 0x86, 0x2A)
TEXT = RGBColor(0x2A, 0x2A, 0x2A)
MUTED = RGBColor(0x5A, 0x5A, 0x5A)
LINK = RGBColor(0x1E, 0x3A, 0x5F)

FONT = "Calibri"


def add_hyperlink(paragraph, url, text, color=LINK, underline=True, bold=False, size=None):
    part = paragraph.part
    r_id = part.relate_to(
        url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True,
    )
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), r_id)

    new_run = OxmlElement("w:r")
    rPr = OxmlElement("w:rPr")

    rFonts = OxmlElement("w:rFonts")
    rFonts.set(qn("w:ascii"), FONT)
    rFonts.set(qn("w:hAnsi"), FONT)
    rPr.append(rFonts)

    if bold:
        rPr.append(OxmlElement("w:b"))
    if underline:
        u = OxmlElement("w:u")
        u.set(qn("w:val"), "single")
        rPr.append(u)
    c = OxmlElement("w:color")
    c.set(qn("w:val"), "%02X%02X%02X" % (color[0], color[1], color[2]))
    rPr.append(c)
    if size:
        sz = OxmlElement("w:sz")
        sz.set(qn("w:val"), str(size * 2))
        rPr.append(sz)

    new_run.append(rPr)
    t = OxmlElement("w:t")
    t.text = text
    new_run.append(t)
    hyperlink.append(new_run)
    paragraph._p.append(hyperlink)
    return hyperlink


def set_base_style(doc):
    style = doc.styles["Normal"]
    style.font.name = FONT
    style.font.size = Pt(9.5)
    style.font.color.rgb = TEXT
    style.paragraph_format.space_after = Pt(0)
    style.paragraph_format.space_before = Pt(0)
    style.paragraph_format.line_spacing = 1.0
    rPr = style.element.get_or_add_rPr()
    rFonts = rPr.find(qn("w:rFonts"))
    if rFonts is None:
        rFonts = OxmlElement("w:rFonts")
        rPr.append(rFonts)
    rFonts.set(qn("w:eastAsia"), FONT)

    sec = doc.sections[0]
    sec.top_margin = Inches(0.28)
    sec.bottom_margin = Inches(0.2)
    sec.left_margin = Inches(0.52)
    sec.right_margin = Inches(0.52)

    lb = doc.styles["List Bullet"]
    lb.font.name = FONT
    lb.paragraph_format.space_before = Pt(0)
    lb.paragraph_format.space_after = Pt(1)
    lb.paragraph_format.line_spacing = 1.0


def para_border_bottom(paragraph, color="B8862A", sz=6):
    pPr = paragraph._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), str(sz))
    bottom.set(qn("w:space"), "2")
    bottom.set(qn("w:color"), color)
    pBdr.append(bottom)
    pPr.append(pBdr)


def add_name_header(doc, name, title, contact_parts):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(1)
    r = p.add_run(name.upper())
    r.font.size = Pt(19)
    r.font.bold = True
    r.font.color.rgb = NAVY

    p2 = doc.add_paragraph()
    p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p2.paragraph_format.space_after = Pt(4)
    r2 = p2.add_run(title)
    r2.font.size = Pt(11.5)
    r2.font.bold = True
    r2.font.color.rgb = GOLD

    p3 = doc.add_paragraph()
    p3.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p3.paragraph_format.space_after = Pt(8)
    for i, (label, url) in enumerate(contact_parts):
        if i > 0:
            sep = p3.add_run("   |   ")
            sep.font.size = Pt(9)
            sep.font.color.rgb = MUTED
        if url:
            add_hyperlink(p3, url, label, color=NAVY, underline=False, size=9)
        else:
            r = p3.add_run(label)
            r.font.size = Pt(9)
            r.font.color.rgb = MUTED
    para_border_bottom(p3, color="1E3A5F", sz=10)


def add_section_heading(doc, text, space_before=7):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(3)
    r = p.add_run(text.upper())
    r.font.size = Pt(11.5)
    r.font.bold = True
    r.font.color.rgb = NAVY
    para_border_bottom(p, color="B8862A", sz=6)
    return p


def add_body(doc, text, space_after=4, size=9.5, italic=False, color=TEXT, align=WD_ALIGN_PARAGRAPH.JUSTIFY):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.05
    if align:
        p.alignment = align
    r = p.add_run(text)
    r.font.size = Pt(size)
    r.font.italic = italic
    r.font.color.rgb = color
    return p


def add_bullet(doc, text, bold_lead=None, space_after=1, size=9.3):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.line_spacing = 1.0
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    pf = p.paragraph_format
    pf.left_indent = Inches(0.18)
    if bold_lead:
        r = p.add_run(bold_lead)
        r.bold = True
        r.font.size = Pt(size)
        r.font.color.rgb = TEXT
        text = text[len(bold_lead):] if text.startswith(bold_lead) else text
    r2 = p.add_run(text)
    r2.font.size = Pt(size)
    r2.font.color.rgb = TEXT
    return p


def add_role_header(doc, role, org, period, subnote=None):
    # NOTE: left-aligned (not justified) -- uses a right tab stop to place
    # the date; justify would break that layout.
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(0)
    r1 = p.add_run(role)
    r1.bold = True
    r1.font.size = Pt(10.3)
    r1.font.color.rgb = NAVY
    tab_stops = p.paragraph_format.tab_stops
    tab_stops.add_tab_stop(Inches(6.4), alignment=3)  # right align tab
    r_tab = p.add_run("\t" + period)
    r_tab.font.size = Pt(9.2)
    r_tab.italic = True
    r_tab.font.color.rgb = MUTED

    p2 = doc.add_paragraph()
    p2.paragraph_format.space_after = Pt(2)
    r2 = p2.add_run(org)
    r2.bold = True
    r2.font.size = Pt(9.7)
    r2.font.color.rgb = GOLD
    if subnote:
        r3 = p2.add_run("  —  " + subnote)
        r3.font.size = Pt(9.2)
        r3.italic = True
        r3.font.color.rgb = MUTED


def add_skill_line(doc, category, items, space_after=3):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.0
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    r1 = p.add_run(category + ":  ")
    r1.bold = True
    r1.font.size = Pt(9.6)
    r1.font.color.rgb = NAVY
    r2 = p.add_run(items)
    r2.font.size = Pt(9.6)
    r2.font.color.rgb = TEXT


def add_project_entry(doc, name, links, problem, solution, tags):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(1)
    r = p.add_run(name)
    r.bold = True
    r.font.size = Pt(10.1)
    r.font.color.rgb = NAVY
    if links:
        sep = p.add_run("   —   ")
        sep.font.size = Pt(8.8)
        sep.font.color.rgb = MUTED
        for i, (label, url) in enumerate(links):
            if i > 0:
                s = p.add_run("  |  ")
                s.font.size = Pt(8.8)
                s.font.color.rgb = MUTED
            add_hyperlink(p, url, label, color=GOLD, underline=True, size=8.8)

    add_body(doc, "Problem: " + problem, space_after=1, size=9.1, italic=True, color=MUTED)
    add_body(doc, solution, space_after=1, size=9.3)
    add_body(doc, "Tech: " + tags, space_after=3, size=8.6, italic=True, color=MUTED)


def add_compact_project(doc, name, links, sentence, tag_note=None):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(1)
    p.paragraph_format.space_after = Pt(0)
    p.paragraph_format.line_spacing = 1.0
    r = p.add_run(name)
    r.bold = True
    r.font.size = Pt(9.1)
    r.font.color.rgb = NAVY
    if tag_note:
        rn = p.add_run("  (" + tag_note + ")")
        rn.italic = True
        rn.font.size = Pt(8)
        rn.font.color.rgb = MUTED
    if links:
        sep = p.add_run("   —   ")
        sep.font.size = Pt(8.2)
        sep.font.color.rgb = MUTED
        for i, (label, url) in enumerate(links):
            if i > 0:
                s = p.add_run("  |  ")
                s.font.size = Pt(8.2)
                s.font.color.rgb = MUTED
            add_hyperlink(p, url, label, color=GOLD, underline=True, size=8.2)
    add_body(doc, sentence, space_after=1, size=8.5)


CONTACT = [
    ("Mongla, Bangladesh", None),
    ("sa.sumel91@gmail.com", "mailto:sa.sumel91@gmail.com"),
    ("+880 1312 312 512", None),
    ("sasumel.pages.dev", "https://sasumel.pages.dev/"),
    ("github.com/samiulAsumel", "https://github.com/samiulAsumel"),
    ("linkedin.com/in/samiul-alam-sumel", "https://linkedin.com/in/samiul-alam-sumel"),
]

SKILLS = [
    ("Domain & Port Operations", "Port billing, wharf-rent / VAT / levy calculation, advance billing "
                                  "estimates, cargo and vehicle tracking, container tallying and "
                                  "statistics, revenue reporting, C&F agent workflows, customs-related "
                                  "reporting"),
    ("Proven in live projects", "HTML5, CSS3, JavaScript (ES6+), PWA / offline-first, Cloudflare "
                                "Pages & Workers, Firebase Auth & Firestore, Chart.js & Excel export, "
                                "automated tests, Git & GitHub, React & Next.js, AI-assisted "
                                "development (Claude Code)"),
    ("Working knowledge", "TypeScript, Tailwind CSS & Vite, Hono & Zod APIs, SQL on Cloudflare D1, "
                          "database design, Vitest & CI/CD (used in OpsFlow, in development)"),
    ("Currently developing", "Node.js & Express depth, automated testing depth, TypeScript depth"),
    ("Self-directed practice", "Linux / Ubuntu, Bash scripting, systemd & cron / timers, monitoring "
                               "scripts (public repos on GitHub)"),
]

PROJECTS = [
    dict(
        name='Port Billing System',
        links=[("Live", "https://portbill.pages.dev"), ("Case study", "https://sasumel.pages.dev/projects/portbill")],
        problem="C&F agents, importers and shipping agents kept asking what a bill would be. "
                "The port's billing system makes permanent entries, so they could not check "
                "wharf rent before committing, and revenue staff worked each estimate out by "
                "hand or in Excel, causing billing disputes, longer cargo dwell time and "
                "repeat counter visits.",
        solution="Advance bill calculator that applies the port's rules in a fixed order: "
                 "slab-based wharf rent, river dues, landing, removal, weighment and hoisting "
                 "added to the base, VAT on the base, then levy; inside/outside storage "
                 "totalled separately. Saved bills with search, a dashboard and a print-ready "
                 "A4 invoice. The rules run in the browser, so estimates work offline; slab, "
                 "VAT and rounding rules are covered by automated tests and were compared "
                 "against real bills. Used daily at the billing counter.",
        tags="JavaScript, HTML/CSS, Cloudflare Pages & Worker, PWA, Automated Tests, A4 Print",
    ),
    dict(
        name='Vehicle Tracking / CarView',
        links=[("Case study", "https://sasumel.pages.dev/projects/carview")],
        problem="Vehicle positions across warehouse, shed and yard were recorded in one "
                "person's Excel file, invisible to everyone else. When that person was "
                "unavailable, the whole team lost visibility.",
        solution="Offline-first installable web app tracking eight storage locations, with "
                 "daily receipts, deliveries, transfers and running balances; a Cloudflare "
                 "Worker writes to a private GitHub repo so every save is a version-controlled "
                 "commit. Seven charts, thirteen report sections and Excel export. Built for "
                 "the Traffic Department and used daily. It records quantities and "
                 "movements; it is not GPS tracking.",
        tags="PWA, Cloudflare Worker, Chart.js, GitHub-backed data, Excel Export",
    ),
    dict(
        name="OT Bill Management / Automation",
        links=[("Case study", "https://sasumel.pages.dev/projects/otbill")],
        problem="Overtime billing was a repetitive manual calculation: find the employee's "
                "pay, work out an hourly rate, add up the hours day by day, then produce the "
                "bill in the required format. Errors were easy to make and hard to spot.",
        solution="Staff enter an employee profile once; the system prepares the overtime bill "
                 "from daily hours, applies the rate rule automatically (basic pay divided by "
                 "104, rounded up) and prints a bill on A4, with an all-bills view and a "
                 "dashboard. It is overtime billing, not payroll.",
        tags="JavaScript, Employee records, Auto-calculation, A4 Print, Cloudflare Pages",
    ),
    dict(
        name="OpsFlow (in development)",
        links=[("Early build", "https://opsflow.sasas.workers.dev"), ("Case study", "https://sasumel.pages.dev/projects/opsflow")],
        problem="Transport and logistics firms run orders, trips, invoices and payments "
                "across Excel, WhatsApp and manual records.",
        solution="Multi-tenant operations software, built in stages. Implemented: "
                 "tenant-isolated accounts and roles, customer, route and rate-card data, "
                 "fleet records and quotations. In development: orders and trips. Planned: "
                 "invoices, payments, outstanding balances and reports. Private repository; "
                 "an early build, not a live product.",
        tags="TypeScript, React, Vite, Hono, Zod, Cloudflare Workers + D1, Vitest, GitHub Actions",
    ),
    dict(
        name="Client Intake Form",
        links=[("Live", "https://clif91.pages.dev/"), ("GitHub", "https://github.com/samiulAsumel/client-intake-form")],
        problem="Collecting project requirements from a client over email or chat is "
                "unstructured: details get missed, and without a written scope, what was "
                "agreed becomes a dispute later.",
        solution="Project requirement intake form: 18 structured sections that adapt to the "
                 "project type, a serverless submission API, and a password-protected admin "
                 "dashboard that tracks each lead from New to Won/Lost, with the client's own "
                 "email app as a fallback.",
        tags="JavaScript, HTML/CSS, Cloudflare Pages Functions, GitHub API",
    ),
    dict(
        name="SalahSync",
        links=[("Live", "https://salahsync.pages.dev"), ("GitHub", "https://github.com/samiulAsumel/salahsync")],
        problem="A printed daily-routine sheet couldn't adapt when Fajr time or office hours "
                "shifted, or record whether a prayer was made in jamaah, alone, or missed.",
        solution="Offline-first installable PWA: set Fajr time and office hours once and the "
                 "day's schedule recalculates, with a prayer tracker, streaks and offline "
                 "solar prayer-time calculation (no API). Personal daily-use tool, bilingual UI.",
        tags="PWA, Offline-First, Vanilla JS, i18n",
    ),
    dict(
        name="World Kitchen Atlas",
        links=[("Live", "https://kitchenatlas.pages.dev"), ("GitHub", "https://github.com/samiulAsumel/world-kitchen-atlas")],
        problem="Most recipe content online is thin, and states uncertain food history as "
                "settled fact.",
        solution="Next.js static-export culinary encyclopedia on Cloudflare Pages: continent "
                 "-> country -> dish browsing, client-side search, and a per-dish confidence "
                 "rating. A Cloudflare Worker proxies a private GitHub data repo, with admin "
                 "CRUD and a Durable-Object-backed visit counter. 295 dish pages across 7 "
                 "Asian countries; other continents planned.",
        tags="Next.js, TypeScript, Cloudflare Worker, Durable Objects, Static Export",
    ),
    dict(
        name="English Mastery",
        links=[("Live", "https://englishmastery.pages.dev"), ("GitHub", "https://github.com/samiulAsumel/english-reading-mastery")],
        problem="English-reading material online has no level structure, so a learner can't "
                "tell where they are or what to read next.",
        solution="Content-driven learning platform: 88 reading lessons across nine skill "
                 "levels with 87 paired writing tasks and 87 speaking drills. A Node build "
                 "script validates every Markdown lesson against a schema and generates the "
                 "static site, so adding a lesson is a one-file change. GitHub Actions CI, "
                 "auto-deployed to Cloudflare Pages.",
        tags="Node.js, Vanilla JS, Static Site Generation, GitHub Actions, Cloudflare Pages",
    ),
]

ADDITIONAL_PROJECTS = [
    dict(
        name="Outreach Copilot",
        tag_note=None,
        links=[("Live", "https://outreach-copilot.pages.dev"),
               ("GitHub", "https://github.com/samiulAsumel/outreach-copilot")],
        sentence="Single-user AI-drafted outreach tool for a hand-picked lead list: Cloudflare "
                 "Pages + Workers API, D1-backed leads and analytics, Workers AI drafts; every "
                 "send stays a manual, deliberate step.",
    ),
    dict(
        name="Anchora Commerce",
        tag_note="source only, portfolio build, not a live shop",
        links=[("GitHub", "https://github.com/samiulAsumel/anchora-commerce")],
        sentence="Full-stack commerce platform: storefront with cart and checkout (stock "
                 "validated in a transaction) and a role-gated admin dashboard. Next.js 15, "
                 "TypeScript, Prisma, PostgreSQL, Docker, Vitest and Playwright tests, GitHub "
                 "Actions.",
    ),
    dict(
        name="JARVIS",
        tag_note="source available, no public demo",
        links=[("GitHub", "https://github.com/samiulAsumel/jarvis")],
        sentence="Self-hosted personal AI assistant with multi-model routing, voice I/O and "
                 "persistent memory.",
    ),
]

INFRA_NOTE = (
    "Six self-directed Bash automation projects: zero-downtime deployment with auto-rollback "
    "(auto-deploy-pipeline), SSL certificate monitoring and renewal (auto-ssl-manager), "
    "log analysis and threat alerting (log-analyzer-alert), CSV-driven user/access lifecycle "
    "management (linux-user-access-mgmt), user/group provisioning and sudo policy automation "
    "(enterprise-user-mgmt), and multi-team file-sharing permissions with POSIX ACLs "
    "(secure-file-sharing). Daily Linux (Ubuntu) user; self-driven learning, not job-critical "
    "production work."
)

STUDY_SUMMARY = (
    "Self-paced study for code comprehension, not a certificate: The Odin Project, then "
    "Full Stack Open (University of Helsinki) for JavaScript, Node.js/Express depth, "
    "testing and Git workflow."
)


def build_final_cv():
    doc = Document()
    set_base_style(doc)

    add_name_header(doc, "MD Samiul Alam Sumel", "Web Developer — Business Systems & Workflow Automation", CONTACT)

    add_section_heading(doc, "Professional Summary", space_before=0)
    add_body(
        doc,
        "Web developer who builds business systems and internal tools, with 12+ years of "
        "hands-on experience in cargo billing, vehicle and cargo tracking, revenue reporting "
        "and operational workflows at Mongla Port Authority (Traffic Department). Replaces "
        "manual and Excel processes with working web systems: three self-built tools "
        "(Port Billing, CarView and OT Bill) are in daily use at the billing desk and in the "
        "Traffic Department. Builds with AI-assisted development (Claude Code); requirements, "
        "business rules, testing and validation stay with me. Open to international and "
        "remote roles in web development for business systems and internal tools, process "
        "automation, operations technology or product building.",
        size=9.4,
    )

    add_section_heading(doc, "Technical Skills")
    for cat, items in SKILLS:
        add_skill_line(doc, cat, items)

    add_section_heading(doc, "Professional Experience")
    add_role_header(
        doc,
        "Senior Outdoor Assistant (Revenue Branch) — Traffic Department",
        "Mongla Port Authority",
        "Nov 2017 – Present",
        "Bangladesh's second-largest international seaport",
    )
    add_body(doc, "Core Port Operations", space_after=1, size=9.3, italic=True, color=GOLD, align=None)
    for t in [
        "Billing: wharf-rent billing (slab-wise charges, VAT and levy, inside/outside cargo "
        "split), vehicle, general-cargo and stuffing, delivery and shipping-related billing, "
        "demurrage, advance billing estimates and billing records, applying the port's "
        "published tariff.",
        "Reporting: daily and monthly revenue reports, cumulative income statements and "
        "monthly Traffic Department reporting for port authority management; container, "
        "cargo, vehicle and jetty statistics; Excel-based data preparation and record checking.",
        "Operations records: container tallying, vehicle delivery and position tracking across "
        "warehouse, shed and yard, customs-related vehicle (auction) reporting, and the "
        "bank-deposit (challan) workflow with monthly statements.",
        "Coordination: C&F agents (paperwork, billing queries, advance payment planning), "
        "shipping agents and stevedoring stakeholders.",
    ]:
        add_bullet(doc, t)
    add_body(doc, "From manual work to software", space_after=1, size=9.3, italic=True, color=GOLD, align=None)
    for t in [
        "Moved from manual work to Excel automation, then to internal tools, web apps and "
        "business systems: Port Billing System, CarView and OT Bill Automation, each built "
        "around the real workflow after talking to the people who use it, and each in daily use.",
        "Builds with AI-assisted development as a productivity tool; the requirements, business "
        "rules, review and testing stay with me.",
        "Maintains an active public GitHub portfolio (github.com/samiulAsumel) and a "
        "self-directed practice in Linux and Bash.",
    ]:
        add_bullet(doc, t)

    add_role_header(
        doc,
        "Junior Outdoor Assistant — Port & Terminal Operations",
        "Mongla Port Authority",
        "Nov 2013 – Nov 2017",
    )
    for t in [
        "Assisted in port inspections, vessel operations, and cargo handling under senior "
        "supervision; monitored cargo dwell time and vehicle positioning across terminal "
        "locations.",
        "Built foundational expertise in wharfrent billing, maritime logistics, and customs "
        "clearance that underpins all later self-initiated digital work.",
    ]:
        add_bullet(doc, t)

    add_section_heading(doc, "Featured Projects")
    for pr in PROJECTS:
        add_project_entry(doc, pr["name"], pr["links"], pr["problem"], pr["solution"], pr["tags"])
    for pr in ADDITIONAL_PROJECTS:
        add_compact_project(doc, pr["name"], pr["links"], pr["sentence"], pr["tag_note"])

    add_section_heading(doc, "Self-Directed Study")
    add_role_header(
        doc,
        "The Odin Project & Full Stack Open",
        "Self-Directed — In Progress",
        "Aug 2026 – Present",
    )
    add_body(doc, STUDY_SUMMARY, space_after=4, size=9.5)

    add_section_heading(doc, "Education & Languages")
    add_skill_line(doc, "Higher Secondary Certificate — Business Studies",
                   "Khulna Public College, 2009 – 2011", space_after=2)
    add_skill_line(doc, "Secondary School Certificate — Business Studies",
                   "Mongla Bandar Secondary School, 1999 – 2009", space_after=2)
    add_skill_line(doc, "Languages", "Bengali — Native   |   English — Professional", space_after=0)

    path = OUT_DIR / "MD-Samiul-Alam-Sumel-CV.docx"
    doc.save(path)
    print("Saved:", path)


def build_freelance_cv():
    doc = Document()
    set_base_style(doc)

    add_name_header(doc, "MD Samiul Alam Sumel", "Web Developer — Business Systems & Workflow Automation", CONTACT)

    add_section_heading(doc, "How I Work", space_before=0)
    add_body(
        doc,
        "Describe the workflow and where it breaks down. I ask questions until the "
        "requirement is clear and written down, using 12+ years of port operations "
        "experience to judge what actually fits, then design, build and deploy the "
        "solution, with AI-assisted development (Claude Code) as a productivity tool. "
        "The goal is usually the same in any industry: find the manual step in a process "
        "that already runs, whether a paper form, a shared spreadsheet or a hand "
        "calculation, and replace it with a deployed tool the whole team can use. Every "
        "build is tested against the real rules before I call it done. Backed by three web "
        "apps built for real daily use, not demos. Based in "
        "Mongla, Bangladesh (UTC+6) and available for freelance and contract work "
        "worldwide, with flexible hours.",
        size=9.4,
    )

    add_section_heading(doc, "Services I Deliver")
    services = [
        ("Billing & Calculation Tools",
         "Calculators that apply your rules in a fixed order and print the bill: slabs, "
         "tariffs, VAT and levies. Built after walking through exactly how the numbers are "
         "supposed to work with the people who use them.",
         "Port Billing System: rules covered by automated tests and compared against real bills."),
        ("Tracking & Reporting Systems",
         "One shared record instead of a personal spreadsheet: daily balances per location, "
         "charts, reports, Excel export and a full change history, working offline.",
         "CarView: eight locations, seven charts and thirteen report sections, in daily use."),
        ("Workflow Automation",
         "Find the step still done by hand and replace it with a deployed tool the whole team "
         "uses, not a one-off script.",
         "OT Bill Automation replaced a manual overtime-bill calculation and is in daily use."),
        ("Websites & Web Apps",
         "Business sites, portfolios, content platforms and small web apps, built from a "
         "written requirement and tested end to end.",
         "World Kitchen Atlas, English Mastery and this portfolio are live; Anchora Commerce "
         "shows a full store build (source only)."),
    ]
    for title, desc, proof in services:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(6)
        p.paragraph_format.space_after = Pt(1)
        r = p.add_run(title)
        r.bold = True
        r.font.size = Pt(10.3)
        r.font.color.rgb = NAVY
        add_body(doc, desc, space_after=1, size=9.6)
        add_body(doc, "\u2713 " + proof, space_after=3, size=9.2, color=GOLD, italic=True, align=None)

    add_section_heading(doc, "Remote & Freelance Readiness")
    for t in [
        "Based in Mongla, Bangladesh (UTC+6); flexible hours and async-friendly across time zones.",
        "Self-managed: scopes, builds, and deploys independently, manually verified before "
        "every release.",
        "Async-friendly English, Git/GitHub-based collaboration (branching, PRs).",
        "Live projects and case studies are public, so the work can be checked before you hire.",
    ]:
        add_bullet(doc, t)

    add_section_heading(doc, "Featured Projects")
    for pr in PROJECTS:
        add_project_entry(doc, pr["name"], pr["links"], pr["problem"], pr["solution"], pr["tags"])

    add_section_heading(doc, "Technical Skills")
    for cat, items in SKILLS:
        add_skill_line(doc, cat, items)

    add_section_heading(doc, "Professional Background")
    add_body(
        doc,
        "12+ years at Mongla Port Authority: Senior Outdoor Assistant, Revenue Branch, Traffic "
        "Department (Nov 2017 – Present); Junior Outdoor Assistant, Port & Terminal Operations "
        "(Nov 2013 – Nov 2017). Billing, revenue reporting, cargo and vehicle tracking, and "
        "C&F agent coordination: a record of discipline and reliability, not just technical skill.",
        size=9.6, space_after=4,
    )

    add_section_heading(doc, "Self-Directed Study")
    add_role_header(
        doc,
        "The Odin Project & Full Stack Open",
        "Self-Directed — In Progress",
        "Aug 2026 – Present",
    )
    add_body(doc, STUDY_SUMMARY, space_after=6, size=9.5)

    add_section_heading(doc, "Education & Languages")
    add_skill_line(doc, "Education",
                   "HSC — Business Studies, Khulna Public College (2009–2011); "
                   "SSC — Business Studies, Mongla Bandar Secondary School",
                   space_after=2)
    add_skill_line(doc, "Languages", "Bengali — Native   |   English — Professional", space_after=2)

    path = OUT_DIR / "MD-Samiul-Alam-Sumel-Project-CV.docx"
    doc.save(path)
    print("Saved:", path)


if __name__ == "__main__":
    build_final_cv()
    build_freelance_cv()
