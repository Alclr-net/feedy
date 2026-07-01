"use client";

import React, { useState } from "react";
import { MdOutlineArrowOutward, MdEmail, MdLocationOn, MdSend, MdCheck } from "react-icons/md";
import { toast, Toaster } from "sonner";

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setForm({ name: "", email: "", subject: "", message: "" });

    // Simulate a short delay then show success state
    setLoading(false);
    setSubmitted(true);
    if (submitted) {
      return toast.success("Message sent successfully!", { position: "top-center" })
    }
  };

  const contacts = [
    {
      label: "General Inquiries",
      value: "hello@feedy.app",
      href: "mailto:hello@feedy.app",
      icon: <MdEmail className="size-4" />,
    },
    {
      label: "Privacy & Data",
      value: "privacy@feedy.app",
      href: "mailto:privacy@feedy.app",
      icon: <MdEmail className="size-4" />,
    },
    {
      label: "Legal",
      value: "legal@feedy.app",
      href: "mailto:legal@feedy.app",
      icon: <MdEmail className="size-4" />,
    },
    {
      label: "Company",
      value: "converzion.pvt.ltd — India",
      href: "#",
      icon: <MdLocationOn className="size-4" />,
    },
  ];

  const subjects = [
    "General Question",
    "Bug Report",
    "Feature Request",
    "Privacy / Data Inquiry",
    "Account Issue",
    "Business / Partnership",
    "Legal",
    "Other",
  ];

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-background pb-20 font-mono text-foreground">
        {/* Header */}
        <div className="border-b border-border/40 bg-card/30">
          <div className="max-w-5xl mx-auto px-4 py-16">
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Support</span>
            <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight mt-3">Contact Us</h1>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed max-w-xl">
              Have a question, found a bug, or want to partner with us? We're a small, responsive team and we read every message.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

            {/* Left — contact info */}
            <div className="md:col-span-2 flex flex-col gap-8">
              <div>
                <h2 className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2 mb-5">
                  Direct Contacts
                </h2>
                <div className="flex flex-col gap-4">
                  {contacts.map((c, i) => (
                    <a
                      key={i}
                      href={c.href}
                      className="flex items-start gap-3 group hover:text-foreground transition-colors"
                    >
                      <span className="mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0">
                        {c.icon}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{c.label}</span>
                        <span className="text-xs text-foreground font-bold">{c.value}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="border border-border bg-card p-5 flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Response Time</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We typically respond to all inquiries within <strong className="text-foreground">1–2 business days</strong>. Privacy and legal requests are prioritised and responded to within <strong className="text-foreground">5 business days</strong>.
                </p>
              </div>
            </div>

            {/* Right — contact form */}
            <div className="md:col-span-3">
              <h2 className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2 mb-6">
                Send a Message
              </h2>


              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-card border border-border text-foreground text-xs px-3 py-2.5 placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-card border border-border text-foreground text-xs px-3 py-2.5 placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground" htmlFor="subject">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-card border border-border text-foreground text-xs px-3 py-2.5 focus:outline-none focus:border-foreground transition-colors font-mono cursor-pointer"
                  >
                    <option value="" disabled>Select a subject</option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Describe your issue or question in detail..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-card border border-border text-foreground text-xs px-3 py-2.5 placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors font-mono resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 bg-foreground text-background font-bold text-xs uppercase tracking-widest px-6 py-3 hover:bg-foreground/90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin w-3 h-3 border border-background border-t-transparent rounded-full" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <MdSend className="size-3.5" />
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
