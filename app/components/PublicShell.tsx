"use client";

import { ViewTransition, type ReactNode } from "react";
import Link from "next/link";
import SiteNav, { Mark } from "./SiteNav";
import { portalCta, publicFooter, publicNav } from "../nav-public";
import { useLang } from "./prefs";

/*
 * Shared chrome for public pages: the Union's standard header
 * (الرئيسية | استكشاف البيانات ▼ | التقارير | المنهجية | عن المرصد ▼ | تواصل معنا | دخول الشركاء)
 * and the institutional footer with privacy + data-use links.
 */
export default function PublicShell({
  navTitle,
  navSubtitle,
  footerNote,
  footerMark,
  children,
}: {
  navTitle: string;
  navSubtitle: string;
  /** deprecated — kept for call-site compatibility */
  links?: unknown;
  backLabel?: string;
  footerNote: string;
  footerMark?: string;
  children: ReactNode;
}) {
  const { lang } = useLang();
  const f = publicFooter(lang);

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
          title={navTitle}
          subtitle={navSubtitle}
          homeHref="/designs/observatory"
          links={publicNav(lang)}
          cta={portalCta(lang)}
        />
        <main className="pt-16">{children}</main>

        <footer className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-10">
            {footerNote && <p className="max-w-2xl text-xs leading-relaxed text-foreground/45">{footerNote}</p>}
            <div className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-4 ${footerNote ? "mt-8" : ""}`}>
              <div>
                <div className="flex items-center gap-2.5">
                  <Mark size={26} />
                  <span className="text-sm font-semibold">{navTitle}</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-foreground/50">{f.mission}</p>
              </div>
              {[f.explore, f.about, f.legal].map((col) => (
                <div key={col.title}>
                  <div className="latin font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                    {col.title}
                  </div>
                  <ul className="mt-3 space-y-2 text-sm">
                    {col.links.map((l) => (
                      <li key={l.href + l.label}>
                        <Link
                          href={l.href}
                          transitionTypes={["nav-forward"]}
                          className="text-foreground/60 transition-colors hover:text-accent"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-line-soft">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-center sm:flex-row sm:text-start">
              <span className="text-xs text-foreground/40">© 2026 {f.rights}</span>
              {footerMark && (
                <span className="latin max-w-full text-center font-mono text-[10px] leading-relaxed tracking-[0.18em] text-foreground/30 sm:text-start">
                  {footerMark}
                </span>
              )}
            </div>
          </div>
        </footer>
      </div>
    </ViewTransition>
  );
}
