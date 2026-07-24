"use client";
import { useEffect } from "react";
import { useLang } from "@/lib/language-context";

/**
 * FontApplier — renders nothing, just swaps the CSS custom property
 * --active-font on <html> whenever the language changes.
 * Must be rendered inside <LanguageProvider>.
 */
export default function FontApplier() {
  const { lang } = useLang();

  useEffect(() => {
    const root = document.documentElement;
    if (lang === "km") {
      root.style.setProperty(
        "--active-font",
        "'Kantumruy Pro', sans-serif"
      );
      root.setAttribute("lang", "km");
    } else {
      root.style.setProperty(
        "--active-font",
        "var(--font-inter), 'Inter', sans-serif"
      );
      root.setAttribute("lang", "en");
    }
  }, [lang]);

  return null;
}
