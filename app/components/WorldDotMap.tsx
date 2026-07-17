"use client";

import { useMemo, useRef, useState } from "react";
import world from "../data/world-dots.json";
import type { Lang } from "../content";

/*
 * Full-width dot-matrix world map — no map library, no tiles.
 * Geography is pre-rasterized into app/data/world-dots.json
 * (generated from public-domain country polygons).
 * Tracked countries glow by status; hover shows a stats card.
 */

const SP = 7;
const R = 2.1;

type Status = "pub" | "prep" | "gap" | "internal";

const STATUS: Record<Status, { color: string; en: string; ar: string }> = {
  pub: { color: "#1fc2f2", en: "Published", ar: "منشور" },
  prep: { color: "#4f9de8", en: "In preparation", ar: "قيد الإعداد" },
  gap: { color: "#e3a63b", en: "Data gap declared", ar: "فجوة بيانات مُعلنة" },
  internal: { color: "#8b9dc9", en: "Internal only", ar: "داخلي فقط" },
};

interface Tracked {
  en: string;
  ar: string;
  status: Status;
  ind?: number;
  src?: number;
  upd?: string;
  grade?: string;
}

const TRACKED: Record<string, Tracked> = {
  JOR: { en: "Jordan", ar: "الأردن", status: "pub", ind: 14, src: 8, upd: "2026", grade: "B" },
  PSE: { en: "Palestine", ar: "فلسطين", status: "pub", ind: 12, src: 7, upd: "2026", grade: "B" },
  LBN: { en: "Lebanon", ar: "لبنان", status: "pub", ind: 9, src: 5, upd: "2025", grade: "A" },
  EGY: { en: "Egypt", ar: "مصر", status: "pub", ind: 16, src: 9, upd: "2026", grade: "B" },
  MAR: { en: "Morocco", ar: "المغرب", status: "pub", ind: 11, src: 6, upd: "2025", grade: "A" },
  TUR: { en: "Türkiye", ar: "تركيا", status: "pub", ind: 6, src: 4, upd: "2026", grade: "A" },
  SYR: { en: "Syria", ar: "سوريا", status: "prep", ind: 14, src: 6, upd: "2026", grade: "C" },
  IRQ: { en: "Iraq", ar: "العراق", status: "prep", ind: 8, src: 5, upd: "2026", grade: "C" },
  SDN: { en: "Sudan", ar: "السودان", status: "prep", ind: 6, src: 3, upd: "2026", grade: "D" },
  DZA: { en: "Algeria", ar: "الجزائر", status: "prep", ind: 5, src: 3, upd: "2025", grade: "C" },
  TUN: { en: "Tunisia", ar: "تونس", status: "prep", ind: 6, src: 4, upd: "2025", grade: "C" },
  SEN: { en: "Senegal", ar: "السنغال", status: "prep", ind: 4, src: 2, upd: "2026", grade: "D" },
  YEM: { en: "Yemen", ar: "اليمن", status: "gap" },
  SOM: { en: "Somalia", ar: "الصومال", status: "gap" },
  AFG: { en: "Afghanistan", ar: "أفغانستان", status: "gap" },
  LBY: { en: "Libya", ar: "ليبيا", status: "gap" },
  TCD: { en: "Chad", ar: "تشاد", status: "gap" },
  MLI: { en: "Mali", ar: "مالي", status: "gap" },
  PAK: { en: "Pakistan", ar: "باكستان", status: "internal" },
  BGD: { en: "Bangladesh", ar: "بنغلاديش", status: "internal" },
  NER: { en: "Niger", ar: "النيجر", status: "internal" },
  MRT: { en: "Mauritania", ar: "موريتانيا", status: "internal" },
  IDN: { en: "Indonesia", ar: "إندونيسيا", status: "internal" },
};

const LABELS = {
  en: {
    indicators: "Indicators",
    sources: "Sources",
    updated: "Updated",
    grade: "Grade",
    gapMsg: "No reliable figures yet — the Federation is seeking reporting partners.",
    internalMsg: "Held for Federation internal use.",
    aria: "World map of country data statuses",
  },
  ar: {
    indicators: "المؤشرات",
    sources: "المصادر",
    updated: "التحديث",
    grade: "الدرجة",
    gapMsg: "لا أرقام موثوقة بعد — يبحث الاتحاد عن شركاء إبلاغ.",
    internalMsg: "محفوظ لاستخدام الاتحاد الداخلي.",
    aria: "خريطة العالم لحالات بيانات الدول",
  },
} as const;

const centers = world.centers as unknown as Record<string, [number, number]>;

export default function WorldDotMap({ lang }: { lang: Lang }) {
  const [hover, setHover] = useState<string | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const { untracked, byIso } = useMemo(() => {
    const isos = world.isos as string[];
    const map = new Map<string, [number, number][]>();
    const rest: [number, number][] = [];
    for (const [x, y, i] of world.dots as [number, number, number][]) {
      const iso = isos[i];
      if (TRACKED[iso]) {
        if (!map.has(iso)) map.set(iso, []);
        map.get(iso)!.push([x, y]);
      } else {
        rest.push([x, y]);
      }
    }
    return { untracked: rest, byIso: [...map.entries()] };
  }, []);

  const W = world.cols * SP;
  const H = world.rows * SP;
  const t = hover ? TRACKED[hover] : null;
  const L = LABELS[lang];

  return (
    <div
      ref={wrapRef}
      dir="ltr"
      className="relative w-full"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height });
      }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={L.aria}>
        {/* untracked landmass */}
        <g fill="rgba(120, 160, 230, 0.15)">
          {untracked.map(([x, y], i) => (
            <circle key={i} cx={x * SP + SP / 2} cy={y * SP + SP / 2} r={R} />
          ))}
        </g>

        {/* tracked countries */}
        {byIso.map(([iso, pts]) => {
          const s = STATUS[TRACKED[iso].status];
          const active = hover === iso;
          const dim = hover !== null && !active;
          const c = centers[iso];
          return (
            <g
              key={iso}
              onMouseEnter={() => setHover(iso)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer", opacity: dim ? 0.3 : 1, transition: "opacity 0.25s ease" }}
            >
              {pts.map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x * SP + SP / 2}
                  cy={y * SP + SP / 2}
                  r={active ? R + 1.1 : R + 0.5}
                  fill={s.color}
                  opacity={active ? 1 : 0.85}
                  style={{ transition: "r 0.2s ease" }}
                />
              ))}
              {c && (
                <>
                  {/* pulsing ring on declared gaps */}
                  {TRACKED[iso].status === "gap" && (
                    <circle
                      className="svg-ping"
                      cx={c[0] * SP + SP / 2}
                      cy={c[1] * SP + SP / 2}
                      r={7}
                      fill="none"
                      stroke={s.color}
                      strokeWidth={1.4}
                    />
                  )}
                  {/* generous invisible hit target (small countries = few dots) */}
                  <circle cx={c[0] * SP + SP / 2} cy={c[1] * SP + SP / 2} r={16} fill="transparent" />
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* hover card */}
      {t && pos && (
        <div
          className="pointer-events-none absolute z-20 w-60 rounded-xl border border-line bg-ink-900/95 p-4 shadow-2xl backdrop-blur-md"
          style={{
            left: Math.max(8, Math.min(pos.x + 16, pos.w - 256)),
            top: Math.max(8, Math.min(pos.y + 16, pos.h - 150)),
          }}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-bold text-foreground">{t[lang]}</div>
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
              style={{ background: `${STATUS[t.status].color}22`, color: STATUS[t.status].color, border: `1px solid ${STATUS[t.status].color}55` }}
            >
              {STATUS[t.status][lang]}
            </span>
          </div>
          {t.status === "gap" ? (
            <p className="mt-2.5 text-xs leading-relaxed" style={{ color: "#e3c68a" }}>{L.gapMsg}</p>
          ) : t.status === "internal" ? (
            <p className="mt-2.5 text-xs leading-relaxed text-foreground/50">{L.internalMsg}</p>
          ) : (
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div className="text-foreground/50">{L.indicators}</div>
              <div className="latin text-end font-mono font-bold text-foreground">{t.ind}</div>
              <div className="text-foreground/50">{L.sources}</div>
              <div className="latin text-end font-mono font-bold text-foreground">{t.src}</div>
              <div className="text-foreground/50">{L.updated}</div>
              <div className="latin text-end font-mono font-bold text-foreground">{t.upd}</div>
              <div className="text-foreground/50">{L.grade}</div>
              <div className="latin text-end font-mono font-bold text-accent">{t.grade}</div>
            </div>
          )}
        </div>
      )}

      {/* legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 px-4" dir={lang === "ar" ? "rtl" : "ltr"}>
        {(Object.keys(STATUS) as Status[]).map((s) => (
          <span key={s} className="flex items-center gap-2 text-xs text-foreground/60">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS[s].color }} />
            {STATUS[s][lang]}
          </span>
        ))}
      </div>
    </div>
  );
}
