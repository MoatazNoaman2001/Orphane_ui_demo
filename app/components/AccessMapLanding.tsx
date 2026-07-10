"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { content, type Lang } from "../content";

/*
 * Design direction 02 — "The Access Map".
 * Light, institutional, map-first — the visual language of UNICEF Data / UNHCR / HDX.
 * The hero is an honest country-status tile map; data gaps are the loudest element.
 * Deliberately light-only: in this field, credibility is the aesthetic.
 */

const INK = "#122a52";
const MUTED = "#51648c";
const NAVY = "#1c4791";
const CYAN = "#1fc2f2";
const BG = "#f6f9fd";
const LINE = "rgba(28, 71, 145, 0.14)";

type Status = "pub" | "prep" | "gap" | "internal";

const STATUS_COLOR: Record<Status, string> = {
  pub: "#1c4791",
  prep: "#6ea8e8",
  gap: "#e3a63b",
  internal: "#b9c6dc",
};

const COUNTRIES: { code: string; en: string; ar: string; status: Status }[] = [
  { code: "JO", en: "Jordan", ar: "الأردن", status: "pub" },
  { code: "PS", en: "Palestine", ar: "فلسطين", status: "pub" },
  { code: "LB", en: "Lebanon", ar: "لبنان", status: "pub" },
  { code: "EG", en: "Egypt", ar: "مصر", status: "pub" },
  { code: "MA", en: "Morocco", ar: "المغرب", status: "pub" },
  { code: "TR", en: "Türkiye", ar: "تركيا", status: "prep" },
  { code: "SY", en: "Syria", ar: "سوريا", status: "prep" },
  { code: "IQ", en: "Iraq", ar: "العراق", status: "prep" },
  { code: "SD", en: "Sudan", ar: "السودان", status: "prep" },
  { code: "DZ", en: "Algeria", ar: "الجزائر", status: "prep" },
  { code: "TN", en: "Tunisia", ar: "تونس", status: "prep" },
  { code: "YE", en: "Yemen", ar: "اليمن", status: "gap" },
  { code: "SO", en: "Somalia", ar: "الصومال", status: "gap" },
  { code: "AF", en: "Afghanistan", ar: "أفغانستان", status: "gap" },
  { code: "LY", en: "Libya", ar: "ليبيا", status: "gap" },
  { code: "TD", en: "Chad", ar: "تشاد", status: "gap" },
  { code: "ML", en: "Mali", ar: "مالي", status: "gap" },
  { code: "PK", en: "Pakistan", ar: "باكستان", status: "internal" },
  { code: "BD", en: "Bangladesh", ar: "بنغلاديش", status: "internal" },
  { code: "NE", en: "Niger", ar: "النيجر", status: "internal" },
  { code: "MR", en: "Mauritania", ar: "موريتانيا", status: "internal" },
  { code: "KM", en: "Comoros", ar: "جزر القمر", status: "internal" },
  { code: "SN", en: "Senegal", ar: "السنغال", status: "prep" },
  { code: "ID", en: "Indonesia", ar: "إندونيسيا", status: "internal" },
];

const local = {
  en: {
    headline1: "See what the world knows about its orphans.",
    headline2: "And what it doesn't — yet.",
    sub: "The Observatory maps aggregated, non-personal data about orphans country by country — every figure reviewed, sourced, and graded by the Orphans Care Federation before the world sees it. Where reliable data doesn't exist, we say so.",
    ctaPrimary: "Explore the map",
    ctaGap: "Help close a data gap",
    mapTitle: "COUNTRY DATA STATUS — FIRST RELEASE COVERAGE",
    mapNote: "Illustrative statuses. The product ships with an interactive country-level map.",
    legend: { pub: "Published", prep: "In preparation", gap: "Data gap declared", internal: "Internal only" } as Record<Status, string>,
    counters: [
      { key: "all", label: "countries tracked" },
      { key: "pub", label: "with published data" },
      { key: "gap", label: "gaps declared openly" },
      { key: "sourced", label: "of figures carry source + year + grade" },
    ],
    profilesTitle: "Country profiles, the honest way",
    profilesLead: "One unified template for every country — and the status is part of the data.",
    profilePub: { name: "Jordan", status: "PUBLISHED", indicators: "14 indicators", updated: "Updated 2026", grades: "Grade mix", cta: "View profile" },
    profileGap: {
      name: "Yemen",
      status: "DATA GAP",
      message: "No reliable aggregated figures yet. The Federation is seeking reporting partners on the ground.",
      cta: "Become a reporting partner",
    },
    gapQuote: "A declared data gap is more honest than an invented number.",
    ruleTitle: "Every figure ships with its evidence",
    ruleLead: "No number enters the Observatory without a source, a year, and a confidence grade — enforced by the system, reviewed by the Federation.",
    sample: { indicator: "Registered orphans — national total", value: "12,480", source: "Ministry of Social Affairs", year: "2024", grade: "B" },
    chips: { source: "SOURCE", year: "YEAR", grade: "GRADE" },
    methodology: "Read the full methodology",
    switchTo: "العربية",
    back: "All designs",
  },
  ar: {
    headline1: "شاهد ما يعرفه العالم عن أيتامه.",
    headline2: "وما لا يعرفه — بعد.",
    sub: "يرسم المرصد بيانات مجمَّعة غير شخصية عن الأيتام دولةً دولة — كل رقم يُراجَع ويُسنَد ويُصنَّف من اتحاد رعاية الأيتام قبل أن يراه العالم. وحيث لا توجد بيانات موثوقة، نقولها بوضوح.",
    ctaPrimary: "استكشف الخريطة",
    ctaGap: "ساعد في سدّ فجوة بيانات",
    mapTitle: "حالة بيانات الدول — تغطية الإصدار الأول",
    mapNote: "حالات توضيحية. المنتج يتضمن خريطة تفاعلية على مستوى الدول.",
    legend: { pub: "منشور", prep: "قيد الإعداد", gap: "فجوة بيانات مُعلنة", internal: "داخلي فقط" } as Record<Status, string>,
    counters: [
      { key: "all", label: "دولة قيد الرصد" },
      { key: "pub", label: "دول ببيانات منشورة" },
      { key: "gap", label: "فجوات مُعلنة بشفافية" },
      { key: "sourced", label: "من الأرقام لها مصدر وسنة ودرجة" },
    ],
    profilesTitle: "صفحات الدول، بالطريقة الصادقة",
    profilesLead: "قالب موحّد لكل دولة — والحالة جزء من البيانات نفسها.",
    profilePub: { name: "الأردن", status: "منشور", indicators: "١٤ مؤشرًا", updated: "حُدِّث ٢٠٢٦", grades: "مزيج الدرجات", cta: "عرض الصفحة" },
    profileGap: {
      name: "اليمن",
      status: "فجوة بيانات",
      message: "لا أرقام مجمَّعة موثوقة بعد. يبحث الاتحاد عن شركاء إبلاغ في الميدان.",
      cta: "كن شريك إبلاغ",
    },
    gapQuote: "فجوة بياناتٍ مُعلَنة أصدقُ من رقمٍ مُختلَق.",
    ruleTitle: "كل رقم يأتي ومعه دليله",
    ruleLead: "لا يدخل المرصدَ رقمٌ بلا مصدر وسنة ودرجة ثقة — يفرضه النظام، ويراجعه الاتحاد.",
    sample: { indicator: "الأيتام المسجّلون — الإجمالي الوطني", value: "12,480", source: "وزارة الشؤون الاجتماعية", year: "٢٠٢٤", grade: "B" },
    chips: { source: "المصدر", year: "السنة", grade: "الدرجة" },
    methodology: "اقرأ المنهجية كاملة",
    switchTo: "English",
    back: "كل التصاميم",
  },
} as const;

const GRADE_COLORS: Record<string, string> = {
  A: "#0e8fc9",
  B: "#1c4791",
  C: "#7f93bd",
  D: "#e3a63b",
  E: "#d0684f",
};

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function AccessMapLanding() {
  const [lang, setLang] = useState<Lang>("en");
  const t = content[lang];
  const L = local[lang];
  const [focus, setFocus] = useState<Status | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  const counts = {
    all: COUNTRIES.length,
    pub: COUNTRIES.filter((c) => c.status === "pub").length,
    gap: COUNTRIES.filter((c) => c.status === "gap").length,
    sourced: "100%",
  } as const;

  return (
    <div className="min-h-screen" style={{ background: BG, color: INK }}>
      {/* ===== NAV ===== */}
      <header className="sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md" style={{ borderColor: LINE }}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <circle cx="20" cy="20" r="17" stroke={NAVY} strokeWidth="2.5" />
              <circle cx="20" cy="20" r="10.5" stroke={CYAN} strokeWidth="2" strokeDasharray="4 5" />
              <circle cx="20" cy="20" r="4" fill={CYAN} />
            </svg>
            <div className="leading-tight">
              <div className="text-sm font-bold">{t.hero.kicker}</div>
              <div className="text-[11px]" style={{ color: MUTED }}>{t.hero.org}</div>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-sm md:flex" style={{ color: MUTED }}>
            <a href="#map" className="transition hover:opacity-70" style={{ color: MUTED }}>{t.nav.countries}</a>
            <a href="#rule" className="transition hover:opacity-70" style={{ color: MUTED }}>{t.nav.rule}</a>
            <a href="#pipeline" className="transition hover:opacity-70" style={{ color: MUTED }}>{t.nav.pipeline}</a>
            <a href="#platform" className="transition hover:opacity-70" style={{ color: MUTED }}>{t.nav.platform}</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="rounded-full border px-4 py-1.5 text-xs font-semibold transition hover:bg-blue-50"
              style={{ borderColor: NAVY, color: NAVY }}
            >
              {L.switchTo}
            </button>
            <a
              href="#cta"
              className="hidden rounded-full px-4 py-1.5 text-xs font-semibold text-white transition hover:opacity-90 sm:block"
              style={{ background: NAVY }}
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </header>

      {/* ===== HERO + TILE MAP ===== */}
      <section id="map" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse 70% 60% at 80% 0%, rgba(31,194,242,0.08), transparent 60%), radial-gradient(ellipse 60% 50% at 10% 100%, rgba(28,71,145,0.06), transparent 60%)` }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1fr_1.05fr] lg:py-24">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-xs font-medium" style={{ borderColor: LINE, color: MUTED }}>
                <span className="h-2 w-2 rounded-full" style={{ background: CYAN }} />
                {t.hero.org} · {t.hero.firstRelease}
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 text-4xl font-bold leading-[1.14] tracking-tight sm:text-5xl">
                {L.headline1}
                <span className="block" style={{ color: "#b07a1e" }}>{L.headline2}</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: MUTED }}>
                {L.sub}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#profiles"
                  className="rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                  style={{ background: NAVY, boxShadow: "0 8px 28px rgba(28,71,145,0.3)" }}
                >
                  {L.ctaPrimary}
                </a>
                <a
                  href="#cta"
                  className="rounded-full border-2 px-7 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
                  style={{ borderColor: "#e3a63b", color: "#b07a1e" }}
                >
                  {L.ctaGap}
                </a>
              </div>
            </Reveal>
          </div>

          {/* status tile map */}
          <Reveal delay={200}>
            <div className="rounded-2xl border bg-white p-6 shadow-sm" style={{ borderColor: LINE }}>
              <div className="latin font-mono text-[10px] font-semibold tracking-[0.22em]" style={{ color: MUTED }}>
                {L.mapTitle}
              </div>
              <div className="mt-4 grid grid-cols-6 gap-2" dir="ltr">
                {COUNTRIES.map((c) => {
                  const dim = focus !== null && c.status !== focus;
                  return (
                    <div
                      key={c.code}
                      title={`${lang === "en" ? c.en : c.ar} — ${L.legend[c.status]}`}
                      className="flex aspect-square cursor-default flex-col items-center justify-center rounded-lg transition-all duration-300"
                      style={{
                        background: c.status === "pub" ? STATUS_COLOR.pub : `${STATUS_COLOR[c.status]}${c.status === "internal" ? "55" : "33"}`,
                        border: `1.5px solid ${STATUS_COLOR[c.status]}${c.status === "pub" ? "" : "88"}`,
                        opacity: dim ? 0.18 : 1,
                        transform: dim ? "scale(0.92)" : "scale(1)",
                      }}
                    >
                      <span
                        className="latin font-mono text-xs font-bold"
                        style={{ color: c.status === "pub" ? "#fff" : c.status === "gap" ? "#8a5f14" : NAVY }}
                      >
                        {c.code}
                      </span>
                      <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: c.status === "pub" ? CYAN : STATUS_COLOR[c.status] }} />
                    </div>
                  );
                })}
              </div>
              {/* legend — hover to filter */}
              <div className="mt-5 flex flex-wrap gap-2">
                {(Object.keys(STATUS_COLOR) as Status[]).map((s) => (
                  <button
                    key={s}
                    onMouseEnter={() => setFocus(s)}
                    onMouseLeave={() => setFocus(null)}
                    onFocus={() => setFocus(s)}
                    onBlur={() => setFocus(null)}
                    className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition"
                    style={{
                      borderColor: focus === s ? STATUS_COLOR[s] : LINE,
                      color: INK,
                      background: focus === s ? `${STATUS_COLOR[s]}15` : "#fff",
                    }}
                  >
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: STATUS_COLOR[s] }} />
                    {L.legend[s]}
                    <span className="latin font-mono" style={{ color: MUTED }}>
                      {COUNTRIES.filter((c) => c.status === s).length}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-4 text-[11px] italic" style={{ color: MUTED }}>{L.mapNote}</div>
            </div>
          </Reveal>
        </div>

        {/* counters */}
        <div className="border-y bg-white" style={{ borderColor: LINE }}>
          <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
            {L.counters.map((c, i) => (
              <Reveal key={c.key} delay={i * 80} className="border-line px-6 py-6 lg:border-s lg:first:border-s-0">
                <div className="latin font-mono text-3xl font-bold" style={{ color: c.key === "gap" ? "#b07a1e" : NAVY }}>
                  {counts[c.key as keyof typeof counts]}
                </div>
                <div className="mt-1 text-sm" style={{ color: MUTED }}>{c.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COUNTRY PROFILES ===== */}
      <section id="profiles" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{L.profilesTitle}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed" style={{ color: MUTED }}>{L.profilesLead}</p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* published profile card */}
          <Reveal delay={100}>
            <div className="rounded-2xl border bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md" style={{ borderColor: LINE }}>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold">{L.profilePub.name}</div>
                <span className="rounded-full px-3 py-1 text-[11px] font-bold text-white" style={{ background: NAVY }}>
                  {L.profilePub.status}
                </span>
              </div>
              <div className="mt-4 flex gap-6 text-sm" style={{ color: MUTED }}>
                <span>{L.profilePub.indicators}</span>
                <span>{L.profilePub.updated}</span>
              </div>
              {/* grade mix bar */}
              <div className="mt-5">
                <div className="mb-2 text-xs font-medium" style={{ color: MUTED }}>{L.profilePub.grades}</div>
                <div className="flex h-3 overflow-hidden rounded-full" dir="ltr">
                  {(["A", "B", "C", "D"] as const).map((g, i) => (
                    <div key={g} style={{ width: ["30%", "40%", "20%", "10%"][i], background: GRADE_COLORS[g] }} title={`Grade ${g}`} />
                  ))}
                </div>
                <div className="mt-2 flex gap-4 text-[11px]" style={{ color: MUTED }} dir="ltr">
                  {(["A", "B", "C", "D"] as const).map((g) => (
                    <span key={g} className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ background: GRADE_COLORS[g] }} />
                      <span className="latin font-mono font-bold">{g}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 text-sm font-semibold" style={{ color: NAVY }}>
                {L.profilePub.cta} <span className="inline-block rtl:rotate-180">→</span>
              </div>
            </div>
          </Reveal>

          {/* data-gap profile card */}
          <Reveal delay={200}>
            <div
              className="rounded-2xl border-2 border-dashed p-7 transition hover:-translate-y-1"
              style={{ borderColor: "#e3a63b", background: "#fdf8ee" }}
            >
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold">{L.profileGap.name}</div>
                <span className="rounded-full px-3 py-1 text-[11px] font-bold" style={{ background: "#e3a63b", color: "#fff" }}>
                  {L.profileGap.status}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "#7a5a1a" }}>
                {L.profileGap.message}
              </p>
              <div className="mt-6">
                <a
                  href="#cta"
                  className="inline-block rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ background: "#b07a1e" }}
                >
                  {L.profileGap.cta}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <p className="mt-10 text-center text-lg font-medium italic" style={{ color: "#b07a1e" }}>
            “{L.gapQuote}”
          </p>
        </Reveal>
      </section>

      {/* ===== THE RULE ===== */}
      <section id="rule" className="border-y bg-white scroll-mt-20" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{L.ruleTitle}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed" style={{ color: MUTED }}>{L.ruleLead}</p>
          </Reveal>

          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">
            {/* evidence chain */}
            <Reveal delay={100}>
              <div className="rounded-2xl border p-7" style={{ borderColor: LINE, background: BG }}>
                <div className="text-sm" style={{ color: MUTED }}>{L.sample.indicator}</div>
                <div className="latin mt-1 font-mono text-5xl font-bold" style={{ color: INK }}>
                  {L.sample.value}
                </div>
                <div className="mt-6 flex flex-wrap items-stretch gap-3">
                  {(
                    [
                      { k: "source", v: L.sample.source },
                      { k: "year", v: L.sample.year },
                      { k: "grade", v: L.sample.grade },
                    ] as const
                  ).map(({ k, v }, i) => (
                    <div key={k} className="flex items-center gap-3">
                      {i > 0 && <span style={{ color: MUTED }}>·</span>}
                      <div className="rounded-lg border bg-white px-4 py-2.5" style={{ borderColor: LINE }}>
                        <div className="latin font-mono text-[10px] tracking-[0.2em]" style={{ color: CYAN === "#1fc2f2" ? "#0e8fc9" : CYAN }}>
                          {L.chips[k]}
                        </div>
                        <div className="mt-0.5 text-sm font-semibold" style={k === "grade" ? { color: GRADE_COLORS[v] } : undefined}>
                          {v}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <a href="#pipeline" className="mt-6 inline-block text-sm font-semibold underline underline-offset-4" style={{ color: NAVY }}>
                  {L.methodology}
                </a>
              </div>
            </Reveal>

            {/* grade scale */}
            <Reveal delay={200}>
              <div className="space-y-2.5">
                {t.rule.grades.map(({ g, label }) => (
                  <div key={g} className="flex items-center gap-4 rounded-xl border bg-white px-4 py-3" style={{ borderColor: LINE }}>
                    <span
                      className="latin flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-base font-bold text-white"
                      style={{ background: GRADE_COLORS[g] }}
                    >
                      {g}
                    </span>
                    <span className="text-sm" style={{ color: INK }}>{label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== PIPELINE ===== */}
      <section id="pipeline" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.pipeline.title}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed" style={{ color: MUTED }}>{t.pipeline.lead}</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10 overflow-x-auto pb-2">
            <div className="flex min-w-[720px]">
              {t.pipeline.steps.map((s, i) => {
                const isGate = i === t.pipeline.steps.length - 2;
                return (
                  <div key={i} className="relative flex-1 text-center">
                    {i > 0 && <div className="absolute top-[15px] h-px w-full -translate-x-1/2 rtl:translate-x-1/2" style={{ background: LINE }} />}
                    <div
                      className="latin relative z-[1] mx-auto flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white font-mono text-xs font-bold"
                      style={isGate ? { borderColor: "#e3a63b", color: "#b07a1e" } : { borderColor: NAVY, color: NAVY }}
                    >
                      {i + 1}
                    </div>
                    <div className="mt-2 px-2 text-xs font-medium leading-snug" style={{ color: INK }}>{s}</div>
                    {isGate && (
                      <div className="latin mt-1 font-mono text-[9px] font-bold tracking-widest" style={{ color: "#b07a1e" }}>
                        GATE
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <p className="mt-4 border-s-4 ps-4 text-sm" style={{ borderColor: "#e3a63b", color: MUTED }}>
            {t.pipeline.gate}
          </p>
        </Reveal>
      </section>

      {/* ===== PLATFORM ===== */}
      <section id="platform" className="border-y bg-white scroll-mt-20" style={{ borderColor: LINE }}>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.platform.title}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed" style={{ color: MUTED }}>{t.platform.lead}</p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.platform.features.map((f, i) => (
              <Reveal key={i} delay={i * 60} className="h-full">
                <div className="h-full rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-md" style={{ borderColor: LINE, background: BG }}>
                  <div className="latin font-mono text-xs font-bold" style={{ color: "#0e8fc9" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-2 font-semibold">{f.name}</div>
                  <p className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTED }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GUARANTEES + CTA ===== */}
      <section id="cta" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
        <div className="grid gap-4 sm:grid-cols-3">
          {t.guarantees.map((g, i) => (
            <Reveal key={i} delay={i * 90} className="h-full">
              <div className="flex h-full items-start gap-3 rounded-xl border bg-white p-5" style={{ borderColor: LINE }}>
                <svg className="mt-0.5 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Zm-2.5 9 2 2 3.5-4" />
                </svg>
                <p className="text-sm font-medium leading-relaxed">{g}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div
            className="mt-14 rounded-3xl px-8 py-14 text-center text-white"
            style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #123468 60%, #0d2850 100%)` }}
          >
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight">{t.cta.title}</h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/75">{t.cta.sub}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#map"
                className="rounded-full px-8 py-3.5 text-sm font-bold transition hover:opacity-90"
                style={{ background: CYAN, color: "#052038" }}
              >
                {t.cta.button}
              </a>
              <span className="latin font-mono text-xs tracking-[0.18em] text-white/50">{t.cta.secondary}</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t bg-white" style={{ borderColor: LINE }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-7 text-center sm:flex-row sm:text-start">
          <div className="text-sm font-medium">{t.footer.tagline}</div>
          <div className="text-xs" style={{ color: MUTED }}>
            © 2026 {t.footer.rights} · {t.footer.bilingual}
          </div>
        </div>
      </footer>
    </div>
  );
}
