"use client";
import { useState } from "react";
import {
  LayoutDashboard, Briefcase, Calendar, Settings, Plus, Pencil, Trash2,
  LogIn, Users, TrendingUp, X, Save, Shield,
  CheckCircle
} from "lucide-react";
import { defaultJobs, defaultActivities, defaultContent, Job, Activity, SiteContent } from "@/lib/store";

type Tab = "dashboard" | "jobs" | "activities" | "content";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [jobs, setJobs] = useState<Job[]>(defaultJobs);
  const [activities, setActivities] = useState<Activity[]>(defaultActivities);
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newJob, setNewJob] = useState<Partial<Job>>({ type: "Full-time", featured: false, requirements: [], logo: "💼" });
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({ type: "Workshop", featured: false, image: "📅" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") { setAuthed(true); setLoginError(""); }
    else setLoginError("Incorrect password. Hint: admin123");
  };

  const deleteJob = (id: string) => { if (confirm("Delete this job?")) setJobs(jobs.filter(j => j.id !== id)); };
  const deleteActivity = (id: string) => { if (confirm("Delete this event?")) setActivities(activities.filter(a => a.id !== id)); };

  const saveJob = () => {
    if (editingJob) {
      setJobs(jobs.map(j => j.id === editingJob.id ? editingJob : j));
      setEditingJob(null);
    } else {
      const job = { ...newJob, id: Date.now().toString(), postedDate: new Date().toISOString().split("T")[0], requirements: newJob.requirements || [] } as Job;
      setJobs([job, ...jobs]);
      setNewJob({ type: "Full-time", featured: false, requirements: [], logo: "💼" });
      setShowJobForm(false);
    }
  };

  const saveActivity = () => {
    if (editingActivity) {
      setActivities(activities.map(a => a.id === editingActivity.id ? editingActivity : a));
      setEditingActivity(null);
    } else {
      const act = { ...newActivity, id: Date.now().toString(), registered: 0 } as Activity;
      setActivities([act, ...activities]);
      setNewActivity({ type: "Workshop", featured: false, image: "📅" });
      setShowActivityForm(false);
    }
  };

  const saveContent = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  if (!authed) {
    return (
      <div className="min-h-screen neon-bg flex items-center justify-center px-4 relative overflow-hidden">
        {/* Ambient Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none opacity-20" style={{ background: "radial-gradient(ellipse, #00f5ff 0%, transparent 70%)", filter: "blur(60px)" }} />

        <div className="bg-[var(--card-hex)]/60 backdrop-blur-xl rounded-2xl p-8 w-full max-w-sm border border-[rgba(0,245,255,0.15)] shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-[var(--bg-hex)] border border-[rgba(0,245,255,0.3)] shadow-[0_0_15px_rgba(0,245,255,0.2)]">
              <Shield size={28} className="text-[#00f5ff] drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]" />
            </div>
            <h1 className="font-display text-2xl font-bold text-[rgb(var(--fg-rgb))] tracking-wider">Admin Panel</h1>
            <p className="text-[rgb(var(--muted-400-rgb))] text-sm mt-1 uppercase tracking-widest font-semibold">USEA Career Center</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-xs text-[rgb(var(--muted-400-rgb))] font-medium uppercase tracking-widest mb-2 block">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-[rgba(var(--bg-rgb),0.3)] border border-[rgba(var(--fg-rgb),0.1)] rounded-xl px-4 py-3 text-sm text-[rgb(var(--fg-rgb))] outline-none placeholder-[rgb(var(--muted-500-rgb))] focus:border-[#00f5ff] focus:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all" />
            </div>
            {loginError && <p className="text-sm font-semibold" style={{ color: "#ff0080", textShadow: "0 0 10px rgba(255,0,128,0.5)" }}>{loginError}</p>}
            <button type="submit" className="neon-btn-solid w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 uppercase tracking-widest text-sm mt-2">
              <LogIn size={16} /> Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "jobs", label: "Jobs", icon: <Briefcase size={18} /> },
    { id: "activities", label: "Activities", icon: <Calendar size={18} /> },
    { id: "content", label: "Site Content", icon: <Settings size={18} /> },
  ];

  const inputCls = "w-full bg-[rgba(var(--bg-rgb),0.3)] border border-[rgba(var(--fg-rgb),0.1)] rounded-xl px-4 py-3 text-sm text-[rgb(var(--fg-rgb))] outline-none placeholder-[rgb(var(--muted-500-rgb))] focus:border-[#00f5ff] focus:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all";

  const JobForm = ({ job, onChange, onSave, onCancel }: { job: Partial<Job>; onChange: (j: Partial<Job>) => void; onSave: () => void; onCancel: () => void }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div className="bg-[var(--card-hex)]/90 backdrop-blur-xl rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[rgba(0,245,255,0.2)] shadow-[0_0_30px_rgba(0,245,255,0.1)] custom-scrollbar">
        <div className="flex items-center justify-between p-6 border-b border-[rgba(var(--fg-rgb),0.05)]">
          <h2 className="font-display font-bold text-lg text-[rgb(var(--fg-rgb))] tracking-wider">{editingJob ? "Edit Job" : "New Job"}</h2>
          <button onClick={onCancel} className="text-[rgb(var(--muted-400-rgb))] hover:text-[#ff0080] transition-colors"><X size={20} /></button>
        </div>
        <div className="p-6 grid sm:grid-cols-2 gap-5">
          {[
            { label: "Job Title", key: "title", placeholder: "e.g. Hotel Manager" },
            { label: "Company", key: "company", placeholder: "Company name" },
            { label: "Salary", key: "salary", placeholder: "e.g. $500 – $800/month" },
            { label: "Deadline", key: "deadline", type: "date" },
            { label: "Emoji Logo", key: "logo", placeholder: "e.g. 🏨" },
            { label: "Category", key: "category", placeholder: "e.g. Hospitality" },
          ].map((f) => (
            <div key={f.key}>
              <label className="text-xs text-[rgb(var(--muted-400-rgb))] font-semibold uppercase tracking-widest mb-2 block">{f.label}</label>
              <input type={f.type || "text"} value={(job as Record<string, string>)[f.key] || ""}
                onChange={(e) => onChange({ ...job, [f.key]: e.target.value })}
                placeholder={f.placeholder} className={inputCls} />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="text-xs text-[rgb(var(--muted-400-rgb))] font-semibold uppercase tracking-widest mb-2 block">Description</label>
            <textarea rows={3} value={job.description || ""} onChange={(e) => onChange({ ...job, description: e.target.value })}
              className={inputCls + " resize-none"} placeholder="Job description..." />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-[rgb(var(--muted-400-rgb))] font-semibold uppercase tracking-widest mb-2 block">Requirements (one per line)</label>
            <textarea rows={3} value={(job.requirements || []).join("\n")}
              onChange={(e) => onChange({ ...job, requirements: e.target.value.split("\n").filter(Boolean) })}
              className={inputCls + " resize-none"} placeholder="Requirement 1&#10;Requirement 2" />
          </div>
          <div>
            <label className="text-xs text-[rgb(var(--muted-400-rgb))] font-semibold uppercase tracking-widest mb-2 block">Job Type</label>
            <select value={job.type || "Full-time"} onChange={(e) => onChange({ ...job, type: e.target.value as Job["type"] })} className={inputCls}>
              {["Full-time", "Part-time", "Internship", "Contract"].map(t => <option key={t} value={t} className="bg-[var(--bg-hex)]">{t}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3 pt-7">
            <input type="checkbox" id="featured" checked={job.featured || false} onChange={(e) => onChange({ ...job, featured: e.target.checked })} className="w-4 h-4 accent-[#00f5ff]" />
            <label htmlFor="featured" className="text-sm text-[rgb(var(--muted-300-rgb))] font-semibold uppercase tracking-widest">Mark as Featured</label>
          </div>
        </div>
        <div className="flex gap-4 p-6 border-t border-[rgba(var(--fg-rgb),0.05)] bg-[rgba(var(--bg-rgb),0.2)]">
          <button onClick={onSave} className="neon-btn-solid flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
            <Save size={16} /> Save Job
          </button>
          <button onClick={onCancel} className="px-8 border border-[rgba(var(--fg-rgb),0.1)] rounded-xl text-xs font-bold text-[rgb(var(--muted-400-rgb))] hover:text-[rgb(var(--fg-rgb))] hover:border-[rgba(var(--fg-rgb),0.3)] transition-all uppercase tracking-widest">Cancel</button>
        </div>
      </div>
    </div>
  );

  const ActivityForm = ({ act, onChange, onSave, onCancel }: { act: Partial<Activity>; onChange: (a: Partial<Activity>) => void; onSave: () => void; onCancel: () => void }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div className="bg-[var(--card-hex)]/90 backdrop-blur-xl rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[rgba(191,0,255,0.2)] shadow-[0_0_30px_rgba(191,0,255,0.1)] custom-scrollbar">
        <div className="flex items-center justify-between p-6 border-b border-[rgba(var(--fg-rgb),0.05)]">
          <h2 className="font-display font-bold text-lg text-[rgb(var(--fg-rgb))] tracking-wider">{editingActivity ? "Edit Event" : "New Event"}</h2>
          <button onClick={onCancel} className="text-[rgb(var(--muted-400-rgb))] hover:text-[#ff0080] transition-colors"><X size={20} /></button>
        </div>
        <div className="p-6 grid sm:grid-cols-2 gap-5">
          {[
            { label: "Title", key: "title", placeholder: "Event title" },
            { label: "Date", key: "date", type: "date" },
            { label: "Time", key: "time", placeholder: "e.g. 9:00 AM – 4:00 PM" },
            { label: "Location", key: "location", placeholder: "Venue or Online" },
            { label: "Capacity", key: "capacity", type: "number", placeholder: "Max attendees" },
            { label: "Emoji", key: "image", placeholder: "e.g. 🎪" },
          ].map((f) => (
            <div key={f.key}>
              <label className="text-xs text-[rgb(var(--muted-400-rgb))] font-semibold uppercase tracking-widest mb-2 block">{f.label}</label>
              <input type={f.type || "text"} value={(act as Record<string, string>)[f.key] || ""}
                onChange={(e) => onChange({ ...act, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })}
                placeholder={f.placeholder} className={inputCls.replace('focus:border-[#00f5ff]', 'focus:border-[#bf00ff]').replace('focus:shadow-[0_0_15px_rgba(0,245,255,0.2)]', 'focus:shadow-[0_0_15px_rgba(191,0,255,0.2)]')} />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="text-xs text-[rgb(var(--muted-400-rgb))] font-semibold uppercase tracking-widest mb-2 block">Description</label>
            <textarea rows={3} value={act.description || ""} onChange={(e) => onChange({ ...act, description: e.target.value })}
              className={inputCls.replace('focus:border-[#00f5ff]', 'focus:border-[#bf00ff]').replace('focus:shadow-[0_0_15px_rgba(0,245,255,0.2)]', 'focus:shadow-[0_0_15px_rgba(191,0,255,0.2)]') + " resize-none"} />
          </div>
          <div>
            <label className="text-xs text-[rgb(var(--muted-400-rgb))] font-semibold uppercase tracking-widest mb-2 block">Type</label>
            <select value={act.type || "Workshop"} onChange={(e) => onChange({ ...act, type: e.target.value as Activity["type"] })} className={inputCls.replace('focus:border-[#00f5ff]', 'focus:border-[#bf00ff]').replace('focus:shadow-[0_0_15px_rgba(0,245,255,0.2)]', 'focus:shadow-[0_0_15px_rgba(191,0,255,0.2)]')}>
              {["Workshop", "Career Improvement", "Events", "Training", "Networking"].map(t => <option key={t} value={t} className="bg-[var(--bg-hex)]">{t}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-3 pt-7">
            <input type="checkbox" id="afeatured" checked={act.featured || false} onChange={(e) => onChange({ ...act, featured: e.target.checked })} className="w-4 h-4 accent-[#bf00ff]" />
            <label htmlFor="afeatured" className="text-sm text-[rgb(var(--muted-300-rgb))] font-semibold uppercase tracking-widest">Mark as Featured</label>
          </div>
        </div>
        <div className="flex gap-4 p-6 border-t border-[rgba(var(--fg-rgb),0.05)] bg-[rgba(var(--bg-rgb),0.2)]">
          <button onClick={onSave} className="flex-1 text-[rgb(var(--fg-rgb))] py-3 rounded-xl font-bold flex items-center justify-center gap-2 bg-[#bf00ff] hover:bg-[#a600e6] shadow-[0_0_15px_rgba(191,0,255,0.4)] hover:shadow-[0_0_25px_rgba(191,0,255,0.6)] transition-all uppercase tracking-widest text-xs">
            <Save size={16} /> Save Event
          </button>
          <button onClick={onCancel} className="px-8 border border-[rgba(var(--fg-rgb),0.1)] rounded-xl text-xs font-bold text-[rgb(var(--muted-400-rgb))] hover:text-[rgb(var(--fg-rgb))] hover:border-[rgba(var(--fg-rgb),0.3)] transition-all uppercase tracking-widest">Cancel</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex neon-bg">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 hidden lg:flex flex-col border-r border-[rgba(var(--fg-rgb),0.05)] bg-[var(--card-hex)]/60 backdrop-blur-md relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        <div className="p-6 border-b border-[rgba(var(--fg-rgb),0.05)]">
          <p className="text-[rgb(var(--fg-rgb))] font-display font-bold text-lg tracking-wider">USEA Admin Panel</p>
          <p className="text-[#00f5ff] text-xs mt-1 uppercase tracking-widest font-semibold drop-shadow-[0_0_5px_rgba(0,245,255,0.5)]">Content Management</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setTab(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300"
              style={tab === item.id ? { background: "rgba(0,245,255,0.1)", color: "#00f5ff", border: "1px solid rgba(0,245,255,0.3)", boxShadow: "0 0 15px rgba(0,245,255,0.15)" } : { color: "rgb(var(--muted-400-rgb))", border: "1px solid transparent" }}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-[rgba(var(--fg-rgb),0.05)] bg-[rgba(var(--bg-rgb),0.2)]">
          <button onClick={() => setAuthed(false)} className="w-full text-[rgb(var(--muted-400-rgb))] hover:text-[#ff0080] text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 px-4 py-3 transition-colors rounded-xl hover:bg-[rgba(255,0,128,0.1)]">
            <LogIn size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex bg-[var(--card-hex)]/90 backdrop-blur-lg border-t border-[rgba(var(--fg-rgb),0.1)] pb-safe">
        {navItems.map((item) => (
          <button key={item.id} onClick={() => setTab(item.id)}
            className="flex-1 flex flex-col items-center py-3 text-[10px] uppercase tracking-widest font-bold gap-1.5 transition-colors"
            style={{ color: tab === item.id ? "#00f5ff" : "rgb(var(--muted-400-rgb))", textShadow: tab === item.id ? "0 0 8px rgba(0,245,255,0.5)" : "none" }}>
            {item.icon}<span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20 lg:pb-0 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10" style={{ background: "radial-gradient(circle, #00f5ff 0%, transparent 70%)", filter: "blur(80px)" }} />

        <div className="p-6 lg:p-10 max-w-6xl mx-auto relative z-10">

          {/* DASHBOARD */}
          {tab === "dashboard" && (
            <div>
              <h1 className="font-display text-3xl font-bold mb-8 text-[rgb(var(--fg-rgb))] tracking-wider">Dashboard</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                  { label: "Total Jobs", value: jobs.length, icon: <Briefcase size={22} />, color: "#00f5ff", bg: "rgba(0,245,255,0.1)", shadow: "rgba(0,245,255,0.2)" },
                  { label: "Active Events", value: activities.length, icon: <Calendar size={22} />, color: "#00ff88", bg: "rgba(0,255,136,0.1)", shadow: "rgba(0,255,136,0.2)" },
                  { label: "Featured Jobs", value: jobs.filter(j => j.featured).length, icon: <TrendingUp size={22} />, color: "#ffd700", bg: "rgba(255,215,0,0.1)", shadow: "rgba(255,215,0,0.2)" },
                  { label: "Total Registered", value: activities.reduce((s, a) => s + a.registered, 0), icon: <Users size={22} />, color: "#bf00ff", bg: "rgba(191,0,255,0.1)", shadow: "rgba(191,0,255,0.2)" },
                ].map((s, i) => (
                  <div key={i} className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl p-6 border border-[rgba(var(--fg-rgb),0.05)] shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:border-[rgba(var(--fg-rgb),0.15)] transition-all">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border" style={{ background: s.bg, color: s.color, borderColor: `rgba(${s.color.match(/\w\w/g)?.map(x => parseInt(x, 16)).join(',')}, 0.3)`, boxShadow: `0 0 15px ${s.shadow}` }}>{s.icon}</div>
                    <p className="font-display text-3xl font-bold text-[rgb(var(--fg-rgb))] tracking-wide">{s.value}</p>
                    <p className="text-[rgb(var(--muted-400-rgb))] text-xs mt-2 uppercase tracking-widest font-semibold">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl p-6 border border-[rgba(var(--fg-rgb),0.05)] shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                  <h3 className="font-display font-bold text-lg mb-5 flex items-center gap-2 text-[rgb(var(--fg-rgb))] tracking-wider border-b border-[rgba(var(--fg-rgb),0.05)] pb-3"><Briefcase size={18} className="text-[#00f5ff]" /> Recent Jobs</h3>
                  <div className="space-y-4">
                    {jobs.slice(0, 4).map((j) => (
                      <div key={j.id} className="flex items-center justify-between p-4 rounded-xl bg-[rgba(var(--bg-rgb),0.6)] border border-[rgba(var(--fg-rgb),0.02)] hover:border-[rgba(0,245,255,0.2)] transition-colors group">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl bg-[var(--bg-hex)] w-12 h-12 rounded-xl flex items-center justify-center border border-[rgba(var(--fg-rgb),0.05)]">{j.logo}</span>
                          <div>
                            <p className="font-bold text-sm text-[rgb(var(--muted-200-rgb))] group-hover:text-[#00f5ff] transition-colors">{j.title}</p>
                            <p className="text-[rgb(var(--muted-500-rgb))] text-xs mt-1">{j.company} <span className="opacity-50">·</span> {j.type}</p>
                          </div>
                        </div>
                        <span className="text-[10px] px-2.5 py-1 rounded-sm uppercase tracking-widest font-bold" style={j.featured ? { background: "rgba(255,215,0,0.1)", color: "#ffd700", border: "1px solid rgba(255,215,0,0.3)" } : { background: "rgba(var(--fg-rgb),0.05)", color: "rgb(var(--muted-400-rgb))", border: "1px solid rgba(var(--fg-rgb),0.1)" }}>
                          {j.featured ? "Featured" : "Standard"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl p-6 border border-[rgba(var(--fg-rgb),0.05)] shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                  <h3 className="font-display font-bold text-lg mb-5 flex items-center gap-2 text-[rgb(var(--fg-rgb))] tracking-wider border-b border-[rgba(var(--fg-rgb),0.05)] pb-3"><Calendar size={18} className="text-[#00ff88]" /> Upcoming Events</h3>
                  <div className="space-y-4">
                    {activities.slice(0, 4).map((a) => (
                      <div key={a.id} className="flex items-center justify-between p-4 rounded-xl bg-[rgba(var(--bg-rgb),0.6)] border border-[rgba(var(--fg-rgb),0.02)] hover:border-[rgba(0,255,136,0.2)] transition-colors group">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl bg-[var(--bg-hex)] w-12 h-12 rounded-xl flex items-center justify-center border border-[rgba(var(--fg-rgb),0.05)]">
                            {typeof a.image === "string" ? a.image : (a.type === "Career Improvement" ? "🎪" : a.type === "Workshop" ? "📝" : a.type === "Training" ? "📱" : a.type === "Events" ? "🚀" : "🤝")}
                          </span>
                          <div>
                            <p className="font-bold text-sm text-[rgb(var(--muted-200-rgb))] group-hover:text-[#00ff88] transition-colors">{a.title}</p>
                            <p className="text-[rgb(var(--muted-500-rgb))] text-xs mt-1">{a.date} <span className="opacity-50">·</span> {a.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold" style={{ color: "#00ff88" }}>{a.registered}</span>
                          <span className="text-xs text-[rgb(var(--muted-500-rgb))]">/{a.capacity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* JOBS */}
          {tab === "jobs" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-display text-3xl font-bold text-[rgb(var(--fg-rgb))] tracking-wider">Manage Jobs</h1>
                <button onClick={() => setShowJobForm(true)} className="neon-btn-solid px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                  <Plus size={16} /> Add Job
                </button>
              </div>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border border-[rgba(var(--fg-rgb),0.05)] shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:border-[rgba(0,245,255,0.3)] transition-all">
                    <div className="flex items-center gap-5">
                      <span className="text-4xl bg-[var(--bg-hex)] w-16 h-16 rounded-xl flex items-center justify-center border border-[rgba(var(--fg-rgb),0.05)]">{job.logo}</span>
                      <div>
                        <p className="font-display font-bold text-lg text-[rgb(var(--fg-rgb))] tracking-wide mb-1">{job.title}</p>
                        <p className="text-[rgb(var(--muted-400-rgb))] text-sm">{job.company} <span className="opacity-50">·</span> <span style={{ color: "#bf00ff" }}>{job.type}</span></p>
                        <p className="text-xs font-bold mt-2 tracking-widest" style={{ color: "#00ff88", textShadow: "0 0 8px rgba(0,255,136,0.3)" }}>{job.salary}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                      {job.featured && <span className="text-[10px] px-3 py-1.5 rounded-sm uppercase tracking-widest font-bold bg-[rgba(255,215,0,0.1)] text-[#ffd700] border border-[rgba(255,215,0,0.3)]">Featured</span>}
                      <button onClick={() => setEditingJob(job)} className="w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-[rgba(0,245,255,0.1)] text-[#00f5ff] hover:bg-[#00f5ff] hover:text-[var(--bg-hex)] border border-[rgba(0,245,255,0.3)]">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => deleteJob(job.id)} className="w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-[rgba(255,0,128,0.1)] text-[#ff0080] hover:bg-[#ff0080] hover:text-[var(--bg-hex)] border border-[rgba(255,0,128,0.3)]">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTIVITIES */}
          {tab === "activities" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-display text-3xl font-bold text-[rgb(var(--fg-rgb))] tracking-wider">Manage Activities</h1>
                <button onClick={() => setShowActivityForm(true)} className="px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center gap-2 bg-[#bf00ff] text-[rgb(var(--fg-rgb))] hover:bg-[#a600e6] shadow-[0_0_15px_rgba(191,0,255,0.4)] transition-all">
                  <Plus size={16} /> Add Event
                </button>
              </div>
              <div className="space-y-4">
                {activities.map((act) => (
                  <div key={act.id} className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border border-[rgba(var(--fg-rgb),0.05)] shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:border-[rgba(191,0,255,0.3)] transition-all">
                    <div className="flex items-center gap-5">
                      <span className="text-4xl bg-[var(--bg-hex)] w-16 h-16 rounded-xl flex items-center justify-center border border-[rgba(var(--fg-rgb),0.05)]">
                        {typeof act.image === "string" ? act.image : (act.type === "Career Improvement" ? "🎪" : act.type === "Workshop" ? "📝" : act.type === "Training" ? "📱" : act.type === "Events" ? "🚀" : "🤝")}
                      </span>
                      <div>
                        <p className="font-display font-bold text-lg text-[rgb(var(--fg-rgb))] tracking-wide mb-1">{act.title}</p>
                        <p className="text-[rgb(var(--muted-400-rgb))] text-sm">{act.date} <span className="opacity-50">·</span> <span style={{ color: "#00f5ff" }}>{act.type}</span></p>
                        <p className="text-xs font-semibold uppercase tracking-widest mt-2 text-[rgb(var(--muted-500-rgb))]"><span className="text-[rgb(var(--fg-rgb))]">{act.registered}</span> / {act.capacity} registered</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                      {act.featured && <span className="text-[10px] px-3 py-1.5 rounded-sm uppercase tracking-widest font-bold bg-[rgba(0,245,255,0.1)] text-[#00f5ff] border border-[rgba(0,245,255,0.3)]">Featured</span>}
                      <button onClick={() => setEditingActivity(act)} className="w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-[rgba(191,0,255,0.1)] text-[#bf00ff] hover:bg-[#bf00ff] hover:text-[var(--bg-hex)] border border-[rgba(191,0,255,0.3)]">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => deleteActivity(act.id)} className="w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-[rgba(255,0,128,0.1)] text-[#ff0080] hover:bg-[#ff0080] hover:text-[var(--bg-hex)] border border-[rgba(255,0,128,0.3)]">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTENT */}
          {tab === "content" && (
            <div>
              <h1 className="font-display text-3xl font-bold mb-8 text-[rgb(var(--fg-rgb))] tracking-wider">Site Content</h1>
              <div className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl p-8 space-y-6 border border-[rgba(var(--fg-rgb),0.05)] shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                {[
                  { label: "Hero Title", key: "heroTitle" },
                  { label: "Hero Subtitle", key: "heroSubtitle", textarea: true, rows: 3 },
                  { label: "About Text", key: "aboutText", textarea: true, rows: 4 },
                  { label: "Contact Email", key: "contactEmail" },
                  { label: "Contact Phone", key: "contactPhone" },
                  { label: "Address", key: "address" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="text-xs text-[rgb(var(--muted-400-rgb))] font-semibold uppercase tracking-widest mb-2 block">{f.label}</label>
                    {f.textarea ? (
                      <textarea rows={f.rows} value={(content as unknown as Record<string, string>)[f.key]}
                        onChange={(e) => setContent({ ...content, [f.key]: e.target.value })}
                        className={inputCls + " resize-none"} />
                    ) : (
                      <input value={(content as unknown as Record<string, string>)[f.key]}
                        onChange={(e) => setContent({ ...content, [f.key]: e.target.value })}
                        className={inputCls} />
                    )}
                  </div>
                ))}

                <div className="pt-4 border-t border-[rgba(var(--fg-rgb),0.05)]">
                  <label className="text-xs text-[#00f5ff] font-semibold uppercase tracking-widest mb-4 block drop-shadow-[0_0_5px_rgba(0,245,255,0.5)]">Homepage Stats</label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {content.stats.map((s, i) => (
                      <div key={i} className="flex gap-2">
                        <input value={s.value} onChange={(e) => { const st = [...content.stats]; st[i] = { ...s, value: e.target.value }; setContent({ ...content, stats: st }); }}
                          placeholder="Value" className={inputCls + " w-24 text-center font-bold"} />
                        <input value={s.label} onChange={(e) => { const st = [...content.stats]; st[i] = { ...s, label: e.target.value }; setContent({ ...content, stats: st }); }}
                          placeholder="Label" className={inputCls + " flex-1"} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button onClick={saveContent} className={`neon-btn-solid flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all w-full sm:w-auto ${saved ? "!bg-[#00ff88] !shadow-[0_0_20px_rgba(0,255,136,0.5)]" : ""}`}>
                    {saved ? <CheckCircle size={16} /> : <Save size={16} />}
                    {saved ? "Changes Saved!" : "Save All Changes"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {(showJobForm || editingJob) && (
        <JobForm job={editingJob || newJob} onChange={(j) => editingJob ? setEditingJob(j as Job) : setNewJob(j)}
          onSave={saveJob} onCancel={() => { setEditingJob(null); setShowJobForm(false); setNewJob({ type: "Full-time", featured: false, requirements: [], logo: "💼" }); }} />
      )}
      {(showActivityForm || editingActivity) && (
        <ActivityForm act={editingActivity || newActivity} onChange={(a) => editingActivity ? setEditingActivity(a as Activity) : setNewActivity(a)}
          onSave={saveActivity} onCancel={() => { setEditingActivity(null); setShowActivityForm(false); setNewActivity({ type: "Workshop", featured: false, image: "📅" }); }} />
      )}
    </div>
  );
}
