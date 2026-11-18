"""CLI-level tests for qa_check.py main(): exit codes and report shapes.

Offline only: decks are built in memory with python-pptx and written to a
temporary directory. No network, model or Office installation is involved.
"""
from __future__ import annotations

import importlib.util
import io
import json
from contextlib import redirect_stderr, redirect_stdout
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

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


def make_deck(path, *, canvas=(13.333, 7.5), text='Clean slide.', pt=18):
    deck = Presentation()
    deck.slide_width, deck.slide_height = Inches(canvas[0]), Inches(canvas[1])
    target = deck.slides.add_slide(deck.slide_layouts[6])
    shape = target.shapes.add_textbox(Inches(0.5), Inches(2), Inches(8), Inches(1))
    run = shape.text_frame.paragraphs[0].add_run()
    run.text = text
    run.font.name = 'Segoe UI'
    run.font.size = Pt(pt)
    deck.save(path)
    return path


def run_qa(path, *flags):
    out, err = io.StringIO(), io.StringIO()
    argv = ['qa_check.py', str(path), *flags]
    with patch.object(sys, 'argv', argv), redirect_stdout(out), redirect_stderr(err):
        code = qa.main()
    return code, out.getvalue(), err.getvalue()


class ExitCodeTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.dir = Path(self.tmp.name)

    def test_clean_deck_returns_zero(self):
        path = make_deck(self.dir / 'clean.pptx')
        code, out, _ = run_qa(path)
        self.assertEqual(code, 0)
        self.assertIn('0 error(s), 0 warning(s)', out)

    def test_warning_only_deck_returns_two(self):
        path = make_deck(self.dir / 'warning.pptx', text='too small', pt=11)
        code, out, _ = run_qa(path)
        self.assertEqual(code, 2)
        self.assertIn('fontsize', out)

    def test_error_deck_returns_one(self):
        path = make_deck(self.dir / 'error.pptx', text='TODO fix this slide')
        code, out, _ = run_qa(path)
        self.assertEqual(code, 1)
        self.assertIn('placeholder', out)

    def test_corrupt_deck_returns_three(self):
        path = self.dir / 'corrupt.pptx'
        path.write_bytes(b'this is not a pptx archive')
        code, _, err = run_qa(path)
        self.assertEqual(code, 3)
        self.assertIn('cannot open deck', err)

    def test_missing_file_returns_three_with_json_error(self):
        code, out, _ = run_qa(self.dir / 'absent.pptx', '--json')
        self.assertEqual(code, 3)
        self.assertIn('error', json.loads(out))

    def test_missing_arguments_exit_two_from_argparse(self):
        err = io.StringIO()
        with patch.object(sys, 'argv', ['qa_check.py']), redirect_stderr(err):
            with self.assertRaises(SystemExit) as caught:
                qa.main()
        # Documented as exit 3 in the module docstring, but argparse actually uses 2.
        self.assertEqual(caught.exception.code, 2)
        self.assertIn('usage:', err.getvalue())


class ReportShapeTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.dir = Path(self.tmp.name)

    def test_json_report_schema(self):
        path = make_deck(self.dir / 'clean.pptx')
        code, out, _ = run_qa(path, '--json')
        self.assertEqual(code, 0)
        report = json.loads(out)
        self.assertEqual(report['slides'], 1)
        self.assertEqual(report['canvas_in'], [13.33, 7.5])
        self.assertEqual(report['deck'], str(path))
        for key in ('errors', 'warnings', 'infos'):
            self.assertIsInstance(report[key], list)
        self.assertNotIn('content_metrics', report)

    def test_academic_adds_content_metrics(self):
        path = make_deck(self.dir / 'clean.pptx')
        _, out, _ = run_qa(path, '--json', '--academic')
        report = json.loads(out)
        self.assertEqual(len(report['content_metrics']), 1)
        metric = report['content_metrics'][0]
        for key in ('slide', 'role', 'body_chars', 'charts', 'tables',
                    'pictures', 'diagram_candidate'):
            self.assertIn(key, metric)
        self.assertEqual(metric['role'], 'content')

    def test_issue_objects_are_plain_dicts_in_json(self):
        path = make_deck(self.dir / 'error.pptx', text='lorem ipsum draft')
        _, out, _ = run_qa(path, '--json')
        report = json.loads(out)
        self.assertTrue(report['errors'])
        self.assertEqual(set(report['errors'][0]),
                         {'level', 'kind', 'slide', 'detail'})

    def test_info_flag_reveals_canvas_note(self):
        path = make_deck(self.dir / 'narrow.pptx', canvas=(10, 7.5), text='short')
        _, without, _ = run_qa(path)
        _, with_info, _ = run_qa(path, '--info')
        self.assertNotIn('canvas is', without)
        self.assertIn('canvas is', with_info)


@unittest.skip('render_powerpoint.ps1 需要 Windows PowerPoint；离线/CI 环境不可用，视觉复核是人工步骤')
class RenderGateTests(unittest.TestCase):
    def test_render_powerpoint_is_available(self):
        # Intentionally skipped: this repository's render step requires a real
        # PowerPoint install on Windows (or a LibreOffice/pdftoppm toolchain),
        # neither of which is part of the offline Python test contract.
        self.fail('render gate is not part of the offline test suite')


if __name__ == '__main__':
    unittest.main()
