"use client";
import Image from "next/image";
import Link from "next/link";
import { Target, Eye, Heart, ArrowRight, MapPin } from "lucide-react";
import { defaultContent } from "@/lib/store";
import { useLang } from "@/lib/language-context";
import tr, { t } from "@/lib/translations";

export default function AboutPage() {
  const { lang } = useLang();
  const content = defaultContent;

  const team = [
    { name: "Ne Sokna",    role: t(tr.about.teamRoles.director,    lang), emoji: "👨‍💼" },
    { name: "Jane Doe",    role: t(tr.about.teamRoles.counselor,   lang), emoji: "👩‍🏫" },
    { name: "John Doe",    role: t(tr.about.teamRoles.relations,   lang), emoji: "👨‍💻" },
    { name: "Jackie Chan", role: t(tr.about.teamRoles.coordinator, lang), emoji: "👩‍🎓" },
  ];

  const statLabelMap: Record<string, { en: string; km: string }> = {
    "Jobs Posted":         tr.stats.jobsPosted,
    "Employers Partnered": tr.stats.employersPartner,
    "Job Seekers Placed":  tr.stats.seekersPlaced,
    "Training Programs":   tr.stats.trainingPrograms,
  };

  const cards = [
    {
      icon: <Target size={32} style={{ color: "#ff0080" }} />,
      title: t(tr.about.mission, lang),
      border: "rgba(255,0,128,0.3)",
      glow: "rgba(255,0,128,0.1)",
      text: t(tr.about.missionText, lang),
    },
    {
      icon: <Eye size={32} style={{ color: "#00f5ff" }} />,
      title: t(tr.about.vision, lang),
      border: "rgba(0,245,255,0.3)",
      glow: "rgba(0,245,255,0.1)",
      text: t(tr.about.visionText, lang),
    },
    {
      icon: <Heart size={32} style={{ color: "#bf00ff" }} />,
      title: t(tr.about.values, lang),
      border: "rgba(191,0,255,0.3)",
      glow: "rgba(191,0,255,0.1)",
      text: t(tr.about.valuesText, lang),
    },
  ];

  return (
    <div className="min-h-screen neon-bg relative overflow-hidden">
      {/* Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none opacity-20" style={{ background: "radial-gradient(ellipse, #ff0000ff 0%, transparent 70%)", filter: "blur(70px)" }} />

      <div
        className="py-20 px-4 text-center relative z-10"
        style={{
          background: "rgba(var(--bg-rgb), 0.4)", borderBottom: "1px solid rgba(0,255,136,0.1)"
        }}
      >
        <div className="relative inline-block mb-8 group">
          <div className="absolute inset-0 bg-[#00ff88] rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <Image
            src="/logo.jpg"
            alt="USEA"
            width={90}
            height={90}
            className="rounded-2xl mx-auto relative z-10 border-2 border-[rgba(255, 0, 0, 0.5)] shadow-[0_0_20px_rgba(0,255,136,0.3)]"
          />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[rgb(var(--fg-rgb))] mb-6 tracking-wider">
          {t(tr.about.pageTitle, lang)}
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto leading-relaxed font-light text-[rgb(var(--muted-400-rgb))]"
        >
          {content.aboutText}
        </p>
      </div>

      <div className="border-b border-[rgba(var(--fg-rgb),0.05)] bg-[rgba(var(--bg-rgb),0.2)] relative z-10">
        <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {content.stats.map((s, i) => (
            <div key={i} className="group">
              <p
                className="font-display text-4xl font-bold tracking-widest mb-2 transition-all"
                style={{ color: i % 2 === 0 ? "#00f5ff" : "#bf00ff", textShadow: i % 2 === 0 ? "0 0 15px rgba(0,245,255,0.4)" : "0 0 15px rgba(191,0,255,0.4)" }}
              >
                {s.value}
              </p>
              <p className="text-[rgb(var(--muted-400-rgb))] text-xs font-semibold uppercase tracking-widest">
                {statLabelMap[s.label] ? t(statLabelMap[s.label], lang) : s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {cards.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 bg-[var(--card-hex)]/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden"
              style={{ border: `1px solid ${item.border}`, boxShadow: `0 8px 32px ${item.glow}` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${item.glow} 0%, transparent 70%)` }}></div>
              <div className="mb-6 relative z-10">{item.icon}</div>
              <h3
                className="font-display font-bold text-xl mb-4 text-[rgb(var(--fg-rgb))] tracking-wider"
              >
                {item.title}
              </h3>
              <p className="text-[rgb(var(--muted-400-rgb))] text-sm leading-relaxed font-light relative z-10">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h2
            className="font-display text-3xl font-bold text-center mb-12 text-[rgb(var(--fg-rgb))] tracking-widest"
          >
            {t(tr.about.meetTeam, lang)}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl p-8 text-center border border-[rgba(var(--fg-rgb),0.05)] hover:border-[rgba(0,245,255,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{member.emoji}</div>
                <h3 className="font-display font-bold text-base text-[rgb(var(--fg-rgb))] tracking-wide mb-1 group-hover:text-[#00f5ff] transition-colors">
                  {member.name}
                </h3>
                <p className="text-[rgb(var(--muted-500-rgb))] text-xs uppercase tracking-widest font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="bg-[rgba(var(--bg-rgb),0.8)] backdrop-blur-md rounded-3xl p-10 text-center border border-[rgba(0,255,136,0.3)] shadow-[0_0_40px_rgba(0,255,136,0.15)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,255,136,0.05)] to-transparent pointer-events-none"></div>

          <MapPin
            size={40}
            className="mx-auto mb-6 relative z-10"
            style={{ color: "#00ff88" }}
          />
          <h3 className="font-display font-bold text-2xl mb-4 text-[rgb(var(--fg-rgb))] tracking-wider relative z-10">
            {t(tr.about.findUs, lang)}
          </h3>

          <p className="text-[rgb(var(--muted-300-rgb))] mb-6 font-light max-w-lg mx-auto relative z-10">{content.address}</p>

          <p className="text-[rgb(var(--muted-400-rgb))] text-sm font-medium tracking-wide mb-8 relative z-10 border border-[rgba(var(--fg-rgb),0.1)] inline-block px-6 py-3 rounded-full bg-[rgba(var(--bg-rgb),0.2)]">
            {t(tr.about.openHours, lang)}
          </p>

          <div className="relative z-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[var(--bg-hex)] bg-[#00ff88] hover:bg-[#00cc6a] px-8 py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-[0_0_15px_rgba(0,255,136,0.4)] hover:shadow-[0_0_25px_rgba(0,255,136,0.6)]"
            >
              {t(tr.about.contactUs, lang)} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
