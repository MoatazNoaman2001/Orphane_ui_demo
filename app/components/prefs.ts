"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import type { Lang } from "../content";

/*
 * Theme + language live on <html> (data-theme / lang / dir), stamped before
 * first paint by the inline script in layout.tsx. The DOM attribute is the
 * single source of truth; every page reads and writes it through these hooks,
 * so preferences survive client-side navigation between demo pages.
 */

function subscribeToHtmlAttr(attr: string) {
  return (onChange: () => void) => {
    const mo = new MutationObserver(onChange);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: [attr] });
    return () => mo.disconnect();
  };
}

const subscribeTheme = subscribeToHtmlAttr("data-theme");
const subscribeLang = subscribeToHtmlAttr("lang");

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    () => (document.documentElement.dataset.theme === "light" ? "light" : "dark"),
    () => "dark" as const
  );

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("odo-theme", next);
    } catch {}
  }, [theme]);

  return { theme, toggleTheme } as const;
}

export function useLang() {
  const lang = useSyncExternalStore(
    subscribeLang,
    () => (document.documentElement.lang === "ar" ? "ar" : "en") as Lang,
    () => "en" as Lang
  );

  const setLang = useCallback((next: Lang) => {
    document.documentElement.lang = next;
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("odo-lang", next);
    } catch {}
  }, []);

  // Ensure dir always matches lang (e.g. after hydration from the pre-paint script).
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return { lang, setLang } as const;
}
