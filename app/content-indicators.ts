import type { Lang } from "./content";

/*
 * Indicators dashboard — لوحة مؤشرات أولية.
 * Türkiye figures are real (TÜİK 2024). Other countries carry illustrative
 * values so the client can judge the design; the page says so explicitly.
 */

export type IndicatorCategory = "need" | "coverage" | "sponsorship" | "quality" | "capacity";

export interface DashCountry {
  iso: string;
  en: string;
  ar: string;
}

export interface DashValue {
  v: number;
  year: number;
  grade: "A" | "B" | "C" | "D" | "E";
}

export interface DashIndicator {
  id: string;
  category: IndicatorCategory;
  en: string;
  ar: string;
  sourceEn: string;
  sourceAr: string;
  values: Record<string, DashValue | undefined>;
}

export const DASH_COUNTRIES: DashCountry[] = [
  { iso: "TUR", en: "Türkiye", ar: "تركيا" },
  { iso: "JOR", en: "Jordan", ar: "الأردن" },
  { iso: "PSE", en: "Palestine", ar: "فلسطين" },
  { iso: "LBN", en: "Lebanon", ar: "لبنان" },
  { iso: "EGY", en: "Egypt", ar: "مصر" },
];

export const DASH_INDICATORS: DashIndicator[] = [
  {
    id: "children-total",
    category: "need",
    en: "Children (0–17), total",
    ar: "عدد الأطفال (0–17)",
    sourceEn: "National statistics / UNICEF",
    sourceAr: "إحصاءات وطنية / يونيسف",
    values: {
      TUR: { v: 21_817_061, year: 2024, grade: "A" },
      JOR: { v: 4_113_000, year: 2024, grade: "B" },
      PSE: { v: 2_430_000, year: 2024, grade: "B" },
      LBN: { v: 1_253_000, year: 2023, grade: "C" },
      EGY: { v: 44_160_000, year: 2024, grade: "A" },
    },
  },
  {
    id: "father-died",
    category: "need",
    en: "Children whose father has died",
    ar: "أطفال توفي والدهم",
    sourceEn: "TÜİK / national records",
    sourceAr: "TÜİK / سجلات وطنية",
    values: {
      TUR: { v: 258_515, year: 2024, grade: "A" },
      JOR: { v: 61_400, year: 2023, grade: "C" },
      PSE: { v: 53_800, year: 2024, grade: "C" },
      LBN: { v: 24_300, year: 2023, grade: "D" },
    },
  },
  {
    id: "both-died",
    category: "need",
    en: "Children who lost both parents",
    ar: "أطفال توفي كلا الوالدين",
    sourceEn: "TÜİK / national records",
    sourceAr: "TÜİK / سجلات وطنية",
    values: {
      TUR: { v: 5_276, year: 2024, grade: "A" },
      JOR: { v: 3_150, year: 2023, grade: "C" },
      PSE: { v: 9_600, year: 2024, grade: "C" },
      EGY: { v: 41_000, year: 2024, grade: "C" },
    },
  },
  {
    id: "institutional-care",
    category: "coverage",
    en: "Children in institutional care",
    ar: "أطفال في الرعاية المؤسسية",
    sourceEn: "TÜİK · Ministry of Family and Social Services",
    sourceAr: "TÜİK · وزارة الأسرة والخدمات الاجتماعية",
    values: {
      TUR: { v: 15_135, year: 2024, grade: "A" },
      JOR: { v: 2_800, year: 2023, grade: "B" },
      EGY: { v: 11_500, year: 2023, grade: "C" },
    },
  },
  {
    id: "foster-care",
    category: "coverage",
    en: "Children in foster family care",
    ar: "أطفال في الرعاية الأسرية / الحاضنة",
    sourceEn: "TÜİK · Ministry of Family and Social Services",
    sourceAr: "TÜİK · وزارة الأسرة والخدمات الاجتماعية",
    values: {
      TUR: { v: 10_430, year: 2024, grade: "A" },
      JOR: { v: 1_950, year: 2023, grade: "B" },
    },
  },
  {
    id: "sponsored",
    category: "sponsorship",
    en: "Sponsored orphans",
    ar: "الأيتام المكفولون",
    sourceEn: "Partner organizations (reviewed)",
    sourceAr: "مؤسسات شريكة (بعد المراجعة)",
    values: {
      JOR: { v: 31_200, year: 2025, grade: "B" },
      PSE: { v: 58_400, year: 2025, grade: "B" },
      LBN: { v: 12_750, year: 2025, grade: "C" },
      EGY: { v: 96_000, year: 2024, grade: "C" },
    },
  },
  {
    id: "psychosocial",
    category: "quality",
    en: "Orphans receiving psychosocial support",
    ar: "أيتام يتلقون دعمًا نفسيًا واجتماعيًا",
    sourceEn: "Partner organizations (reviewed)",
    sourceAr: "مؤسسات شريكة (بعد المراجعة)",
    values: {
      JOR: { v: 5_100, year: 2025, grade: "C" },
      PSE: { v: 8_300, year: 2025, grade: "C" },
      LBN: { v: 2_400, year: 2024, grade: "D" },
    },
  },
  {
    id: "orgs-reporting",
    category: "capacity",
    en: "Partner organizations reporting",
    ar: "مؤسسات شريكة تُبلّغ بالبيانات",
    sourceEn: "Federation registry",
    sourceAr: "سجل الاتحاد",
    values: {
      TUR: { v: 12, year: 2026, grade: "A" },
      JOR: { v: 9, year: 2026, grade: "A" },
      PSE: { v: 14, year: 2026, grade: "A" },
      LBN: { v: 6, year: 2026, grade: "A" },
      EGY: { v: 11, year: 2026, grade: "A" },
    },
  },
];

export interface IndicatorsDict {
  backToObservatory: string;
  nav: { byCountry: string; compare: string };
  hero: { title: string; lead: string };
  dataNote: string;
  categories: Record<IndicatorCategory | "all", string>;
  countryLabel: string;
  byCountryTitle: string;
  byCountryLead: string;
  noValue: string;
  gapBadge: string;
  compareTitle: string;
  compareLead: string;
  compareHint: string;
  yearLabel: string;
  emptyCategory: string;
}

export const indicatorsContent: Record<Lang, IndicatorsDict> = {
  en: {
    backToObservatory: "Observatory",
    nav: { byCountry: "By country", compare: "Compare" },
    hero: {
      title: "Indicators dashboard",
      lead: "Compact indicators by country and data type. Every figure keeps its identity card — source, year, and grade — and types are never mixed or totalled together.",
    },
    dataNote: "Design preview — Türkiye figures are real (TÜİK 2024); other countries show illustrative values.",
    categories: {
      all: "All types",
      need: "Need",
      coverage: "Coverage",
      sponsorship: "Sponsorship",
      quality: "Care quality",
      capacity: "Institutional capacity",
    },
    countryLabel: "Country",
    byCountryTitle: "By country",
    byCountryLead: "Pick a country and a data type — the dashboard shows only approved figures.",
    noValue: "No approved figure",
    gapBadge: "E · gap",
    compareTitle: "Compare across countries",
    compareLead: "One indicator, side by side. Grades stay visible — numbers from different sources are compared with care, never merged.",
    compareHint: "Select any indicator card to compare it here.",
    yearLabel: "Year",
    emptyCategory: "No indicators of this type for the selected country yet.",
  },
  ar: {
    backToObservatory: "المرصد",
    nav: { byCountry: "حسب الدولة", compare: "مقارنة" },
    hero: {
      title: "لوحة المؤشرات",
      lead: "مؤشرات مختصرة حسب الدولة ونوع البيانات. كل رقم يحتفظ ببطاقة هويته — المصدر والسنة والدرجة — ولا تُخلط الأنواع أو تُجمع معًا أبدًا.",
    },
    dataNote: "معاينة تصميم — أرقام تركيا حقيقية (TÜİK 2024)؛ وبقية الدول أرقام توضيحية.",
    categories: {
      all: "كل الأنواع",
      need: "الاحتياج",
      coverage: "التغطية",
      sponsorship: "الكفالة",
      quality: "جودة الرعاية",
      capacity: "القدرة المؤسسية",
    },
    countryLabel: "الدولة",
    byCountryTitle: "حسب الدولة",
    byCountryLead: "اختر دولة ونوع بيانات — لا تعرض اللوحة إلا الأرقام المعتمدة.",
    noValue: "لا رقم معتمد",
    gapBadge: "E · فجوة",
    compareTitle: "مقارنة بين الدول",
    compareLead: "مؤشر واحد، جنبًا إلى جنب. تبقى الدرجات ظاهرة — الأرقام من مصادر مختلفة تُقارن بحذر ولا تُدمج أبدًا.",
    compareHint: "اختر أي بطاقة مؤشر لمقارنتها هنا.",
    yearLabel: "السنة",
    emptyCategory: "لا مؤشرات من هذا النوع للدولة المختارة بعد.",
  },
};
