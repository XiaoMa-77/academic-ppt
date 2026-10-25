// Lyceum example — 组会汇报 demo deck v2
// Scenario: group-meeting · Theme: 研纸墨蓝 (upgraded design system)
// Run:  npm i pptxgenjs && node build_demo.js
// All research content below is fictional demo data.
const pptxgen = require("pptxgenjs");

const p = new pptxgen();
p.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 in
p.author = "Lyceum demo";
p.title = "组会汇报示例 · 对比学习小样本分类";

// ---- Design tokens (references/group-meeting.md · 研纸墨蓝) ----
// Paper-toned content background + white cards + deep-ink cover + stepped chart ramp
const BG = "F8F7F3";      // warm paper — content page background (never flat white)
const SURFACE = "FFFFFF"; // card surface on BG
const INK = "1D3557";     // deep ink navy — titles, table headers, dark pages
const P_MID = "457B9D";   // mid step of ink ramp — secondary bars, sub-structure
const P_SOFT = "E3EAF2";  // soft tint — panel fills, zebra rows
const ACCENT = "E07A5F";  // terracotta — the single highlight color
const TEXT = "2B2D33";
const MUTED = "8A8D94";
const LINE = "DFDBD2";    // warm hairline
const OK = "2F7D4F", WARN = "B0762B", FAIL = "B04A3A";

const ZH = "微软雅黑";     // CJK runs
const EN = "Segoe UI";     // Latin/numeric runs — crisper glyphs than CJK faces

const W = 13.33, H = 7.5, M = 0.5;

// mixed CJK+Latin runs helper: split text so digits/Latin render in EN face
const zhRuns = (parts, opts = {}) => parts.map((t, i) => ({
  text: t.t, options: { fontFace: t.en ? EN : ZH, ...(t.o || {}), ...(i < parts.length - 1 ? { breakLine: false } : {}) },
}));

const footer = (s, idx, total) => {
  s.addText("10-26 组会", { x: M, y: 7.08, w: 2, h: 0.3, fontSize: 12, color: MUTED, fontFace: ZH, margin: 0 });
  s.addText([{ text: `${idx}`, options: { fontFace: EN } }, { text: ` / ${total}`, options: { fontFace: EN, color: MUTED } }],
    { x: W - 1.6, y: 7.08, w: 1.1, h: 0.3, fontSize: 12, color: MUTED, align: "right", margin: 0 });
};
const tag = (s, label) => {
  s.addShape(p.shapes.RECTANGLE, { x: 11.62, y: 0.47, w: 0.09, h: 0.22, fill: { color: ACCENT } });
  s.addText(label, { x: 11.78, y: 0.41, w: 1.05, h: 0.34, fontSize: 12, color: MUTED, charSpacing: 3, fontFace: ZH, margin: 0, align: "left" });
};
const title = (s, runs) => s.addText(runs.map(r => ({ text: r.t, options: { fontFace: r.en ? EN : ZH } })),
  { x: M, y: 0.3, w: 10.9, h: 0.6, fontSize: 25, bold: true, color: INK, fontFace: ZH, margin: 0, charSpacing: 0.5 });
const sub = (s, t) => s.addText(t, { x: M, y: 0.92, w: 12.3, h: 0.3, fontSize: 13, color: MUTED, fontFace: ZH, margin: 0 });
const bu = () => ({ code: "25B8", indent: 12 });
const shadow = () => ({ type: "outer", color: "1D3557", blur: 7, offset: 2, angle: 90, opacity: 0.10 });

// ---- 1 · 封面 (deep ink page) ----
let s = p.addSlide(); s.background = { color: INK };
s.addText("第 12 周组会 · 进展汇报", { x: M, y: 0.85, w: 8, h: 0.4, fontSize: 15, color: ACCENT, fontFace: ZH, charSpacing: 2, margin: 0 });
s.addText("面向小样本场景的\n对比学习图像分类", { x: M, y: 1.75, w: 10.5, h: 2.3, fontSize: 40, bold: true, color: "F8F7F3", fontFace: ZH, margin: 0, lineSpacingMultiple: 1.2, charSpacing: 1 });
s.addShape(p.shapes.LINE, { x: M + 0.02, y: 4.45, w: 1.6, h: 0, line: { color: ACCENT, width: 2.5 } });
s.addText([
  { text: "汇报人  张三（硕二）", options: { breakLine: true } },
  { text: "导师    李四 教授 · CV 组", options: { breakLine: true } },
  { text: "2026-10-26", options: { fontFace: EN } },
], { x: M, y: 4.85, w: 6, h: 1.4, fontSize: 17, color: "C9D3DE", fontFace: ZH, margin: 0, paraSpaceAfter: 8 });
// cover card: week index
s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 10.7, y: 4.7, w: 2.1, h: 1.6, rectRadius: 0.08, fill: { color: "26456B" } });
s.addText([{ text: "W", options: { fontFace: EN, color: ACCENT, fontSize: 16, bold: true } }, { text: "EEK", options: { fontFace: EN, color: "8FA3BA", fontSize: 12, charSpacing: 2 } }],
  { x: 10.95, y: 4.92, w: 1.7, h: 0.35, margin: 0 });
s.addText("12", { x: 10.95, y: 5.28, w: 1.7, h: 0.9, fontSize: 52, bold: true, color: "F8F7F3", fontFace: EN, margin: 0 });

// ---- 2 · 上期回顾 ----
s = p.addSlide(); s.background = { color: BG };
title(s, [{ t: "上期回顾：3 项计划，2 项完成" }]);
tag(s, "回 顾"); footer(s, 2, 9);
[
  ["复现 SimCLR 基线（CIFAR-FS，5-way 1-shot）", "✅ 完成", "1-shot 52.8%，与论文 52.6% 对齐（±0.2）", OK],
  ["三组数据增强策略对比实验", "⚠️ 部分", "RandAugment 组完成；Mixup 组因显存不足未跑", WARN],
  ["温度参数 τ 消融（0.1–1.0）", "❌ 未做", "GPU 队列排队至周四，已预约本周一全天", FAIL],
].forEach(([plan, st, note, c], i) => {
  const y = 1.32, rh = 1.42, gap = 0.22, cy = y + i * (rh + gap);
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y: cy, w: 12.33, h: rh, rectRadius: 0.05, fill: { color: SURFACE }, shadow: shadow() });
  s.addText(`${i + 1}`, { x: M + 0.25, y: cy + 0.33, w: 0.75, h: 0.8, fontSize: 34, bold: true, color: P_SOFT, fontFace: EN, margin: 0 });
  s.addText(plan, { x: 1.65, y: cy + 0.22, w: 7.0, h: 0.55, fontSize: 17, bold: true, color: TEXT, fontFace: ZH, margin: 0 });
  s.addText(note, { x: 1.65, y: cy + 0.82, w: 8.6, h: 0.45, fontSize: 13, color: MUTED, fontFace: ZH, margin: 0 });
  s.addText(st, { x: 10.6, y: cy + 0.5, w: 1.9, h: 0.45, fontSize: 17, bold: true, color: c, fontFace: ZH, align: "right", margin: 0 });
});

// ---- 3 · 本期概览 ----
s = p.addSlide(); s.background = { color: BG };
title(s, [{ t: "本期概览：增强策略选型基本落定，训练稳定性问题待解" }]);
tag(s, "概 览"); footer(s, 3, 9);
[
  ["01", "RandAugment 在 1-shot 上比基线高 3.1 个点，5-shot 下优势缩小至 0.8", "第 4 页", P_MID],
  ["02", "投影头维度消融：256 维已饱和，算力可省一半", "第 5 页", P_MID],
  ["03", "新问题：Mixup 训练 loss 震荡，尚无结论，本周求助", "第 6 页", ACCENT],
].forEach(([n, t, pg, c], i) => {
  const y = 1.42 + i * 1.72;
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y, w: 12.33, h: 1.45, rectRadius: 0.05, fill: { color: SURFACE }, shadow: shadow() });
  s.addShape(p.shapes.RECTANGLE, { x: M, y: y + 0.28, w: 0.07, h: 0.9, fill: { color: c } });
  s.addText(n, { x: 0.85, y: y + 0.3, w: 1.1, h: 0.85, fontSize: 38, bold: true, color: c, fontFace: EN, margin: 0 });
  s.addText(t, { x: 2.1, y: y + 0.24, w: 9.4, h: 0.95, fontSize: 18, color: TEXT, fontFace: ZH, margin: 0, valign: "middle" });
  s.addText(pg, { x: 11.6, y: y + 0.55, w: 1.0, h: 0.35, fontSize: 12, color: MUTED, fontFace: ZH, align: "right", margin: 0 });
});

// ---- 4 · 进展详情 1：增强策略对比（原生图表 + 色阶序列） ----
s = p.addSlide(); s.background = { color: BG };
title(s, [{ t: "增强策略对比：RandAugment 1-shot 提升 " }, { t: "3.1", en: true }, { t: " 个点" }]);
sub(s, "设置：CIFAR-FS · ResNet-12 · 200 epoch · n=3 seeds 取均值");
tag(s, "进 展"); footer(s, 4, 9);
s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y: 1.3, w: 7.7, h: 5.05, rectRadius: 0.06, fill: { color: SURFACE }, shadow: shadow() });
s.addChart(p.charts.BAR, [{
  name: "1-shot Acc (%)",
  labels: ["SimCLR基线", "RandAugment", "Cutout", "ColorJitter"],
  values: [52.8, 55.9, 53.4, 52.1],
}], {
  x: 0.75, y: 1.55, w: 7.2, h: 4.6, barDir: "col",
  chartColors: [P_MID, INK, P_MID, "9DB4C8"], // stepped ink ramp, winner darkest
  chartArea: { fill: { color: SURFACE } },
  catAxisLabelColor: "6A6E75", catAxisLabelFontSize: 13, catAxisLabelFontFace: ZH,
  valAxisLabelColor: "9DA1A8", valAxisLabelFontSize: 11, valAxisMinVal: 50, valAxisMaxVal: 58, valAxisLabelFormatCode: "0", valAxisLabelFontFace: EN,
  valGridLine: { color: "EDEAE3", size: 0.5 }, catGridLine: { style: "none" },
  showValue: true, dataLabelPosition: "outEnd", dataLabelColor: "4A4E55", dataLabelFontSize: 13, dataLabelFontFace: EN, dataLabelFormatCode: "0.0",
  showLegend: false, valAxisTitle: "1-shot 准确率 (%)", showValAxisTitle: true, valAxisTitleFontSize: 12, valAxisTitleColor: "6A6E75",
});
// right rail: hero number + verdicts
s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 8.5, y: 1.3, w: 4.33, h: 5.05, rectRadius: 0.06, fill: { color: INK }, shadow: shadow() });
s.addText("RandAugment · 1-shot", { x: 8.85, y: 1.62, w: 3.7, h: 0.35, fontSize: 13, color: "8FA3BA", fontFace: ZH, charSpacing: 1, margin: 0 });
s.addText("55.9%", { x: 8.85, y: 2.0, w: 3.7, h: 1.15, fontSize: 64, bold: true, color: "F8F7F3", fontFace: EN, margin: 0 });
s.addText([{ text: "+3.1pt", options: { fontFace: EN, bold: true, color: ACCENT, fontSize: 18 } }, { text: "  vs 基线 (p<0.01)", options: { fontFace: ZH, color: "C9D3DE", fontSize: 14 } }],
  { x: 8.85, y: 3.25, w: 3.7, h: 0.4, margin: 0 });
s.addText([
  { text: "5-shot 下仅 +0.8pt，增益集中在低样本区", options: { bullet: bu(), breakLine: true } },
  { text: "判断：1-shot 场景选 RandAugment，后续实验默认开启", options: { bullet: bu(), breakLine: true } },
  { text: "Cutout/ColorJitter 单独使用无显著增益", options: { bullet: bu() } },
], { x: 8.85, y: 3.85, w: 3.75, h: 2.3, fontSize: 14, color: "E6EBF1", fontFace: ZH, margin: 0, paraSpaceAfter: 9, valign: "top" });
s.addText("数据来源：本周实验，n=3 seeds，误差见附录 A · 纵轴自 50% 起", { x: M, y: 6.55, w: 8, h: 0.3, fontSize: 12, color: MUTED, fontFace: ZH, margin: 0 });

// ---- 5 · 进展详情 2：投影头消融（原生表格） ----
s = p.addSlide(); s.background = { color: BG };
title(s, [{ t: "投影头消融：256 维已饱和，无需加宽" }]);
sub(s, "设置：RandAugment 固定 · 只变投影头输出维度");
tag(s, "进 展"); footer(s, 5, 9);
const th = (t) => ({ text: t, options: { fill: { color: INK }, color: "F5F7FA", bold: true, fontFace: ZH } });
const td = (t, o = {}) => ({ text: t, options: { fontFace: o.zh ? ZH : EN, color: TEXT, ...o } });
s.addTable([
  [th("投影头维度"), th("1-shot (%)"), th("5-shot (%)"), th("训练时长 (h)"), th("结论")],
  [td("128"), td("54.6"), td("71.2"), td("3.1"), td("欠饱和", { zh: true })],
  [td("256", { bold: true }), td("55.9", { bold: true, color: ACCENT }), td("72.0", { bold: true }), td("4.2"), td("推荐", { zh: true, bold: true, color: ACCENT })],
  [td("512"), td("55.7"), td("71.9"), td("6.5"), td("饱和，算力浪费", { zh: true })],
  [td("1024"), td("55.8"), td("72.1"), td("10.9"), td("收益≈0", { zh: true })],
], {
  x: M, y: 1.45, w: 9.2, h: 3.3, colW: [2.2, 1.7, 1.7, 1.9, 1.7],
  fontSize: 15, align: "center", valign: "middle",
  border: { pt: 0.5, color: "E5E1D8" }, fill: { color: SURFACE }, rowH: 0.62,
});
s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 10.05, y: 1.45, w: 2.78, h: 3.3, rectRadius: 0.06, fill: { color: P_SOFT } });
s.addText("决策", { x: 10.35, y: 1.75, w: 2.2, h: 0.35, fontSize: 13, bold: true, color: P_MID, fontFace: ZH, charSpacing: 2, margin: 0 });
s.addText("固定 256 维：精度饱和后时长翻倍，无收益", { x: 10.35, y: 2.2, w: 2.25, h: 2.3, fontSize: 15, color: INK, fontFace: ZH, margin: 0, lineSpacingMultiple: 1.3, valign: "top" });
s.addText([
  { text: "后续全部实验固定 256 维，单卡可并行两组", options: { bullet: bu(), breakLine: true } },
  { text: "5-shot 曲线同样在 256 处饱和（71.2→72.0→71.9）", options: { bullet: bu() } },
], { x: M, y: 5.15, w: 9.2, h: 1.1, fontSize: 16, color: TEXT, fontFace: ZH, margin: 0, paraSpaceAfter: 8 });
s.addText("数据来源：本周实验 · 附录 A 有完整 5 次重复", { x: M, y: 6.55, w: 8, h: 0.3, fontSize: 12, color: MUTED, fontFace: ZH, margin: 0 });

// ---- 6 · 问题与分析（灵魂页 2x2） ----
s = p.addSlide(); s.background = { color: BG };
title(s, [{ t: "问题：Mixup 训练 loss 剧烈震荡（未解决）" }]);
tag(s, "问 题"); footer(s, 6, 9);
const blk = (x, y, w2, h2, head, body) => {
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x, y, w: w2, h: h2, rectRadius: 0.06, fill: { color: SURFACE }, shadow: shadow() });
  s.addText(head, { x: x + 0.3, y: y + 0.22, w: w2 - 0.6, h: 0.38, fontSize: 15, bold: true, color: P_MID, fontFace: ZH, charSpacing: 1.5, margin: 0 });
  s.addText(body, { x: x + 0.3, y: y + 0.68, w: w2 - 0.6, h: h2 - 0.85, fontSize: 14, color: TEXT, fontFace: ZH, margin: 0, valign: "top", paraSpaceAfter: 7 });
};
blk(M, 1.28, 6.02, 2.62, "现 象", [
  { text: "开启 Mixup(α=0.2) 后 loss 每 20–30 epoch 出现尖峰（幅度 ~0.4）", options: { bullet: bu(), breakLine: true } },
  { text: "1-shot 精度反而降 1.2pt；5-shot 基本不变", options: { bullet: bu() } },
]);
blk(6.81, 1.28, 6.02, 2.62, "已 排 除", [
  { text: "✗ 学习率过大：τ 消融同 LR 下无震荡", options: { bullet: bu(), breakLine: true } },
  { text: "✗ 数据管道错乱：已核对 shuffle 种子与标签", options: { bullet: bu(), breakLine: true } },
  { text: "✗ 显存溢出降级：OOM 计数为 0", options: { bullet: bu() } },
]);
blk(M, 4.12, 6.02, 2.62, "当 前 假 设", [
  { text: "Mixup 与对比损失的温度项相互作用，混合样本相似度过高", options: { bullet: bu(), breakLine: true } },
  { text: "佐证：α 降到 0.1 尖峰减半但未消失", options: { bullet: bu() } },
]);
blk(6.81, 4.12, 6.02, 2.62, "下一步 / 求 助", [
  { text: "周三前：查证 Chen et al. 2022 是否报告过同类现象", options: { bullet: bu(), breakLine: true } },
  { text: "求助：王师兄的 Mixup+MoCo 经验", options: { bullet: bu(), breakLine: true } },
  { text: "求助：1 张卡跑 α∈{0.05,0.1,0.15} 细扫", options: { bullet: bu() } },
]);

// ---- 7 · 下期计划 ----
s = p.addSlide(); s.background = { color: BG };
title(s, [{ t: "下期计划（至 11-02）" }]);
tag(s, "计 划"); footer(s, 7, 9);
[
  ["补完温度 τ 消融（0.1–1.0，7 档）", "周一全天已约卡 · 产出完整曲线，复现至 ±0.5pt"],
  ["Mixup 震荡定位", "按问题页假设跑 α 细扫；周三组会前有初步结论"],
  ["启动 Method B 原型（跨类别样本合成）", "先跑通数据管线，不追求精度"],
].forEach(([task, check], i) => {
  const y = 1.42 + i * 1.72;
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y, w: 12.33, h: 1.45, rectRadius: 0.05, fill: { color: SURFACE }, shadow: shadow() });
  s.addShape(p.shapes.OVAL, { x: 0.85, y: y + 0.47, w: 0.52, h: 0.52, fill: { color: INK } });
  s.addText(String(i + 1), { x: 0.85, y: y + 0.47, w: 0.52, h: 0.52, fontSize: 19, bold: true, color: "F8F7F3", align: "center", fontFace: EN, margin: 0 });
  s.addText(task, { x: 1.7, y: y + 0.24, w: 10.6, h: 0.5, fontSize: 18, bold: true, color: TEXT, fontFace: ZH, margin: 0 });
  s.addText([{ text: "完成标志  ", options: { fontFace: ZH, color: P_MID, bold: true } }, { text: check, options: { fontFace: ZH, color: MUTED } }],
    { x: 1.7, y: y + 0.8, w: 10.6, h: 0.45, fontSize: 14, margin: 0 });
});

// ---- 8 · 讨论与求助 ----
s = p.addSlide(); s.background = { color: BG };
title(s, [{ t: "需要讨论的三件事" }]);
tag(s, "求 助"); footer(s, 8, 9);
[
  ["算力", "Mixup 细扫需 1×A100 约 18h，与刘同学的预训练任务冲突，请老师定优先级", "今天定"],
  ["经验", "王师兄：MoCo + Mixup 的 loss 尖峰是否正常？有调参笔记可借阅吗", "本周内"],
  ["方向", "5-shot 下增强增益消失——是否值得继续投入，还是转向 Method B", "组会讨论"],
].forEach(([kind, ask, when], i) => {
  const y = 1.42 + i * 1.72;
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: M, y, w: 12.33, h: 1.45, rectRadius: 0.05, fill: { color: SURFACE }, shadow: shadow() });
  s.addShape(p.shapes.ROUNDED_RECTANGLE, { x: 0.85, y: y + 0.42, w: 1.05, h: 0.6, rectRadius: 0.08, fill: { color: P_SOFT } });
  s.addText(kind, { x: 0.85, y: y + 0.42, w: 1.05, h: 0.6, fontSize: 15, bold: true, color: INK, align: "center", valign: "middle", fontFace: ZH, margin: 0 });
  s.addText(ask, { x: 2.3, y, w: 8.6, h: 1.45, fontSize: 17, color: TEXT, fontFace: ZH, margin: 0, valign: "middle" });
  s.addText(when, { x: 11.1, y: y + 0.55, w: 1.5, h: 0.4, fontSize: 13, color: ACCENT, bold: true, fontFace: ZH, margin: 0, align: "right" });
});

// ---- 9 · 附录 A：超参数（浅面板页） ----
s = p.addSlide(); s.background = { color: BG };
title(s, [{ t: "附录 A · 完整超参数" }]);
tag(s, "附 录"); footer(s, 9, 9);
s.addTable([
  [th("超参数"), th("取值"), th("超参数"), th("取值")],
  [td("batch size"), td("256"), td("optimizer", { zh: true }), td("SGD, momentum 0.9")],
  [td("learning rate"), td("0.03, cosine"), td("weight decay"), td("1e-4")],
  [td("温度 τ", { zh: true }), td("0.5"), td("epochs"), td("200")],
  [td("投影头", { zh: true }), td("256-d, 2 层 MLP"), td("Mixup α"), td("0.2 / 0.1")],
  [td("数据集", { zh: true }), td("CIFAR-FS (64/16/20)"), td("seeds"), td("3")],
], {
  x: M, y: 1.45, w: 12.33, h: 3.8, colW: [3.1, 3.1, 3.1, 3.03],
  fontSize: 15, color: TEXT, valign: "middle", align: "left",
  border: { pt: 0.5, color: "E5E1D8" }, fill: { color: SURFACE }, rowH: 0.6,
});
s.addNotes("Chart data (slide 4): SimCLR基线 52.8 / RandAugment 55.9 / Cutout 53.4 / ColorJitter 52.1 (1-shot %, mean of 3 seeds). Ablation (slide 5): dims 128/256/512/1024 → 54.6/55.9/55.7/55.8 (1-shot), 71.2/72.0/71.9/72.1 (5-shot).");

p.writeFile({ fileName: "group-meeting-demo.pptx" }).then(() => console.log("written: group-meeting-demo.pptx"));
