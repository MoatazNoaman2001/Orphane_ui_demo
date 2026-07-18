"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Custom select — native <select> option lists take OS styling and clash
 * with the dark theme, so the demo uses its own listbox styled by tokens.
 */

export interface SelectOption {
  value: string;
  label: string;
}

export default function Select({
  value,
  onChange,
  options,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

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

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-start text-sm transition-colors duration-200 focus:outline-none ${
          open ? "border-accent/60 bg-ink-950/70" : "border-line bg-ink-950/50 hover:border-accent/40"
        }`}
      >
        <span className={`truncate ${selected ? "text-foreground" : "text-foreground/35"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`shrink-0 text-foreground/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute inset-x-0 top-full z-30 mt-1.5 max-h-64 overflow-auto rounded-lg border border-line bg-ink-850 py-1 shadow-[0_16px_40px_rgba(4,11,28,0.5)]"
        >
          {options.map((o) => {
            const isSelected = o.value === value;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2 px-3 py-2.5 text-start text-sm transition-colors duration-150 ${
                    isSelected ? "bg-accent/10 text-accent" : "text-foreground/80 hover:bg-ink-800 hover:text-foreground"
                  }`}
                >
                  <span className="truncate">{o.label}</span>
                  {isSelected && (
                    <svg className="shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
