"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all border border-[rgba(0,245,255,0.2)] hover:border-[#00f5ff] hover:bg-[rgba(0,245,255,0.1)] hover:shadow-[0_0_15px_rgba(0,245,255,0.25)] ${className}`}
      style={{ background: "rgba(var(--card-rgb), 0.5)" }}
    >
      {isDark ? (
        <Sun size={17} className="text-[#00f5ff]" />
      ) : (
        <Moon size={17} className="text-[#bf00ff]" />
      )}
    </button>
  );
}
