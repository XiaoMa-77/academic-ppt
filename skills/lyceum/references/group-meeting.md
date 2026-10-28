# Scenario · 组会汇报 (Lab Group Meeting)

> **Default visual style:** read [academic-blue.md](academic-blue.md). Use this file for scenario structure and research content. The named palettes, cover treatments and card layouts below are optional legacy themes; they do not override the shared white/blue style or its figure and density guidance.

The weekly ritual of every research group. The audience is your advisor and labmates — they know
the domain, they have seen your last five decks, and their time is sliced across four students
tonight. The genre is a **working session, not a performance**: dense, honest, problem-centric.
A great group-meeting deck gets you unblocked; a polished but evasive one wastes the room's
best debugging resource.

**Talk length** 15–40 min · **Pages** 8–20 · **Language** usually Chinese, English terms inline.

## What the room judges

1. Is there real, quantified progress since last week?
2. Does the presenter understand WHY something failed (not just that it failed)?
3. Are the asks specific enough to act on ("帮我看看这个loss曲线" beats "模型不收敛怎么办")?

## Page skeleton

| # | Page | Count | Core content |
|---|------|-------|--------------|
| 1 | 封面 | 1 | 题目（周次/日期）· 姓名 · 汇报类型 tag（进展/文献/问题） |
| 2 | 上期回顾 | 1 | 上期计划 3–4 条 → 每条状态（✅完成 / ⚠️部分 / ❌未做+原因） |
| 3 | 本期概览 | 1 | 今日 3–4 个要点，每条一行结论 + 指向页码 |
| 4 | 进展详情 | 3–8 | 每页一个实验/方法点：做法 → 结果（图表）→ 判断 |
| 5 | 问题与分析 | 1–3 | **本场景的灵魂页**：现象 → 已排除的原因 → 当前假设 → 求助点 |
| 6 | 下期计划 | 1 | 3–5 条，可检验、有 deadline（"跑通baseline"❌ "复现Table2精度±0.5"✅） |
| 7 | 讨论与求助 | 1 | 明确列出需要谁、什么帮助（数据/算力/经验/文献） |
| 8 | 备查附录 | 0–5 | 完整数据表、超参数、消融细节 — 讲不到就跳过，被问再翻 |

Weeks with no experiments (theory reading / setup work): swap 进展详情 for 文献/方法调研 pages
and say so plainly on the cover — nobody respects a dressed-up empty week.

## Design tokens — theme "研纸墨蓝" (optional legacy theme)

Five-layer color system: warm-paper page background (never flat white), white cards, a stepped
ink ramp for structure and charts, terracotta as the single accent. Dark ink cover creates the
sandwich contrast that separates this deck from flat "AI-generated" all-white decks.

```
BG      F8F7F3   // warm paper — every content page background
SURFACE FFFFFF   // card fill on BG (cards carry the content, not the page)
INK     1D3557   // deep ink navy — titles, table headers, dark cover, strongest bars
P_MID   457B9D   // ink ramp mid — secondary bars, sub-structure, labels on soft fills
P_SOFT  E3EAF2   // ink tint — zebra rows, panel fills, chips
ACCENT  E07A5F   // terracotta — THE single highlight (one element per page)
TEXT    2B2D33
MUTED   8A8D94
LINE    DFDBD2   // warm hairline on cards/borders
OK 2F7D4F   WARN B0762B   FAIL B04A3A   // status palette (desaturated, print-safe)
CHART_RAMP  ["1D3557","457B9D","8FB0C6","C4D5E0"]  // ink ramp dark→light; ACCENT for the winner
```

- **Fonts** (split-run rule — CJK and Latin/digits in separate runs):
  CJK `微软雅黑` (titles Bold; regular CJK at ≥40pt looks thin — always Bold large);
  Latin/digits `Segoe UI` (Win) / `Helvetica Neue` (mac). Digits in stats/tables always EN face.
- **Type scale** (13.33×7.5"): title 25–28pt bold + charSpacing 0.5 · body 16–18pt ·
  table/data 14–15pt · caption/footer 12pt (hard floor) · hero number 52–64pt bold EN face.
- **Layout grid**: margins 0.5"; title zone y=0.3–0.9"; content band y=1.15–6.9" as white
  `SURFACE` cards (rounded 0.05–0.08, subtle shadow: INK at 10% opacity, blur 7, offset 2,
  angle 90) floating on the paper BG; footer y=7.05" — date left, `N/M` right, 12pt MUTED.
- **Signature motif**: the **status tag** — a 0.09" ACCENT square + letter-spaced 12pt MUTED
  label at top-right of every content page (`进展` `问题` `计划` `求助` `调研`), letting the
  advisor read the deck's shape at a glance. No bars, no stripes, no title underlines.
- **Cover**: INK background; kicker (week + type) in ACCENT 15pt; title 40pt bold warm-white;
  a 1.6" ACCENT rule under the title block; meta block in C9D3DE; optional week-index card in
  a lighter ink step (`26456B`).
- **Tables**: real `addTable`; header row INK fill + warm-white bold; zebra P_SOFT; borders
  `E5E1D8` 0.5pt; numbers in EN face; the one decisive cell in ACCENT bold.
- **Charts**: native; bars from CHART_RAMP (winner darkest or ACCENT — never rainbow); muted
  axis labels; value labels with one decimal (`dataLabelFormatCode: "0.0"`); gridlines `EDEAE3`
  0.5pt; annotate truncated axes ("纵轴自 50% 起").

### Theme variants

| Variant | Swap | Mood |
|---|---|---|
| **暖砂陶** Warm Sand | BG→`FDF6EC` INK→`5C4A32` P_MID→`96805F` P_SOFT→`F0E6D8` ACCENT→`35707C` LINE→`E8DCC8` | 人文/社科组，纸质书卷气 |
| **夜航实验室** Midnight Lab | BG→`111826` SURFACE→`1B2536` INK→`93B4D4`(title色) P_MID→`5E7A99` P_SOFT→`243247` ACCENT→`F0A583` TEXT→`DCE3EC` MUTED→`8B95A5` LINE→`2C3A50` | 晚间线上组会护眼深色；卡片阴影去掉，用 P_SOFT 描边 |

Midnight Lab: content text stays ≥14pt (dark-theme legibility), shadows OFF (they vanish on
dark backgrounds — use 1px P_MID borders on cards instead).

## Key page template — 问题与分析 (the soul page)

Layout (inches): title at (0.5, 0.32, 12.33, 0.55). Four-block 2×2 grid below, each block
(5.9 × 2.5), gap 0.3, blocks separated by alignment + a 1px hairline top rule each (no boxes):

```
现象 Phenomenon        → 一句话 + 证据图/表（loss曲线、错误案例）占右半
已排除 Ruled out       → 条目列表：假设 ✗ 排除依据（每条一行）
当前假设 Hypothesis    → 1–2 条，可证伪的表述
下一步/求助 Ask        → 具体请求：找谁、要什么、何时需要
```

The evidence exhibit (native chart or the user's screenshot) sits INSIDE 现象 at ~5.5" wide.
ACCENT only on the single most suspicious number in the exhibit.

## Writing rules

- 上期回顾 statuses are honest by contract: ❌ items carry a one-phrase reason, never silence.
- Every 实验 page: setup line (dataset/模型/关键超参, 12pt muted under title) → exhibit →
  一句判断 ("比baseline高但方差大，n=3不够"). No page without a verdict.
- 失败实验用正文讲，不要藏进附录 — 导师最值钱的输入往往来自失败页。
- 下期计划 items start with a verb and are falsifiable (`跑通`→`复现至±0.5pt`).
- 求助页 names people if the ask is for a specific person's tool/data/experience.
- 中文行文，专业术语保留英文；按图示区域分配正文，保留设置、证据和判断，不设全页八行上限。

## Common failures

- ❌ 用商业路演风格模板（大图+大字+煽动性口号）— 场景错位，room 直接降信任
- ❌ 进展页贴满截图不留原生图表 — 导师想改个轴范围都做不到
- ❌ "模型效果变好了" 无数字无基线 — 违反 Content method 的 numbers 规则
- ❌ 问题页写成检讨书 — 写假设和实验设计，不写情绪
- ❌ 20页全是进展没有问题页与计划页 — 组会失去了它的功能
