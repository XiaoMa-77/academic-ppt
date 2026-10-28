# Scenario · 开题报告 (Research Proposal Defense)

> **Default visual style:** read [academic-blue.md](academic-blue.md). Use this file for scenario structure and research content. The named palettes, cover treatments and card layouts below are optional legacy themes; they do not override the shared white/blue style or its figure and density guidance.

Presenting a NOT-yet-done thesis/project plan to a panel that decides whether the route is
worth three years. The audience is professors who will probe feasibility, novelty, and
completeness of the research design. The genre is a **contract for the future**: unlike a
defense (which argues what WAS done), a proposal argues what WILL be done, why it matters,
and why it is doable by this person, in this lab, in this timeframe. Overclaiming is the
classic fatal error; vagueness is the runner-up.

**Talk length** 10–20 min · **Pages** 15–25 · **Language** Chinese.

## What the panel judges

1. 问题真不真 — is the research question well-posed, significant, and scoped?
2. 路线通不通 — is the technical route plausible with a Plan B, with prelim data?
3. 可行性 — does the student's groundwork (literature + 预实验) de-risk the plan?

## Page skeleton

| # | Page | Count | Core content |
|---|------|-------|--------------|
| 1 | 封面 | 1 | 论文题目(可含副标题限定范围) · 姓名/学号 · 导师 · 学院 · 开题日期 |
| 2 | 汇报提纲 | 1 | 5–6条 |
| 3 | 研究背景与意义 | 1–2 | 领域重要性一句 → 现实/科学矛盾 → 研究意义(理论+应用两行) |
| 4 | 国内外研究现状 | 2–3 | 脉络化综述(时间线/分类图，非罗列) → 研究空白(gap)显式标出 |
| 5 | 科学问题 | 1 | 1个总问题拆3个子问题，每个可研究、可验证（本页是全deck的锚） |
| 6 | 研究目标与内容 | 1–2 | 目标一句话 + 3个研究内容各两行(做什么+怎么衡量完成) |
| 7 | 技术路线 | 1 | 全宽路线图：输入→方法模块→验证→输出，标注关键工具/数据 |
| 8 | 研究方案·内容一 | 1–2 | 关键方法设想 + 预期难点 + 备选方案(Plan B显式画出) |
| 9 | 研究方案·内容二/三 | 2–4 | 同构镜像 |
| 10 | 预实验与基础 | 1–2 | 已有数据/复现结果/平台条件 — 可行性证据，弱基础更要给 |
| 11 | 创新点 | 1 | 2–3条，预期性表述("拟解决""预期提出")，与gap页一一对应 |
| 12 | 研究计划 | 1 | 甘特图：3年/18个月里程碑(开题→中期→答辩)，含论文投稿节点 |
| 13 | 预期成果 | 1 | 论文(级别+数量合理)·专利/软著·学位论文 — 保守承诺 |
| 14 | 参考文献 | 0–1 | 核心文献15–30条(正文页脚已引用过的不重复列) |

## Design tokens — theme "蓝图青" (optional legacy theme)

Engineering-blueprint reading: cool paper, white plan cards, teal-blueprint ink with
terracotta risk/gap markers — a plan that looks engineered, not decorated.

```
BG      F5F8F8   // cool drafting paper — content pages
SURFACE FFFFFF   // plan cards
INK     155E63   // blueprint teal — titles, route modules, gantt bars
P_MID   4E878C   // ramp mid
P_SOFT  E2EFEF   // tint — panels, gantt tracks
ACCENT  C4622D   // terracotta — gap diamonds, Plan-B dashed branches, milestones
TEXT    272E2E
MUTED   828A89
LINE    DCE3E2
CHART_RAMP  ["155E63","4E878C","93B7B9","CFE0E0"]
```

- **Fonts** (split-run): CJK `微软雅黑`; digits/Latin `Segoe UI`; gantt labels ≥13pt.
- **Type scale**: cover 32–40pt · title 28pt bold · body 18–20pt · gantt/task 13–15pt ·
  footer `开题报告 · 姓名 · N/M` 12pt.
- **Layout grid**: margins 0.55"; title y=0.3–0.9"; content as white cards on paper BG.
- **Signature motif**: the **gap diamond** — 0.22" ACCENT-outlined diamond closing each 研究现状
  branch (the unsolved bit), reused as the bullet glyph on 科学问题/创新点 pages.
- **技术路线 page**: modules as INK-outline rounded cards on SURFACE; solid INK border =
  established method reused, ACCENT dashed border = your proposed (risky) part — the panel
  reads honesty off this distinction instantly.
- **Cover**: INK background; 题目 warm-white 32–36pt; 姓名/导师/日期 in P_SOFT.

### Theme variants

| Variant | Swap | Mood |
|---|---|---|
| **青苗计划** Sage Plan | BG→`F6F8F4` INK→`3F6212` P_MID→`74904B` P_SOFT→`EAF0E2` ACCENT→`9A3412` LINE→`DFE5DA` | 生命/农学/医学 |
| **石墨工程** Graphite | BG→`F6F6F7` INK→`37505C` P_MID→`6E8794` P_SOFT→`E7EDF0` ACCENT→`0E7490` LINE→`DEE2E4` | 工程交叉学科 |

## Key page template — 研究计划甘特图

Native gantt in the content band (0.55, 1.35, 12.23, 4.9): rows = 研究内容一/二/三 + 论文
撰写 + 备选方案探索; columns = semesters/months with light vertical gridlines (DIM 0.5pt);
bars = PRIMARY rounded rectangles; milestone diamonds (ACCENT, 0.22") at 开题/中期/预答辩/
答辩 and paper-submission nodes with 12pt labels above; "now" line optional. All shapes
native; the user will drag bars when plans change — that is the point.

## Key page template — 科学问题 (anchor page)

Center-stacked three question cards (10.5" wide, 1.05" each, 0.25 gaps), each: Q-number in
ACCENT (24pt bold) + the sub-question as ONE interrogative sentence (20pt) + 完成标志 in 13pt
MUTED (`衡量: 在X数据集上达到Y`). Top: the umbrella question in 24pt bold PRIMARY.
For the default style, prefer a question–method–validation mapping with a supporting task
diagram instead of three mostly empty cards; use only facts available in the source.

## Writing rules

- 题目自带范围限定词（"面向X场景的…"），防止"题目过大"这条最常见意见。
- 综述三步法：分类→评述(每类的局限)→gap；只引用不评述=综述没做。
- Plan B不是示弱：每个高风险模块给一条备选路线，panel 对"死磕单点"最警惕。
- 预期成果数字保守一档（拟投1篇CCF-A → 写"高水平期刊/会议1篇(力争CCF-A)"）。
- 甘特图留缓冲学期；把"学习/调研"作为第一阶段显式画出（新生真实节奏）。
- 创新点用"预期"语态但依然可辩护：每条挂 gap 标记与对应研究内容编号。

## Common failures

- ❌ 三个子问题其实是三件不相干的事 — 框架被评"拼盘"，科学问题页要显示递进/支撑关系
- ❌ 技术路线图全是实线自信模块 — 无风险标注=没想清楚，反而引出追问
- ❌ 无预实验页 — 可行性全靠文献，panel 会问"你跑过吗"
- ❌ 甘特图精确到周且无缓冲 — 稍有延期即全线崩，且显得无经验
- ❌ 预期成果冒进（硕士拟发3篇一区）— 承诺即把柄
