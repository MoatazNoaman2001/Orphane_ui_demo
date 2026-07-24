"use client";

import { useEffect, useRef, useState, ViewTransition } from "react";
import Link from "next/link";
import { useLang, useTheme } from "./prefs";

export interface NavLink {
  /** "#section" for in-page anchors, "/path" for page routes; omit when children present */
  href?: string;
  label: string;
  /** mark page-route links as back navigation for the directional transition */
  back?: boolean;
  /** dropdown group */
  children?: { href: string; label: string }[];
}

/* ---------- brand mark — the official Observatory logo ---------- */
export function Mark({ size = 38 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      className="shrink-0 object-contain"
    />
  );
}

/*
 * Site navigation, shared by every observatory demo page.
 *
 * Motion:
 *  - condenses (height + backdrop) after the page scrolls
 *  - a sliding indicator bar tracks the active anchor link (scrollspy)
 *  - the whole header is a named ViewTransition, so it stays put while
 *    page content slides during route navigation
 */
export default function SiteNav({
  title,
  subtitle,
  links,
  cta,
  homeHref = "#top",
}: {
  title: string;
  subtitle: string;
  links: NavLink[];
  cta?: { href: string; label: string; back?: boolean };
  homeHref?: string;
}) {
  const { lang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const listRef = useRef<HTMLElement>(null);
  const [bar, setBar] = useState<{ left: number; width: number } | null>(null);

  /* close dropdown / mobile menu on outside pointer or Escape */
  useEffect(() => {
    if (!openGroup && !mobileOpen) return;
    const onDown = (e: PointerEvent) => {
      const header = (e.target as Element).closest("header");
      if (!header) {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openGroup, mobileOpen]);

  /* condensed nav after scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scrollspy over anchor targets */
  const anchors = links.filter((l) => l.href?.startsWith("#")).map((l) => l.href!.slice(1));
  const anchorsKey = anchors.join(",");
  useEffect(() => {
    if (!anchors.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    for (const id of anchors) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorsKey]);

  /* the moving indicator follows the active link (RTL-safe: offsetLeft) */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const el = active ? list.querySelector<HTMLElement>(`[data-href="${active}"]`) : null;
    if (!el) {
      setBar(null);
      return;
    }
    setBar({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active, lang]);

  return (
    <ViewTransition name="site-nav">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
          scrolled ? "border-line bg-ink-950/90" : "border-transparent bg-ink-950/60"
        }`}
      >
        <div
          className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-5"
        >
          {homeHref.startsWith("#") ? (
            <a href={homeHref} className="group flex min-w-0 flex-1 items-center gap-2.5 sm:flex-initial sm:gap-3">
              <BrandBlock title={title} subtitle={subtitle} />
            </a>
          ) : (
            <Link
              href={homeHref}
              transitionTypes={["nav-back"]}
              className="group flex min-w-0 flex-1 items-center gap-2.5 sm:flex-initial sm:gap-3"
            >
              <BrandBlock title={title} subtitle={subtitle} />
            </Link>
          )}

          <nav ref={listRef} className="relative hidden items-center gap-1 text-sm text-foreground/70 md:flex">
            {/* sliding indicator */}
            <span
              aria-hidden="true"
              className={`absolute -bottom-[3px] h-[2px] rounded-full bg-accent transition-all duration-500 ${
                bar ? "opacity-100" : "opacity-0"
              }`}
              style={bar ? { left: bar.left, width: bar.width, transitionTimingFunction: "cubic-bezier(0.3, 0.9, 0.3, 1)" } : { left: 0, width: 0 }}
            />
            {links.map((l) =>
              l.children ? (
                <div key={l.label} className="relative">
                  <button
                    onClick={() => setOpenGroup(openGroup === l.label ? null : l.label)}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors duration-300 hover:text-accent ${
                      openGroup === l.label ? "text-accent" : ""
                    }`}
                  >
                    {l.label}
                    <svg
                      className={`transition-transform duration-200 ${openGroup === l.label ? "rotate-180" : ""}`}
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {openGroup === l.label && (
                    <div className="pop-panel absolute start-0 top-full z-30 mt-2.5 min-w-56 overflow-hidden rounded-xl border border-line bg-ink-850/95 p-1.5 shadow-[0_16px_40px_rgba(4,11,28,0.35)] backdrop-blur-md">
                      {l.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          transitionTypes={["nav-forward"]}
                          onClick={() => setOpenGroup(null)}
                          className="block rounded-lg px-3.5 py-2.5 text-sm text-foreground/75 transition-colors duration-150 hover:bg-ink-800 hover:text-accent"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : l.href!.startsWith("#") ? (
                <a
                  key={l.href}
                  href={l.href}
                  data-href={l.href}
                  className={`rounded-md px-3 py-1.5 transition-colors duration-300 hover:text-accent ${
                    active === l.href ? "text-accent" : ""
                  }`}
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.href}
                  href={l.href!}
                  transitionTypes={[l.back ? "nav-back" : "nav-forward"]}
                  className="rounded-md px-3 py-1.5 transition-colors duration-300 hover:text-accent"
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {links.length > 0 && (
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menu"
                aria-expanded={mobileOpen}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-foreground/70 transition hover:border-accent/50 hover:text-accent md:hidden"
              >
                {mobileOpen ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                )}
              </button>
            )}
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-foreground/70 transition hover:rotate-[20deg] hover:border-accent/50 hover:text-accent"
            >
              {theme === "dark" ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4.5" />
                  <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="latin shrink-0 rounded-full border border-accent/40 px-3 py-1.5 font-mono text-xs font-medium text-accent transition hover:bg-accent/10 hover:shadow-[0_0_16px_rgba(31,194,242,0.3)] sm:px-4"
            >
              {lang === "en" ? "العربية" : "English"}
            </button>
            {cta &&
              (cta.href.startsWith("#") ? (
                <a
                  href={cta.href}
                  className="hidden rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-white transition hover:brightness-125 sm:block"
                >
                  {cta.label}
                </a>
              ) : (
                <Link
                  href={cta.href}
                  transitionTypes={[cta.back ? "nav-back" : "nav-forward"]}
                  className="hidden items-center gap-1.5 rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-white transition hover:brightness-125 sm:flex"
                >
                  {cta.back && (
                    <svg
                      className="rtl:rotate-180"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 12H5m6 6-6-6 6-6" />
                    </svg>
                  )}
                  {cta.label}
                </Link>
              ))}
          </div>
        </div>

        {/* mobile menu */}
        {mobileOpen && links.length > 0 && (
          <div className="pop-panel border-t border-line bg-ink-950/95 backdrop-blur-xl md:hidden">
            <nav className="mx-auto max-w-6xl space-y-1 px-4 py-4">
              {links.map((l) =>
                l.children ? (
                  <div key={l.label} className="pb-1">
                    <div className="latin px-3 pb-1.5 pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                      {l.label}
                    </div>
                    {l.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        transitionTypes={["nav-forward"]}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-md px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-ink-900 hover:text-accent"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ) : l.href!.startsWith("#") ? (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-ink-900 hover:text-accent"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.href}
                    href={l.href!}
                    transitionTypes={["nav-forward"]}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-ink-900 hover:text-accent"
                  >
                    {l.label}
                  </Link>
                )
              )}
              {cta && !cta.href.startsWith("#") && (
                <Link
                  href={cta.href}
                  transitionTypes={[cta.back ? "nav-back" : "nav-forward"]}
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 block rounded-lg bg-brand px-3 py-2.5 text-center text-sm font-semibold text-white"
                >
                  {cta.label}
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
    </ViewTransition>
  );
}

function BrandBlock({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <span className="shrink-0 transition-transform duration-500 group-hover:rotate-[30deg]">
        <Mark size={38} />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-sm font-semibold tracking-wide">{title}</span>
        <span className="latin block truncate font-mono text-[10px] uppercase tracking-[0.2em] text-accent/70">
          {subtitle}
        </span>
      </span>
    </>
  );
}
