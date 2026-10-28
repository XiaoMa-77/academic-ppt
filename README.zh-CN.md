<div align="center">

# Academic PPT · 学术 PPT

**为研究生学术汇报生成内容充实、图示清晰、原生可编辑的 PowerPoint。**

原名 Lyceum · 吕克昂。保留 `lyceum` 技能入口，已有安装和调用方式兼容。

[English](README.md) · [简体中文](README.zh-CN.md) · [MIT](LICENSE)

</div>

## 默认风格：学术蓝白

默认采用白底、深蓝标题、深色正文、细描边与阶段配色。每页围绕一个研究任务，
把问题、方法、证据和解读组织在一起。保留六套学术场景的内容方法，旧配色主题可显式选择。

- **横向技术路线**：问题 → 数据准备 → 模型/方法 → 验证 → 输出，下方补阶段说明。
- **左流程、右论证**：科学问题、研究方法、阶段产物逐行对应。
- **背景证据 → 科学问题**：从具体任务或案例推导研究缺口。
- **方法与结果图示**：原生架构图、数据流、柱状图、训练曲线、表格和计划依赖图。

正文按区域组织，常规内容页可从约 120–260 个汉字加图表起步，按报告时长调整。
相关子结论可以同页呈现，不再因“两条结论”或“超过八行”机械拆页。
图示需要解释机制或证据；不会为了填满页面补造实验。

完整规范：[`academic-blue.md`](skills/lyceum/references/academic-blue.md)。

## 9 页可编辑示例

主题：小样本分类与对比学习。**所有研究数据和曲线均为虚构演示**，页脚和备注均有标识。

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

场景参考决定论证结构，学术蓝白规范决定默认视觉与密度。用户提供的院校模板和参考图优先。
原有 18 套主题作为可选方案保留；默认无需选择主题即可开始。

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

对话示例：

```text
用 Lyceum 做一份开题汇报，采用学术蓝白风格。
每页保留研究问题、方法细节和对应图示，技术路线用横向流程，
研究内容用左流程右说明。根据我给的数据制作结果图，不要补造结果。
```

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
  references/academic-blue.md      # 默认视觉、密度与 figure 规范
  references/                     # 六套场景与可选旧主题
  scripts/qa_check.py              # 质量检查与密度提示
  scripts/normalize_pptx.py        # 生成文件 XML 兼容处理
  scripts/render_powerpoint.ps1    # Windows 原生渲染验证
examples/group-meeting-demo/       # 9 页示例、脚本和全部预览
examples/qa-selftest/              # 缺陷样例与回归检查
.github/workflows/quality.yml      # 自动构建与测试
```

贡献新场景时请给出真实页面任务与图示方案；修改示例后重新构建、QA、渲染并查看所有页面。
技能入口保持精简，详细规范放入 `references/`。

[MIT](LICENSE) © 2026 Lyceum 贡献者。
