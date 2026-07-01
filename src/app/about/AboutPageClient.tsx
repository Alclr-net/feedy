"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MdOutlineArrowOutward, MdShield, MdLock, MdPublic, MdVisibilityOff } from "react-icons/md";

export default function AboutPageClient() {
  const values = [
    {
      icon: <MdShield className="size-5 text-foreground" />,
      title: "Privacy First",
      desc: "Every product choice begins with a simple question: does this protect sender anonymity? We don't log IPs, user agents, or metadata.",
    },
    {
      icon: <MdLock className="size-5 text-foreground" />,
      title: "Secure by Design",
      desc: "Messages are stored securely using database-level isolation. Senders can speak freely knowing their identity is mathematically unlinked.",
    },
    {
      icon: <MdVisibilityOff className="size-5 text-foreground" />,
      title: "Zero Tracking",
      desc: "We don't sell user data, use tracking pixels, or feed advertisements. Feedy is clean, fast, and completely untracked.",
    },
    {
      icon: <MdPublic className="size-5 text-foreground" />,
      title: "Open Ethos",
      desc: "We believe in building in public. We share our mistakes, roadmap, and design choices because transparency is the foundation of trust.",
    },
  ];

  const faqs = [
    {
      q: "Is it really completely anonymous?",
      a: "Yes. When a sender writes a message, it is stored in isolation. We strip the sender's IP address, user agent, and browser fingerprints before it ever touches our database. Senders do not need to sign in or leave any trace.",
    },
    {
      q: "How do you handle moderation and abuse?",
      a: "We provide users with advanced moderation controls. You can toggle off message acceptance at any time, block abusive links, and delete unwanted messages instantly from your dashboard. We also run automated content filtering to block malicious script injections.",
    },
    {
      q: "Is Feedy free to use?",
      a: "Yes. The core experience of Feedy is and will always be free. Anyone can register, get a custom link, and start receiving unlimited anonymous messages.",
    },
    {
      q: "Who is behind Feedy?",
      a: "Feedy is built by converzion.pvt.ltd. We are a small team of engineers and designers passionate about creating open, premium web experiences that respect user privacy.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 font-mono text-foreground">
      <Container className="max-w-4xl mx-auto flex flex-col gap-16">
        
        {/* Hero Section */}
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <p className="inline-block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Our Mission
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-tight">
            Honesty without
            <br />
            compromise.
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed mt-2">
            Most feedback never gets said out loud. In friendships, in teams, and in communities, people filter themselves to avoid conflict. Feedy is built to remove that friction, providing a safe space to speak freely, share honestly, and connect authentically through anonymous messages, anonymous feedback, and anonymous questions.
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2 mb-6">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
              {values.map((v, i) => (
                <div key={i} className="bg-background p-6 flex flex-col gap-4">
                  <div className="w-9 h-9 border border-border flex items-center justify-center bg-card">
                    {v.icon}
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest">{v.title}</h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Architecture details */}
        <div className="flex flex-col gap-6 border border-border bg-card p-6 sm:p-8">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-widest text-green-600 font-bold">
              SYSTEM REPORT: SECURITY_STATUS_SECURE
            </span>
            <h2 className="text-lg font-bold uppercase tracking-wider">
              Anonymity Architecture
            </h2>
          </div>
          <p className="text-xs text-muted-foreground leading-loose">
            To ensure complete sender anonymity, Feedy operates a zero-knowledge data ingestion layer. 
            When an anonymous message payload is dispatched, it traverses a proxy layer that strips off transport-level network identifiers. 
            No HTTP session identifiers, cookies, or device profiles are recorded alongside messages. 
            Consequently, it is mathematically impossible to reconstruct the identity of a sender from the database records alone — making Feedy the most privacy-respecting anonymous messaging platform available.
          </p>
          <div className="border-t border-border/40 pt-4 mt-2 flex justify-between items-center text-[10px] text-muted-foreground">
            <span>DATABASE ISOLATION: ENABLED</span>
            <span>DATA RETENTION: ZERO_TRACKING</span>
          </div>
        </div>

        {/* FAQs */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2 mb-2">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-6">
            {faqs.map((f, i) => (
              <div key={i} className="flex flex-col gap-2">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Q: {f.q}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed pl-4">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div className="flex flex-col items-center justify-center text-center gap-6 py-12 border-t border-border/40">
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
            Ready to receive anonymous messages?
          </h2>
          <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
            Create your anonymous link today and start collecting honest anonymous feedback, anonymous questions, and anonymous confessions from anyone — completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/signup"
              className="bg-foreground text-background text-xs font-bold uppercase tracking-widest px-8 py-3 hover:bg-foreground/90 transition-all active:scale-95 flex items-center justify-center gap-1"
            >
              Get started — it's free
              <MdOutlineArrowOutward />
            </Link>
          </div>
        </div>

      </Container>
    </div>
  );
}
