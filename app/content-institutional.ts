import type { Lang } from "./content";

/*
 * The four institutional pages the Union requested:
 * About · Contact (multi-purpose form) · Privacy policy · Data use & citation.
 * Contents follow the Union's own specification of each page.
 */

export interface InstitutionalDict {
  about: {
    title: string;
    lead: string;
    sections: { title: string; body: string }[];
  };
  contact: {
    title: string;
    lead: string;
    info: { label: string; value: string }[];
    form: {
      topicLabel: string;
      topics: string[];
      nameLabel: string;
      emailLabel: string;
      subjectLabel: string;
      messageLabel: string;
      messagePlaceholder: string;
      submit: string;
      sentTitle: string;
      sentMessage: string;
      portalNote: string;
    };
  };
  privacy: {
    title: string;
    lead: string;
    sections: { title: string; body: string }[];
  };
  dataUse: {
    title: string;
    lead: string;
    sections: { title: string; body: string }[];
    citationTitle: string;
    citationExample: string;
  };
  draftNote: string;
}

export const institutionalContent: Record<Lang, InstitutionalDict> = {
  en: {
    about: {
      title: "About the Observatory",
      lead: "Who we are, what we publish, and why it can be trusted.",
      sections: [
        {
          title: "What the Observatory is",
          body: "The Orphan Data Observatory is a bilingual platform for aggregated, non-personal data about orphans worldwide: country pages, indicators, documented sources, and reports — every figure carrying its source, year, and confidence grade.",
        },
        {
          title: "Our goals",
          body: "To give the humanitarian community one reviewed evidence base about orphans: where the need is documented, where the gaps are, and how reliable each figure is — so decisions, research, and giving rest on verified data.",
        },
        {
          title: "Scope of work",
          body: "The first release covers 193 UN member states plus observer states and analytical scopes, across five data types: need, coverage, sponsorship, care quality, and institutional capacity. No personal data about children, families, or staff is collected at any point.",
        },
        {
          title: "Who it serves",
          body: "Researchers and media citing verified figures; donors and supporters directing their giving; partner organizations contributing and gaining recognition; and the Federation's own teams planning where effort goes next.",
        },
        {
          title: "Who operates it",
          body: "The Observatory is operated by the Orphans Care Federation (orphans.care), which reviews, classifies, and approves every figure before publication. Partner organizations contribute data; the Federation alone decides what publishes.",
        },
      ],
    },
    contact: {
      title: "Contact us",
      lead: "For inquiries, corrections, partnership requests, or technical issues. Partner organizations with accounts use the partner portal; this page is for everyone.",
      info: [
        { label: "Email", value: "info@orphans.care" },
        { label: "Federation", value: "Orphans Care Federation — Istanbul, Türkiye" },
      ],
      form: {
        topicLabel: "Subject of your message",
        topics: [
          "General inquiry",
          "Report an error in a figure or source",
          "Suggest a data update",
          "Partnership / contribute data",
          "Technical issue",
        ],
        nameLabel: "Name",
        emailLabel: "Email",
        subjectLabel: "Related country or indicator (optional)",
        messageLabel: "Message",
        messagePlaceholder: "Write your message…",
        submit: "Send message",
        sentTitle: "Message received",
        sentMessage: "Thank you. The Federation team will review your message and respond by email.",
        portalNote: "Already a partner with an account? Use the partner portal instead.",
      },
    },
    privacy: {
      title: "Privacy policy",
      lead: "How this site handles visitors' data — and the absolute rule about orphans' data.",
      sections: [
        {
          title: "No personal data about orphans — ever",
          body: "The Observatory publishes aggregated statistics only. The platform contains no names, photos, addresses, or any identifying details of children or families — by design, at every level of the system.",
        },
        {
          title: "Visitors",
          body: "Browsing the public site requires no account and no personal information. Basic technical logs (such as page requests) are used solely to keep the service running and secure.",
        },
        {
          title: "Contact forms",
          body: "When you use the contact form, the details you provide (name, email, message) are used only to handle your request and are not shared with third parties.",
        },
        {
          title: "Cookies",
          body: "The site uses only what is necessary for it to function (such as language and display preferences). No advertising or cross-site tracking cookies are used.",
        },
        {
          title: "Partner accounts",
          body: "Partner portal accounts are created by the Federation. Account data is used for operating the portal, permissions, and the audit log required by the Observatory's governance.",
        },
      ],
    },
    dataUse: {
      title: "Data use & citation",
      lead: "The Observatory's data is published to be used — under conditions that keep it honest.",
      sections: [
        {
          title: "Conditions of use",
          body: "You may quote and reuse published figures for research, journalism, and humanitarian work, provided each figure is presented with its context and not altered.",
        },
        {
          title: "Show the source and year — always",
          body: "Every figure on this platform carries a source, a year, and a confidence grade. Any reuse must display the original source and reference year alongside the number, and should include its grade.",
        },
        {
          title: "Numbers must keep their context",
          body: "A figure must not be used in isolation from its methodological notes. Figures from different sources or methodologies must not be merged or compared as if equivalent.",
        },
        {
          title: "Limits of responsibility",
          body: "The Observatory aggregates and reviews data from documented sources; responsibility for original measurements remains with those sources. Grades express the Federation's confidence assessment, not a guarantee.",
        },
      ],
      citationTitle: "How to cite",
      citationExample: "Orphan Data Observatory — Orphans Care Federation, [indicator], [country], [source, year]. Retrieved [date].",
    },
    draftNote: "Draft text for design purposes — final wording is prepared and approved by the Federation from the admin panel.",
  },
  ar: {
    about: {
      title: "عن المرصد",
      lead: "من نحن، وماذا ننشر، ولماذا يمكن الوثوق به.",
      sections: [
        {
          title: "ما هو المرصد",
          body: "مرصد بيانات الأيتام منصة ثنائية اللغة لبيانات مجمّعة غير شخصية عن الأيتام حول العالم: صفحات دول، ومؤشرات، ومصادر موثّقة، وتقارير — وكل رقم يحمل مصدره وسنته ودرجة ثقته.",
        },
        {
          title: "أهدافنا",
          body: "أن يكون للمجتمع الإنساني قاعدة أدلة مُراجَعة واحدة عن الأيتام: أين الاحتياج موثّق، وأين الفجوات، وما مدى موثوقية كل رقم — لتُبنى القرارات والأبحاث والعطاء على بيانات مُتحقَّق منها.",
        },
        {
          title: "نطاق العمل",
          body: "يغطي الإصدار الأول 193 دولة عضوًا في الأمم المتحدة إضافة إلى الدول المراقبة والنطاقات التحليلية، عبر خمسة أنواع من البيانات: الاحتياج، والتغطية، والكفالة، وجودة الرعاية، والقدرة المؤسسية. ولا تُجمع أي بيانات شخصية عن الأطفال أو الأسر أو العاملين في أي مرحلة.",
        },
        {
          title: "لمن يعمل",
          body: "للباحثين والإعلاميين الذين يستشهدون بأرقام موثّقة؛ وللمانحين والداعمين في توجيه عطائهم؛ وللمؤسسات الشريكة التي تساهم بالبيانات ويُعترف بعملها؛ ولفرق الاتحاد في تخطيط الجهد القادم.",
        },
        {
          title: "الجهة المشغّلة",
          body: "يدير المرصدَ اتحادُ رعاية الأيتام (orphans.care)، وهو من يراجع كل رقم ويصنّفه ويعتمده قبل النشر. تساهم المؤسسات الشريكة بالبيانات، والاتحاد وحده يقرر ما يُنشر.",
        },
      ],
    },
    contact: {
      title: "تواصل معنا",
      lead: "للاستفسارات، والتصحيحات، وطلبات الشراكة، والمشكلات التقنية. المؤسسات الشريكة التي لديها حسابات تستخدم بوابة الشركاء؛ أما هذه الصفحة فللجميع.",
      info: [
        { label: "البريد الإلكتروني", value: "info@orphans.care" },
        { label: "الاتحاد", value: "اتحاد رعاية الأيتام — إسطنبول، تركيا" },
      ],
      form: {
        topicLabel: "موضوع الرسالة",
        topics: [
          "استفسار عام",
          "الإبلاغ عن خطأ في رقم أو مصدر",
          "اقتراح تحديث للبيانات",
          "طلب شراكة / المساهمة بالبيانات",
          "الإبلاغ عن مشكلة تقنية",
        ],
        nameLabel: "الاسم",
        emailLabel: "البريد الإلكتروني",
        subjectLabel: "الدولة أو المؤشر المعني (اختياري)",
        messageLabel: "الرسالة",
        messagePlaceholder: "اكتب رسالتك…",
        submit: "إرسال الرسالة",
        sentTitle: "وصلت رسالتك",
        sentMessage: "شكرًا لك. سيراجع فريق الاتحاد رسالتك ويرد عبر البريد الإلكتروني.",
        portalNote: "شريك لديه حساب بالفعل؟ استخدم بوابة الشركاء مباشرة.",
      },
    },
    privacy: {
      title: "سياسة الخصوصية",
      lead: "كيف يتعامل الموقع مع بيانات زوّاره — والقاعدة المطلقة بشأن بيانات الأيتام.",
      sections: [
        {
          title: "لا بيانات شخصية عن الأيتام — أبدًا",
          body: "ينشر المرصد إحصاءات مجمّعة فقط. لا تحتوي المنصة على أسماء أو صور أو عناوين أو أي تفاصيل معرِّفة للأطفال أو الأسر — بالتصميم، وفي كل مستويات النظام.",
        },
        {
          title: "الزوّار",
          body: "تصفّح الموقع العام لا يتطلب حسابًا ولا أي معلومات شخصية. وتُستخدم السجلات التقنية الأساسية (مثل طلبات الصفحات) لتشغيل الخدمة وتأمينها فقط.",
        },
        {
          title: "نماذج التواصل",
          body: "عند استخدام نموذج التواصل، تُستخدم البيانات التي تقدّمها (الاسم، البريد، الرسالة) لمعالجة طلبك فقط، ولا تُشارك مع أي طرف ثالث.",
        },
        {
          title: "ملفات الارتباط (Cookies)",
          body: "يستخدم الموقع ما يلزم لعمله فقط (مثل تفضيل اللغة والعرض). ولا تُستخدم أي ملفات تتبّع إعلانية أو عابرة للمواقع.",
        },
        {
          title: "حسابات الشركاء",
          body: "حسابات بوابة الشركاء ينشئها الاتحاد. وتُستخدم بيانات الحساب لتشغيل البوابة والصلاحيات وسجل التدقيق الذي تفرضه حوكمة المرصد.",
        },
      ],
    },
    dataUse: {
      title: "استخدام البيانات والاستشهاد بها",
      lead: "بيانات المرصد تُنشر لتُستخدم — بشروط تحفظ صدقها.",
      sections: [
        {
          title: "شروط الاستخدام",
          body: "يجوز اقتباس الأرقام المنشورة وإعادة استخدامها في البحث والصحافة والعمل الإنساني، بشرط عرض كل رقم في سياقه ودون تحريف.",
        },
        {
          title: "أظهر المصدر والسنة — دائمًا",
          body: "كل رقم في هذه المنصة يحمل مصدرًا وسنة ودرجة ثقة. وأي إعادة استخدام يجب أن تعرض المصدر الأصلي والسنة المرجعية بجانب الرقم، ويُستحسن إظهار درجته.",
        },
        {
          title: "الرقم لا يُفصل عن سياقه",
          body: "لا يجوز استخدام الرقم بمعزل عن ملاحظاته المنهجية. ولا يجوز دمج أرقام من مصادر أو منهجيات مختلفة أو مقارنتها وكأنها متكافئة.",
        },
        {
          title: "حدود المسؤولية",
          body: "يجمع المرصد البيانات ويراجعها من مصادر موثّقة؛ وتبقى مسؤولية القياس الأصلي على عاتق تلك المصادر. ودرجات الثقة تعبير عن تقييم الاتحاد، لا ضمانة.",
        },
      ],
      citationTitle: "طريقة الاستشهاد",
      citationExample: "مرصد بيانات الأيتام — اتحاد رعاية الأيتام، [المؤشر]، [الدولة]، [المصدر، السنة]. تاريخ الاطلاع: [التاريخ].",
    },
    draftNote: "نص تجريبي لأغراض التصميم — الصياغة النهائية يعدّها الاتحاد ويعتمدها من لوحة الإدارة.",
  },
};
