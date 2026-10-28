// Academic PPT / Lyceum — white/blue academic example.
// Run from any directory: node path/to/build_demo.js [output.pptx]
// All experimental values and trends are fictional demonstration data.
const pptxgen = require('pptxgenjs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const p = new pptxgen();
p.layout = 'LAYOUT_WIDE';
p.author = 'Academic PPT';
p.subject = '学术蓝白 · 原生可编辑图示 · 虚构演示数据';
p.title = '面向小样本分类的对比学习研究进展';
p.lang = 'zh-CN';
p.theme = { headFontFace: 'Microsoft YaHei', bodyFontFace: 'Microsoft YaHei', lang: 'zh-CN' };
p.defineSlideMaster({ title: 'ACADEMIC', background: { color: 'FFFFFF' }, objects: [] });
const C = { blue: '174A88', mid: '096CA8', soft: 'EAF3FB', teal: '008579',
  gold: 'B87B00', red: 'B73535', text: '202A35', muted: '526477', line: 'B8CADB', white: 'FFFFFF' };
const ZH = 'Microsoft YaHei', EN = 'Segoe UI';
const W = 13.333333, H = 7.5, M = 0.5, TOTAL = 9;
const S = p.ShapeType;
// Every text run, including table cells, explicitly specifies its font.
function runs(value) {
  return String(value).split(/([\u2E80-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF]+)/u)
    .filter(Boolean).map(text => ({ text, options: {
      fontFace: /[\u2E80-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF]/u.test(text) ? ZH : EN,
    } }));
}
function txt(s, value, x, y, w, h, size = 18, color = C.text, extra = {}) {
  s.addText(runs(value), { x, y, w, h, fontFace: ZH, fontSize: size, color,
    margin: 0, breakLine: false, valign: 'mid', wrap: true, paraSpaceAfter: 0, ...extra });
}
function rect(s, x, y, w, h, fill = C.white, stroke = C.line, extra = {}) {
  s.addShape(S.rect, { x, y, w, h, line: { color: stroke, width: 1.1 },
    fill: { color: fill }, ...extra });
}
function line(s, x, y, w, h = 0, color = C.line, width = 1, extra = {}) {
  s.addShape(S.line, { x, y, w, h, line: { color, width, ...extra } });
}
function arrow(s, x1, y1, x2, y2, color = C.blue, dashed = false) {
  // DrawingML extents must be nonnegative, including upward branches.
  s.addShape(S.line, { x: Math.min(x1, x2), y: Math.min(y1, y2),
    w: Math.abs(x2 - x1), h: Math.abs(y2 - y1), flipH: x2 < x1, flipV: y2 < y1,
    line: { color, width: 2, beginArrowType: 'none', endArrowType: 'triangle',
      ...(dashed ? { dashType: 'dash' } : {}) } });
}
function node(s, label, x, y, w, h, color = C.blue, fill = C.soft, size = 16, textColor = color) {
  rect(s, x, y, w, h, fill, color);
  txt(s, label, x + 0.10, y + 0.06, w - 0.20, h - 0.12, size, textColor,
    { align: 'center', bold: true });
}
function band(s, label, x, y, w, color = C.blue) {
  rect(s, x, y, w, 0.46, color, color);
  txt(s, label, x + 0.14, y + 0.02, w - 0.28, 0.42, 18, C.white, { bold: true });
}
function note(s, role, extra = '') {
  s.addNotes(`Lyceum role: ${role}\n本页研究内容、实验值及趋势全部为虚构演示数据，不能作为科研结论或引用。\n${extra}`);
}
function page(section, title, idx, summary = '') {
  const s = p.addSlide('ACADEMIC');
  rect(s, M, 0.26, 0.12, 0.17, C.blue, C.blue);
  txt(s, section, 0.72, 0.20, 11.9, 0.32, 13, C.blue, { bold: true });
  txt(s, title, M, 0.65, 12.33, 0.55, 28, C.blue, { bold: true });
  line(s, M, 1.31, 0.57, 0, C.blue, 3);
  if (summary) txt(s, summary, M, 1.53, 12.33, 0.62, 18, C.text, { bold: true });
  line(s, M, 6.99, 12.33, 0, C.line, 0.6);
  txt(s, '学术蓝白示例 · 所有研究数据均为虚构演示', M, 7.10, 10.9, 0.25, 12, C.muted);
  txt(s, `${idx} / ${TOTAL}`, 11.7, 7.10, 1.13, 0.25, 12, C.muted, { align: 'right' });
  return s;
}
function caption(s, text, y = 6.62) { txt(s, text, M, y, 12.33, 0.28, 12, C.muted); }
function table(s, rows, x, y, widths, rowH = 0.53, size = 15) {
  const data = rows.map((row, i) => row.map(value => ({ text: runs(value), options: {
    fill: i === 0 ? C.blue : (i % 2 ? C.white : C.soft),
    color: i === 0 ? C.white : C.text, bold: i === 0,
  } })));
  s.addTable(data, { x, y, w: widths.reduce((a, b) => a + b, 0), colW: widths,
    rowH, fontFace: ZH, fontSize: size, border: { pt: 0.65, color: C.line },
    margin: [5, 6, 5, 6], align: 'center', valign: 'middle', autoPage: false,
    color: C.text, paraSpaceAfter: 0 });
}
function chartBase(x, y, w, h) {
  return { x, y, w, h, chartArea: { fill: { color: C.white } },
    plotArea: { fill: { color: C.white } }, showBorder: false,
    catAxisLabelFontFace: EN, catAxisLabelFontSize: 12, catAxisLabelColor: C.muted,
    valAxisLabelFontFace: EN, valAxisLabelFontSize: 12, valAxisLabelColor: C.muted,
    valGridLine: { color: 'DCE5ED', size: 0.6 }, catGridLine: { style: 'none' },
    legendFontFace: EN, legendFontSize: 12, legendColor: C.text,
    showCatName: false, showTitle: false, showLegend: false,
    showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0.0',
    dataLabelColor: C.blue, dataLabelBkgrdColor: C.white, dataLabelFontFace: EN,
    dataLabelFontSize: 13, showValAxisTitle: true,
    valAxisTitleFontFace: EN, valAxisTitleFontSize: 12,
    showCatAxisTitle: true, catAxisTitleFontFace: EN, catAxisTitleFontSize: 12,
  };
}

// 1 · White academic cover with a compact, editable research overview.
let s = page('组会汇报 / 研究进展', '面向小样本分类的对比学习研究进展', 1);
txt(s, '从增强策略、表征结构到训练稳定性，建立可比较的实验路线', M, 1.75, 11.9, 0.65, 22, C.text, { bold: true });
txt(s, '本次汇报覆盖研究问题、技术路线、结果比较与下一阶段验证设计。', M, 2.54, 12.0, 0.4, 18);
const coverNodes = [ ['问题', '低样本监督不足', C.blue], ['方法', '增强 + 对比表征', C.teal],
  ['验证', '精度 / 时长 / 稳定性', C.mid], ['讨论', 'Mixup 震荡定位', C.gold] ];
coverNodes.forEach(([head, body, color], i) => {
  const x = M + i * 3.15;
  band(s, head, x, 3.48, 2.88, color);
  rect(s, x, 3.94, 2.88, 1.10, C.soft, color);
  txt(s, body, x + 0.14, 4.15, 2.60, 0.55, 17, color, { bold: true, align: 'center' });
  if (i < 3) arrow(s, x + 2.88, 4.48, x + 3.13, 4.48);
});
txt(s, '汇报人：研究生（示例）    研究方向：计算机视觉', M, 5.65, 12.0, 0.42, 18);
txt(s, '2026 年 10 月 28 日 · 第 12 周 · 示例汇报', M, 6.18, 12.0, 0.38, 16, C.muted);
note(s, 'cover');

// 2 · Evidence-to-question composition (reference C).
s = page('01 研究背景与问题', '少量标注下，增强收益与训练稳定性需要同时验证', 2,
  '研究切入点：固定实验协议，区分“增强有效”与“表征更稳定”这两个可验证命题。');
band(s, '任务背景与观察', M, 2.36, 6.20);
rect(s, M, 2.82, 6.20, 3.48);
txt(s, '每个类别仅有少量标注样本，类别内变化难以覆盖。\n增强可以扩展样本变化，也可能改变正负样本关系。', 0.72, 2.99, 5.76, 1.02, 18);
const ys = [4.27, 5.11];
ys.forEach((y, row) => {
  txt(s, row ? '查询样本' : '支持样本', 0.73, y + 0.08, 1.36, 0.4, 15, C.blue, { bold: true });
  for (let i = 0; i < 6; i++) {
    const x = 2.25 + i * 0.62, fill = i < 3 ? C.soft : 'E6F4F0';
    rect(s, x, y, 0.43, 0.48, fill, i < 3 ? C.blue : C.teal);
    txt(s, i < 3 ? 'A' : 'B', x + 0.05, y + 0.06, 0.33, 0.34, 15,
      i < 3 ? C.blue : C.teal, { bold: true, align: 'center' });
  }
});
txt(s, '任务结构示意：两类样本，不代表真实数据分布。', 0.74, 5.81, 5.65, 0.29, 12, C.muted);
arrow(s, 6.83, 4.40, 7.40, 4.40, C.red);
band(s, '提出可验证的研究问题', 7.63, 2.36, 5.20, C.red);
rect(s, 7.63, 2.82, 5.20, 3.48, 'FFF4F1', C.red);
[
  '问题：哪些增强能改善表征？',
  '边界：固定编码器、轮次及协议',
  '缺口：均值无法说明训练稳定性',
  '目标：报告精度、代价与失败',
].forEach((text, i) => txt(s, text, 7.88, 3.15 + i * 0.68, 4.70, 0.51, 18));
caption(s, '图 1 · 从任务约束推导研究问题；本页为方法设计示意，不含真实实验结论。');
note(s, 'content');

// 3 · Left process / right explanation (reference B), with explicit deliverables.
s = page('02 研究内容与本期进展', '围绕增强、表征和稳定性，建立问题—方法—产物对应关系', 3);
const research = [
  { title: '科学问题', color: C.blue, head: '在少量标注条件下，哪些变化应保持语义一致？',
    body: '把增强策略、投影头容量与混合样本关系分别作为变量；控制其余设置。',
    labels: ['增强收益', '容量代价', '训练稳定性'] },
  { title: '研究方法', color: C.teal, head: '沿用同一训练链路，逐项改变变量并观察证据。',
    body: '本期完成增强对比与投影头消融；Mixup 震荡进入诊断，尚未归因。',
    labels: ['单变量对比', '精度 / 耗时', '曲线 + 排查'] },
  { title: '阶段产物', color: C.mid, head: '保留可追溯的数据表、图示与下一轮验收条件。',
    body: '产物分别对应结果比较、效率决策和诊断计划；演示数值不能用于科研引用。',
    labels: ['结果表 → 第 6 页', '方法图 → 第 5 页', '排查链 → 第 7 页'] },
];
research.forEach((r, i) => {
  const y = 1.75 + i * 1.61;
  node(s, r.title, M, y + 0.16, 2.30, 0.90, r.color, r.color, 21, C.white);
  txt(s, r.head, 3.12, y, 9.71, 0.43, 19, r.color, { bold: true });
  txt(s, r.body, 3.12, y + 0.46, 9.71, 0.45, 17);
  r.labels.forEach((label, j) => node(s, label, 3.12 + j * 3.28, y + 1.02, 3.04, 0.38,
    r.color, C.white, 14));
  line(s, 3.12, y + 1.49, 9.71, 0, C.line, 0.8, { dashType: 'dash' });
  if (i < 2) arrow(s, 1.65, y + 1.06, 1.65, y + 1.77, C.blue);
});
caption(s, '图 2 · 研究内容与阶段产物对应；左侧表示研究推进，右侧给出解释与验收对象。');
note(s, 'content');

// 4 · Horizontal technical route (reference A).
s = page('03 研究方案与技术路线', '把数据、表征学习与评测连接成可复核的技术路线', 4,
  '路线以同一数据划分和评测协议为起点；增强、投影头与 Mixup 分别作为实验变量。');
const modules = [
  { x: 0.50, c: C.blue, head: '研究输入', label: '少量标注图像', detail: '固定数据划分\n限定任务协议', mini: ['支持', '查询'] },
  { x: 3.02, c: C.teal, head: '数据准备', label: '构造双视图样本', detail: '比较增强策略\n记录随机种子', mini: ['原图', '视图'] },
  { x: 5.54, c: C.mid, head: '模型构建', label: '学习对比表征', detail: '编码器 + 投影头\n控制结构与损失', mini: ['编码', '嵌入'] },
  { x: 8.06, c: C.gold, head: '验证评估', label: '精度与代价比较', detail: '1-shot / 5-shot\n耗时及稳定性', mini: ['预测', '对比'] },
  { x: 10.58, c: C.blue, head: '阶段输出', label: '结果与诊断清单', detail: '可追溯图表\n下一轮验证设计', mini: ['结论', '复核'] },
];
modules.forEach((m, i) => {
  rect(s, m.x, 2.43, 2.25, 2.95, C.white, m.c);
  band(s, m.head, m.x, 2.43, 2.25, m.c);
  node(s, m.mini[0], m.x + 0.15, 3.15, 0.78, 0.56, m.c, C.soft, 14);
  arrow(s, m.x + 0.94, 3.43, m.x + 1.25, 3.43, m.c);
  node(s, m.mini[1], m.x + 1.28, 3.15, 0.82, 0.56, m.c, C.soft, 14);
  txt(s, m.label, m.x + 0.10, 3.98, 2.05, 0.45, 18, m.c, { bold: true, align: 'center' });
  line(s, m.x, 4.55, 2.25, 0, m.c);
  txt(s, m.detail, m.x + 0.13, 4.69, 1.99, 0.54, 15, C.text, { align: 'center' });
  if (i < 4) arrow(s, m.x + 2.25, 3.92, m.x + 2.51, 3.92, C.blue);
});
[
  ['阶段一 · 数据准备', '固定划分、种子与增强配置', C.teal],
  ['阶段二 · 模型比较', '固定主干，逐项比较增强与投影头', C.mid],
  ['阶段三 · 验证与诊断', '结合精度、时长与曲线设计下一轮实验', C.gold],
].forEach(([head, body, color], i) => {
  const x = M + i * 4.20;
  txt(s, head, x, 5.70, 3.93, 0.40, 18, color, { bold: true });
  txt(s, body, x, 6.17, 3.93, 0.56, 16);
});
note(s, 'content', '图 3 · 技术路线示意。箭头表示数据或分析产物的流向。');

// 5 · Editable model architecture with training / evaluation distinction.
s = page('04 方法设计', '双视图共享编码器，训练损失与小样本评测分别约束', 5,
  '设计动机：让同一图像的不同视图形成相近表征；评测时检查迁移到少量标注任务的效果。');
band(s, '训练链路 · 方法结构示意', M, 2.35, 8.14);
rect(s, M, 2.81, 8.14, 2.98);
node(s, '输入 x', 0.72, 3.77, 1.30, 0.65);
for (let i = 0; i < 2; i++) {
  const y = 3.16 + i * 1.50;
  node(s, i ? '视图 v₂' : '视图 v₁', 2.45, y, 1.32, 0.64, C.teal);
  node(s, '共享编码器 f', 4.10, y, 1.65, 0.64, C.blue);
  node(s, '投影头 g', 6.10, y, 1.40, 0.64, C.mid);
  arrow(s, 2.02, 4.09, 2.45, y + 0.32);
  arrow(s, 3.77, y + 0.32, 4.10, y + 0.32);
  arrow(s, 5.75, y + 0.32, 6.10, y + 0.32);
}
line(s, 7.72, 3.48, 0, 1.50, C.mid, 1.5);
line(s, 7.50, 3.48, 0.22, 0, C.mid, 1.5);
line(s, 7.50, 4.98, 0.22, 0, C.mid, 1.5);
txt(s, '相似度\n与损失', 7.86, 3.79, 0.62, 0.94, 14, C.blue, { bold: true, align: 'center' });
txt(s, '训练：更新编码器与投影头；具体正负样本构造应按实际方法填写。', 0.75, 5.30, 7.64, 0.34, 14);
band(s, '变量与验证边界', 8.97, 2.35, 3.86, C.teal);
[
  ['固定项', '编码器、轮次与评测协议'],
  ['比较项', '增强策略、投影头维度'],
  ['诊断项', 'Mixup 系数与训练曲线'],
].forEach(([head, body], i) => {
  const y = 3.04 + i * 0.91;
  txt(s, head, 9.18, y, 3.43, 0.36, 17, C.teal, { bold: true });
  txt(s, body, 9.18, y + 0.40, 3.43, 0.43, 17);
});
node(s, '评测：编码器表征 → 支持集分类 → 查询集准确率', M, 6.05, 12.33, 0.53, C.blue, C.soft, 17);
caption(s, '图 4 · 原生形状方法图；训练与评测用途分别标注，本图不宣称具体算法的新颖性。');
note(s, 'content');

// 6 · Results with native bar chart, table, controlled setup and interpretation.
s = page('05 结果比较与解释', '演示结果：增强提高 1-shot 均值，256 维后精度变化较小', 6,
  '演示设置：固定编码器与训练轮次，分别比较增强与投影头；结果不支持显著性推断。');
band(s, '增强策略 · 1-shot 准确率', M, 2.35, 6.15);
s.addChart(p.ChartType.bar, [{ name: 'Accuracy', labels: ['Baseline', 'RandAug', 'Cutout', 'ColorJitter'],
  values: [52.8, 55.9, 53.4, 52.1] }], { ...chartBase(0.55, 2.94, 6.04, 2.81),
    barDir: 'col', chartColors: [C.blue, C.teal, '648DAE', 'B6CADC'],
    valAxisMinVal: 0, valAxisMaxVal: 60, valAxisMajorUnit: 20,
    valAxisTitle: 'Accuracy (%)', catAxisTitle: 'Augmentation', gapSizePct: 65,
});
band(s, '投影头消融 · 精度与训练代价', 6.98, 2.35, 5.85);
table(s, [ ['维度', '1-shot %', '5-shot %', '时长 h'], ['128', '54.6', '71.2', '3.1'],
  ['256', '55.9', '72.0', '4.2'], ['512', '55.7', '71.9', '6.5'], ['1024', '55.8', '72.1', '10.9'] ],
  6.98, 2.96, [1.10, 1.60, 1.60, 1.55], 0.49, 15);
line(s, M, 5.95, 12.33, 0, C.line);
txt(s, '解读：RandAug 比基线高 3.1 个百分点；256 维之后精度接近，而演示耗时继续增加。', M, 6.07, 12.33, 0.40, 17, C.blue, { bold: true });
caption(s, '局限：未提供逐次实验值与误差范围；只展示均值和时长，不作统计显著性结论。');
note(s, 'content', 'Chart data: Baseline 52.8; RandAug 55.9; Cutout 53.4; ColorJitter 52.1 (%).\nTable data: dim/1shot/5shot/h: 128/54.6/71.2/3.1; 256/55.9/72.0/4.2; 512/55.7/71.9/6.5; 1024/55.8/72.1/10.9. All fictional. No p values or repeat count supplied.');

// 7 · Failure analysis: evidence curve + diagnostic flow + falsifiable next step.
s = page('06 问题分析与排查', 'Mixup 震荡仍未归因，下一步先核对样本关系再扫描系数', 7,
  '观察与假设分开：曲线展示现象；温度项与混合样本的相互作用目前只是待验证解释。');
band(s, '训练曲线 · 虚构趋势示意', M, 2.35, 6.03, C.red);
const epochs = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200];
const stable = [1.8, 1.5, 1.22, 1.02, 0.86, 0.75, 0.64, 0.56, 0.50, 0.46, 0.42];
const mixed = [1.8, 1.51, 1.24, 1.57, 0.91, 1.31, 0.71, 1.12, 0.61, 0.95, 0.52];
s.addChart(p.ChartType.line, [ { name: 'Baseline', labels: epochs.map(String), values: stable },
  { name: 'Mixup (demo)', labels: epochs.map(String), values: mixed } ], {
  ...chartBase(0.54, 2.96, 5.94, 2.85), chartColors: [C.blue, C.red],
  valAxisMinVal: 0, valAxisMaxVal: 2, valAxisMajorUnit: 0.5,
  valAxisTitle: 'Loss (a.u.)', catAxisTitle: 'Epoch', catAxisLabelSkip: 2,
  showValue: false, showLegend: true, legendPos: 'b', showMarker: true, markerSize: 4,
  lineSize: 2, showCatName: false,
});
band(s, '排查路径 · 每一步对应证据', 6.88, 2.35, 5.95);
[
  ['已查 · 运行状态', '核对 OOM 与加载日志', C.teal],
  ['待核 · 样本关系', '记录标签与相似度，再检验归因', C.blue],
  ['待验 · 系数与温度', '先扫描系数，再独立改变温度', C.gold],
].forEach(([head, body, color], i) => {
  const y = 2.99 + i * 0.92;
  node(s, head, 6.88, y, 2.13, 0.61, color, C.soft, 15);
  txt(s, body, 9.23, y - 0.01, 3.60, 0.65, 16);
  if (i < 2) arrow(s, 7.94, y + 0.61, 7.94, y + 0.91, C.blue);
});
rect(s, M, 6.02, 12.33, 0.49, 'FFF4F1', C.red);
txt(s, '验收条件：给出能稳定复现尖峰的最小设置，再检验改变单一变量是否能消除现象。', 0.67, 6.08, 12.0, 0.36, 17, C.red, { bold: true });
caption(s, '图 5 · 曲线不是实际训练日志；诊断链展示实验设计，不能作为机制已被证实的依据。');
note(s, 'content', `Synthetic line data only. Epoch: ${epochs}. Baseline: ${stable}. Mixup: ${mixed}. Not actual experiment logs. Hypothesis is unverified.`);

// 8 · Plan / dependencies / acceptance and asks in one substantive page.
s = page('07 下期计划与讨论', '先完成可复现诊断，再决定增强与样本合成的投入顺序', 8,
  '下一周安排（示例）：优先完成可复现诊断和单变量扫描，方向决策依赖这些结果。');
band(s, '任务与依赖', M, 2.35, 7.52);
const tasks = ['核对样本关系与日志', 'Mixup 系数单变量扫描', '温度项独立验证', '汇总复现包与方向判断'];
const gx = 3.84, gy = 3.09, cw = 0.72;
['周四', '周五', '周六', '周日', '周一'].forEach((d, i) => {
  txt(s, d, gx + i * cw, 2.93, cw, 0.36, 14, C.blue, { align: 'center', bold: true });
});
const starts = [0, 1, 2, 3], lengths = [1, 2, 2, 2];
tasks.forEach((task, i) => {
  const y = gy + 0.59 + i * 0.59;
  txt(s, task, 0.63, y, 3.02, 0.40, 16);
  for (let j = 0; j < 5; j++) rect(s, gx + j * cw, y, cw, 0.41, C.white, C.line);
  rect(s, gx + starts[i] * cw + 0.04, y + 0.06, lengths[i] * cw - 0.08, 0.29,
    i === 0 ? C.teal : C.mid, i === 0 ? C.teal : C.mid);
});
band(s, '完成标志 / 资源讨论', 8.35, 2.35, 4.48, C.teal);
[
  ['复现包', '配置、种子、日志和对齐图'],
  ['扫描表', '单变量、重复值和失败记录'],
  ['资源确认', '一张卡的连续运行时段'],
  ['经验求助', '请同学复核混合样本构造'],
].forEach(([head, body], i) => {
  const y = 2.98 + i * 0.71;
  txt(s, head, 8.55, y, 4.08, 0.31, 15, C.teal, { bold: true });
  txt(s, body, 8.55, y + 0.32, 4.08, 0.39, 17);
});
node(s, '样本核对', 0.63, 6.01, 2.12, 0.49, C.teal, C.soft, 16);
node(s, '系数 / 温度扫描', 3.23, 6.01, 2.80, 0.49, C.mid, C.soft, 16);
node(s, '复现包与投入决策', 6.52, 6.01, 3.13, 0.49, C.gold, C.soft, 16);
arrow(s, 2.75, 6.25, 3.23, 6.25);
arrow(s, 6.03, 6.25, 6.52, 6.25);
caption(s, '图 6 · 示例排期；后续任务依赖前序产物，若无法复现则先补记录，不直接扩大扫描。');
note(s, 'content');

// 9 · Reproducibility appendix. No fabricated bibliography or missing raw repeats.
s = page('08 备查附录', '复现实验需要配置、原始值和数据边界共同留档', 9,
  '本示例用于展示版式与图表编辑方式；以下配置和数据不构成实际实验的复现承诺。');
table(s, [ ['配置项', '演示取值', '配置项', '演示取值'],
  ['编码器', 'ResNet-12', '训练轮次', '200'], ['优化器', 'SGD / momentum 0.9', '批量大小', '256'],
  ['学习率', '0.03 / cosine', '权重衰减', '0.0001'], ['投影头维度', '128 / 256 / 512 / 1024', 'Mixup 系数', '单独扫描，待验证'],
  ['评测口径', '1-shot / 5-shot', '重复实验', '未提供原始重复值'] ],
  M, 2.35, [2.15, 4.01, 2.15, 4.02], 0.51, 15);
band(s, '演示数据与真实研究的边界', M, 5.83, 12.33);
txt(s, '所有数值及曲线均为虚构；真实研究须补充数据来源、逐次实验值、误差范围与可访问的配置记录。', 0.68, 6.37, 11.99, 0.42, 17);
note(s, 'appendix', 'Data on slides 6 and 7 are stored in their own notes and native chart workbooks. No external paper is cited as supporting these fictional values.');

const output = path.resolve(process.argv[2] || path.join(__dirname, 'group-meeting-demo.pptx'));
p.writeFile({ fileName: output }).then(() => {
  // Preserve rich CJK/Latin table runs while fixing the upstream 4.0.1 XML defect.
  execFileSync(process.env.PYTHON || 'python', [
    path.resolve(__dirname, '../../skills/lyceum/scripts/normalize_pptx.py'), output,
  ], { stdio: 'inherit' });
  console.log(`written: ${output}`);
}).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
