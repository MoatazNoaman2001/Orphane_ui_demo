"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PublicShell from "./PublicShell";
import Select from "./Select";
import { Reveal, tint } from "./motion";
import { institutionalContent } from "../content-institutional";
import { content } from "../content";
import { useLang } from "./prefs";

/* The four institutional pages: About · Contact · Privacy · Data use & citation. */

const inputCls =
  "w-full rounded-lg border border-line bg-ink-950/50 px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-accent/50 focus:outline-none";
const labelCls = "latin mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45";

function ProseSections({ sections }: { sections: { title: string; body: string }[] }) {
  return (
    <div className="mt-10 space-y-8">
      {sections.map((s, i) => (
        <Reveal key={i} delay={i * 60}>
          <section className="rounded-xl border border-line bg-ink-900/40 p-6 sm:p-7">
            <h2 className="text-lg font-bold tracking-tight sm:text-xl">{s.title}</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-foreground/65">{s.body}</p>
          </section>
        </Reveal>
      ))}
    </div>
  );
}

function PageHead({ title, lead }: { title: string; lead: string }) {
  return (
    <Reveal>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-foreground/65">{lead}</p>
    </Reveal>
  );
}

export function AboutPage() {
  const { lang } = useLang();
  const t = institutionalContent[lang];
  const shared = content[lang];
  return (
    <PublicShell navTitle={shared.hero.kicker} navSubtitle={`OCF · ${t.about.title}`} footerNote={t.draftNote}>
      <section className="mx-auto max-w-6xl px-5 py-12">
        <PageHead title={t.about.title} lead={t.about.lead} />
        <ProseSections sections={t.about.sections} />
      </section>
    </PublicShell>
  );
}

export function PrivacyPage() {
  const { lang } = useLang();
  const t = institutionalContent[lang];
  const shared = content[lang];
  return (
    <PublicShell navTitle={shared.hero.kicker} navSubtitle={`OCF · ${t.privacy.title}`} footerNote={t.draftNote}>
      <section className="mx-auto max-w-6xl px-5 py-12">
        <PageHead title={t.privacy.title} lead={t.privacy.lead} />
        <ProseSections sections={t.privacy.sections} />
      </section>
    </PublicShell>
  );
}

export function DataUsePage() {
  const { lang } = useLang();
  const t = institutionalContent[lang];
  const shared = content[lang];
  return (
    <PublicShell navTitle={shared.hero.kicker} navSubtitle={`OCF · ${t.dataUse.title}`} footerNote={t.draftNote}>
      <section className="mx-auto max-w-6xl px-5 py-12">
        <PageHead title={t.dataUse.title} lead={t.dataUse.lead} />
        <ProseSections sections={t.dataUse.sections} />
        <Reveal delay={100}>
          <div className="mt-8 rounded-xl border border-dashed border-accent/35 p-6" style={{ background: tint("var(--accent)", 5) }}>
            <div className="latin font-mono text-[10px] uppercase tracking-[0.22em] text-accent">{t.dataUse.citationTitle}</div>
            <p className="latin mt-3 rounded-lg border border-line bg-ink-950/40 p-4 font-mono text-sm leading-relaxed text-foreground/80">
              {t.dataUse.citationExample}
            </p>
          </div>
        </Reveal>
      </section>
    </PublicShell>
  );
}

export function ContactPage() {
  const { lang } = useLang();
  const t = institutionalContent[lang];
  const shared = content[lang];
  const c = t.contact;

  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [sent, setSent] = useState(false);

  /* prefill from ?topic=&subject= — the country page's "report an error" passes these */
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const qTopic = p.get("topic");
      const qSubject = p.get("subject");
      if (qTopic !== null) {
        const i = Number(qTopic);
        if (!Number.isNaN(i) && c.form.topics[i]) setTopic(String(i));
      }
      if (qSubject) setSubject(qSubject);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <PublicShell navTitle={shared.hero.kicker} navSubtitle={`OCF · ${c.title}`} footerNote={t.draftNote}>
      <section className="mx-auto max-w-6xl px-5 py-12">
        <PageHead title={c.title} lead={c.lead} />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* form */}
          <Reveal>
            <div className="rounded-xl border border-line bg-ink-900/40 p-6 sm:p-7">
              {sent ? (
                <div className="py-10 text-center">
                  <div
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: tint("var(--state-pub)", 10), border: `1px solid ${tint("var(--state-pub)", 33)}`, color: "var(--state-pub)" }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="mt-5 text-xl font-bold">{c.form.sentTitle}</h2>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-foreground/60">{c.form.sentMessage}</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label className={labelCls}>{c.form.topicLabel}</label>
                    <Select
                      value={topic}
                      onChange={setTopic}
                      placeholder="—"
                      options={c.form.topics.map((tp, i) => ({ value: String(i), label: tp }))}
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>{c.form.nameLabel}</label>
                      <input className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>{c.form.emailLabel}</label>
                      <input type="email" dir="ltr" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>{c.form.subjectLabel}</label>
                    <input value={subject} onChange={(e) => setSubject(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>{c.form.messageLabel}</label>
                    <textarea rows={5} placeholder={c.form.messagePlaceholder} className={`${inputCls} resize-y`} />
                  </div>
                  <div className="flex items-center justify-end border-t border-line pt-5">
                    <button
                      onClick={() => setSent(true)}
                      disabled={topic === ""}
                      className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition enabled:hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {c.form.submit}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          {/* contact info */}
          <div className="space-y-5">
            <Reveal delay={80}>
              <div className="rounded-xl border border-line bg-ink-900/40 p-6">
                <dl className="space-y-4">
                  {c.info.map((row) => (
                    <div key={row.label}>
                      <dt className="latin font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">{row.label}</dt>
                      <dd className="mt-1 text-sm text-foreground/80">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-xl border border-dashed border-line p-6">
                <p className="text-sm leading-relaxed text-foreground/55">{c.form.portalNote}</p>
                <Link
                  href="/designs/observatory/access"
                  transitionTypes={["nav-forward"]}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-accent/40 px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/10"
                >
                  {lang === "ar" ? "بوابة الشركاء" : "Partner portal"}
                  <svg className="rtl:rotate-180" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
