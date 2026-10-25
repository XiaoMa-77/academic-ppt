# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[1.0.0]: https://github.com/XiaoMa-77/lyceum/releases/tag/v1.0.0
