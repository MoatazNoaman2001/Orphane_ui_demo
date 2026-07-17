"use client";

import { useMemo, useState, ViewTransition } from "react";
import SiteNav from "./SiteNav";
import { GRADE_COLORS, Reveal, SpotCard, tint } from "./motion";
import {
  DASH_COUNTRIES,
  DASH_INDICATORS,
  indicatorsContent,
  type IndicatorCategory,
} from "../content-indicators";
import { content } from "../content";
import { useLang } from "./prefs";

const nf = new Intl.NumberFormat("en-US");

function GradeChip({ grade }: { grade: string }) {
  const c = GRADE_COLORS[grade];
  return (
    <span
      className="latin inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold"
      style={{ background: tint(c, 12), color: c, border: `1px solid ${tint(c, 33)}` }}
    >
      {grade}
    </span>
  );
}

export default function IndicatorsPage() {
  const { lang } = useLang();
  const t = indicatorsContent[lang];
  const shared = content[lang];

  const [country, setCountry] = useState("TUR");
  const [category, setCategory] = useState<IndicatorCategory | "all">("all");
  const [compareId, setCompareId] = useState("institutional-care");

  const visible = useMemo(
    () => DASH_INDICATORS.filter((ind) => category === "all" || ind.category === category),
    [category]
  );

  const compared = DASH_INDICATORS.find((i) => i.id === compareId)!;
  const compareRows = DASH_COUNTRIES.map((c) => ({ country: c, value: compared.values[c.iso] }));
  const compareMax = Math.max(...compareRows.map((r) => r.value?.v ?? 0), 1);

  const CATS: (IndicatorCategory | "all")[] = ["all", "need", "coverage", "sponsorship", "quality", "capacity"];

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <div className="relative isolate min-h-screen bg-ink-950 text-foreground">
        <div className="page-atmosphere pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="noise" aria-hidden="true" />

        <SiteNav
          title={shared.hero.kicker}
          subtitle={`OCF · ${t.hero.title}`}
          homeHref="/designs/observatory"
          links={[
            { href: "#by-country", label: t.nav.byCountry },
            { href: "#compare", label: t.nav.compare },
          ]}
          cta={{ href: "/designs/observatory", label: `← ${t.backToObservatory}`, back: true }}
        />

        <main className="pt-16">
          {/* ---------- header ---------- */}
          <section className="mx-auto max-w-6xl px-5 pt-12">
            <Reveal>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.hero.title}</h1>
              <p className="mt-4 max-w-2xl leading-relaxed text-foreground/65">{t.hero.lead}</p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-md border border-dashed border-line bg-ink-900/40 px-3 py-2 text-xs text-foreground/55">
                <svg className="shrink-0 text-accent/70" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v4m0 4h.01" />
                </svg>
                {t.dataNote}
              </p>
            </Reveal>
          </section>

          {/* ---------- by country ---------- */}
          <section id="by-country" className="scroll-mt-24">
            <div className="mx-auto max-w-6xl px-5 py-10">
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">{t.byCountryTitle}</h2>
                    <p className="mt-2 text-sm text-foreground/55">{t.byCountryLead}</p>
                  </div>
                </div>

                {/* controls */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="latin font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                      {t.countryLabel}
                    </span>
                    <div className="flex flex-wrap rounded-lg border border-line bg-ink-900/60 p-1">
                      {DASH_COUNTRIES.map((c) => (
                        <button
                          key={c.iso}
                          onClick={() => setCountry(c.iso)}
                          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                            country === c.iso ? "bg-ink-800 text-accent" : "text-foreground/55 hover:text-foreground"
                          }`}
                        >
                          {lang === "ar" ? c.ar : c.en}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap rounded-lg border border-line bg-ink-900/60 p-1">
                    {CATS.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                          category === cat ? "bg-ink-800 text-accent" : "text-foreground/55 hover:text-foreground"
                        }`}
                      >
                        {t.categories[cat]}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* indicator cards for the selected country */}
              <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {visible.map((ind, i) => {
                  const val = ind.values[country];
                  const selected = compareId === ind.id;
                  return (
                    <Reveal key={ind.id} delay={(i % 4) * 60} className="h-full">
                      <button className="h-full w-full text-start" onClick={() => setCompareId(ind.id)}>
                        <SpotCard
                          className={`flex h-full flex-col rounded-xl border p-5 backdrop-blur-sm transition-colors duration-300 ${
                            selected ? "border-accent/60 bg-ink-900/70" : "border-line bg-ink-900/50 hover:border-accent/40"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="latin rounded border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/45">
                              {t.categories[ind.category]}
                            </span>
                            {val ? <GradeChip grade={val.grade} /> : (
                              <span
                                className="latin rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold"
                                style={{ background: tint(GRADE_COLORS.E, 10), color: GRADE_COLORS.E, border: `1px solid ${tint(GRADE_COLORS.E, 27)}` }}
                              >
                                {t.gapBadge}
                              </span>
                            )}
                          </div>
                          <div className="mt-3 text-sm leading-snug text-foreground/75">{lang === "ar" ? ind.ar : ind.en}</div>
                          <div className="mt-auto pt-4">
                            {val ? (
                              <>
                                <div className="latin font-mono text-2xl font-bold tracking-tight text-foreground">{nf.format(val.v)}</div>
                                <div className="mt-2 flex items-center gap-2 border-t border-line pt-2.5">
                                  <span className="latin rounded border border-accent/25 bg-accent/5 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.15em] text-accent/80">
                                    {val.year}
                                  </span>
                                  <span className="min-w-0 flex-1 truncate text-[11px] text-foreground/45">
                                    {lang === "ar" ? ind.sourceAr : ind.sourceEn}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <div className="border-t border-line pt-3 text-sm text-foreground/40">{t.noValue}</div>
                            )}
                          </div>
                        </SpotCard>
                      </button>
                    </Reveal>
                  );
                })}
                {visible.length === 0 && (
                  <div className="col-span-full rounded-xl border border-dashed border-line p-10 text-center text-sm text-foreground/45">
                    {t.emptyCategory}
                  </div>
                )}
              </div>
              <p className="mt-3 text-xs text-foreground/40">{t.compareHint}</p>
            </div>
          </section>

          {/* ---------- compare ---------- */}
          <section id="compare" className="scroll-mt-24 border-t border-line">
            <div className="mx-auto max-w-6xl px-5 py-14">
              <Reveal>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.compareTitle}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/55">{t.compareLead}</p>
              </Reveal>

              <Reveal delay={90}>
                <div className="mt-7 rounded-xl border border-line bg-ink-900/40 p-6 backdrop-blur-sm sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                    <div className="text-base font-semibold">{lang === "ar" ? compared.ar : compared.en}</div>
                    <span className="latin rounded border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
                      {t.categories[compared.category]}
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    {compareRows.map(({ country: c, value }) => (
                      <div key={c.iso} className="grid grid-cols-[7.5rem_1fr_auto] items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-foreground/75">
                          <span className="latin w-9 shrink-0 rounded border border-line px-1 py-0.5 text-center font-mono text-[10px] text-foreground/45">
                            {c.iso}
                          </span>
                          <span className="truncate">{lang === "ar" ? c.ar : c.en}</span>
                        </div>
                        {value ? (
                          <>
                            <div className="h-5 overflow-hidden rounded bg-ink-800/60">
                              <div
                                className="h-full rounded transition-[width] duration-700 ease-out"
                                style={{
                                  width: `${Math.max((value.v / compareMax) * 100, 2)}%`,
                                  background: `linear-gradient(90deg, ${tint("var(--accent)", 65)}, var(--accent))`,
                                }}
                              />
                            </div>
                            <div className="flex items-center gap-2.5">
                              <span className="latin w-28 text-end font-mono text-sm font-semibold text-foreground">
                                {nf.format(value.v)}
                              </span>
                              <span className="latin font-mono text-[10px] text-foreground/40">{value.year}</span>
                              <GradeChip grade={value.grade} />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="h-5 rounded border border-dashed border-line" />
                            <div className="flex items-center justify-end gap-2.5">
                              <span className="text-xs text-foreground/40">{t.noValue}</span>
                              <span
                                className="latin rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold"
                                style={{ background: tint(GRADE_COLORS.E, 10), color: GRADE_COLORS.E, border: `1px solid ${tint(GRADE_COLORS.E, 27)}` }}
                              >
                                {t.gapBadge}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ---------- footer ---------- */}
          <footer className="border-t border-line">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-8">
              <p className="text-xs leading-relaxed text-foreground/45">{t.dataNote}</p>
              <div className="latin shrink-0 font-mono text-[10px] tracking-[0.22em] text-foreground/35">
                EVERY NUMBER · A SOURCE · A YEAR · A GRADE
              </div>
            </div>
          </footer>
        </main>
      </div>
    </ViewTransition>
  );
}
