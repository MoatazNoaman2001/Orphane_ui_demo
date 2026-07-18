"use client";

import { useMemo, useState } from "react";
import PublicShell from "./PublicShell";
import { Reveal, tint } from "./motion";
import { content, type Lang } from "../content";
import { useLang } from "./prefs";

/*
 * Organizations directory — دليل المؤسسات. Organizations appear only if
 * the Federation decides to publish them; anonymous entries show the
 * three-level name-visibility rule in action. Names are illustrative.
 */

interface OrgRow {
  nameEn: string | null; // null = anonymous
  nameAr: string | null;
  countryEn: string;
  countryAr: string;
  iso: string;
  servicesEn: string[];
  servicesAr: string[];
}

const ORGS: OrgRow[] = [
  { nameEn: "Al-Ataa Orphan Care", nameAr: "مؤسسة العطاء لرعاية الأيتام", countryEn: "Jordan", countryAr: "الأردن", iso: "JOR", servicesEn: ["Sponsorship", "Education"], servicesAr: ["كفالة", "دعم تعليمي"] },
  { nameEn: "Al-Noor Association", nameAr: "جمعية النور", countryEn: "Palestine", countryAr: "فلسطين", iso: "PSE", servicesEn: ["Sponsorship", "Psychosocial care"], servicesAr: ["كفالة", "رعاية نفسية"] },
  { nameEn: null, nameAr: null, countryEn: "Lebanon", countryAr: "لبنان", iso: "LBN", servicesEn: ["Sponsorship", "Education", "Psychosocial care"], servicesAr: ["كفالة", "دعم تعليمي", "رعاية نفسية"] },
  { nameEn: "Rahma Foundation", nameAr: "مؤسسة رحمة", countryEn: "Türkiye", countryAr: "تركيا", iso: "TUR", servicesEn: ["Alternative care", "Health"], servicesAr: ["رعاية بديلة", "صحة"] },
  { nameEn: null, nameAr: null, countryEn: "Egypt", countryAr: "مصر", iso: "EGY", servicesEn: ["Sponsorship"], servicesAr: ["كفالة"] },
  { nameEn: "Hope Relief", nameAr: "منظمة الأمل للإغاثة", countryEn: "Sudan", countryAr: "السودان", iso: "SDN", servicesEn: ["Relief", "Education"], servicesAr: ["إغاثة", "دعم تعليمي"] },
];

interface Dict {
  title: string;
  lead: string;
  search: string;
  anonymousName: string;
  anonymousHint: string;
  servicesLabel: string;
  policyTitle: string;
  policyBody: string;
  demoNote: string;
  empty: string;
}

const dict: Record<Lang, Dict> = {
  en: {
    title: "Organizations directory",
    lead: "Partner organizations working on the ground, by country and services — an organization appears here only if the Federation decides to publish it.",
    search: "Search by country or service…",
    anonymousName: "Partner organization",
    anonymousHint: "Name withheld by Federation decision",
    servicesLabel: "Services",
    policyTitle: "Three levels of visibility",
    policyBody: "Each organization's public appearance is a Federation decision: public name · anonymous («a partner organization») · internal only. The internal link to its data always remains — hiding a name never breaks traceability.",
    demoNote: "Design preview — organization names are illustrative.",
    empty: "No organization matches this search.",
  },
  ar: {
    title: "دليل المؤسسات",
    lead: "المؤسسات الشريكة العاملة في الميدان، حسب الدولة والخدمات — ولا تظهر المؤسسة هنا إلا إذا قرر الاتحاد نشرها.",
    search: "ابحث بالدولة أو الخدمة…",
    anonymousName: "مؤسسة شريكة",
    anonymousHint: "الاسم محجوب بقرار الاتحاد",
    servicesLabel: "الخدمات",
    policyTitle: "ثلاثة مستويات للظهور",
    policyBody: "ظهور كل مؤسسة للعامة قرار للاتحاد: اسم علني · مجهول («مؤسسة شريكة») · داخلي فقط. ويبقى الربط الداخلي ببياناتها قائمًا دائمًا — إخفاء الاسم لا يقطع التتبع أبدًا.",
    demoNote: "معاينة تصميم — أسماء المؤسسات توضيحية.",
    empty: "لا مؤسسة تطابق هذا البحث.",
  },
};

export default function OrganizationsPage() {
  const { lang } = useLang();
  const t = dict[lang];
  const shared = content[lang];
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ORGS;
    return ORGS.filter((o) => {
      const hay = [o.nameEn ?? "", o.nameAr ?? "", o.countryEn, o.countryAr, ...o.servicesEn, ...o.servicesAr].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  return (
    <PublicShell
      navTitle={shared.hero.kicker}
      navSubtitle={`OCF · ${t.title}`}
      backLabel={shared.hero.kicker}
      footerNote={t.demoNote}
      footerMark="PUBLISHED BY FEDERATION DECISION ONLY"
    >
      <section className="mx-auto max-w-6xl px-5 py-12">
        <Reveal>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.title}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/65">{t.lead}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="relative mt-8 w-full sm:w-80">
            <svg className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-foreground/40" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search}
              className="w-full rounded-lg border border-line bg-ink-900/60 py-2 pe-3 ps-9 text-sm text-foreground placeholder:text-foreground/35 focus:border-accent/50 focus:outline-none"
            />
          </div>
        </Reveal>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((o, i) => {
            const anonymous = o.nameEn === null;
            const name = anonymous ? t.anonymousName : lang === "ar" ? o.nameAr : o.nameEn;
            return (
              <Reveal key={i} delay={(i % 3) * 70} className="h-full">
                <div className="flex h-full flex-col rounded-xl border border-line bg-ink-900/40 p-6 transition-colors duration-300 hover:border-accent/40">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-800/60 text-foreground/40">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21V8l7-5 7 5v13M10 21v-6h4v6M3 21h18" />
                      </svg>
                    </div>
                    <span className="latin rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-foreground/45">{o.iso}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 font-semibold">
                    {name}
                    {anonymous && (
                      <svg className="shrink-0 text-foreground/35" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.9 17.9A9.7 9.7 0 0 1 12 20c-5.5 0-9-5-10-8 .6-1.7 1.9-3.9 3.8-5.5M9.9 4.2A9.9 9.9 0 0 1 12 4c5.5 0 9 5 10 8-.4 1-1 2.3-2 3.5M3 3l18 18M9.5 9.5a3.5 3.5 0 0 0 4.9 4.9" />
                      </svg>
                    )}
                  </div>
                  <div className="mt-0.5 text-xs text-foreground/50">
                    {lang === "ar" ? o.countryAr : o.countryEn}
                    {anonymous && <span className="ms-2 text-foreground/35">· {t.anonymousHint}</span>}
                  </div>
                  <div className="mt-auto pt-4">
                    <div className="latin font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/40">{t.servicesLabel}</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {(lang === "ar" ? o.servicesAr : o.servicesEn).map((sv) => (
                        <span key={sv} className="rounded-md border border-accent/25 bg-accent/5 px-2 py-0.5 text-[11px] text-accent/90">
                          {sv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
          {rows.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-line p-10 text-center text-sm text-foreground/45">{t.empty}</div>
          )}
        </div>

        <Reveal delay={120}>
          <div className="mt-8 rounded-xl border border-dashed border-line p-6" style={{ background: tint("var(--accent)", 4) }}>
            <div className="latin font-mono text-[10px] uppercase tracking-[0.22em] text-accent">{t.policyTitle}</div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/60">{t.policyBody}</p>
          </div>
        </Reveal>
      </section>
    </PublicShell>
  );
}
