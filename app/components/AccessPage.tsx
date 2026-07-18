"use client";

import Link from "next/link";
import PublicShell from "./PublicShell";
import { Reveal, tint } from "./motion";
import { content, type Lang } from "../content";
import { useLang } from "./prefs";

/*
 * Access gate — stands in for the login page in this preview. In the real
 * platform, everything behind this point is invisible to visitors: one
 * login, and the account's role decides which zone opens.
 */

interface Dict {
  title: string;
  lead: string;
  noSelfReg: string;
  previewAs: string;
  partner: { title: string; desc: string; cta: string };
  union: { title: string; desc: string; cta: string };
  separation: string;
}

const dict: Record<Lang, Dict> = {
  en: {
    title: "Restricted access",
    lead: "Everything beyond this point is private. One login page — and the account's role decides what opens: partners see their portal, Union staff see the admin dashboard. Visitors see neither.",
    noSelfReg: "There is no self-registration: every account is created by the Federation.",
    previewAs: "PREVIEW AS",
    partner: {
      title: "Partner organization",
      desc: "The partner's own dashboard: enter aggregated data, attach documents, track review status. An organization sees only its own data.",
      cta: "Open the partner portal",
    },
    union: {
      title: "Union team · Observatory manager",
      desc: "The internal dashboard: the review queue and the ten-stage path — triage, review, confidence grading, and the publish decision.",
      cta: "Open the review screen",
    },
    separation: "Partners can never open the admin dashboard, and nothing partners submit appears publicly before the manager's approval — the separation is enforced by the system, not by trust.",
  },
  ar: {
    title: "دخول مقيّد",
    lead: "كل ما بعد هذه النقطة خاص. صفحة دخول واحدة — ودور الحساب يقرر ما الذي يُفتح: الشركاء يرون بوابتهم، وفريق الاتحاد يرى لوحة الإدارة. أما الزائر فلا يرى أيًّا منهما.",
    noSelfReg: "لا يوجد تسجيل ذاتي: كل حساب ينشئه الاتحاد بنفسه.",
    previewAs: "معاينة بدور",
    partner: {
      title: "مؤسسة شريكة",
      desc: "لوحة الشريك الخاصة: إدخال بيانات مجمّعة، إرفاق وثائق، ومتابعة حالة المراجعة. كل مؤسسة ترى بياناتها فقط.",
      cta: "افتح بوابة الشركاء",
    },
    union: {
      title: "فريق الاتحاد · مدير المرصد",
      desc: "اللوحة الداخلية: قائمة المراجعة ومسار المراحل العشر — الفرز والمراجعة وتصنيف الثقة وقرار النشر.",
      cta: "افتح شاشة المراجعة",
    },
    separation: "لا يستطيع الشريك فتح لوحة الإدارة أبدًا، ولا يظهر ما يقدّمه الشركاء للعامة قبل اعتماد المدير — الفصل يفرضه النظام، لا الثقة.",
  },
};

export default function AccessPage() {
  const { lang } = useLang();
  const t = dict[lang];
  const shared = content[lang];

  return (
    <PublicShell
      navTitle={shared.hero.kicker}
      navSubtitle={`OCF · ${t.title}`}
      backLabel={shared.hero.kicker}
      footerNote={t.separation}
      footerMark="ONE LOGIN · ROLE DECIDES THE ZONE"
    >
      <section className="mx-auto max-w-4xl px-5 py-14 text-center">
        <Reveal>
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: tint("var(--accent)", 10), border: `1px solid ${tint("var(--accent)", 33)}`, color: "var(--accent)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="10" width="16" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-foreground/65">{t.lead}</p>
          <p className="mt-3 text-sm text-foreground/45">{t.noSelfReg}</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="latin mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">{t.previewAs}</div>
          <div className="mt-4 grid gap-5 text-start sm:grid-cols-2">
            {/* partner */}
            <div className="flex flex-col rounded-xl border border-line bg-ink-900/40 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-ink-800/60 text-foreground/50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V8l7-5 7 5v13M10 21v-6h4v6M3 21h18" />
                </svg>
              </div>
              <h2 className="mt-4 font-semibold">{t.partner.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/55">{t.partner.desc}</p>
              <Link
                href="/designs/observatory/portal"
                transitionTypes={["nav-forward"]}
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition hover:brightness-110"
                style={{ background: tint("var(--state-prep)", 12), color: "var(--state-prep)", border: `1px solid ${tint("var(--state-prep)", 35)}` }}
              >
                {t.partner.cta}
                <svg className="rtl:rotate-180" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </div>
            {/* union */}
            <div className="flex flex-col rounded-xl border border-line bg-ink-900/40 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-ink-800/60 text-foreground/50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Zm-2.5 9 2 2 3.5-4" />
                </svg>
              </div>
              <h2 className="mt-4 font-semibold">{t.union.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/55">{t.union.desc}</p>
              <Link
                href="/designs/observatory/review"
                transitionTypes={["nav-forward"]}
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition hover:brightness-110"
                style={{ background: tint("var(--state-gap)", 12), color: "var(--state-gap)", border: `1px solid ${tint("var(--state-gap)", 35)}` }}
              >
                {t.union.cta}
                <svg className="rtl:rotate-180" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </PublicShell>
  );
}
