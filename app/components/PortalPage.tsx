"use client";

import { useMemo, useState, ViewTransition } from "react";
import SiteNav from "./SiteNav";
import Select from "./Select";
import { Reveal, tint } from "./motion";
import {
  PORTAL_CATALOG,
  PORTAL_ROWS,
  portalContent,
  type PartnerStageKey,
  type PortalSubmissionRow,
  type PortalView,
} from "../content-portal";
import { content } from "../content";
import { useLang } from "./prefs";

const nf = new Intl.NumberFormat("en-US");

const STATUS_COLORS: Record<PortalSubmissionRow["status"], string> = {
  draft: "var(--gap, #6b7688)",
  sent: "var(--state-prep)",
  review: "var(--accent)",
  changes: "var(--state-gap)",
  approved: "var(--state-pub)",
  published: "var(--state-pub)",
};

interface FormItem {
  indicatorId: string;
  value: string;
  year: string;
  source: string;
  note: string;
}

const emptyItem = (): FormItem => ({ indicatorId: "", value: "", year: "", source: "", note: "" });

const itemComplete = (it: FormItem) =>
  it.indicatorId !== "" && it.value.trim() !== "" && it.year.trim() !== "" && it.source.trim() !== "";

function StatusPill({ status, label }: { status: PortalSubmissionRow["status"]; label: string }) {
  const c = STATUS_COLORS[status];
  return (
    <span
      className="inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-xs font-medium"
      style={{ background: tint(c, 10), color: c, border: `1px solid ${tint(c, 27)}` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
      {label}
    </span>
  );
}

const inputCls =
  "w-full rounded-lg border border-line bg-ink-950/50 px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent/50 focus:outline-none";
const labelCls = "latin mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45";

export default function PortalPage() {
  const { lang } = useLang();
  const t = portalContent[lang];
  const shared = content[lang];

  const [view, setView] = useState<PortalView>("list");
  const [detailId, setDetailId] = useState<string>(PORTAL_ROWS[0].id);
  const [step, setStep] = useState(0); // 0 data · 1 attachments · 2 preview · 3 sent
  const [items, setItems] = useState<FormItem[]>([emptyItem()]);
  const [attached, setAttached] = useState(false);
  const [sentRow, setSentRow] = useState<PortalSubmissionRow | null>(null);

  const rows = useMemo(() => (sentRow ? [sentRow, ...PORTAL_ROWS] : PORTAL_ROWS), [sentRow]);
  const detail = rows.find((r) => r.id === detailId) ?? rows[0];

  const allComplete = items.length > 0 && items.every(itemComplete);
  const catalogOf = (id: string) => PORTAL_CATALOG.find((c) => c.id === id);

  const updateItem = (i: number, patch: Partial<FormItem>) =>
    setItems((arr) => arr.map((it, j) => (j === i ? { ...it, ...patch } : it)));

  const send = () => {
    setSentRow({
      id: "SUB-0110",
      countryEn: "Lebanon",
      countryAr: "لبنان",
      iso: "LBN",
      items: items.length,
      updated: "2026-07-17",
      status: "sent",
    });
    setStep(3);
  };

  const resetForm = () => {
    setItems([emptyItem()]);
    setAttached(false);
    setStep(0);
  };

  const openNew = () => {
    resetForm();
    setView("new");
  };

  /* partner-side timeline for the detail view */
  const stageOrder: PartnerStageKey[] = ["sent", "review", "changes", "approved", "published"];
  const detailStageIdx =
    detail.status === "sent" ? 0 : detail.status === "review" ? 1 : detail.status === "changes" ? 2 : detail.status === "approved" ? 3 : 4;
  const showChangesStage = detail.status === "changes";
  const visibleStages = stageOrder.filter((s) => s !== "changes" || showChangesStage);

  const tabs: { key: PortalView; label: string }[] = [
    { key: "list", label: t.nav.list },
    { key: "new", label: t.nav.new },
    { key: "profile", label: t.nav.profile },
  ];

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
          subtitle={`OCF · ${t.nav.list}`}
          homeHref="/designs/observatory"
          links={[]}
          cta={{ href: "/designs/observatory", label: `${t.backToObservatory}`, back: true }}
        />

        <main className="pt-16">
          {/* ---------- header ---------- */}
          <section className="mx-auto max-w-6xl px-5 pt-12">
            <Reveal>
              <div className="latin inline-block rounded border border-accent/40 bg-accent/10 px-2 py-1 font-mono text-[10px] tracking-[0.22em] text-accent">
                {t.zone}
              </div>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t.hero.title}</h1>
                  <p className="mt-3 max-w-2xl leading-relaxed text-foreground/65">{t.hero.lead}</p>
                </div>
                <div className="rounded-lg border border-line bg-ink-900/50 px-4 py-2.5 text-sm font-medium text-foreground/80">
                  {t.orgName}
                </div>
              </div>

              {/* view tabs */}
              <div className="mt-7 flex flex-wrap gap-y-1 self-start rounded-lg border border-line bg-ink-900/60 p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => (tab.key === "new" ? openNew() : setView(tab.key))}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      view === tab.key || (view === "detail" && tab.key === "list")
                        ? "bg-ink-800 text-accent"
                        : "text-foreground/55 hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </Reveal>
          </section>

          <section className="mx-auto max-w-6xl px-5 py-10">
            {/* ================= MY SUBMISSIONS ================= */}
            {view === "list" && (
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">{t.list.title}</h2>
                    <p className="mt-2 text-sm text-foreground/55">{t.list.lead}</p>
                  </div>
                  <button
                    onClick={openNew}
                    className="rounded-lg bg-gradient-to-r from-brand to-[#2a63c4] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-125"
                  >
                    + {t.list.newButton}
                  </button>
                </div>

                {/* mobile: cards */}
                <div className="mt-6 space-y-3 sm:hidden">
                  {rows.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setDetailId(r.id);
                        setView("detail");
                      }}
                      className="w-full rounded-xl border border-line bg-ink-900/50 p-4 text-start transition-colors duration-200 active:bg-ink-900"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="latin font-mono text-xs text-foreground/60">{r.id}</span>
                        <StatusPill status={r.status} label={t.statusLabels[r.status]} />
                      </div>
                      <div className="mt-3 flex items-center gap-2 font-medium text-foreground/85">
                        <span className="latin w-9 shrink-0 rounded border border-line px-1 py-0.5 text-center font-mono text-[10px] text-foreground/45">
                          {r.iso}
                        </span>
                        {lang === "ar" ? r.countryAr : r.countryEn}
                      </div>
                      <div className="latin mt-2 flex items-center gap-4 font-mono text-[11px] text-foreground/45">
                        <span>{t.list.columns.items}: {r.items}</span>
                        <span>{r.updated}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* desktop: table */}
                <div className="mt-6 hidden overflow-x-auto rounded-xl border border-line sm:block">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead>
                      <tr className="latin border-b border-line bg-ink-900/60 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                        <th className="px-5 py-3.5 text-start font-medium">{t.list.columns.id}</th>
                        <th className="px-5 py-3.5 text-start font-medium">{t.list.columns.country}</th>
                        <th className="px-5 py-3.5 text-start font-medium">{t.list.columns.items}</th>
                        <th className="px-5 py-3.5 text-start font-medium">{t.list.columns.status}</th>
                        <th className="px-5 py-3.5 text-start font-medium">{t.list.columns.updated}</th>
                        <th className="px-2 py-3.5" />
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r, i) => (
                        <tr
                          key={r.id}
                          className={`cursor-pointer transition-colors duration-200 hover:bg-ink-900/50 ${
                            i > 0 ? "border-t border-line-soft" : ""
                          }`}
                          onClick={() => {
                            setDetailId(r.id);
                            setView("detail");
                          }}
                        >
                          <td className="latin px-5 py-4 font-mono text-xs text-foreground/60">{r.id}</td>
                          <td className="px-5 py-4">
                            <span className="flex items-center gap-2 text-foreground/80">
                              <span className="latin w-9 shrink-0 rounded border border-line px-1 py-0.5 text-center font-mono text-[10px] text-foreground/45">
                                {r.iso}
                              </span>
                              {lang === "ar" ? r.countryAr : r.countryEn}
                            </span>
                          </td>
                          <td className="latin px-5 py-4 font-mono text-foreground/60">{r.items}</td>
                          <td className="px-5 py-4">
                            <StatusPill status={r.status} label={t.statusLabels[r.status]} />
                          </td>
                          <td className="latin px-5 py-4 font-mono text-xs text-foreground/50">{r.updated}</td>
                          <td className="px-2 py-4 pe-4 text-end">
                            <span className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-xs font-medium text-foreground/60">
                              {t.list.openDetail}
                              <svg className="rtl:rotate-180" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14m-6-6 6 6-6 6" />
                              </svg>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            )}

            {/* ================= NEW SUBMISSION ================= */}
            {view === "new" && (
              <Reveal>
                <h2 className="text-2xl font-bold tracking-tight">{t.form.title}</h2>

                {/* step chips */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {[t.form.steps.data, t.form.steps.attachments, t.form.steps.preview].map((label, i) => {
                    const done = step > i;
                    const active = step === i;
                    return (
                      <div key={label} className="flex items-center gap-2">
                        {i > 0 && <span className="h-px w-6 bg-line" />}
                        <span
                          className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-300 ${
                            active
                              ? "border-accent/60 bg-accent/10 text-accent"
                              : done
                              ? "border-line text-foreground/70"
                              : "border-line text-foreground/40"
                          }`}
                        >
                          <span
                            className={`latin flex h-4.5 w-4.5 items-center justify-center rounded-full font-mono text-[10px] font-bold ${
                              done ? "bg-accent text-background" : active ? "border border-accent text-accent" : "border border-foreground/25"
                            }`}
                            style={{ width: 18, height: 18 }}
                          >
                            {done ? "✓" : i + 1}
                          </span>
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* ---- step 0: data ---- */}
                {step === 0 && (
                  <div className="mt-7 space-y-5">
                    <div className="max-w-xs">
                      <label className={labelCls}>{t.form.countryLabel}</label>
                      <div className="flex items-center gap-2 rounded-lg border border-line bg-ink-900/50 px-3 py-2 text-sm text-foreground/80">
                        <span className="latin w-9 shrink-0 rounded border border-line px-1 py-0.5 text-center font-mono text-[10px] text-foreground/45">LBN</span>
                        {lang === "ar" ? "لبنان" : "Lebanon"}
                      </div>
                    </div>

                    <div className="latin font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">{t.form.itemsTitle}</div>

                    {items.map((it, i) => {
                      const complete = itemComplete(it);
                      const cat = catalogOf(it.indicatorId);
                      return (
                        <div
                          key={i}
                          className={`rounded-xl border p-5 transition-colors duration-300 ${
                            complete ? "border-accent/35 bg-ink-900/50" : "border-line bg-ink-900/35"
                          }`}
                        >
                          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                            <div className="col-span-2">
                              <label className={labelCls}>{t.form.fields.indicator}</label>
                              <Select
                                value={it.indicatorId}
                                onChange={(v) => updateItem(i, { indicatorId: v })}
                                placeholder={t.form.fields.indicatorPlaceholder}
                                options={PORTAL_CATALOG.map((c) => ({ value: c.id, label: lang === "ar" ? c.ar : c.en }))}
                              />
                            </div>
                            <div>
                              <label className={labelCls}>{t.form.fields.value}</label>
                              <input
                                value={it.value}
                                onChange={(e) => updateItem(i, { value: e.target.value.replace(/[^\d]/g, "") })}
                                placeholder={t.form.fields.valuePlaceholder}
                                inputMode="numeric"
                                className={`${inputCls} latin font-mono`}
                              />
                            </div>
                            <div>
                              <label className={labelCls}>{t.form.fields.year}</label>
                              <Select
                                value={it.year}
                                onChange={(v) => updateItem(i, { year: v })}
                                placeholder="—"
                                options={["2026", "2025", "2024", "2023"].map((y) => ({ value: y, label: y }))}
                              />
                            </div>
                            <div className="col-span-2">
                              <label className={labelCls}>{t.form.fields.source}</label>
                              <input
                                value={it.source}
                                onChange={(e) => updateItem(i, { source: e.target.value })}
                                placeholder={t.form.fields.sourcePlaceholder}
                                className={inputCls}
                              />
                            </div>
                            <div>
                              <label className={labelCls}>{t.form.fields.category}</label>
                              <div className="rounded-lg border border-line bg-ink-950/30 px-3 py-2 text-sm text-foreground/60">
                                {cat ? (lang === "ar" ? cat.categoryAr : cat.categoryEn) : "—"}
                              </div>
                            </div>
                            <div>
                              <label className={labelCls}>{t.form.fields.note}</label>
                              <input
                                value={it.note}
                                onChange={(e) => updateItem(i, { note: e.target.value })}
                                placeholder={t.form.fields.notePlaceholder}
                                className={inputCls}
                              />
                            </div>
                          </div>

                          {/* live identity card */}
                          <div className="mt-4 border-t border-line pt-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                                <span className={`latin font-mono text-2xl font-bold ${complete ? "num-valid" : "num-invalid"}`}>
                                  {it.value ? nf.format(Number(it.value)) : "0000"}
                                </span>
                                <span
                                  className={`flex w-fit items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium ${
                                    complete ? "bg-accent/10 text-accent" : "bg-warn/10 text-warn"
                                  }`}
                                >
                                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${complete ? "bg-accent" : "bg-warn"}`} />
                                  {complete ? t.form.cardValid : t.form.cardInvalid}
                                </span>
                              </div>
                              {items.length > 1 && (
                                <button
                                  onClick={() => setItems((arr) => arr.filter((_, j) => j !== i))}
                                  className="self-start text-xs text-foreground/40 transition hover:text-danger sm:self-auto"
                                >
                                  {t.form.removeItem}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <button
                      onClick={() => setItems((arr) => [...arr, emptyItem()])}
                      className="w-full rounded-xl border border-dashed border-line py-3 text-sm text-foreground/50 transition hover:border-accent/40 hover:text-accent"
                    >
                      + {t.form.addItem}
                    </button>

                    <p className="flex items-start gap-2 text-xs leading-relaxed text-foreground/45">
                      <svg className="mt-0.5 shrink-0 text-accent/70" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Zm-2.5 9 2 2 3.5-4" />
                      </svg>
                      {t.form.noPersonalData}
                    </p>

                    <div className="flex items-center justify-between gap-3 border-t border-line pt-5">
                      <span className="text-xs text-foreground/40">{t.form.draftSaved}</span>
                      <button
                        onClick={() => setStep(1)}
                        disabled={!allComplete}
                        className="rounded-lg bg-gradient-to-r from-brand to-[#2a63c4] px-6 py-2.5 text-sm font-semibold text-white transition enabled:hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {t.form.nextButton}
                      </button>
                    </div>
                  </div>
                )}

                {/* ---- step 1: attachments ---- */}
                {step === 1 && (
                  <div className="mt-7 space-y-5">
                    <div>
                      <h3 className="text-lg font-semibold">{t.form.attachmentsTitle}</h3>
                      <p className="mt-1 text-sm text-foreground/55">{t.form.attachmentsLead}</p>
                    </div>
                    {attached ? (
                      <div className="flex items-center justify-between rounded-xl border border-line bg-ink-900/50 px-5 py-4">
                        <span className="latin flex items-center gap-3 font-mono text-sm text-foreground/80">
                          <svg className="text-accent" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 3v5h5M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                          </svg>
                          {t.form.sampleFile}
                        </span>
                        <button onClick={() => setAttached(false)} className="text-xs text-foreground/40 transition hover:text-danger">
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAttached(true)}
                        className="w-full rounded-xl border border-dashed border-line py-10 text-sm text-foreground/50 transition hover:border-accent/40 hover:text-accent"
                      >
                        ↑ {t.form.addFile}
                      </button>
                    )}
                    <div className="flex items-center justify-between gap-3 border-t border-line pt-5">
                      <button onClick={() => setStep(0)} className="rounded-lg border border-line px-5 py-2.5 text-sm text-foreground/70 transition hover:border-accent/40">
                        {t.form.backButton}
                      </button>
                      <button
                        onClick={() => setStep(2)}
                        className="rounded-lg bg-gradient-to-r from-brand to-[#2a63c4] px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-125"
                      >
                        {t.form.nextButton}
                      </button>
                    </div>
                  </div>
                )}

                {/* ---- step 2: preview ---- */}
                {step === 2 && (
                  <div className="mt-7 space-y-5">
                    <div>
                      <h3 className="text-lg font-semibold">{t.form.previewTitle}</h3>
                      <p className="mt-1 text-sm text-foreground/55">{t.form.previewLead}</p>
                    </div>
                    <div className="rounded-xl border border-line bg-ink-900/40 p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                        <span className="font-semibold">{t.orgName}</span>
                        <span className="latin font-mono text-xs text-foreground/50">LBN · {items.length} · 2026-07-17</span>
                      </div>
                      <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-[480px] text-sm">
                          <thead>
                            <tr className="latin border-b border-line font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                              <th className="py-2 pe-4 text-start font-medium">{t.form.fields.indicator}</th>
                              <th className="py-2 pe-4 text-start font-medium">{t.form.fields.value}</th>
                              <th className="py-2 pe-4 text-start font-medium">{t.form.fields.year}</th>
                              <th className="py-2 text-start font-medium">{t.form.fields.source}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((it, i) => {
                              const cat = catalogOf(it.indicatorId);
                              return (
                                <tr key={i} className={i > 0 ? "border-t border-line-soft" : ""}>
                                  <td className="py-3 pe-4 text-foreground/80">{cat ? (lang === "ar" ? cat.ar : cat.en) : "—"}</td>
                                  <td className="latin py-3 pe-4 font-mono font-semibold">{nf.format(Number(it.value))}</td>
                                  <td className="latin py-3 pe-4 font-mono text-foreground/55">{it.year}</td>
                                  <td className="py-3 text-xs text-foreground/50">{it.source}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      {attached && (
                        <div className="latin mt-4 flex items-center gap-2 border-t border-line pt-3 font-mono text-xs text-foreground/55">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 3v5h5M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                          </svg>
                          {t.form.sampleFile}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-line pt-5">
                      <button onClick={() => setStep(0)} className="rounded-lg border border-line px-5 py-2.5 text-sm text-foreground/70 transition hover:border-accent/40">
                        {t.form.editButton}
                      </button>
                      <button
                        onClick={send}
                        className="rounded-lg bg-gradient-to-r from-accent to-[#4f9de8] px-7 py-2.5 text-sm font-semibold text-on-accent shadow-[0_0_24px_rgba(31,194,242,0.35)] transition hover:brightness-110"
                      >
                        {t.form.sendButton} ←
                      </button>
                    </div>
                  </div>
                )}

                {/* ---- step 3: sent ---- */}
                {step === 3 && (
                  <div className="mx-auto max-w-xl py-14 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: tint("var(--state-pub)", 10), border: `1px solid ${tint("var(--state-pub)", 33)}`, color: "var(--state-pub)" }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="mt-6 text-2xl font-bold tracking-tight">{t.form.sentTitle}</h3>
                    <p className="mx-auto mt-3 leading-relaxed text-foreground/60">{t.form.sentMessage}</p>
                    <button
                      onClick={() => setView("list")}
                      className="mt-7 rounded-lg border border-accent/40 px-6 py-2.5 text-sm font-medium text-accent transition hover:bg-accent/10"
                    >
                      {t.form.backToList}
                    </button>
                  </div>
                )}
              </Reveal>
            )}

            {/* ================= SUBMISSION DETAIL ================= */}
            {view === "detail" && (
              <Reveal>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setView("list")} className="rounded-md border border-line px-2.5 py-1.5 text-xs text-foreground/60 transition hover:border-accent/40 hover:text-accent">
                      ← {t.nav.list}
                    </button>
                    <span className="latin font-mono text-sm text-foreground/50">{detail.id}</span>
                    <h2 className="text-xl font-bold tracking-tight">{lang === "ar" ? detail.countryAr : detail.countryEn}</h2>
                  </div>
                  <StatusPill status={detail.status} label={t.statusLabels[detail.status]} />
                </div>

                <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
                  {/* partner-side timeline */}
                  <div className="rounded-xl border border-line bg-ink-900/40 p-6">
                    <div className="latin font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">{t.detail.timelineTitle}</div>
                    <ol className="mt-5">
                      {visibleStages.map((s, i) => {
                        const stagePos = stageOrder.indexOf(s);
                        const isDone = stagePos < detailStageIdx;
                        const isCurrent = stagePos === detailStageIdx;
                        const c = s === "changes" ? "var(--state-gap)" : "var(--accent)";
                        return (
                          <li key={s} className="relative flex gap-3 pb-5 last:pb-0">
                            {i < visibleStages.length - 1 && <span className="absolute start-[11px] top-6 h-full w-px bg-line" aria-hidden="true" />}
                            <span
                              className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] transition-all duration-300 ${
                                isDone ? "border-accent bg-accent text-background" : isCurrent ? "bg-ink-950" : "border-foreground/20 bg-ink-950 text-foreground/40"
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
                            <span className={`pt-0.5 text-sm ${isCurrent ? "font-semibold" : isDone ? "text-foreground/75" : "text-foreground/45"}`}>
                              {t.detail.stages[s]}
                            </span>
                          </li>
                        );
                      })}
                    </ol>
                  </div>

                  <div className="space-y-6">
                    {detail.status === "changes" && (
                      <div className="rounded-xl border border-line bg-ink-900/40 p-6">
                        <div className="latin font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">{t.detail.notesTitle}</div>
                        <div className="mt-4 rounded-lg border border-line bg-ink-950/40 p-4">
                          <p className="text-sm leading-relaxed text-foreground/80">{t.detail.unionNote}</p>
                          <p className="mt-2 text-[11px] text-foreground/45">{t.detail.unionNoteAuthor}</p>
                        </div>
                        <p className="mt-4 text-xs text-foreground/50">{t.detail.resubmitHint}</p>
                        <button
                          onClick={openNew}
                          className="mt-4 rounded-lg px-5 py-2.5 text-sm font-semibold transition hover:brightness-110"
                          style={{ background: tint("var(--state-gap)", 14), color: "var(--state-gap)", border: `1px solid ${tint("var(--state-gap)", 40)}` }}
                        >
                          {t.detail.resubmitButton}
                        </button>
                      </div>
                    )}
                    {(detail.status === "review" || detail.status === "sent") && (
                      <div className="rounded-xl border border-line bg-ink-900/40 p-6 text-sm text-foreground/55">{t.detail.lockedHint}</div>
                    )}
                    {detail.status === "published" && (
                      <div className="rounded-xl border p-6 text-sm leading-relaxed" style={{ borderColor: tint("var(--state-pub)", 35), background: tint("var(--state-pub)", 7), color: "var(--state-pub)" }}>
                        {t.detail.stages.published} ✓
                      </div>
                    )}
                    <p className="flex items-center gap-2 text-xs text-foreground/45">
                      <svg className="shrink-0 text-accent/70" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z" />
                      </svg>
                      {t.demoNote}
                    </p>
                  </div>
                </div>
              </Reveal>
            )}

            {/* ================= ORGANIZATION PROFILE ================= */}
            {view === "profile" && (
              <Reveal>
                <h2 className="text-2xl font-bold tracking-tight">{t.profile.title}</h2>
                <p className="mt-2 max-w-2xl text-sm text-foreground/55">{t.profile.lead}</p>
                <div className="mt-7 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                  <div className="rounded-xl border border-line bg-ink-900/40 p-6">
                    <dl className="divide-y divide-line-soft">
                      {(Object.keys(t.profile.fields) as (keyof typeof t.profile.fields)[]).map((k) => (
                        <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 py-3.5 first:pt-0 last:pb-0">
                          <dt className="latin self-center font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
                            {t.profile.fields[k]}
                          </dt>
                          <dd className="text-sm text-foreground/85">{t.profile.values[k]}</dd>
                        </div>
                      ))}
                    </dl>
                    <button className="mt-5 rounded-lg border border-accent/40 px-5 py-2.5 text-sm font-medium text-accent transition hover:bg-accent/10">
                      {t.profile.editButton}
                    </button>
                  </div>
                  <div className="rounded-xl border border-dashed border-line p-6">
                    <div className="latin font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">{t.profile.visibilityTitle}</div>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/60">{t.profile.visibilityNote}</p>
                  </div>
                </div>
              </Reveal>
            )}
          </section>

          {/* ---------- footer ---------- */}
          <footer className="border-t border-line">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-8">
              <p className="text-xs leading-relaxed text-foreground/45">{t.demoNote}</p>
              <div className="latin max-w-full text-center font-mono text-[10px] leading-relaxed tracking-[0.18em] text-foreground/35 sm:shrink-0 sm:text-start">
                AGGREGATED · NON-PERSONAL · REVIEWED
              </div>
            </div>
          </footer>
        </main>
      </div>
    </ViewTransition>
  );
}
