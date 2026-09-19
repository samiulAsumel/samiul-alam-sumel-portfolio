#!/usr/bin/env python3
"""Regenerate sitemap.xml from the site's HTML files.

Run from anywhere: python3 scripts/generate_sitemap.py
"""
from __future__ import annotations

import subprocess
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE_URL = "https://sasumel.pages.dev"
# 404 is intentionally excluded; it must never be indexed.
EXCLUDED = {"404.html"}
PRIORITY = {"": "1.0", "resume": "0.9", "about": "0.8", "experience": "0.8", "engineering": "0.8"}


def page_url(path: Path) -> str:
    """Map an HTML file to its canonical public URL."""
    rel = path.relative_to(ROOT).as_posix()
    if rel == "index.html":
        return f"{BASE_URL}/"
    if rel.endswith("/index.html"):
        return f"{BASE_URL}/{rel[: -len('index.html')]}"
    return f"{BASE_URL}/{rel}"


def last_modified(path: Path) -> str:
    """Return the last change date for a file, in YYYY-MM-DD."""
    # Uncommitted edits count as modified today, so the sitemap is right before the commit lands.
    dirty = subprocess.run(
        ["git", "status", "--porcelain", "--", str(path)],
        cwd=ROOT, capture_output=True, text=True, check=True,
    )
    if dirty.stdout.strip():
        return date.today().isoformat()
    result = subprocess.run(
        ["git", "log", "-1", "--format=%cs", "--", str(path)],
        cwd=ROOT, capture_output=True, text=True, check=True,
    )
    return result.stdout.strip()


def build_sitemap() -> str:
    """Build the sitemap XML document as a string."""
    pages = sorted(
        p for p in ROOT.rglob("*.html")
        if p.name not in EXCLUDED and "node_modules" not in p.parts
    )
    entries = []
    for page in pages:
        url = page_url(page)
        slug = url.removeprefix(BASE_URL).strip("/").split("/")[0]
        priority = PRIORITY.get(slug, "0.7")
        entries.append(
            f"  <url>\n    <loc>{url}</loc>\n    <lastmod>{last_modified(page)}</lastmod>\n"
            f"    <priority>{priority}</priority>\n  </url>"
        )
    body = "\n".join(entries)
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{body}\n</urlset>\n"
    )


def main() -> None:
    (ROOT / "sitemap.xml").write_text(build_sitemap(), encoding="utf-8")
    print("Wrote sitemap.xml")


if __name__ == "__main__":
    main()
