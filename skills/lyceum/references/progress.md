# Scenario · 科研进展 / 中期 / 结题汇报 (Project Progress & Final Report)

Reporting a funded project (国家自然科学基金 / 省基金 / 校级课题 / 企业合作) to the panel that
owns its task book (任务书). This is an **audit genre**: the panel checks delivery against the
approved plan, line by line. Unlike a conference talk, comprehensiveness beats elegance —
an achievement not shown is an achievement not counted; unlike a group meeting, the tone is
formal and the future tense matters as much as the past.

**Talk length** 15–30 min · **Pages** 12–25 · **Language** Chinese (task-book terminology
verbatim), English terms in parentheses on first use.

## What the panel judges

1. 任务书指标完成度 — every committed deliverable has evidence and a percentage.
2. 成果的显示度 — papers/patents/software copyrights with full citation info.
3. 问题与对策 — deviations are disclosed with causes AND recovery plans (surprises are fatal).

## Page skeleton

| # | Page | Count | Core content |
|---|------|-------|--------------|
| 1 | 封面 | 1 | 项目名称全称 · 项目编号 · 负责人 · 依托单位 · 汇报类型(中期/结题) · 日期 |
| 2 | 汇报提纲 | 1 | 4–6 条目录（评审习惯，正式场合保留） |
| 3 | 项目概况 | 1 | 立项背景一句话 · 总体目标 · 关键考核指标表(任务书原文) |
| 4 | 总体进展 | 1 | 完成度总览：各研究内容进度条/状态表（✅完成 🔄进行 ⏸未启动）+ 总体百分比 |
| 5 | 研究内容一 | 2–4 | 按任务书分解的课题逐个汇报：目标→做法→结果→对应指标达成 |
| 6 | 研究内容二 | 2–4 | 同上（结构镜像，评审可对照） |
| 7 | …更多课题 | 2–8 | 同上 |
| 8 | 代表性成果 | 1–2 | 论文列表(署名单位标注) · 专利/软著 · 获奖 · 人才培养(学生名单) · 合作交流 |
| 9 | 经费执行 | 0–1 | 中期/结题必给：预算vs执行按科目，偏差>10%要一句说明 |
| 10 | 存在问题与对策 | 1 | 每个问题:现象→原因→对策→新时间表（主动披露>被问出来） |
| 11 | 下一步计划 | 1 | 中期:到结题的里程碑甘特图; 结题:后续研究/应用转化计划 |
| 12 | 总结 | 1 | 指标完成对照表(任务书指标 vs 完成情况) — 全绿或如实 |
| 13 | 致谢/备份 | 1+ | 致谢基金委/单位; 完整成果清单与佐证材料备查页 |

## Design tokens — theme "卷宗红" (default)

Dossier aesthetic: archive-paper pages, white evidence cards, a deep vermilion ink system that
reads official without sliding into 党政红 template clichés. Completion percentages in bronze.

```
BG      F9F7F2   // archive paper — content pages
SURFACE FFFFFF   // evidence cards
INK     7A2E2E   // dossier vermilion — titles, table headers, dark cover, primary bars
P_MID   A85D51   // ramp mid
P_SOFT  F3E7E2   // vermilion tint — zebra, panels
ACCENT  31606B   // teal-ink counterpoint — 完成度数字、达标标记 (pairs with warm paper)
TEXT    2D2A26
MUTED   8B857B
LINE    E3DDD1
OK 2F7D4F   WARN B0762B   PEND 8B857B   // 状态: 达标/滞后/未启动
CHART_RAMP  ["7A2E2E","A85D51","C79A90","E3CFC9"]
```

- **Fonts** (split-run): CJK `微软雅黑`; digits/Latin `Segoe UI`. 项目名长，封面两行可 32pt。
- **Type scale**: title 26–28pt bold · body 17–19pt · table 14–15pt · 完成度大数字 44–54pt
  bold ACCENT (EN face) · footer `项目编号 · 中期汇报 · N/M` 12pt.
- **Layout grid**: margins 0.55"; title y=0.3–0.88"; content as white cards on paper BG
  (rounded 0.05, INK 8% shadow); every 研究内容 block opens with its 完成度条.
- **Signature motif**: the **完成度条** — 0.28" progress bar, INK fill on P_SOFT track, hairline
  LINE border, percentage in 16pt bold ACCENT right of the bar; repeats on 总体进展 page.
- **Cover**: INK background, 项目全称 warm-white 32–36pt bold, 项目编号 in a thin ACCENT-outlined
  chip, 负责人/单位/日期 in P_SOFT text.
- **Tables**: header INK/`F7F2EE` bold; zebra P_SOFT; 指标对照表 uses status-colored 状态列.

### Theme variants

| Variant | Swap | Mood |
|---|---|---|
| **党建正红** Crimson Dossier | BG→`FAF6F5` INK→`8C1F1F` P_MID→`B3554F` P_SOFT→`F5E5E3` ACCENT→`A0791F` | 党建/思政/部分部委课题 |
| **石板青** Slate Contract | BG→`F6F7F6` INK→`334155` P_MID→`64748B` P_SOFT→`E8EDF2` ACCENT→`0F766E` LINE→`DFE3E0` | 横向/企业合作课题，弱化机关感 |

## Key page template — 指标完成对照表 (summary table page)

Title: `考核指标完成情况：X项全部达成 / X项达成、1项调整(已说明)`. One real table, content band
full width (0.55, 1.2, 12.23, 5.2), rows = every task-book indicator:

```
| 考核指标 (任务书原文)              | 完成情况              | 佐证            | 状态   |
| 发表SCI论文≥3篇                    | 已发表4篇(IF合计>12)  | 论文[1][2][4][6]| ✅ 达标 |
| 培养硕士生≥2名                     | 3名,1人获校优论文     | 学位证号…        | ✅ 达标 |
| 完成原型系统1套                     | 已部署于合作单位试运行 | 软著2023SR…      | ✅ 达标 |
```

Status column uses colored text (OK green / WARN amber / MUTED grey), 15pt. If any 指标 is
behind: row stays honest WARN + a footnote pointing to the 问题与对策 page. Never delete a
committed indicator row.

## Writing rules

- 任务书语言是合同语言：指标表述照抄原文，完成后注明佐证材料编号（论文[1]、专利ZL…）。
- 每个研究内容页首行给完成度条+一句话定性；证据用原生表格/图表，截图仅限部署现场照。
- 成果列表给全:作者顺序、期刊/会议全称、卷期页、署名单位加粗本单位、DOI/软著号。
  中英文成果分别按类型排序；人才培养列学生姓名+去向。
- 经费页按科目（设备/材料/测试/差旅/劳务）预算vs执行%——数字必须与财务口径一致。
- 问题页三段式（现象/原因/对策+时间表），语气客观；"因疫情/供应链"等外部归因要有证据。
- 下一步计划用里程碑甘特图（原生条形形状，按月刻度），结题汇报改为成果应用与推广。
- 提纲页与目录页在此场景保留——评审翻打印稿时靠它导航。

## Common failures

- ❌ 只讲亮点回避未达标指标 — 评审手中有一模一样的任务书，对不上即一票否决
- ❌ 成果页只写"发表论文若干篇" — 无编号无列表等于零佐证
- ❌ 用组会的随意风格 — 封面缺项目编号/负责人，直接显得不专业
- ❌ 完成度全写100%但佐证材料对不上 — 诚实百分比+说明远好于虚高
- ❌ 经费表与财务报表口径不一致 — 被追问时无法自洽
