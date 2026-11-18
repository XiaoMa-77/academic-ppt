# Academic PPT · 设计文档

> 版本：v1.1 · 更新：2026-11-18
> 本文描述 `academic-ppt` 的设计背景、架构、接口、数据流与边界/异常场景。
> 事实性内容以仓库内实际代码与文档为准；无法仅凭仓库确认的部分在文末「假设与待确认」中显式列出。
> 原名 Lyceum · 吕克昂，保留 `lyceum` 技能入口与安装路径兼容。

---

## 1. 背景与目标

### 1.1 问题

研究生学术汇报（组会 / 会议 / 进展 / 答辩 / 开题 / 文献分享）的 PPT 常见四类失败：

1. **不可编辑**：HTML→图片管线导出的是整页截图，用户无法在 PowerPoint 里改一个字、一个数据或一条连线。
2. **有壳无内容**：页面只有标题和项目符号，缺少能解释机制的图、证据与结论之间的关系。
3. **风格与场景错配**：把「主题」和「版式」混为一谈，或所有页面套同一张卡片网格；主题名未被点名时静默回落到学术蓝白。
4. **交付前检查靠肉眼**：文字溢出、形状越界、缺字体、占位符残留、PptxGenJS 产生的重复 `a:pPr` 等缺陷容易被漏掉。

### 1.2 目标

- **原生可编辑**：所有文字是真实文本框，图表是原生图表，示意图是可改标签的形状 + 连线，表格是真实表格对象（SKILL.md「Iron law 1」）。
- **场景与主题解耦**：6 种场景骨架 × 19 套视觉主题自由组合；主题只换配色，场景决定页面顺序与论证结构。
- **内容有实质**：action title、assertion → evidence → so-what、页内来源标注、带单位与基线的数字、诚实披露不确定性。
- **双 QA 闸门 + 回归**：程序化检查（`qa_check.py`）与渲染后人工视觉复核并行；负向夹具 `bad_deck.pptx` 与 unittest 回归套件守门。
- **可复现**：Node 构建脚本 + Python QA 依赖（`requirements-qa.txt`）+ GitHub Actions + 本地一键校验脚本。

### 1.3 非目标

- 不替代真实研究数据：缺失结果保持缺失，用 `【待补充：xxx】` 标注，不编造实验结果、引用或数值。
- `--academic` 只报告「图示候选」与密度提示，不判断科研语义或数值真伪。
- 不做账号、协作或云服务；不承诺跨机器字体替代效果一致，只承诺显式指定字体名。
- 本仓库只提供 Windows PowerPoint 渲染脚本；其他平台渲染链路见 README，本文不展开。

---

## 2. 总体架构

系统采用「技能路由 → 原生构建 → 兼容归一化 → 程序化 QA + 视觉 QA → CI/本地校验」的分层结构：

```text
┌────────────────────────── 输入层 ──────────────────────────┐
│ 用户需求（场景 + 主题）   │  用户材料（论文/数据/旧 .pptx） │
└───────────────┬──────────────────────┬─────────────────────┘
                │ 路由 / 查缺           │ 收集
                v                      v
┌───────────────────────────────────────────────────────────┐
│ skills/lyceum/SKILL.md   技能入口：路由 + 两条铁律 + 5 步工作流 │
│  Step 1 场景路由 → 解析视觉主题 → 读 academic-blue 共享契约   │
└───────────────────────────┬───────────────────────────────┘
                            │ 读取 references/（6 场景 + theme-index + academic-blue）
                            v
┌───────────────────────────────────────────────────────────┐
│ 构建层  examples/group-meeting-demo/build_demo.js          │
│  pptxgenjs 4.0.1 · LAYOUT_WIDE 13.33×7.5in                │
│  → examples/group-meeting-demo/group-meeting-demo.pptx     │
└───────────────────────────┬───────────────────────────────┘
                            │ 生成文件
                            v
┌───────────────────────────────────────────────────────────┐
│ 兼容层  skills/lyceum/scripts/normalize_pptx.py           │
│  删除 PptxGenJS 4.0.1 的重复 a:pPr；冲突时抛 ValueError    │
└───────────────────────────┬───────────────────────────────┘
                            │
        ┌───────────────────┼────────────────────┐
        v                   v                    v
 ┌────────────────┐  ┌────────────────┐  ┌──────────────────────┐
 │ 程序化 QA      │  │ 视觉 QA        │  │ 回归测试              │
 │ qa_check.py    │  │ render_        │  │ examples/qa-selftest/ │
 │ 9 类检查       │  │ powerpoint.ps1 │  │ test_qa*.py           │
 │ --academic     │  │ （可选、离线） │  │ bad_deck.pptx（负向） │
 └───────┬────────┘  └───────┬────────┘  └──────────┬───────────┘
         └───────────────────┴──────────────────────┘
                             v
      .github/workflows/quality.yml（push/PR） + scripts/verify.sh（本地）
```

### 2.1 模块职责

| 模块 | 文件 | 职责 |
|---|---|---|
| 技能入口 | `skills/lyceum/SKILL.md` | 场景路由表、两条铁律（原生可编辑 / 原文件只读）、5 步工作流、中文字体规则、双 QA 闸门、交付约定 |
| 视觉索引 | `skills/lyceum/references/theme-index.md` | 19 套主题的色值与标志图形、选择优先级、跨场景组合、提示词模板与验收清单 |
| 共享契约 | `skills/lyceum/references/academic-blue.md` | 所有主题共用的网格、字体、密度与图示规划；学术蓝白作为兜底配色 |
| 场景剧本 | `skills/lyceum/references/{group-meeting,conference,progress,defense,proposal,paper-reading}.md` | 各自页面顺序、研究结构、时长与常见误区 |
| 构建脚本 | `examples/group-meeting-demo/build_demo.js` | 用 pptxgenjs 生成 9 页示例，保留原生文本框/图表/表格/形状 |
| 兼容归一化 | `skills/lyceum/scripts/normalize_pptx.py` | 删除新生成文件中完全相同的重复 `a:pPr`，保留其它包成员；冲突则拒绝修改 |
| 程序化 QA | `skills/lyceum/scripts/qa_check.py` | 溢出、越界、重叠、占位符、字体、可编辑性、画布、几何/XML、学术密度提示 |
| 视觉 QA | `skills/lyceum/scripts/render_powerpoint.ps1` | Windows 只读打开并逐页导出 1440×810 预览，打开/导出失败即报错 |
| 负向夹具 | `examples/qa-selftest/bad_deck.pptx` / `build_bad_deck.js` | 故意植入 7 类缺陷，证明 QA 检查确实生效 |
| 回归测试 | `examples/qa-selftest/test_qa.py` | 密度、原生图示、XML 兼容性与负向夹具的行为回归 |
| 一键校验 | `scripts/verify.sh` | 串联语法检查、单元测试、构建与 QA |
| Python 启动器 | `scripts/py.js` | npm 脚本跨平台读取 `PYTHON`（可含参数，如 `py -3.12`）并派生子进程 |
| CI | `.github/workflows/quality.yml` | push/PR 时 `npm test` → `npm run build` → `npm run qa`，并上传 PPTX 产物 |

---

## 3. 数据模型与契约

### 3.1 设计常量（来源：`qa_check.py`）

| 常量 / 阈值 | 值 | 代码位置 / 含义 |
|---|---|---|
| `EMU_PER_IN` | `914400.0` | `qa_check.py:43` |
| `EMU_PER_PT` | `12700.0` | `qa_check.py:44` |
| `CANONVAS_IN` | `(13.333, 7.5)` | `qa_check.py:45`，LAYOUT_WIDE 设计画布（源码拼写为 `CANONVAS`） |
| 画布偏差容忍 | `0.05 in` | `main()`：超出报 INFO `canvas`，不判错 |
| 越界容忍 | `18000 EMU`（约 0.02 in） | `check_slide()`：超出报 WARNING `offcanvas` |
| 溢出告警 | `est_h > box_h × 1.12` | 进一步 `ratio > 1.35` 升级为 ERROR |
| 文本框重叠 | `交叠面积 / 较小框面积 > 0.20` | `check_slide()`：报 WARNING `overlap` |
| 字号下限 | `12 pt` | `check_slide()`：低于报 WARNING `fontsize` |
| 整页图片判定 | 图片面积占比 `> 0.80` 且原生字符 `< 12` | 报 ERROR `editability` |
| 稀疏页判定 | 正文区字符 `< 80` 且无 exhibit | `--academic` 下报 WARNING `density` |
| 图示候选 | `connectors ≥ 1` 且 `nodes ≥ 3` | `academic_metrics()`，形状面积 0.1–30 in² 计为节点 |

`academic_metrics()` 的正文带限定为 `1.45 ≤ top/EMU_PER_IN < 6.95`，避免长标题/页脚掩盖空页；可通过备注中的 `Lyceum role: cover|agenda|divider|references|discussion|closing` 豁免密度检查。

### 3.2 Issue 契约

| level | 图标 | 含义 | 对退出码的影响 |
|---|---|---|---|
| `ERROR` | `✗` | 高置信缺陷（占位符、负几何、重复/非法 XML、严重溢出、整页图片） | 返回 1 |
| `WARNING` | `△` | 需人工复核（越界、轻溢出、重叠、字号、字体名、密度/图示） | 无 ERROR 时返回 2 |
| `INFO` | `·` | 提示（如画布偏差） | 仅 `--info` 显示，返回 0 |

每条 Issue 含 `level`、`kind`、`slide`、`detail` 四个字段；`--json` 下以 `vars(issue)` 直接序列化。

### 3.3 内容与主题契约

- **6 种场景**：组会 / 会议 / 进展 / 答辩 / 开题 / 文献分享；各自模板决定页数（如组会 8–20 页、答辩 20–40 页）。
- **19 套主题**：分 7 组（兜底 1 + 6 场景各 3）；主题名可在中文或英文中点名，点名后整套页面统一使用，不得回落。
- **选择优先级**：院校模板/参考图 > 明确点名的主题 > 用户说「默认/随便」时用学术蓝白 > 都没说则**只问一次**。
- **原生可编辑铁律**：文本=文本框；图表=原生图表（右键 Edit Data）；示意图=可重标形状+连线；表格=`addTable`；复杂公式若用图片须在备注写 `Equation source: ...`；图表数值写入同页备注。
- **诚实性**：数值带单位与基线，估算标 `est./示意`，负结果不隐藏，图表坐标轴不从 0 起时需注明。

---

## 4. 接口设计

### 4.1 CLI：`skills/lyceum/scripts/qa_check.py`

```bash
python skills/lyceum/scripts/qa_check.py <deck.pptx> [--json] [--info] [--academic]
```

| 参数 | 含义 | 默认 |
|---|---|---|
| `deck` | 待检查的 `.pptx` 路径 | 必填 |
| `--json` | 输出结构化 JSON 而非人类可读报告 | 关闭 |
| `--info` | 同时显示 INFO 级提示 | 关闭 |
| `--academic` | 追加 `content_metrics` 与密度/图示提示 | 关闭 |

退出码：`0` 干净 · `1` 存在 ERROR · `2` 仅 WARNING · `3` 文件无法打开（`--json` 时输出 `{"error": "..."}`）。
注意：参数缺失由 `argparse` 处理，实际退出码为 `2`，与文件头注释「3 usage/input error」不一致，详见「假设与待确认」。

`--json` 输出结构：

```json
{
  "deck": "examples/group-meeting-demo/group-meeting-demo.pptx",
  "slides": 9,
  "canvas_in": [13.33, 7.5],
  "errors":   [{"level": "ERROR", "kind": "placeholder", "slide": 1, "detail": "..."}],
  "warnings": [{"level": "WARNING", "kind": "offcanvas", "slide": 2, "detail": "..."}],
  "infos":    [],
  "content_metrics": [
    {"slide": 1, "role": "content", "body_chars": 123, "charts": 1,
     "tables": 0, "pictures": 0, "diagram_candidate": false}
  ]
}
```

`content_metrics` 仅在 `--academic` 时出现。

### 4.2 Python API：`qa_check.py`

| 函数 | 输入 → 输出 | 职责 |
|---|---|---|
| `_char_width(ch)` | 单字符 → 0.30/0.52/0.62/0.85/1.0 | CJK/全角宽 1.0；窄标点与空格 0.30；`mwMW@` 0.85；数字与大写 0.62；其余 0.52 |
| `_run_font_pt(run, default_pt)` | run → 字号（pt） | 读取显式字号，异常或缺失时回落默认值 |
| `_is_cjk(text)` | 文本 → bool | 含 CJK 统一表意文字时用于选择 1.35 行高系数（否则 1.22） |
| `Issue(level, kind, slide, detail)` | 四字段 → 可打印对象 | 统一缺陷表示，`__str__` 映射 level 到 `✗/△/·` 图标 |
| `iter_frames(shapes)` | shapes → 生成器 | 递归进入 GROUP（`shape_type == 6`），产出带文本帧的形状 |
| `iter_shapes(shapes)` | shapes → 生成器 | 递归产出所有形状，**不**应用 group 坐标变换（源码注释明确） |
| `academic_metrics(slide, idx, issues)` | slide → 指标字典，并向 `issues` 追加提示 | 统计正文字符/图表/表格/图片/连线/节点，生成 density/exhibit 提示 |
| `estimate_frame(shape, default_pt=18)` | 文本形状 → 几何估算字典 | 逐段估算行高、行数、最长不可断词、字号范围，供溢出判定 |
| `check_slide(idx, slide, issues, canvas_in)` | slide → 就地追加 `issues` | 执行几何、XML、占位符、溢出、字体、重叠、可编辑性检查 |
| `main()` | CLI 参数 → 退出码 | 加载文件、遍历 slides、汇总并输出报告 |

### 4.3 Python API：`normalize_pptx.py`

| 函数 | 输入 → 输出 | 职责 |
|---|---|---|
| `normalize(path)` | `.pptx` 路径 → 删除的重复属性数（int） | 仅处理 `ppt/slides/slide\d+\.xml`；首个子元素必须是 `a:pPr` 且所有重复项完全相同才删除；冲突抛 `ValueError`，文件字节不变；无改动返回 0 |

### 4.4 构建与校验脚本

| 命令 | 作用 |
|---|---|
| `npm ci` | 按 lockfile 安装 pptxgenjs 4.0.1（`image-size` 覆盖为 2.0.4） |
| `npm run build` | 生成 `examples/group-meeting-demo/group-meeting-demo.pptx` |
| `node examples/group-meeting-demo/build_demo.js <output.pptx>` | 生成到自定义路径 |
| `python skills/lyceum/scripts/normalize_pptx.py <deck.pptx>` | 归一化重复段落属性 |
| `npm run qa` | 对示例 deck 运行 `qa_check.py --academic` |
| `npm test` | 经 `scripts/py.js` 运行 `unittest discover -s examples/qa-selftest -p test_*.py -v` |
| `bash scripts/verify.sh` | 本地一键：Python 编译 → 单元测试 → Node 构建 → QA（支持 `PYTHON` 覆盖） |

### 4.5 技能接口：`SKILL.md`

| 接口 | 说明 |
|---|---|
| `name: lyceum` | 技能标识；`description` 覆盖六类中文触发词，兼容原名安装路径 |
| Step 1 路由 | 场景表给出触发词/时长/页数/参考文件；视觉风格表给出「点名→使用、模板→覆盖、默认→学术蓝白、没说→问一次」 |
| Workflow 1–5 | Route → Collect content → Plan outline → Build → QA（双闸门） |
| Delivery | 输出一个绝对路径 `.pptx` + 3–5 行摘要（场景、主题、页数、待补占位符）；原文件保持不动 |

`examples/qa-selftest/export_png.ps1` 与 `skills/lyceum/scripts/render_powerpoint.ps1` 是 Windows 侧的辅助渲染接口，不属于 Python 自动化链。

---

## 5. 数据流

### 5.1 生成流

```text
用户请求（场景 + 主题 + 材料）
  → SKILL.md Step 1：路由场景 / 解析主题 / 读共享契约
  → Collect：识别材料，列缺口；缺失结果 → 【待补充：xxx】
  → Plan：逐页写研究任务、动作标题、3–5 信息单元、主图、来源、解读
  → Build：build_demo.js（pptxgenjs，LAYOUT_WIDE）→ .pptx
  → normalize_pptx.py：删除重复 a:pPr（冲突报错）
  → QA 闸门 1：qa_check.py（ERROR 必改，WARNING 逐条复核）
  → QA 闸门 2：渲染 → 逐页视觉检查 + ghost deck test
  → Delivery：新文件 + 摘要；原文件不动
```

### 5.2 程序化 QA 流（`qa_check.py main()`）

```text
解析 CLI 参数
  → Presentation(deck) 失败 → --json 输出 {"error": ...} / 文本写 stderr → return 3
  → canvas_in = (slide_width, slide_height) / EMU_PER_IN
  → 画布偏差 > 0.05in → INFO canvas（slide=0）
  → for slide in prs.slides:
        check_slide(idx, slide, issues, canvas_in)
          ├─ 遍历全部形状（含组内）：负宽高 → ERROR geometry
          ├─ 查找重复 a:pPr → ERROR xml
          ├─ 查找非法 tcPr@anchor → ERROR xml
          ├─ 顶层形状越界（±18000 EMU）→ WARNING offcanvas
          ├─ 图片面积累计（shape_type == 13）
          ├─ 遍历文本帧：占位符 → ERROR placeholder
          │              estimate_frame → 溢出 / 断词 / 字号 / 字体名
          ├─ 文本框两两相交 > 20% → WARNING overlap
          └─ 图片占比 > 0.80 且原生字符 < 12 → ERROR editability
        if --academic: academic_metrics → density / exhibit 提示
  → 按 ERROR / WARNING / INFO 分组
  → --json：结构化输出；否则：逐行打印 + 汇总 + 指标
  → return 1 if errors else (2 if warns else 0)
```

### 5.3 归一化流（`normalize_pptx.py`）

```text
normalize(path)
  → 打开 ZipFile，逐成员匹配 ppt/slides/slide\d+\.xml
  → 每个 a:p：若 a:pPr 数量 > 1
        ├─ 首个 pPr 不是第一个子元素 → ValueError
        ├─ 任一后续 pPr 与首个序列化结果不同 → ValueError
        └─ 删除后续 pPr，累计 removed
  → 无改动 → return 0
  → 有改动 → 写同目录临时文件（避免 Windows 句柄占用）→ replace(path) → return removed
```

### 5.4 校验流

```text
scripts/verify.sh
  → py_compile：qa_check.py / normalize_pptx.py 语法检查
  → npm test：unittest 发现并执行 examples/qa-selftest/test_*.py
  → npm run build：重建示例 deck（需 node_modules）
  → npm run qa：重建后的 deck 过 QA 闸门

CI（quality.yml）
  → npm ci → pip install -r requirements-qa.txt
  → npm test → npm run build → npm run qa
  → upload-artifact：group-meeting-demo.pptx
```

---

## 6. 边界与异常场景

| # | 场景 | 处理策略 |
|---|---|---|
| 1 | 请求未点名主题 | 先问一次并给出 2–3 个候选/风格分组，含「默认学术蓝白」；不得静默回落 |
| 2 | 用户材料缺关键事实（结果/方法/作者） | 列出缺口；交互时问一次，自动时生成 `【待补充：xxx】` 占位页；禁止编造 |
| 3 | 用户提供已有 `.pptx` | 只读；交付写到 `<stem>_updated.pptx`；仅在明确要求原地编辑时先备份 `<stem>_backup.pptx` |
| 4 | 未安装 python-pptx | `qa_check.py` 捕获 ImportError，打印安装提示并退出 3 |
| 5 | deck 路径不存在 / 文件损坏 / 非 pptx | `Presentation()` 抛异常 → `--json` 输出 `{"error": ...}`，否则 stderr 提示，退出 3 |
| 6 | 缺少必填参数 | `argparse` 报错并退出 2（与文件头注释「3」不一致，见第 9 节） |
| 7 | 画布不是 13.333×7.5 in | 报 INFO `canvas`，仅 `--info` 显示；字号规则仍按该画布假设，不判 ERROR |
| 8 | 形状负宽 / 负高 | ERROR `geometry`（PowerPoint 拒绝打开此类 DrawingML） |
| 9 | 段落含重复 `a:pPr` | QA 报 ERROR `xml`；`normalize_pptx.py` 对完全相同的重复项自动修复 |
| 10 | 重复 `a:pPr` 内容冲突 / 首个 pPr 不在首位 | `normalize()` 抛 `ValueError`，文件保持原样，不猜测格式 |
| 11 | 表格 `tcPr@anchor="mid"` | ERROR `xml`；PptxGenJS 表格应使用 `valign: "middle"` |
| 12 | 形状越过画布边界 | ≤ 18000 EMU 容忍；超出报 WARNING `offcanvas` |
| 13 | 文本估算高度超框 | > 1.12 倍报 WARNING，> 1.35 倍报 ERROR `overflow` |
| 14 | `word_wrap=False` 但文本宽于框 | WARNING `overflow`（`max_line_fill > 1.05`） |
| 15 | 单个不可断词接近框宽 | WARNING `overflow`（`longest_word_pt > box_w × 0.98`） |
| 16 | 字号 < 12 pt | WARNING `fontsize`（负向夹具中的 10 pt 能被捕获） |
| 17 | 文本 run 未显式设置字体名 | WARNING `font`；跨机器会替换为系统字体 |
| 18 | 残留 `TODO/FIXME/lorem/xxx/【待补充/【占位/placeholder` | ERROR `placeholder`，交付前必须清除 |
| 19 | 两个非空文本框交叠 > 20% | WARNING `overlap` |
| 20 | 近似满版图片且原生字符 < 12 | ERROR `editability`（疑似整页截图，不可编辑） |
| 21 | `--academic` 下正文 < 80 字符且无图示 | WARNING `density`，建议合并或补充有来源的解释 |
| 22 | `--academic` 下无任何 exhibit | WARNING `exhibit`；图示候选只按形状/连线数量推断，不代表科学意义 |
| 23 | 纯横线分隔符 | 不计入 `connectors`；需 `connectors ≥ 1` 且 `nodes ≥ 3` 才算图示候选 |
| 24 | `Lyceum role: cover/agenda/...` | 封面/目录/分隔/参考/讨论/封底页豁免 density 与 exhibit 提示 |
| 25 | GROUP 内形状 | `iter_frames`/`iter_shapes` 递归检查；注释明确不套用 group 坐标变换，越界判断只基于顶层形状 |
| 26 | 复杂公式用图片 | 允许，但必须在同页备注写 `Equation source: ...`；此为人工约定，QA 不自动校验 |
| 27 | Windows 上文件被占用 | `normalize()` 通过同目录临时文件 + `replace()` 规避句柄占用；异常时清理临时文件 |
| 28 | 视觉渲染检查 | 依赖 Windows PowerPoint 或 LibreOffice，无法在纯离线 CI 中可靠执行；相关测试加跳过标记并说明原因 |

---

## 7. 质量红线与约定

- **原文件神圣**：用户提供的 deck 与材料默认只读；备份只放同目录，不放 `/tmp`。
- **不编造**：虚构实验数值必须在页脚/备注标注；示例 `group-meeting-demo` 的全部数值与曲线均为演示数据。
- **诚实坐标**：图表注明单位与非零起点；颜色稳定映射到命名的阶段/系列；单系列不放图例。
- **重复版式视为缺陷**：不同页面应承担不同研究任务与构图；验收时至少出现 4 种明显不同的页面构图。
- **QA 是启发式**：ERROR 必改、WARNING 逐条复核；程序化检查不能替代逐页视觉检查与 ghost deck test。

---

## 8. 测试策略

| 层次 | 文件 | 覆盖 |
|---|---|---|
| 行为回归（已有） | `examples/qa-selftest/test_qa.py` | 13 项：密度/图示 8 项 + XML 兼容 5 项 + 原始负向夹具 |
| 核心逻辑单测（新增） | `examples/qa-selftest/test_qa_core.py` | `_char_width` / `_is_cjk` / `Issue` / `estimate_frame` / `check_slide` 的正常值与阈值边界 |
| CLI 集成（新增） | `examples/qa-selftest/test_qa_cli.py` | `main()` 的 0/1/2/3 退出码、`--json` 结构、损坏文件与缺字段、干净/告警/错误样例 |
| 一键校验（新增） | `scripts/verify.sh` | Python 语法编译 → 单元测试 → Node 构建 → QA |
| CI | `.github/workflows/quality.yml` | push/PR 自动运行 `npm test` → `npm run build` → `npm run qa`，并保存 PPTX 产物 |

所有新增测试**离线**运行：只使用 `python-pptx` 在内存中构造样例，不访问网络、不调用模型、不需要真实 Office。
需要 PowerPoint/LibreOffice 的渲染检查不在自动化范围内；对应用例显式加 `@unittest.skip` 并注明原因。
运行方式：`bash scripts/verify.sh`，或单独 `npm test`。

---

## 9. 假设与待确认

以下内容无法仅凭仓库内文件确认，标注为假设或待确认，部署/交付前请人工复核：

1. **`scripts/qa_check.py` 的路径口径**：任务描述中的 `scripts/qa_check.py` 在仓库中实际位于 `skills/lyceum/scripts/qa_check.py`（`SKILL.md` 的 QA 步骤以技能目录为相对路径）。本文按实际路径描述；是否在仓库根增加 `scripts/` 别名待确认。
2. **退出码文档不一致**：`qa_check.py` 文件头写「3 usage/input error」，但 `argparse` 在缺参数时返回 2，只有 `Presentation()` 打开失败返回 3。本文按实测行为记录；是否统一文档待确认。
3. **`CANONVAS_IN` 拼写**：源码常量拼写为 `CANONVAS`（非 `CANVAS`），本文沿用源码拼写以免误导检索；是否重命名为待确认。
4. **`PYTHON` 环境变量的取值约定**：两份 README 原写「Set PYTHON to a different Python interpreter if needed」，但 `package.json` 的 `qa`/`test` 脚本此前未读取该变量。本次通过 `scripts/py.js` 与 `build_demo.js` 使其真正生效，并约定取值可含参数（如 `py -3.12`）。该约定是否与外部调用方的既有设置冲突，待确认。
5. **CI 未执行视觉渲染**：`quality.yml` 只跑 `npm test` / `build` / `qa`，不调用 `render_powerpoint.ps1`；视觉复核仍是人工步骤。是否在 CI 增加 LibreOffice 渲染待确认。
6. **示例数值来源**：`group-meeting-demo` 的数值与曲线在 README 中明确为虚构演示；其它示例（主题预览使用 Yu et al., ICRA 2023 的 Fig. 4/5）按 README 引用，本文未独立核验原始论文数值。
7. **画布取整**：`--json` 中 `canvas_in` 经 `round(..., 2)` 输出为 `[13.33, 7.5]`，而设计常量是 `13.333`；该差异来自显示取整，不影响检查逻辑。
8. **主题/场景数量**：6 场景、19 主题来自 README 与 `theme-index.md` 的清单；未逐张核对 19 个 PNG 的视觉内容。
