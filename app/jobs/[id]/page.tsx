import Link from "next/link";
import { ArrowLeft, MapPin, DollarSign, Calendar, CheckCircle, Briefcase, Share2 } from "lucide-react";
import { defaultJobs } from "@/lib/store";
import { notFound } from "next/navigation";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = defaultJobs.find((j) => j.id === params.id);
  if (!job) notFound();

  const related = defaultJobs.filter((j) => j.category === job.category && j.id !== job.id).slice(0, 2);

  return (
    <div className="min-h-screen neon-bg relative overflow-hidden py-12">
      {/* Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none opacity-20" style={{ background: "radial-gradient(ellipse, #00f5ff 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-[rgb(var(--muted-400-rgb))] hover:text-[#00f5ff] mb-8 transition-colors group tracking-wide">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Jobs
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl overflow-hidden border border-[rgba(0,245,255,0.15)] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <div className="flex flex-col sm:flex-row items-start gap-6 p-8 mb-0 border-b border-[rgba(var(--fg-rgb),0.05)] relative">
                <div className="w-20 h-20 rounded-xl flex items-center justify-center text-5xl shrink-0 bg-[var(--bg-hex)] border border-[rgba(0,245,255,0.3)] shadow-[0_0_15px_rgba(0,245,255,0.1)]">
                  {job.logo}
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold text-[rgb(var(--fg-rgb))] tracking-wide mb-2">{job.title}</h1>
                  <p className="text-[rgb(var(--muted-400-rgb))] font-medium text-lg">{job.company}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-8 bg-[rgba(var(--bg-rgb),0.2)]">
                {[
                  { icon: <MapPin size={16} />, label: "Location", value: job.location, color: "#00f5ff" },
                  { icon: <Briefcase size={16} />, label: "Type", value: job.type, color: "#bf00ff" },
                  { icon: <DollarSign size={16} />, label: "Salary", value: job.salary, color: "#00ff88" },
                  { icon: <Calendar size={16} />, label: "Deadline", value: job.deadline, color: "#ff0080" },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl p-4 bg-[var(--card-hex)]/40 border border-[rgba(var(--fg-rgb),0.05)] hover:border-[rgba(0,245,255,0.2)] transition-colors">
                    <div className="flex items-center gap-2 mb-2" style={{ color: item.color }}>{item.icon}<span className="text-xs text-[rgb(var(--muted-500-rgb))] uppercase tracking-widest">{item.label}</span></div>
                    <p className="text-sm font-semibold text-[rgb(var(--fg-rgb))] tracking-wide">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl p-8 border border-[rgba(0,245,255,0.15)] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <h2 className="font-display font-bold text-xl mb-6 text-[rgb(var(--fg-rgb))] tracking-wide flex items-center gap-3">
                <span className="w-2 h-6 bg-[#00f5ff] rounded-full shadow-[0_0_10px_#00f5ff]"></span>
                Job Description
              </h2>
              <p className="text-[rgb(var(--muted-400-rgb))] leading-relaxed font-light">{job.description}</p>
            </div>

            <div className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl p-8 border border-[rgba(0,245,255,0.15)] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <h2 className="font-display font-bold text-xl mb-6 text-[rgb(var(--fg-rgb))] tracking-wide flex items-center gap-3">
                <span className="w-2 h-6 bg-[#bf00ff] rounded-full shadow-[0_0_10px_#bf00ff]"></span>
                Requirements
              </h2>
              <ul className="space-y-4">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle size={20} className="shrink-0 mt-0.5 text-[#00f5ff] drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]" />
                    <span className="text-[rgb(var(--muted-300-rgb))] text-sm font-light leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl p-8 bg-[rgba(var(--bg-rgb),0.8)] backdrop-blur-md border border-[rgba(0,245,255,0.3)] shadow-[0_0_30px_rgba(0,245,255,0.15)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,245,255,0.1)] to-transparent opacity-50"></div>
              <div className="relative z-10">
                <h3 className="font-display text-[rgb(var(--fg-rgb))] font-bold text-xl mb-3 tracking-wider">Ready to Apply?</h3>
                <p className="text-[rgb(var(--muted-400-rgb))] text-sm mb-6 leading-relaxed">Submit your application before: <br/><span className="font-semibold text-[#ffd700] text-base drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">{job.deadline}</span></p>
                <button className="neon-btn-solid w-full py-4 rounded-xl font-bold transition-all mb-4 uppercase tracking-widest text-sm">
                  Apply Now
                </button>
                <button className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all hover:bg-[rgba(var(--fg-rgb),0.05)] border border-[rgba(var(--fg-rgb),0.1)] text-[rgb(var(--muted-300-rgb))] hover:text-[rgb(var(--fg-rgb))] hover:border-[rgba(var(--fg-rgb),0.3)]">
                  <Share2 size={16} /> Share Job
                </button>
              </div>
            </div>

            <div className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl p-6 border border-[rgba(0,245,255,0.15)] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <p className="text-xs text-[rgb(var(--muted-500-rgb))] mb-3 uppercase tracking-widest">Category</p>
              <span className="inline-block px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest bg-[rgba(0,245,255,0.1)] text-[#00f5ff] border border-[rgba(0,245,255,0.3)] shadow-[0_0_10px_rgba(0,245,255,0.2)]">{job.category}</span>
            </div>

            {related.length > 0 && (
              <div className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl p-6 border border-[rgba(0,245,255,0.15)] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <h3 className="font-display font-bold text-base mb-5 text-[rgb(var(--fg-rgb))] tracking-wider border-b border-[rgba(var(--fg-rgb),0.05)] pb-3">Related Jobs</h3>
                <div className="space-y-4">
                  {related.map((r) => (
                    <Link key={r.id} href={`/jobs/${r.id}`} className="block p-4 rounded-xl transition-all duration-300 bg-[var(--bg-hex)]/50 border border-[rgba(var(--fg-rgb),0.05)] hover:border-[rgba(0,245,255,0.3)] hover:shadow-[0_0_15px_rgba(0,245,255,0.1)] group">
                      <p className="font-display font-bold text-sm text-[rgb(var(--muted-200-rgb))] group-hover:text-[#00f5ff] transition-colors tracking-wide">{r.title}</p>
                      <p className="text-[rgb(var(--muted-500-rgb))] text-xs mt-1.5 font-light">{r.company}</p>
                      <p className="text-xs font-bold mt-2 tracking-wider" style={{ color: "#00ff88" }}>{r.salary}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
