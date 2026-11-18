#!/usr/bin/env bash
# One-shot verification for academic-ppt: syntax -> unit tests -> build -> QA.
# Usage:
#   bash scripts/verify.sh
#   PYTHON="py -3.12" bash scripts/verify.sh    # select a specific interpreter
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PYTHON="${PYTHON:-python}"
cd "$ROOT"

echo "== [1/4] Python syntax =="
$PYTHON -m py_compile \
  skills/lyceum/scripts/qa_check.py \
  skills/lyceum/scripts/normalize_pptx.py \
  examples/qa-selftest/test_qa.py \
  examples/qa-selftest/test_qa_core.py \
  examples/qa-selftest/test_qa_cli.py

echo "== [2/4] Unit tests =="
PYTHON="$PYTHON" npm test

echo "== [3/4] Build example deck =="
npm run build

echo "== [4/4] Programmatic QA =="
PYTHON="$PYTHON" npm run qa

echo "== verify.sh: all checks passed =="
