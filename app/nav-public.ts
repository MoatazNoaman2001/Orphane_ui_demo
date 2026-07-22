import type { Lang } from "./content";

/*
 * The standard public header + footer, exactly as the Union specified:
 * الرئيسية | استكشاف البيانات ▼ | التقارير | المنهجية | عن المرصد ▼ | تواصل معنا | دخول الشركاء
 * Privacy and data-use/citation live in the footer, not the header.
 */

export interface PubNavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const P = "/designs/observatory";

export function publicNav(lang: Lang): PubNavItem[] {
  const ar = lang === "ar";
  return [
    { label: ar ? "الرئيسية" : "Home", href: P },
    {
      label: ar ? "استكشاف البيانات" : "Explore data",
      children: [
        { label: ar ? "الدول والخريطة" : "Countries & map", href: `${P}/countries` },
        { label: ar ? "المؤشرات" : "Indicators", href: `${P}/indicators` },
        { label: ar ? "مكتبة المصادر" : "Sources library", href: `${P}/sources` },
      ],
    },
    { label: ar ? "التقارير" : "Reports", href: `${P}/reports` },
    { label: ar ? "المنهجية" : "Methodology", href: `${P}/methodology` },
    {
      label: ar ? "عن المرصد" : "About",
      children: [
        { label: ar ? "عن المرصد" : "About the Observatory", href: `${P}/about` },
        { label: ar ? "دليل المؤسسات" : "Organizations directory", href: `${P}/organizations` },
      ],
    },
    { label: ar ? "تواصل معنا" : "Contact us", href: `${P}/contact` },
  ];
}

export function portalCta(lang: Lang) {
  return { href: `${P}/access`, label: lang === "ar" ? "دخول الشركاء" : "Partner login" };
}

export interface FooterDict {
  mission: string;
  explore: { title: string; links: { label: string; href: string }[] };
  about: { title: string; links: { label: string; href: string }[] };
  legal: { title: string; links: { label: string; href: string }[] };
  rights: string;
}

export function publicFooter(lang: Lang): FooterDict {
  const ar = lang === "ar";
  return {
    mission: ar
      ? "مرصد بيانات الأيتام — بيانات موثّقة غير شخصية عن الأيتام حول العالم، يديره اتحاد رعاية الأيتام."
      : "The Orphan Data Observatory — verified, non-personal data about orphans worldwide, operated by the Orphans Care Federation.",
    explore: {
      title: ar ? "استكشاف البيانات" : "Explore data",
      links: [
        { label: ar ? "الدول والخريطة" : "Countries & map", href: `${P}/countries` },
        { label: ar ? "المؤشرات" : "Indicators", href: `${P}/indicators` },
        { label: ar ? "مكتبة المصادر" : "Sources library", href: `${P}/sources` },
        { label: ar ? "التقارير" : "Reports", href: `${P}/reports` },
      ],
    },
    about: {
      title: ar ? "المرصد" : "The Observatory",
      links: [
        { label: ar ? "عن المرصد" : "About", href: `${P}/about` },
        { label: ar ? "المنهجية" : "Methodology", href: `${P}/methodology` },
        { label: ar ? "دليل المؤسسات" : "Organizations", href: `${P}/organizations` },
        { label: ar ? "تواصل معنا" : "Contact us", href: `${P}/contact` },
      ],
    },
    legal: {
      title: ar ? "الاستخدام والخصوصية" : "Use & privacy",
      links: [
        { label: ar ? "سياسة الخصوصية" : "Privacy policy", href: `${P}/privacy` },
        { label: ar ? "استخدام البيانات والاستشهاد" : "Data use & citation", href: `${P}/data-use` },
        { label: ar ? "دخول الشركاء" : "Partner login", href: `${P}/access` },
      ],
    },
    rights: ar ? "اتحاد رعاية الأيتام" : "Orphans Care Federation",
  };
}
