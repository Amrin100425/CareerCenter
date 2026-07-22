"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  // { label: "Jobs", href: "/jobs" },
  { label: "Activities", href: "/activities" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

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

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/admin"
              className="text-[rgb(var(--muted-400-rgb))] hover:text-[#bf00ff] hover:drop-shadow-[0_0_8px_rgba(191,0,255,0.8)] text-sm font-medium transition-all tracking-wide uppercase"
            >
              Admin
            </Link>
            <Link
              href="https://t.me/useacareercenter"
              className="neon-btn-solid px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
            >
              Find a Job
            </Link>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
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
              Admin Panel
            </Link>
            <div className="pt-2">
              <Link
                href="/jobs"
                onClick={() => setOpen(false)}
                className="neon-btn-cyan block text-center px-4 py-3 rounded-xl text-sm font-semibold w-full"
              >
                Find a Job
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
