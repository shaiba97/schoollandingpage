"use client";

import * as React from "react";
import { MESSAGES, type LandingLocale } from "@/lib/i18n/landing";

type LandingContextValue = {
  locale: LandingLocale;
  setLocale: (next: LandingLocale) => void;
  dir: "ltr" | "rtl";
  t: (typeof MESSAGES)[LandingLocale];
};

const LandingContext = React.createContext<LandingContextValue | null>(null);

// The page is statically prerendered in English, so the saved preference can
// only be restored after hydration; writing it back happens on every switch.
const LOCALE_STORAGE_KEY = "madar-locale";

export function LandingLocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<LandingLocale>("en");

  React.useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (stored === "en" || stored === "ar") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore saved preference after hydration
      setLocaleState(stored);
    }
  }, []);

  React.useEffect(() => {
    // Keeps the actual document direction/lang in step with the chosen
    // locale so assistive tech and native scrollbars behave correctly.
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = React.useCallback((next: LandingLocale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // Storage may be unavailable (private mode); the session choice still sticks.
    }
  }, []);

  const value = React.useMemo<LandingContextValue>(
    () => ({
      locale,
      setLocale,
      dir: locale === "ar" ? "rtl" : "ltr",
      t: MESSAGES[locale],
    }),
    [locale, setLocale],
  );
  return <LandingContext.Provider value={value}>{children}</LandingContext.Provider>;
}

export function useLandingLocale(): LandingContextValue {
  const ctx = React.useContext(LandingContext);
  if (!ctx) {
    throw new Error("useLandingLocale must be used within LandingLocaleProvider");
  }
  return ctx;
}
