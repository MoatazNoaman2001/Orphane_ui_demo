"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

/* Shared motion primitives — used by every observatory demo page. */

/* ---------- scroll reveal ---------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ---------- scramble-in value (data "decrypting") ---------- */
export function Scramble({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const chars = "0123456789ABCDE%–#";
        const start = performance.now();
        const dur = 1000;
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const settled = Math.floor(p * value.length);
          el.textContent =
            value.slice(0, settled) +
            Array.from(
              { length: value.length - settled },
              () => chars[Math.floor(Math.random() * chars.length)]
            ).join("");
          if (p < 1) raf = requestAnimationFrame(tick);
          else el.textContent = value;
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return <span ref={ref}>{value}</span>;
}

/* ---------- cursor spotlight wrapper ---------- */
export function SpotCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div className={`spot ${className}`} onMouseMove={onMove}>
      {children}
    </div>
  );
}

/* ---------- palettes (CSS variables — readable in both themes) ---------- */
export const GRADE_COLORS: Record<string, string> = {
  A: "var(--grade-a)",
  B: "var(--grade-b)",
  C: "var(--grade-c)",
  D: "var(--grade-d)",
  E: "var(--grade-e)",
};

export const TONE_COLORS: Record<string, string> = {
  ok: "var(--grade-a)",
  warn: "var(--grade-d)",
  gap: "var(--grade-e)",
  info: "var(--grade-b)",
};

/** translucent version of a CSS color (hex or var()) for tinted fills/borders */
export const tint = (color: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, transparent)`;
