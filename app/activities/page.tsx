"use client";
import { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Users, ChevronRight, Search } from "lucide-react";
import { defaultActivities } from "@/lib/store";
import { useLang } from "@/lib/language-context";
import tr, { t } from "@/lib/translations";

const activityTypeKeys = ["All", "Career Fair", "Workshop", "Seminar", "Training", "Networking"] as const;

const typeColors: Record<string, { bg: string; color: string; border: string; shadow: string }> = {
  "Career Fair": { bg: "rgba(255,0,128,0.1)", color: "#ff0080", border: "rgba(255,0,128,0.3)", shadow: "rgba(255,0,128,0.2)" },
  Workshop:      { bg: "rgba(0,245,255,0.1)",  color: "#00f5ff", border: "rgba(0,245,255,0.3)",  shadow: "rgba(0,245,255,0.2)" },
  Seminar:       { bg: "rgba(191,0,255,0.1)",  color: "#bf00ff", border: "rgba(191,0,255,0.3)",  shadow: "rgba(191,0,255,0.2)" },
  Training:      { bg: "rgba(0,255,136,0.1)",  color: "#00ff88", border: "rgba(0,255,136,0.3)",  shadow: "rgba(0,255,136,0.2)" },
  Networking:    { bg: "rgba(255,215,0,0.1)",  color: "#ffd700", border: "rgba(255,215,0,0.3)",  shadow: "rgba(255,215,0,0.2)" },
};

export default function ActivitiesPage() {
  const { lang } = useLang();
  const [selectedType, setSelectedType] = useState("All");
  const [search, setSearch] = useState("");

  const activities = defaultActivities.filter((a) => {
    const matchType = selectedType === "All" || a.type === selectedType;
    const matchSearch =
      !search || a.title.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  // Translate activity type pill label
  const typeLabel = (key: string) => {
    if (key === "All") return t(tr.activities.all, lang);
    return t(tr.activities.activityTypes[key as keyof typeof tr.activities.activityTypes], lang);
  };

  return (
    <div className="min-h-screen neon-bg relative overflow-hidden">
      {/* Ambient Light */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] rounded-full pointer-events-none opacity-20" style={{ background: "radial-gradient(ellipse, #bf00ff 0%, transparent 70%)", filter: "blur(70px)" }} />

      <div
        className="py-16 px-4 relative z-10"
        style={{
          background: "rgba(var(--bg-rgb), 0.4)", borderBottom: "1px solid rgba(191,0,255,0.1)"
        }}
      >
        <div className="max-w-7xl mx-auto text-center sm:text-left">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-2"
            style={{ color: "#bf00ff", textShadow: "0 0 10px rgba(191,0,255,0.4)" }}
          >
            {t(tr.activities.learnConnect, lang)}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[rgb(var(--fg-rgb))] mb-4 tracking-wider">
            {t(tr.activities.pageTitle, lang)}
          </h1>
          <p className="mb-8 font-light text-[rgb(var(--muted-400-rgb))]">
            {t(tr.activities.pageSubtitle, lang)}
          </p>
          <div
            className="flex items-center gap-3 rounded-2xl px-4 py-3 max-w-md bg-[var(--card-hex)]/80 backdrop-blur-md border border-[rgba(191,0,255,0.2)] shadow-[0_0_20px_rgba(191,0,255,0.1)] focus-within:shadow-[0_0_25px_rgba(191,0,255,0.2)] focus-within:border-[#bf00ff] transition-all"
          >
            <Search size={18} className="text-[#bf00ff]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t(tr.activities.search, lang)}
              className="bg-transparent text-sm outline-none flex-1 text-[rgb(var(--fg-rgb))] placeholder-[rgb(var(--muted-500-rgb))]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {activityTypeKeys.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-widest transition-all duration-300 ${
                selectedType === type
                  ? "bg-[rgba(191,0,255,0.1)] text-[#bf00ff] border border-[rgba(191,0,255,0.3)] shadow-[0_0_15px_rgba(191,0,255,0.2)]"
                  : "text-[rgb(var(--muted-400-rgb))] hover:text-[rgb(var(--fg-rgb))] hover:bg-[rgba(var(--fg-rgb),0.05)] border border-[rgba(var(--fg-rgb),0.05)]"
              }`}
            >
              {typeLabel(type)}
            </button>
          ))}
        </div>

        {activities.length === 0 ? (
          <div className="text-center py-24 bg-[var(--card-hex)]/40 border border-[rgba(191,0,255,0.1)] rounded-2xl backdrop-blur-sm">
            <div className="text-5xl mb-4 opacity-50">📅</div>
            <h3 className="font-display font-bold text-xl mb-2 text-[rgb(var(--fg-rgb))] tracking-wider">
              {t(tr.activities.noEvents, lang)}
            </h3>
            <p className="text-[rgb(var(--muted-500-rgb))] text-sm">
              {t(tr.activities.checkBack, lang)}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {activities.map((act) => {
              const spotsLeft = act.capacity - act.registered;
              const tc = typeColors[act.type] || {
                bg: "rgba(var(--fg-rgb),0.05)",
                color: "#e2e8f0",
                border: "rgba(var(--fg-rgb),0.1)",
                shadow: "transparent",
              };
              return (
                <div
                  key={act.id}
                  className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl overflow-hidden border border-[rgba(0,245,255,0.1)] hover:border-[rgba(191,0,255,0.3)] group transition-all duration-300 hover:shadow-[0_0_25px_rgba(191,0,255,0.15)] relative"
                >
                  {/* Card Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[rgba(191,0,255,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                  <div
                    className="p-6 flex items-center justify-between border-b border-[rgba(var(--fg-rgb),0.05)] relative z-10"
                    style={{ background: "rgba(var(--bg-rgb), 0.6)" }}
                  >
                    <div className="text-5xl drop-shadow-md">{act.image}</div>
                    <div className="text-right">
                      <p
                        className="font-display font-bold text-xs tracking-widest uppercase mb-1"
                        style={{ color: "#00f5ff", textShadow: "0 0 8px rgba(0,245,255,0.5)" }}
                      >
                        {new Date(act.date).toLocaleString("en-US", {
                          month: "long",
                        })}
                      </p>
                      <p className="font-display text-[rgb(var(--fg-rgb))] font-bold text-4xl tracking-wider">
                        {new Date(act.date).getDate()}
                      </p>
                      <p
                        className="text-xs font-semibold tracking-widest mt-1"
                        style={{ color: "rgba(var(--fg-rgb),0.4)" }}
                      >
                        {new Date(act.date).getFullYear()}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 relative z-10">
                    <span
                      className="text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-widest"
                      style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}`, boxShadow: `0 0 10px ${tc.shadow}` }}
                    >
                      {typeLabel(act.type)}
                    </span>
                    <h3
                      className="font-display font-bold text-lg mt-4 mb-3 text-[rgb(var(--fg-rgb))] group-hover:text-[#bf00ff] transition-colors tracking-wide leading-snug"
                    >
                      {act.title}
                    </h3>
                    <div className="space-y-2 mb-5">
                      <p className="text-xs text-[rgb(var(--muted-400-rgb))] flex items-center gap-2 font-medium tracking-wide">
                        <Calendar size={14} className="text-[#00f5ff]" />{" "}
                        {act.date} <span className="opacity-50">|</span> {act.time}
                      </p>
                      <p className="text-xs text-[rgb(var(--muted-400-rgb))] flex items-center gap-2 font-medium tracking-wide">
                        <MapPin size={14} className="text-[#ff0080]" />{" "}
                        {act.location}
                      </p>
                    </div>
                    <p className="text-[rgb(var(--muted-400-rgb))] text-sm leading-relaxed line-clamp-2 mb-6 font-light">
                      {act.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5">
                        <Users size={12} style={{ color: "rgba(0,245,255,0.6)" }} />
                        <span className="text-xs" style={{ color: "rgba(var(--fg-rgb),0.45)" }}>
                          {act.registered}/{act.capacity} {t(tr.activities.registered, lang)}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/activities/${act.id}`}
                      className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
                        spotsLeft <= 0
                          ? "bg-[#1f2937] text-[rgb(var(--muted-500-rgb))] cursor-not-allowed border border-transparent"
                          : "border border-[rgba(191,0,255,0.5)] text-[#bf00ff] hover:bg-[rgba(191,0,255,0.1)] hover:shadow-[0_0_15px_rgba(191,0,255,0.4)]"
                      }`}
                      style={spotsLeft <= 0 ? { pointerEvents: "none" } : {}}
                    >
                      {spotsLeft <= 0 ? (
                        t(tr.activities.fullyBooked, lang)
                      ) : (
                        <>
                          {t(tr.activities.viewDetails, lang)}
                          <ChevronRight size={14} />
                        </>
                      )}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
