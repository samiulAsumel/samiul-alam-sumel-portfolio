#!/usr/bin/env python3
"""Strip indentation, blank lines and JSON-LD whitespace from the site's HTML.

Run from anywhere: python3 scripts/minify_html.py
Safe to re-run. Line breaks stay (browsers collapse them to one space), so inline text is unchanged.
"""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
# Raw-text elements keep their content exactly as written.
RAW = re.compile(r"<(script|style|pre|textarea)\b[^>]*>", re.I)
JSONLD = re.compile(r'(<script type="application/ld\+json">)(.*?)(</script>)', re.S)


def minify_jsonld(match: re.Match[str]) -> str:
    """Compact one JSON-LD block without changing its data."""
    data = json.loads(match.group(2))
    return match.group(1) + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + match.group(3)


def minify(source: str) -> str:
    """Remove leading whitespace and blank lines outside raw-text elements."""
    source = JSONLD.sub(minify_jsonld, source)
    out: list[str] = []
    raw_end: str | None = None
    for line in source.split("\n"):
        if raw_end:
            out.append(line)
            if raw_end in line.lower():
                raw_end = None
            continue
        stripped = line.strip()
        if not stripped:
            continue
        out.append(stripped)
        opener = RAW.search(stripped)
        if opener and f"</{opener.group(1).lower()}>" not in stripped.lower():
            raw_end = f"</{opener.group(1).lower()}>"
    return "\n".join(out) + "\n"


def main() -> None:
    files = subprocess.check_output(["git", "ls-files", "*.html"], cwd=ROOT, text=True).split()
    for name in files:
        path = ROOT / name
        before = path.read_text(encoding="utf-8")
        after = minify(before)
        if after != before:
            path.write_text(after, encoding="utf-8")
        print(f"{name}: {len(before)} -> {len(after)} bytes")


if __name__ == "__main__":
    main()
