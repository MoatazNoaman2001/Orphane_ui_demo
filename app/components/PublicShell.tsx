"use client";

import { ViewTransition, type ReactNode } from "react";
import SiteNav, { type NavLink } from "./SiteNav";

/* Shared chrome for public demo pages: atmosphere, nav, directional
   route transitions, and the standard footer line. */
export default function PublicShell({
  navTitle,
  navSubtitle,
  links = [],
  backLabel,
  footerNote,
  footerMark,
  children,
}: {
  navTitle: string;
  navSubtitle: string;
  links?: NavLink[];
  backLabel: string;
  footerNote: string;
  footerMark: string;
  children: ReactNode;
}) {
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
          links={links}
          cta={{ href: "/designs/observatory", label: `${backLabel}`, back: true }}
        />
        <main className="pt-16">{children}</main>
        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-center sm:flex-row sm:text-start">
            <p className="max-w-2xl text-xs leading-relaxed text-foreground/45">{footerNote}</p>
            <div className="latin max-w-full text-center font-mono text-[10px] leading-relaxed tracking-[0.18em] text-foreground/35 sm:shrink-0 sm:text-start">{footerMark}</div>
          </div>
        </footer>
      </div>
    </ViewTransition>
  );
}
