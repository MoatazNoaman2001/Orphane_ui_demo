"use client";

import { useState, ViewTransition } from "react";
import SiteNav from "./SiteNav";
import CountryOutlineMap from "./CountryOutlineMap";
import { GRADE_COLORS, Reveal, SpotCard, tint } from "./motion";
import { countryContent, type CountryIndicator, type PageState } from "../content-country";
import { content } from "../content";
import { useLang } from "./prefs";

const nf = new Intl.NumberFormat("en-US");

const STATE_COLORS: Record<PageState, string> = {
  published: "var(--state-pub)",
  preparing: "var(--state-prep)",
  gap: "var(--state-gap)",
  internal: "var(--state-internal)",
};

function GradeChip({ grade, size = "md" }: { grade: string; size?: "md" | "lg" }) {
  const c = GRADE_COLORS[grade];
  const cls = size === "lg" ? "h-9 w-9 rounded-lg text-base" : "h-6 w-6 rounded-md text-xs";
  return (
    <span
      className={`latin inline-flex shrink-0 items-center justify-center font-mono font-bold ${cls}`}
      style={{ background: tint(c, 12), color: c, border: `1px solid ${tint(c, 33)}` }}
    >
      {grade}
    </span>
  );
}

function IndicatorCard({ item, delay }: { item: CountryIndicator; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <SpotCard className="flex h-full flex-col rounded-xl border border-line bg-ink-900/50 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-accent/40">
        <div className="flex items-start justify-between gap-3">
          <div className="text-sm leading-snug text-foreground/75">{item.name}</div>
          <GradeChip grade={item.grade} />
        </div>
        <div className="latin mt-4 font-mono text-3xl font-bold tracking-tight text-foreground">
          {item.value !== null ? nf.format(item.value) : item.text}
          {item.unit && <span className="ms-1 text-base font-medium text-foreground/50">{item.unit}</span>}
        </div>
        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center gap-2 border-t border-line pt-3.5">
            <span className="latin rounded border border-accent/25 bg-accent/5 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.15em] text-accent/80">
              {item.year}
            </span>
            <span className="min-w-0 flex-1 truncate text-xs text-foreground/50" title={item.source}>
              {item.source}
            </span>
          </div>
          {item.note && <div className="mt-2 text-[11px] leading-relaxed text-foreground/40">{item.note}</div>}
        </div>
      </SpotCard>
    </Reveal>
  );
}

export default function CountryPage() {
  const { lang } = useLang();
  const t = countryContent[lang];
  const shared = content[lang];
  const [state, setState] = useState<PageState>("published");

  const stateColor = STATE_COLORS[state];

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
          subtitle={`OCF · ${t.hero.name}`}
          homeHref="/designs/observatory"
          links={[
            { href: "#overview", label: t.nav.overview },
            { href: "#indicators", label: t.nav.indicators },
            { href: "#sources", label: t.nav.sources },
            { href: "#partners", label: t.nav.partners },
          ]}
          cta={{ href: "/designs/observatory", label: `← ${t.backToObservatory}`, back: true }}
        />

        <main className="pt-16">
          {/* ---------- page-state preview (presentation aid, not a product control) ---------- */}
          <div className="mx-auto max-w-6xl px-5 pt-6">
            <div className="flex flex-col gap-3 rounded-xl border border-dashed border-line bg-ink-900/40 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="latin font-mono text-[10px] tracking-[0.22em] text-accent">{t.demoBar.label}</div>
                <div className="mt-1 max-w-xl text-xs leading-relaxed text-foreground/55">{t.demoBar.note}</div>
              </div>
              <div className="flex shrink-0 rounded-lg border border-line bg-ink-900/70 p-1">
                {(Object.keys(t.demoBar.states) as PageState[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setState(s)}
                    className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ${
                      state === s ? "text-ink-950" : "text-foreground/55 hover:text-foreground"
                    }`}
                    style={state === s ? { background: STATE_COLORS[s] } : undefined}
                  >
                    {t.demoBar.states[s]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- hero: identity + summary + map, one aligned block ---------- */}
          <section id="overview" className="scroll-mt-24">
            <div className="mx-auto max-w-6xl px-5 pb-12 pt-10">
              <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-stretch">
                <Reveal className="h-full">
                  <div className="flex h-full flex-col rounded-xl border border-line bg-ink-900/40 p-7 backdrop-blur-sm sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className="latin inline-flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-[11px] font-semibold tracking-[0.18em]"
                        style={{ background: tint(stateColor, 10), color: stateColor, border: `1px solid ${tint(stateColor, 27)}` }}
                      >
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: stateColor }} />
                        {t.hero.statusLabels[state]}
                      </span>
                      <span className="latin rounded-md border border-line px-2.5 py-1.5 font-mono text-[10px] tracking-[0.2em] text-foreground/50">
                        {t.hero.entity} · TUR
                      </span>
                      <span className="text-sm text-foreground/55">{t.hero.region}</span>
                    </div>

                    <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">{t.hero.name}</h1>

                    <p className="mt-5 max-w-2xl leading-relaxed text-foreground/70">{t.summary}</p>
                    <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-foreground/45">
                      <svg className="mt-0.5 shrink-0 text-accent/70" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Zm-2.5 9 2 2 3.5-4" />
                      </svg>
                      {t.identityNote}
                    </p>

                    {/* meta strip — pinned to the bottom edge of the block */}
                    <div className="mt-auto">
                      <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line pt-5">
                        <div className="flex items-center gap-3">
                          <span className="latin font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">{t.hero.pageGradeLabel}</span>
                          <GradeChip grade="A" size="lg" />
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="latin font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">{t.hero.lastUpdated}</span>
                          <span className="latin font-mono text-sm text-foreground/80">{t.hero.lastUpdatedValue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={100} className="h-full">
                  <div className="flex h-full flex-col rounded-xl border border-line bg-ink-900/40 p-5 backdrop-blur-sm">
                    <div className="latin flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-foreground/45">
                      <span>{t.mapCard.title}</span>
                      <span>36°N · 35°E</span>
                    </div>
                    <div className="mt-3 flex flex-1 items-center overflow-hidden rounded-lg border border-line-soft bg-ink-950/40 p-3 text-foreground">
                      <CountryOutlineMap lang={lang} color={stateColor} />
                    </div>
                    <div className="mt-3 text-[11px] leading-relaxed text-foreground/40">{t.mapCard.caption}</div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {state === "published" && (
            <>
              {/* ---------- indicators ---------- */}
              <section id="indicators" className="scroll-mt-24 border-t border-line">
                <div className="mx-auto max-w-6xl px-5 py-14">
                  <Reveal>
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.indicatorsTitle}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/55">{t.indicatorsLead}</p>
                  </Reveal>

                  {t.groups.map((g) => (
                    <div key={g.key} className="mt-11">
                      <Reveal>
                        <div className="flex items-baseline gap-4">
                          <h3 className="text-lg font-semibold">{g.title}</h3>
                          <span className="hidden text-xs text-foreground/40 sm:block">{g.desc}</span>
                        </div>
                      </Reveal>
                      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {g.items.map((item, i) => (
                          <IndicatorCard key={item.name} item={item} delay={i * 80} />
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* declared gaps */}
                  <div className="mt-11 grid gap-5 lg:grid-cols-3">
                    {t.gapGroups.map((g, i) => (
                      <Reveal key={g.key} delay={i * 90} className="h-full">
                        <div className="flex h-full flex-col rounded-xl border border-dashed border-line bg-ink-900/25 p-6">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-base font-semibold text-foreground/70">{g.title}</h3>
                            <span
                              className="latin shrink-0 rounded px-2 py-1 font-mono text-[10px] font-semibold tracking-[0.15em]"
                              style={{ background: tint(GRADE_COLORS.E, 10), color: GRADE_COLORS.E, border: `1px solid ${tint(GRADE_COLORS.E, 27)}` }}
                            >
                              {t.gapCard.badge}
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-foreground/40">{g.desc}</p>
                          <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-foreground/55">
                            {t.gapCard.message}
                          </p>
                        </div>
                      </Reveal>
                    ))}
                  </div>

                  {/* historical context strip */}
                  <Reveal delay={120}>
                    <div className="mt-11 flex flex-col gap-3 rounded-xl border border-line bg-ink-900/40 p-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <svg className="shrink-0 text-foreground/35" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3.5 2" />
                        </svg>
                        <div>
                          <div className="text-sm font-semibold text-foreground/75">{t.historical.title}</div>
                          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-foreground/45">{t.historical.note}</p>
                        </div>
                      </div>
                      <span className="latin shrink-0 self-start rounded border border-line px-2 py-1 font-mono text-[10px] tracking-[0.18em] text-foreground/40 sm:self-center">
                        {t.historical.badge}
                      </span>
                    </div>
                  </Reveal>
                </div>
              </section>

              {/* ---------- partners ---------- */}
              <section id="partners" className="scroll-mt-24 border-t border-line">
                <div className="mx-auto max-w-6xl px-5 py-14">
                  <Reveal>
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.partners.title}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/55">{t.partners.lead}</p>
                  </Reveal>
                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <Reveal>
                      <SpotCard className="flex h-full items-center gap-4 rounded-xl border border-line bg-ink-900/50 p-6">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-800/60 text-foreground/40">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 21V8l7-5 7 5v13M10 21v-6h4v6M3 21h18" />
                          </svg>
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5 text-sm font-semibold">
                            {t.partners.anonymousName}
                            <svg className="text-foreground/35" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17.9 17.9A9.7 9.7 0 0 1 12 20c-5.5 0-9-5-10-8 .6-1.7 1.9-3.9 3.8-5.5M9.9 4.2A9.9 9.9 0 0 1 12 4c5.5 0 9 5 10 8-.4 1-1 2.3-2 3.5M3 3l18 18M9.5 9.5a3.5 3.5 0 0 0 4.9 4.9" />
                            </svg>
                          </div>
                          <div className="mt-1 text-xs leading-relaxed text-foreground/45">{t.partners.anonymousNote}</div>
                        </div>
                      </SpotCard>
                    </Reveal>
                    <Reveal delay={90}>
                      <div className="flex h-full items-center rounded-xl border border-dashed border-line bg-transparent p-6">
                        <p className="text-xs leading-relaxed text-foreground/45">{t.partners.visibilityNote}</p>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </section>

              {/* ---------- sources ---------- */}
              <section id="sources" className="scroll-mt-24 border-t border-line">
                <div className="mx-auto max-w-6xl px-5 py-14">
                  <Reveal>
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.sourcesTitle}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/55">{t.sourcesLead}</p>
                  </Reveal>
                  <Reveal delay={100}>
                    <div className="mt-8 overflow-x-auto rounded-xl border border-line">
                      <table className="w-full min-w-[560px] text-sm">
                        <thead>
                          <tr className="latin border-b border-line bg-ink-900/60 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                            <th className="px-5 py-3.5 text-start font-medium">{t.columns.source}</th>
                            <th className="px-5 py-3.5 text-start font-medium">{t.columns.type}</th>
                            <th className="px-5 py-3.5 text-start font-medium">{t.columns.year}</th>
                            <th className="px-5 py-3.5 text-start font-medium">{t.columns.grade}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {t.sources.map((s, i) => (
                            <tr
                              key={s.name}
                              className={`transition-colors duration-200 hover:bg-ink-900/50 ${
                                i > 0 ? "border-t border-line-soft" : ""
                              }`}
                            >
                              <td className="px-5 py-4 font-medium text-foreground/85">{s.name}</td>
                              <td className="px-5 py-4 text-foreground/55">{s.type}</td>
                              <td className="latin px-5 py-4 font-mono text-foreground/55">{s.year}</td>
                              <td className="px-5 py-4">
                                <GradeChip grade={s.grade} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Reveal>
                </div>
              </section>
            </>
          )}

          {state === "gap" && (
            <section className="border-t border-line">
              <div className="mx-auto max-w-3xl px-5 py-24 text-center">
                <Reveal>
                  <div
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl"
                    style={{ background: tint(stateColor, 8), border: `1px solid ${tint(stateColor, 27)}`, color: stateColor }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                    </svg>
                  </div>
                  <p className="mx-auto mt-8 max-w-xl text-xl font-medium leading-relaxed text-foreground/85">
                    {t.gapState.message}
                  </p>
                  <p className="mt-5 text-xs text-foreground/40">{t.gapState.sub}</p>
                </Reveal>
              </div>
            </section>
          )}

          {state === "preparing" && (
            <StatePanel color={stateColor} title={t.preparingState.title} message={t.preparingState.message} spin />
          )}
          {state === "internal" && (
            <StatePanel color={stateColor} title={t.internalState.title} message={t.internalState.message} />
          )}

          {/* ---------- footer ---------- */}
          <footer className="border-t border-line">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-center sm:flex-row sm:text-start">
              <p className="max-w-2xl text-xs leading-relaxed text-foreground/45">{t.footer.methodologyNote}</p>
              <div className="latin shrink-0 font-mono text-[10px] tracking-[0.2em] text-foreground/35">
                {t.footer.updatedLabel} · {t.hero.lastUpdatedValue}
              </div>
            </div>
          </footer>
        </main>
      </div>
    </ViewTransition>
  );
}

function StatePanel({ color, title, message, spin }: { color: string; title: string; message: string; spin?: boolean }) {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <Reveal>
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl"
            style={{ background: tint(color, 8), border: `1px solid ${tint(color, 27)}`, color }}
          >
            {spin ? (
              <svg className="ring-spin" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M21 12a9 9 0 1 1-6.2-8.56" />
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="10" width="16" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
            )}
          </div>
          <h2 className="mt-8 text-2xl font-bold tracking-tight">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-foreground/60">{message}</p>
        </Reveal>
      </div>
    </section>
  );
}
