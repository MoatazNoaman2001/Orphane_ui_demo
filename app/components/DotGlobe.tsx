"use client";

import { useEffect, useRef } from "react";

const DOTS = 900;
const HIGHLIGHTS = 14;

/**
 * A slowly rotating sphere of data points — the observatory's lens.
 * Pure canvas math, no geo data, no dependencies.
 */
export default function DotGlobe({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pal = light
      ? { hl: "8, 126, 200", front: "28, 71, 145", back: "110, 150, 210", arc: "28, 71, 145" }
      : { hl: "31, 194, 242", front: "140, 190, 250", back: "28, 71, 145", arc: "31, 194, 242" };

    // Fibonacci sphere — evenly distributed points
    const pts: { x: number; y: number; z: number; hl: boolean }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < DOTS; i++) {
      const y = 1 - (i / (DOTS - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push({
        x: Math.cos(t) * r,
        y,
        z: Math.sin(t) * r,
        hl: i % Math.floor(DOTS / HIGHLIGHTS) === 3,
      });
    }

    let raf = 0;
    let angle = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.42;
      const cx = w / 2;
      const cy = h / 2;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const tilt = -0.35;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);
      const hls: { x: number; y: number; d: number }[] = [];

      for (const p of pts) {
        // rotate around Y, then tilt around X
        const x1 = p.x * cosA + p.z * sinA;
        const z1 = -p.x * sinA + p.z * cosA;
        const y1 = p.y * cosT - z1 * sinT;
        const z2 = p.y * sinT + z1 * cosT;

        const px = cx + x1 * R;
        const py = cy + y1 * R;
        const depth = (z2 + 1) / 2; // 0 back → 1 front

        if (p.hl) {
          hls.push({ x: px, y: py, d: depth });
          const glow = 0.35 + depth * 0.65;
          ctx.beginPath();
          ctx.arc(px, py, 2.4 + depth * 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${pal.hl}, ${glow})`;
          ctx.shadowColor = `rgba(${pal.hl}, 0.9)`;
          ctx.shadowBlur = 10 * depth;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          const a = 0.06 + depth * 0.34;
          ctx.beginPath();
          ctx.arc(px, py, 0.9 + depth * 0.8, 0, Math.PI * 2);
          ctx.fillStyle =
            depth > 0.5
              ? `rgba(${pal.front}, ${a})`
              : `rgba(${pal.back}, ${a + 0.05})`;
          ctx.fill();
        }
      }

      // arcs between front-facing highlight points — "data connections"
      for (let i = 0; i < hls.length; i++) {
        const a = hls[i];
        const b = hls[(i + 4) % hls.length];
        if (a.d < 0.55 || b.d < 0.55) continue;
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        // push the midpoint outward from the globe centre so the arc bows
        const dx = mx - cx;
        const dy = my - cy;
        const len = Math.hypot(dx, dy) || 1;
        const bow = R * 1.18;
        const qx = cx + (dx / len) * Math.max(len, bow * 0.45) * 1.35;
        const qy = cy + (dy / len) * Math.max(len, bow * 0.45) * 1.35;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(qx, qy, b.x, b.y);
        ctx.strokeStyle = `rgba(${pal.arc}, ${0.12 * Math.min(a.d, b.d)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      angle += 0.0022;
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [light]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
