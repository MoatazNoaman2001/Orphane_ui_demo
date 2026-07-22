"use client";

import { useMemo, useState, ViewTransition } from "react";
import Link from "next/link";
import SiteNav from "./SiteNav";
import WorldDotMap from "./WorldDotMap";
import { GRADE_COLORS, Reveal, tint } from "./motion";
import { COUNTRY_ROWS, countriesContent, type CountryStatus } from "../content-countries";
import { content } from "../content";
import { useLang } from "./prefs";
import { portalCta, publicNav } from "../nav-public";

const STATUS_COLORS: Record<CountryStatus, string> = {
  pub: "var(--state-pub)",
  prep: "var(--state-prep)",
  gap: "var(--state-gap)",
  internal: "var(--state-internal)",
};

const STATUS_ORDER: CountryStatus[] = ["pub", "prep", "gap", "internal"];

function StatusPill({ status, label }: { status: CountryStatus; label: string }) {
  const c = STATUS_COLORS[status];
  return (
    <span
      className="inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-xs font-medium"
      style={{ background: tint(c, 10), color: c, border: `1px solid ${tint(c, 27)}` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
      {label}
    </span>
  );
}

export default function CountriesPage() {
  const { lang } = useLang();
  const t = countriesContent[lang];
  const shared = content[lang];

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CountryStatus | "all">("all");

  const counts = useMemo(() => {
    const c: Record<CountryStatus, number> = { pub: 0, prep: 0, gap: 0, internal: 0 };
    for (const row of COUNTRY_ROWS) c[row.status]++;
    return c;
  }, []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COUNTRY_ROWS.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (!q) return true;
      return r.en.toLowerCase().includes(q) || r.ar.includes(q) || r.iso.toLowerCase().includes(q);
    });
  }, [query, statusFilter]);

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
          links={publicNav(lang)}
          cta={portalCta(lang)}
        />

        <main className="pt-16">
          {/* ---------- header ---------- */}
          <section className="mx-auto max-w-6xl px-5 pt-12">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.hero.title}</h1>
                  <p className="mt-4 max-w-2xl leading-relaxed text-foreground/65">{t.hero.lead}</p>
                </div>
                <div className="latin rounded-md border border-line px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-foreground/50">
                  {t.hero.scopeNote}
                </div>
              </div>
            </Reveal>

            {/* status counters — also act as filters */}
            <Reveal delay={90}>
              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
                {STATUS_ORDER.map((s) => {
                  const c = STATUS_COLORS[s];
                  const active = statusFilter === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(active ? "all" : s)}
                      className={`bg-ink-900 px-5 py-4 text-start transition-colors duration-300 ${
                        active ? "bg-ink-850" : "hover:bg-ink-850/60"
                      }`}
                      style={active ? { boxShadow: `inset 0 -2px 0 ${c}` } : undefined}
                    >
                      <div className="latin font-mono text-2xl font-bold" style={{ color: c }}>
                        {counts[s]}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-foreground/60">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
                        {t.statusLabels[s]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </section>

          {/* ---------- map ---------- */}
          <section id="map" className="scroll-mt-24 pt-10">
            <Reveal>
              <div className="w-full">
                <WorldDotMap lang={lang} />
              </div>
              <p className="mt-2 text-center text-xs text-foreground/40">{t.mapHint}</p>
            </Reveal>
          </section>

          {/* ---------- list ---------- */}
          <section id="list" className="scroll-mt-24 border-t border-line">
            <div className="mx-auto max-w-6xl px-5 py-14">
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.list.title}</h2>
                    <p className="mt-2 text-sm text-foreground/55">{t.list.lead}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {/* search */}
                    <div className="relative w-full sm:w-auto">
                      <svg
                        className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-foreground/40"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                      </svg>
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t.list.searchPlaceholder}
                        className="w-full rounded-lg border border-line bg-ink-900/60 py-2 pe-3 ps-9 text-sm text-foreground placeholder:text-foreground/35 focus:border-accent/50 focus:outline-none sm:w-56"
                      />
                    </div>
                    {/* status filter */}
                    <div className="flex flex-wrap gap-y-1 rounded-lg border border-line bg-ink-900/60 p-1">
                      <button
                        onClick={() => setStatusFilter("all")}
                        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                          statusFilter === "all" ? "bg-ink-800 text-foreground" : "text-foreground/55 hover:text-foreground"
                        }`}
                      >
                        {t.list.allStatuses}
                      </button>
                      {STATUS_ORDER.map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatusFilter(statusFilter === s ? "all" : s)}
                          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                            statusFilter === s ? "bg-ink-800" : "text-foreground/55 hover:text-foreground"
                          }`}
                          style={statusFilter === s ? { color: STATUS_COLORS[s] } : undefined}
                        >
                          {t.statusLabels[s]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="mt-7 overflow-x-auto rounded-xl border border-line">
                  <table className="w-full min-w-[720px] text-sm">
                    <thead>
                      <tr className="latin border-b border-line bg-ink-900/60 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                        <th className="px-5 py-3.5 text-start font-medium">{t.list.columns.country}</th>
                        <th className="px-5 py-3.5 text-start font-medium">{t.list.columns.region}</th>
                        <th className="px-5 py-3.5 text-start font-medium">{t.list.columns.status}</th>
                        <th className="px-5 py-3.5 text-start font-medium">{t.list.columns.indicators}</th>
                        <th className="px-5 py-3.5 text-start font-medium">{t.list.columns.grade}</th>
                        <th className="px-5 py-3.5 text-start font-medium">{t.list.columns.updated}</th>
                        <th className="px-2 py-3.5" />
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r, i) => {
                        const name = lang === "ar" ? r.ar : r.en;
                        const region = lang === "ar" ? r.regionAr : r.regionEn;
                        return (
                          <tr
                            key={r.iso}
                            className={`transition-colors duration-200 ${i > 0 ? "border-t border-line-soft" : ""} ${
                              r.href ? "cursor-pointer hover:bg-ink-900/60" : "hover:bg-ink-900/30"
                            }`}
                          >
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <span className="latin w-9 shrink-0 rounded border border-line px-1 py-0.5 text-center font-mono text-[10px] text-foreground/45">
                                  {r.iso}
                                </span>
                                <span className="font-medium text-foreground/90">{name}</span>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-foreground/55">{region}</td>
                            <td className="px-5 py-4">
                              <StatusPill status={r.status} label={t.statusLabels[r.status]} />
                            </td>
                            <td className="latin px-5 py-4 font-mono text-foreground/60">{r.indicators ?? "—"}</td>
                            <td className="px-5 py-4">
                              {r.grade ? (
                                <span
                                  className="latin inline-flex h-6 w-6 items-center justify-center rounded-md font-mono text-xs font-bold"
                                  style={{
                                    background: tint(GRADE_COLORS[r.grade], 12),
                                    color: GRADE_COLORS[r.grade],
                                    border: `1px solid ${tint(GRADE_COLORS[r.grade], 33)}`,
                                  }}
                                >
                                  {r.grade}
                                </span>
                              ) : (
                                <span className="text-foreground/30">—</span>
                              )}
                            </td>
                            <td className="latin px-5 py-4 font-mono text-foreground/55">{r.updated ?? "—"}</td>
                            <td className="px-2 py-4 pe-4 text-end">
                              {r.href && (
                                <Link
                                  href={r.href}
                                  transitionTypes={["nav-forward"]}
                                  className="inline-flex items-center gap-1.5 rounded-md border border-accent/40 px-2.5 py-1 text-xs font-medium text-accent transition hover:bg-accent/10"
                                >
                                  {t.list.openPage}
                                  <svg className="rtl:rotate-180" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14m-6-6 6 6-6 6" />
                                  </svg>
                                </Link>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                      {rows.length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-5 py-10 text-center text-sm text-foreground/45">
                            {t.list.emptyResult}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-foreground/40">{t.list.previewNote}</p>
                  <Link
                    href="/designs/observatory/organizations"
                    transitionTypes={["nav-forward"]}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-accent transition hover:underline"
                  >
                    {lang === "ar" ? "دليل المؤسسات" : "Organizations directory"}
                    <svg className="rtl:rotate-180" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        </main>
      </div>
    </ViewTransition>
  );
}
