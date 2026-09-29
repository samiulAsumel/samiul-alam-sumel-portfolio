#!/usr/bin/env python3
"""Build the per-page-group CSS bundles (css/bundle-<name>.min.css).

Why: a page used to load 8-17 separate stylesheets, all render-blocking. Each
bundle concatenates exactly that page group's old link list, in the same order,
so the cascade is unchanged, and strips comments and whitespace.

Sources stay in css/*.css. Edit those, then run this script before committing.
Usage: python3 scripts/build_css.py [--check]   (--check exits 1 if a bundle is stale)
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CSS = ROOT / 'css'


def minify(text: str) -> str:
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.S)  # comments
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\s*([{};,>])\s*', r'\1', text)  # never touch spaces around + - * / (calc)
    text = re.sub(r':\s+', ':', text)
    return text.strip()


def main() -> int:
    bundles = json.loads((ROOT / 'scripts' / 'css-bundles.json').read_text())
    stale = False
    for name, sources in bundles.items():
        out = CSS / f'bundle-{name}.min.css'
        built = ''.join(minify((CSS / f'{src}.css').read_text()) + '\n' for src in sources)
        if '--check' in sys.argv:
            if not out.exists() or out.read_text() != built:
                print(f'STALE  {out.name}')
                stale = True
            continue
        out.write_text(built)
        print(f'wrote {out.name}: {len(sources)} files, {len(built):,} bytes')
    return 1 if stale else 0


if __name__ == '__main__':
    sys.exit(main())
