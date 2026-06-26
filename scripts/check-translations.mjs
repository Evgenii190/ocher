import fs from "node:fs";

const en = JSON.parse(fs.readFileSync("messages/en.json", "utf8"));
const ru = JSON.parse(fs.readFileSync("messages/ru.json", "utf8"));
const zh = JSON.parse(fs.readFileSync("messages/zh.json", "utf8"));

function flatten(obj, prefix = "") {
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(result, flatten(v, key));
    } else {
      result[key] = v;
    }
  }
  return result;
}

const enFlat = flatten(en);
const ruFlat = flatten(ru);
const zhFlat = flatten(zh);

const enKeys = new Set(Object.keys(enFlat));
const ruKeys = new Set(Object.keys(ruFlat));
const zhKeys = new Set(Object.keys(zhFlat));

console.log("=== Missing keys in zh (vs en) ===");
for (const k of enKeys) {
  if (!zhKeys.has(k)) console.log("MISSING:", k, "| en:", enFlat[k]);
}

console.log("\n=== zh values same as en (likely untranslated) ===");
let count = 0;
for (const k of enKeys) {
  if (zhFlat[k] && zhFlat[k] === enFlat[k] && typeof enFlat[k] === "string" && enFlat[k].length > 1) {
    if (/^(\/|mm|cm|m|kg|t|#|\{)/.test(enFlat[k])) continue;
    if (/^[A-Z0-9,.\s<>+\-]+$/.test(enFlat[k]) && enFlat[k].length < 25) continue;
    console.log(k, "|", enFlat[k]);
    count++;
  }
}
console.log("Total same as en:", count);

console.log("\n=== Missing keys in en (vs ru) ===");
for (const k of ruKeys) {
  if (!enKeys.has(k)) console.log("MISSING:", k);
}

console.log("\n=== Missing keys in zh (vs ru) ===");
for (const k of ruKeys) {
  if (!zhKeys.has(k)) console.log("MISSING:", k, "| ru:", String(ruFlat[k]).slice(0, 80));
}
