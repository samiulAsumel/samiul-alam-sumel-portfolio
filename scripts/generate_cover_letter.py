#!/usr/bin/env python3
"""Generate the cover letter template as a one-page .docx.

The letter states only facts already published on the portfolio. The two
bracketed fields are meant to be filled per application.
"""

from pathlib import Path

from docx import Document
from docx.shared import Pt, Cm, RGBColor

OUT_DIR = Path(__file__).resolve().parent.parent
NAVY = RGBColor(0x1E, 0x3A, 0x5F)

CONTACT = (
    "Mongla, Bangladesh  |  sa.sumel91@gmail.com  |  +880 1312 312 512  |  "
    "sasumel.pages.dev  |  linkedin.com/in/samiul-alam-sumel"
)

PARAGRAPHS = [
    "Dear Hiring Manager,",
    "I am applying for the [Role] position at [Company]. [One sentence on why this company "
    "or this role: its operations, its product, or the problem it is solving.]",
    "I have spent 12+ years inside real port operations at Mongla Port Authority (Traffic "
    "Department, Revenue Branch): cargo and vehicle workflows, wharf-rent billing, revenue "
    "reporting, documentation, and coordination with customs and freight-forwarding agents. "
    "That work taught me how an operation actually runs, where time and accuracy are lost, "
    "and what a correct bill or report looks like.",
    "I turned that knowledge into software. Three systems I designed and built are in daily use: "
    "a port billing system that applies tariff slabs, VAT and levy and prints A4 bills; a "
    "vehicle tracking system that replaced a single-person spreadsheet with a shared, "
    "offline-capable record; and an overtime billing tool that derives the rate and totals "
    "from one data-entry step. Each began with the workflow and its business rules; the "
    "interface came last. I build with AI-assisted development, while the requirements, "
    "business rules, testing and validation stay with me. The billing calculations are "
    "covered by automated tests and were compared against real bills.",
    "I am also building OpsFlow, a connected operations system for small and mid-sized "
    "transport and logistics businesses. It is a product case study in development: accounts, "
    "customers, fleet and quotations are built, and orders and trips are next. It shows how "
    "I move from a specific operational problem to a general product.",
    "I am looking for an international or remote role where operations knowledge and "
    "business-systems or product work meet. I would welcome a conversation about how I can "
    "contribute. My portfolio and case studies are at sasumel.pages.dev.",
    "Sincerely,",
]


def build() -> Path:
    doc = Document()
    section = doc.sections[0]
    section.top_margin = section.bottom_margin = Cm(2.0)
    section.left_margin = section.right_margin = Cm(2.3)

    style = doc.styles["Normal"]
    style.font.name = "Calibri"
    style.font.size = Pt(10.5)

    name = doc.add_paragraph()
    run = name.add_run("MD Samiul Alam Sumel")
    run.bold = True
    run.font.size = Pt(16)
    run.font.color.rgb = NAVY
    name.paragraph_format.space_after = Pt(0)

    contact = doc.add_paragraph(CONTACT)
    contact.runs[0].font.size = Pt(9)
    contact.paragraph_format.space_after = Pt(14)

    for text in PARAGRAPHS:
        para = doc.add_paragraph(text)
        para.paragraph_format.space_after = Pt(8)
        para.paragraph_format.line_spacing = 1.08

    doc.add_paragraph("MD Samiul Alam Sumel").runs[0].bold = True

    path = OUT_DIR / "Samiul_Alam_Sumel_Cover_Letter.docx"
    doc.save(path)
    return path


if __name__ == "__main__":
    print("Saved:", build())
