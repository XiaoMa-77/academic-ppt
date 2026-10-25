# Scenario · 文献分享 / Journal Club (Paper Reading)

Presenting someone else's paper to your lab (journal club, 论文精读会, seminar). The audience
mixes juniors who need the tutorial AND seniors who want the critique. The genre is
**explication plus judgment**: first make the paper make sense (generous, rigorous), then
evaluate it (fair, specific), and finally convert it into value for YOUR group's problems —
the last move is why the lab holds these sessions at all. A paper-reading deck that only
summarizes is a failed paper-reading deck.

**Talk length** 20–45 min · **Pages** 12–25 · **Language** 中文讲解 + 英文术语/原文关键句。

## What the room judges

1. Did the presenter actually understand the method (can they re-derive the key idea)?
2. Is the critique specific (numbers, ablations, scope) rather than "创新性不错"?
3. Is there a concrete takeaway for our own work?

## Page skeleton

| # | Page | Count | Core content |
|---|------|-------|--------------|
| 1 | 论文信息 | 1 | 标题 · 作者·单位 · venue+年份 · 代码/项目页 · 一句话定位(`做了什么·解决什么`) |
| 2 | TL;DR | 1 | 3行:问题/方法一句话/关键结果数字 — 给没读过的同学的电梯陈述 |
| 3 | 背景与动机 | 1–2 | 该子领域现状小图 → 论文要解决的矛盾（含读这篇的理由） |
| 4 | 问题定义 | 1 | 形式化的问题(输入/输出/约束/目标函数)，符号表 |
| 5 | 方法总览 | 1 | 原文框架图(高清)或重绘，标注本文核心模块 |
| 6 | 方法拆解 | 3–6 | 逐模块：直觉→公式→为什么这样设计；每页结尾一行"我的理解/疑问" |
| 7 | 实验设置 | 0–1 | 数据集/指标/基线，紧凑式 |
| 8 | 主结果 | 1–2 | 论文核心表/图 + 讲解者标注(哪个数字最重要、和谁比) |
| 9 | 消融与分析 | 1–2 | 论文自己的消融 + 讲解者重画的对比图(可选) |
| 10 | 优点 | 1 | 2–4条，具体到机制(`问题分解使得…`) |
| 11 | 局限与质疑 | 1 | **价值页**：2–4条，可检验的批评 + 潜在bug/不公平比较/隐藏成本 |
| 12 | 对我们的启发 | 1 | **灵魂页**：可迁移技术→我们哪个课题;可复用代码;可对做的实验 |
| 13 | 讨论问题 | 0–1 | 抛给组里的2–3个开放问题 |
| 14 | 参考 | 0–1 | 本文+关键对比文献5–10条 |

## Design tokens — theme "纸边笔记" (default)

The deck is a READING aid, so the system separates paper content from presenter voice in
two visual registers: cream note-paper pages with white figure mats (the paper's world) and
an ink-green presenter voice with terracotta annotation markers (your judgment).

```
BG      FBF9F4   // note paper — content pages
SURFACE FFFFFF   // figure mats / cards
PAPER   F4F2EC   // slightly deeper mat variant for 原文图表
INK     274D46   // ink green — presenter voice: titles, your annotations
P_MID   587E75   // ramp mid
P_SOFT  E6EFEC   // tint — panels, quote blocks
ACCENT  D97706   // annotation amber — 💬 理解 / ❓ 疑问 / ⚠ 注意 markers
TEXT    2B2D2A
MUTED   8A8A80
LINE    E3DFD3
CHART_RAMP  ["274D46","587E75","9BBBB2","D3E2DD"]
```

- **Fonts** (split-run): CJK `微软雅黑` (quotes italic); Latin `Segoe UI`; math in EN face.
- **Type scale**: title 26–28pt bold · body 17–19pt · quote blocks 16–18pt italic on P_SOFT ·
  margin annotations 13–14pt ACCENT · footer `Journal Club · 日期 · N/M` 12pt.
- **Layout grid**: margins 0.55"; title y=0.3–0.88"; content y=1.1–6.95".
- **Signature motif**: the **presenter margin** — every paper-content page reserves a right
  rail (2.4", hairline LINE separated) or bottom strip for YOUR voice: `💬 我的理解`,
  `❓疑问`, `⚠ 注意` in 13–14pt ACCENT. Paper's words left, your judgment right — the two
  never blend silently.
- Paper figures sit on `PAPER` mats with 12pt source captions (`图源: Fig.3 ©原作者`),
  never stretched; redraw the novel part natively beside it when feasible.
- **Cover**: INK background, paper title warm-white 28–34pt (long English titles wrap 2–3
  lines), venue+year chip in ACCENT outline, TL;DR strip optional.

### Theme variants

| Variant | Swap | Mood |
|---|---|---|
| **暖页批注** Warm Margin | BG→`FBF5EC` INK→`6E4A28` P_MID→`9A7A55` P_SOFT→`F2E9DB` ACCENT→`9A3412` PAPER→`F6F0E6` LINE→`E8DFCE` | 读书会/人文 seminar，纸质笔记感 |
| **冷阅审稿** Cool Review | BG→`F5F6FA` INK→`37327E` P_MID→`6B66A8` P_SOFT→`E8E8F4` ACCENT→`C2410C` LINE→`DFE0EA` | ML/理论组，审稿人气质 |

## Key page template — 方法拆解页 (module page)

Title = the module's job (`注意力重加权：让难样本主导梯度`). Left 65%: the module's diagram
(redrawn native shapes when feasible) or equation with color-highlighted key variable; right
35% margin rail: `直觉` one line (人话), `设计动机` one line (`因为观察到X所以选Y`),
`❓疑问` one line (具体可讨论). If the paper figure is used: place on PAPER mat, redraw ONLY
the novel part beside it in native shapes.

## Key page template — 对我们的启发 (soul page)

Title: `对我们组的启发`. Three horizontal bands, hairline-separated, each (12.23 × 1.5):

```
① 可迁移：论文的X技术 → 用在我们课题二的Y环节（预期解决Z问题）
② 可复用：官方代码的A模块(CC-BY-4.0) → 替代我们手头的B实现
③ 可对做：补论文没做的对比——在我们数据集D上测X vs 我们的基线（谁来做·何时）
```

Band ③ with an owner/timeline turns a journal club into a lab decision. If the paper is
flagged 仅了解, collapse to one honest line instead of forced takeaways.

## Writing rules

- 每个方法页的"直觉"行必须是听众没读论文也能懂的人话 — 这是讲解者的核心增值。
- 关键结论引用原文页码/图号(`原文§3.2, Fig.2`)，方便组内翻原文跟进。
- 批评要可辩护：说"消融缺少X,无法区分A/B贡献"，不说"感觉不严谨"。
- 复现信息单独标注：代码链接·license·star数·issue活跃度(`repo: MIT, 4.2k★, 2025-09仍维护`)。
- 术语首次出现给中英对照+一句定义(照顾低年级)。
- 与我们工作的关系如实分档：直接可用/思路启发/仅了解 — 不要篇篇"重大启发"。

## Common failures

- ❌ 全篇翻译原文图表+念摘要 — journal club 的价值在判断与启发，不在复述
- ❌ 讲解者观点和论文原文混排不分 — 用 margin rail 强制分离（本场景母题的意义）
- ❌ 截图模糊的论文图表被拉伸变形 — PAPER mat 上等比放置或重绘
- ❌ 批评空泛("创新性一般") — 每条批评指向具体实验/公式/假设
- ❌ 没有启发页或启发页硬凑 — 宁可写"本文方法依赖标注量大，与我们的少样本场景不匹配，仅跟踪"
