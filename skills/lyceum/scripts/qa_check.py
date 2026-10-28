#!/usr/bin/env python3
"""Lyceum QA checker — programmatic quality gate for academic decks.

Checks a .pptx for the failure modes that matter in scholarly presentations:
  [overflow]   estimated text height/width vs. its box (CJK/Latin width-aware)
  [offcanvas]  shapes extending beyond the slide canvas
  [overlap]    two text-bearing frames overlapping on the same slide
  [placeholder] leftover placeholders (TODO, xxx, lorem, 【待补充 ... )
  [font]       text runs without an explicit font name (breaks CJK machines)
  [editability] pages that look like full-bleed rendered images (not editable)
  [canvas]     slide size differing from the 13.33x7.5in design target
  [geometry]   negative shape extents that PowerPoint refuses to open
  [density]    optional sparse-content / missing-exhibit hints (--academic)

Usage:
  python qa_check.py deck.pptx                 # human-readable report
  python qa_check.py deck.pptx --json          # machine-readable report
  python qa_check.py deck.pptx --info          # also show INFO-level notes
  python qa_check.py deck.pptx --academic      # content metrics + density hints

Exit codes: 0 clean · 1 errors found · 2 warnings only · 3 usage/input error

Heuristics are deliberately conservative: only high-confidence issues are
ERRORs; everything arguable is a WARNING. Estimation never replaces a visual
pass — it catches what eyes miss on dense academic slides.
"""

from __future__ import annotations

import argparse
import json
import math
import re
import sys

try:
    from pptx import Presentation
    from pptx.util import Emu
except ImportError:  # pragma: no cover
    sys.stderr.write("python-pptx is required: pip install python-pptx\n")
    sys.exit(3)

EMU_PER_IN = 914400.0
EMU_PER_PT = 12700.0
CANONVAS_IN = (13.333, 7.5)  # LAYOUT_WIDE design target used by Lyceum

PLACEHOLDER_PAT = re.compile(
    r"(TODO|FIXME|lorem|xxx+|\[insert|点击此处|填写此处|【待补充|【占位|placeholder)", re.I
)

# Width of one glyph as a fraction of font size (advance-width heuristics).
def _char_width(ch: str) -> float:
    o = ord(ch)
    # CJK ideographs, CJK punctuation, fullwidth forms
    if 0x4E00 <= o <= 0x9FFF or 0x3000 <= o <= 0x303F or 0xFF00 <= o <= 0xFFEF or 0x2E80 <= o <= 0xF8FF:
        return 1.0
    if ch in "iIl.,:;'|!()[]":
        return 0.30
    if ch == " ":
        return 0.30
    if ch in "mwMW@":
        return 0.85
    if ch.isdigit() or ch.isupper():
        return 0.62
    return 0.52


def _run_font_pt(run, default_pt: float) -> float:
    try:
        if run.font.size is not None:
            return run.font.size.pt
    except Exception:
        pass
    return default_pt


def _is_cjk(text: str) -> bool:
    return any(0x4E00 <= ord(c) <= 0x9FFF for c in text)


class Issue:
    def __init__(self, level: str, kind: str, slide: int, detail: str):
        self.level, self.kind, self.slide, self.detail = level, kind, slide, detail

    def __str__(self) -> str:
        icon = {"ERROR": "✗", "WARNING": "△", "INFO": "·"}[self.level]
        return f"[{icon}{self.level:<7}] slide {self.slide:>2} · {self.kind:<11} {self.detail}"


def iter_frames(shapes):
    for s in shapes:
        if s.shape_type == 6:  # GROUP -> recurse
            yield from iter_frames(s.shapes)
        elif getattr(s, "has_text_frame", False) and s.has_text_frame:
            yield s


def iter_shapes(shapes):
    """Include nested shapes without applying group-coordinate assumptions."""
    for shape in shapes:
        yield shape
        if shape.shape_type == 6:
            yield from iter_shapes(shape.shapes)


def academic_metrics(slide, idx: int, issues: list[Issue]) -> dict:
    """Report exhibit candidates, not whether a figure supports a research claim.

    Restrict density to the body band so a long title/footer cannot hide an empty
    page. Covers, indexes, references and explicit discussion pages are exempt;
    the role is optional metadata in notes, e.g. ``Lyceum role: cover``.
    """
    notes = slide.notes_slide.notes_text_frame.text if slide.has_notes_slide else ""
    match = re.search(r"Lyceum role:\s*([a-z-]+)", notes, re.I)
    role = match.group(1).lower() if match else "content"
    body = [sh for sh in iter_shapes(slide.shapes)
            if sh.shape_type != 6 and 1.45 <= sh.top / EMU_PER_IN < 6.95]
    texts = []
    charts = tables = pictures = connectors = nodes = 0
    for sh in body:
        if getattr(sh, "has_text_frame", False):
            texts.append(sh.text_frame.text)
        if getattr(sh, "has_chart", False):
            charts += 1
        if getattr(sh, "has_table", False):
            tables += 1
            texts.extend(cell.text for row in sh.table.rows for cell in row.cells)
        area = sh.width * sh.height / EMU_PER_IN ** 2
        if sh.shape_type == 13 and area >= 0.8:
            pictures += 1
        geometry = sh._element.find(
            ".//{http://schemas.openxmlformats.org/drawingml/2006/main}prstGeom"
        )
        # PptxGenJS exports lines as p:sp/prstGeom=line, not p:cxnSp.
        # Plain horizontal separators do not establish a process diagram.
        is_line = sh.shape_type == 9 or (geometry is not None and geometry.get("prst") == "line")
        arrow_ends = sh._element.findall(
            ".//{http://schemas.openxmlformats.org/drawingml/2006/main}headEnd"
        ) + sh._element.findall(
            ".//{http://schemas.openxmlformats.org/drawingml/2006/main}tailEnd"
        )
        has_arrow = any(end.get("type") not in {None, "none"} for end in arrow_ends)
        if is_line and (sh.shape_type == 9 or has_arrow):
            connectors += 1
        if sh.shape_type == 1 and not is_line and 0.1 <= area <= 30:
            nodes += 1
    chars = len(re.sub(r"\s+", "", "".join(texts)))
    diagram_candidate = connectors >= 1 and nodes >= 3
    exhibit = bool(charts or tables or pictures or diagram_candidate)
    exempt = role in {"cover", "agenda", "divider", "references", "discussion", "closing"}
    if not exempt:
        if chars < 80 and not exhibit:
            issues.append(Issue("WARNING", "density", idx,
                f"body has only {chars} native characters and no exhibit candidate; "
                "consider merging or adding sourced explanation"))
        if not exhibit:
            issues.append(Issue("WARNING", "exhibit", idx,
                "no substantive-size image, native chart/table or diagram candidate; "
                "review whether this research task needs a figure"))
    return {"slide": idx, "role": role, "body_chars": chars, "charts": charts,
            "tables": tables, "pictures": pictures, "diagram_candidate": diagram_candidate}


def estimate_frame(shape, default_pt: float = 18.0) -> dict:
    """Estimate rendered text geometry for one text-bearing shape."""
    box_w_pt = (shape.width or 0) / EMU_PER_PT
    box_h_pt = (shape.height or 0) / EMU_PER_PT
    total_h = 0.0
    font_min, font_max = 1e9, 0.0
    max_line_fill = 0.0
    longest_word_pt = 0.0
    frame = shape.text_frame
    wrap = frame.word_wrap
    for para in frame.paragraphs:
        text = "".join(r.text for r in para.runs)
        sizes = [_run_font_pt(r, default_pt) for r in para.runs] or [default_pt]
        pt = max(sizes)
        font_min = min(font_min, min(sizes))
        font_max = max(font_max, pt)
        line_h = pt * (1.35 if _is_cjk(text) else 1.22)
        if not text.strip():
            total_h += line_h * 0.6
            continue
        width_pt = sum(_char_width(c) for c in text) * pt
        usable_w = max(box_w_pt - 7.2, 1.0)  # ~0.1" default insets both sides
        lines = max(1, math.ceil(width_pt / usable_w)) if wrap is not False else 1
        max_line_fill = max(max_line_fill, width_pt / usable_w / lines)
        # longest unbreakable run (CJK breaks anywhere; Latin words do not)
        if wrap is not False:
            for word in re.findall(r"[A-Za-z0-9\-_.:/]+", text):
                longest_word_pt = max(longest_word_pt, len(word) * 0.55 * pt)
        total_h += lines * line_h
        if para.space_after is not None:
            total_h += para.space_after.pt
        elif para.space_before is not None:
            total_h += para.space_before.pt
    return {
        "box_w_pt": box_w_pt, "box_h_pt": box_h_pt, "est_h_pt": total_h,
        "font_min": font_min if font_min < 1e9 else None,
        "font_max": font_max, "max_line_fill": max_line_fill,
        "longest_word_pt": longest_word_pt, "wrap": wrap,
    }


def check_slide(idx: int, slide, issues: list[Issue], canvas_in: tuple[float, float]):
    W, H = canvas_in
    Wemu, Hemu = W * EMU_PER_IN, H * EMU_PER_IN
    text_shapes = []
    pic_area = 0
    total_area = Wemu * Hemu

    for sh in iter_shapes(slide.shapes):
        if sh.width < 0 or sh.height < 0:
            issues.append(Issue("ERROR", "geometry", idx,
                f"'{sh.name}' has negative width/height — invalid DrawingML extent"))
    for paragraph in slide._element.findall(
        ".//{http://schemas.openxmlformats.org/drawingml/2006/main}p"
    ):
        props = paragraph.findall(
            "{http://schemas.openxmlformats.org/drawingml/2006/main}pPr"
        )
        if len(props) > 1:
            issues.append(Issue("ERROR", "xml", idx,
                "paragraph has duplicate properties — PowerPoint may refuse to open it"))
    for cell_props in slide._element.findall(
        ".//{http://schemas.openxmlformats.org/drawingml/2006/main}tcPr"
    ):
        if cell_props.get("anchor") not in {None, "t", "ctr", "b", "just", "dist"}:
            issues.append(Issue("ERROR", "xml", idx,
                f"invalid table anchor {cell_props.get('anchor')!r}; "
                "PptxGenJS tables use valign='middle'"))

    for sh in slide.shapes:
        # off-canvas (allow 0.02" tolerance)
        try:
            l, t, w, h = sh.left or 0, sh.top or 0, sh.width or 0, sh.height or 0
            if l < -18000 or t < -18000 or l + w > Wemu + 18000 or t + h > Hemu + 18000:
                issues.append(Issue("WARNING", "offcanvas", idx,
                    f"{sh.shape_type} '{sh.name}' extends beyond canvas "
                    f"(+{(l + w - Wemu) / EMU_PER_IN:.2f}in right, +{(t + h - Hemu) / EMU_PER_IN:.2f}in bottom)"))
        except Exception:
            pass
        if sh.shape_type == 13:  # PICTURE
            pic_area += (sh.width or 0) * (sh.height or 0)

    for sh in iter_frames(slide.shapes):
        text = sh.text_frame.text
        if not text.strip():
            continue
        text_shapes.append((sh, text))

        for para in sh.text_frame.paragraphs:
            ptext = "".join(r.text for r in para.runs)
            m = PLACEHOLDER_PAT.search(ptext)
            if m:
                issues.append(Issue("ERROR", "placeholder", idx,
                    f"leftover placeholder {m.group(0)!r} in '{ptext[:30]}...'"))
                break

        est = estimate_frame(sh)
        fmin = est["font_min"]
        if est["est_h_pt"] > est["box_h_pt"] * 1.12 and est["box_h_pt"] > 0:
            ratio = est["est_h_pt"] / est["box_h_pt"]
            issues.append(Issue("ERROR" if ratio > 1.35 else "WARNING", "overflow", idx,
                f"text est {est['est_h_pt']:.0f}pt > box {est['box_h_pt']:.0f}pt "
                f"(x{ratio:.2f}) in '{text[:24]}...'"))
        if est["wrap"] is False and est["max_line_fill"] > 1.05:
            issues.append(Issue("WARNING", "overflow", idx,
                f"word_wrap off but text wider than box in '{text[:24]}...'"))
        if est["longest_word_pt"] > est["box_w_pt"] * 0.98:
            issues.append(Issue("WARNING", "overflow", idx,
                f"unbreakable token ~{est['longest_word_pt']:.0f}pt ≈ box width "
                f"{est['box_w_pt']:.0f}pt in '{text[:24]}...'"))
        if fmin is not None and fmin < 12:
            issues.append(Issue("WARNING", "fontsize", idx,
                f"font {fmin:.0f}pt < 12pt minimum in '{text[:24]}...'"))
        no_font = [r.text[:12] for p in sh.text_frame.paragraphs for r in p.runs
                   if r.text.strip() and r.font.name is None]
        if no_font:
            issues.append(Issue("WARNING", "font", idx,
                f"{len(no_font)} run(s) without explicit font name "
                f"(e.g. {no_font[0]!r}) — substitutes on other machines"))

    # text-frame overlap (both non-empty)
    for i in range(len(text_shapes)):
        for j in range(i + 1, len(text_shapes)):
            a, ta = text_shapes[i]
            b, tb = text_shapes[j]
            ax1, ay1 = a.left, a.top
            ax2, ay2 = a.left + a.width, a.top + a.height
            bx1, by1 = b.left, b.top
            bx2, by2 = b.left + b.width, b.top + b.height
            ox = max(0, min(ax2, bx2) - max(ax1, bx1))
            oy = max(0, min(ay2, by2) - max(ay1, by1))
            inter = ox * oy
            smaller = min(a.width * a.height, b.width * b.height)
            if smaller > 0 and inter / smaller > 0.20:
                issues.append(Issue("WARNING", "overlap", idx,
                    f"text frames overlap {inter / smaller:.0%}: "
                    f"'{ta[:18]}...' × '{tb[:18]}...'"))

    # editability: picture-dominated page with almost no native text
    native_chars = sum(len(t) for _, t in text_shapes)
    if pic_area / total_area > 0.80 and native_chars < 12:
        issues.append(Issue("ERROR", "editability", idx,
            "page is a near-full-bleed image with <12 native chars — "
            "likely a rendered (non-editable) slide"))


def main() -> int:
    ap = argparse.ArgumentParser(description="Lyceum QA checker")
    ap.add_argument("deck")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--info", action="store_true")
    ap.add_argument("--academic", action="store_true",
                    help="report academic content metrics and sparse-page hints")
    args = ap.parse_args()

    try:
        prs = Presentation(args.deck)
    except Exception as e:
        if args.json:
            print(json.dumps({"error": str(e)}))
        else:
            sys.stderr.write(f"cannot open deck: {e}\n")
        return 3

    canvas_in = (prs.slide_width / EMU_PER_IN, prs.slide_height / EMU_PER_IN)
    issues: list[Issue] = []

    if abs(canvas_in[0] - CANONVAS_IN[0]) > 0.05 or abs(canvas_in[1] - CANONVAS_IN[1]) > 0.05:
        issues.append(Issue("INFO", "canvas", 0,
            f"canvas is {canvas_in[0]:.2f}x{canvas_in[1]:.2f}in, design target is "
            f"{CANONVAS_IN[0]:.2f}x{CANONVAS_IN[1]:.2f}in — font-size rules assume 13.33x7.5"))

    metrics = []
    for idx, slide in enumerate(prs.slides, start=1):
        check_slide(idx, slide, issues, canvas_in)
        if args.academic:
            metrics.append(academic_metrics(slide, idx, issues))

    errors = [i for i in issues if i.level == "ERROR"]
    warns = [i for i in issues if i.level == "WARNING"]
    infos = [i for i in issues if i.level == "INFO"]

    if args.json:
        print(json.dumps({
            "deck": args.deck,
            "slides": len(prs.slides._sldIdLst),
            "canvas_in": [round(c, 2) for c in canvas_in],
            "errors": [vars(i) for i in errors],
            "warnings": [vars(i) for i in warns],
            "infos": [vars(i) for i in infos],
            **({"content_metrics": metrics} if args.academic else {}),
        }, ensure_ascii=False, indent=2))
    else:
        for i in issues:
            if i.level == "INFO" and not args.info:
                continue
            print(i)
        print(f"\n== Lyceum QA · {len(prs.slides._sldIdLst)} slides · "
              f"{len(errors)} error(s), {len(warns)} warning(s) ==")
        for item in metrics:
            print(f"  slide {item['slide']}: {item['body_chars']} body chars, "
                  f"{item['charts']} chart(s), {item['tables']} table(s), "
                  f"{item['pictures']} picture(s), "
                  f"diagram candidate={item['diagram_candidate']}")

    return 1 if errors else (2 if warns else 0)


if __name__ == "__main__":
    sys.exit(main())
