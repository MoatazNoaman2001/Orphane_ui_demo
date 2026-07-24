"use client";

import PublicShell from "./PublicShell";
import { Reveal, tint } from "./motion";
import { content, type Lang } from "../content";
import { useLang } from "./prefs";

/*
 * Reports — قسم التقارير. Federation-approved reports and files only;
 * publishing a report here is itself a Federation decision.
 */

export interface ReportRow {
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  countryEn: string | null;
  countryAr: string | null;
  date: string;
  size: string;
}

export const REPORTS: ReportRow[] = [
  {
    titleEn: "Orphan Data Observatory — First Release Overview",
    titleAr: "مرصد بيانات الأيتام — عرض الإصدار الأول",
    summaryEn: "What the observatory publishes, how figures are graded, and the review path every number walks before appearing.",
    summaryAr: "ما ينشره المرصد، وكيف تُصنَّف الأرقام، ومسار المراجعة الذي يسلكه كل رقم قبل ظهوره.",
    countryEn: null,
    countryAr: null,
    date: "2026-07",
    size: "1.8 MB",
  },
  {
    titleEn: "Türkiye Country Brief 2026",
    titleAr: "الموجز القُطري — تركيا 2026",
    summaryEn: "Official TÜİK 2024 figures on children who lost a parent, with institutional and foster-care coverage.",
    summaryAr: "أرقام TÜİK الرسمية 2024 عن الأطفال فاقدي أحد الوالدين، مع تغطية الرعاية المؤسسية والأسرية.",
    countryEn: "Türkiye",
    countryAr: "تركيا",
    date: "2026-06",
    size: "940 KB",
  },
  {
    titleEn: "Methodology & Confidence Grades — Explainer",
    titleAr: "المنهجية ودرجات الثقة — شرح مبسّط",
    summaryEn: "The A–E scale, the identity-card rule, and why a declared data gap is more honest than an invented number.",
    summaryAr: "سلّم A–E، وقاعدة بطاقة الهوية، ولماذا فجوة البيانات المعلنة أصدق من رقم مختلق.",
    countryEn: null,
    countryAr: null,
    date: "2026-05",
    size: "620 KB",
  },
];

interface Dict {
  title: string;
  lead: string;
  download: string;
  global: string;
  policyNote: string;
  demoNote: string;
}

const dict: Record<Lang, Dict> = {
  en: {
    title: "Reports",
    lead: "Reports and files approved and published by the Federation — each one a deliberate publication decision, recorded like every other.",
    download: "Download PDF",
    global: "All countries",
    policyNote: "Only Federation-approved reports appear here. Internal reports stay internal.",
    demoNote: "Design preview — report entries are illustrative; downloads are disabled.",
  },
  ar: {
    title: "التقارير",
    lead: "تقارير وملفات اعتمدها الاتحاد ونشرها — كل واحد منها قرار نشر مقصود، مسجَّل كغيره.",
    download: "تنزيل PDF",
    global: "كل الدول",
    policyNote: "لا يظهر هنا إلا ما اعتمده الاتحاد. التقارير الداخلية تبقى داخلية.",
    demoNote: "معاينة تصميم — عناصر التقارير توضيحية والتنزيل معطَّل.",
  },
};

export default function ReportsPage() {
  const { lang } = useLang();
  const t = dict[lang];
  const shared = content[lang];

  return (
    <PublicShell
      navTitle={shared.hero.kicker}
      navSubtitle={`OCF · ${t.title}`}
      backLabel={shared.hero.kicker}
      footerNote={t.demoNote}
      footerMark="APPROVED · THEN PUBLISHED"
    >
      <section className="mx-auto max-w-6xl px-5 py-12">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.title}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/65">{t.lead}</p>
        </Reveal>

        <div className="mt-8 space-y-4">
          {REPORTS.map((r, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="flex flex-col gap-4 rounded-xl border border-line bg-ink-900/40 p-6 transition-colors duration-300 hover:border-accent/40 sm:flex-row sm:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-800/60 text-accent/80">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 3v5h5M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM9 13h6M9 17h6" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold">{lang === "ar" ? r.titleAr : r.titleEn}</h2>
                    <span className="rounded-md border border-line px-2 py-0.5 text-[11px] text-foreground/50">
                      {r.countryEn ? (lang === "ar" ? r.countryAr : r.countryEn) : t.global}
                    </span>
                  </div>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-foreground/55">{lang === "ar" ? r.summaryAr : r.summaryEn}</p>
                  <div className="latin mt-2 font-mono text-[10px] tracking-[0.15em] text-foreground/40">
                    {r.date} · PDF · {r.size}
                  </div>
                </div>
                <button
                  className="shrink-0 self-start rounded-lg px-4 py-2 text-sm font-medium transition hover:brightness-110 sm:self-center"
                  style={{ background: tint("var(--accent)", 12), color: "var(--accent)", border: `1px solid ${tint("var(--accent)", 35)}` }}
                >
                  ↓ {t.download}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-6 flex items-center gap-2 text-xs text-foreground/45">
            <svg className="shrink-0 text-accent/70" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z" />
            </svg>
            {t.policyNote}
          </p>
        </Reveal>
      </section>
    </PublicShell>
  );
}
