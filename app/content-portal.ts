import type { Lang } from "./content";

/*
 * Partner portal — one interactive demo covering the four portal screens:
 * my submissions (home), the data-entry form with live identity-card
 * validation and preview-before-send, submission detail with the partner-side
 * timeline, and the organization profile.
 */

export type PortalView = "list" | "new" | "detail" | "profile";

export interface CatalogIndicator {
  id: string;
  en: string;
  ar: string;
  categoryEn: string;
  categoryAr: string;
}

export const PORTAL_CATALOG: CatalogIndicator[] = [
  { id: "registered", en: "Registered orphans with the organization", ar: "الأيتام المسجّلون لدى المؤسسة", categoryEn: "Coverage", categoryAr: "التغطية" },
  { id: "sponsored", en: "Sponsored orphans", ar: "الأيتام المكفولون", categoryEn: "Sponsorship", categoryAr: "الكفالة" },
  { id: "services", en: "Orphans receiving services", ar: "الأيتام المستفيدون من الخدمات", categoryEn: "Coverage", categoryAr: "التغطية" },
  { id: "psychosocial", en: "Orphans receiving psychosocial support", ar: "أيتام يتلقون دعمًا نفسيًا واجتماعيًا", categoryEn: "Care quality", categoryAr: "جودة الرعاية" },
  { id: "staff", en: "Staff working with orphans", ar: "العاملون مع الأيتام", categoryEn: "Institutional capacity", categoryAr: "القدرة المؤسسية" },
];

export type PartnerStageKey = "sent" | "review" | "changes" | "approved" | "published";

export interface PortalSubmissionRow {
  id: string;
  countryEn: string;
  countryAr: string;
  iso: string;
  items: number;
  updated: string;
  status: "draft" | "sent" | "review" | "changes" | "approved" | "published";
}

export const PORTAL_ROWS: PortalSubmissionRow[] = [
  { id: "SUB-0107", countryEn: "Lebanon", countryAr: "لبنان", iso: "LBN", items: 2, updated: "2026-07-14", status: "review" },
  { id: "SUB-0102", countryEn: "Lebanon", countryAr: "لبنان", iso: "LBN", items: 3, updated: "2026-07-10", status: "changes" },
  { id: "SUB-0095", countryEn: "Lebanon", countryAr: "لبنان", iso: "LBN", items: 4, updated: "2026-06-28", status: "published" },
];

export interface PortalDict {
  backToObservatory: string;
  zone: string;
  hero: { title: string; lead: string };
  orgName: string;
  nav: { list: string; new: string; detail: string; profile: string };
  statusLabels: Record<PortalSubmissionRow["status"], string>;
  list: {
    title: string;
    lead: string;
    newButton: string;
    columns: { id: string; country: string; items: string; status: string; updated: string };
    openDetail: string;
    continueDraft: string;
  };
  form: {
    title: string;
    steps: { data: string; attachments: string; preview: string };
    countryLabel: string;
    itemsTitle: string;
    addItem: string;
    removeItem: string;
    fields: {
      indicator: string;
      indicatorPlaceholder: string;
      value: string;
      valuePlaceholder: string;
      year: string;
      category: string;
      source: string;
      sourcePlaceholder: string;
      note: string;
      notePlaceholder: string;
    };
    cardValid: string;
    cardInvalid: string;
    noPersonalData: string;
    attachmentsTitle: string;
    attachmentsLead: string;
    addFile: string;
    sampleFile: string;
    previewTitle: string;
    previewLead: string;
    editButton: string;
    sendButton: string;
    nextButton: string;
    backButton: string;
    sentTitle: string;
    sentMessage: string;
    backToList: string;
    draftSaved: string;
  };
  detail: {
    title: string;
    timelineTitle: string;
    stages: Record<PartnerStageKey, string>;
    notesTitle: string;
    unionNote: string;
    unionNoteAuthor: string;
    resubmitButton: string;
    resubmitHint: string;
    lockedHint: string;
  };
  profile: {
    title: string;
    lead: string;
    fields: { name: string; country: string; areas: string; services: string; contact: string };
    values: { name: string; country: string; areas: string; services: string; contact: string };
    visibilityTitle: string;
    visibilityNote: string;
    editButton: string;
  };
  demoNote: string;
}

export const portalContent: Record<Lang, PortalDict> = {
  en: {
    backToObservatory: "Observatory",
    zone: "PARTNER PORTAL · RESTRICTED",
    hero: {
      title: "Partner portal",
      lead: "Your organization's gateway: enter aggregated figures, attach evidence, preview, send for review, and track every submission — you see your own data only.",
    },
    orgName: "Partner organization — Lebanon",
    nav: { list: "My submissions", new: "New submission", detail: "Submission", profile: "Organization" },
    statusLabels: {
      draft: "Draft",
      sent: "Sent for review",
      review: "Under review",
      changes: "Changes requested",
      approved: "Approved",
      published: "Published",
    },
    list: {
      title: "My submissions",
      lead: "Every submission and where it stands in the Union's review.",
      newButton: "New submission",
      columns: { id: "ID", country: "Country", items: "Items", status: "Status", updated: "Updated" },
      openDetail: "Open",
      continueDraft: "Continue",
    },
    form: {
      title: "New submission",
      steps: { data: "Data", attachments: "Attachments", preview: "Preview & send" },
      countryLabel: "Country",
      itemsTitle: "Data items",
      addItem: "Add another item",
      removeItem: "Remove",
      fields: {
        indicator: "Indicator",
        indicatorPlaceholder: "Choose an indicator…",
        value: "Value",
        valuePlaceholder: "e.g. 4750",
        year: "Year",
        category: "Data type",
        source: "Source description",
        sourcePlaceholder: "e.g. our 2025 annual report",
        note: "Note (optional)",
        notePlaceholder: "Anything the reviewers should know",
      },
      cardValid: "VALID — complete identity card",
      cardInvalid: "INCOMPLETE — a number needs its year, type, and source",
      noPersonalData: "Aggregated figures only — the form has no fields for names, photos, or any personal data, by design.",
      attachmentsTitle: "Supporting documents",
      attachmentsLead: "Attach what backs your figures — annual report, statistical extract. Reviewers see them next to your numbers.",
      addFile: "Attach a file",
      sampleFile: "annual-report-2025.pdf",
      previewTitle: "Preview before sending",
      previewLead: "This is exactly what the Union's reviewers will see. Check it, then send.",
      editButton: "Back to editing",
      sendButton: "Send for review",
      nextButton: "Continue",
      backButton: "Back",
      sentTitle: "Sent for review",
      sentMessage: "Your submission is locked and now with the Union team. You will be notified at every step — and you can follow its status in My submissions.",
      backToList: "Back to my submissions",
      draftSaved: "Saved as draft — you can leave and come back anytime.",
    },
    detail: {
      title: "Submission",
      timelineTitle: "Where it stands",
      stages: {
        sent: "Sent for review",
        review: "Under Union review",
        changes: "Changes requested",
        approved: "Approved",
        published: "Published on the country page",
      },
      notesTitle: "Union notes",
      unionNote: "Does the figure cover all your branches? Please clarify before we classify confidence.",
      unionNoteAuthor: "Union reviewer",
      resubmitButton: "Edit & resubmit",
      resubmitHint: "The submission is open for your edits — fix what the notes ask, then send again.",
      lockedHint: "The submission is with the Union — it cannot be edited while under review.",
    },
    profile: {
      title: "Organization profile",
      lead: "Your organization's card inside the observatory. Keep it current — the Union relies on it.",
      fields: { name: "Organization name", country: "Country", areas: "Work areas", services: "Services", contact: "Contact person" },
      values: {
        name: "Partner organization — Lebanon",
        country: "Lebanon",
        areas: "Beirut · Bekaa · Tripoli",
        services: "Sponsorship · Education support · Psychosocial care",
        contact: "Programs coordinator",
      },
      visibilityTitle: "Public visibility",
      visibilityNote: "The Union controls whether your name appears publicly: public · anonymous («a partner organization») · internal only. The internal link to your data always remains.",
      editButton: "Request profile update",
    },
    demoNote: "Design preview — this demo runs locally in your browser; in the real portal every step is saved, permission-checked, and audited.",
  },
  ar: {
    backToObservatory: "المرصد",
    zone: "بوابة الشركاء · دخول مقيّد",
    hero: {
      title: "بوابة الشركاء",
      lead: "بوابة مؤسستك: أدخلي الأرقام المجمّعة، أرفقي الوثائق، عايني ثم أرسلي للمراجعة، وتابعي كل تقديم — ولا ترين إلا بيانات مؤسستك فقط.",
    },
    orgName: "مؤسسة شريكة — لبنان",
    nav: { list: "تقديماتي", new: "تقديم جديد", detail: "التقديم", profile: "المؤسسة" },
    statusLabels: {
      draft: "مسودة",
      sent: "مرسلة للمراجعة",
      review: "قيد المراجعة",
      changes: "مطلوب تعديل",
      approved: "معتمدة",
      published: "منشورة",
    },
    list: {
      title: "تقديماتي",
      lead: "كل تقديم وأين وصل في مراجعة الاتحاد.",
      newButton: "تقديم جديد",
      columns: { id: "المعرف", country: "الدولة", items: "البنود", status: "الحالة", updated: "آخر تحديث" },
      openDetail: "فتح",
      continueDraft: "متابعة",
    },
    form: {
      title: "تقديم جديد",
      steps: { data: "البيانات", attachments: "المرفقات", preview: "المعاينة والإرسال" },
      countryLabel: "الدولة",
      itemsTitle: "بنود البيانات",
      addItem: "إضافة بند آخر",
      removeItem: "حذف",
      fields: {
        indicator: "المؤشر",
        indicatorPlaceholder: "اختر مؤشرًا…",
        value: "القيمة",
        valuePlaceholder: "مثال: 4750",
        year: "السنة",
        category: "نوع البيانات",
        source: "وصف المصدر",
        sourcePlaceholder: "مثال: تقريرنا السنوي 2025",
        note: "ملاحظة (اختياري)",
        notePlaceholder: "أي شيء يجب أن يعرفه المراجعون",
      },
      cardValid: "صالح — بطاقة هوية مكتملة",
      cardInvalid: "غير مكتمل — الرقم يحتاج سنته ونوعه ومصدره",
      noPersonalData: "أرقام مجمّعة فقط — لا توجد في النموذج أي حقول لأسماء أو صور أو بيانات شخصية، بالتصميم.",
      attachmentsTitle: "الوثائق الداعمة",
      attachmentsLead: "أرفقي ما يدعم أرقامك — تقرير سنوي، ملف إحصائي. يراها المراجعون بجانب الأرقام.",
      addFile: "إرفاق ملف",
      sampleFile: "annual-report-2025.pdf",
      previewTitle: "معاينة قبل الإرسال",
      previewLead: "هذا بالضبط ما سيراه مراجعو الاتحاد. راجعيه ثم أرسلي.",
      editButton: "عودة للتعديل",
      sendButton: "إرسال للمراجعة",
      nextButton: "متابعة",
      backButton: "رجوع",
      sentTitle: "أُرسل للمراجعة",
      sentMessage: "قُفل التقديم وهو الآن لدى فريق الاتحاد. ستصلك إشعارات في كل خطوة — ويمكنك متابعة حالته من «تقديماتي».",
      backToList: "العودة إلى تقديماتي",
      draftSaved: "حُفظ كمسودة — يمكنك المغادرة والعودة في أي وقت.",
    },
    detail: {
      title: "التقديم",
      timelineTitle: "أين وصل",
      stages: {
        sent: "مرسلة للمراجعة",
        review: "قيد مراجعة الاتحاد",
        changes: "مطلوب تعديل",
        approved: "معتمدة",
        published: "منشورة على صفحة الدولة",
      },
      notesTitle: "ملاحظات الاتحاد",
      unionNote: "هل يشمل الرقم جميع فروعكم؟ نرجو التوضيح قبل تصنيف درجة الثقة.",
      unionNoteAuthor: "مراجع الاتحاد",
      resubmitButton: "تعديل وإعادة إرسال",
      resubmitHint: "التقديم مفتوح لتعديلاتك — عالجي ما تطلبه الملاحظات ثم أرسلي مجددًا.",
      lockedHint: "التقديم لدى الاتحاد — لا يمكن تعديله أثناء المراجعة.",
    },
    profile: {
      title: "ملف المؤسسة",
      lead: "بطاقة مؤسستك داخل المرصد. حافظي على تحديثها — الاتحاد يعتمد عليها.",
      fields: { name: "اسم المؤسسة", country: "الدولة", areas: "مناطق العمل", services: "الخدمات", contact: "مسؤول التواصل" },
      values: {
        name: "مؤسسة شريكة — لبنان",
        country: "لبنان",
        areas: "بيروت · البقاع · طرابلس",
        services: "كفالة · دعم تعليمي · رعاية نفسية واجتماعية",
        contact: "منسّق البرامج",
      },
      visibilityTitle: "الظهور العام",
      visibilityNote: "الاتحاد يتحكم بظهور اسم مؤسستك للعامة: علني · مجهول («مؤسسة شريكة») · داخلي فقط. ويبقى الربط الداخلي ببياناتك قائمًا دائمًا.",
      editButton: "طلب تحديث الملف",
    },
    demoNote: "معاينة تصميم — هذا العرض يعمل محليًا في متصفحك؛ وفي البوابة الفعلية كل خطوة محفوظة ومضبوطة بالصلاحيات ومسجَّلة.",
  },
};
