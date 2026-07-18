"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Mark } from "./SiteNav";
import { Reveal } from "./motion";
import { humanContent } from "../content-humanitarian";
import { useLang } from "./prefs";

/*
 * Direction 03 — Humanitarian Light.
 * Warm ivory, serif headlines, generous space, zero tech ornament.
 * Fixed light palette: this direction does not follow the theme toggle.
 */

const C = {
  bg: "#faf7f1",
  bgAlt: "#f3eee3",
  card: "#ffffff",
  ink: "#243048",
  body: "#57607a",
  soft: "#8a90a5",
  blue: "#1c4791",
  blueDark: "#16406e",
  amber: "#b97f2a",
  amberSoft: "#f6ecd9",
  green: "#2e7d5b",
  line: "#e8e1d2",
  footer: "#182742",
};

const STATUS_C = { pub: C.green, prep: C.blue, gap: C.amber };

function serif(lang: string) {
  return lang === "ar" ? { fontWeight: 700 } : { fontFamily: "var(--font-serif), serif" };
}

/* Marked placeholder for a real photo/illustration */
function ImagePlaceholder({ note, tag, className = "" }: { note: string; tag: string; className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl ${className}`}
      style={{ background: "linear-gradient(135deg, #f2e7d3 0%, #e9dcc4 45%, #dde3d5 100%)" }}
    >
      <svg className="absolute" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#c9bda0" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
      </svg>
      <div className="absolute inset-x-3 bottom-3 rounded-lg bg-white/85 px-3 py-2 text-center backdrop-blur-sm">
        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.amber }}>{tag}</div>
        <div className="mt-0.5 text-[11px] leading-snug" style={{ color: C.body }}>{note}</div>
      </div>
    </div>
  );
}

function SectionHead({ title, lead, lang }: { title: string; lead: string; lang: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl sm:text-4xl" style={{ color: C.ink, ...serif(lang) }}>{title}</h2>
      <p className="mt-3 leading-relaxed" style={{ color: C.body }}>{lead}</p>
    </div>
  );
}

export default function HumanitarianLanding() {
  const { lang, setLang } = useLang();
  const t = humanContent[lang];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.ink }}>
      {/* ================= NAV ================= */}
      <header
        className="fixed inset-x-0 top-0 z-50 transition-shadow duration-300"
        style={{
          background: scrolled ? "rgba(250,247,241,0.95)" : "rgba(250,247,241,0.7)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${scrolled ? C.line : "transparent"}`,
          boxShadow: scrolled ? "0 4px 24px rgba(36,48,72,0.06)" : "none",
        }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-5">
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <Mark size={32} />
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold" style={{ color: C.ink }}>
                {lang === "ar" ? "مرصد بيانات الأيتام" : "Orphan Data Observatory"}
              </span>
              <span className="block truncate text-[11px]" style={{ color: C.soft }}>{t.hero.org}</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm md:flex" style={{ color: C.body }}>
            <a href="#services" className="transition-colors hover:text-[#1c4791]">{t.nav.services}</a>
            <a href="#countries" className="transition-colors hover:text-[#1c4791]">{t.nav.countries}</a>
            <a href="#updates" className="transition-colors hover:text-[#1c4791]">{t.nav.updates}</a>
            <Link href="/designs/observatory/methodology" className="transition-colors hover:text-[#1c4791]">{t.nav.methodology}</Link>
          </nav>
          <div className="flex shrink-0 items-center gap-2.5">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors"
              style={{ borderColor: C.line, color: C.blue }}
            >
              {lang === "en" ? "العربية" : "English"}
            </button>
            <Link
              href="/designs/observatory/access"
              className="hidden rounded-full px-4 py-2 text-xs font-bold text-white transition hover:brightness-110 sm:block"
              style={{ background: C.blue }}
            >
              {t.nav.cta}
            </Link>
          </div>
        </div>
      </header>

      <main id="top" className="pt-16">
        {/* ================= HERO ================= */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-12 lg:grid-cols-[1.1fr_1fr] lg:pb-24 lg:pt-20">
          <Reveal>
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
                style={{ background: C.amberSoft, color: C.amber }}
              >
                {t.hero.org}
              </div>
              <h1 className="mt-5 text-4xl leading-[1.2] sm:text-5xl lg:text-[3.3rem]" style={{ color: C.ink, ...serif(lang) }}>
                {t.hero.title1}
                <span className="block" style={{ color: C.blue }}>{t.hero.title2}</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed" style={{ color: C.body }}>{t.hero.sub}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/designs/observatory/countries"
                  className="rounded-full px-7 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
                  style={{ background: C.blue, boxShadow: "0 10px 28px rgba(28,71,145,0.25)" }}
                >
                  {t.hero.ctaPrimary}
                </Link>
                <Link
                  href="/designs/observatory/methodology"
                  className="rounded-full border px-7 py-3 text-sm font-semibold transition-colors hover:border-[#1c4791]"
                  style={{ borderColor: C.line, color: C.ink, background: C.card }}
                >
                  {t.hero.ctaSecondary}
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ImagePlaceholder tag={t.placeholderTag} note={t.hero.imageNote} className="aspect-[4/3] w-full" />
          </Reveal>
        </section>

        {/* ================= COUNTERS ================= */}
        <section style={{ background: C.bgAlt, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
          <div className="mx-auto max-w-6xl px-5 py-10">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {t.counters.map((c, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="text-center">
                    <div className="latin text-4xl font-extrabold sm:text-5xl" style={{ color: C.blue }}>{c.value}</div>
                    <div className="mt-1.5 text-sm font-medium" style={{ color: C.body }}>{c.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-center text-xs" style={{ color: C.soft }}>{t.countersNote}</p>
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section id="services" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
            <Reveal><SectionHead title={t.services.title} lead={t.services.lead} lang={lang} /></Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {t.services.items.map((s, i) => (
                <Reveal key={i} delay={(i % 2) * 80}>
                  <div
                    className="flex h-full flex-col rounded-2xl border p-7 transition-shadow duration-300 hover:shadow-lg"
                    style={{ background: C.card, borderColor: C.line, boxShadow: "0 2px 10px rgba(36,48,72,0.04)" }}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: C.amberSoft }}>
                      <ServiceIcon i={i} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold" style={{ color: C.ink }}>{s.audience}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: C.body }}>{s.what}</p>
                    <Link href={s.href} className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold transition hover:gap-2.5" style={{ color: C.blue }}>
                      {s.link}
                      <svg className="rtl:rotate-180" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14m-6-6 6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= COUNTRIES ================= */}
        <section id="countries" className="scroll-mt-20" style={{ background: C.bgAlt, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
            <Reveal><SectionHead title={t.countries.title} lead={t.countries.lead} lang={lang} /></Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.countries.items.map((c, i) => {
                const sc = STATUS_C[c.status];
                return (
                  <Reveal key={c.name} delay={(i % 3) * 70}>
                    <Link
                      href="/designs/observatory/country"
                      className="flex items-center justify-between gap-3 rounded-2xl border p-5 transition-shadow duration-300 hover:shadow-lg"
                      style={{ background: C.card, borderColor: C.line }}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5">
                          <span className="text-base font-bold" style={{ color: C.ink }}>{c.name}</span>
                          {c.grade && (
                            <span
                              className="latin flex h-6 w-6 items-center justify-center rounded-md text-xs font-extrabold text-white"
                              style={{ background: C.green }}
                            >
                              {c.grade}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 truncate text-xs" style={{ color: C.soft }}>{c.note}</div>
                      </div>
                      <span
                        className="shrink-0 rounded-full px-3 py-1 text-[11px] font-bold"
                        style={{ background: `${sc}1a`, color: sc }}
                      >
                        {t.countries.statusLabels[c.status]}
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
            <Reveal delay={120}>
              <div className="mt-8 text-center">
                <Link
                  href="/designs/observatory/countries"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white transition hover:brightness-110"
                  style={{ background: C.blue }}
                >
                  {t.countries.cta}
                  <svg className="rtl:rotate-180" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= UPDATES ================= */}
        <section id="updates" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
            <Reveal><SectionHead title={t.updates.title} lead={t.updates.lead} lang={lang} /></Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {t.updates.items.map((u, i) => (
                <Reveal key={i} delay={i * 80}>
                  <article
                    className="flex h-full flex-col overflow-hidden rounded-2xl border transition-shadow duration-300 hover:shadow-lg"
                    style={{ background: C.card, borderColor: C.line }}
                  >
                    <ImagePlaceholder tag={t.placeholderTag} note={u.imageNote} className="aspect-[16/9] rounded-none" />
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ background: C.amberSoft, color: C.amber }}>
                          {u.tag}
                        </span>
                        <span className="text-[11px]" style={{ color: C.soft }}>{u.date}</span>
                      </div>
                      <h3 className="mt-3 text-base font-bold leading-snug" style={{ color: C.ink }}>{u.title}</h3>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TRUST ================= */}
        <section style={{ background: C.footer }}>
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl text-white sm:text-4xl" style={serif(lang)}>{t.trust.title}</h2>
                <p className="mt-3 leading-relaxed" style={{ color: "#b9c3da" }}>{t.trust.lead}</p>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {t.trust.steps.map((s, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="rounded-2xl p-6 text-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="latin mx-auto flex h-10 w-10 items-center justify-center rounded-full text-base font-extrabold"
                      style={{ background: C.amber, color: "#fff" }}
                    >
                      {i + 1}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "#b9c3da" }}>{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <div className="mt-9 text-center">
                <Link href="/designs/observatory/methodology" className="inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:underline">
                  {t.trust.link}
                  <svg className="rtl:rotate-180" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= PARTNERS ================= */}
        <section>
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
            <Reveal><SectionHead title={t.partners.title} lead={t.partners.lead} lang={lang} /></Reveal>
            <Reveal delay={80}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex h-14 w-36 items-center justify-center rounded-xl border text-xs font-semibold"
                    style={{ background: C.card, borderColor: C.line, color: C.soft }}
                  >
                    {t.partners.logoNote} {i + 1}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div
                className="mx-auto mt-12 max-w-3xl rounded-3xl border p-8 text-center sm:p-10"
                style={{ background: C.amberSoft, borderColor: "#ecd9b4" }}
              >
                <h3 className="text-2xl" style={{ color: C.ink, ...serif(lang) }}>{t.partners.joinTitle}</h3>
                <p className="mx-auto mt-3 max-w-xl leading-relaxed" style={{ color: C.body }}>{t.partners.joinDesc}</p>
                <Link
                  href="/designs/observatory/access"
                  className="mt-6 inline-block rounded-full px-8 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
                  style={{ background: C.amber }}
                >
                  {t.partners.joinCta}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer style={{ background: C.footer }}>
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Mark size={28} />
              <span className="text-sm font-bold text-white">
                {lang === "ar" ? "مرصد بيانات الأيتام" : "Orphan Data Observatory"}
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: "#b9c3da" }}>{t.footer.mission}</p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "#8fa0c4" }}>{t.footer.linksTitle}</div>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {t.footer.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white" style={{ color: "#b9c3da" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="mx-auto max-w-6xl px-5 py-5 text-center text-xs sm:text-start" style={{ color: "#8fa0c4" }}>
            © 2026 {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceIcon({ i }: { i: number }) {
  const paths = [
    <path key="0" d="M5 4h9a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3V4Zm3 4h6M8 11h6" />,
    <path key="1" d="M12 21s-6.5-5.4-6.5-10.3A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.7C18.5 15.6 12 21 12 21Z" />,
    <path key="2" d="M3 21V8l7-5 7 5v13M10 21v-6h4v6M3 21h18" />,
    <path key="3" d="M3 3v18h18M7 15l4-4 3 3 5-6" />,
  ];
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b97f2a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[i]}
    </svg>
  );
}
