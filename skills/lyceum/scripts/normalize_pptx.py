"""Normalize duplicate paragraph properties emitted by PptxGenJS 4.0.1.

Only use on newly generated files. Identical repeated a:pPr elements are redundant
but invalid in DrawingML. Preserve text, run formatting, tables, charts and all
other package members. Conflicting properties raise instead of guessing.
"""

from __future__ import annotations

import argparse
from pathlib import Path
import re
import tempfile
from zipfile import ZipFile

from lxml import etree

NS = {"a": "http://schemas.openxmlformats.org/drawingml/2006/main"}


def normalize(path: Path) -> int:
    replacements = {}
    removed = 0
    with ZipFile(path) as source:
        for name in source.namelist():
            if not re.fullmatch(r"ppt/slides/slide\d+\.xml", name):
                continue
            root = etree.fromstring(source.read(name))
            changed = False
            for paragraph in root.xpath(".//a:p", namespaces=NS):
                props = paragraph.findall("a:pPr", NS)
                if len(props) <= 1:
                    continue
                first = etree.tostring(props[0])
                if paragraph[0] is not props[0] or any(
                    etree.tostring(prop) != first for prop in props[1:]
                ):
                    raise ValueError(f"conflicting paragraph properties in {name}")
                for prop in props[1:]:
                    paragraph.remove(prop)
                    removed += 1
                changed = True
            if changed:
                replacements[name] = etree.tostring(root, xml_declaration=True, encoding="UTF-8")
        if not replacements:
            return 0
        # Close the temporary file before reopening it on Windows.
        with tempfile.NamedTemporaryFile(dir=path.parent, suffix=".pptx", delete=False) as tmp:
            temporary = Path(tmp.name)
        try:
            with ZipFile(temporary, "w") as output:
                for member in source.infolist():
                    output.writestr(member, replacements.get(member.filename, source.read(member)))
            # Release the source handle before replacing on Windows.
        except BaseException:
            temporary.unlink(missing_ok=True)
            raise
    try:
        temporary.replace(path)
    finally:
        temporary.unlink(missing_ok=True)
    return removed


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("deck", type=Path)
    args = parser.parse_args()
    print(f"normalized {normalize(args.deck)} redundant paragraph properties")
