"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { COUNTRY_ROWS } from "../content-countries";
import { DASH_INDICATORS } from "../content-indicators";
import { SOURCES } from "./SourcesPage";
import { REPORTS } from "./ReportsPage";
import type { Lang } from "../content";

/*
 * Global search, demo scale: countries, indicators, sources, reports from
 * the demo datasets. In the real app the same box queries the database.
 */

interface Hit {
  group: "countries" | "indicators" | "sources" | "reports";
  label: string;
  sub: string;
  href: string;
}

const P = "/designs/observatory";

export default function HeroSearch({
  lang,
  placeholder,
  groups,
  noResults,
}: {
  lang: Lang;
  placeholder: string;
  groups: { countries: string; indicators: string; sources: string; reports: string };
  noResults: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hits = useMemo<Hit[]>(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const found: Hit[] = [];

    for (const c of COUNTRY_ROWS) {
      if (c.en.toLowerCase().includes(q) || c.ar.includes(q) || c.iso.toLowerCase().includes(q)) {
        found.push({
          group: "countries",
          label: lang === "ar" ? c.ar : c.en,
          sub: c.iso,
          href: c.href ?? `${P}/countries`,
        });
      }
    }
    for (const ind of DASH_INDICATORS) {
      if (ind.en.toLowerCase().includes(q) || ind.ar.includes(q)) {
        found.push({
          group: "indicators",
          label: lang === "ar" ? ind.ar : ind.en,
          sub: ind.category,
          href: `${P}/indicators`,
        });
      }
    }
    for (const s of SOURCES) {
      if (s.name.toLowerCase().includes(q) || s.publisher.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)) {
        found.push({ group: "sources", label: s.name, sub: s.code, href: `${P}/sources` });
      }
    }
    for (const r of REPORTS) {
      if (r.titleEn.toLowerCase().includes(q) || r.titleAr.includes(q)) {
        found.push({ group: "reports", label: lang === "ar" ? r.titleAr : r.titleEn, sub: r.date, href: `${P}/reports` });
      }
    }
    return found.slice(0, 12);
  }, [query, lang]);

  const grouped = useMemo(() => {
    const map = new Map<Hit["group"], Hit[]>();
    for (const h of hits) {
      if (!map.has(h.group)) map.set(h.group, []);
      map.get(h.group)!.push(h);
    }
    return [...map.entries()];
  }, [hits]);

  return (
    <div ref={wrapRef} className="relative max-w-xl">
      <svg
        className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-foreground/40"
        width="17"
        height="17"
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
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className="w-full rounded-full border border-line bg-ink-900/60 py-3.5 pe-4 ps-11 text-sm text-foreground shadow-[0_4px_24px_rgba(4,11,28,0.25)] backdrop-blur-sm placeholder:text-foreground/35 focus:border-accent/50 focus:outline-none"
      />

      {open && query.trim().length >= 2 && (
        <div className="pop-panel absolute inset-x-0 top-full z-40 mt-2.5 max-h-80 overflow-auto rounded-xl border border-line bg-ink-850/95 p-1.5 shadow-[0_20px_50px_rgba(4,11,28,0.4)] backdrop-blur-md">
          {grouped.length === 0 && <div className="px-4 py-4 text-sm text-foreground/45">{noResults}</div>}
          {grouped.map(([group, items]) => (
            <div key={group}>
              <div className="latin px-4 pb-1 pt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40">
                {groups[group]}
              </div>
              {items.map((h, i) => (
                <button
                  key={group + i}
                  onClick={() => {
                    setOpen(false);
                    router.push(h.href);
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-lg px-3.5 py-2.5 text-start text-sm text-foreground/80 transition-colors duration-150 hover:bg-ink-800 hover:text-accent"
                >
                  <span className="min-w-0 truncate">{h.label}</span>
                  <span className="latin shrink-0 font-mono text-[10px] text-foreground/40">{h.sub}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
