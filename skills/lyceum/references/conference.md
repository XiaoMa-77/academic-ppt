# Scenario · 学术会议报告 (Conference Talk)

An oral or spotlight presentation at a peer-reviewed venue (NeurIPS / CVPR / ACM / IEEE…).
The audience is 50–500 domain-adjacent researchers who do NOT know your prior group meetings;
the clock is brutal (12–15 min + 3 min Q&A); the projector is often dim and the room deep.
The genre is a **performance of one contribution**: everything on screen serves a single paper's
claim, and people will quote your slides when they cite you.

**Talk length** 12–20 min · **Pages** 12–18 (≈1 page/min) · **Language** English or Chinese per
venue; code-switch ONLY if the user asks.

## What the room judges

1. Can a person in row Z read every word and get the one-sentence contribution?
2. Does the method slide actually explain the method (not tease it)?
3. Do the results prove the claim with honest baselines and ablations?

## Page skeleton

| # | Page | Count | Core content |
|---|------|-------|--------------|
| 1 | 封面 | 1 | 论文题目 · 作者(标注presenting) · 单位 · 会议名+年份 · (项目页/代码链接) |
| 2 | 背景与动机 | 1–2 | 领域痛点 hook：一个反直觉事实/失败案例/数字缺口 → 引出问题 |
| 3 | 研究问题 | 1 | 一句话问题陈述（可加"现有方法的gap"对比小图） |
| 4 | 相关工作定位 | 1 | 2×2 定位图或三类方法对比表 → 本文坐标（不要文献综述式罗列） |
| 5 | 方法总览 | 1 | 框架图（全宽示意图，模块化形状+连接线），标注贡献点①②③ |
| 6 | 方法细节 | 2–4 | 每页拆一个关键模块：直觉 → 形式化(公式) → 作用 |
| 7 | 实验设置 | 0–1 | 数据集/指标/对比方法，紧凑一行式（可并入第一张结果页脚注） |
| 8 | 主结果 | 1–2 | 核心表格/SOTA对比图，加粗本文行，ACCENT 高亮关键数字 |
| 9 | 消融与分析 | 2–3 | 每页回答一个"为什么有效"：消融表、可视化、误差分析 |
| 10 | 局限与展望 | 0–1 | 诚实的1–2条边界（评审文化加分项，口头报告可选） |
| 11 | 结论 | 1 | 贡献三句话 + 一句 takeaway（结尾停在结论，不停在"谢谢"） |
| 12 | Q&A/致谢 | 1 | "Thanks! Questions?" + 联系方式/二维码/代码链接 |
| 13 | 备用页 | 2–5 | 更全的实验、证明、失败案例 — Q&A 被问到再翻（放在结论后） |

## Design tokens — theme "藏青金" (default)

Cold-paper content pages, white exhibit cards, a deep navy cover with matte gold — the
"journal cover" reading that suits an international venue. Five layers, one accent.

```
BG      FAFAF7   // cold paper — content pages
SURFACE FFFFFF   // exhibit cards on BG
INK     1A2E4A   // deep navy — titles, table headers, dark cover, primary bars
P_MID   3E5C80   // ramp mid
P_SOFT  E7EDF4   // navy tint — panels, zebra
GOLD    C9A227   // matte gold — THE accent: hero number, highlighted row, badge rims
TEXT    232733
MUTED   83888F
LINE    E2E2DC
CHART_RAMP  ["1A2E4A","3E5C80","8CA3BF","C6D3E2"]  // + GOLD for the winner
```

- **Fonts** (split-run): CJK `微软雅黑` / Latin+digits `Segoe UI`·`Helvetica Neue`; hero
  numbers 60–72pt bold EN face; title 28–32pt bold charSpacing 0.5.
- **Layout grid**: margins 0.6"; title zone y=0.3–0.9"; exhibits in white cards (rounded 0.06,
  INK 10% shadow) on paper BG; footer `ICML'26 · N/M` 12pt MUTED.
- **Signature motif**: **contribution badges** — 0.34" circles, GOLD 1.5pt rim, INK number
  ①②③ (white fill), pinned to framework modules and reused on the pages that prove each
  contribution.
- **Cover**: INK background; venue wordmark top-right in gold outline or P_MID; title 40–54pt
  bold warm-white (`F7F7F2`); authors line with presenting author underlined in GOLD.
- **Charts/tables**: native; baselines in ramp light steps, ours INK or GOLD; every exhibit
  card carries a caption line; axis truncated → say so.

### Theme variants

| Variant | Swap | Mood |
|---|---|---|
| **林壑墨绿** Forest Sage | BG→`F7F9F5` INK→`1E3B2C` P_MID→`4A7060` P_SOFT→`E6EFE8` GOLD→`B45309` LINE→`DFE4DC` | 生命/环境/医学会议 |
| **讲坛酒红** Burgundy Lecture | BG→`FAF7F5` INK→`5F1F26` P_MID→`8C4A52` P_SOFT→`F3E6E8` GOLD→`0F766E` LINE→`E6DCDE` | 人文社科，讲座厅气质 |

## Key page template — 方法总览 (framework page)

Full-width diagram, content band (0.6, 1.15, 12.13, 4.6): pipeline of 3–5 rounded-rectangle
modules (`ROUNDED_RECTANGLE`, rectRadius 0.08, PRIMARY 1.5px outline, white fill), connected by
right-arrows (`line` with `endArrowType:'triangle'` or chevron shapes); each module labeled
16–18pt with a one-line role; inputs (dataset icon/label) enter left, outputs exit right;
contribution badges ①②③ pinned to the novel modules; a 12pt caption under the diagram:
`图1 · 方法总览：三个贡献点对应第6–8页`. If the user provides the paper's original figure,
place it in the same band at native resolution and keep badges as overlaid circles.

## Key page template — 主结果 (hero result)

Title = the claim (`在三个基准上平均 +4.7 BLEU，超过最强基线`). Left 60%: the comparison table
or bar chart (native, baselines in DIM, ours in PRIMARY, ours highlighted ACCENT). Right 40%:
the hero number (66pt ACCENT) + 3-line evidence note (metric, benchmark, significance).
Footer citation: `Source: Table 2, 本文实验 (n=3 seeds)`.

## Writing rules

- Action titles everywhere; the 12–18 titles must read as the paper's abstract in story order.
- One message per slide; a 15-min talk has room for ~3 method points and ~3 result points.
- 方法学直觉先行：每个方法页第一行给"为什么这样设计"的一句人话，再上公式。
- 公式高亮：变量着色（关键变量 ACCENT），LaTeX 复杂式可转图，源码进 speaker notes。
- 相关工作页只定位不贬低：`与X不同，本文…`，对比维度 ≤ 3 个。
- 引用格式与会议一致（AUTHOR'YY），自引不过度。
- End on 结论+takeaway；"Thank you" 页保持极简（大字+联系方式）。

## Common failures

- ❌ 字号 ≤ 16pt 的表格 — 后排读不了，等于没讲
- ❌ 方法总览图是论文截图（低分辨率、字迹模糊）— 重绘为原生形状，或换高清图
- ❌ 18页塞满 25 分钟内容 — 超时被主席打断，结论页没讲就是没讲
- ❌ 全篇条目式bullets没有一张图表 — 会议听众是来看证据的
- ❌ 结尾 "Thanks / Q&A" 后没有备用页 — 被问细节数据时无页可翻
