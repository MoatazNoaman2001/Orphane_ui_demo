"use client";

import { useMemo } from "react";
import world from "../data/world-dots.json";

const SP = 7;

/*
 * Mini dot-matrix map of a single country: the country's dots glow,
 * neighbours inside the padded bounding box stay as faint context.
 * Same pre-rasterized geography as WorldDotMap — no map library.
 */
export default function CountryDotMap({ iso, color = "#1fc2f2" }: { iso: string; color?: string }) {
  const { own, context, viewBox } = useMemo(() => {
    const isos = world.isos as string[];
    const idx = isos.indexOf(iso);
    const own: [number, number][] = [];
    const all: [number, number, number][] = world.dots as [number, number, number][];

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const [x, y, i] of all) {
      if (i === idx) {
        own.push([x, y]);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }

    /* pad the box, keep a pleasant aspect ratio */
    const padX = Math.max(4, Math.round((maxX - minX) * 0.45));
    const padY = Math.max(3, Math.round((maxY - minY) * 0.55));
    minX -= padX; maxX += padX; minY -= padY; maxY += padY;

    const context: [number, number][] = [];
    for (const [x, y, i] of all) {
      if (i !== idx && x >= minX && x <= maxX && y >= minY && y <= maxY) context.push([x, y]);
    }

    return {
      own,
      context,
      viewBox: `${minX * SP} ${minY * SP} ${(maxX - minX + 1) * SP} ${(maxY - minY + 1) * SP}`,
    };
  }, [iso]);

  return (
    <svg viewBox={viewBox} className="h-auto w-full" role="img" aria-hidden="true">
      <g fill="rgba(120, 160, 230, 0.14)">
        {context.map(([x, y], i) => (
          <circle key={i} cx={x * SP + SP / 2} cy={y * SP + SP / 2} r={2.1} />
        ))}
      </g>
      <g fill={color} style={{ filter: `drop-shadow(0 0 5px ${color})` }}>
        {own.map(([x, y], i) => (
          <circle key={i} cx={x * SP + SP / 2} cy={y * SP + SP / 2} r={2.3} className="country-dot" style={{ animationDelay: `${(i % 24) * 55}ms` }} />
        ))}
      </g>
    </svg>
  );
}
