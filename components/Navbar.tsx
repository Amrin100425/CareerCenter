"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLang } from "@/lib/language-context";
import tr, { t } from "@/lib/translations";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();

  const navLinks = [
    { label: t(tr.nav.home, lang),       href: "/" },
    { label: t(tr.nav.activities, lang), href: "/activities" },
    { label: t(tr.nav.about, lang),      href: "/about" },
    { label: t(tr.nav.contact, lang),    href: "/contact" },
  ];

  return (
    <nav
      style={{
        background: "rgba(var(--bg-rgb), 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0, 245, 255, 0.15)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)"
      }}
      className="sticky top-0 z-50 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/logo.jpg"
                alt="USEA Career Center"
                width={44}
                height={44}
                className="rounded-lg relative z-10"
              />
              <div className="absolute inset-0 bg-[#00f5ff] blur-md opacity-0 group-hover:opacity-40 transition-opacity rounded-lg"></div>
            </div>
            <div className="hidden sm:block">
              <p className="font-display font-bold text-sm leading-tight text-[rgb(var(--fg-rgb))] tracking-wider">USEA</p>
              <p
                className="text-xs font-medium leading-tight tracking-widest uppercase"
                style={{ color: "#00f5ff", textShadow: "0 0 10px rgba(0,245,255,0.4)" }}
              >
                Career Center
              </p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[rgb(var(--muted-300-rgb))] hover:text-[#00f5ff] hover:drop-shadow-[0_0_8px_rgba(0,245,255,0.8)] px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 tracking-wide uppercase"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop right controls */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="text-[rgb(var(--muted-400-rgb))] hover:text-[#bf00ff] hover:drop-shadow-[0_0_8px_rgba(191,0,255,0.8)] text-sm font-medium transition-all tracking-wide uppercase"
            >
              {t(tr.nav.admin, lang)}
            </Link>
            <Link
              href="https://t.me/useacareercenter"
              className="neon-btn-solid px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
            >
              {t(tr.nav.findJob, lang)}
            </Link>
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="text-[rgb(var(--fg-rgb))] p-2 rounded-lg transition hover:text-[#00f5ff]"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          style={{
            background: "var(--card-hex)",
            borderTop: "1px solid rgba(0,245,255,0.1)",
          }}
          className="md:hidden shadow-[0_10px_30px_rgba(0,245,255,0.1)]"
        >
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-[rgb(var(--muted-300-rgb))] hover:text-[#00f5ff] hover:bg-[rgba(0,245,255,0.05)] px-4 py-3 rounded-lg text-sm font-medium transition uppercase tracking-widest"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="block text-[rgb(var(--muted-400-rgb))] hover:text-[#bf00ff] hover:bg-[rgba(191,0,255,0.05)] px-4 py-3 rounded-lg text-sm transition uppercase tracking-widest"
            >
              {t(tr.nav.adminPanel, lang)}
            </Link>
            <div className="pt-2">
              <Link
                href="https://t.me/useacareercenter"
                onClick={() => setOpen(false)}
                className="neon-btn-cyan block text-center px-4 py-3 rounded-xl text-sm font-semibold w-full"
              >
                {t(tr.nav.findJob, lang)}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
