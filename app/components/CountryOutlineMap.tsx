"use client";

import type { Lang } from "../content";

/*
 * Country boundary "line map" — real GeoJSON outline (world.geo.json, public
 * domain), pre-projected to SVG paths. No tiles, no roads, no clutter: just
 * the border and the main cities, as the client asked.
 */

const TUR = {
  viewBox: "0 0 800 388",
  paths: [
    "M459.9 72.5 L517.4 92.5 L564.2 84.5 L598.7 89.1 L646.0 62.2 L688.7 59.8 L727.4 85.1 L734.2 103.2 L730.3 128.3 L760.1 141.2 L775.9 156.2 L748.5 170.9 L761.0 230.1 L753.2 246.1 L775.1 287.4 L755.9 296.1 L741.8 283.0 L695.1 276.3 L677.9 284.3 L632.3 292.3 L610.7 291.5 L564.6 310.8 L531.6 311.0 L510.2 301.3 L466.1 315.6 L453.0 305.6 L450.8 334.4 L440.1 345.7 L429.3 357.0 L414.6 333.6 L429.8 314.2 L405.3 318.6 L371.8 306.7 L344.2 336.4 L283.3 342.2 L250.9 314.5 L207.6 312.8 L198.4 334.2 L170.7 340.3 L131.9 312.8 L88.1 313.8 L64.4 262.5 L35.1 233.8 L54.6 193.7 L29.2 169.1 L73.6 119.8 L135.4 117.7 L152.2 78.5 L228.7 85.3 L276.9 51.9 L323.6 37.3 L389.9 36.2 L459.9 72.5 Z",
    "M70.1 105.8 L36.7 133.6 L24.1 109.6 L24.6 98.9 L34.1 93.1 L46.5 60.8 L27.0 47.2 L67.9 31.0 L102.4 37.9 L107.2 57.7 L142.2 74.4 L134.9 87.0 L87.2 89.8 L70.1 105.8 Z",
  ],
  cities: [
    { en: "Ankara", ar: "أنقرة", x: 297, y: 145, capital: true },
    { en: "Istanbul", ar: "إسطنبول", x: 141.8, y: 89.3 },
    { en: "Izmir", ar: "إزمير", x: 68, y: 222.9 },
    { en: "Antalya", ar: "أنطاليا", x: 211.2, y: 301.8 },
    { en: "Gaziantep", ar: "غازي عنتاب", x: 478.6, y: 292.6 },
    { en: "Diyarbakır", ar: "ديار بكر", x: 592.9, y: 249.2 },
    { en: "Trabzon", ar: "طرابزون", x: 572.5, y: 89.8 },
  ],
};

export default function CountryOutlineMap({ lang, color = "var(--accent)" }: { lang: Lang; color?: string }) {
  return (
    <svg viewBox={TUR.viewBox} className="h-auto w-full" role="img" aria-hidden="true">
      {/* boundary — the line map itself */}
      {TUR.paths.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          fill={`color-mix(in srgb, ${color} 6%, transparent)`}
          stroke={color}
          strokeWidth="1.8"
          strokeLinejoin="round"
          className="outline-draw"
        />
      ))}

      {/* cities */}
      {TUR.cities.map((c) => (
        <g key={c.en}>
          {c.capital ? (
            <>
              <circle cx={c.x} cy={c.y} r="6.5" fill="none" stroke={color} strokeWidth="1.5" />
              <circle cx={c.x} cy={c.y} r="3" fill={color} />
            </>
          ) : (
            <circle cx={c.x} cy={c.y} r="3.5" fill="color-mix(in srgb, currentColor 55%, transparent)" />
          )}
          <text
            x={c.x}
            y={c.y - 11}
            textAnchor="middle"
            fill="currentColor"
            opacity={c.capital ? 0.95 : 0.6}
            style={{
              fontSize: c.capital ? "15px" : "13px",
              fontWeight: c.capital ? 600 : 400,
              fontFamily: lang === "ar" ? "var(--font-arabic), sans-serif" : "var(--font-geist-sans), sans-serif",
            }}
          >
            {lang === "ar" ? c.ar : c.en}
          </text>
        </g>
      ))}
    </svg>
  );
}
