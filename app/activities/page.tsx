"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users, ChevronRight, Search } from "lucide-react";
import { defaultActivities } from "@/lib/store";
import { useLang } from "@/lib/language-context";
import tr, { t } from "@/lib/translations";

const activityTypeKeys = ["All", "Career Improvement", "Workshop", "Events", "Training", "Networking"] as const;

const typeColors: Record<string, { bg: string; color: string; border: string; shadow: string }> = {
  "Career Improvement": { bg: "rgba(255,0,128,0.1)", color: "#ff0080", border: "rgba(255,0,128,0.3)", shadow: "rgba(255,0,128,0.2)" },
  Workshop: { bg: "rgba(0,245,255,0.1)", color: "#00f5ff", border: "rgba(0,245,255,0.3)", shadow: "rgba(0,245,255,0.2)" },
  Events: { bg: "rgba(191,0,255,0.1)", color: "#bf00ff", border: "rgba(191,0,255,0.3)", shadow: "rgba(191,0,255,0.2)" },
  Training: { bg: "rgba(0,255,136,0.1)", color: "#00ff88", border: "rgba(0,255,136,0.3)", shadow: "rgba(0,255,136,0.2)" },
  Networking: { bg: "rgba(255,215,0,0.1)", color: "#ffd700", border: "rgba(255,215,0,0.3)", shadow: "rgba(255,215,0,0.2)" },
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
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-widest transition-all duration-300 ${selectedType === type
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
          <div className="grid md:grid-cols-2 gap-6">
            {activities.map((act) => {
              const spotsLeft = act.capacity - act.registered;
              return (
                <Link
                  href={`/activities/${act.id}`}
                  key={act.id}
                  className="neon-card rounded-2xl overflow-hidden flex flex-col sm:flex-row items-stretch cursor-pointer hover:shadow-[0_0_25px_rgba(191,0,255,0.15)] hover:border-[rgba(191,0,255,0.3)] transition-all duration-300 group border border-[rgba(0,245,255,0.1)] bg-[var(--card-hex)]/60 backdrop-blur-md relative"
                >
                  {/* Left Side: Image */}
                  <div className="relative sm:w-52 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                    {typeof act.image === "string" ? (
                      <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-[rgba(191,0,255,0.1)] to-[rgba(0,245,255,0.1)]">
                        {act.image}
                      </div>
                    ) : (
                      <Image
                        src={act.image}
                        alt={act.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to right, transparent, rgba(var(--card-rgb),0.3))" }}
                    />
                  </div>

                  {/* Right Side: Content */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Subtitle / Activity Type */}
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest mb-2 block"
                        style={{ color: "#00f5ff" }}
                      >
                        {typeLabel(act.type)}
                      </span>

                      {/* Title */}
                      <h3 className="font-display font-bold text-base text-[rgb(var(--fg-rgb))] group-hover:text-[#bf00ff] transition-colors uppercase tracking-wider mb-2 leading-snug">
                        {act.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[rgb(var(--muted-400-rgb))] text-xs leading-relaxed line-clamp-3 mb-4 font-light">
                        {act.description}
                      </p>
                    </div>

                    {/* Metadata footer */}
                    <div className="space-y-1.5 pt-2 border-t border-[rgba(var(--fg-rgb),0.05)]">
                      <div className="flex items-center gap-4 text-[10px] text-[rgb(var(--muted-500-rgb))]">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-[#00f5ff]" />
                          {act.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-[#ff0080]" />
                          {act.location.split(",")[0]}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] pt-1">
                        <span
                          className="font-bold uppercase tracking-widest text-[9px]"
                          style={{ color: spotsLeft <= 0 ? "rgba(var(--fg-rgb),0.4)" : "#bf00ff" }}
                        >
                          {spotsLeft <= 0 ? t(tr.activities.fullyBooked, lang) : t(tr.activities.viewDetails, lang) + " →"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
