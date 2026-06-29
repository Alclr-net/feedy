"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/className";
import { PiCoffeeDuotone } from "react-icons/pi";
import {
  MdLockOutline,
  MdOutlineMessage,
  MdOutlineAutoAwesome,
  MdOutlineBarChart,
  MdOutlinePeople,
  MdOutlineVerifiedUser,
} from "react-icons/md";

/* ══════════════════════════════════════════════════════════════
   SCROLL REVEAL HOOK
   Returns a ref + whether the element has entered the viewport.
   ══════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // only trigger once
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ══════════════════════════════════════════════════════════════
   ANIMATED COUNTER HOOK
   Counts from 0 → target over `duration` ms when `active`.
   ══════════════════════════════════════════════════════════════ */
function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active, target, duration]);

  return count;
}

/* ══════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════ */
const features = [
  {
    icon: <MdLockOutline size={20} />,
    title: "100% Anonymous",
    desc: "No sender info is ever stored. Messages arrive without names, IPs, or identifiers — zero traces.",
  },
  {
    icon: <MdOutlineMessage size={20} />,
    title: "Shareable Link",
    desc: "Get a unique link. Share it anywhere — bio, socials, email — and start receiving honest messages instantly.",
  },
  {
    icon: <MdOutlineAutoAwesome size={20} />,
    title: "AI Suggestions",
    desc: "Our AI generates mood-matched message starters so senders always know what to say.",
  },
  {
    icon: <MdOutlineVerifiedUser size={20} />,
    title: "Moderation Controls",
    desc: "Block, filter, or ignore messages. You stay in control of what you read.",
  },
  {
    icon: <MdOutlineBarChart size={20} />,
    title: "Feedback Analytics",
    desc: "Spot trends across messages — mood patterns, keyword frequency, and sentiment over time.",
  },
  {
    icon: <MdOutlinePeople size={20} />,
    title: "Built for Teams",
    desc: "Collect team feedback, retrospectives, or anonymous standups — no sign-in required for senders.",
  },
];

const steps = [
  {
    step: "01",
    title: "Create your account",
    desc: "Sign up in seconds. No credit card required. Your personal Feedy page is ready immediately.",
  },
  {
    step: "02",
    title: "Share your link",
    desc: "Post your feedy.app/u/username link to your bio, story, or anywhere you want feedback.",
  },
  {
    step: "03",
    title: "Receive honest messages",
    desc: "Anyone can send you an anonymous message — no login, no tracking, no judgment.",
  },
];

const stats = [
  { value: 2000000, display: "2M+",    label: "Messages sent",            numeric: true  },
  { value: 120000,  display: "120K+",  label: "Active users",             numeric: true  },
  { value: 999,     display: "99.9%",  label: "Uptime",                   numeric: false },
  { value: 0,       display: "0",      label: "Sender identities stored", numeric: true  },
];

const testimonials = [
  {
    handle: "@design_rachit",
    text: "I got feedback I never would have heard otherwise. Feedy changed how I understand my audience.",
  },
  {
    handle: "@priya_codes",
    text: "Used it for a team retrospective. The honesty was refreshing. Zero awkwardness.",
  },
  {
    handle: "@yusuf_creates",
    text: "The AI suggestions are actually good. My friends say the messages feel so natural.",
  },
  {
    handle: "@alex_secret",
    text: "Simple, fast, private. Exactly what I wanted. No clutter, just the messages.",
  },
];

const values = [
  {
    label: "Privacy first",
    desc: "Every product decision starts with the question: does this protect anonymity?",
  },
  {
    label: "Radical honesty",
    desc: "We believe the world works better when people can say what they actually think.",
  },
  {
    label: "Zero bloat",
    desc: "No tracking pixels, no notifications dark-pattern, no upsell walls. Just the product.",
  },
  {
    label: "Open ethos",
    desc: "We share our roadmap, our mistakes, and our plans — because transparency builds trust.",
  },
];

/* ══════════════════════════════════════════════════════════════
   SHARED: FADE-UP WRAPPER
   ══════════════════════════════════════════════════════════════ */
function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SHARED: SECTION HEADING
   ══════════════════════════════════════════════════════════════ */
function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <FadeUp className="flex flex-col items-center text-center gap-3 mb-14">
      <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-mono border border-neutral-800 px-3 py-1">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold uppercase text-white leading-tight font-mono">
        {title}
      </h2>
      {sub && (
        <p className="text-neutral-500 text-sm max-w-lg leading-relaxed font-mono">
          {sub}
        </p>
      )}
    </FadeUp>
  );
}

/* ══════════════════════════════════════════════════════════════
   STAT CARD (animated counter)
   ══════════════════════════════════════════════════════════════ */
function StatCard({ stat, delay }: { stat: typeof stats[number]; delay: number }) {
  const { ref, inView } = useInView(0.3);
  const count = useCounter(stat.value, 1800, inView && stat.numeric);

  const display = stat.numeric
    ? stat.value >= 1_000_000
      ? (count / 1_000_000).toFixed(count / 1_000_000 >= 1 ? 0 : 1) + "M+"
      : stat.value >= 1_000
      ? (count / 1_000).toFixed(count / 1_000 >= 100 ? 0 : 0) + "K+"
      : count.toString()
    : inView
    ? stat.display
    : "—";

  return (
    <div
      ref={ref}
      className="bg-black px-8 py-10 flex flex-col items-center text-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <span className="text-4xl font-bold text-white font-mono tracking-tight tabular-nums">
        {display}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-neutral-600 font-mono mt-2">
        {stat.label}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTIONS
   ══════════════════════════════════════════════════════════════ */

/* ── Stats ────────────────────────────────────────────────── */
export function StatsSection() {
  return (
    <section className="bg-black border-t border-neutral-900 py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-900">
        {stats.map((s, i) => (
          <StatCard key={i} stat={s} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}

/* ── Features ─────────────────────────────────────────────── */
export function FeaturesSection() {
  return (
    <section id="features" className="bg-black border-t border-neutral-900 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="What you get"
          title="Everything you need, nothing you don't."
          sub="Feedy is purpose-built for honest, anonymous communication. No noise, no compromise."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-900">
          {features.map((f, i) => (
            <FadeUp key={i} delay={i * 60} className="group bg-black p-8 flex flex-col gap-4 cursor-default hover:bg-neutral-950 transition-colors duration-300">
              <div className="w-9 h-9 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:border-neutral-500 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                {f.icon}
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white font-mono group-hover:tracking-[0.2em] transition-all duration-300">
                {f.title}
              </h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed font-mono group-hover:text-neutral-400 transition-colors duration-300">
                {f.desc}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How It Works ─────────────────────────────────────────── */
export function HowItWorksSection() {
  return (
    <section className="bg-[#030303] border-t border-neutral-900 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="3 simple steps"
          title="Up and running in under a minute."
        />
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Animated connector line */}
          <AnimatedLine />
          {steps.map((s, i) => (
            <FadeUp
              key={i}
              delay={i * 150}
              className="relative flex flex-col items-center text-center px-8 py-6 z-10 group"
            >
              <div className="w-16 h-16 border border-neutral-700 bg-[#030303] flex items-center justify-center mb-6 group-hover:border-neutral-400 transition-colors duration-300 group-hover:scale-105 transition-transform">
                <span className="text-2xl font-bold text-white font-mono tracking-tighter">
                  {s.step}
                </span>
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white font-mono mb-3">
                {s.title}
              </h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed font-mono max-w-xs">
                {s.desc}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Animated horizontal connector line for how-it-works */
function AnimatedLine() {
  const { ref, inView } = useInView(0.3);
  return (
    <div
      ref={ref}
      className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-neutral-900 z-0 overflow-hidden"
    >
      <div
        style={{
          width: inView ? "100%" : "0%",
          transition: "width 1.2s ease 0.3s",
          height: "1px",
          background: "linear-gradient(90deg, transparent, #404040, transparent)",
        }}
      />
    </div>
  );
}

/* ── Testimonials ─────────────────────────────────────────── */
export function TestimonialsSection() {
  return (
    <section className="bg-[#030303] border-t border-neutral-900 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Real people, real honesty"
          title="What users are saying."
          sub="Thousands of people are already sharing and receiving honest feedback with Feedy."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-900">
          {testimonials.map((t, i) => (
            <FadeUp
              key={i}
              delay={i * 80}
              className="bg-black p-6 flex flex-col gap-4 group hover:bg-neutral-950 transition-colors duration-300 cursor-default"
            >
              <span className="text-3xl text-neutral-700 font-serif leading-none select-none group-hover:text-neutral-500 transition-colors duration-300">"</span>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-mono flex-1 group-hover:text-neutral-300 transition-colors duration-300">
                {t.text}
              </p>
              <span className="text-[10px] text-neutral-600 font-mono border-t border-neutral-900 pt-3">
                {t.handle}
              </span>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── About Section ────────────────────────────────────────── */
export function AboutSection() {
  return (
    <section id="about" className="bg-black border-t border-neutral-900 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Our story"
          title="Built for honesty."
          sub="Feedy started from a simple question: what if you could hear what people actually think?"
        />

        {/* Story + visual split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-900 mb-px">
          {/* Left: origin story */}
          <FadeUp className="bg-black p-10 flex flex-col gap-5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 font-mono">
              Origin
            </span>
            <p className="text-sm text-neutral-400 leading-loose font-mono">
              Most feedback never gets said. In meetings, in friendships, in teams — people filter
              themselves. Feedy was built to remove that friction. A link you share. A message
              anyone can send. No identity attached, ever.
            </p>
            <p className="text-sm text-neutral-400 leading-loose font-mono">
              We launched quietly in 2024. Within weeks it became clear people had a lot to say —
              when given a safe space to say it. Today Feedy carries over 2 million anonymous
              messages and we're just getting started.
            </p>
          </FadeUp>

          {/* Right: ASCII-style decorative terminal */}
          <FadeUp delay={120} className="bg-[#050505] p-10 font-mono text-[11px] text-neutral-600 leading-loose select-none">
            <div className="text-neutral-500 mb-2 text-[10px] uppercase tracking-widest">feedy — terminal</div>
            <div className="border-b border-neutral-900 mb-4" />
            <div><span className="text-green-600">$</span> feedy init</div>
            <div className="text-neutral-700">  creating your anonymous inbox…</div>
            <div><span className="text-green-600">✓</span> link ready: feedy.app/u/<span className="text-white">you</span></div>
            <div className="mt-3"><span className="text-green-600">$</span> feedy messages --unread</div>
            <div className="text-neutral-700">  3 new anonymous messages</div>
            <div>  <span className="text-neutral-400">[1]</span> "Your talk last week genuinely…"</div>
            <div>  <span className="text-neutral-400">[2]</span> "Honest feedback: the design…"</div>
            <div>  <span className="text-neutral-400">[3]</span> "I never told you this but…"</div>
            <div className="mt-3"><span className="text-green-600">$</span> <span className="animate-pulse text-neutral-500">_</span></div>
          </FadeUp>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-900">
          {values.map((v, i) => (
            <FadeUp
              key={i}
              delay={i * 70}
              className="bg-black p-8 flex flex-col gap-3 group hover:bg-neutral-950 transition-colors duration-300 cursor-default"
            >
              <div className="w-px h-6 bg-neutral-700 group-hover:bg-neutral-400 transition-colors duration-300" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
                {v.label}
              </h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed font-mono group-hover:text-neutral-400 transition-colors duration-300">
                {v.desc}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Section ──────────────────────────────────────────── */
export function CTASection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="bg-black border-t border-neutral-900 py-24 px-4 overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.025) 0%, transparent 70%)",
        }}
      />
      <div
        ref={ref}
        className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6 relative"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div
          className="p-3 border border-neutral-800 bg-[#0a0a0a]"
          style={{
            transform: inView ? "rotate(0deg) scale(1)" : "rotate(-10deg) scale(0.8)",
            transition: "transform 0.6s ease 0.2s",
          }}
        >
          <PiCoffeeDuotone size={28} className="text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold uppercase text-white leading-tight font-mono">
          Ready to hear the truth?
        </h2>
        <p className="text-neutral-500 text-sm font-mono max-w-md leading-relaxed">
          Create your free Feedy account today and start receiving honest, anonymous messages from anyone.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <button className="bg-white text-black font-bold text-xs uppercase tracking-widest px-8 py-3 hover:bg-neutral-200 transition-all duration-200 active:scale-95 hover:tracking-[0.2em]">
            Get started — it's free
          </button>
          <button className="border border-neutral-700 text-neutral-400 font-bold text-xs uppercase tracking-widest px-8 py-3 hover:border-neutral-400 hover:text-white transition-all duration-200 active:scale-95">
            See Pricing
          </button>
        </div>
        <p className="text-[10px] text-neutral-700 font-mono">
          No credit card required · Free forever plan available
        </p>
      </div>
    </section>
  );
}
