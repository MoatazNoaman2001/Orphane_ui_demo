"use client";

import { useEffect, useState, ViewTransition } from "react";
import Link from "next/link";
import DotGlobe from "./DotGlobe";
import WorldDotMap from "./WorldDotMap";
import SiteNav, { Mark } from "./SiteNav";
import { GRADE_COLORS, Reveal, Scramble, SpotCard, TONE_COLORS, tint } from "./motion";
import { useLang, useTheme } from "./prefs";
import { content } from "../content";

/* ---------- feature icons ---------- */
function FeatureIcon({ i }: { i: number }) {
  const paths = [
    <path key="0" d="M12 21s-6.5-5.4-6.5-10.3A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.7C18.5 15.6 12 21 12 21Zm0-8.2a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z" />,
    <path key="1" d="M4 19a9 9 0 1 1 16 0M12 14l4-5M12 14.5a1.5 1.5 0 1 0 0 .01" />,
    <path key="2" d="M5 4h9a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3V4Zm3 4h6M8 11h6" />,
    <path key="3" d="M9 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 8a6 6 0 0 1 12 0M16 5.5a3.5 3.5 0 0 1 0 6.6M15 14.6a6 6 0 0 1 6 5.4" />,
    <path key="4" d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Zm-2.5 9 2 2 3.5-4" />,
    <path key="5" d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14" />,
  ];
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[i]}
    </svg>
  );
}

export default function Landing() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const t = content[lang];

  const [chips, setChips] = useState({ source: false, year: false, grade: false });
  const valid = chips.source && chips.year && chips.grade;
  const [activeGrade, setActiveGrade] = useState("B");
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % (t.pipeline.steps.length + 2)), 1500);
    return () => clearInterval(id);
  }, [t.pipeline.steps.length]);

  const toggleChip = (k: keyof typeof chips) => setChips((c) => ({ ...c, [k]: !c[k] }));

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
    <div className="relative isolate min-h-screen bg-ink-950 text-foreground">
      <div className="page-atmosphere pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      {/* ================= NAV ================= */}
      <SiteNav
        title={t.hero.kicker}
        subtitle={`OCF · ${t.hero.firstRelease}`}
        homeHref="#top"
        links={[
          { href: "#rule", label: t.nav.rule },
          { href: "#pipeline", label: t.nav.pipeline },
          { href: "#countries", label: t.nav.countries },
          { href: "#platform", label: t.nav.platform },
        ]}
        cta={{ href: "/designs/observatory/access", label: t.nav.cta }}
      />

      {/* ================= HERO ================= */}
      <section id="top" className="relative overflow-hidden pt-16">
        <div className="grid-lines pointer-events-none absolute inset-0" />

        {/* aurora ambience — hero only; the rest of the page relies on the shared atmosphere */}
        <div
          className="aurora aurora-a -top-32 left-[8%] h-[420px] w-[420px] opacity-40"
          style={{ background: "radial-gradient(circle, #1c4791 0%, transparent 62%)" }}
        />
        <div
          className="aurora aurora-b top-[10%] right-[-6%] h-[480px] w-[480px] opacity-30"
          style={{ background: "radial-gradient(circle, #1fc2f2 0%, transparent 60%)" }}
        />

        {/* faint globe behind text on mobile */}
        <div className="pointer-events-none absolute inset-x-0 top-24 mx-auto aspect-square w-[130%] max-w-[560px] opacity-25 lg:hidden">
          <DotGlobe light={theme === "light"} className="h-full w-full" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 pt-16 lg:grid-cols-[1.15fr_1fr] lg:pb-28 lg:pt-24">
          <div>
            <Reveal>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-ink-900/60 px-4 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-accent" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-xs font-medium tracking-wide text-foreground/80">
                  {t.hero.org} · {t.hero.firstRelease}
                </span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                {t.hero.headline1}
                <br />
                <span className="shimmer-text">{t.hero.headline2}</span>
                <span className="caret-blink text-accent">_</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/65 sm:text-lg">
                {t.hero.sub}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#rule"
                  className="rounded-full bg-gradient-to-r from-accent to-[#4f9de8] px-7 py-3 text-sm font-semibold text-[#052038] shadow-[0_0_28px_rgba(31,194,242,0.4)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(31,194,242,0.65)]"
                >
                  {t.hero.ctaPrimary}
                </a>
                <Link
                  href="/designs/observatory/methodology"
                  transitionTypes={["nav-forward"]}
                  className="rounded-full border border-line bg-ink-900/40 px-7 py-3 text-sm font-medium text-foreground/80 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                >
                  {t.hero.ctaSecondary}
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative hidden lg:block">
            <div className="relative aspect-square">
              <DotGlobe light={theme === "light"} className="h-full w-full" />
              {/* radar sweep + orbit rings */}
              <div className="radar pointer-events-none absolute rounded-full" style={{ inset: "6%" }} />
              <div
                className="ring-spin pointer-events-none absolute rounded-full border border-dashed border-accent/25"
                style={{ inset: "2%" }}
              />
              <div className="pointer-events-none absolute rounded-full border border-line" style={{ inset: "6%" }} />
            </div>
          </Reveal>
        </div>

        {/* stats — each one a "verified record" */}
        <div className="relative border-t border-line">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 gap-px border-x border-line bg-line lg:grid-cols-4">
              {t.stats.map((s, i) => (
                <Reveal key={i} delay={i * 90} className="h-full bg-ink-900">
                  <SpotCard className="h-full px-6 py-7">
                    <div className="latin font-mono text-3xl font-bold text-accent sm:text-4xl">
                      <Scramble value={s.value} />
                    </div>
                    <div className="mt-1.5 text-sm text-foreground/60">{s.label}</div>
                    <div className="latin mt-3 inline-block rounded border border-accent/25 bg-accent/5 px-2 py-0.5 font-mono text-[10px] tracking-[0.18em] text-accent/80">
                      {s.chip}
                    </div>
                  </SpotCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= TICKER ================= */}
      <div className="border-y border-line" dir="ltr" title={t.tickerNote}>
        <div className="overflow-hidden py-3">
          <div className="ticker-track flex gap-10">
            {[...t.ticker, ...t.ticker].map((item, i) => (
              <span key={i} className="flex shrink-0 items-center gap-3 font-mono text-xs tracking-wide text-foreground/55">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: TONE_COLORS[item.tone], boxShadow: `0 0 8px ${TONE_COLORS[item.tone]}` }}
                />
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ================= §01 THE RULE ================= */}
      <section id="rule" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
        <Reveal>
          <div className="latin font-mono text-sm tracking-[0.3em] text-accent">{t.rule.no}</div>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">{t.rule.title}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/65">{t.rule.lead}</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* interactive identity card */}
          <Reveal delay={100}>
            <SpotCard
              className={`relative rounded-2xl border bg-ink-900/70 p-7 backdrop-blur-sm transition-colors duration-500 ${
                valid ? "border-accent/30 shadow-[0_0_50px_rgba(28,71,145,0.25)]" : "border-line"
              }`}
            >
              <div className="latin flex items-center justify-between font-mono text-[11px] tracking-[0.22em] text-foreground/45">
                <span>{t.rule.cardTitle}</span>
                <span>#IND-0042</span>
              </div>

              <div className="mt-6 text-sm text-foreground/70">{t.rule.indicator}</div>
              <div className="mt-2 flex items-end gap-3">
                <div className={`latin font-mono text-6xl font-bold tracking-tight ${valid ? "num-valid text-foreground" : "num-invalid text-foreground"}`}>
                  12,480
                </div>
                <div className="latin mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                  {t.rule.valueNote}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                {(["source", "year", "grade"] as const).map((k) => (
                  <button
                    key={k}
                    onClick={() => toggleChip(k)}
                    className={`group rounded-lg border px-4 py-2.5 text-start transition ${
                      chips[k]
                        ? "border-accent/35 bg-accent/5 hover:border-accent/70"
                        : "border-dashed border-accent/40 bg-transparent opacity-70 hover:opacity-100 hover:border-accent/70"
                    }`}
                  >
                    <div className="latin font-mono text-[10px] tracking-[0.2em] text-accent/70">{t.rule.chips[k]}</div>
                    <div className={`mt-0.5 text-sm font-medium ${chips[k] ? "text-foreground" : "text-accent/60"}`}>
                      {!chips[k] ? (
                        <span className="latin font-mono">+</span>
                      ) : k === "grade" ? (
                        <span className="latin font-mono" style={{ color: GRADE_COLORS[t.rule.chipValues.grade] }}>
                          {t.rule.chipValues.grade}
                        </span>
                      ) : (
                        t.rule.chipValues[k]
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div
                className={`mt-7 flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-500 ${
                  valid ? "bg-accent/10 text-accent" : "bg-warn/10 text-warn"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${valid ? "bg-accent" : "bg-warn"}`} />
                {valid ? t.rule.statusOk : t.rule.statusBad}
              </div>
              <div className="mt-4 text-xs text-foreground/40">{t.rule.hint}</div>
            </SpotCard>
          </Reveal>

          {/* confidence scale */}
          <Reveal delay={200}>
            <div className="rounded-2xl border border-line bg-ink-900/40 p-7 backdrop-blur-sm">
              <div className="latin font-mono text-[11px] tracking-[0.22em] text-foreground/45">
                {t.rule.gradesTitle}
              </div>
              <div className="mt-6 space-y-2.5">
                {t.rule.grades.map(({ g, label }) => {
                  const active = activeGrade === g;
                  return (
                    <button
                      key={g}
                      onMouseEnter={() => setActiveGrade(g)}
                      onFocus={() => setActiveGrade(g)}
                      className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3 text-start transition-all duration-300 ${
                        active ? "border-transparent bg-ink-800" : "border-line bg-transparent opacity-60 hover:opacity-100"
                      }`}
                      style={active ? { boxShadow: `inset 3px 0 0 ${GRADE_COLORS[g]}, 0 0 24px ${tint(GRADE_COLORS[g], 13)}` } : undefined}
                    >
                      <span
                        className="latin flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-base font-bold"
                        style={{ background: tint(GRADE_COLORS[g], 10), color: GRADE_COLORS[g], border: `1px solid ${tint(GRADE_COLORS[g], 33)}` }}
                      >
                        {g}
                      </span>
                      <span className="text-sm text-foreground/80">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= §02 PIPELINE ================= */}
      <section id="pipeline" className="relative scroll-mt-24 overflow-hidden border-y border-line">
        <div className="relative mx-auto max-w-6xl px-5 py-24">
          <Reveal>
            <div className="latin font-mono text-sm tracking-[0.3em] text-accent">{t.pipeline.no}</div>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">{t.pipeline.title}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-foreground/65">{t.pipeline.lead}</p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-14 overflow-x-auto pb-4">
              <div className="flex min-w-[760px] items-start">
                {t.pipeline.steps.map((s, i) => {
                  const state = i < step ? "done" : i === step ? "active" : "todo";
                  const isGate = i === t.pipeline.steps.length - 2;
                  return (
                    <div key={i} className="relative flex-1">
                      {i > 0 && (
                        <div className="absolute top-[15px] h-px w-full -translate-x-1/2 rtl:translate-x-1/2">
                          <div className="h-full w-full bg-foreground/15" />
                          <div
                            className="absolute inset-0 origin-left bg-accent transition-transform duration-700 rtl:origin-right"
                            style={{ transform: `scaleX(${i <= step ? 1 : 0})` }}
                          />
                        </div>
                      )}
                      <div className="relative flex flex-col items-center text-center">
                        <div
                          className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 ${
                            state === "done"
                              ? "border-accent bg-accent text-background"
                              : state === "active"
                              ? "border-accent bg-ink-950 font-semibold text-accent"
                              : "border-foreground/25 bg-ink-950 text-foreground/40"
                          }`}
                          style={state === "active" ? { boxShadow: "0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent)" } : undefined}
                        >
                          {state === "done" ? (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="latin font-mono text-[11px]">{i + 1}</span>
                          )}
                        </div>
                        <div className={`mt-3 px-2 text-xs font-medium leading-snug transition-colors duration-500 ${state === "todo" ? "text-foreground/35" : "text-foreground/85"}`}>
                          {s}
                        </div>
                        {isGate && (
                          <div className="latin mt-2 rounded border border-warn/40 bg-warn/10 px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-warn">
                            GATE
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs text-warn/90">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z" />
                </svg>
                {t.pipeline.gate}
              </div>
              <Link
                href="/designs/observatory/access"
                transitionTypes={["nav-forward"]}
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-ink-900/40 px-5 py-2 text-xs font-medium text-foreground/75 transition duration-300 hover:border-accent/50 hover:text-accent"
              >
                {t.pipeline.cta}
                <svg className="transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= §03 COUNTRIES ================= */}
      <section id="countries" className="relative scroll-mt-24 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="latin font-mono text-sm tracking-[0.3em] text-accent">{t.countries.no}</div>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">{t.countries.title}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-foreground/65">{t.countries.lead}</p>
          </Reveal>
        </div>

        {/* full-bleed dot-matrix world map — hover a glowing country for its status card */}
        <Reveal delay={100}>
          <div className="mt-12 w-full">
            <WorldDotMap lang={lang} />
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-6xl gap-5 px-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.countries.states.map((st, i) => {
            const colors = ["var(--state-pub)", "var(--state-prep)", "var(--state-gap)", "var(--state-internal)"];
            const c = colors[i];
            return (
              <Reveal key={i} delay={i * 100} className="h-full">
                <SpotCard className="group h-full rounded-2xl border border-line bg-ink-900/50 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_10px_40px_rgba(28,71,145,0.35)]">
                  <div
                    className="latin inline-block rounded px-2 py-1 font-mono text-[10px] font-semibold tracking-[0.18em]"
                    style={{ background: tint(c, 10), color: c, border: `1px solid ${tint(c, 27)}` }}
                  >
                    {st.tag}
                  </div>
                  <div className="mt-4 text-lg font-semibold">{st.name}</div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60">{st.desc}</p>
                </SpotCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <p className="mt-12 text-center text-lg font-medium sm:text-xl">
            <span className="shimmer-text">{t.countries.gapNote}</span>
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/designs/observatory/countries"
              transitionTypes={["nav-forward"]}
              className="group inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-ink-900/40 px-7 py-3 text-sm font-semibold text-accent backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-accent/10 hover:shadow-[0_0_32px_rgba(31,194,242,0.35)]"
            >
              {t.countries.ctaList}
              <svg className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/designs/observatory/country"
              transitionTypes={["nav-forward"]}
              className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-900/40 px-7 py-3 text-sm font-medium text-foreground/75 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
            >
              {t.countries.cta}
              <svg className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ================= §04 PLATFORM ================= */}
      <section id="platform" className="scroll-mt-24 border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Reveal>
            <div className="latin font-mono text-sm tracking-[0.3em] text-accent">{t.platform.no}</div>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">{t.platform.title}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-foreground/65">{t.platform.lead}</p>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {t.platform.features.map((f, i) => {
              const href =
                i === 0
                  ? "/designs/observatory/countries"
                  : i === 1
                  ? "/designs/observatory/indicators"
                  : i === 2
                  ? "/designs/observatory/sources"
                  : i === 3
                  ? "/designs/observatory/access"
                  : i === 5
                  ? "/designs/observatory/reports"
                  : undefined;
              const card = (
                <SpotCard className="group h-full bg-ink-900 p-7 transition-colors duration-300 hover:bg-ink-850">
                  <div className="flex items-start justify-between">
                    <div className="inline-flex rounded-xl border border-accent/20 bg-accent/5 p-2.5 text-accent/80 transition duration-300 group-hover:border-accent/50 group-hover:text-accent group-hover:shadow-[0_0_20px_rgba(31,194,242,0.25)]">
                      <FeatureIcon i={i} />
                    </div>
                    {href && (
                      <svg
                        className="mt-1 text-foreground/30 transition-colors duration-300 group-hover:text-accent rtl:rotate-180"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17 17 7M9 7h8v8" />
                      </svg>
                    )}
                  </div>
                  <div className="mt-4 font-semibold">{f.name}</div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/55">{f.desc}</p>
                </SpotCard>
              );
              return (
                <Reveal key={i} delay={i * 70} className="h-full">
                  {href ? (
                    <Link href={href} transitionTypes={["nav-forward"]} className="block h-full">
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= GUARANTEES ================= */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-px border-x border-line bg-line sm:grid-cols-3">
            {t.guarantees.map((g, i) => (
              <Reveal key={i} delay={i * 110} className="h-full bg-ink-900">
                <div className="flex h-full items-start gap-3 px-6 py-8">
                  <svg className="mt-0.5 shrink-0 text-accent" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Zm-2.5 9 2 2 3.5-4" />
                  </svg>
                  <p className="text-sm font-medium leading-relaxed text-foreground/80">{g}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section id="cta" className="relative scroll-mt-24 overflow-hidden border-t border-line">
        <div className="relative mx-auto max-w-3xl px-5 py-28 text-center">
          <Reveal>
            <Mark size={52} />
            <h2 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">{t.cta.title}</h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-foreground/65">{t.cta.sub}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/designs/observatory/access"
                transitionTypes={["nav-forward"]}
                className="rounded-full bg-gradient-to-r from-accent to-[#4f9de8] px-8 py-3.5 text-sm font-semibold text-[#052038] shadow-[0_0_28px_rgba(31,194,242,0.4)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(31,194,242,0.65)]"
              >
                {t.cta.button}
              </Link>
              <span className="latin font-mono text-xs tracking-[0.18em] text-foreground/40">
                {t.cta.secondary}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-center sm:flex-row sm:text-start">
          <div className="flex items-center gap-3">
            <Mark size={26} />
            <div>
              <div className="text-sm font-medium">{t.footer.tagline}</div>
              <div className="text-xs text-foreground/45">
                © 2026 {t.footer.rights} · {t.footer.bilingual}
              </div>
            </div>
          </div>
          <div className="latin max-w-full text-center font-mono text-[10px] leading-relaxed tracking-[0.18em] text-foreground/35 sm:text-start">
            EVERY NUMBER · A SOURCE · A YEAR · A GRADE
          </div>
        </div>
      </footer>
    </div>
    </ViewTransition>
  );
}
