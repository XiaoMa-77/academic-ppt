# 主题索引 · 19 套视觉风格怎么选、怎么点名

> 本文件是视觉风格的唯一索引。生成或改版任何 PPT 之前，**先读本文件确定风格**，再读场景参考与 `academic-blue.md`。
> 学术蓝白只是「用户没选、也没要求选」时的兜底，不是本技能的默认答案。
>
> 19 套主题各一页的效果图（同一论文内容、只换配色）在
> [`examples/theme-preview/`](../../../examples/theme-preview/theme-overview.png)，
> 编号与本文件第 4 节一一对应；README 里的每个主题名也直接链到对应图片。

## 1. 两个正交维度

| 维度 | 决定什么 | 数量 | 定义位置 |
|---|---|---|---|
| 场景 scenario | 页数、页面骨架、论证顺序、语言、标志性图形 | 6 | `group-meeting.md` / `conference.md` / `progress.md` / `defense.md` / `proposal.md` / `paper-reading.md` |
| 主题 theme | 配色、纸张底色、卡片、封面、强调色、图表色阶 | 19 | 本文件；原始 token 分散在各场景文件的 `Design tokens` 与 `Theme variants` 段 |

两者**独立且可自由组合**：主题按场景分组只是便于检索，不表示「组会主题只能用于组会」。
例如「开题骨架 + 藏青金配色」是合法请求：保留 `proposal.md` 的页面骨架，只取 `conference.md` 的 token。

## 2. 优先级（从高到低）

1. **用户提供的院校模板、参考图、校徽、品牌色** → 保留场景骨架，替换 design tokens。
2. **用户点名的主题**（中文名或英文名，见第 4 节）→ 整套 deck 统一使用该主题，**不得回落到学术蓝白**。
3. 用户明确说「默认 / 学术蓝白 / 不用选 / 随便」→ 用学术蓝白。
4. **以上都没有 → 不要静默默认，先问一次风格**（见第 3 节）。

主题一旦选定，封面、内容页、卡片、表格、图表色阶、页脚都必须一致；不要只换封面颜色。
主题不改变内容密度、图示规划与 QA 规则，那些仍按 `academic-blue.md` 的共享契约执行。

## 3. 没指定风格时，先问一次

新建 deck 且用户未指定视觉风格时，用一句短问题给出选项，不要直接开工：

```text
这次用哪套视觉风格？
A 默认学术蓝白（白底深蓝，最快）
B 组会系：研纸墨蓝 / 暖砂陶 / 夜航实验室（深色）
C 会议系：藏青金 / 林壑墨绿 / 讲坛酒红
D 进展系：卷宗红 / 党建正红 / 石板青
E 答辩系：学院蓝 / 学院红金 / 石板牛津
F 开题系：蓝图青 / 青苗计划 / 石墨工程
G 文献系：纸边笔记 / 暖页批注 / 冷阅审稿
也可直接说主题名，或给院校模板。
```

场景已经明确时，给 2–3 个**具体主题名**更省事，例如判定为答辩就问：
「学院蓝 / 学院红金 / 石板牛津 / 默认学术蓝白，选哪个？」

## 4. 19 套主题速查

| # | 主题 | 英文名 | 分组 | BG / INK / ACCENT | 适用 |
|---|---|---|---|---|---|
| 01 | 学术蓝白 | Academic Blue | 默认兜底 | `FFFFFF` / `174A88` / `B73535` | 通用、白底细描边；未指定时才用 |
| 02 | 研纸墨蓝 | Ink Paper | 组会 | `F8F7F3` / `1D3557` / `E07A5F` | 常规组会，暖纸 + 墨蓝阶梯 |
| 03 | 暖砂陶 | Warm Sand | 组会 | `FDF6EC` / `5C4A32` / `35707C` | 人文 / 社科组，书卷气 |
| 04 | 夜航实验室 | Midnight Lab | 组会 | `111826` / `93B4D4` / `F0A583` | 晚间线上组会，**唯一深色主题** |
| 05 | 藏青金 | Navy & Gold | 会议 | `FAFAF7` / `1A2E4A` / `C9A227`(GOLD) | 正式会议报告，哑光金强调 |
| 06 | 林壑墨绿 | Forest Sage | 会议 | `F7F9F5` / `1E3B2C` / `B45309` | 生命 / 环境 / 医学会议 |
| 07 | 讲坛酒红 | Burgundy Lecture | 会议 | `FAF7F5` / `5F1F26` / `0F766E` | 人文社科，讲座厅气质 |
| 08 | 卷宗红 | Dossier Vermilion | 进展 | `F9F7F2` / `7A2E2E` / `31606B` | 基金 / 课题中期与结题 |
| 09 | 党建正红 | Crimson Dossier | 进展 | `FAF6F5` / `8C1F1F` / `A0791F` | 党建 / 思政 / 部委课题 |
| 10 | 石板青 | Slate Contract | 进展 | `F6F7F6` / `334155` / `0F766E` | 横向 / 企业合作课题 |
| 11 | 学院蓝 | Academy Blue | 答辩 | `F7F8F6` / `274060` / `B3541E` | 学位答辩通用 |
| 12 | 学院红金 | Classic Crimson | 答辩 | `FAF7F4` / `6E2222` / `A0791F` | 传统工科 / 文理院校 |
| 13 | 石板牛津 | Slate Oxford | 答辩 | `F5F6F7` / `334155` / `B45309` | 现代理工 / 交叉学科中心 |
| 14 | 蓝图青 | Blueprint Teal | 开题 | `F5F8F8` / `155E63` / `C4622D` | 开题、技术路线与甘特图 |
| 15 | 青苗计划 | Sage Plan | 开题 | `F6F8F4` / `3F6212` / `9A3412` | 生命 / 农学 / 医学开题 |
| 16 | 石墨工程 | Graphite | 开题 | `F6F6F7` / `37505C` / `0E7490` | 工程交叉学科 |
| 17 | 纸边笔记 | Paper Margin | 文献分享 | `FBF9F4` / `274D46` / `D97706` | Journal Club，讲者批注 |
| 18 | 暖页批注 | Warm Margin | 文献分享 | `FBF5EC` / `6E4A28` / `9A3412` | 读书会 / 人文 seminar |
| 19 | 冷阅审稿 | Cool Review | 文献分享 | `F5F6FA` / `37327E` / `C2410C` | ML / 理论组，审稿人气质 |

## 5. 完整 design tokens

变体只覆盖列出的字段，其余继承同组主主题。所有色值为 6 位十六进制，不带 `#`。

### 01 学术蓝白（默认兜底）

```text
BG/SURFACE FFFFFF   INK 174A88   P_MID 096CA8   P_SOFT EAF3FB
TEXT 202A35   MUTED 526477   LINE B8CADB
TEAL 008579   GOLD B87B00   ACCENT B73535
CHART_RAMP ["174A88","096CA8","648DAE","B6CADC"]
```

### 02–04 组会系（基准：研纸墨蓝）

```text
BG F8F7F3   SURFACE FFFFFF   INK 1D3557   P_MID 457B9D   P_SOFT E3EAF2
ACCENT E07A5F   TEXT 2B2D33   MUTED 8A8D94   LINE DFDBD2
OK 2F7D4F   WARN B0762B   FAIL B04A3A
CHART_RAMP ["1D3557","457B9D","8FB0C6","C4D5E0"]

暖砂陶 Warm Sand:     BG FDF6EC  INK 5C4A32  P_MID 96805F  P_SOFT F0E6D8  ACCENT 35707C  LINE E8DCC8
夜航实验室 Midnight Lab: BG 111826  SURFACE 1B2536  INK 93B4D4  P_MID 5E7A99  P_SOFT 243247
                        ACCENT F0A583  TEXT DCE3EC  MUTED 8B95A5  LINE 2C3A50
                        → 深色：正文≥14pt，关闭阴影，卡片用 P_MID 1px 描边
```

### 05–07 会议系（基准：藏青金）

```text
BG FAFAF7   SURFACE FFFFFF   INK 1A2E4A   P_MID 3E5C80   P_SOFT E7EDF4
GOLD C9A227   TEXT 232733   MUTED 83888F   LINE E2E2DC
CHART_RAMP ["1A2E4A","3E5C80","8CA3BF","C6D3E2"]

林壑墨绿 Forest Sage:      BG F7F9F5  INK 1E3B2C  P_MID 4A7060  P_SOFT E6EFE8  GOLD B45309  LINE DFE4DC
讲坛酒红 Burgundy Lecture: BG FAF7F5  INK 5F1F26  P_MID 8C4A52  P_SOFT F3E6E8  GOLD 0F766E  LINE E6DCDE
```

### 08–10 进展系（基准：卷宗红）

```text
BG F9F7F2   SURFACE FFFFFF   INK 7A2E2E   P_MID A85D51   P_SOFT F3E7E2
ACCENT 31606B   TEXT 2D2A26   MUTED 8B857B   LINE E3DDD1
OK 2F7D4F   WARN B0762B   PEND 8B857B
CHART_RAMP ["7A2E2E","A85D51","C79A90","E3CFC9"]

党建正红 Crimson Dossier: BG FAF6F5  INK 8C1F1F  P_MID B3554F  P_SOFT F5E5E3  ACCENT A0791F
石板青 Slate Contract:     BG F6F7F6  INK 334155  P_MID 64748B  P_SOFT E8EDF2  ACCENT 0F766E  LINE DFE3E0
```

### 11–13 答辩系（基准：学院蓝）

```text
BG F7F8F6   SURFACE FFFFFF   INK 274060   P_MID 4A6A8C   P_SOFT E6EDF3
ACCENT B3541E   TEXT 272A30   MUTED 83888F   LINE DDE1DC
CHART_RAMP ["274060","4A6A8C","93ACC4","CBD9E6"]

学院红金 Classic Crimson: BG FAF7F4  INK 6E2222  P_MID 9C5B52  P_SOFT F3E6E2  ACCENT A0791F  LINE E4DCD4
石板牛津 Slate Oxford:    BG F5F6F7  INK 334155  P_MID 64748B  P_SOFT E8EDF2  ACCENT B45309  LINE DEE2E6
```

### 14–16 开题系（基准：蓝图青）

```text
BG F5F8F8   SURFACE FFFFFF   INK 155E63   P_MID 4E878C   P_SOFT E2EFEF
ACCENT C4622D   TEXT 272E2E   MUTED 828A89   LINE DCE3E2
CHART_RAMP ["155E63","4E878C","93B7B9","CFE0E0"]

青苗计划 Sage Plan: BG F6F8F4  INK 3F6212  P_MID 74904B  P_SOFT EAF0E2  ACCENT 9A3412  LINE DFE5DA
石墨工程 Graphite:  BG F6F6F7  INK 37505C  P_MID 6E8794  P_SOFT E7EDF0  ACCENT 0E7490  LINE DEE2E4
```

### 17–19 文献系（基准：纸边笔记）

```text
BG FBF9F4   SURFACE FFFFFF   PAPER F4F2EC   INK 274D46   P_MID 587E75   P_SOFT E6EFEC
ACCENT D97706   TEXT 2B2D2A   MUTED 8A8A80   LINE E3DFD3
CHART_RAMP ["274D46","587E75","9BBBB2","D3E2DD"]

暖页批注 Warm Margin: BG FBF5EC  INK 6E4A28  P_MID 9A7A55  P_SOFT F2E9DB  ACCENT 9A3412  PAPER F6F0E6  LINE E8DFCE
冷阅审稿 Cool Review: BG F5F6FA  INK 37327E  P_MID 6B66A8  P_SOFT E8E8F4  ACCENT C2410C  LINE DFE0EA
```

## 6. 各场景标志性图形（motif）

| 场景 | motif | 做法 |
|---|---|---|
| 组会 | 状态标签 | 内容页右上角 0.09" ACCENT 方块 + 12pt MUTED 标签（进展 / 问题 / 计划 / 求助） |
| 会议 | 贡献圆章 | 0.34" GOLD 描边圆形 + INK 编号，标在框架图关键模块上方 |
| 进展 | 完成度条 | 0.28" INK 实心条压在 P_SOFT 轨道上，配 OK / WARN / PEND 状态色 |
| 答辩 | 创新点方块 | 0.26" 实心 ACCENT 方块 + 白色 ✓，创新点列表逐条标记 |
| 开题 | gap 菱形 | 0.22" ACCENT 描边菱形收束研究现状；Plan B 用 ACCENT 虚线分支 |
| 文献分享 | 讲者批注栏 | 右侧保留 margin，PAPER 底 + ACCENT 标记（理解 / 疑问 / 注意），原文图配 12pt 图源 |

换主题时 motif 的形状与位置保持不变，只换颜色；换场景时 motif 跟着场景走。

## 7. 提示词模板（可直接复制）

**点名主题（推荐写法）**

```text
用 Lyceum 做一份 18 页的学位答辩 PPT，视觉主题用「学院红金」。
保留答辩场景的页面骨架和创新点方块，整套配色、封面、表格、图表、页脚统一用该主题。
不要回落到学术蓝白。问题、方法细节和解释性图示放在同一页；缺失结果保持缺失。
```

**跨场景组合**

```text
用 Lyceum 做一份开题报告，页面骨架按开题场景（问题 → 路线 → 甘特 + Plan B），
配色只用「藏青金」的 design tokens，不要套用会议场景的页面骨架。
```

**院校模板优先**

```text
按我给的学院 PPT 模板配色来做（校徽 + 主色 #xxxxxx），场景骨架用组会汇报，
忽略所有内置主题的 token。
```

**给已有 PPT 换风格**

```text
把这份 PPT 整体改成「夜航实验室」主题：封面、卡片、表格、图表色阶、页脚全部换，
文字内容和页面顺序不变。改完渲染逐页检查深色下的对比度。
```

**明确要默认**

```text
用 Lyceum 做一份组会汇报，视觉用默认学术蓝白，不用再问风格。
```

**反例（都不算点名，会触发询问或兜底）**

- 「做得好看一点 / 正式一点 / 学术一点」— 形容词不是主题名。
- 「用蓝色系」— 没有对应到具体主题名，需追问是学术蓝白、研纸墨蓝还是学院蓝。
- 「按你仓库的风格来」— 仓库有 19 套，必须选一套。

## 8. 验收：怎么确认没有偷偷回到默认

交付前逐项核对：

1. 内容页背景 BG 是否等于所选主题（学术蓝白是纯白 `FFFFFF`，其余多为纸色）；出现纯白 + 深蓝标题就说明回落了。
2. 封面是否用了该主题的 INK 深色底（夜航实验室本身就是深色）。
3. 表格表头、图表色阶是否来自该主题 `CHART_RAMP`，而不是 `174A88 / 096CA8` 那一组。
4. 强调色是否等于该主题 ACCENT / GOLD，且只用在少数关键元素上。
5. 标志性图形是否在（见第 6 节），颜色是否已替换。
6. 在交付说明里**写出实际使用的主题名**，方便用户核对或要求换一套。
