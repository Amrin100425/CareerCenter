"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { defaultContent } from "@/lib/store";

export default function ContactPage() {
  const content = defaultContent;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  return (
    <div className="min-h-screen neon-bg relative overflow-hidden">
      {/* Ambient Light */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] rounded-full pointer-events-none opacity-20" style={{ background: "radial-gradient(ellipse, #00f5ff 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="py-16 px-4 relative z-10" style={{ background: "rgba(var(--bg-rgb), 0.4)", borderBottom: "1px solid rgba(0,245,255,0.1)" }}>
        <div className="max-w-4xl mx-auto text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#00f5ff", textShadow: "0 0 10px rgba(0,245,255,0.4)" }}>Get in Touch</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[rgb(var(--fg-rgb))] tracking-wider">Contact Us</h1>
          <p className="mt-4 font-light text-[rgb(var(--muted-400-rgb))]">We&apos;re here to help with career questions or employer inquiries.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl p-8 border border-[rgba(0,245,255,0.15)] shadow-[0_0_20px_rgba(0,0,0,0.5)] h-full">
              <h2 className="font-display font-bold text-xl mb-8 text-[rgb(var(--fg-rgb))] tracking-wide border-b border-[rgba(var(--fg-rgb),0.05)] pb-4">Contact Information</h2>
              <div className="space-y-6">
                {[
                  { icon: <MapPin style={{ color: "#ff0080" }} size={22} />, title: "Address", val: content.address, glow: "rgba(255,0,128,0.2)" },
                  { icon: <Phone style={{ color: "#00f5ff" }} size={22} />, title: "Phone", val: content.contactPhone, glow: "rgba(0,245,255,0.2)" },
                  { icon: <Mail style={{ color: "#bf00ff" }} size={22} />, title: "Email", val: content.contactEmail, glow: "rgba(191,0,255,0.2)" },
                  { icon: <Clock style={{ color: "#00ff88" }} size={22} />, title: "Hours", val: "From: 7:00 AM – 9:30 PM\nMonday - Saturday", glow: "rgba(0,255,136,0.2)" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5 p-5 rounded-xl bg-[rgba(var(--bg-rgb),0.6)] border border-[rgba(var(--fg-rgb),0.05)] hover:border-[rgba(0,245,255,0.2)] transition-colors group">
                    <div className="w-12 h-12 bg-[var(--bg-hex)] rounded-xl flex items-center justify-center shrink-0 border border-[rgba(var(--fg-rgb),0.1)] transition-all duration-300" style={{ boxShadow: `0 0 15px ${item.glow}` }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[rgb(var(--muted-500-rgb))] uppercase tracking-widest mb-1">{item.title}</p>
                      <p className="text-sm font-medium whitespace-pre-line text-[rgb(var(--fg-rgb))] tracking-wide leading-relaxed">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[var(--card-hex)]/60 backdrop-blur-md rounded-2xl p-8 border border-[rgba(0,245,255,0.15)] shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Form Ambient Light */}
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-10" style={{ background: "radial-gradient(circle, #bf00ff 0%, transparent 70%)", filter: "blur(40px)" }} />

            <div className="relative z-10">
              {sent ? (
                <div className="text-center py-20">
                  <CheckCircle size={64} className="mx-auto mb-6 text-[#00ff88] drop-shadow-[0_0_15px_rgba(0,255,136,0.5)]" />
                  <h3 className="font-display font-bold text-2xl mb-3 text-[rgb(var(--fg-rgb))] tracking-wider">Message Sent!</h3>
                  <p className="text-[rgb(var(--muted-400-rgb))] text-sm mb-8 font-light">We&apos;ll get back to you within 1–2 business days.</p>
                  <button onClick={() => setSent(false)} className="neon-btn-outline px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest">Send another message</button>
                </div>
              ) : (
                <>
                  <h2 className="font-display font-bold text-xl mb-8 text-[rgb(var(--fg-rgb))] tracking-wide border-b border-[rgba(var(--fg-rgb),0.05)] pb-4">Send a Message</h2>
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      {[
                        { key: "name", label: "Full Name", placeholder: "Your name" },
                        { key: "email", label: "Email", placeholder: "your@email.com", type: "email" },
                      ].map((f) => (
                        <div key={f.key}>
                          <label className="text-xs text-[rgb(var(--muted-400-rgb))] font-semibold uppercase tracking-widest mb-2 block">{f.label}</label>
                          <input required type={f.type || "text"} value={(form as Record<string, string>)[f.key]}
                            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                            className="w-full bg-[rgba(var(--bg-rgb),0.3)] border border-[rgba(var(--fg-rgb),0.1)] rounded-xl px-4 py-3 text-sm text-[rgb(var(--fg-rgb))] outline-none placeholder-[rgb(var(--muted-500-rgb))] focus:border-[#00f5ff] focus:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all"
                            placeholder={f.placeholder} />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="text-xs text-[rgb(var(--muted-400-rgb))] font-semibold uppercase tracking-widest mb-2 block">Subject</label>
                      <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full bg-[rgba(var(--bg-rgb),0.3)] border border-[rgba(var(--fg-rgb),0.1)] rounded-xl px-4 py-3 text-sm text-[rgb(var(--fg-rgb))] outline-none placeholder-[rgb(var(--muted-500-rgb))] focus:border-[#00f5ff] focus:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all"
                        placeholder="How can we help?" />
                    </div>
                    <div>
                      <label className="text-xs text-[rgb(var(--muted-400-rgb))] font-semibold uppercase tracking-widest mb-2 block">Message</label>
                      <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-[rgba(var(--bg-rgb),0.3)] border border-[rgba(var(--fg-rgb),0.1)] rounded-xl px-4 py-3 text-sm text-[rgb(var(--fg-rgb))] outline-none resize-none placeholder-[rgb(var(--muted-500-rgb))] focus:border-[#00f5ff] focus:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all"
                        placeholder="Write your message..." />
                    </div>
                    <button type="submit" className="neon-btn-solid w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 uppercase tracking-widest text-sm mt-4">
                      <Send size={16} /> Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
