"use client";

import PublicShell from "./PublicShell";
import { GRADE_COLORS, Reveal, tint } from "./motion";
import { content, type Lang } from "../content";
import { useLang } from "./prefs";

/*
 * Methodology — صفحة منهجية المرصد. The client spec defines its content:
 * data types, confidence grades, source-separation rule, and the
 * no-personal-data policy. Editable from the admin panel in the real app.
 */

interface Dict {
  title: string;
  lead: string;
  editableNote: string;
  sections: {
    rule: { title: string; body: string; fields: string[] };
    types: { title: string; body: string; items: { name: string; desc: string }[] };
    grades: { title: string; body: string; rows: { g: "A" | "B" | "C" | "D" | "E"; name: string; use: string }[] };
    separation: { title: string; body: string };
    gap: { title: string; body: string; sentence: string };
    personal: { title: string; body: string };
    review: { title: string; body: string };
  };
}

const dict: Record<Lang, Dict> = {
  en: {
    title: "Methodology",
    lead: "How the observatory works: what it collects, how it grades trust, and what it refuses to publish.",
    editableNote: "This page's content is managed by the Federation from the admin panel — in both languages.",
    sections: {
      rule: {
        title: "The founding rule",
        body: "The system does not accept any number without a basic identity card. Every figure must carry, at minimum:",
        fields: ["Country or region", "Data type", "Indicator name", "The value", "Year", "Source and its type", "Confidence grade", "Last updated", "Publication status"],
      },
      types: {
        title: "Data types — kept apart",
        body: "Five types, never mixed and never totalled together — a coverage number is not a need number:",
        items: [
          { name: "Need", desc: "Estimated orphan numbers, geographic distribution, poverty, education, health and protection needs" },
          { name: "Coverage", desc: "Orphans reached by organizations' services, work areas, service types, coverage gaps" },
          { name: "Sponsorship", desc: "Sponsorship cases, approximate value, regularity, sponsored and unsponsored counts" },
          { name: "Care quality", desc: "Service scope, follow-up, psychosocial support, health care, education, child-protection policies" },
          { name: "Institutional capacity", desc: "Staff, specialists, qualifications, training, supervisor-to-orphan ratios" },
        ],
      },
      grades: {
        title: "Confidence grades A–E",
        body: "Every published figure carries a grade, visible to every visitor:",
        rows: [
          { g: "A", name: "High reliability", use: "Official or international data with a clear source and methodology" },
          { g: "B", name: "Partner-verified", use: "Partner organization data with review or supporting documents" },
          { g: "C", name: "Accepted estimate", use: "Analytical or estimated data built on more than one source" },
          { g: "D", name: "Limited reliability", use: "Incomplete data needing further verification" },
          { g: "E", name: "Data gap", use: "No sufficiently reliable data for publication" },
        ],
      },
      separation: {
        title: "Sources are never merged",
        body: "Figures from different sources are displayed side by side with their sources — never combined automatically into one number. Estimates from different methodologies may not be comparable, and the observatory says so instead of hiding it.",
      },
      gap: {
        title: "A declared data gap",
        body: "When no reliable figure exists, the country page says exactly that — the official sentence, instead of an invented number:",
        sentence: "Sufficient reliable data for publication is not yet available for this country. The Federation is actively collecting and reviewing data.",
      },
      personal: {
        title: "No personal data — ever",
        body: "The platform holds aggregated numbers only. There are no fields for children's names, photos, addresses, or individual health details — by design, at every level of the system.",
      },
      review: {
        title: "Nothing publishes unreviewed",
        body: "Partner data enters through a restricted portal and walks a ten-stage review path — triage, methodological review, edit requests, confidence classification, internal approval — and only the Observatory manager decides publication. Every step is recorded in an audit log.",
      },
    },
  },
  ar: {
    title: "منهجية المرصد",
    lead: "كيف يعمل المرصد: ماذا يجمع، وكيف يصنّف الثقة، وما الذي يرفض نشره.",
    editableNote: "محتوى هذه الصفحة يديره الاتحاد من لوحة الإدارة — باللغتين.",
    sections: {
      rule: {
        title: "القاعدة التأسيسية",
        body: "لا يقبل النظام إدخال أي رقم دون بطاقة تعريف أساسية. كل رقم يجب أن يحمل، كحد أدنى:",
        fields: ["الدولة أو المنطقة", "نوع البيانات", "اسم المؤشر", "القيمة", "السنة", "المصدر ونوعه", "درجة الثقة", "تاريخ آخر تحديث", "حالة النشر"],
      },
      types: {
        title: "أنواع البيانات — تُفصل ولا تُخلط",
        body: "خمسة أنواع لا تُخلط ولا تُجمع معًا أبدًا — فرقم التغطية ليس رقم احتياج:",
        items: [
          { name: "الاحتياج", desc: "أعداد الأيتام التقديرية، التوزيع الجغرافي، الفقر، الاحتياجات التعليمية والصحية والحمائية" },
          { name: "التغطية", desc: "الأيتام الذين تصلهم خدمات المؤسسات، مناطق العمل، نوع الخدمات، فجوات التغطية" },
          { name: "الكفالة", desc: "حالات الكفالة، قيمتها التقريبية، انتظامها، أعداد المكفولين وغير المكفولين" },
          { name: "جودة الرعاية", desc: "شمول الخدمات، المتابعة، الدعم النفسي والاجتماعي، الرعاية الصحية، التعليم، سياسات حماية الطفل" },
          { name: "القدرة المؤسسية", desc: "العاملون، الأخصائيون، المؤهلات، التدريب، نسبة المشرفين إلى الأيتام" },
        ],
      },
      grades: {
        title: "درجات الثقة A–E",
        body: "كل رقم منشور يحمل درجة ثقة ظاهرة لكل زائر:",
        rows: [
          { g: "A", name: "عالية الموثوقية", use: "بيانات رسمية أو دولية واضحة المصدر والمنهجية" },
          { g: "B", name: "موثوقة بشراكة", use: "بيانات مقدمة من مؤسسة شريكة مع مراجعة أو وثائق داعمة" },
          { g: "C", name: "تقديرية مقبولة", use: "بيانات تحليلية أو تقديرية مبنية على أكثر من مصدر" },
          { g: "D", name: "محدودة الموثوقية", use: "بيانات غير مكتملة أو تحتاج تحققًا إضافيًا" },
          { g: "E", name: "فجوة بيانات", use: "لا توجد بيانات كافية موثوقة للنشر" },
        ],
      },
      separation: {
        title: "المصادر لا تُدمج",
        body: "الأرقام من مصادر مختلفة تُعرض جنبًا إلى جنب مع مصادرها — ولا تُدمج تلقائيًا في رقم واحد أبدًا. فالتقديرات بمنهجيات مختلفة قد لا تكون قابلة للمقارنة، والمرصد يقول ذلك بدل إخفائه.",
      },
      gap: {
        title: "فجوة بيانات مُعلنة",
        body: "حين لا يتوفر رقم موثوق، تقول صفحة الدولة ذلك بالضبط — بالعبارة الرسمية، بدل رقم مُختلق:",
        sentence: "لا تتوفر حاليًا بيانات كافية موثوقة للنشر حول هذه الدولة، ويعمل الاتحاد على جمع البيانات ومراجعتها.",
      },
      personal: {
        title: "لا بيانات شخصية — أبدًا",
        body: "المنصة تحفظ أرقامًا مجمّعة فقط. لا توجد حقول لأسماء الأطفال أو صورهم أو عناوينهم أو تفاصيلهم الصحية الفردية — بالتصميم، وفي كل مستويات النظام.",
      },
      review: {
        title: "لا يُنشر شيء دون مراجعة",
        body: "بيانات الشركاء تدخل عبر بوابة مقيّدة وتسلك مسار مراجعة من عشر مراحل — فرز، مراجعة منهجية، طلبات تعديل، تصنيف ثقة، اعتماد داخلي — ومدير المرصد وحده يقرر النشر. وكل خطوة تُسجَّل في سجل التدقيق.",
      },
    },
  },
};

function SectionShell({ no, title, children }: { no: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="border-t border-line py-10 first:border-t-0">
        <div className="grid gap-4 lg:grid-cols-[13rem_1fr]">
          <div dir="ltr" className="latin font-mono text-sm tracking-[0.3em] text-accent rtl:text-end">{no}</div>
          <div>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
            <div className="mt-3">{children}</div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

export default function MethodologyPage() {
  const { lang } = useLang();
  const t = dict[lang];
  const shared = content[lang];
  const s = t.sections;

  return (
    <PublicShell
      navTitle={shared.hero.kicker}
      navSubtitle={`OCF · ${t.title}`}
      backLabel={shared.hero.kicker}
      footerNote={t.editableNote}
      footerMark="EVERY NUMBER · A SOURCE · A YEAR · A GRADE"
    >
      <section className="mx-auto max-w-6xl px-5 pb-4 pt-12">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.title}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/65">{t.lead}</p>
        </Reveal>
      </section>

      <div className="mx-auto max-w-6xl px-5 pb-14">
        <SectionShell no="§01" title={s.rule.title}>
          <p className="max-w-2xl leading-relaxed text-foreground/65">{s.rule.body}</p>
          <div className="mt-4 flex max-w-3xl flex-wrap gap-2">
            {s.rule.fields.map((f) => (
              <span key={f} className="rounded-md border border-line bg-ink-900/50 px-3 py-1.5 text-xs text-foreground/70">
                {f}
              </span>
            ))}
          </div>
        </SectionShell>

        <SectionShell no="§02" title={s.types.title}>
          <p className="max-w-2xl leading-relaxed text-foreground/65">{s.types.body}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.types.items.map((it) => (
              <div key={it.name} className="rounded-xl border border-line bg-ink-900/40 p-5">
                <div className="font-semibold">{it.name}</div>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground/50">{it.desc}</p>
              </div>
            ))}
          </div>
        </SectionShell>

        <SectionShell no="§03" title={s.grades.title}>
          <p className="max-w-2xl leading-relaxed text-foreground/65">{s.grades.body}</p>
          <div className="mt-5 space-y-2.5">
            {s.grades.rows.map((r) => (
              <div key={r.g} className="flex items-center gap-4 rounded-xl border border-line bg-ink-900/40 px-4 py-3">
                <span
                  className="latin flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-base font-bold"
                  style={{ background: tint(GRADE_COLORS[r.g], 10), color: GRADE_COLORS[r.g], border: `1px solid ${tint(GRADE_COLORS[r.g], 33)}` }}
                >
                  {r.g}
                </span>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-foreground/50">{r.use}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionShell>

        <SectionShell no="§04" title={s.separation.title}>
          <p className="max-w-2xl leading-relaxed text-foreground/65">{s.separation.body}</p>
        </SectionShell>

        <SectionShell no="§05" title={s.gap.title}>
          <p className="max-w-2xl leading-relaxed text-foreground/65">{s.gap.body}</p>
          <blockquote
            className="mt-4 max-w-2xl rounded-xl border p-5 text-sm font-medium leading-relaxed"
            style={{ borderColor: tint("var(--state-gap)", 35), background: tint("var(--state-gap)", 7), color: "var(--state-gap)" }}
          >
            «{s.gap.sentence}»
          </blockquote>
        </SectionShell>

        <SectionShell no="§06" title={s.personal.title}>
          <p className="max-w-2xl leading-relaxed text-foreground/65">{s.personal.body}</p>
        </SectionShell>

        <SectionShell no="§07" title={s.review.title}>
          <p className="max-w-2xl leading-relaxed text-foreground/65">{s.review.body}</p>
        </SectionShell>
      </div>
    </PublicShell>
  );
}
