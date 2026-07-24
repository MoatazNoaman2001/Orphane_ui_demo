"use client";

import { useMemo, useState } from "react";
import PublicShell from "./PublicShell";
import { GRADE_COLORS, Reveal, tint } from "./motion";
import { content, type Lang } from "../content";
import { useLang } from "./prefs";

/*
 * Sources library — مكتبة المصادر. Source names are real (the research
 * team's coded source registry); the library lists only published sources.
 */

type SourceType = "official" | "international" | "survey" | "partner" | "research";

export interface SourceRow {
  code: string;
  name: string;
  publisher: string;
  type: SourceType;
  year: number;
  grade: "A" | "B" | "C" | "D" | "E";
  attribution?: "anonymous";
}

export const SOURCES: SourceRow[] = [
  { code: "SRC-007", name: "A Snapshot on Statistics on Children in Türkiye 2024", publisher: "TÜİK", type: "official", year: 2024, grade: "A" },
  { code: "SRC-008", name: "İstatistiklerle Çocuk — 2024", publisher: "TÜİK", type: "official", year: 2024, grade: "A" },
  { code: "SRC-101", name: "UNICEF/UNAIDS Orphanhood Estimates 2025", publisher: "UNICEF · UNAIDS", type: "international", year: 2025, grade: "A" },
  { code: "SRC-103", name: "Birth Registration Global Database", publisher: "UNICEF", type: "international", year: 2024, grade: "B" },
  { code: "SRC-104", name: "Child Marriage Global Database", publisher: "UNICEF", type: "international", year: 2024, grade: "B" },
  { code: "SRC-105", name: "Child Labour Global Database", publisher: "UNICEF · ILO", type: "international", year: 2023, grade: "B" },
  { code: "SRC-012", name: "Humanitarian Action for Children 2025: Bangladesh", publisher: "UNICEF", type: "international", year: 2025, grade: "A" },
  { code: "SRC-110", name: "Egypt Family Health Survey 2021", publisher: "CAPMAS", type: "survey", year: 2021, grade: "B" },
  { code: "SRC-013", name: "UN Special Procedures Communication on Uyghur children", publisher: "OHCHR", type: "research", year: 2023, grade: "A" },
  { code: "SRC-014", name: "World Report 2025: China", publisher: "Human Rights Watch", type: "research", year: 2025, grade: "A" },
  { code: "SRC-001", name: "Dünya Çocukları İnsani Durum Raporu (Yetim 2021)", publisher: "Yetim Vakfı", type: "research", year: 2021, grade: "C" },
  { code: "SRC-201", name: "—", publisher: "—", type: "partner", year: 2025, grade: "B", attribution: "anonymous" },
];

interface Dict {
  title: string;
  lead: string;
  search: string;
  all: string;
  types: Record<SourceType, string>;
  columns: { code: string; source: string; publisher: string; type: string; year: string; grade: string };
  anonymousName: string;
  anonymousHint: string;
  empty: string;
  footNote: string;
  ruleNote: string;
}

const dict: Record<Lang, Dict> = {
  en: {
    title: "Sources library",
    lead: "Every published figure in the observatory links back to a documented source in this library — with its type, year, and confidence grade.",
    search: "Search sources…",
    all: "All",
    types: { official: "Official statistics", international: "International", survey: "Survey", partner: "Partner", research: "Research & reports" },
    columns: { code: "Code", source: "Source", publisher: "Publisher", type: "Type", year: "Year", grade: "Grade" },
    anonymousName: "Partner organization source",
    anonymousHint: "Name withheld by Federation decision — the internal link remains.",
    empty: "No source matches this filter.",
    footNote: "The library lists published sources only. Attribution has three levels — public, anonymous, internal — set per source by the Federation.",
    ruleNote: "No number without a source — the founding rule.",
  },
  ar: {
    title: "مكتبة المصادر",
    lead: "كل رقم منشور في المرصد يعود إلى مصدر موثّق في هذه المكتبة — بنوعه وسنته ودرجة ثقته.",
    search: "ابحث في المصادر…",
    all: "الكل",
    types: { official: "إحصاء رسمي", international: "دولي", survey: "مسح", partner: "شريك", research: "أبحاث وتقارير" },
    columns: { code: "الرمز", source: "المصدر", publisher: "الجهة", type: "النوع", year: "السنة", grade: "الدرجة" },
    anonymousName: "مصدر مؤسسة شريكة",
    anonymousHint: "الاسم محجوب بقرار الاتحاد — مع بقاء الربط الداخلي.",
    empty: "لا يوجد مصدر يطابق هذا البحث.",
    footNote: "تعرض المكتبة المصادر المنشورة فقط. وللإسناد ثلاثة مستويات — علني، مجهول، داخلي — يضبطها الاتحاد لكل مصدر.",
    ruleNote: "لا رقم دون مصدر — القاعدة التأسيسية.",
  },
};

export default function SourcesPage() {
  const { lang } = useLang();
  const t = dict[lang];
  const shared = content[lang];

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<SourceType | "all">("all");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SOURCES.filter((s) => {
      if (typeFilter !== "all" && s.type !== typeFilter) return false;
      if (!q) return true;
      return s.name.toLowerCase().includes(q) || s.publisher.toLowerCase().includes(q) || s.code.toLowerCase().includes(q);
    });
  }, [query, typeFilter]);

  return (
    <PublicShell
      navTitle={shared.hero.kicker}
      navSubtitle={`OCF · ${t.title}`}
      backLabel={shared.hero.kicker}
      footerNote={t.footNote}
      footerMark="EVERY NUMBER · A SOURCE · A YEAR · A GRADE"
    >
      <section className="mx-auto max-w-6xl px-5 py-12">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.title}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/65">{t.lead}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-auto">
              <svg className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-foreground/40" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.search}
                className="w-full rounded-lg border border-line bg-ink-900/60 py-2 pe-3 ps-9 text-sm text-foreground placeholder:text-foreground/35 focus:border-accent/50 focus:outline-none sm:w-64"
              />
            </div>
            <div className="flex flex-wrap gap-y-1 rounded-lg border border-line bg-ink-900/60 p-1">
              {(["all", "official", "international", "survey", "partner", "research"] as const).map((ty) => (
                <button
                  key={ty}
                  onClick={() => setTypeFilter(ty === "all" ? "all" : typeFilter === ty ? "all" : ty)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                    typeFilter === ty || (ty === "all" && typeFilter === "all")
                      ? "bg-ink-800 text-accent"
                      : "text-foreground/55 hover:text-foreground"
                  }`}
                >
                  {ty === "all" ? t.all : t.types[ty]}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-7 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="latin border-b border-line bg-ink-900/60 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                  <th className="px-5 py-3.5 text-start font-medium">{t.columns.code}</th>
                  <th className="px-5 py-3.5 text-start font-medium">{t.columns.source}</th>
                  <th className="px-5 py-3.5 text-start font-medium">{t.columns.publisher}</th>
                  <th className="px-5 py-3.5 text-start font-medium">{t.columns.type}</th>
                  <th className="px-5 py-3.5 text-start font-medium">{t.columns.year}</th>
                  <th className="px-5 py-3.5 text-start font-medium">{t.columns.grade}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((s, i) => (
                  <tr key={s.code} className={`transition-colors duration-200 hover:bg-ink-900/40 ${i > 0 ? "border-t border-line-soft" : ""}`}>
                    <td className="latin px-5 py-4 font-mono text-xs text-foreground/50">{s.code}</td>
                    <td className="px-5 py-4">
                      {s.attribution === "anonymous" ? (
                        <span>
                          <span className="flex items-center gap-2 font-medium text-foreground/80">
                            {t.anonymousName}
                            <svg className="text-foreground/35" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17.9 17.9A9.7 9.7 0 0 1 12 20c-5.5 0-9-5-10-8 .6-1.7 1.9-3.9 3.8-5.5M9.9 4.2A9.9 9.9 0 0 1 12 4c5.5 0 9 5 10 8-.4 1-1 2.3-2 3.5M3 3l18 18M9.5 9.5a3.5 3.5 0 0 0 4.9 4.9" />
                            </svg>
                          </span>
                          <span className="mt-0.5 block text-[11px] text-foreground/40">{t.anonymousHint}</span>
                        </span>
                      ) : (
                        <span className="latin font-medium text-foreground/85">{s.name}</span>
                      )}
                    </td>
                    <td className="latin px-5 py-4 text-foreground/55">{s.publisher}</td>
                    <td className="px-5 py-4 text-foreground/55">{t.types[s.type]}</td>
                    <td className="latin px-5 py-4 font-mono text-foreground/55">{s.year}</td>
                    <td className="px-5 py-4">
                      <span
                        className="latin inline-flex h-6 w-6 items-center justify-center rounded-md font-mono text-xs font-bold"
                        style={{ background: tint(GRADE_COLORS[s.grade], 12), color: GRADE_COLORS[s.grade], border: `1px solid ${tint(GRADE_COLORS[s.grade], 33)}` }}
                      >
                        {s.grade}
                      </span>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-sm text-foreground/45">{t.empty}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-3 flex items-center gap-2 text-xs text-foreground/45">
            <svg className="shrink-0 text-accent/70" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z" />
            </svg>
            {t.ruleNote}
          </p>
        </Reveal>
      </section>
    </PublicShell>
  );
}
