# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `skills/lyceum/references/theme-index.md`: single index for all 19 visual themes — full design
  tokens, signature motifs, priority rules, copy-paste prompt templates, cross-scenario
  combinations, and an acceptance checklist for verifying a deck did not silently default.
- `examples/theme-preview/`: 19 one-page theme renders, 6 scenario-skeleton renders and two
  named contact sheets. Both READMEs now embed a labelled thumbnail grid, so every theme name in
  the table links directly to its own preview.
- Both READMEs now open with "scenario + visual style" and document how to select a theme.

### Changed

- Academic blue is now an explicit **fallback**, not an imposed default. When a new-deck request
  does not name a theme, the agent asks once which style to use; vague adjectives are not treated
  as a theme name. All 19 named themes are first-class options.
- `SKILL.md` Step 1 resolves the visual style before any slide is built; the academic-blue
  reference now governs only the shared grid/density/figure contract, not the palette.

## [1.1.0] - 2026-10-28

### Changed

- Rename the repository to **Academic PPT** (`academic-ppt`); retain the `lyceum` skill entrypoint.
- Default all six scenarios to an academic white/blue visual system. Keep 18 legacy themes opt-in.
- Replace the strict single-claim/eight-line rules with research-task planning, substantive figure
  selection and related evidence/interpretation on the same page.
- Rebuild the nine-slide example with research-question derivation, a three-row research map,
  horizontal technical route, editable method architecture, native results, diagnostic curves,
  and a schedule. Refresh all nine PowerPoint-rendered previews.
- Remove unsupported significance, citation and repetition claims from the fictional example.
- Require visual inspection as well as programmatic QA.

### Added

- `references/academic-blue.md`: shared palette, grid, density guidance and three reference compositions.
- Optional `qa_check.py --academic` metrics and sparse/exhibit hints.
- Checks for negative DrawingML extents, duplicate paragraph properties and invalid table anchors.
- A normalization pass for identical duplicate paragraph properties from PptxGenJS 4.0.1.
- A read-only PowerPoint render script that fails on open/export errors.
- Thirteen regression checks covering density, native exhibits, XML compatibility and the original fixture.
- Locked Node dependencies, Python QA requirements and a GitHub Actions build/test workflow.


## [1.0.0] - 2026-10-26

### Added

- **Six scenario systems** with page skeletons, design tokens, content playbooks,
  and per-scenario pitfall lists:
  - `group-meeting.md` — 组会汇报 (themes: 研纸墨蓝 · 暖砂陶 · 夜航实验室)
  - `conference.md` — 学术会议报告 (themes: 藏青金 · 林壑墨绿 · 讲坛酒红)
  - `progress.md` — 科研进展/中期/结题 (themes: 卷宗红 · 党建正红 · 石板青)
  - `defense.md` — 学位论文答辩 (themes: 学院蓝 · 学院红金 · 石板牛津)
  - `proposal.md` — 开题报告 (themes: 蓝图青 · 青苗计划 · 石墨工程)
  - `paper-reading.md` — 文献分享/journal club (themes: 纸边笔记 · 暖页批注 · 冷阅审稿)
- **`SKILL.md` core**: scenario routing table, native-editability iron law, original-file
  protection, 5-step workflow, academic content method (action titles, ghost-deck test,
  assertion→evidence, on-slide citations), CJK/Latin split-run typography rules,
  five-layer visual system (paper background → cards → ink ramp → one accent → dark sandwich),
  edit & restyle modes, dual QA gates.
- **`scripts/qa_check.py`**: programmatic quality gate — CJK/Latin-width-aware overflow
  estimation, off-canvas shapes, text-frame overlap, leftover placeholders, font coverage,
  font-size floor, editability audit (full-bleed-image detection), canvas check.
  Human and `--json` output; exit codes 0/1/2/3.
- **Example deck**: 9-slide lab group meeting (`examples/group-meeting-demo/`) with build
  script and 1440×810 renders — fictional research data, fully native objects.
- **QA self-test fixture** (`examples/qa-selftest/`): deliberately defective deck proving the
  checker catches overflow, placeholders, missing fonts, off-canvas shapes, sub-12pt type,
  and text overlap (7 planted defects, 7 catches).
- Bilingual documentation (`README.md`, `README.zh-CN.md`), MIT license.

### Design notes

v1 used a flat-white background with a single blue/orange pair; feedback called it
"AI-looking". v1.0.0's visual system replaces it across all themes with: paper-toned page
backgrounds, white content cards with subtle shadows, stepped ink ramps for structure and
charts, one accent per page, dark ink covers, and split-run CJK/Latin typography.

[1.0.0]: https://github.com/XiaoMa-77/academic-ppt/releases/tag/v1.0.0

[1.1.0]: https://github.com/XiaoMa-77/academic-ppt/compare/v1.0.0...main
