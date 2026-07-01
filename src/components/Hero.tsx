"use client";

import LaserFlow from "@/components/LaserFlow";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/className";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";

export default function LaserFlowBox() {
  const revealImgRef = useRef<HTMLImageElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [messageInput, setMessageInput] = useState<string>("");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const moods = ["Happy", "Neutral", "Sad", "Frustrated", "Angry"];
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const suggestions = [
    "Really happy with the results! You nailed it!",
    "Just wanted to say you bring so much positive energy!",
    "Here is some honest, anonymous feedback for you.",
    "Hope things get better soon. Hang in there.",
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const el = revealImgRef.current;
    if (el) {
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }
  };

  const handleMouseLeave = () => {
    const el = revealImgRef.current;
    if (el) {
      el.style.setProperty("--mx", "-9999px");
      el.style.setProperty("--my", "-9999px");
    }
  };

  const handleSelection = (message: string, idx: number) => {
    setMessageInput(message);
    setSelectedIdx(idx);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) {
      toast.warning("Please type a message first!", { position: "top-center" });
      return;
    }
    toast.success("Create your Account to get your messages.", { position: "top-center" });
    setMessageInput("");
    setSelectedIdx(null);
  };

  // Determine current theme for LaserFlow color
  const isDark = mounted
    ? theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
    : true;

  const laserColor = isDark ? "#ffffff" : "#000000";

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden min-h-[450px] lg:min-h-[900px] flex items-center bg-background"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* LaserFlow Background */}
      <div className="absolute inset-0 z-0 w-full h-full hidden lg:block">
        <LaserFlow horizontalBeamOffset={0.3} verticalBeamOffset={0.2} color={laserColor} />
      </div>

      {/* Main Grid Container */}
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left Column (Hero Text) */}
        <div className="w-full flex flex-col items-center text-center">
          <p className="inline-block text-[10px] bg-muted/60 py-1 px-3 text-muted-foreground mb-4 outline-border outline-double tracking-widest uppercase font-mono">
            Trusted by millions of people
          </p>

          <h1
            className="uppercase font-bold text-foreground leading-tight tracking-tight font-mono"
            style={{ fontSize: "clamp(1.8rem, 6vw, 3.5rem)" }}
          >
            We'll keep your
            <br />name a secret
          </h1>

          <p className="text-muted-foreground mt-4 text-xs sm:text-sm leading-relaxed max-w-md font-mono">
            Everyone has something to say. We make it easy to be honest, open, and completely anonymous.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full sm:w-auto">
            <Link
              href="/signup"
              className="bg-foreground text-background font-mono font-bold text-xs uppercase tracking-widest px-6 py-2.5 hover:bg-foreground/90 active:scale-95 transition-all w-full sm:w-auto text-center"
            >
              Send Messages
            </Link>
            <Link
              href="/#features"
              className="border border-border text-muted-foreground font-mono font-bold text-xs uppercase tracking-widest px-6 py-2.5 hover:border-foreground hover:text-foreground active:scale-95 transition-all w-full sm:w-auto text-center"
            >
              See Features
            </Link>
          </div>
        </div>

        {/* Right Column (Mock Browser Window) */}
        <div className="w-full">
          <div className="w-full border border-border flex flex-col overflow-hidden shadow-2xl transition-shadow duration-500 bg-background">

            {/* Browser chrome */}
            <div className="flex items-center justify-between px-3 py-2 bg-muted/40 border-b border-border select-none shrink-0">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                <span className="w-2 h-2 rounded-full bg-green-500/80" />
              </div>
              <div className="bg-muted border border-border px-2 py-0.5 text-[10px] text-muted-foreground flex items-center gap-1 max-w-[180px] sm:max-w-xs w-full justify-center font-mono">
                <img src="/feedy-favicons/favicon.svg" alt="Feedy" className="w-3 h-3 rounded-sm object-contain shrink-0" />
                <span className="truncate">feedy.app/u/alex_secret</span>
              </div>
              <div className="w-8" />
            </div>

            {/* Browser body */}
            <div className="p-3 sm:p-5 flex flex-col gap-3 sm:gap-4 bg-background">
              <h2 className="text-[10px] font-bold text-center text-foreground font-mono tracking-widest uppercase after:content-[''] after:block after:w-8 after:h-px after:bg-border after:mx-auto after:mt-2 select-none">
                We help you stay Anonymous.
              </h2>

              {/* Textarea */}
              <div className="flex flex-col gap-1">
                <label htmlFor="mock-message" className="text-[9px] uppercase tracking-wider text-muted-foreground font-mono select-none font-bold">
                  Message
                </label>
                <textarea
                  id="mock-message"
                  placeholder="Type your message here."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  rows={3}
                  className="w-full border border-border bg-transparent px-3 py-2 text-xs text-foreground outline-none placeholder:text-muted-foreground/40 focus:border-foreground/40 font-mono resize-none transition-colors"
                />
              </div>

              <button
                onClick={handleSendMessage}
                className="bg-foreground hover:bg-foreground/90 text-background text-[10px] font-bold tracking-widest uppercase font-mono py-2 active:scale-95 transition-all cursor-pointer w-full"
              >
                Send message
              </button>

              {/* Mood + suggestions — hidden on xs, shown sm+ */}
              <div className="hidden sm:flex w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-[10px] h-7 font-mono">Choose your mood</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {moods.map((mood, idx) => (
                      <DropdownMenuItem key={idx} className="text-xs font-mono">{mood}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Suggestions — hidden on mobile */}
              <div className="hidden sm:flex flex-col border border-border bg-card">
                {suggestions.map((s, index) => (
                  <div
                    key={index}
                    className={cn(
                      "border-b border-border/40 last:border-b-0 px-3 py-2 flex justify-between items-center gap-3 transition-colors duration-150",
                      selectedIdx === index ? "bg-muted" : "hover:bg-muted/50"
                    )}
                  >
                    <p className="text-[10px] text-muted-foreground truncate flex-1 font-mono">{s}</p>
                    <button
                      onClick={() => handleSelection(s, index)}
                      className={cn(
                        "border text-[9px] font-mono px-2 py-0.5 transition-all cursor-pointer shrink-0 active:scale-95",
                        selectedIdx === index
                          ? "bg-black dark:bg-white text-white dark:text-black border-border"
                          : "bg-neutral-950 border-neutral-800 text-neutral-100 dark:bg-neutral-50 dark:hover:bg-neutral-300 dark:border-neutral-800 dark:text-neutral-700"
                      )}
                    >
                      {selectedIdx === index ? "✓ Selected" : "Select"}
                    </button>
                  </div>
                ))}
              </div>

              {/* CTA banner */}
              <div className="border border-border px-4 py-3 text-center bg-muted/20 select-none">
                <p className="text-[10px] text-muted-foreground leading-relaxed font-mono">
                  Be completely anonymous with Feedy — create your account today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Reveal Image (mouse-follow masked image) */}
      <img
        ref={revealImgRef}
        src="/bg_hero.jpeg"
        alt="Reveal effect"
        style={{
          position: "absolute",
          width: "180%",
          top: "-50%",
          left: 0,
          zIndex: 5,
          mixBlendMode: "lighten",
          opacity: 0.3,
          pointerEvents: "none",
          ["--mx" as any]: "-9999px",
          ["--my" as any]: "-9999px",
          WebkitMaskImage: "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
          maskImage: "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />
    </div>
  );
}