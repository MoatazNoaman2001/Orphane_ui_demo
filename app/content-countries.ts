import type { Lang } from "./content";

/*
 * Countries list + map page.
 * The rows mirror the tracked countries on the world map; regions follow the
 * client's own region table (نطاق الدول). Only Türkiye's page is active in
 * this preview — it links to the sample country page.
 */

export type CountryStatus = "pub" | "prep" | "gap" | "internal";

export interface CountryRow {
  iso: string;
  en: string;
  ar: string;
  regionEn: string;
  regionAr: string;
  status: CountryStatus;
  indicators: number | null;
  grade: "A" | "B" | "C" | "D" | "E" | null;
  updated: string | null;
  /** route of the sample page, only for countries active in this preview */
  href?: string;
}

export const COUNTRY_ROWS: CountryRow[] = [
  { iso: "TUR", en: "Türkiye", ar: "تركيا", regionEn: "Eastern Europe", regionAr: "شرق أوروبا", status: "pub", indicators: 6, grade: "A", updated: "2026", href: "/designs/observatory/country" },
  { iso: "JOR", en: "Jordan", ar: "الأردن", regionEn: "Middle East", regionAr: "الشرق الأوسط", status: "pub", indicators: 14, grade: "B", updated: "2026" },
  { iso: "PSE", en: "Palestine", ar: "فلسطين", regionEn: "Middle East", regionAr: "الشرق الأوسط", status: "pub", indicators: 12, grade: "B", updated: "2026" },
  { iso: "LBN", en: "Lebanon", ar: "لبنان", regionEn: "Middle East", regionAr: "الشرق الأوسط", status: "pub", indicators: 9, grade: "A", updated: "2025" },
  { iso: "EGY", en: "Egypt", ar: "مصر", regionEn: "North Africa", regionAr: "شمال أفريقيا", status: "pub", indicators: 16, grade: "B", updated: "2026" },
  { iso: "MAR", en: "Morocco", ar: "المغرب", regionEn: "North Africa", regionAr: "شمال أفريقيا", status: "pub", indicators: 11, grade: "A", updated: "2025" },
  { iso: "SYR", en: "Syria", ar: "سوريا", regionEn: "Middle East", regionAr: "الشرق الأوسط", status: "prep", indicators: 14, grade: "C", updated: "2026" },
  { iso: "IRQ", en: "Iraq", ar: "العراق", regionEn: "Middle East", regionAr: "الشرق الأوسط", status: "prep", indicators: 8, grade: "C", updated: "2026" },
  { iso: "SDN", en: "Sudan", ar: "السودان", regionEn: "East Africa", regionAr: "شرق أفريقيا", status: "prep", indicators: 6, grade: "D", updated: "2026" },
  { iso: "DZA", en: "Algeria", ar: "الجزائر", regionEn: "North Africa", regionAr: "شمال أفريقيا", status: "prep", indicators: 5, grade: "C", updated: "2025" },
  { iso: "TUN", en: "Tunisia", ar: "تونس", regionEn: "North Africa", regionAr: "شمال أفريقيا", status: "prep", indicators: 6, grade: "C", updated: "2025" },
  { iso: "SEN", en: "Senegal", ar: "السنغال", regionEn: "West Africa", regionAr: "غرب أفريقيا", status: "prep", indicators: 4, grade: "D", updated: "2026" },
  { iso: "YEM", en: "Yemen", ar: "اليمن", regionEn: "Middle East", regionAr: "الشرق الأوسط", status: "gap", indicators: null, grade: "E", updated: null },
  { iso: "SOM", en: "Somalia", ar: "الصومال", regionEn: "East Africa", regionAr: "شرق أفريقيا", status: "gap", indicators: null, grade: "E", updated: null },
  { iso: "AFG", en: "Afghanistan", ar: "أفغانستان", regionEn: "Central Asia", regionAr: "آسيا الوسطى", status: "gap", indicators: null, grade: "E", updated: null },
  { iso: "LBY", en: "Libya", ar: "ليبيا", regionEn: "North Africa", regionAr: "شمال أفريقيا", status: "gap", indicators: null, grade: "E", updated: null },
  { iso: "TCD", en: "Chad", ar: "تشاد", regionEn: "Central Africa", regionAr: "وسط أفريقيا", status: "gap", indicators: null, grade: "E", updated: null },
  { iso: "MLI", en: "Mali", ar: "مالي", regionEn: "West Africa", regionAr: "غرب أفريقيا", status: "gap", indicators: null, grade: "E", updated: null },
  { iso: "PAK", en: "Pakistan", ar: "باكستان", regionEn: "South Asia", regionAr: "جنوب آسيا", status: "internal", indicators: 3, grade: "D", updated: "2026" },
  { iso: "BGD", en: "Bangladesh", ar: "بنغلاديش", regionEn: "South Asia", regionAr: "جنوب آسيا", status: "internal", indicators: 2, grade: "D", updated: "2026" },
  { iso: "NER", en: "Niger", ar: "النيجر", regionEn: "Central Africa", regionAr: "وسط أفريقيا", status: "internal", indicators: 4, grade: "D", updated: "2025" },
  { iso: "MRT", en: "Mauritania", ar: "موريتانيا", regionEn: "West Africa", regionAr: "غرب أفريقيا", status: "internal", indicators: 2, grade: "D", updated: "2025" },
  { iso: "IDN", en: "Indonesia", ar: "إندونيسيا", regionEn: "Southeast Asia", regionAr: "جنوب شرق آسيا", status: "internal", indicators: 3, grade: "C", updated: "2026" },
];

export interface CountriesDict {
  backToObservatory: string;
  nav: { map: string; list: string };
  hero: {
    title: string;
    lead: string;
    scopeNote: string;
  };
  statusLabels: Record<CountryStatus, string>;
  mapHint: string;
  list: {
    title: string;
    lead: string;
    searchPlaceholder: string;
    allStatuses: string;
    columns: { country: string; region: string; status: string; indicators: string; grade: string; updated: string };
    emptyResult: string;
    previewNote: string;
    openPage: string;
  };
}

export const countriesContent: Record<Lang, CountriesDict> = {
  en: {
    backToObservatory: "Observatory",
    nav: { map: "Map", list: "All countries" },
    hero: {
      title: "Countries",
      lead: "Every country in scope has its own record and page inside the system. A page publishes only when approved data exists — otherwise it says so, honestly.",
      scopeNote: "First release scope · 193 countries across 18 regions",
    },
    statusLabels: {
      pub: "Published",
      prep: "In preparation",
      gap: "Data gap",
      internal: "Internal",
    },
    mapHint: "Hover a glowing country for its status card",
    list: {
      title: "All countries",
      lead: "Search and filter — the same list the admin panel manages, as visitors see it.",
      searchPlaceholder: "Search by country name…",
      allStatuses: "All",
      columns: { country: "Country", region: "Region", status: "Status", indicators: "Indicators", grade: "Page grade", updated: "Updated" },
      emptyResult: "No country matches this filter.",
      previewNote: "In this preview, the Türkiye page is active as the sample country page.",
      openPage: "Open page",
    },
  },
  ar: {
    backToObservatory: "المرصد",
    nav: { map: "الخريطة", list: "كل الدول" },
    hero: {
      title: "الدول",
      lead: "لكل دولة ضمن النطاق سجلّ وصفحة خاصة داخل النظام. ولا تُنشر الصفحة إلا عند توفر بيانات معتمدة — وإلا قالت ذلك بصدق.",
      scopeNote: "نطاق الإصدار الأول · 193 دولة في 18 إقليمًا",
    },
    statusLabels: {
      pub: "منشورة",
      prep: "قيد التجهيز",
      gap: "فجوة بيانات",
      internal: "داخلية",
    },
    mapHint: "مرّر المؤشر فوق دولة مضيئة لعرض بطاقة حالتها",
    list: {
      title: "كل الدول",
      lead: "ابحث وصفِّ — القائمة نفسها التي تُدار من لوحة الإدارة، كما يراها الزائر.",
      searchPlaceholder: "ابحث باسم الدولة…",
      allStatuses: "الكل",
      columns: { country: "الدولة", region: "الإقليم", status: "الحالة", indicators: "المؤشرات", grade: "درجة الصفحة", updated: "التحديث" },
      emptyResult: "لا توجد دولة تطابق هذا البحث.",
      previewNote: "في هذه المعاينة، صفحة تركيا هي المفعّلة كنموذج لصفحة الدولة.",
      openPage: "افتح الصفحة",
    },
  },
};
