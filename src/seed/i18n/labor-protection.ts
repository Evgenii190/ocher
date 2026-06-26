import type { SeedLocale } from "./catalog";

/** Ключ — slug документа из labor-protection-data.ts */
export const laborProtectionDocumentTranslations: Record<
  SeedLocale,
  Record<string, string>
> = {
  en: {
    "policy-industrial-safety": "Industrial safety policy",
    "occupational-safety-management-system":
      "Occupational health and safety management system policy",
    "workplace-improvement-plan-2018":
      "Workplace improvement action plan 2018",
    "workplace-improvement-plan-2019":
      "Workplace improvement action plan 2019",
    "workplace-improvement-plan-2020":
      "Workplace improvement action plan 2020",
    "workplace-improvement-plan-2021":
      "Workplace improvement action plan 2021",
    "workplace-improvement-plan-2023":
      "Workplace improvement action plan 2023",
    "workplace-improvement-plan-2024":
      "Workplace improvement action plan 2024",
    "sout-summary-2021":
      "Consolidated workplace assessment results summary 2021",
    "sout-summary-2022":
      "Consolidated workplace assessment results summary 2022",
    "sout-summary-2023":
      "Consolidated workplace assessment results summary 2023",
    "sout-summary-2024":
      "Consolidated workplace assessment results summary 2024",
    "sout-summary-2025":
      "Consolidated workplace assessment results summary 2025",
    "sout-summary-2025-2":
      "Consolidated workplace assessment results summary 2025 (2)",
  },
  zh: {
    "policy-industrial-safety": "工业安全政策",
    "occupational-safety-management-system": "职业健康安全管理体系规定",
    "workplace-improvement-plan-2018": "2018年劳动条件改善措施清单",
    "workplace-improvement-plan-2019": "2019年劳动条件改善措施清单",
    "workplace-improvement-plan-2020": "2020年劳动条件改善措施清单",
    "workplace-improvement-plan-2021": "2021年劳动条件改善措施清单",
    "workplace-improvement-plan-2023": "2023年劳动条件改善措施清单",
    "workplace-improvement-plan-2024": "2024年劳动条件改善措施清单",
    "sout-summary-2021": "2021年工作场所评估结果汇总表",
    "sout-summary-2022": "2022年工作场所评估结果汇总表",
    "sout-summary-2023": "2023年工作场所评估结果汇总表",
    "sout-summary-2024": "2024年工作场所评估结果汇总表",
    "sout-summary-2025": "2025年工作场所评估结果汇总表",
    "sout-summary-2025-2": "2025年工作场所评估结果汇总表（2）",
  },
};

export function getLaborProtectionDocumentTitle(
  slug: string,
  locale: SeedLocale,
  fallback: string,
): string {
  return laborProtectionDocumentTranslations[locale][slug] ?? fallback;
}
