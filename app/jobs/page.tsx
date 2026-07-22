"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, ChevronRight, Star, SlidersHorizontal } from "lucide-react";
import { defaultJobs } from "@/lib/store";

const categories = ["All", "Hospitality", "Tourism", "Technology", "Finance", "Marketing", "Education", "Healthcare", "Wellness", "Retail"];
const jobTypes = ["All", "Full-time", "Part-time", "Internship", "Contract"];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const jobs = defaultJobs.filter((j) => {
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "All" || j.category === selectedCategory;
    const matchType = selectedType === "All" || j.type === selectedType;
    return matchSearch && matchCat && matchType;
  });

  return (
    <div className="min-h-screen neon-bg relative overflow-hidden">
      {/* Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none opacity-20" style={{ background: "radial-gradient(ellipse, #00f5ff 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Header */}
      <div className="py-16 px-4 relative z-10" style={{ background: "rgba(var(--bg-rgb), 0.4)", borderBottom: "1px solid rgba(0,245,255,0.1)" }}>
        <div className="max-w-7xl mx-auto text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#00f5ff", textShadow: "0 0 10px rgba(0,245,255,0.4)" }}>Opportunities Await</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[rgb(var(--fg-rgb))] mb-8 tracking-wider">Find Your Next Job</h1>
          <div className="bg-[var(--card-hex)]/80 backdrop-blur-md rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl border border-[rgba(0,245,255,0.2)] shadow-[0_0_20px_rgba(0,245,255,0.1)] focus-within:shadow-[0_0_25px_rgba(0,245,255,0.2)] focus-within:border-[#00f5ff] transition-all">
            <div className="flex items-center gap-3 flex-1 px-4 py-2">
              <Search size={18} className="text-[#00f5ff]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title or company..."
                className="w-full text-[rgb(var(--fg-rgb))] text-sm outline-none bg-transparent placeholder-[rgb(var(--muted-500-rgb))]"
              />
            </div>
            <button className="neon-btn-solid px-8 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 justify-center">
              <Search size={16} /> Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-[var(--card-hex)]/60 backdrop-blur-md border border-[rgba(0,245,255,0.15)] rounded-2xl p-5 sticky top-24 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-6 border-b border-[rgba(var(--fg-rgb),0.05)] pb-4">
                <h3 className="font-display font-bold flex items-center gap-2 text-[rgb(var(--fg-rgb))] tracking-wider">
                  <SlidersHorizontal size={16} className="text-[#00f5ff]" /> Filters
                </h3>
                <button onClick={() => { setSelectedCategory("All"); setSelectedType("All"); setSearch(""); }} className="text-xs hover:text-[#ff0080] transition-colors" style={{ color: "#bf00ff" }}>
                  Reset
                </button>
              </div>

              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-[rgb(var(--muted-400-rgb))]">Category</p>
                <div className="space-y-1.5">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 ${selectedCategory === c ? 'bg-[rgba(0,245,255,0.1)] text-[#00f5ff] border border-[rgba(0,245,255,0.3)] shadow-[0_0_10px_rgba(0,245,255,0.2)]' : 'text-[rgb(var(--muted-400-rgb))] hover:text-[rgb(var(--fg-rgb))] hover:bg-[rgba(var(--fg-rgb),0.05)] border border-transparent'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-[rgb(var(--muted-400-rgb))]">Job Type</p>
                <div className="space-y-1.5">
                  {jobTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedType(t)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 ${selectedType === t ? 'bg-[rgba(191,0,255,0.1)] text-[#bf00ff] border border-[rgba(191,0,255,0.3)] shadow-[0_0_10px_rgba(191,0,255,0.2)]' : 'text-[rgb(var(--muted-400-rgb))] hover:text-[rgb(var(--fg-rgb))] hover:bg-[rgba(var(--fg-rgb),0.05)] border border-transparent'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Listings */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[rgb(var(--muted-400-rgb))] text-sm">
                Showing <span className="font-bold text-[rgb(var(--fg-rgb))]">{jobs.length}</span> jobs
                {selectedCategory !== "All" && <span className="text-[#00f5ff]"> in {selectedCategory}</span>}
              </p>
            </div>

            {jobs.length === 0 ? (
              <div className="text-center py-24 bg-[var(--card-hex)]/40 border border-[rgba(0,245,255,0.1)] rounded-2xl backdrop-blur-sm">
                <div className="text-5xl mb-4 opacity-50">🔍</div>
                <h3 className="font-display font-bold text-xl mb-2 text-[rgb(var(--fg-rgb))] tracking-wider">No jobs found</h3>
                <p className="text-[rgb(var(--muted-500-rgb))] text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-5">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl p-6 border border-[rgba(0,245,255,0.1)] hover:border-[#00f5ff] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,245,255,0.15)] group relative overflow-hidden">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,245,255,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 relative z-10">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0 bg-[var(--bg-hex)] border border-[rgba(var(--fg-rgb),0.1)] shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:border-[rgba(0,245,255,0.3)] transition-colors">
                          {job.logo}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-display font-bold text-lg text-[rgb(var(--fg-rgb))] group-hover:text-[#00f5ff] transition-colors tracking-wide">{job.title}</h3>
                            {job.featured && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest flex items-center gap-1 bg-[rgba(255,215,0,0.1)] text-[#ffd700] border border-[rgba(255,215,0,0.3)] shadow-[0_0_5px_rgba(255,215,0,0.2)]">
                                <Star size={10} fill="currentColor" /> Featured
                              </span>
                            )}
                          </div>
                          <p className="text-[rgb(var(--muted-400-rgb))] text-sm font-medium mb-3">{job.company}</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs px-3 py-1 rounded-sm border border-[rgba(191,0,255,0.2)] bg-[rgba(191,0,255,0.05)] text-[#bf00ff] font-medium tracking-wide uppercase">{job.type}</span>
                            <span className="text-xs px-3 py-1 rounded-sm border border-[rgba(var(--fg-rgb),0.1)] bg-[rgba(var(--fg-rgb),0.05)] text-[rgb(var(--muted-300-rgb))] font-medium tracking-wide flex items-center gap-1">
                              <MapPin size={12} className="text-[#00f5ff]" /> {job.location}
                            </span>
                            <span className="text-xs px-3 py-1 rounded-sm border border-[rgba(0,245,255,0.2)] bg-[rgba(0,245,255,0.05)] text-[#00f5ff] font-medium tracking-wide uppercase">{job.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-4 shrink-0">
                        <p className="font-display font-bold text-sm tracking-widest" style={{ color: "#00ff88", textShadow: "0 0 8px rgba(0,255,136,0.3)" }}>{job.salary}</p>
                        <Link
                          href={`/jobs/${job.id}`}
                          className="neon-btn-outline px-6 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 uppercase tracking-widest"
                        >
                          Apply <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                    <p className="text-[rgb(var(--muted-400-rgb))] text-sm leading-relaxed mt-5 line-clamp-2 relative z-10 font-light">{job.description}</p>
                    <div className="flex justify-between items-center mt-4 relative z-10 border-t border-[rgba(var(--fg-rgb),0.05)] pt-4">
                      <p className="text-xs text-[rgb(var(--muted-500-rgb))] font-medium tracking-wider">Deadline: <span className="text-[rgb(var(--muted-300-rgb))]">{job.deadline}</span></p>
                      <p className="text-xs text-[rgb(var(--muted-500-rgb))] font-medium tracking-wider">Posted: <span className="text-[rgb(var(--muted-300-rgb))]">{job.postedDate}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
