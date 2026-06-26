import type { SeedLocale } from "./catalog";

/** Ключ — slug сертификата из certificates-data.ts */
export const certificateItemTranslations: Record<
  SeedLocale,
  Record<string, string>
> = {
  en: {
    "formwork-end-anchor": "End anchor for formwork",
    "anchors-and-ties": "Anchors and ties",
    "tie-rod-nuts": "Tie rod nuts",
    "polished-rod-clamps": "Polished rod clamps",
    "wedge-aligning-locks": "Wedge aligning locks for formwork",
    "rail-aligning-locks": "Rail aligning locks for formwork",
    "pk-housing": "PC housing",
    "nktm-coupling-73": "NKT-M coupling 73",
    "nkt-couplings-gost-31446": "NKT couplings GOST 31446",
    "nkt-couplings-gost-633": "NKT couplings GOST 633",
    "nktm-couplings": "NKT-M couplings",
    "pipeline-supports-vankor": "Pipeline supports RN-Vankor",
    "pipeline-supports": "Pipeline supports",
    "utility-model-patent": "Utility model patent",
    "wellhead-seals": "Wellhead seals",
    "tmk-certificate": "TMK certificate",
    "qms-metal-structures": "Quality management system (metal structures)",
    "qms-oilfield-equipment":
      "Quality management system (oilfield equipment)",
    "automatic-coupling-device": "Automatic coupling device",
    "fiberglass-pump-rod": "Fiberglass pump rod",
    "pump-rods-and-couplings": "Pump rods and couplings",
    "pump-rods-couplings": "Pump rods and couplings",
    "polished-rod-gost-31825": "Polished rod GOST 31825",
    "polished-rod": "Polished rod",
    "rod-holder": "Rod holder",
    "corner-stripping-panel": "Stripping corner panel",
  },
  zh: {
    "formwork-end-anchor": "模板端部锚栓",
    "anchors-and-ties": "锚栓和拉杆",
    "tie-rod-nuts": "对拉螺栓螺母",
    "polished-rod-clamps": "抛光杆夹具",
    "wedge-aligning-locks": "模板楔形调平锁",
    "rail-aligning-locks": "模板齿条调平锁",
    "pk-housing": "PC护罩",
    "nktm-coupling-73": "NKT-M接箍 73",
    "nkt-couplings-gost-31446": "NKT接箍 GOST 31446",
    "nkt-couplings-gost-633": "NKT接箍 GOST 633",
    "nktm-couplings": "NKT-M接箍",
    "pipeline-supports-vankor": "RN-Vankor管道支架",
    "pipeline-supports": "管道支架",
    "utility-model-patent": "实用新型专利",
    "wellhead-seals": "井口密封件",
    "tmk-certificate": "TMK证书",
    "qms-metal-structures": "质量管理体系（金属结构）",
    "qms-oilfield-equipment": "质量管理体系（石油开采设备）",
    "automatic-coupling-device": "自动耦合装置",
    "fiberglass-pump-rod": "玻璃钢抽油杆",
    "pump-rods-and-couplings": "抽油杆及接箍",
    "pump-rods-couplings": "抽油杆和接箍",
    "polished-rod-gost-31825": "抛光杆 GOST 31825",
    "polished-rod": "抛光杆",
    "rod-holder": "杆柱固定器",
    "corner-stripping-panel": "拆模角板",
  },
};

export function getCertificateTitle(
  slug: string,
  locale: SeedLocale,
  fallback: string,
): string {
  return certificateItemTranslations[locale][slug] ?? fallback;
}
