"use client";

import { useState, ViewTransition } from "react";
import SiteNav from "./SiteNav";
import { GRADE_COLORS, Reveal, tint } from "./motion";
import {
  DEMO_SUBMISSIONS,
  STAGES,
  reviewContent,
  type Actor,
  type StageKey,
} from "../content-review";
import { content } from "../content";
import { useLang } from "./prefs";

const nf = new Intl.NumberFormat("en-US");

const ACTOR_COLORS: Record<Actor, string> = {
  partner: "var(--state-prep)",
  team: "var(--accent)",
  manager: "var(--state-gap)",
};

const stageIndex = (k: StageKey) => STAGES.findIndex((s) => s.key === k);

function ActorChip({ actor, label }: { actor: Actor; label: string }) {
  const c = ACTOR_COLORS[actor];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 text-[10px] font-medium"
      style={{ background: tint(c, 10), color: c, border: `1px solid ${tint(c, 25)}` }}
    >
      <span className="h-1 w-1 rounded-full" style={{ background: c }} />
      {label}
    </span>
  );
}

function GradeChip({ grade, active, onClick }: { grade: string; active?: boolean; onClick?: () => void }) {
  const c = GRADE_COLORS[grade];
  const El = onClick ? "button" : "span";
  return (
    <El
      onClick={onClick}
      className={`latin inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold transition-all duration-200 ${
        onClick && !active ? "opacity-45 hover:opacity-100" : ""
      }`}
      style={{
        background: tint(c, active ? 22 : 12),
        color: c,
        border: `1px solid ${tint(c, active ? 60 : 33)}`,
      }}
    >
      {grade}
    </El>
  );
}

export default function ReviewPage() {
  const { lang } = useLang();
  const t = reviewContent[lang];
  const shared = content[lang];

  const [selectedId, setSelectedId] = useState(DEMO_SUBMISSIONS[0].id);
  const [stageOf, setStageOf] = useState<Record<string, StageKey>>(
    Object.fromEntries(DEMO_SUBMISSIONS.map((s) => [s.id, s.initialStage]))
  );
  const [gradeOf, setGradeOf] = useState<Record<string, string>>(
    Object.fromEntries(DEMO_SUBMISSIONS.map((s) => [s.id, s.items[0].suggested]))
  );

  const sub = DEMO_SUBMISSIONS.find((s) => s.id === selectedId)!;
  const stage = stageOf[sub.id];
  const idx = stageIndex(stage);
  const stageName = (k: StageKey) => {
    const s = STAGES[stageIndex(k)];
    return lang === "ar" ? s.ar : s.en;
  };

  const advance = (to: StageKey) => setStageOf((m) => ({ ...m, [sub.id]: to }));

  /* legal actions per stage — mirrors the real state machine's transition table */
  const actions: { label: string; actor: Actor; to: StageKey; danger?: boolean }[] =
    stage === "submitted"
      ? [{ label: t.actions.startTriage, actor: "team", to: "triage" }]
      : stage === "triage"
      ? [{ label: t.actions.startMethod, actor: "team", to: "method" }]
      : stage === "method"
      ? [
          { label: stageName("grade"), actor: "team", to: "grade" },
          { label: t.actions.requestChanges, actor: "team", to: "changes" },
        ]
      : stage === "changes"
      ? [{ label: t.actions.partnerResubmits, actor: "partner", to: "resubmitted" }]
      : stage === "resubmitted"
      ? [{ label: t.actions.startMethod, actor: "team", to: "method" }]
      : stage === "grade"
      ? [
          { label: t.actions.approve, actor: "manager", to: "approved" },
          { label: t.actions.reject, actor: "manager", to: "closed", danger: true },
        ]
      : stage === "approved"
      ? [
          { label: t.actions.publish, actor: "manager", to: "published" },
          { label: t.actions.internalUse, actor: "manager", to: "published" },
          { label: t.actions.reject, actor: "manager", to: "closed", danger: true },
        ]
      : [];

  const showNotes = ["method", "changes", "resubmitted", "grade", "approved", "published"].includes(stage);
  const currentColor = stage === "closed" ? "var(--grade-e)" : "var(--accent)";

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
          title={shared.hero.kicker}
          subtitle={`OCF · ${t.hero.zone}`}
          homeHref="/designs/observatory"
          links={[
            { href: "#queue", label: t.nav.queue },
            { href: "#detail", label: t.nav.detail },
          ]}
          cta={{ href: "/designs/observatory", label: `${t.backToObservatory}`, back: true }}
        />

        <main className="pt-16">
          {/* ---------- header ---------- */}
          <section className="mx-auto max-w-6xl px-5 pt-12">
            <Reveal>
              <div className="latin inline-block rounded border border-warn/40 bg-warn/10 px-2 py-1 font-mono text-[10px] tracking-[0.22em] text-warn">
                {t.hero.zone}
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{t.hero.title}</h1>
              <p className="mt-4 max-w-2xl leading-relaxed text-foreground/65">{t.hero.lead}</p>
              <p className="mt-4 max-w-2xl text-xs leading-relaxed text-foreground/45">{t.demoNote}</p>
            </Reveal>
          </section>

          {/* ---------- queue ---------- */}
          <section id="queue" className="scroll-mt-24">
            <div className="mx-auto max-w-6xl px-5 py-10">
              <Reveal>
                <h2 className="text-xl font-bold tracking-tight">{t.queue.title}</h2>
                <div className="mt-4 overflow-x-auto rounded-xl border border-line">
                  <table className="w-full min-w-[680px] text-sm">
                    <thead>
                      <tr className="latin border-b border-line bg-ink-900/60 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                        <th className="px-4 py-3 text-start font-medium">{t.queue.columns.id}</th>
                        <th className="px-4 py-3 text-start font-medium">{t.queue.columns.org}</th>
                        <th className="px-4 py-3 text-start font-medium">{t.queue.columns.country}</th>
                        <th className="px-4 py-3 text-start font-medium">{t.queue.columns.items}</th>
                        <th className="px-4 py-3 text-start font-medium">{t.queue.columns.stage}</th>
                        <th className="px-4 py-3 text-start font-medium">{t.queue.columns.date}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DEMO_SUBMISSIONS.map((s, i) => {
                        const st = stageOf[s.id];
                        const active = s.id === selectedId;
                        const terminal = st === "published" || st === "closed";
                        const stColor = st === "closed" ? "var(--grade-e)" : terminal ? "var(--state-pub)" : "var(--accent)";
                        return (
                          <tr
                            key={s.id}
                            onClick={() => setSelectedId(s.id)}
                            className={`cursor-pointer transition-colors duration-200 ${i > 0 ? "border-t border-line-soft" : ""} ${
                              active ? "bg-ink-900/70" : "hover:bg-ink-900/40"
                            }`}
                            style={active ? { boxShadow: "inset 3px 0 0 var(--accent)" } : undefined}
                          >
                            <td className="latin px-4 py-3.5 font-mono text-xs text-foreground/60">{s.id}</td>
                            <td className="px-4 py-3.5 font-medium text-foreground/85">{lang === "ar" ? s.orgAr : s.orgEn}</td>
                            <td className="px-4 py-3.5 text-foreground/60">
                              <span className="flex items-center gap-2">
                                <span className="latin w-9 shrink-0 rounded border border-line px-1 py-0.5 text-center font-mono text-[10px] text-foreground/45">
                                  {s.iso}
                                </span>
                                {lang === "ar" ? s.countryAr : s.countryEn}
                              </span>
                            </td>
                            <td className="latin px-4 py-3.5 font-mono text-foreground/60">{s.items.length}</td>
                            <td className="px-4 py-3.5">
                              <span
                                className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium"
                                style={{ background: tint(stColor, 10), color: stColor, border: `1px solid ${tint(stColor, 25)}` }}
                              >
                                <span className="h-1.5 w-1.5 rounded-full" style={{ background: stColor }} />
                                {stageName(st)}
                              </span>
                            </td>
                            <td className="latin px-4 py-3.5 font-mono text-xs text-foreground/50">{s.submittedAt}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ---------- detail ---------- */}
          <section id="detail" className="scroll-mt-24 border-t border-line">
            <div className="mx-auto max-w-6xl px-5 py-12">
              <Reveal>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="latin font-mono text-sm text-foreground/50">{sub.id}</span>
                    <h2 className="text-xl font-bold tracking-tight">
                      {lang === "ar" ? sub.orgAr : sub.orgEn} · {lang === "ar" ? sub.countryAr : sub.countryEn}
                    </h2>
                  </div>
                  <span
                    className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium"
                    style={{ background: tint(currentColor, 10), color: currentColor, border: `1px solid ${tint(currentColor, 27)}` }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: currentColor }} />
                    {stageName(stage)}
                  </span>
                </div>
              </Reveal>

              <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
                {/* review path */}
                <Reveal className="h-full">
                  <div className="h-full rounded-xl border border-line bg-ink-900/40 p-6">
                    <div className="latin font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">
                      {t.detail.pathTitle}
                    </div>
                    <ol className="mt-5 space-y-0">
                      {STAGES.map((s, i) => {
                        const isDone = i < idx && !(stage === "published" && s.key === "closed");
                        const isCurrent = i === idx;
                        const na = stage === "published" && s.key === "closed";
                        const c = isCurrent ? currentColor : ACTOR_COLORS[s.actor];
                        return (
                          <li key={s.key} className="relative flex gap-3 pb-4 last:pb-0">
                            {i < STAGES.length - 1 && (
                              <span className="absolute start-[11px] top-6 h-full w-px bg-line" aria-hidden="true" />
                            )}
                            <span
                              className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold transition-all duration-300 ${
                                isDone
                                  ? "border-accent bg-accent text-background"
                                  : isCurrent
                                  ? "bg-ink-950"
                                  : "border-foreground/20 bg-ink-950 text-foreground/40"
                              }`}
                              style={isCurrent ? { borderColor: c, color: c, boxShadow: `0 0 0 3px ${tint(c, 18)}` } : undefined}
                            >
                              {isDone ? (
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <span className="latin font-mono">{i + 1}</span>
                              )}
                            </span>
                            <span className={`flex flex-wrap items-center gap-2 pt-0.5 text-sm ${na ? "opacity-35" : ""}`}>
                              <span className={isCurrent ? "font-semibold" : isDone ? "text-foreground/75" : "text-foreground/45"}>
                                {lang === "ar" ? s.ar : s.en}
                              </span>
                              <ActorChip actor={s.actor} label={t.actors[s.actor]} />
                            </span>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </Reveal>

                {/* data + notes + actions */}
                <div className="space-y-6">
                  <Reveal delay={60}>
                    <div className="rounded-xl border border-line bg-ink-900/40 p-6">
                      <div className="latin font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">
                        {t.detail.itemsTitle}
                      </div>
                      <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-[520px] text-sm">
                          <thead>
                            <tr className="latin border-b border-line font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                              <th className="py-2 pe-4 text-start font-medium">{t.detail.itemColumns.indicator}</th>
                              <th className="py-2 pe-4 text-start font-medium">{t.detail.itemColumns.value}</th>
                              <th className="py-2 pe-4 text-start font-medium">{t.detail.itemColumns.year}</th>
                              <th className="py-2 pe-4 text-start font-medium">{t.detail.itemColumns.source}</th>
                              <th className="py-2 text-start font-medium">{t.detail.itemColumns.suggested}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sub.items.map((it, i) => (
                              <tr key={i} className={i > 0 ? "border-t border-line-soft" : ""}>
                                <td className="py-3 pe-4 text-foreground/80">{lang === "ar" ? it.indicatorAr : it.indicatorEn}</td>
                                <td className="latin py-3 pe-4 font-mono font-semibold text-foreground">{nf.format(it.value)}</td>
                                <td className="latin py-3 pe-4 font-mono text-foreground/55">{it.year}</td>
                                <td className="py-3 pe-4 text-xs text-foreground/50">{lang === "ar" ? it.sourceAr : it.sourceEn}</td>
                                <td className="py-3"><GradeChip grade={it.suggested} active /></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Reveal>

                  {showNotes && (
                    <Reveal delay={90}>
                      <div className="rounded-xl border border-line bg-ink-900/40 p-6">
                        <div className="latin font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">
                          {t.detail.notesTitle}
                        </div>
                        <div className="mt-4 rounded-lg border border-line bg-ink-950/40 p-4">
                          <p className="text-sm leading-relaxed text-foreground/80">{t.detail.sampleNote}</p>
                          <p className="mt-2 text-[11px] text-foreground/45">{t.detail.sampleNoteAuthor}</p>
                        </div>
                      </div>
                    </Reveal>
                  )}

                  {stage === "grade" && (
                    <Reveal delay={100}>
                      <div className="rounded-xl border border-line bg-ink-900/40 p-6">
                        <div className="latin font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">
                          {t.detail.gradePickLabel}
                        </div>
                        <div className="mt-4 flex items-center gap-2.5">
                          {(["A", "B", "C", "D", "E"] as const).map((g) => (
                            <GradeChip
                              key={g}
                              grade={g}
                              active={gradeOf[sub.id] === g}
                              onClick={() => setGradeOf((m) => ({ ...m, [sub.id]: g }))}
                            />
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  )}

                  {/* terminal panels */}
                  {stage === "published" && (
                    <Reveal delay={100}>
                      <div
                        className="rounded-xl border p-6 text-sm leading-relaxed"
                        style={{ borderColor: tint("var(--state-pub)", 35), background: tint("var(--state-pub)", 7), color: "var(--state-pub)" }}
                      >
                        {t.detail.publishedNote}
                      </div>
                    </Reveal>
                  )}
                  {stage === "closed" && (
                    <Reveal delay={100}>
                      <div
                        className="rounded-xl border p-6 text-sm leading-relaxed"
                        style={{ borderColor: tint("var(--grade-e)", 35), background: tint("var(--grade-e)", 7), color: "var(--grade-e)" }}
                      >
                        {t.detail.closedNote}
                      </div>
                    </Reveal>
                  )}

                  {/* actions */}
                  {actions.length > 0 && (
                    <Reveal delay={110}>
                      <div className="rounded-xl border border-line bg-ink-900/40 p-6">
                        <div className="latin font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">
                          {t.detail.actionsTitle}
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          {actions.map((a) => {
                            const c = a.danger ? "var(--grade-e)" : ACTOR_COLORS[a.actor];
                            return (
                              <button
                                key={a.label}
                                onClick={() => advance(a.to)}
                                className="inline-flex items-center gap-2.5 rounded-lg px-4 py-2 text-sm font-medium transition duration-200 hover:brightness-110"
                                style={{ background: tint(c, 14), color: c, border: `1px solid ${tint(c, 40)}` }}
                              >
                                {a.label}
                                <ActorChip actor={a.actor} label={t.actors[a.actor]} />
                              </button>
                            );
                          })}
                        </div>
                        {(stage === "grade" || stage === "approved") && (
                          <p className="mt-3 text-xs text-foreground/45">{t.detail.reasonHint}</p>
                        )}
                      </div>
                    </Reveal>
                  )}

                  <p className="flex items-center gap-2 text-xs text-foreground/45">
                    <svg className="shrink-0 text-accent/70" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z" />
                    </svg>
                    {t.detail.auditLine}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ---------- footer ---------- */}
          <footer className="border-t border-line">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-8">
              <p className="text-xs leading-relaxed text-foreground/45">{t.demoNote}</p>
              <div className="latin max-w-full text-center font-mono text-[10px] leading-relaxed tracking-[0.18em] text-foreground/35 sm:shrink-0 sm:text-start">
                NO PUBLICATION BEFORE APPROVAL
              </div>
            </div>
          </footer>
        </main>
      </div>
    </ViewTransition>
  );
}
