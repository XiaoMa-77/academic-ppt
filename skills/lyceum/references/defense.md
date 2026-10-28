# Scenario · 学位论文答辩 (Thesis Defense)

> **Default visual style:** read [academic-blue.md](academic-blue.md). Use this file for scenario structure and research content. The named palettes, cover treatments and card layouts below are optional legacy themes; they do not override the shared white/blue style or its figure and density guidance.

The terminal ritual of a degree (本科/硕士/博士). The audience is a defense committee
(答辩委员会) of 3–7 professors who have read (or skimmed) the thesis, plus a public gallery.
Time is strictly chaired; after the talk comes a gauntlet of questions where the deck's backup
pages decide how well you land. The genre is a **closed argument**: background → framework →
three-ish studies that each pose, solve, and verify one sub-problem → contributions → horizon.
Confidence without arrogance; completeness without bloat.

**Talk length** 硕/博 20–40 min, 本科 10–15 min · **Pages** 20–40 + 备用页 · **Language** Chinese
(英文答辩按用户要求切换，结构不变).

## What the committee judges

1. 工作量与系统性 — is this a coherent thesis, not three stapled papers (or one paper inflated)?
2. 创新点是否成立且本人贡献清晰 — what is NEW and what is YOURS.
3. 学术训练痕迹 — literature command, methodology rigor, honest limitations, future work.

## Page skeleton

| # | Page | Count | Core content |
|---|------|-------|--------------|
| 1 | 封面 | 1 | 论文题目 · 学位类型 · 姓名/学号 · 导师 · 学院/专业 · 答辩日期 · (校徽) |
| 2 | 汇报提纲 | 1 | 5–6 条：背景→内容概览→各研究内容→总结展望（评审导航习惯） |
| 3 | 研究背景与意义 | 1–2 | 领域大图 → 具体矛盾 → 选题意义（一条主线，不铺教材） |
| 4 | 国内外研究现状 | 1–2 | 三类方法脉络图/时间线 → 每类的局限 → 引出本文切入点 |
| 5 | 研究内容总览 | 1 | **全场景最重要的图**：研究框架图，3个子问题→3个研究内容→支撑关系 |
| 6 | 研究内容一 | 3–5 | 问题→方法(核心页给直觉+形式化)→实验验证→小结(一段话) |
| 7 | 研究内容二 | 3–5 | 镜像结构（委员会对照听） |
| 8 | 研究内容三 | 3–5 | 镜像结构（本科/硕士可仅2项内容） |
| 9 | 创新点总结 | 1 | **灵魂页**：2–4条，每条"创新点+对应证据页+与已有工作的差别" |
| 10 | 结论与展望 | 1 | 结论三句话 + 局限(诚实1–2条) + 展望(可操作的后续方向) |
| 11 | 学术成果 | 1 | 攻读期间论文/专利/获奖，与本人贡献对应（只列作者的，标注状态） |
| 12 | 致谢 | 1 | 导师/实验室/基金/家人 — 一段真挚克制的话 |
| 13 | 备用页 | 5–15 | 证明推导、完整实验表、参数细节、失败案例、加测实验 — Q&A弹药库 |

Chapter dividers (第三章…) between 研究内容 blocks if the thesis is chapter-organized:
a near-empty page with just the chapter number+title, PRIMARY background, white text.

## Design tokens — theme "学院蓝" (optional legacy theme)

Ivory-cold paper, white exhibit cards, academy blue ink with a burnt-sienna accent — the
ceremony and rigor of a university defense, calmer than a conference deck.

```
BG      F7F8F6   // ivory-cold paper — content pages
SURFACE FFFFFF   // exhibit cards
INK     274060   // academy blue — titles, table headers, chapter dividers, cover
P_MID   4A6A8C   // ramp mid
P_SOFT  E6EDF3   // tint — zebra, panels
ACCENT  B3541E   // burnt sienna — innovation markers, key deltas
TEXT    272A30
MUTED   83888F
LINE    DDE1DC
CHART_RAMP  ["274060","4A6A8C","93ACC4","CBD9E6"]
```

- **Fonts** (split-run): CJK `微软雅黑` (titles Bold; 人文经管可标题思源宋体); Latin/digits
  `Segoe UI`. 创新点编号 40pt bold ACCENT.
- **Type scale**: cover title 32–40pt (长题两行) · content title 28pt bold charSpacing 0.5 ·
  body 19–21pt · captions 12–14pt · footer `姓名 · 论文短题 · N/M` 12pt.
- **Layout grid**: margins 0.55"; title y=0.3–0.9"; content as white cards on paper BG
  (rounded 0.06, INK 10% shadow).
- **Signature motif**: **innovation markers** — 0.26" solid ACCENT squares with white check,
  on the framework page's novel modules, on each study's core method page, and leading each
  bullet on 创新点总结 (the page committee members photograph).
- **Cover + chapter dividers**: INK background, 校徽 (white version) top-left 0.9", title
  warm-white; dividers carry only chapter number (72pt EN) + title (28pt).

### Theme variants

| Variant | Swap | Mood |
|---|---|---|
| **学院红金** Classic Crimson | BG→`FAF7F4` INK→`6E2222` P_MID→`9C5B52` P_SOFT→`F3E6E2` ACCENT→`A0791F` LINE→`E4DCD4` | 传统工科/文理院校 |
| **石板牛津** Slate Oxford | BG→`F5F6F7` INK→`334155` P_MID→`64748B` P_SOFT→`E8EDF2` ACCENT→`B45309` LINE→`DEE2E6` | 现代理工、交叉学科中心 |

校色 VI 永远优先于变体；未提供时用默认并在交付摘要注明。

## Key page template — 创新点总结 (the soul page)

Title: `本文创新点` (no cleverness here — the committee wants the standard frame). Body: 2–4
horizontal bands, each (12.23 × 1.15) separated by hairlines:

```
① ACCENT编号 + 创新点命题 (20pt bold, 一句可辩护的陈述)
   证据：研究内容一 · 第8–11页 | 差别：与[XX'22]不同，本文首次… (14pt MUTED)
```

Rules: every innovation is (a) a claim someone could challenge, (b) mapped to evidence pages,
(c) differentiated from the closest prior work by name. "提出了…的方法" alone is a target, not
a contribution.

## Key page template — 研究框架总览

Full-width native diagram, content band: top row = 科学问题 (3 rounded boxes, PRIMARY outline);
middle = 研究内容一/二/三 (solid cards, white text on PRIMARY, innovation squares on novel
modules); bottom = 应用场景/验证平台; thin connectors showing 支撑/递进 relations; caption:
`图1 · 研究框架：三个研究内容递进支撑总体目标`. This page gets redrawn from the thesis if the
user provides it — NEVER screenshot the thesis figure at low resolution.

## Writing rules

- 答辩标题可以用章节式（第三章 面向XX的YY方法），action-title 规则在研究内容内部页执行;
  框架/创新点/总结页用标准标题。
- 每个研究内容结尾加一页"小结"带:方法一句话+关键数字+支撑创新点编号。
- 本人与合作工作边界清楚：成果页标注"本人一作""导师通讯"。
- 局限性主动讲1–2条真实且非致命的（数据规模/场景外推/单点验证），展现学术成熟度。
- 备用页组织成"证明类/实验类/细节类"并在首页角落不标注 — 你知道顺序即可；每页标题
  前缀 `Backup ·`。
- 讲稿时间轴：40分钟≈内容页35+互动缓冲；在 speaker notes 首页写"第10分钟应在第X页"。

## Common failures

- ❌ 创新点页写"提出了三个创新点"但无证据页引用 — 委员追问时无锚点
- ❌ 框架图直接截图论文（模糊/字号<12pt） — 重绘为原生形状
- ❌ 三个研究内容页数失衡(3/8/3) — 委员怀疑工作量分布
- ❌ 无备用页被问细节时翻正文找半天 — Q&A体验直接掉档
- ❌ 致谢页煽情过度/致谢名单遗漏委员会外单位基金号 — 得体与合规都要
- ❌ 超时被主席截断在创新点页之前 — 排练时按页配速（notes 时间锚点）
