"use client";

import { useEffect, useRef, useState, ViewTransition } from "react";
import Link from "next/link";
import { useLang, useTheme } from "./prefs";

export interface NavLink {
  /** "#section" for in-page anchors, "/path" for page routes */
  href: string;
  label: string;
  /** mark page-route links as back navigation for the directional transition */
  back?: boolean;
}

/* ---------- brand mark ---------- */
export function Mark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="17" stroke="#1c4791" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="10.5" stroke="#1fc2f2" strokeWidth="2" strokeDasharray="4 5" />
      <circle cx="20" cy="20" r="4" fill="#1fc2f2" />
      <circle cx="31.5" cy="11" r="2.6" fill="#1c4791" stroke="#1fc2f2" strokeWidth="1.4" />
    </svg>
  );
}

/* ---------- scroll progress bar ---------- */
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      el.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2.5px] bg-line-soft">
      <div
        ref={ref}
        className="h-full origin-left bg-accent rtl:origin-right"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
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
  const listRef = useRef<HTMLElement>(null);
  const [bar, setBar] = useState<{ left: number; width: number } | null>(null);

  /* condensed nav after scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scrollspy over anchor targets */
  const anchors = links.filter((l) => l.href.startsWith("#")).map((l) => l.href.slice(1));
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
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-line bg-ink-950/85 shadow-[0_8px_30px_rgba(4,11,28,0.35)] backdrop-blur-xl"
            : "border-transparent bg-ink-950/40 backdrop-blur-md"
        }`}
      >
        <ScrollProgress />
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 transition-all duration-500 sm:gap-4 sm:px-5 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          {homeHref.startsWith("#") ? (
            <a href={homeHref} className="group flex min-w-0 flex-1 items-center gap-2.5 sm:flex-initial sm:gap-3">
              <BrandBlock title={title} subtitle={subtitle} scrolled={scrolled} />
            </a>
          ) : (
            <Link
              href={homeHref}
              transitionTypes={["nav-back"]}
              className="group flex min-w-0 flex-1 items-center gap-2.5 sm:flex-initial sm:gap-3"
            >
              <BrandBlock title={title} subtitle={subtitle} scrolled={scrolled} />
            </Link>
          )}

          <nav ref={listRef} className="relative hidden items-center gap-1 text-sm text-foreground/70 md:flex">
            {/* sliding indicator */}
            <span
              aria-hidden="true"
              className={`absolute -bottom-[3px] h-[2px] rounded-full bg-gradient-to-r from-accent to-[#4f9de8] transition-all duration-500 ${
                bar ? "opacity-100" : "opacity-0"
              }`}
              style={bar ? { left: bar.left, width: bar.width, transitionTimingFunction: "cubic-bezier(0.3, 0.9, 0.3, 1)" } : { left: 0, width: 0 }}
            />
            {links.map((l) =>
              l.href.startsWith("#") ? (
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
                  href={l.href}
                  transitionTypes={[l.back ? "nav-back" : "nav-forward"]}
                  className="rounded-md px-3 py-1.5 transition-colors duration-300 hover:text-accent"
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
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
                  className="hidden rounded-full bg-gradient-to-r from-brand to-[#2a63c4] px-4 py-1.5 text-xs font-semibold text-white transition hover:brightness-125 sm:block"
                >
                  {cta.label}
                </a>
              ) : (
                <Link
                  href={cta.href}
                  transitionTypes={[cta.back ? "nav-back" : "nav-forward"]}
                  className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-brand to-[#2a63c4] px-4 py-1.5 text-xs font-semibold text-white transition hover:brightness-125 sm:flex"
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
      </header>
    </ViewTransition>
  );
}

function BrandBlock({ title, subtitle, scrolled }: { title: string; subtitle: string; scrolled: boolean }) {
  return (
    <>
      <span className="shrink-0 transition-transform duration-500 group-hover:rotate-[30deg]">
        <Mark size={scrolled ? 30 : 34} />
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
