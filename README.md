<div align="center">

# Academic PPT

**Editable academic PowerPoint decks with substantive content and explanatory figures.**

Formerly Lyceum. The `lyceum` skill name and installation path remain compatible.

[English](README.md) · [简体中文](README.zh-CN.md) · [MIT](LICENSE)

</div>

## Choose two things: scenario + visual style

Every deck is defined by two **independent** choices:

- **Scenario (6)** — fixes the page skeleton, argument order, talk length and signature motif:
  组会 / 会议 / 进展 / 答辩 / 开题 / 文献分享 (table below).
- **Visual theme (19)** — fixes the paper background, card fills, cover, ink ramp, accent,
  chart colors and motif colors. Full tokens, selection rules and copy-paste prompts live in
  [**`theme-index.md`**](skills/lyceum/references/theme-index.md).

Academic blue (学术蓝白) is **one** theme, not the whole skill. It is the fallback: when a request
does not name a theme, the agent asks once which style to use instead of silently defaulting.
Any theme can be combined with any scenario skeleton (e.g. an 开题 skeleton in 藏青金 colors).

### The 19 themes

| Group | Theme names (中文 / English) |
|---|---|
| Default fallback | 学术蓝白 / Academic Blue |
| 组会 Group meeting | 研纸墨蓝 / Ink Paper · 暖砂陶 / Warm Sand · 夜航实验室 / Midnight Lab (dark) |
| 会议 Conference | 藏青金 / Navy & Gold · 林壑墨绿 / Forest Sage · 讲坛酒红 / Burgundy Lecture |
| 进展 Progress | 卷宗红 / Dossier Vermilion · 党建正红 / Crimson Dossier · 石板青 / Slate Contract |
| 答辩 Defense | 学院蓝 / Academy Blue · 学院红金 / Classic Crimson · 石板牛津 / Slate Oxford |
| 开题 Proposal | 蓝图青 / Blueprint Teal · 青苗计划 / Sage Plan · 石墨工程 / Graphite |
| 文献分享 Journal Club | 纸边笔记 / Paper Margin · 暖页批注 / Warm Margin · 冷阅审稿 / Cool Review |

### How to actually select one

**Name the theme in the request.** A named theme wins and must be applied to every page.

```text
Use Lyceum to build an 18-page thesis defense, visual theme "学院红金" (Classic Crimson).
Keep the defense page skeleton and innovation markers; apply the theme's tokens to the cover,
cards, tables, charts and footers. Do not fall back to academic blue.
```

Priority, highest first: user's institutional template / reference image → **explicitly named
theme** → academic blue only when the user says 默认 / 不用选 / 随便, or after being asked once.
Adjectives like "make it look formal" or "use blue tones" are **not** a theme name; the agent
should ask which one. `theme-index.md` also covers cross-scenario combinations, restyling an
existing `.pptx`, school templates, and a checklist for verifying the deck did not silently default.

### Shared layout and density contract (applies to every theme)

The four default compositions are:

- **Technical route:** question → data → method → validation → output, with stage explanations below.
- **Process and explanation:** a left-hand question/method/output sequence aligned with substantive text.
- **Background to research question:** task evidence or a case on the left, the resulting gap on the right.
- **Methods and evidence:** native architecture diagrams, data flows, charts, diagnostic curves, tables, and schedules.

Related findings can share a page. There is no blanket eight-line limit or automatic split for
multiple subclaims. Plan useful information units and a main figure before building; adapt density
to the audience and available evidence. Missing results stay missing rather than becoming invented data.

See the shared [design and density contract](skills/lyceum/references/academic-blue.md) for the
grid, fonts, density and figure rules that all 19 themes obey.

## Editable nine-slide example

Topic: contrastive learning for few-shot classification. **All experimental values and curves are
fictional demonstrations**, labeled in slide footers and notes.

| Background → question | Process + explanation | Technical route |
|---|---|---|
| ![Research question](examples/group-meeting-demo/render/slide-2.png) | ![Research content](examples/group-meeting-demo/render/slide-3.png) | ![Technical route](examples/group-meeting-demo/render/slide-4.png) |
| Method architecture | Results and table | Curve and diagnosis |
| ![Architecture](examples/group-meeting-demo/render/slide-5.png) | ![Results](examples/group-meeting-demo/render/slide-6.png) | ![Diagnosis](examples/group-meeting-demo/render/slide-7.png) |

[Download PPTX](examples/group-meeting-demo/group-meeting-demo.pptx) ·
[Build script](examples/group-meeting-demo/build_demo.js) ·
[All slide previews](examples/group-meeting-demo/render/)

Text, diagram nodes, connectors, charts, and tables remain native PowerPoint objects.
Chart data is embedded in workbooks and recorded in the corresponding slide notes.

## Six academic scenarios

| Scenario | Typical talk | Playbook |
|---|---|---|
| Lab group meeting / 组会 | 15–40 min | [group-meeting.md](skills/lyceum/references/group-meeting.md) |
| Conference talk / 学术会议 | 12–20 min | [conference.md](skills/lyceum/references/conference.md) |
| Progress, mid-term, final / 科研进展 | 15–30 min | [progress.md](skills/lyceum/references/progress.md) |
| Thesis defense / 学位答辩 | 15–40 min | [defense.md](skills/lyceum/references/defense.md) |
| Research proposal / 开题 | 10–20 min | [proposal.md](skills/lyceum/references/proposal.md) |
| Paper reading / Journal Club | 20–45 min | [paper-reading.md](skills/lyceum/references/paper-reading.md) |

Read the scenario for research structure, then [`theme-index.md`](skills/lyceum/references/theme-index.md)
for the visual style, then the shared academic-blue contract for grid/density/figure rules.
The scenario does **not** force a palette: it only supplies a suggested group of three themes.

## Install the skill

```bash
git clone https://github.com/XiaoMa-77/academic-ppt.git
cd academic-ppt

# Claude Code
mkdir -p ~/.claude/skills
cp -r skills/lyceum ~/.claude/skills/

# Agents supporting .agents/skills
mkdir -p ~/.agents/skills
cp -r skills/lyceum ~/.agents/skills/
```

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE/.agents/skills" | Out-Null
Copy-Item -Recurse skills/lyceum "$env:USERPROFILE/.agents/skills/"
```

Example request (this one names a theme, so it will NOT use academic blue):

```text
Use Lyceum to build a research proposal from my materials, visual theme "蓝图青".
Keep the problem, method details, and explanatory figures together.
Use a horizontal technical route and a process/explanation layout.
Use the supplied experimental values for charts.
```

For the fallback style, say `use the default academic blue` explicitly. More prompt templates —
cross-scenario combos, school templates, restyling an existing deck — are in
[`theme-index.md`](skills/lyceum/references/theme-index.md).

## Build and check

Requires Node.js 22+ and Python 3.10+. Run from the repository root:

```bash
npm ci
python -m pip install -r requirements-qa.txt
npm run build
npm run qa
npm test
```

`build` generates the example and normalizes redundant paragraph properties from PptxGenJS
while retaining rich text and native objects. `qa` checks text geometry, placeholders, fonts,
editability, negative extents, known XML faults, and optional academic-density hints.
`test` runs 13 behavioral regressions, including the original deliberately defective fixture.
GitHub Actions rebuilds the deck, runs QA and tests, and uploads the generated PPTX.

For a different output path:

```bash
node examples/group-meeting-demo/build_demo.js /path/to/output.pptx
```

Set `PYTHON` to a different Python interpreter if needed. The lockfile pins build dependencies;
an image-size override selects the patched parser version.

## Render and inspect

With PowerPoint installed on Windows:

```powershell
./skills/lyceum/scripts/render_powerpoint.ps1 `
  -DeckPath examples/group-meeting-demo/group-meeting-demo.pptx `
  -OutDir examples/group-meeting-demo/render
```

The script opens the deck read-only and exports every page at 1440×810. Open/export failures
stop the script. Other platforms can render through LibreOffice and `pdftoppm`; install CJK fonts.

QA is heuristic. Inspect every rendered page for text fit, labels, arrows, punctuation,
chart readability, and factual support. `--academic` reports diagram candidates based on
shapes and lines; it does not establish scientific meaning or truth.

## Repository layout

```text
skills/lyceum/
  SKILL.md                        # Routing, research content, native-object contract
  references/theme-index.md       # 19 themes, tokens, selection rules, prompt templates
  references/academic-blue.md     # Shared grid, density and figure planning (fallback palette)
  references/                    # Six scenario playbooks + their named theme tokens
  scripts/qa_check.py             # Programmatic QA and content hints
  scripts/normalize_pptx.py       # Generated DrawingML compatibility pass
  scripts/render_powerpoint.ps1   # Native Windows open and render check
examples/group-meeting-demo/      # Nine-slide deck, builder, all page previews
examples/qa-selftest/             # Negative fixture and regressions
.github/workflows/quality.yml     # Build and test automation
```

For contributions, include concrete research tasks and figure plans. Rebuild, check, render,
and inspect changed examples. Keep the skill entrypoint concise and detailed rules in references.

[MIT](LICENSE) © 2026 Lyceum contributors.
