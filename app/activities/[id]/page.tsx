import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";
import { defaultActivities } from "@/lib/store";
import { notFound } from "next/navigation";

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = defaultActivities.find((a) => a.id === id);
  if (!activity) notFound();

  const spotsLeft = activity.capacity - activity.registered;
  const pct = Math.round((activity.registered / activity.capacity) * 100);

  return (
    <div className="min-h-screen neon-bg relative overflow-hidden py-12">
      {/* Ambient Light */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] rounded-full pointer-events-none opacity-20" style={{ background: "radial-gradient(ellipse, #bf00ff 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          href="/activities"
          className="inline-flex items-center gap-2 text-sm text-[rgb(var(--muted-400-rgb))] hover:text-[#bf00ff] mb-8 transition-colors group tracking-wide"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Activities
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div
              className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl overflow-hidden border border-[rgba(191,0,255,0.15)] shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              {/* Header Image banner */}
              <div className="relative w-full h-64 overflow-hidden border-b border-[rgba(var(--fg-rgb),0.05)]">
                {typeof activity.image === "string" ? (
                  <div className="w-full h-full flex items-center justify-center text-8xl bg-gradient-to-br from-[rgba(191,0,255,0.15)] to-[rgba(0,245,255,0.15)]">
                    {activity.image}
                  </div>
                ) : (
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(var(--bg-rgb),0.9)] via-transparent to-[rgba(var(--bg-rgb),0.3)]"></div>
              </div>

              <div className="p-8 relative z-10 border-b border-[rgba(var(--fg-rgb),0.05)]">
                <span
                  className="text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-widest bg-[rgba(255,215,0,0.1)] text-[#ffd700] border border-[rgba(255,215,0,0.3)] shadow-[0_0_10px_rgba(255,215,0,0.2)]"
                >
                  {activity.type}
                </span>
                <h1 className="font-display text-3xl font-bold text-[rgb(var(--fg-rgb))] mt-4 tracking-wide leading-tight">
                  {activity.title}
                </h1>
              </div>
              <div className="p-8 grid sm:grid-cols-2 gap-4 bg-[rgba(var(--bg-rgb),0.2)]">
                {[
                  {
                    icon: <Calendar size={18} style={{ color: "#00f5ff" }} />,
                    label: "Date",
                    value: activity.date,
                  },
                  {
                    icon: <Clock size={18} style={{ color: "#ff0080" }} />,
                    label: "Time",
                    value: activity.time,
                  },
                  {
                    icon: <MapPin size={18} style={{ color: "#00ff88" }} />,
                    label: "Location",
                    value: activity.location,
                  },
                  {
                    icon: <Users size={18} style={{ color: "#bf00ff" }} />,
                    label: "Capacity",
                    value: `${activity.registered}/${activity.capacity} registered`,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-[var(--card-hex)]/40 border border-[rgba(var(--fg-rgb),0.05)] hover:border-[rgba(191,0,255,0.2)] transition-colors"
                  >
                    <div className="mt-0.5">{item.icon}</div>
                    <div>
                      <p className="text-xs text-[rgb(var(--muted-500-rgb))] uppercase tracking-widest mb-1">{item.label}</p>
                      <p
                        className="text-sm font-semibold text-[rgb(var(--fg-rgb))] tracking-wide"
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl p-8 border border-[rgba(191,0,255,0.15)] shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              <h2
                className="font-display font-bold text-xl mb-6 text-[rgb(var(--fg-rgb))] tracking-wide flex items-center gap-3"
              >
                <span className="w-2 h-6 bg-[#bf00ff] rounded-full shadow-[0_0_10px_#bf00ff]"></span>
                About This Event
              </h2>
              <p className="text-[rgb(var(--muted-400-rgb))] leading-relaxed font-light">
                {activity.description}
              </p>
            </div>
          </div>

          <div>
            <div
              className="rounded-2xl p-8 sticky top-24 bg-[rgba(var(--bg-rgb),0.8)] backdrop-blur-md border border-[rgba(191,0,255,0.3)] shadow-[0_0_30px_rgba(191,0,255,0.15)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(191,0,255,0.1)] to-transparent opacity-50"></div>
              
              <div className="relative z-10">
                <h3 className="font-display text-[rgb(var(--fg-rgb))] font-bold text-xl mb-2 tracking-wider">
                  <a
                    href="https://www.facebook.com/share/18sM5Fdzm2/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#bf00ff] transition-colors"
                  >
                    Register Now
                  </a>
                </h3>
                <p className="text-[rgb(var(--muted-400-rgb))] text-sm mb-6 leading-relaxed">
                  Secure your spot before it fills up.
                </p>

                <div className="mb-8">
                  <div className="flex justify-between text-xs mb-3 font-semibold tracking-wider">
                    <span className="text-[rgb(var(--muted-300-rgb))]">
                      {activity.registered} registered
                    </span>
                    <span
                      style={{ color: spotsLeft <= 0 ? "#ff0080" : "#00ff88", textShadow: spotsLeft <= 0 ? "0 0 8px rgba(255,0,128,0.5)" : "0 0 8px rgba(0,255,136,0.5)" }}
                    >
                      {spotsLeft > 0 ? `${spotsLeft} left` : "Full"}
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden bg-[rgba(var(--fg-rgb),0.1)]"
                  >
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${pct}%`,
                        background: pct > 80 ? "linear-gradient(90deg, #ff0080, #ff4d4d)" : "linear-gradient(90deg, #00f5ff, #bf00ff)",
                        boxShadow: pct > 80 ? "0 0 10px #ff0080" : "0 0 10px #bf00ff"
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {["Full Name", "Email Address", "Phone Number"].map((p, i) => (
                    <input
                      key={i}
                      type={i === 1 ? "email" : i === 2 ? "tel" : "text"}
                      placeholder={p}
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-[rgba(var(--bg-rgb),0.3)] border border-[rgba(var(--fg-rgb),0.1)] text-[rgb(var(--fg-rgb))] placeholder-[rgb(var(--muted-500-rgb))] focus:border-[#bf00ff] focus:shadow-[0_0_15px_rgba(191,0,255,0.2)] transition-all"
                    />
                  ))}
                </div>

                <button
                  disabled={spotsLeft <= 0}
                  className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${
                    spotsLeft <= 0
                      ? "bg-[#1f2937] text-[rgb(var(--muted-500-rgb))] cursor-not-allowed border border-transparent"
                      : "bg-[#bf00ff] text-[rgb(var(--fg-rgb))] hover:bg-[#a600e6] shadow-[0_0_15px_rgba(191,0,255,0.4)] hover:shadow-[0_0_25px_rgba(191,0,255,0.6)]"
                  }`}
                >
                  {spotsLeft <= 0 ? "Event is Full" : "Confirm Registration"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
