// Negative test fixture: intentionally defective deck to validate qa_check.py catches issues.
const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.layout = "LAYOUT_WIDE";
const F = "微软雅黑";

// 1. overflow + placeholder + missing font (runs without fontFace)
let s = p.addSlide(); s.background = { color: "FFFFFF" };
s.addText("TODO: 把这段超长的中文文字塞进一个很小的文本框里用来测试溢出检测是否生效并且这里还有一个【待补充：实验数据】的占位符标记以及xxxx残留", { x: 0.5, y: 0.5, w: 3.0, h: 0.8, fontSize: 18, fontFace: F, margin: 0 });
s.addText("no explicit font run", { x: 0.5, y: 2.0, w: 4, h: 0.5, fontSize: 18, margin: 0 });

// 2. off-canvas shape
s = p.addSlide(); s.background = { color: "FFFFFF" };
s.addText("off canvas", { x: 12.5, y: 7.1, w: 2.0, h: 0.5, fontSize: 16, fontFace: F, margin: 0 });

// 3. tiny font
s = p.addSlide(); s.background = { color: "FFFFFF" };
s.addText("10pt 太小了", { x: 0.5, y: 0.5, w: 4, h: 0.4, fontSize: 10, fontFace: F, margin: 0 });

// 4. overlapping text frames (>20% of smaller)
s = p.addSlide(); s.background = { color: "FFFFFF" };
s.addText("frame A", { x: 1, y: 1, w: 4, h: 1, fontSize: 18, fontFace: F, margin: 0 });
s.addText("frame B", { x: 2.5, y: 1, w: 4, h: 1, fontSize: 18, fontFace: F, margin: 0 });

// 5. tiny-font + placeholder combo (lorem)
s = p.addSlide(); s.background = { color: "FFFFFF" };
s.addText("lorem ipsum draft", { x: 0.5, y: 0.5, w: 3, h: 0.4, fontSize: 11, fontFace: F, margin: 0 });

p.writeFile({ fileName: "bad_deck.pptx" }).then(() => console.log("written: bad_deck.pptx"));
