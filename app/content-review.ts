import type { Lang } from "./content";

/*
 * Admin — submission review. The 10-stage review path exactly as the client
 * specified it (مسار مراجعة البيانات), interactive: the client can advance a
 * demo submission through the whole journey. Names and figures follow the
 * Lebanon example from the approved flow document.
 */

export type Actor = "partner" | "team" | "manager";

/** demo stage keys, in path order */
export type StageKey =
  | "draft"
  | "submitted"
  | "triage"
  | "method"
  | "changes"
  | "resubmitted"
  | "grade"
  | "approved"
  | "published"
  | "closed";

export interface Stage {
  key: StageKey;
  en: string;
  ar: string;
  actor: Actor;
}

export const STAGES: Stage[] = [
  { key: "draft", en: "Draft", ar: "مسودة", actor: "partner" },
  { key: "submitted", en: "Sent for review", ar: "مرسلة للمراجعة", actor: "partner" },
  { key: "triage", en: "Initial triage", ar: "فرز أولي", actor: "team" },
  { key: "method", en: "Methodological review", ar: "مراجعة منهجية", actor: "team" },
  { key: "changes", en: "Changes requested", ar: "طلب تعديل", actor: "team" },
  { key: "resubmitted", en: "Resubmitted", ar: "إعادة إرسال", actor: "partner" },
  { key: "grade", en: "Confidence classification", ar: "تصنيف درجة الثقة", actor: "team" },
  { key: "approved", en: "Internal approval", ar: "اعتماد داخلي", actor: "manager" },
  { key: "published", en: "Publish / internal use", ar: "نشر عام أو استخدام داخلي", actor: "manager" },
  { key: "closed", en: "Reject / archive", ar: "رفض أو أرشفة", actor: "manager" },
];

export interface DemoItem {
  indicatorEn: string;
  indicatorAr: string;
  value: number;
  year: number;
  sourceEn: string;
  sourceAr: string;
  suggested: "A" | "B" | "C" | "D" | "E";
}

export interface DemoSubmission {
  id: string;
  orgEn: string;
  orgAr: string;
  countryEn: string;
  countryAr: string;
  iso: string;
  submittedAt: string;
  initialStage: StageKey;
  items: DemoItem[];
}

export const DEMO_SUBMISSIONS: DemoSubmission[] = [
  {
    id: "SUB-0107",
    orgEn: "Partner organization",
    orgAr: "مؤسسة شريكة",
    countryEn: "Lebanon",
    countryAr: "لبنان",
    iso: "LBN",
    submittedAt: "2026-07-14",
    initialStage: "submitted",
    items: [
      {
        indicatorEn: "Registered orphans with the organization",
        indicatorAr: "الأيتام المسجّلون لدى المؤسسة",
        value: 4750,
        year: 2025,
        sourceEn: "Organization annual report (attached)",
        sourceAr: "التقرير السنوي للمؤسسة (مرفق)",
        suggested: "B",
      },
      {
        indicatorEn: "Sponsored orphans",
        indicatorAr: "الأيتام المكفولون",
        value: 1850,
        year: 2025,
        sourceEn: "Organization annual report (attached)",
        sourceAr: "التقرير السنوي للمؤسسة (مرفق)",
        suggested: "B",
      },
    ],
  },
  {
    id: "SUB-0104",
    orgEn: "Partner organization",
    orgAr: "مؤسسة شريكة",
    countryEn: "Jordan",
    countryAr: "الأردن",
    iso: "JOR",
    submittedAt: "2026-07-12",
    initialStage: "method",
    items: [
      {
        indicatorEn: "Registered orphans with the organization",
        indicatorAr: "الأيتام المسجّلون لدى المؤسسة",
        value: 12400,
        year: 2025,
        sourceEn: "Organization registry extract",
        sourceAr: "مقتطف سجل المؤسسة",
        suggested: "B",
      },
    ],
  },
  {
    id: "SUB-0102",
    orgEn: "Partner organization",
    orgAr: "مؤسسة شريكة",
    countryEn: "Palestine",
    countryAr: "فلسطين",
    iso: "PSE",
    submittedAt: "2026-07-10",
    initialStage: "changes",
    items: [
      {
        indicatorEn: "Orphans receiving services",
        indicatorAr: "الأيتام المستفيدون من الخدمات",
        value: 8300,
        year: 2025,
        sourceEn: "Field survey summary",
        sourceAr: "ملخص مسح ميداني",
        suggested: "C",
      },
    ],
  },
  {
    id: "SUB-0099",
    orgEn: "Partner organization",
    orgAr: "مؤسسة شريكة",
    countryEn: "Egypt",
    countryAr: "مصر",
    iso: "EGY",
    submittedAt: "2026-07-08",
    initialStage: "approved",
    items: [
      {
        indicatorEn: "Sponsored orphans",
        indicatorAr: "الأيتام المكفولون",
        value: 96000,
        year: 2024,
        sourceEn: "Organization registry extract",
        sourceAr: "مقتطف سجل المؤسسة",
        suggested: "C",
      },
    ],
  },
];

export interface ReviewDict {
  backToObservatory: string;
  nav: { queue: string; detail: string };
  hero: { title: string; lead: string; zone: string };
  actors: Record<Actor, string>;
  queue: {
    title: string;
    columns: { id: string; org: string; country: string; items: string; stage: string; date: string };
  };
  detail: {
    pathTitle: string;
    itemsTitle: string;
    itemColumns: { indicator: string; value: string; year: string; source: string; suggested: string };
    notesTitle: string;
    sampleNote: string;
    sampleNoteAuthor: string;
    actionsTitle: string;
    reasonHint: string;
    auditLine: string;
    publishedNote: string;
    closedNote: string;
    gradePickLabel: string;
  };
  actions: {
    startTriage: string;
    startMethod: string;
    requestChanges: string;
    partnerResubmits: string;
    assignGrade: string;
    approve: string;
    publish: string;
    internalUse: string;
    reject: string;
  };
  demoNote: string;
}

export const reviewContent: Record<Lang, ReviewDict> = {
  en: {
    backToObservatory: "Observatory",
    nav: { queue: "Queue", detail: "Review" },
    hero: {
      title: "Submission review",
      lead: "The Union's internal screen. Every partner submission walks the same ten-stage path — nothing publishes before the Observatory manager's decision. Try it: advance the Lebanon submission through the journey.",
      zone: "ADMIN · INTERNAL ZONE",
    },
    actors: { partner: "Partner", team: "Union team", manager: "Observatory manager" },
    queue: {
      title: "Review queue",
      columns: { id: "ID", org: "Organization", country: "Country", items: "Items", stage: "Stage", date: "Submitted" },
    },
    detail: {
      pathTitle: "Review path",
      itemsTitle: "Submitted data",
      itemColumns: { indicator: "Indicator", value: "Value", year: "Year", source: "Source", suggested: "Suggested grade" },
      notesTitle: "Union notes",
      sampleNote: "Does the figure cover all your branches? Please clarify before we classify confidence.",
      sampleNoteAuthor: "Union reviewer · methodological review",
      actionsTitle: "Available actions at this stage",
      reasonHint: "Rejection and archiving always require a written reason.",
      auditLine: "Every action is recorded in the audit log — who, what, when, why.",
      publishedNote: "Approved values were promoted and published on the country page — with source, year, and grade.",
      closedNote: "Closed with a recorded reason. The submission history remains; nothing is deleted.",
      gradePickLabel: "Confidence grade for this submission",
    },
    actions: {
      startTriage: "Start triage",
      startMethod: "Start methodological review",
      requestChanges: "Request changes",
      partnerResubmits: "Partner resubmits (demo)",
      assignGrade: "Confirm confidence grade",
      approve: "Approve internally",
      publish: "Publish",
      internalUse: "Keep for internal use",
      reject: "Reject",
    },
    demoNote: "Design preview — actions advance this demo submission locally; in the real system every action is permission-checked and recorded.",
  },
  ar: {
    backToObservatory: "المرصد",
    nav: { queue: "قائمة المراجعة", detail: "المراجعة" },
    hero: {
      title: "مراجعة التقديمات",
      lead: "الشاشة الداخلية للاتحاد. كل تقديم من شريك يسلك المسار ذاته من عشر مراحل — ولا يُنشر شيء قبل قرار مدير المرصد. جرّبها: حرّك تقديم لبنان عبر الرحلة كاملة.",
      zone: "لوحة الإدارة · منطقة داخلية",
    },
    actors: { partner: "الشريك", team: "فريق الاتحاد", manager: "مدير المرصد" },
    queue: {
      title: "قائمة المراجعة",
      columns: { id: "المعرف", org: "المؤسسة", country: "الدولة", items: "البنود", stage: "المرحلة", date: "تاريخ الإرسال" },
    },
    detail: {
      pathTitle: "مسار المراجعة",
      itemsTitle: "البيانات المقدَّمة",
      itemColumns: { indicator: "المؤشر", value: "القيمة", year: "السنة", source: "المصدر", suggested: "الدرجة المقترحة" },
      notesTitle: "ملاحظات الاتحاد",
      sampleNote: "هل يشمل الرقم جميع فروعكم؟ نرجو التوضيح قبل تصنيف درجة الثقة.",
      sampleNoteAuthor: "مراجع الاتحاد · المراجعة المنهجية",
      actionsTitle: "الإجراءات المتاحة في هذه المرحلة",
      reasonHint: "الرفض والأرشفة يتطلبان دائمًا سببًا مكتوبًا.",
      auditLine: "كل إجراء يُسجَّل في سجل التدقيق — من فعل ماذا، ومتى، ولماذا.",
      publishedNote: "رُقّيت القيم المعتمدة ونُشرت على صفحة الدولة — مع المصدر والسنة والدرجة.",
      closedNote: "أُغلق التقديم بسبب مسجَّل. يبقى سجل التقديم كاملًا، ولا يُحذف شيء.",
      gradePickLabel: "درجة الثقة لهذا التقديم",
    },
    actions: {
      startTriage: "بدء الفرز",
      startMethod: "بدء المراجعة المنهجية",
      requestChanges: "طلب تعديل",
      partnerResubmits: "الشريك يعيد الإرسال (عرض)",
      assignGrade: "تثبيت درجة الثقة",
      approve: "اعتماد داخلي",
      publish: "نشر عام",
      internalUse: "إبقاء للاستخدام الداخلي",
      reject: "رفض",
    },
    demoNote: "معاينة تصميم — الأزرار تحرّك هذا التقديم محليًا للعرض؛ وفي النظام الفعلي كل إجراء مضبوط بالصلاحيات ومسجَّل.",
  },
};
