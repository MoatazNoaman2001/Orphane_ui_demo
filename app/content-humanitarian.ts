import type { Lang } from "./content";

/*
 * Direction 03 — Humanitarian Light.
 * Warm, light, charity-sector language: the page describes the product,
 * its services per audience, and its results — not the system's mechanics.
 * Structure informed by UNICEF Data, HDX, Our World in Data, Islamic Relief.
 */

export interface HumanDict {
  nav: { services: string; countries: string; updates: string; methodology: string; cta: string };
  hero: {
    org: string;
    title1: string;
    title2: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    imageNote: string;
  };
  counters: { value: string; label: string }[];
  countersNote: string;
  services: {
    title: string;
    lead: string;
    items: { audience: string; what: string; link: string; href: string }[];
  };
  countries: {
    title: string;
    lead: string;
    cta: string;
    statusLabels: { pub: string; prep: string; gap: string };
    items: { name: string; status: "pub" | "prep" | "gap"; grade: string | null; note: string }[];
  };
  updates: {
    title: string;
    lead: string;
    items: { tag: string; title: string; date: string; imageNote: string }[];
  };
  trust: {
    title: string;
    lead: string;
    steps: { title: string; desc: string }[];
    link: string;
  };
  partners: {
    title: string;
    lead: string;
    joinTitle: string;
    joinDesc: string;
    joinCta: string;
    logoNote: string;
  };
  footer: {
    mission: string;
    linksTitle: string;
    links: { label: string; href: string }[];
    rights: string;
  };
  placeholderTag: string;
}

export const humanContent: Record<Lang, HumanDict> = {
  en: {
    nav: {
      services: "What we offer",
      countries: "Countries",
      updates: "Latest",
      methodology: "Methodology",
      cta: "Partner portal",
    },
    hero: {
      org: "Orphans Care Federation",
      title1: "Trusted data,",
      title2: "for the world's orphans.",
      sub: "The Observatory gathers verified, non-personal data about orphans in 193 countries — so organizations, researchers, and donors can act where the need is real.",
      ctaPrimary: "Explore the countries",
      ctaSecondary: "How we verify data",
      imageNote: "Warm photo: caring hands / light through a window — never children's faces",
    },
    counters: [
      { value: "193", label: "countries in scope" },
      { value: "80", label: "country files prepared" },
      { value: "151", label: "indicators tracked" },
      { value: "363", label: "documented sources" },
    ],
    countersNote: "Live figures from the observatory database.",
    services: {
      title: "What the Observatory offers",
      lead: "One platform, serving everyone who works for orphans:",
      items: [
        {
          audience: "For researchers & media",
          what: "Country profiles with graded, sourced indicators — and approved data exports (CSV / Excel) you can cite with confidence.",
          link: "Browse country data",
          href: "/designs/observatory/countries",
        },
        {
          audience: "For donors & supporters",
          what: "See where the need is documented and where the data gaps are — every number carries its source, year, and confidence grade.",
          link: "See the indicators",
          href: "/designs/observatory/indicators",
        },
        {
          audience: "For partner organizations",
          what: "A private portal to contribute your aggregated figures, track their review, and be recognized for your work on the ground.",
          link: "About the partner portal",
          href: "/designs/observatory/access",
        },
        {
          audience: "For the Federation's decisions",
          what: "A single reviewed evidence base: which countries are covered, which need partners, and where to direct effort next.",
          link: "Read the methodology",
          href: "/designs/observatory/methodology",
        },
      ],
    },
    countries: {
      title: "Explore by country",
      lead: "Every country has its own page — and an honest status. When reliable data doesn't exist yet, the page says so.",
      cta: "All countries & map",
      statusLabels: { pub: "Published", prep: "In preparation", gap: "Data gap" },
      items: [
        { name: "Türkiye", status: "pub", grade: "A", note: "Official TÜİK figures, 2024" },
        { name: "Jordan", status: "pub", grade: "B", note: "14 indicators published" },
        { name: "Palestine", status: "pub", grade: "B", note: "12 indicators published" },
        { name: "Egypt", status: "pub", grade: "B", note: "2.1M children lost a parent (2024)" },
        { name: "Syria", status: "prep", grade: null, note: "Under review with partners" },
        { name: "Yemen", status: "gap", grade: null, note: "Seeking reporting partners" },
      ],
    },
    updates: {
      title: "Latest from the Observatory",
      lead: "What was published, updated, or released recently.",
      items: [
        { tag: "Country page", title: "Türkiye published with grade A — official 2024 statistics", date: "July 2026", imageNote: "Photo: Türkiye landscape / city — no people" },
        { tag: "Report", title: "Children in Türkiye 2024 — country brief now available", date: "June 2026", imageNote: "Report cover thumbnail" },
        { tag: "Data update", title: "80 country files imported and under verification", date: "June 2026", imageNote: "Abstract data illustration — warm tones" },
      ],
    },
    trust: {
      title: "Why you can trust these numbers",
      lead: "Three rules govern everything the Observatory publishes:",
      steps: [
        { title: "Every number has an identity", desc: "A source, a year, and a confidence grade (A–E) — or the system refuses to save it." },
        { title: "Nothing publishes unreviewed", desc: "Every figure passes the Federation's review path before any visitor sees it." },
        { title: "Gaps are declared, never hidden", desc: "Where reliable data doesn't exist, we say so — honestly and publicly." },
      ],
      link: "Read the full methodology",
    },
    partners: {
      title: "Built with partner organizations",
      lead: "Organizations working on the ground contribute their aggregated figures — reviewed, protected, and credited the way each partner chooses.",
      joinTitle: "Does your organization work with orphans?",
      joinDesc: "Join the Observatory's partners: contribute your data through a private portal, and help the world see the need clearly.",
      joinCta: "Request partner access",
      logoNote: "Partner logo",
    },
    footer: {
      mission: "The Orphan Data Observatory — verified, non-personal data about orphans worldwide, published by the Orphans Care Federation.",
      linksTitle: "Quick links",
      links: [
        { label: "Countries", href: "/designs/observatory/countries" },
        { label: "Indicators", href: "/designs/observatory/indicators" },
        { label: "Sources library", href: "/designs/observatory/sources" },
        { label: "Reports", href: "/designs/observatory/reports" },
        { label: "Methodology", href: "/designs/observatory/methodology" },
      ],
      rights: "Orphans Care Federation",
    },
    placeholderTag: "IMAGE PLACEHOLDER",
  },
  ar: {
    nav: {
      services: "ماذا نقدّم",
      countries: "الدول",
      updates: "الجديد",
      methodology: "المنهجية",
      cta: "بوابة الشركاء",
    },
    hero: {
      org: "اتحاد رعاية الأيتام",
      title1: "بيانات موثوقة،",
      title2: "من أجل أيتام العالم.",
      sub: "يجمع المرصد بيانات موثّقة غير شخصية عن الأيتام في 193 دولة — لتعمل المؤسسات والباحثون والمانحون حيث الاحتياج حقيقي.",
      ctaPrimary: "استكشف الدول",
      ctaSecondary: "كيف نوثّق البيانات",
      imageNote: "صورة دافئة: أيادٍ متعاونة / ضوء من نافذة — دون وجوه أطفال أبدًا",
    },
    counters: [
      { value: "193", label: "دولة ضمن النطاق" },
      { value: "80", label: "ملفًا قُطريًا جاهزًا" },
      { value: "151", label: "مؤشرًا مُتابَعًا" },
      { value: "363", label: "مصدرًا موثّقًا" },
    ],
    countersNote: "أرقام حيّة من قاعدة بيانات المرصد.",
    services: {
      title: "ماذا يقدّم المرصد",
      lead: "منصة واحدة تخدم كل من يعمل لأجل الأيتام:",
      items: [
        {
          audience: "للباحثين والإعلاميين",
          what: "ملفات قُطرية بمؤشرات مصنّفة وموثّقة المصدر — وتصدير للبيانات المعتمدة (CSV / Excel) تقتبسه بثقة.",
          link: "تصفّح بيانات الدول",
          href: "/designs/observatory/countries",
        },
        {
          audience: "للمانحين والداعمين",
          what: "اعرف أين الاحتياج موثّق وأين فجوات البيانات — كل رقم يحمل مصدره وسنته ودرجة ثقته.",
          link: "اطّلع على المؤشرات",
          href: "/designs/observatory/indicators",
        },
        {
          audience: "للمؤسسات الشريكة",
          what: "بوابة خاصة تقدّمون عبرها أرقامكم المجمّعة، وتتابعون مراجعتها، ويُعترف بعملكم الميداني.",
          link: "عن بوابة الشركاء",
          href: "/designs/observatory/access",
        },
        {
          audience: "لقرارات الاتحاد",
          what: "قاعدة أدلة مُراجَعة واحدة: أي الدول مغطاة، وأيها يحتاج شركاء، وأين يتّجه الجهد تاليًا.",
          link: "اقرأ المنهجية",
          href: "/designs/observatory/methodology",
        },
      ],
    },
    countries: {
      title: "استكشف حسب الدولة",
      lead: "لكل دولة صفحتها — وحالتها الصادقة. وحين لا توجد بيانات موثوقة بعد، تقول الصفحة ذلك.",
      cta: "كل الدول والخريطة",
      statusLabels: { pub: "منشورة", prep: "قيد الإعداد", gap: "فجوة بيانات" },
      items: [
        { name: "تركيا", status: "pub", grade: "A", note: "أرقام TÜİK الرسمية، 2024" },
        { name: "الأردن", status: "pub", grade: "B", note: "14 مؤشرًا منشورًا" },
        { name: "فلسطين", status: "pub", grade: "B", note: "12 مؤشرًا منشورًا" },
        { name: "مصر", status: "pub", grade: "B", note: "2.1 مليون طفل فقدوا أحد الوالدين (2024)" },
        { name: "سوريا", status: "prep", grade: null, note: "قيد المراجعة مع الشركاء" },
        { name: "اليمن", status: "gap", grade: null, note: "نبحث عن شركاء إبلاغ" },
      ],
    },
    updates: {
      title: "جديد المرصد",
      lead: "ما نُشر أو حُدّث أو صدر مؤخرًا.",
      items: [
        { tag: "صفحة دولة", title: "نُشرت صفحة تركيا بدرجة A — إحصاءات رسمية 2024", date: "يوليو 2026", imageNote: "صورة: طبيعة/مدينة تركية — دون أشخاص" },
        { tag: "تقرير", title: "الأطفال في تركيا 2024 — الموجز القُطري متاح الآن", date: "يونيو 2026", imageNote: "صورة مصغّرة لغلاف التقرير" },
        { tag: "تحديث بيانات", title: "استيراد 80 ملفًا قُطريًا ودخولها طور التحقق", date: "يونيو 2026", imageNote: "رسم تجريدي دافئ للبيانات" },
      ],
    },
    trust: {
      title: "لماذا تثق بهذه الأرقام",
      lead: "ثلاث قواعد تحكم كل ما ينشره المرصد:",
      steps: [
        { title: "لكل رقم هوية", desc: "مصدر وسنة ودرجة ثقة (A–E) — وإلا رفض النظام حفظه." },
        { title: "لا نشر دون مراجعة", desc: "كل رقم يمرّ بمسار مراجعة الاتحاد قبل أن يراه أي زائر." },
        { title: "الفجوات تُعلَن ولا تُخفى", desc: "حيث لا توجد بيانات موثوقة، نقول ذلك — بصدق وعلنًا." },
      ],
      link: "اقرأ المنهجية كاملة",
    },
    partners: {
      title: "يُبنى مع المؤسسات الشريكة",
      lead: "المؤسسات العاملة في الميدان تساهم بأرقامها المجمّعة — تُراجَع وتُحمى ويُنسب الفضل كما تختار كل مؤسسة.",
      joinTitle: "هل تعمل مؤسستك مع الأيتام؟",
      joinDesc: "انضموا إلى شركاء المرصد: قدّموا بياناتكم عبر بوابة خاصة، وساعدوا العالم أن يرى الاحتياج بوضوح.",
      joinCta: "اطلب وصول الشركاء",
      logoNote: "شعار شريك",
    },
    footer: {
      mission: "مرصد بيانات الأيتام — بيانات موثّقة غير شخصية عن الأيتام حول العالم، ينشرها اتحاد رعاية الأيتام.",
      linksTitle: "روابط سريعة",
      links: [
        { label: "الدول", href: "/designs/observatory/countries" },
        { label: "المؤشرات", href: "/designs/observatory/indicators" },
        { label: "مكتبة المصادر", href: "/designs/observatory/sources" },
        { label: "التقارير", href: "/designs/observatory/reports" },
        { label: "المنهجية", href: "/designs/observatory/methodology" },
      ],
      rights: "اتحاد رعاية الأيتام",
    },
    placeholderTag: "موضع صورة",
  },
};
