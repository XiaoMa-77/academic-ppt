<div align="center">

# Academic PPT · 学术 PPT

**为研究生学术汇报生成内容充实、图示清晰、原生可编辑的 PowerPoint。**

原名 Lyceum · 吕克昂。保留 `lyceum` 技能入口，已有安装和调用方式兼容。

[English](README.md) · [简体中文](README.zh-CN.md) · [MIT](LICENSE)

</div>

## 先选两件事：场景 + 视觉主题

一份 PPT 由两个**互相独立**的选择决定：

- **场景（6 种）**：决定页数、页面骨架、论证顺序、时长、标志性图形 —— 组会 / 会议 / 进展 / 答辩 / 开题 / 文献分享。
- **视觉主题（19 套）**：决定纸张底色、卡片、封面、主色阶梯、强调色、图表色阶 —— 完整色值、选择规则和提示词模板见 [**`theme-index.md`**](skills/lyceum/references/theme-index.md)。

**学术蓝白只是 19 套里的一套，也是兜底方案，不是全部。** 请求里没写主题时，技能应先问一次用哪套风格，而不是直接默认成学术蓝白。
主题可以跨场景组合，例如「开题骨架 + 藏青金配色」：保留 `proposal.md` 的页面结构，只取 `conference.md` 的色值。

### 19 套主题一览

| 分组 | 主题（中文 / English） |
|---|---|
| 兜底 | [学术蓝白 / Academic Blue](examples/theme-preview/theme-01.png) |
| 组会 | [研纸墨蓝 / Ink Paper](examples/theme-preview/theme-02.png) · [暖砂陶 / Warm Sand](examples/theme-preview/theme-03.png) · [夜航实验室 / Midnight Lab（深色）](examples/theme-preview/theme-04.png) |
| 会议 | [藏青金 / Navy & Gold](examples/theme-preview/theme-05.png) · [林壑墨绿 / Forest Sage](examples/theme-preview/theme-06.png) · [讲坛酒红 / Burgundy Lecture](examples/theme-preview/theme-07.png) |
| 进展 | [卷宗红 / Dossier Vermilion](examples/theme-preview/theme-08.png) · [党建正红 / Crimson Dossier](examples/theme-preview/theme-09.png) · [石板青 / Slate Contract](examples/theme-preview/theme-10.png) |
| 答辩 | [学院蓝 / Academy Blue](examples/theme-preview/theme-11.png) · [学院红金 / Classic Crimson](examples/theme-preview/theme-12.png) · [石板牛津 / Slate Oxford](examples/theme-preview/theme-13.png) |
| 开题 | [蓝图青 / Blueprint Teal](examples/theme-preview/theme-14.png) · [青苗计划 / Sage Plan](examples/theme-preview/theme-15.png) · [石墨工程 / Graphite](examples/theme-preview/theme-16.png) |
| 文献分享 | [纸边笔记 / Paper Margin](examples/theme-preview/theme-17.png) · [暖页批注 / Warm Margin](examples/theme-preview/theme-18.png) · [冷阅审稿 / Cool Review](examples/theme-preview/theme-19.png) |

### 主题预览（每套一页，点开看大图）

**上表里每个主题名都是链接，直接指向对应效果图。** 19 页使用同一篇论文内容（Yu et al.,
*Accelerating Multi-Agent Planning Using Graph Transformers with Bounded Suboptimality*, ICRA 2023；
数值取自原文 Fig. 4 / Fig. 5），只有配色、卡片、封面和标志性图形不同。

|  |  |  |
|---|---|---|
| **01 学术蓝白**<br><a href="examples/theme-preview/theme-01.png"><img src="examples/theme-preview/theme-01.png" width="270" alt="01 学术蓝白"></a> | **02 研纸墨蓝**<br><a href="examples/theme-preview/theme-02.png"><img src="examples/theme-preview/theme-02.png" width="270" alt="02 研纸墨蓝"></a> | **03 暖砂陶**<br><a href="examples/theme-preview/theme-03.png"><img src="examples/theme-preview/theme-03.png" width="270" alt="03 暖砂陶"></a> |
| **04 夜航实验室**<br><a href="examples/theme-preview/theme-04.png"><img src="examples/theme-preview/theme-04.png" width="270" alt="04 夜航实验室"></a> | **05 藏青金**<br><a href="examples/theme-preview/theme-05.png"><img src="examples/theme-preview/theme-05.png" width="270" alt="05 藏青金"></a> | **06 林壑墨绿**<br><a href="examples/theme-preview/theme-06.png"><img src="examples/theme-preview/theme-06.png" width="270" alt="06 林壑墨绿"></a> |
| **07 讲坛酒红**<br><a href="examples/theme-preview/theme-07.png"><img src="examples/theme-preview/theme-07.png" width="270" alt="07 讲坛酒红"></a> | **08 卷宗红**<br><a href="examples/theme-preview/theme-08.png"><img src="examples/theme-preview/theme-08.png" width="270" alt="08 卷宗红"></a> | **09 党建正红**<br><a href="examples/theme-preview/theme-09.png"><img src="examples/theme-preview/theme-09.png" width="270" alt="09 党建正红"></a> |
| **10 石板青**<br><a href="examples/theme-preview/theme-10.png"><img src="examples/theme-preview/theme-10.png" width="270" alt="10 石板青"></a> | **11 学院蓝**<br><a href="examples/theme-preview/theme-11.png"><img src="examples/theme-preview/theme-11.png" width="270" alt="11 学院蓝"></a> | **12 学院红金**<br><a href="examples/theme-preview/theme-12.png"><img src="examples/theme-preview/theme-12.png" width="270" alt="12 学院红金"></a> |
| **13 石板牛津**<br><a href="examples/theme-preview/theme-13.png"><img src="examples/theme-preview/theme-13.png" width="270" alt="13 石板牛津"></a> | **14 蓝图青**<br><a href="examples/theme-preview/theme-14.png"><img src="examples/theme-preview/theme-14.png" width="270" alt="14 蓝图青"></a> | **15 青苗计划**<br><a href="examples/theme-preview/theme-15.png"><img src="examples/theme-preview/theme-15.png" width="270" alt="15 青苗计划"></a> |
| **16 石墨工程**<br><a href="examples/theme-preview/theme-16.png"><img src="examples/theme-preview/theme-16.png" width="270" alt="16 石墨工程"></a> | **17 纸边笔记**<br><a href="examples/theme-preview/theme-17.png"><img src="examples/theme-preview/theme-17.png" width="270" alt="17 纸边笔记"></a> | **18 暖页批注**<br><a href="examples/theme-preview/theme-18.png"><img src="examples/theme-preview/theme-18.png" width="270" alt="18 暖页批注"></a> |
| **19 冷阅审稿**<br><a href="examples/theme-preview/theme-19.png"><img src="examples/theme-preview/theme-19.png" width="270" alt="19 冷阅审稿"></a> |  |  |

[19 套带名称的拼版总览图](examples/theme-preview/theme-overview.png) ·
[完整色值与提示词模板](skills/lyceum/references/theme-index.md)

### 到底怎么用（重点）

**在请求里写出主题名**，点名后整套生效，不得回落到学术蓝白：

```text
用 Lyceum 做一份 18 页的学位答辩 PPT，视觉主题用「学院红金」。
保留答辩场景的页面骨架和创新点方块，封面、卡片、表格、图表色阶、页脚统一用该主题配色。
不要回落到学术蓝白。问题、方法细节和解释性图示放在同一页；缺失结果保持缺失。
```

优先级从高到低：

1. 用户提供的**院校模板 / 参考图 / 校徽 / 品牌色** → 保留场景骨架，替换色值。
2. **明确点名的主题**（中文名或英文名）→ 整套 deck 统一使用，不回落。
3. 用户说「默认 / 学术蓝白 / 不用选 / 随便」→ 才用学术蓝白。
4. 以上都没有 → **不要静默默认，先问一次**：给出风格分组（或按已判定的场景给 2–3 个具体主题名），并把「默认学术蓝白」作为其中一个选项。

「做得好看一点」「正式一点」「用蓝色系」都**不算点名**，因为没有对应到具体主题名，应追问是学术蓝白、研纸墨蓝还是学院蓝。
跨场景组合、给已有 PPT 换风格、院校模板覆盖、以及「怎么确认没有偷偷回到默认」的验收清单，全部写在 `theme-index.md` 第 7、8 节。

### 共享的版式与密度规范（19 套主题都遵守）

- **横向技术路线**：问题 → 数据准备 → 模型/方法 → 验证 → 输出，下方补阶段说明。
- **左流程、右论证**：科学问题、研究方法、阶段产物逐行对应。
- **背景证据 → 科学问题**：从具体任务或案例推导研究缺口。
- **方法与结果图示**：原生架构图、数据流、柱状图、训练曲线、表格和计划依赖图。

正文按区域组织，常规内容页可从约 120–260 个汉字加图表起步，按报告时长调整。
相关子结论可以同页呈现，不再因“两条结论”或“超过八行”机械拆页。
图示需要解释机制或证据；不会为了填满页面补造实验。
网格、字体、密度与图示规则见 [`academic-blue.md`](skills/lyceum/references/academic-blue.md) —— 换主题时这些规则不变，只有配色变。

## 9 页可编辑示例

示例题目：小样本分类与对比学习（视觉用的是默认学术蓝白）。**所有研究数据和曲线均为虚构演示**，页脚和备注均有标识。

| 背景 → 科学问题 | 左流程、右论证 | 横向技术路线 |
|---|---|---|
| ![研究背景](examples/group-meeting-demo/render/slide-2.png) | ![研究内容](examples/group-meeting-demo/render/slide-3.png) | ![技术路线](examples/group-meeting-demo/render/slide-4.png) |
| 方法架构 | 结果图表 | 曲线与排查链 |
| ![方法架构](examples/group-meeting-demo/render/slide-5.png) | ![实验比较](examples/group-meeting-demo/render/slide-6.png) | ![问题分析](examples/group-meeting-demo/render/slide-7.png) |

[下载完整 PPTX](examples/group-meeting-demo/group-meeting-demo.pptx) ·
[生成脚本](examples/group-meeting-demo/build_demo.js) ·
[全部页面预览](examples/group-meeting-demo/render/)

文字为文本框，示意图为形状与连线，数据图表内嵌工作簿，表格可直接修改。
图表原始演示数值存放在对应页备注中。

## 六套学术场景

| 场景 | 建议时长 | 场景参考 |
|---|---|---|
| 组会汇报 | 15–40 分钟 | [group-meeting.md](skills/lyceum/references/group-meeting.md) |
| 学术会议报告 | 12–20 分钟 | [conference.md](skills/lyceum/references/conference.md) |
| 科研进展 / 中期 / 结题 | 15–30 分钟 | [progress.md](skills/lyceum/references/progress.md) |
| 学位论文答辩 | 15–40 分钟 | [defense.md](skills/lyceum/references/defense.md) |
| 开题报告 | 10–20 分钟 | [proposal.md](skills/lyceum/references/proposal.md) |
| 文献分享 / Journal Club | 20–45 分钟 | [paper-reading.md](skills/lyceum/references/paper-reading.md) |

场景参考决定论证结构；视觉主题从 [`theme-index.md`](skills/lyceum/references/theme-index.md) 里选；`academic-blue.md` 提供所有主题共享的网格、字体与密度规范。
场景**不锁定配色**：每个场景文件附带的 3 套主题只是推荐分组，可跨场景取用。用户提供的院校模板和参考图优先。
### 场景骨架预览（配色相同，结构不同）

这 6 页全部使用默认学术蓝白配色，只换页面骨架与论证顺序。
[6 页拼版总览图](examples/theme-preview/scenario-overview.png)。

|  |  |  |
|---|---|---|
| **1 组会汇报**<br><a href="examples/theme-preview/scenario-1.png"><img src="examples/theme-preview/scenario-1.png" width="270" alt="1 组会汇报"></a> | **2 学术会议报告**<br><a href="examples/theme-preview/scenario-2.png"><img src="examples/theme-preview/scenario-2.png" width="270" alt="2 学术会议报告"></a> | **3 科研进展**<br><a href="examples/theme-preview/scenario-3.png"><img src="examples/theme-preview/scenario-3.png" width="270" alt="3 科研进展"></a> |
| **4 学位答辩**<br><a href="examples/theme-preview/scenario-4.png"><img src="examples/theme-preview/scenario-4.png" width="270" alt="4 学位答辩"></a> | **5 开题报告**<br><a href="examples/theme-preview/scenario-5.png"><img src="examples/theme-preview/scenario-5.png" width="270" alt="5 开题报告"></a> | **6 文献分享**<br><a href="examples/theme-preview/scenario-6.png"><img src="examples/theme-preview/scenario-6.png" width="270" alt="6 文献分享"></a> |

## 安装技能

```bash
git clone https://github.com/XiaoMa-77/academic-ppt.git
cd academic-ppt

# Claude Code
mkdir -p ~/.claude/skills
cp -r skills/lyceum ~/.claude/skills/

# 兼容 .agents/skills 的智能体
mkdir -p ~/.agents/skills
cp -r skills/lyceum ~/.agents/skills/
```

Windows PowerShell 可以使用：

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE/.agents/skills" | Out-Null
Copy-Item -Recurse skills/lyceum "$env:USERPROFILE/.agents/skills/"
```

对话示例（这条点名了主题，因此**不会**用学术蓝白）：

```text
用 Lyceum 做一份开题汇报，视觉主题用「蓝图青」。
每页保留研究问题、方法细节和对应图示，技术路线用横向流程，
研究内容用左流程右说明。根据我给的数据制作结果图，不要补造结果。
```

要用兜底风格，请明确写「用默认学术蓝白，不用再问风格」。更多模板（跨场景组合、院校模板、整份换风格、验收清单）见 `theme-index.md`。

## 构建与测试

需要 Node.js 22+、Python 3.10+。请在仓库根目录执行：

```bash
npm ci
python -m pip install -r requirements-qa.txt
npm run build
npm run qa
npm test
```

- `build` 生成 9 页示例，自动规范化生成库的重复段落属性，保留中英混排与原生对象。
- `qa` 检查溢出、越界、文本重叠、占位符、字体、可编辑性和已知 XML 兼容性问题；
  `--academic` 同时输出正文量、图表/表格/图片和流程图候选提示。
- `test` 运行 13 项回归检查，覆盖密度、原生图示、兼容性修复及原有负向夹具。
- GitHub Actions 在推送和 PR 时重建示例、运行 QA 与回归测试，并保存 PPTX 构建产物。

自定义输出位置：

```bash
node examples/group-meeting-demo/build_demo.js /path/to/output.pptx
```

自定义 Python 可设置环境变量 `PYTHON`，指向已安装 QA 依赖的解释器。
图像尺寸依赖固定为修复版本，安装由 `package-lock.json` 锁定。

## 渲染与视觉复核

Windows 安装 PowerPoint 后：

```powershell
./skills/lyceum/scripts/render_powerpoint.ps1 `
  -DeckPath examples/group-meeting-demo/group-meeting-demo.pptx `
  -OutDir examples/group-meeting-demo/render
```

脚本以只读方式打开 PPT，逐页导出 1440×810 预览；打不开或导出失败时立即报错。
其他平台可用 LibreOffice 转 PDF，再用 `pdftoppm` 导出页面，需安装相应中文字体。

程序化检查是启发式检查。交付前仍需逐页查看字体、标签、连线、标点、数值来源和图表解读。
`--academic` 的“流程图候选”只表示检测到形状和线条，不能判断科研逻辑。

## 仓库结构

```text
skills/lyceum/
  SKILL.md                         # 路由、内容方法、原生编辑约束
  references/theme-index.md        # 19 套主题、色值、选择规则、提示词模板、验收清单
  references/academic-blue.md      # 共享网格/字体/密度/图示规范（兜底配色）
  references/                     # 六套场景骨架 + 各场景的主题色值
  scripts/qa_check.py              # 质量检查与密度提示
  scripts/normalize_pptx.py        # 生成文件 XML 兼容处理
  scripts/render_powerpoint.ps1    # Windows 原生渲染验证
examples/theme-preview/            # 19 套主题 + 6 种场景效果图与拼版总览
examples/group-meeting-demo/       # 9 页示例、脚本和全部预览
examples/qa-selftest/              # 缺陷样例与回归检查
.github/workflows/quality.yml      # 自动构建与测试
```

贡献新场景时请给出真实页面任务与图示方案；修改示例后重新构建、QA、渲染并查看所有页面。
技能入口保持精简，详细规范放入 `references/`。

[MIT](LICENSE) © 2026 Lyceum 贡献者。
