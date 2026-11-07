# Portfolio Update — Final Instruction

Goal: reposition sasumel.pages.dev for global freelance clients.
New message: "I turn operational problems into web tools, built with AI."

## Before you paste

```
cd <your portfolio folder>        # local copy of samiul-alam-sumel-portfolio
git pull && git checkout -b feature/positioning-update
claude
```

Press Shift+Tab to enter plan mode, then paste the prompt below.
Run /clear first so old conversation does not cost tokens on every turn.

## Final prompt (paste as-is)

```
You are helping me update my portfolio website. I am an operations person, not a
programmer. I build products by directing AI and testing the results on real users.
Follow my global CLAUDE.md rules. Work in plan mode first.

GOAL
Reposition the site for global freelance clients. New message: "I turn operational
problems into web tools, built with AI." I tell the client: "Tell me the workflow problem.
If it can work as a web tool, I'll build it and test it on real users."

HOW TO WORK
1. First, read the whole site read-only. List each section, its file and its current text.
   Change nothing yet.
2. Then give me ONE plan covering all changes below. Wait for my approval.
3. After approval, implement ONE change at a time. After each, show me what changed and
   how to check it, then wait for my OK before the next.
4. Never invent facts, numbers, quotes or client names. Use only what is already on the
   site. Where something is missing, leave a clearly marked placeholder for me.
5. Keep the current design, colors, dark mode, links, live demos and case studies.
   Do not delete any project or repo link. Ask me before deleting anything.

CHANGES
A. Title and hero: title "I turn operational problems into web tools, built with AI."
   Hero line: "Tell me the workflow problem. If it can work as a web tool, I'll build it
   and test it on real users." Replace the "Product Engineer" wording everywhere.
   Update the page <title>, meta description and Open Graph tags to match.
B. "How I work": replace any wording that implies I hand-write code (for example "before
   I write a line of code") with: "I don't hand-write code. I find the real workflow
   problem, define the business rules, direct AI to build, and check every change against
   real cases and real users."
C. Services, built around one promise, "Tell me the problem". Show 4 example types, each
   linking to a live project already on the site: shared tools from spreadsheets (carview),
   calculators and billing estimators (portbill), trackers and approval workflows (otbill,
   client-intake-form), AI-assisted tools (outreach-copilot). For each: who it is for, the
   problem, the outcome.
D. "How it works": 1. You send me your problem or spreadsheet. 2. I list the rules and
   check them with you on real examples. 3. I build it and test it against your real
   cases. 4. Your team uses it and I improve it from feedback.
E. "What I take on / What I refer elsewhere": take on internal tools, trackers,
   calculators, forms, dashboards, workflow apps for small teams. Refer elsewhere
   payment-heavy systems, medical or legal systems, high-security systems, native mobile apps.
F. Contact: make the top button "Hire me" (jumps to contact). In the contact section say
   what to send me (a description of your problem) and my email. Leave a marked
   placeholder for my typical reply time.
G. Testimonials: add a "What users say" section with 2 clearly marked empty placeholders.
   No fake quotes.
H. Linux: move "Linux & Automation Practice" lower, shorten it, and remove Docker and CI/CD
   from the "Current Development" list.

CHECKS BEFORE WE FINISH
- Preview locally and tell me how to open it. Check links, mobile width, dark mode, and
  that no text still says "Product Engineer".
- List any broken links, missing alt text, heading-order problems, leftover console.log or
  secrets. List first; fix only what I approve.
- Do not commit or push. When I say so, commit with a Conventional Commit message.

Start with step 1 now.
```

## What happens next

1. Claude reads the site and lists everything. Nothing changes.
2. It shows one plan. Read it, and if it looks right, approve.
3. It makes the changes one by one. Check each one, then say "OK, next".
4. When done, ask "Preview it locally". After you check it, say "commit and push".

## Notes

- If you dislike the result, `git checkout .` discards uncommitted changes.
- Ask two real people (a C&F agent and a colleague) for a short testimonial, with
  permission to publish it, and fill the placeholders in later.
- Verify Blue Card / visa rules on the official sites before planning around them.
