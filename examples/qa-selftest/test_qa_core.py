"""Unit tests for the core heuristics in qa_check.py.

Offline only: decks are built in memory with python-pptx. No network, no model,
no real Office installation is involved.
"""
from __future__ import annotations

import importlib.util
from pathlib import Path
import struct
import tempfile
import unittest
import zlib

from pptx import Presentation
from pptx.util import Inches, Pt

ROOT = Path(__file__).resolve().parents[2]
SCRIPTS = ROOT / 'skills' / 'lyceum' / 'scripts'


def load(name):
    spec = importlib.util.spec_from_file_location(name, SCRIPTS / f'{name}.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


qa = load('qa_check')
EMU_PER_IN = 914400


def slide():
    deck = Presentation()
    deck.slide_width, deck.slide_height = Inches(13.333), Inches(7.5)
    return deck, deck.slides.add_slide(deck.slide_layouts[6])


def text(target, value, x=1, y=2, w=10, h=1, pt=18, font='Segoe UI'):
    shape = target.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    run = shape.text_frame.paragraphs[0].add_run()
    run.text = value
    if font is not None:
        run.font.name = font
    if pt is not None:
        run.font.size = Pt(pt)
    return shape


def issues_for(target):
    issues = []
    qa.check_slide(1, target, issues, (13.333, 7.5))
    return issues


def tiny_png(width=1, height=1):
    """Generate a valid PNG with the standard library, avoiding image fixtures."""
    def chunk(tag, data):
        return (struct.pack('>I', len(data)) + tag + data
                + struct.pack('>I', zlib.crc32(tag + data) & 0xFFFFFFFF))

    scanlines = b''.join(b'\x00' + b'\xff\x00\x00' * width for _ in range(height))
    return (b'\x89PNG\r\n\x1a\n'
            + chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0))
            + chunk(b'IDAT', zlib.compress(scanlines))
            + chunk(b'IEND', b''))


class CharWidthTests(unittest.TestCase):
    def test_cjk_and_fullwidth_are_full_em(self):
        for char in ('中', '。', 'Ａ', '，'):
            with self.subTest(char=char):
                self.assertEqual(qa._char_width(char), 1.0)

    def test_narrow_punctuation_and_space(self):
        for char in ('i', 'l', '.', ',', ' ', '(', '!', "'"):
            with self.subTest(char=char):
                self.assertEqual(qa._char_width(char), 0.30)

    def test_wide_latin_and_uppercase(self):
        for char in ('m', 'w', 'M', 'W', '@'):
            with self.subTest(char=char):
                self.assertEqual(qa._char_width(char), 0.85)
        for char in ('7', 'A', 'B', 'Z'):
            with self.subTest(char=char):
                self.assertEqual(qa._char_width(char), 0.62)

    def test_lowercase_default(self):
        for char in ('a', 'b', 'x', 'z'):
            with self.subTest(char=char):
                self.assertEqual(qa._char_width(char), 0.52)

    def test_is_cjk(self):
        self.assertTrue(qa._is_cjk('中文 ABC'))
        self.assertFalse(qa._is_cjk('plain ASCII'))
        self.assertFalse(qa._is_cjk(''))


class RunAndIssueTests(unittest.TestCase):
    def test_run_font_pt_uses_explicit_size_or_default(self):
        _, target = slide()
        shape = text(target, 'sized', pt=11)
        run = shape.text_frame.paragraphs[0].runs[0]
        self.assertEqual(qa._run_font_pt(run, 18.0), 11.0)
        run.font.size = None
        self.assertEqual(qa._run_font_pt(run, 18.0), 18.0)

    def test_issue_string_contains_icon_level_and_slide(self):
        self.assertIn('✗ERROR', str(qa.Issue('ERROR', 'overflow', 3, 'oops')))
        self.assertIn('△WARNING', str(qa.Issue('WARNING', 'overlap', 2, 'oops')))
        self.assertIn('·INFO', str(qa.Issue('INFO', 'canvas', 0, 'oops')))
        self.assertIn('slide  3', str(qa.Issue('ERROR', 'overflow', 3, 'oops')))


class EstimateFrameTests(unittest.TestCase):
    def test_empty_paragraph_uses_partial_line(self):
        _, target = slide()
        shape = text(target, '', w=10, h=1)
        est = qa.estimate_frame(shape)
        # 18pt * 1.22 (no CJK) * 0.6 for an empty paragraph.
        self.assertAlmostEqual(est['est_h_pt'], 18 * 1.22 * 0.6, places=2)
        self.assertEqual(est['box_h_pt'], 72.0)

    def test_cjk_uses_taller_line_factor(self):
        _, target = slide()
        est = qa.estimate_frame(text(target, '中文', w=10, h=1))
        self.assertAlmostEqual(est['est_h_pt'], 18 * 1.35, places=2)

    def test_latin_uses_short_line_factor(self):
        _, target = slide()
        est = qa.estimate_frame(text(target, 'ab', w=10, h=1))
        self.assertAlmostEqual(est['est_h_pt'], 18 * 1.22, places=2)

    def test_long_cjk_text_wraps_and_overflows(self):
        _, target = slide()
        shape = text(target, '中' * 200, x=1, y=2, w=1, h=1)
        shape.text_frame.word_wrap = True
        est = qa.estimate_frame(shape)
        self.assertIs(est['wrap'], True)
        self.assertGreater(est['est_h_pt'], est['box_h_pt'] * 1.35)

    def test_no_wrap_keeps_single_line(self):
        _, target = slide()
        shape = text(target, '中' * 200, w=1, h=1)
        shape.text_frame.word_wrap = False
        est = qa.estimate_frame(shape)
        self.assertIs(est['wrap'], False)
        self.assertAlmostEqual(est['est_h_pt'], 18 * 1.35, places=2)
        self.assertGreater(est['max_line_fill'], 1.05)

    def test_font_size_range_across_paragraphs(self):
        _, target = slide()
        shape = text(target, 'small', pt=10)
        second = shape.text_frame.add_paragraph()
        run = second.add_run()
        run.text = 'BIG'
        run.font.name, run.font.size = 'Segoe UI', Pt(24)
        est = qa.estimate_frame(shape)
        self.assertEqual(est['font_min'], 10.0)
        self.assertEqual(est['font_max'], 24.0)

    def test_space_after_is_counted(self):
        _, target = slide()
        shape = text(target, 'spaced', w=10, h=1)
        before = qa.estimate_frame(shape)['est_h_pt']
        shape.text_frame.paragraphs[0].space_after = Pt(6)
        after = qa.estimate_frame(shape)['est_h_pt']
        self.assertAlmostEqual(after - before, 6.0, places=2)

    def test_unbreakable_latin_token_is_measured(self):
        _, target = slide()
        shape = text(target, 'Supercalifragilisticexpialidocious', w=1, h=1)
        shape.text_frame.word_wrap = True
        est = qa.estimate_frame(shape)
        self.assertGreater(est['longest_word_pt'], 300)


class CheckSlideTests(unittest.TestCase):
    def test_placeholder_markers_are_errors(self):
        for marker in ('TODO', 'FIXME', 'lorem', 'xxx', '【待补充', '【占位',
                       'placeholder', '点击此处'):
            with self.subTest(marker=marker):
                _, target = slide()
                text(target, f'text with marker {marker} inside')
                issues = issues_for(target)
                self.assertTrue(any(i.kind == 'placeholder' and i.level == 'ERROR'
                                    for i in issues))

    def test_ordinary_text_is_not_a_placeholder(self):
        _, target = slide()
        text(target, 'A normal sentence about method and evidence.')
        self.assertFalse([i for i in issues_for(target) if i.kind == 'placeholder'])

    def test_offcanvas_tolerance_boundary(self):
        def offcanvas(extra):
            _, target = slide()
            shape = text(target, 'x', x=0, y=0, w=1, h=0.5)
            shape.left = int(13.333 * EMU_PER_IN) + 18000 - EMU_PER_IN
            shape.width = EMU_PER_IN + extra
            return [i for i in issues_for(target) if i.kind == 'offcanvas']

        self.assertEqual(offcanvas(0), [])
        self.assertEqual(len(offcanvas(2000)), 1)

    def test_overlap_threshold_boundary(self):
        def overlap(right_edge):
            _, target = slide()
            text(target, 'frame A', x=1, y=1, w=2, h=1)
            text(target, 'frame B', x=right_edge, y=1, w=2, h=1)
            return [i for i in issues_for(target) if i.kind == 'overlap']

        # 1/2 = exactly 20% -> not flagged; 0.41/2 > 20% -> flagged.
        self.assertEqual(overlap(2.6), [])
        self.assertEqual(len(overlap(2.59)), 1)

    def test_font_size_warning_boundary(self):
        _, at_floor = slide()
        text(at_floor, 'ok', pt=12)
        self.assertFalse([i for i in issues_for(at_floor) if i.kind == 'fontsize'])

        _, below = slide()
        text(below, 'too small', pt=11)
        self.assertTrue(any(i.kind == 'fontsize' and i.level == 'WARNING'
                            for i in issues_for(below)))

    def test_missing_font_name_is_a_warning(self):
        _, target = slide()
        shape = target.shapes.add_textbox(Inches(1), Inches(2), Inches(10), Inches(1))
        shape.text_frame.paragraphs[0].add_run().text = 'no explicit font'
        self.assertTrue(any(i.kind == 'font' and i.level == 'WARNING'
                            for i in issues_for(target)))

    def test_near_full_bleed_picture_is_not_editable(self):
        with tempfile.TemporaryDirectory() as directory:
            image = Path(directory) / 'background.png'
            image.write_bytes(tiny_png())
            _, target = slide()
            target.shapes.add_picture(str(image), Inches(0), Inches(0), Inches(13), Inches(7.4))
            self.assertTrue(any(i.kind == 'editability' and i.level == 'ERROR'
                                for i in issues_for(target)))

    def test_picture_with_native_text_is_editable(self):
        with tempfile.TemporaryDirectory() as directory:
            image = Path(directory) / 'background.png'
            image.write_bytes(tiny_png())
            _, target = slide()
            target.shapes.add_picture(str(image), Inches(0), Inches(0), Inches(13), Inches(7.4))
            text(target, 'native editable text with plenty of characters', x=0.5, y=0.5)
            self.assertFalse([i for i in issues_for(target) if i.kind == 'editability'])

    def test_group_shapes_are_recursed_for_text(self):
        _, target = slide()
        group = target.shapes.add_group_shape()
        inner = group.shapes.add_textbox(Inches(1), Inches(2), Inches(3), Inches(1))
        inner.text_frame.paragraphs[0].add_run().text = 'TODO inside a group'
        self.assertTrue(any(i.kind == 'placeholder' for i in issues_for(target)))

    def test_iter_shapes_includes_group_children(self):
        _, target = slide()
        group = target.shapes.add_group_shape()
        group.shapes.add_textbox(Inches(1), Inches(2), Inches(3), Inches(1))
        group.shapes.add_textbox(Inches(5), Inches(2), Inches(3), Inches(1))
        self.assertEqual(len(list(qa.iter_shapes(target.shapes))), 3)


if __name__ == '__main__':
    unittest.main()
