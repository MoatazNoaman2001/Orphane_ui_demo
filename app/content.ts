export type Lang = "en" | "ar";

export interface Dict {
  dir: "ltr" | "rtl";
  langLabel: string;
  switchTo: string;
  nav: { rule: string; pipeline: string; countries: string; platform: string; cta: string };
  hero: {
    kicker: string;
    org: string;
    headline1: string;
    headline2: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    firstRelease: string;
  };
  stats: { value: string; label: string; chip: string }[];
  tickerNote: string;
  ticker: { text: string; tone: "ok" | "warn" | "gap" | "info" }[];
  rule: {
    no: string;
    title: string;
    lead: string;
    cardTitle: string;
    indicator: string;
    valueNote: string;
    chips: { source: string; year: string; grade: string };
    chipValues: { source: string; year: string; grade: string };
    statusOk: string;
    statusBad: string;
    hint: string;
    gradesTitle: string;
    grades: { g: string; label: string }[];
  };
  pipeline: {
    no: string;
    title: string;
    lead: string;
    steps: string[];
    gate: string;
  };
  countries: {
    no: string;
    title: string;
    lead: string;
    states: { tag: string; name: string; desc: string }[];
    gapNote: string;
  };
  platform: {
    no: string;
    title: string;
    lead: string;
    features: { name: string; desc: string }[];
  };
  guarantees: string[];
  cta: {
    title: string;
    sub: string;
    button: string;
    secondary: string;
  };
  footer: { rights: string; tagline: string; bilingual: string };
}

export const content: Record<Lang, Dict> = {
  en: {
    dir: "ltr",
    langLabel: "EN",
    switchTo: "العربية",
    nav: {
      rule: "The Rule",
      pipeline: "Review",
      countries: "Countries",
      platform: "Platform",
      cta: "Partner Access",
    },
    hero: {
      kicker: "Orphan Data Observatory",
      org: "Orphans Care Federation",
      headline1: "Every number has a source.",
      headline2: "Every source has a grade.",
      sub: "A bilingual observatory of aggregated, non-personal data about orphans worldwide — submitted by partners, reviewed by the Federation, and published only after approval.",
      ctaPrimary: "Explore the Observatory",
      ctaSecondary: "Read the methodology",
      firstRelease: "First Release · 2026",
    },
    stats: [
      { value: "0", label: "personal data fields — ever", chip: "BY DESIGN" },
      { value: "100%", label: "of numbers carry source + year", chip: "VALIDATED" },
      { value: "A–E", label: "confidence grade on every figure", chip: "CLASSIFIED" },
      { value: "2", label: "languages, one platform", chip: "AR · EN" },
    ],
    tickerNote: "Illustrative feed — no live data is shown before Federation approval",
    ticker: [
      { text: "JO · Country page · PUBLISHED", tone: "ok" },
      { text: "SY · 14 indicators · IN REVIEW", tone: "warn" },
      { text: "YE · Country page · IN PREPARATION", tone: "info" },
      { text: "SO · Registered orphans · GRADE B", tone: "ok" },
      { text: "PS · Sources library · 8 ATTACHED", tone: "info" },
      { text: "IQ · Data gap declared · AWAITING PARTNER", tone: "gap" },
      { text: "LB · Indicator approved · GRADE A", tone: "ok" },
      { text: "SD · Submission triaged · METHODOLOGICAL REVIEW", tone: "warn" },
      { text: "EG · Export ready · CSV / XLSX", tone: "info" },
      { text: "MA · Audit trail · 0 UNTRACED CHANGES", tone: "ok" },
    ],
    rule: {
      no: "§01",
      title: "The founding rule",
      lead: "Nothing enters the Observatory as a bare number. Each figure carries an identity card — its source, its year, its confidence grade. Remove any one of them, and the system refuses to save it.",
      cardTitle: "INDICATOR IDENTITY CARD",
      indicator: "Registered orphans — national total",
      valueNote: "aggregated · non-personal",
      chips: { source: "SOURCE", year: "YEAR", grade: "GRADE" },
      chipValues: { source: "Ministry of Social Affairs", year: "2024", grade: "B" },
      statusOk: "VALID — eligible for review",
      statusBad: "REJECTED — a number without its identity cannot be saved",
      hint: "Try it: click a chip to strip it from the record.",
      gradesTitle: "The confidence scale",
      grades: [
        { g: "A", label: "Verified by multiple independent sources" },
        { g: "B", label: "Official source, recent year" },
        { g: "C", label: "Single credible source" },
        { g: "D", label: "Dated figures or partial coverage" },
        { g: "E", label: "Preliminary estimate — under review" },
      ],
    },
    pipeline: {
      no: "§02",
      title: "No number goes public unreviewed",
      lead: "Partners submit through a restricted portal. The Federation triages, reviews methodology, requests edits, classifies confidence, and approves — only then does anything publish.",
      steps: [
        "Submit",
        "Triage",
        "Methodological review",
        "Edit-request loop",
        "Confidence classification",
        "Internal approval",
        "Publish",
      ],
      gate: "FEDERATION GATE — publishing is blocked before approval",
    },
    countries: {
      no: "§03",
      title: "Countries tell the truth about their data",
      lead: "Every country page uses one unified template with an honest status — including admitting when the data simply isn't there yet.",
      states: [
        { tag: "PUBLISHED", name: "Published", desc: "Reviewed, classified, approved. Visible to the world with full source attribution." },
        { tag: "IN_PREP", name: "In preparation", desc: "Data is being gathered and reviewed with partner organizations on the ground." },
        { tag: "DATA_GAP", name: "Data gap", desc: "No reliable figures yet — and the page says so, instead of inventing numbers." },
        { tag: "INTERNAL", name: "Internal", desc: "Held for Federation use only. Public and internal views are strictly separated." },
      ],
      gapNote: "“A declared data gap is more honest than an invented number.”",
    },
    platform: {
      no: "§04",
      title: "One platform, both directions",
      lead: "A public observatory for the world. A governed portal for partners. The Federation stands between them.",
      features: [
        { name: "Interactive map", desc: "Country-level humanitarian access mapping, built on open GeoJSON." },
        { name: "Indicator dashboards", desc: "Aggregated indicators with year, source, and grade on every data point." },
        { name: "Sources library", desc: "Every published figure links back to a documented, attachable source." },
        { name: "Partner portal", desc: "Scoped accounts — each organization sees and submits only its own data." },
        { name: "Audit log", desc: "No deletion without a trace. Every change is recorded, soft-deletes only." },
        { name: "Export & reports", desc: "Approved data exports to CSV / Excel for researchers and donors." },
      ],
    },
    guarantees: [
      "No personal data about children, families, or staff — at any point.",
      "Nothing publishes before Federation review and approval.",
      "No deletion without a trace.",
    ],
    cta: {
      title: "Built with the Federation, gate by gate.",
      sub: "Design approved before development. Data approved before publication. That is the whole idea.",
      button: "Request partner access",
      secondary: "First Release proposal · v2.1",
    },
    footer: {
      rights: "Orphans Care Federation",
      tagline: "Orphan Data Observatory & Humanitarian Access Mapping",
      bilingual: "Fully bilingual — Arabic (RTL) / English (LTR)",
    },
  },

  ar: {
    dir: "rtl",
    langLabel: "ع",
    switchTo: "English",
    nav: {
      rule: "القاعدة",
      pipeline: "المراجعة",
      countries: "الدول",
      platform: "المنصة",
      cta: "بوابة الشركاء",
    },
    hero: {
      kicker: "مرصد بيانات الأيتام",
      org: "اتحاد رعاية الأيتام",
      headline1: "لكلِّ رقمٍ مصدر.",
      headline2: "ولكلِّ مصدرٍ درجةُ ثقة.",
      sub: "مرصدٌ ثنائي اللغة لبياناتٍ مجمَّعة غير شخصية عن الأيتام حول العالم — يقدّمها الشركاء، ويراجعها الاتحاد، ولا تُنشَر إلا بعد الاعتماد.",
      ctaPrimary: "استكشف المرصد",
      ctaSecondary: "اقرأ المنهجية",
      firstRelease: "الإصدار الأول · ٢٠٢٦",
    },
    stats: [
      { value: "0", label: "حقول بيانات شخصية — أبدًا", chip: "بالتصميم" },
      { value: "100%", label: "من الأرقام لها مصدر وسنة", chip: "مُتحقَّق" },
      { value: "A–E", label: "درجة ثقة على كل رقم", chip: "مُصنَّف" },
      { value: "2", label: "لغتان، منصة واحدة", chip: "عربي · EN" },
    ],
    tickerNote: "شريط توضيحي — لا تُعرض بيانات حقيقية قبل اعتماد الاتحاد",
    ticker: [
      { text: "الأردن · صفحة الدولة · منشورة", tone: "ok" },
      { text: "سوريا · ١٤ مؤشرًا · قيد المراجعة", tone: "warn" },
      { text: "اليمن · صفحة الدولة · قيد الإعداد", tone: "info" },
      { text: "الصومال · الأيتام المسجّلون · درجة B", tone: "ok" },
      { text: "فلسطين · مكتبة المصادر · ٨ مرفقات", tone: "info" },
      { text: "العراق · فجوة بيانات مُعلنة · بانتظار الشريك", tone: "gap" },
      { text: "لبنان · مؤشر معتمد · درجة A", tone: "ok" },
      { text: "السودان · فرز التقديم · مراجعة منهجية", tone: "warn" },
      { text: "مصر · جاهز للتصدير · CSV / XLSX", tone: "info" },
      { text: "المغرب · سجل التدقيق · صفر تغييرات دون أثر", tone: "ok" },
    ],
    rule: {
      no: "§٠١",
      title: "القاعدة التأسيسية",
      lead: "لا يدخل المرصدَ رقمٌ مجرّد. كل رقمٍ يحمل بطاقة هوية — مصدره، وسنته، ودرجة ثقته. انزع أيًّا منها، ويرفض النظام حفظه.",
      cardTitle: "بطاقة هوية المؤشر",
      indicator: "الأيتام المسجّلون — الإجمالي الوطني",
      valueNote: "مجمَّع · غير شخصي",
      chips: { source: "المصدر", year: "السنة", grade: "الدرجة" },
      chipValues: { source: "وزارة الشؤون الاجتماعية", year: "٢٠٢٤", grade: "B" },
      statusOk: "صالح — مؤهَّل للمراجعة",
      statusBad: "مرفوض — رقمٌ بلا هوية لا يُحفَظ",
      hint: "جرّبها: انقر على أي بطاقة لنزعها من السجل.",
      gradesTitle: "سلّم الثقة",
      grades: [
        { g: "A", label: "موثَّق من مصادر مستقلة متعددة" },
        { g: "B", label: "مصدر رسمي وسنة حديثة" },
        { g: "C", label: "مصدر واحد موثوق" },
        { g: "D", label: "أرقام قديمة أو تغطية جزئية" },
        { g: "E", label: "تقدير أولي — قيد المراجعة" },
      ],
    },
    pipeline: {
      no: "§٠٢",
      title: "لا رقم يُنشَر دون مراجعة",
      lead: "يقدّم الشركاء بياناتهم عبر بوابة مقيَّدة. يفرز الاتحاد، ويراجع المنهجية، ويطلب التعديلات، ويصنّف الثقة، ثم يعتمد — وعندها فقط يُنشَر أي شيء.",
      steps: [
        "التقديم",
        "الفرز",
        "المراجعة المنهجية",
        "حلقة طلب التعديل",
        "تصنيف الثقة",
        "الاعتماد الداخلي",
        "النشر",
      ],
      gate: "بوابة الاتحاد — النشر محجوب قبل الاعتماد",
    },
    countries: {
      no: "§٠٣",
      title: "الدول تقول الحقيقة عن بياناتها",
      lead: "كل صفحة دولة تستخدم قالبًا موحّدًا بحالةٍ صادقة — بما في ذلك الاعتراف حين لا تتوفر البيانات بعد.",
      states: [
        { tag: "منشور", name: "منشور", desc: "روجِع وصُنِّف واعتُمِد. مرئي للعالم مع إسنادٍ كامل للمصادر." },
        { tag: "قيد الإعداد", name: "قيد الإعداد", desc: "البيانات تُجمَع وتُراجَع مع المنظمات الشريكة في الميدان." },
        { tag: "فجوة بيانات", name: "فجوة بيانات", desc: "لا أرقام موثوقة بعد — والصفحة تقول ذلك بدل اختراع الأرقام." },
        { tag: "داخلي", name: "داخلي", desc: "محفوظ لاستخدام الاتحاد فقط. فصلٌ صارم بين العرض العام والداخلي." },
      ],
      gapNote: "«فجوة بياناتٍ مُعلَنة أصدقُ من رقمٍ مُختلَق.»",
    },
    platform: {
      no: "§٠٤",
      title: "منصة واحدة، في الاتجاهين",
      lead: "مرصد عام للعالم. بوابة محوكمة للشركاء. والاتحاد يقف بينهما.",
      features: [
        { name: "خريطة تفاعلية", desc: "خرائط الوصول الإنساني على مستوى الدول، مبنية على GeoJSON مفتوح." },
        { name: "لوحات المؤشرات", desc: "مؤشرات مجمَّعة تحمل السنة والمصدر والدرجة على كل نقطة بيانات." },
        { name: "مكتبة المصادر", desc: "كل رقمٍ منشور يعود إلى مصدرٍ موثَّق قابلٍ للإرفاق." },
        { name: "بوابة الشركاء", desc: "حسابات مقيَّدة — كل منظمة ترى بياناتها وتقدّمها فقط." },
        { name: "سجل التدقيق", desc: "لا حذف دون أثر. كل تغيير مسجَّل، والحذف ناعم فقط." },
        { name: "التصدير والتقارير", desc: "تصدير البيانات المعتمدة إلى CSV / Excel للباحثين والمانحين." },
      ],
    },
    guarantees: [
      "لا بيانات شخصية عن الأطفال أو الأسر أو العاملين — في أي مرحلة.",
      "لا يُنشَر شيء قبل مراجعة الاتحاد واعتماده.",
      "لا حذف دون أثر.",
    ],
    cta: {
      title: "يُبنى مع الاتحاد، بوابةً بعد بوابة.",
      sub: "التصميم يُعتمَد قبل التطوير. والبيانات تُعتمَد قبل النشر. هذه هي الفكرة كلها.",
      button: "اطلب وصول الشركاء",
      secondary: "مقترح الإصدار الأول · v2.1",
    },
    footer: {
      rights: "اتحاد رعاية الأيتام",
      tagline: "مرصد بيانات الأيتام وخرائط الوصول الإنساني",
      bilingual: "ثنائي اللغة بالكامل — العربية (RTL) / الإنجليزية (LTR)",
    },
  },
};
