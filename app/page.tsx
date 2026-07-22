"use client";
import Image from "next/image";
import bg from "@/photos/Careercenter.jpg";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  MapPin,
  Users,
  Zap,
  Star,
  ChevronRight,
  Briefcase,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { defaultJobs, defaultActivities, defaultContent, defaultPhotos } from "@/lib/store";

// ── Scroll Reveal Hook ──
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);
}

export default function HomePage() {
  useScrollReveal();

  const featuredJobs = defaultJobs.filter((j) => j.featured);
  const featuredActivities = defaultActivities.filter((a) => a.featured);
  const featuredPhotos = defaultPhotos.filter((p) => p.featured);
  const content = defaultContent;

  const categories = [
    { name: "Hospitality", icon: "🏨", count: 45, color: "#00f5ff" },
    { name: "Tourism", icon: "🗺️", count: 38, color: "#bf00ff" },
    { name: "Technology", icon: "💻", count: 22, color: "#00ff88" },
    { name: "Finance", icon: "💰", count: 19, color: "#ffd700" },
    { name: "Marketing", icon: "📣", count: 17, color: "#ff0080" },
    { name: "Education", icon: "📚", count: 14, color: "#00f5ff" },
    { name: "Healthcare", icon: "⚕️", count: 11, color: "#bf00ff" },
    { name: "Retail", icon: "🛍️", count: 9, color: "#00ff88" },
  ];

  return (
    <div className="relative">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image with neon overlay */}
        <div className="absolute inset-0">
          <Image src={bg} alt="" fill className="object-cover opacity-20" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(var(--bg-rgb),0.85) 0%, rgba(0,245,255,0.05) 50%, rgba(var(--bg-rgb),0.9) 100%)",
            }}
          />
          {/* Neon grid overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,245,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.06) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Floating orbs */}
        <div
          className="absolute top-20 right-10 w-80 h-80 rounded-full pointer-events-none float-anim"
          style={{
            background: "radial-gradient(ellipse, rgba(0, 245, 255, 0.12) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-60 h-60 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(191, 0, 255, 0.12) 0%, transparent 70%)",
            filter: "blur(20px)",
            animation: "floatY 5s ease-in-out infinite 1s",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Location badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 reveal"
            style={{
              background: "rgba(0, 245, 255, 0.08)",
              border: "1px solid rgba(0, 245, 255, 0.3)",
            }}
          >
            <MapPin size={12} style={{ color: "#00f5ff" }} />
            <span className="text-xs font-medium tracking-wider" style={{ color: "rgba(0,245,255,0.8)" }}>
              UNIVERSITY OF SOUTH-EAST ASIA · SIEM REAP, CAMBODIA
            </span>
          </div>

          {/* Main heading */}
          <div className="reveal delay-100">
            <h1
              className="font-display text-5xl sm:text-7xl font-black leading-none mb-6"
              style={{ letterSpacing: "-0.02em" }}
            >
              <span className="block text-[rgb(var(--fg-rgb))] neon-pulse">YOUR CAREER</span>
              <span className="block gradient-text neon-pulse">STARTS HERE</span>
            </h1>
          </div>

          <p
            className="text-lg leading-relaxed mb-10 max-w-2xl reveal delay-200"
            style={{ color: "rgba(var(--fg-rgb),0.6)" }}
          >
            {content.heroSubtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 reveal delay-300">
            <Link
              href="/activities"
              className="neon-btn-solid font-semibold px-8 py-3 rounded-xl flex items-center gap-2 text-sm"
            >
              <Zap size={16} />
              Explore Activities
            </Link>
            <Link
              href="/about"
              className="neon-btn-cyan font-semibold px-8 py-3 rounded-xl flex items-center gap-2 text-sm"
            >
              About Us <ArrowRight size={16} />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 reveal delay-400">
            {content.stats.map((s, i) => (
              <div key={i} className="stat-badge">
                <p
                  className="font-display text-2xl font-bold mb-1"
                  style={{ color: "#00f5ff", textShadow: "0 0 20px rgba(0,245,255,0.5)" }}
                >
                  {s.value}
                </p>
                <p className="text-xs tracking-wider uppercase" style={{ color: "rgba(var(--fg-rgb),0.45)" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(transparent, var(--bg-hex))" }}
        />
      </section>

      {/* ── CAREER CENTER SECTION ── */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,245,255,0.03) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 reveal"
              style={{
                background: "rgba(0,245,255,0.07)",
                border: "1px solid rgba(0,245,255,0.2)",
              }}
            >
              <Briefcase size={12} style={{ color: "#00f5ff" }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#00f5ff" }}>
                Don&apos;t Miss Out
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold text-[rgb(var(--fg-rgb))] reveal delay-100">
              CAREER CENTER
            </h2>
            <div className="neon-divider w-32 mx-auto mt-4 reveal delay-200" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredPhotos.map((ph, i) => (
              <div
                key={ph.id}
                className={`neon-card rounded-2xl overflow-hidden flex flex-col sm:flex-row items-stretch cursor-pointer ${i === 0 ? "reveal-left" : "reveal-right"} delay-${(i + 1) * 100}`}
              >
                <div className="relative sm:w-52 h-44 sm:h-auto flex-shrink-0 overflow-hidden">
                  <Image
                    src={ph.heroImg}
                    alt="USEA Career Center"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to right, transparent, rgba(var(--card-rgb),0.3))" }}
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <span
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: "#00f5ff" }}
                  >
                    {ph.heroSubtitle}
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(var(--fg-rgb),0.6)" }}>
                    {ph.articles}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal delay-300">
            <Link
              href="/activities"
              className="neon-btn-solid inline-flex items-center gap-2 font-semibold px-10 py-3.5 rounded-xl text-sm"
            >
              Explore All Activities  <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      {/* <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 40% at 50% 50%, rgba(191,0,255,0.04) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 reveal"
              style={{
                background: "rgba(191,0,255,0.07)",
                border: "1px solid rgba(191,0,255,0.2)",
              }}
            >
              <TrendingUp size={12} style={{ color: "#bf00ff" }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#bf00ff" }}>
                Browse by Industry
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold text-[rgb(var(--fg-rgb))] reveal delay-100">
              JOB CATEGORIES
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <div
                key={cat.name}
                className={`neon-card rounded-2xl p-5 text-center cursor-pointer reveal delay-${Math.min((i % 4 + 1) * 100, 400)}`}
              >
                <div className="text-3xl mb-3 float-anim" style={{ animationDelay: `${i * 0.3}s` }}>
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-sm text-[rgb(var(--fg-rgb))] mb-1">{cat.name}</h3>
                <p
                  className="text-xs font-bold"
                  style={{ color: cat.color, textShadow: `0 0 10px ${cat.color}` }}
                >
                  {cat.count} jobs
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── ACTIVITIES ── */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,255,136,0.03) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 reveal"
                style={{
                  background: "rgba(0,255,136,0.07)",
                  border: "1px solid rgba(0,255,136,0.2)",
                }}
              >
                <Calendar size={12} style={{ color: "#00ff88" }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#00ff88" }}>
                  Grow Your Skills
                </span>
              </div>
              <h2 className="font-display text-4xl font-bold text-[rgb(var(--fg-rgb))] reveal delay-100">
                UPCOMING ACTIVITIES
              </h2>
            </div>
            <Link
              href="/activities"
              className="hidden sm:flex items-center gap-1 text-sm font-medium transition-colors reveal"
              style={{ color: "rgba(0,255,136,0.7)" }}
            >
              All Events <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredActivities.map((act, i) => (
              <div
                key={act.id}
                className={`neon-card rounded-2xl overflow-hidden flex cursor-pointer ${i === 0 ? "reveal-left" : "reveal-right"} delay-200`}
              >
                {/* Date sidebar */}
                <div
                  className="w-20 flex-shrink-0 flex flex-col items-center justify-center p-4 relative overflow-hidden"
                  style={{
                    background: "linear-gradient(180deg, rgba(0,245,255,0.1), rgba(191,0,255,0.1))",
                    borderRight: "1px solid rgba(0,245,255,0.15)",
                  }}
                >
                  <span className="text-2xl mb-2">{act.image}</span>
                  <p
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#00f5ff" }}
                  >
                    {new Date(act.date).toLocaleString("en-US", { month: "short" })}
                  </p>
                  <p className="text-[rgb(var(--fg-rgb))] font-bold text-2xl leading-none">
                    {new Date(act.date).getDate()}
                  </p>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-center flex-1">
                  <span
                    className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 w-fit"
                    style={{
                      background: "rgba(0,255,136,0.1)",
                      color: "#00ff88",
                      border: "1px solid rgba(0,255,136,0.2)",
                    }}
                  >
                    {act.type}
                  </span>
                  <h3 className="font-bold text-sm mb-1 text-[rgb(var(--fg-rgb))]">{act.title}</h3>
                  <p className="text-xs mb-3" style={{ color: "rgba(var(--fg-rgb),0.45)" }}>
                    {act.time} · {act.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Users size={11} style={{ color: "rgba(0,245,255,0.5)" }} />
                      <span className="text-xs" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>
                        {act.registered}/{act.capacity} registered
                      </span>
                    </div>
                    <Link
                      href={`/activities/${act.id}`}
                      className="text-xs font-semibold flex items-center gap-1 transition-all"
                      style={{ color: "#00f5ff" }}
                    >
                      Register <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal delay-300">
            <Link
              href="/activities"
              className="neon-btn-cyan inline-flex items-center gap-2 font-semibold px-10 py-3.5 rounded-xl text-sm"
            >
              View All Events <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Neon background for CTA */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(191,0,255,0.08) 0%, rgba(0,245,255,0.05) 50%, rgba(255,0,128,0.06) 100%)",
            borderTop: "1px solid rgba(0,245,255,0.1)",
            borderBottom: "1px solid rgba(191,0,255,0.1)",
          }}
        />
        <div
          className="absolute top-0 left-1/2 w-full h-1 -translate-x-1/2"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.5), rgba(191,0,255,0.5), transparent)",
          }}
        />

        {/* Large glowing orb center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(0,245,255,0.05) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 reveal"
            style={{
              background: "rgba(255,0,128,0.08)",
              border: "1px solid rgba(255,0,128,0.3)",
            }}
          >
            <Star size={12} style={{ color: "#ff0080" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#ff0080" }}>
              For Employers
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[rgb(var(--fg-rgb))] mb-6 reveal delay-100">
            Are You an Employer
            <br />
            <span className="gradient-text">in Siem Reap?</span>
          </h2>

          <p
            className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed reveal delay-200"
            style={{ color: "rgba(var(--fg-rgb),0.6)" }}
          >
            Post your job openings and reach thousands of qualified candidates.
            Partner with USEA Career Center today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal delay-300">
            <Link
              href="/admin"
              className="neon-btn-solid font-bold px-10 py-3.5 rounded-xl flex items-center justify-center gap-2"
            >
              <Briefcase size={16} />
              Post a Job
            </Link>
            <Link
              href="/contact"
              className="neon-btn-cyan font-bold px-10 py-3.5 rounded-xl flex items-center justify-center gap-2"
            >
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
