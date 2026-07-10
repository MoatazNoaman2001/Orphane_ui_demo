import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Design Directions — Orphan Data Observatory",
  description: "Choose a design direction for the Orphan Data Observatory landing page.",
};

const designs = [
  {
    href: "/designs/observatory",
    no: "01",
    name: "The Observatory",
    nameAr: "المرصد",
    desc: "Dark, data-forward. A rotating globe of data points, radar sweeps, an interactive indicator identity card, and a live review pipeline.",
    tags: ["Dark + Light themes", "Interactive", "Animated"],
  },
  {
    href: "/designs/access-map",
    no: "02",
    name: "The Access Map",
    nameAr: "خريطة الوصول",
    desc: "Light, institutional, map-first — the visual language of UNICEF Data and UNHCR. Country statuses on an honest tile map, with data gaps as the loudest element.",
    tags: ["Light / institutional", "Map-first", "Humanitarian-data style"],
  },
];

function ObservatoryThumb() {
  return (
    <div className="relative h-44 overflow-hidden rounded-xl border border-line bg-[#071228]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,160,230,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,230,0.08) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="absolute -end-8 -top-8 h-40 w-40 rounded-full border border-dashed border-[#1fc2f2]/40" />
      <div
        className="absolute -end-4 -top-4 h-32 w-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(31,194,242,0.35) 0%, rgba(28,71,145,0.25) 45%, transparent 70%)",
        }}
      />
      <div className="absolute end-10 top-8 h-1.5 w-1.5 rounded-full bg-[#1fc2f2] shadow-[0_0_8px_#1fc2f2]" />
      <div className="absolute end-20 top-16 h-1 w-1 rounded-full bg-[#1fc2f2]/70" />
      <div className="absolute end-7 top-20 h-1 w-1 rounded-full bg-[#1fc2f2]/50" />
      <div className="absolute bottom-6 start-5 space-y-2">
        <div className="h-3 w-36 rounded-sm bg-gradient-to-r from-[#1fc2f2] to-[#1c4791]" />
        <div className="h-2 w-44 rounded-sm bg-white/15" />
        <div className="h-2 w-28 rounded-sm bg-white/10" />
      </div>
    </div>
  );
}

function AccessMapThumb() {
  const tiles = [
    "#1c4791", "#6ea8e833", "#e3a63b33", "#1c4791", "#b9c6dc55", "#6ea8e833",
    "#e3a63b33", "#1c4791", "#6ea8e833", "#b9c6dc55", "#e3a63b33", "#1c4791",
  ];
  const borders = [
    "#1c4791", "#6ea8e8", "#e3a63b", "#1c4791", "#b9c6dc", "#6ea8e8",
    "#e3a63b", "#1c4791", "#6ea8e8", "#b9c6dc", "#e3a63b", "#1c4791",
  ];
  return (
    <div className="relative h-44 overflow-hidden rounded-xl border border-line bg-[#f6f9fd] p-4">
      <div className="h-2 w-28 rounded-sm bg-[#122a52]/70" />
      <div className="mt-1.5 h-1.5 w-36 rounded-sm bg-[#51648c]/30" />
      <div className="mt-3 grid grid-cols-6 gap-1.5">
        {tiles.map((bg, i) => (
          <div
            key={i}
            className="aspect-square rounded-md"
            style={{ background: bg, border: `1px solid ${borders[i]}88` }}
          />
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        {["#1c4791", "#6ea8e8", "#e3a63b", "#b9c6dc"].map((c) => (
          <span key={c} className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-sm" style={{ background: c }} />
            <span className="h-1 w-7 rounded-sm bg-[#51648c]/25" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DesignGallery() {
  return (
    <main className="relative min-h-screen bg-ink-950 text-foreground">
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-5xl px-5 py-20">
        <div className="latin font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Orphan Data Observatory · OCF
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Design directions
          <span className="block pt-2 text-xl font-medium text-foreground/50 sm:text-2xl">
            اتجاهات التصميم — اختر تصميمًا لفتحه
          </span>
        </h1>
        <p className="mt-5 max-w-2xl leading-relaxed text-foreground/60">
          Two distinct directions for the First Release landing page. Open one to explore it in full —
          both are fully bilingual (English / العربية) and share the same approved content.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {designs.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group rounded-2xl border border-line bg-ink-900/50 p-5 transition duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_14px_50px_rgba(28,71,145,0.35)]"
            >
              {d.no === "01" ? <ObservatoryThumb /> : <AccessMapThumb />}
              <div className="mt-5 flex items-baseline justify-between gap-3">
                <div>
                  <div className="latin font-mono text-[11px] tracking-[0.25em] text-accent">
                    DIRECTION {d.no}
                  </div>
                  <div className="mt-1.5 text-xl font-semibold">
                    {d.name} <span className="text-foreground/45">· {d.nameAr}</span>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border border-accent/40 px-3.5 py-1.5 text-xs font-medium text-accent transition group-hover:bg-accent/10 rtl:rotate-180">
                  Open →
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">{d.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {d.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-line bg-ink-950/60 px-2 py-0.5 text-[11px] text-foreground/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-14 text-center text-xs text-foreground/35">
          More directions can be added here — each lives on its own page.
        </p>
      </div>
    </main>
  );
}
