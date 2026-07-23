"use client";
import { useLang } from "@/lib/language-context";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <button
      onClick={toggleLang}
      title={lang === "en" ? "Switch to Khmer" : "Switch to English"}
      className="relative flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden"
      style={{
        background: "rgba(0,245,255,0.07)",
        border: "1px solid rgba(0,245,255,0.25)",
        color: "#00f5ff",
        textShadow: "0 0 8px rgba(0,245,255,0.5)",
      }}
    >
      {/* Animated sliding indicator */}
      <span
        className="absolute inset-0 rounded-lg transition-all duration-300"
        style={{
          background:
            lang === "km"
              ? "rgba(191,0,255,0.12)"
              : "rgba(0,245,255,0.07)",
          border:
            lang === "km"
              ? "1px solid rgba(191,0,255,0.35)"
              : "1px solid rgba(0,245,255,0.25)",
        }}
      />
      {/* Flag + Label */}
      <span className="relative z-10 flex items-center gap-1.5">
        <span className="text-base leading-none">
          {lang === "en" ? "🇰🇭" : "🇬🇧"}
        </span>
        <span
          style={{
            color: lang === "km" ? "#bf00ff" : "#00f5ff",
            textShadow:
              lang === "km"
                ? "0 0 8px rgba(191,0,255,0.6)"
                : "0 0 8px rgba(0,245,255,0.5)",
          }}
        >
          {lang === "en" ? "ខ្មែរ" : "EN"}
        </span>
      </span>
    </button>
  );
}
