---
name: lyceum
description: "Generate and edit natively-editable academic presentation decks (.pptx) tailored to graduate research scenarios: lab group meeting (组会汇报), conference talks (学术会议报告), thesis defense (毕业答辩), research proposal (开题报告), mid-term/final progress reports (中期/结题/科研进展汇报), and paper reading (文献分享/journal club). Use whenever the user mentions 学术汇报, 科研汇报, 组会PPT, 答辩, 开题, 中期检查, 结题, 会议报告, 文献分享, journal club, academic slides, scholarly presentation — or wants to create, edit, or restyle any research-flavored deck — even if they don't say 'PPT' explicitly."
license: MIT
---

# Lyceum — Academic Presentation Engine

Lyceum produces **natively editable** academic decks: every title, bullet, chart, and diagram
is a real PowerPoint object the user can edit afterwards. It ships six research-grade scenario
systems — each with its own page skeleton, design tokens, and content playbook — because a lab
group meeting and a thesis defense are different genres, not one style with different colors.

## Step 1 · Route to a scenario system

Read the matching reference file BEFORE planning any content. Each reference defines the page
skeleton, design tokens (exact hex values, font sizes, layout grids), scenario-specific writing
rules, and 2–3 ready-made theme variants.

| Scenario | Trigger phrases | Typical talk | Pages | Reference |
|---|---|---|---|---|
| 组会汇报 Lab group meeting | 组会 / 周报 / lab meeting / 进展汇报(小范围) | 15–40 min | 8–20 | `references/group-meeting.md` |
| 学术会议报告 Conference talk | 会议 / conference / oral presentation / 报告 | 12–20 min | 12–18 | `references/conference.md` |
| 科研进展/中期/结题 Progress & final report | 中期检查 / 结题 / 进展报告 / 基金 / 课题 | 15–30 min | 12–25 | `references/progress.md` |
| 学位论文答辩 Thesis defense | 答辩 / 毕业答辩 / defense / 学位论文 | 15–40 min | 20–40 | `references/defense.md` |
| 开题报告 Research proposal | 开题 / proposal / 研究计划 / 开题答辩 | 10–20 min | 15–25 | `references/proposal.md` |
| 文献分享 Paper reading | 文献分享 / journal club / 论文精读 / paper reading | 20–45 min | 12–25 | `references/paper-reading.md` |

Routing rules:

- Ambiguous input ("帮我做个汇报") → ask ONE short question listing the scenarios, or infer from
  context clues (mention of 导师/师兄 → group meeting; 评委/答辩委员会 → defense; 项目号/任务书 → progress).
- Mixed signals (defense that includes a progress chapter) → route by the DOMINANT genre; borrow
  the chapter skeleton from the secondary reference.
- Custom requirements (school colors, 院系模板, logo) → keep the scenario skeleton, swap design
  tokens as instructed in the reference's "Theme variants" section.
- If the user supplies an existing .pptx to edit or restyle → read "Editing & restyling" below in
  addition to the scenario reference.

## Iron law 1 · Natively editable, always

This is the promise that separates Lyceum from HTML-to-image pipelines. The user WILL open
the deck in PowerPoint and modify it — a deck they cannot edit is a failed deliverable.

1. **All text lives in real text boxes** (`addText` / python-pptx text frames). Never rasterize
   words into an image. Never use a full-slide screenshot.
2. **All data charts are native charts** (`addChart` / `add_chart`). Never paste a matplotlib
   chart image when the chart type exists natively (bar/column/line/pie/area/scatter/radar/
   doughnut) — the user must be able to right-click → Edit Data.
3. **Schematic diagrams are composed shapes** — rectangles, connectors, arrows, text boxes —
   grouped and aligned on a grid, so nodes can be re-labeled.
4. **Formulas**: simple expressions (`E = mc²`, `p < 0.05`, `L(θ) = Σᵢ log yᵢ`) as Unicode text
   runs (editable). Complex display equations may be rendered as images, BUT the LaTeX source
   must be stored in that slide's speaker notes (`Equation source: ...`) so it can be regenerated.
5. **Chart data goes into speaker notes** of the same slide (a compact table), so the user can
   correct a number and re-enter it via Edit Data without re-reading the source material.
6. Tables use `addTable` (real table object), not an image or aligned text boxes.

The legitimate uses of images: photographs, micrographs, paper figures the user provides,
complex rendered equations, logos.

## Iron law 2 · Original files are sacred

User-provided decks and materials are read-only by default. Write deliverables to a NEW sibling
file (`<stem>_updated.pptx`). Edit in place ONLY on explicit user request, and then first copy
the original to `<stem>_backup.pptx` next to it (never to /tmp).

## Workflow

1. **Route** (Step 1 above) and read the scenario reference file completely.
2. **Collect content.** Identify what the user gave you (paper, data, code repo, notes, draft
   deck). If critical facts are missing — results, method details, author list — list the gaps
   explicitly and either ask once (interactive) or generate clearly-marked placeholder slides
   `【待补充：xxx】` (autonomous). NEVER invent experimental results, citations, or numbers; an
   invented finding in a defense deck is a career-level bug.
3. **Plan the outline first.** Produce the page list from the reference's skeleton: for each page
   write its **action title** (see Content method) and the evidence it shows. Check the outline
   against the reference's page budget and the ghost-deck test before writing any code.
4. **Build** with pptxgenjs (preferred) or python-pptx, following the reference's design tokens
   verbatim — they are a system, not suggestions: palette roles, font stack, title zone, margins,
   and the scenario's signature motif must match on every slide. Technical execution rules are in
   "Technical execution" below; if the host environment provides the `presentations:pptx` skill,
   load it and defer to it for pptxgenjs/python-pptx syntax depth, file-corruption pitfalls, and
   rendering commands.
5. **QA** (both gates): run `python scripts/qa_check.py <deck>.pptx` from this skill's directory
   and fix every reported issue; then render to images (LibreOffice → pdftoppm) and visually
   check one pass — typography, palette consistency, no overflow, chart legibility. Only then
   deliver.

## Content method (applies to every scenario)

These rules are why reviewers say "讲得很清楚" — they come from communication practice (Minto's
Pyramid Principle, Weiss's assertion-evidence talking) adapted for research talks:

- **Action titles.** Every content slide's title states the takeaway, not the topic:
  `对比实验：方法A在低信噪比下F1高出7.2个点` instead of `实验结果`. The audience should be able
  to read ONLY the titles in sequence and reconstruct the whole argument (the "ghost deck test").
  Scenario references define where this rule bends (e.g. defense chapter dividers).
- **One slide, one claim.** Each slide makes exactly one assertion and shows the evidence for
  it. Two claims → two slides. A slide that needs "and" in its action title is two slides.
- **Assertion → evidence → so-what.** Title asserts; the body shows the exhibit (chart, table,
  diagram, equation) that proves it; a caption or one bold line says why it matters. Bullets
  alone are a fallback, not a default — prefer the exhibit.
- **Cite on the slide.** Every key figure, borrowed method, and reproduced result carries an
  in-slide source line (10–12pt, muted): `数据来源：表3, NeurIPS'24` / `Figure adapted from Li et al., 2023`.
  A References/参考文献 slide closes the deck (see each reference for placement).
- **Numbers with units and baselines.** `+7.2 pt vs. baseline (p<0.01, n=5)`, never `有明显提升`.
  Never present an invented number as sourced; mark estimates as `est./示意`.
- **Honest uncertainty.** Report negative results, ablation gaps, and threats to validity where
  the scenario expects them (group meetings and defenses especially — see references). Reviewers
  trust presenters who volunteer limitations.

## Chinese academic typography

- **Split-run font rule (the #1 polish lever):** CJK and Latin/digits live in SEPARATE runs —
  Chinese in `微软雅黑` (Windows) / `PingFang SC` (macOS), Latin & digits in `Segoe UI` /
  `Helvetica Neue`. CJK faces carry mediocre Latin glyphs; mixing registers is the fastest way
  to make a deck look machine-generated. Set the font name explicitly on EVERY run.
- Large CJK type (≥40pt) is always Bold — regular-weight 雅黑 at display sizes looks thin and
  washed-out on projectors. Hero numbers use the Latin face, Bold.
- Never use 楷体/隶书/艺术字体 for body text; 思源宋体/宋体 titles only in formal or humanities
  contexts. Titles get `charSpacing` 0.5–1; small letter-spaced tags (2–3) are a family motif.
- CJK runs wrap mid-phrase: give Chinese text boxes ~15% more width than the Latin equivalent
  and keep lines short; full-width punctuation never starts a line; parentheticals like
  `（p<0.01）` must not break across lines — keep them with their number in one run.
- Body ≥ 18pt on a 13.33×7.5" canvas (24pt preferred for conference/defense where the room is
  deep); the smallest text on any slide (captions, footers, source lines) is ≥ 12pt — the QA
  script enforces this floor. Dense appendix slides may drop to 14pt.

## Visual system (applies to every scenario theme)

Flat all-white decks with one blue and one orange read as "AI-generated". Every Lyceum
theme is a five-layer system — use all five layers or the deck collapses back to flat:

1. **Paper background** — content pages sit on a tinted paper tone (`BG`, near-white with a
   warm/cool cast from the theme), NEVER raw `FFFFFF`. The paper is the quiet layer that makes
   everything else look chosen.
2. **Cards on paper** — content lives in white `SURFACE` cards (rounded 0.05–0.08", subtle
   shadow: theme ink at ~10% opacity, blur 7, offset 2, angle 90) floating on the paper.
   Cards group real content; they are not decoration.
3. **Ink ramp** — the theme's `INK → P_MID → P_SOFT` stepped ramp structures titles, table
   headers, panels, and CHART_RAMP bar sequences. Charts take 3–4 ramp steps (winner darkest
   or ACCENT) — never single-color rows, never rainbows.
4. **One accent** — `ACCENT` marks exactly one element per page: the hero number, the winning
   bar, the innovation marker. Two accent uses on one page means one must go.
5. **Dark sandwich** — cover (and chapter/section dividers where the scenario defines them)
   invert to the theme's INK background with warm-white type; content pages stay paper-light.
   The contrast between the two registers is the deck's visual signature.

Also: every chart truncates honestly (annotate a non-zero axis origin), value labels keep the
precision the claim needs (`55.9` not `56` when the title says 55.9%), and dark-theme variants
drop shadows in favor of 1px borders (shadows vanish on dark backgrounds).

## Technical execution

Canvas: **`LAYOUT_WIDE` (13.33 × 7.5")** on every deck; derive positions from
`W = 13.33, H = 7.5, M = 0.5` constants. All font sizes in the references assume this canvas.

Hard rules (each of these corrupts files or degrades output — they are the distilled failure
modes of pptxgenjs/python-pptx):

- Hex colors without `#`: `color: "1B3A6B"`. Never 8-char hex; opacity goes in
  `transparency`/`opacity` properties.
- Bullet lists: array items each with `bullet: {code:"2022", indent: 12}` + `breakLine: true`;
  never type "•" characters; use `paraSpaceAfter`, not `lineSpacing`.
- Never reuse option objects across add* calls (pptxgenjs mutates them) — use factory functions.
- Stacked bars: `dataLabelPosition` only `"ctr"/"inEnd"/"inBase"`; `outEnd` is clustered-only.
- Title/closing/chapter-divider slides use the theme's dark INK background with warm-white
  type; content pages stay on the paper BG (the "Visual system" sandwich) — never flat white.
- Every chart: axis titles + units, direct value labels with claim-level precision
  (`dataLabelFormatCode`), muted gridlines only where they help, `chartColors` from the theme's
  CHART_RAMP, no 3D, no legend when a single series.
- Diagrams: snap to a 0.1" mental grid; connectors touch shape edges; no orphan arrows.
- Speaker notes on data/chart slides carry the underlying numbers (Iron law 1.5).

If the host provides the `presentations:pptx` skill, its Part 2 (pptxgenjs in depth) and editing
recipes take precedence for syntax-level questions; this file takes precedence for scenario
structure, design tokens, and content rules.

## Editing & restyling an existing deck

Two modes beyond fresh generation:

- **Edit mode** (fix content in a deck that already looks right): python-pptx, first-run
  replacement to preserve formatting, budget every replacement at `len(new) ≤ len(orig) × 1.1`
  (walk the deck, build a capacity manifest, generate within it). Output to `<stem>_updated.pptx`.
  Full helper recipes live in the host `presentations:pptx` skill if present.
- **Restyle mode** (keep the content, lift the look to a Lyceum scenario system): inventory
  every text shape, map old pages onto the scenario skeleton (merge/split as the skeleton
  demands), then rebuild page-by-page into a NEW deck using the scenario's tokens while carrying
  over the user's images and data. Never half-restyle — a deck that is two styles at once reads
  as broken.

## QA gates

1. **Programmatic** — `python scripts/qa_check.py <deck>.pptx`:
   text-overflow estimation (CJK/Latin width-aware), shapes off-canvas, text-frame overlaps,
   leftover placeholders (`TODO`, `xxx`, `lorem`, `【待补充` in deliverable mode), runs missing
   explicit fonts, and an editability audit (ratio of text-in-images vs native text). Fix every
   ERROR; review each WARNING. Exit code 0 = clean.
2. **Visual** — render once (`soffice --headless --convert-to pdf` → `pdftoppm -png -r 150`) and
   inspect: consistent margins, palette discipline, chart legibility, no clipped text. Use the
   host's visual-judge subagent if available.
3. **Ghost deck test** — read the 12–20 action titles aloud in order; if they don't tell the
   story, the outline (not the styling) is broken; fix titles first.

## Delivery

- Deliverable: one `.pptx` at a stated absolute path, plus a 3–5 line summary (scenario system
  used, theme variant, page count, where placeholders need user data).
- Original inputs untouched at their original paths; no temp renders left behind.
- If placeholders were used, list them explicitly in the summary so none survive into the venue.
