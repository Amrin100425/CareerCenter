"use client";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Globe, Play } from "lucide-react";
import { useLang } from "@/lib/language-context";
import tr, { t } from "@/lib/translations";

const jobCatKeys = ["Hospitality", "Tourism", "Technology", "Finance", "Marketing", "Education", "Healthcare", "Retail"] as const;

export default function Footer() {
  const { lang } = useLang();

  const quickLinks = [
    { label: t(tr.footer.browseJobs,        lang), href: "/jobs" },
    { label: t(tr.footer.activitiesEvents,  lang), href: "/activities" },
    { label: t(tr.footer.aboutUs,           lang), href: "/about" },
    { label: t(tr.footer.contact,           lang), href: "/contact" },
    { label: t(tr.footer.adminPanel,        lang), href: "/admin" },
  ];

  return (
    <footer style={{ background: "var(--bg-hex)", borderTop: "1px solid rgba(0, 245, 255, 0.1)" }} className="text-[rgb(var(--muted-300-rgb))] relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] rounded-full pointer-events-none opacity-20" style={{ background: "radial-gradient(ellipse, #00f5ff 0%, transparent 70%)", filter: "blur(50px)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="relative">
                <Image
                  src="/logo.jpg"
                  alt="USEA"
                  width={48}
                  height={48}
                  className="rounded-lg relative z-10"
                />
                <div className="absolute inset-0 bg-[#00f5ff] blur-md opacity-20 group-hover:opacity-60 transition-opacity rounded-lg"></div>
              </div>
              <div>
                <p className="text-[rgb(var(--fg-rgb))] font-display font-bold text-base tracking-wider">USEA</p>
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#00f5ff", textShadow: "0 0 10px rgba(0,245,255,0.4)" }}>
                  Career Center
                </p>
              </div>
            </div>
            <p className="text-sm text-[rgb(var(--muted-400-rgb))] leading-relaxed font-light">
              {t(tr.footer.tagline, lang)}
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all border border-[rgba(0,245,255,0.2)] hover:border-[#00f5ff] hover:bg-[rgba(0,245,255,0.1)] hover:text-[#00f5ff] hover:shadow-[0_0_15px_rgba(0,245,255,0.3)]"
                style={{ background: "rgba(var(--card-rgb),0.5)" }}
              >
                <Globe size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all border border-[rgba(191,0,255,0.2)] hover:border-[#bf00ff] hover:bg-[rgba(191,0,255,0.1)] hover:text-[#bf00ff] hover:shadow-[0_0_15px_rgba(191,0,255,0.3)]"
                style={{ background: "rgba(var(--card-rgb),0.5)" }}
              >
                <Play size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[rgb(var(--fg-rgb))] font-display font-bold text-sm mb-6 uppercase tracking-[0.2em]">
              {t(tr.footer.quickLinks, lang)}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[rgb(var(--muted-400-rgb))] hover:text-[#00f5ff] hover:drop-shadow-[0_0_5px_rgba(0,245,255,0.6)] transition-all flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[rgba(0,245,255,0.3)] group-hover:bg-[#00f5ff] group-hover:shadow-[0_0_5px_#00f5ff] transition-all"></span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[rgb(var(--fg-rgb))] font-display font-bold text-sm mb-6 uppercase tracking-[0.2em]">
              {t(tr.footer.jobCategories, lang)}
            </h4>
            <ul className="space-y-3">
              {jobCatKeys.map((c) => (
                <li key={c}>
                  <Link
                    href={`/jobs?category=${c}`}
                    className="text-sm text-[rgb(var(--muted-400-rgb))] hover:text-[#bf00ff] hover:drop-shadow-[0_0_5px_rgba(191,0,255,0.6)] transition-all flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[rgba(191,0,255,0.3)] group-hover:bg-[#bf00ff] group-hover:shadow-[0_0_5px_#bf00ff] transition-all"></span>
                    {t(tr.footer.jobCats[c], lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[rgb(var(--fg-rgb))] font-display font-bold text-sm mb-6 uppercase tracking-[0.2em]">
              {t(tr.footer.contactUs, lang)}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-[rgba(0,245,255,0.05)] border border-[rgba(0,245,255,0.1)] group-hover:border-[#00f5ff] group-hover:shadow-[0_0_10px_rgba(0,245,255,0.2)] transition-all">
                  <MapPin size={16} className="text-[#00f5ff]" />
                </div>
                <p className="text-sm text-[rgb(var(--muted-400-rgb))] font-light mt-1">
                  7 Makara St, Sala Kamroeuk
                  <br />
                  Siem Reap, Cambodia
                </p>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-[rgba(191,0,255,0.05)] border border-[rgba(191,0,255,0.1)] group-hover:border-[#bf00ff] group-hover:shadow-[0_0_10px_rgba(191,0,255,0.2)] transition-all">
                  <Phone size={16} className="text-[#bf00ff]" />
                </div>
                <p className="text-sm text-[rgb(var(--muted-400-rgb))] font-light">
                  +855 67 536 769
                  <br />
                  +855 16 736 214
                </p>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-[rgba(0,255,136,0.05)] border border-[rgba(0,255,136,0.1)] group-hover:border-[#00ff88] group-hover:shadow-[0_0_10px_rgba(0,255,136,0.2)] transition-all">
                  <Mail size={16} className="text-[#00ff88]" />
                </div>
                <p className="text-sm text-[rgb(var(--muted-400-rgb))] font-light">
                  info@useacareercenter.edu.kh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ borderTop: "1px solid rgba(var(--fg-rgb),0.05)" }}
        className="py-6 relative z-10 bg-[rgba(var(--bg-rgb),0.2)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[rgb(var(--muted-500-rgb))] uppercase tracking-wider font-semibold">
            {t(tr.footer.copyright, lang)}
          </p>
          <p className="text-xs text-[#00f5ff] uppercase tracking-widest opacity-60">
            {t(tr.footer.slogan, lang)}
          </p>
        </div>
      </div>
    </footer>
  );
}
