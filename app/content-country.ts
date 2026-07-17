import type { Lang } from "./content";

/*
 * Sample country page — Türkiye.
 * Every figure below is real: TÜİK "Children in Türkiye 2024" and the
 * Federation research file (batch 01). Grades are the research team's.
 */

export type PageState = "published" | "preparing" | "gap" | "internal";

export interface CountryIndicator {
  name: string;
  value: number | null;
  text?: string;
  unit?: string;
  year: number;
  grade: "A" | "B" | "C" | "D" | "E";
  source: string;
  note?: string;
}

export interface IndicatorGroup {
  key: string;
  title: string;
  desc: string;
  items: CountryIndicator[];
}

export interface CountryDict {
  backToObservatory: string;
  nav: { overview: string; indicators: string; sources: string; partners: string };
  demoBar: {
    label: string;
    note: string;
    states: Record<PageState, string>;
  };
  hero: {
    name: string;
    region: string;
    entity: string;
    pageGradeLabel: string;
    lastUpdated: string;
    lastUpdatedValue: string;
    statusLabels: Record<PageState, string>;
  };
  summaryTitle: string;
  summary: string;
  mapCard: { title: string; caption: string };
  identityNote: string;
  indicatorsTitle: string;
  indicatorsLead: string;
  groups: IndicatorGroup[];
  gapGroups: { key: string; title: string; desc: string }[];
  gapCard: { badge: string; message: string };
  historical: { title: string; badge: string; note: string };
  partners: {
    title: string;
    lead: string;
    anonymousName: string;
    anonymousNote: string;
    visibilityNote: string;
  };
  sourcesTitle: string;
  sourcesLead: string;
  sources: { name: string; type: string; year: number; grade: "A" | "B" | "C" | "D" | "E" }[];
  columns: { source: string; type: string; year: string; grade: string };
  gapState: {
    title: string;
    message: string;
    sub: string;
  };
  internalState: {
    title: string;
    message: string;
  };
  preparingState: {
    title: string;
    message: string;
  };
  footer: { methodologyNote: string; updatedLabel: string };
}

export const countryContent: Record<Lang, CountryDict> = {
  en: {
    backToObservatory: "Observatory",
    nav: { overview: "Overview", indicators: "Indicators", sources: "Sources", partners: "Partners" },
    demoBar: {
      label: "PAGE STATE",
      note: "One unified template for every country. Switch the state to see exactly what a visitor sees in each case — the Federation sets it from the admin panel.",
      states: {
        published: "Published",
        preparing: "In preparation",
        gap: "Data gap",
        internal: "Internal",
      },
    },
    hero: {
      name: "Türkiye",
      region: "Eastern Europe",
      entity: "COUNTRY",
      pageGradeLabel: "Page confidence",
      lastUpdated: "Last updated",
      lastUpdatedValue: "July 2026",
      statusLabels: {
        published: "PUBLISHED",
        preparing: "IN PREPARATION",
        gap: "DATA GAP",
        internal: "INTERNAL",
      },
    },
    summaryTitle: "Summary",
    summary:
      "Türkiye publishes recent official data on children who have lost a father, a mother, or both parents — a rarity in the region. TÜİK's Children in Türkiye 2024 provides the primary indicators, alongside official figures on institutional and foster family care. The Federation research team assigned this page an overall confidence of A, with official Turkish statistics adopted as the leading source.",
    mapCard: {
      title: "Location",
      caption: "Country-level view · sub-regions can be added later without a rebuild",
    },
    identityNote: "Every figure carries its identity card — source, year, and confidence grade. Figures are never merged automatically.",
    indicatorsTitle: "Indicators",
    indicatorsLead: "Grouped by data type, exactly as the methodology separates them: need, coverage, sponsorship, care quality, and institutional capacity are never mixed.",
    groups: [
      {
        key: "need",
        title: "Need indicators",
        desc: "Population context and orphanhood — the scale of the need.",
        items: [
          {
            name: "Children (0–17), total",
            value: 21_817_061,
            year: 2024,
            grade: "A",
            source: "TÜİK · Children in Türkiye 2024",
            note: "Population denominator — not an orphan count on its own.",
          },
          {
            name: "Children whose father has died",
            value: 258_515,
            year: 2024,
            grade: "A",
            source: "TÜİK · Children in Türkiye 2024",
          },
          {
            name: "Children whose mother has died",
            value: 81_373,
            year: 2024,
            grade: "A",
            source: "TÜİK · Children in Türkiye 2024",
          },
          {
            name: "Children who lost both parents",
            value: 5_276,
            year: 2024,
            grade: "A",
            source: "TÜİK · Children in Türkiye 2024",
          },
        ],
      },
      {
        key: "coverage",
        title: "Coverage indicators",
        desc: "Children reached by formal alternative care.",
        items: [
          {
            name: "Children in institutional care",
            value: 15_135,
            year: 2024,
            grade: "A",
            source: "TÜİK · Ministry of Family and Social Services",
          },
          {
            name: "Children in foster family care",
            value: 10_430,
            year: 2024,
            grade: "A",
            source: "TÜİK · Ministry of Family and Social Services",
          },
        ],
      },
    ],
    gapGroups: [
      { key: "sponsorship", title: "Sponsorship indicators", desc: "Sponsorship cases, value, and regularity" },
      { key: "quality", title: "Care quality indicators", desc: "Service coverage, follow-up, child protection" },
      { key: "capacity", title: "Institutional capacity", desc: "Staff, specialists, supervisor-to-orphan ratios" },
    ],
    gapCard: {
      badge: "E · DATA GAP",
      message: "No approved figures yet for this group. The gap is declared — not papered over.",
    },
    historical: {
      title: "Historical context",
      badge: "HISTORICAL · NOT CURRENT",
      note: "The Yetim 2021 report is kept as historical context only. Its figures are never merged with current values and never publish as current data.",
    },
    partners: {
      title: "Partner organizations",
      lead: "Organizations working in this country appear only if the Federation decides to publish them.",
      anonymousName: "Partner organization",
      anonymousNote: "Name withheld by Federation decision — the internal link remains.",
      visibilityNote: "Public name · anonymous · internal — three visibility levels, controlled per organization.",
    },
    sourcesTitle: "Sources for this page",
    sourcesLead: "Every published figure above links back to one of these documented sources.",
    sources: [
      { name: "TÜİK — Children in Türkiye 2024", type: "Official statistics", year: 2024, grade: "A" },
      { name: "TÜİK / Ministry of Family and Social Services", type: "Administrative records", year: 2024, grade: "A" },
      { name: "UNICEF/UNAIDS Orphanhood Estimates 2025", type: "International estimate", year: 2025, grade: "A" },
      { name: "Yetim Report 2021", type: "Historical reference", year: 2021, grade: "C" },
    ],
    columns: { source: "Source", type: "Type", year: "Year", grade: "Grade" },
    gapState: {
      title: "Türkiye",
      message: "Sufficient reliable data for publication is not yet available for this country. The Federation is actively collecting and reviewing data.",
      sub: "This is the official data-gap statement — shown instead of invented numbers.",
    },
    internalState: {
      title: "This page is internal",
      message: "Approved for Federation use only. Visitors see no trace of it — public and internal are strictly separated.",
    },
    preparingState: {
      title: "This page is in preparation",
      message: "Data is being gathered and reviewed with partners. The page publishes only when the Federation approves it.",
    },
    footer: {
      methodologyNote: "Methodology note: figures are tied to their sources and are never merged automatically. Estimates from different sources may not be comparable.",
      updatedLabel: "Page last updated",
    },
  },

  ar: {
    backToObservatory: "المرصد",
    nav: { overview: "نظرة عامة", indicators: "المؤشرات", sources: "المصادر", partners: "الشركاء" },
    demoBar: {
      label: "حالة الصفحة",
      note: "قالب موحّد لكل الدول. بدّل الحالة لترى ما يراه الزائر تمامًا في كل حالة — ويضبطها الاتحاد من لوحة الإدارة.",
      states: {
        published: "منشورة",
        preparing: "قيد التجهيز",
        gap: "فجوة بيانات",
        internal: "داخلية",
      },
    },
    hero: {
      name: "تركيا",
      region: "شرق أوروبا",
      entity: "دولة",
      pageGradeLabel: "درجة ثقة الصفحة",
      lastUpdated: "آخر تحديث",
      lastUpdatedValue: "يوليو 2026",
      statusLabels: {
        published: "منشورة",
        preparing: "قيد التجهيز",
        gap: "فجوة بيانات",
        internal: "داخلية",
      },
    },
    summaryTitle: "ملخص",
    summary:
      "تتميّز تركيا بوجود بيانات رسمية حديثة عن الأطفال فاقدي الأب أو الأم أو كليهما — وهو أمر نادر في المنطقة. يوفّر تقرير TÜİK «الأطفال في تركيا 2024» المؤشرات الرئيسية، إلى جانب أرقام رسمية عن الرعاية المؤسسية والرعاية الأسرية البديلة. وقد منح فريق البحث في الاتحاد هذه الصفحة درجة ثقة عامة A، مع اعتماد الإحصاءات التركية الرسمية مصدرًا أعلى موثوقية.",
    mapCard: {
      title: "الموقع",
      caption: "عرض على مستوى الدولة · يمكن إضافة مناطق فرعية لاحقًا دون إعادة بناء",
    },
    identityNote: "كل رقم يحمل بطاقة هويته — المصدر والسنة ودرجة الثقة. ولا تُدمج الأرقام تلقائيًا أبدًا.",
    indicatorsTitle: "المؤشرات",
    indicatorsLead: "مصنّفة حسب نوع البيانات كما تفصلها المنهجية تمامًا: الاحتياج والتغطية والكفالة وجودة الرعاية والقدرة المؤسسية لا تُخلط أبدًا.",
    groups: [
      {
        key: "need",
        title: "مؤشرات الاحتياج",
        desc: "السياق السكاني واليُتم — حجم الاحتياج.",
        items: [
          {
            name: "عدد الأطفال (0–17)",
            value: 21_817_061,
            year: 2024,
            grade: "A",
            source: "TÜİK · الأطفال في تركيا 2024",
            note: "مقام سكاني — لا يمثّل عدد الأيتام بمفرده.",
          },
          {
            name: "أطفال توفي والدهم",
            value: 258_515,
            year: 2024,
            grade: "A",
            source: "TÜİK · الأطفال في تركيا 2024",
          },
          {
            name: "أطفال توفيت والدتهم",
            value: 81_373,
            year: 2024,
            grade: "A",
            source: "TÜİK · الأطفال في تركيا 2024",
          },
          {
            name: "أطفال توفي كلا الوالدين",
            value: 5_276,
            year: 2024,
            grade: "A",
            source: "TÜİK · الأطفال في تركيا 2024",
          },
        ],
      },
      {
        key: "coverage",
        title: "مؤشرات التغطية",
        desc: "الأطفال المشمولون بالرعاية البديلة الرسمية.",
        items: [
          {
            name: "أطفال في الرعاية المؤسسية",
            value: 15_135,
            year: 2024,
            grade: "A",
            source: "TÜİK · وزارة الأسرة والخدمات الاجتماعية",
          },
          {
            name: "أطفال في الرعاية الأسرية / الحاضنة",
            value: 10_430,
            year: 2024,
            grade: "A",
            source: "TÜİK · وزارة الأسرة والخدمات الاجتماعية",
          },
        ],
      },
    ],
    gapGroups: [
      { key: "sponsorship", title: "مؤشرات الكفالة", desc: "حالات الكفالة وقيمتها وانتظامها" },
      { key: "quality", title: "مؤشرات جودة الرعاية", desc: "شمول الخدمات والمتابعة وحماية الطفل" },
      { key: "capacity", title: "القدرة المؤسسية", desc: "العاملون والأخصائيون ونسب المشرفين إلى الأيتام" },
    ],
    gapCard: {
      badge: "E · فجوة بيانات",
      message: "لا أرقام معتمدة بعد لهذه المجموعة. الفجوة مُعلنة — لا مُتجاوَزة.",
    },
    historical: {
      title: "السياق التاريخي",
      badge: "تاريخي · ليس حاليًا",
      note: "يُحفظ تقرير Yetim 2021 كسياق تاريخي فقط. لا تُدمج أرقامه مع القيم الحالية، ولا تُنشر كبيانات حالية أبدًا.",
    },
    partners: {
      title: "المؤسسات الشريكة",
      lead: "تظهر المؤسسات العاملة في هذه الدولة فقط إذا قرر الاتحاد نشرها.",
      anonymousName: "مؤسسة شريكة",
      anonymousNote: "الاسم محجوب بقرار الاتحاد — مع بقاء الربط الداخلي.",
      visibilityNote: "اسم علني · مجهول · داخلي — ثلاثة مستويات ظهور، تُضبط لكل مؤسسة.",
    },
    sourcesTitle: "مصادر هذه الصفحة",
    sourcesLead: "كل رقم منشور أعلاه يعود إلى أحد هذه المصادر الموثّقة.",
    sources: [
      { name: "TÜİK — الأطفال في تركيا 2024", type: "إحصاء رسمي", year: 2024, grade: "A" },
      { name: "TÜİK / وزارة الأسرة والخدمات الاجتماعية", type: "سجلات إدارية", year: 2024, grade: "A" },
      { name: "تقديرات اليُتم UNICEF/UNAIDS 2025", type: "تقدير دولي", year: 2025, grade: "A" },
      { name: "تقرير Yetim 2021", type: "مرجع تاريخي", year: 2021, grade: "C" },
    ],
    columns: { source: "المصدر", type: "النوع", year: "السنة", grade: "الدرجة" },
    gapState: {
      title: "تركيا",
      message: "لا تتوفر حاليًا بيانات كافية موثوقة للنشر حول هذه الدولة، ويعمل الاتحاد على جمع البيانات ومراجعتها.",
      sub: "هذه هي عبارة فجوة البيانات الرسمية — تظهر بدل اختراع الأرقام.",
    },
    internalState: {
      title: "هذه الصفحة داخلية",
      message: "معتمدة لاستخدام الاتحاد فقط. لا يرى الزائر أي أثر لها — فصل صارم بين العام والداخلي.",
    },
    preparingState: {
      title: "هذه الصفحة قيد التجهيز",
      message: "البيانات تُجمع وتُراجع مع الشركاء. ولا تُنشر الصفحة إلا بعد اعتماد الاتحاد.",
    },
    footer: {
      methodologyNote: "ملاحظة منهجية: الأرقام مرتبطة بمصادرها ولا تُدمج تلقائيًا. التقديرات من مصادر مختلفة قد لا تكون قابلة للمقارنة.",
      updatedLabel: "آخر تحديث للصفحة",
    },
  },
};
