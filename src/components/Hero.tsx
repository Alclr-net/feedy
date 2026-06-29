"use client"
import LaserFlow from '@/components/LaserFlow';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/className';
import { PiCoffeeDuotone } from "react-icons/pi";
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';

export default function LaserFlowBox() {
  const revealImgRef = useRef<HTMLImageElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [messageInput, setMessageInput] = useState<string>("");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const moods = ["Happy", "Neutral", "Sad", "Frustrated", "Angry"];

  const suggestions = [
    "Really happy with the results! You nailed it!",
    "Just wanted to say you bring so much positive energy!",
    "Here is some honest, anonymous feedback for you.",
    "Hope things get better soon. Hang in there.",
  ];

  // Update reveal image position on mouse move relative to wrapper
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const el = revealImgRef.current;
    if (el) {
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    }
  };

  const handleMouseLeave = () => {
    const el = revealImgRef.current;
    if (el) {
      el.style.setProperty('--mx', '-9999px');
      el.style.setProperty('--my', '-9999px');
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

  return (
    <div
      ref={wrapperRef}
      style={{ backgroundColor: 'black' }}
      className="relative w-full min-h-[1200px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hero Text Section */}
      <div className="absolute top-25 left-10 z-0">
        <div className="relative flex flex-col items-center justify-center text-center mt-30">
          {/* Tagline */}
          <p className="text-xs bg-neutral-200/10 py-1 px-2 text-neutral-400 mb-3 outline-neutral-50/40 outline-double">
            Trusted by millions of people
          </p>

          {/* H1 */}
          <h1 className="text-5xl uppercase font-bold text-white leading-tight">
            We'll keep your name
            <br />
            a secret
          </h1>

          {/* Subheading */}
          <p className="text-neutral-400 mt-4 max-w-xl text-md">
            Everyone has something to say but not always the courage to say it out loud. We make it easy for people to be honest, open, and completely anonymous.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 mt-6">
            <button className="bg-white text-black font-normal px-4 py-2 hover:bg-neutral-200 transition">
              Send Messages
            </button>
            <button className="border border-neutral-600 text-white font-normal px-4 py-2 hover:bg-neutral-800 transition">
              Pricing
            </button>
          </div>
        </div>
      </div>

      {/* LaserFlow Background — fills the entire hero */}
      <div className="absolute inset-0 z-0 w-full h-full ">
        <LaserFlow
          horizontalBeamOffset={0.1}
          verticalBeamOffset={0.0}
          color="#ffffff"
        />
      </div>

      {/* Mock Browser Window */}
      <div
        className={cn(
          "absolute top-[48%] left-1/2 -translate-x-1/2 w-[86%] max-w-4xl h-[48%] md:h-[52%]",
          "bg-black border border-neutral-800 flex flex-col overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]",
          "z-10 transition-all duration-500 border-neutral-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.08)]",
          "group/browser z-0 "
        )}
      >
        {/* Browser Window Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a] border-b border-neutral-900 select-none shrink-0">
          {/* Traffic light dots */}
          <div className="flex gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
          </div>
          {/* URL Bar */}
          <div className="bg-[#121212] border border-neutral-800 rounded-md px-3 py-1 text-[10px] text-neutral-500 flex items-center gap-1.5 max-w-xs w-full justify-center">
            <span className="text-[10px] text-neutral-600">
              <PiCoffeeDuotone />
            </span>
            <span className="tracking-wide text-neutral-500">feedy.app/u/alex_secret</span>
          </div>
          <div className="w-12"></div>
        </div>

        {/* Browser Window Body */}
        <div className="flex-1 overflow-y-auto bg-black p-4 md:p-6 flex flex-col items-center gap-5 scrollbar-thin">
          <h2 className="text-xs md:text-sm font-bold text-center text-white font-mono tracking-widest uppercase relative after:content-[''] after:block after:w-12 after:h-0.5 after:bg-neutral-600 after:mx-auto after:mt-2 select-none">
            We help you stay Anonymous.
          </h2>

          {/* Message Form */}
          <div className="w-full max-w-2xl flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="mock-message" className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold font-mono select-none">
                Message
              </label>
              <textarea
                id="mock-message"
                placeholder="Type your message here."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex min-h-[72px] w-full rounded-none border border-neutral-700 bg-transparent px-3 py-2 text-xs text-white transition-colors outline-none placeholder:text-neutral-600 focus:border-neutral-500 font-mono resize-none"
              />
            </div>
            <button
              onClick={handleSendMessage}
              className="bg-white hover:bg-neutral-200 text-black px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition cursor-pointer self-start rounded-none active:scale-95 w-full"
            >
              Send message
            </button>
          </div>
          <div className={cn("flex w-full max-w-2xl")}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Choose your mood</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {moods.map((mood, idx) => (
                  <DropdownMenuItem key={idx}>
                    {mood}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* AI Suggestions List — no dropdown, always visible */}
          <div className="w-full max-w-2xl flex flex-col gap-1 border border-neutral-400">

            <div className="flex flex-col border border-neutral-900 bg-[#060606]">
              {suggestions.map((s, index) => (
                <div
                  key={index}
                  className={cn(
                    "border-b border-neutral-900 last:border-b-0 px-3 py-2 w-full flex justify-between items-center gap-4",
                    "transition-colors duration-150",
                    selectedIdx === index ? "bg-neutral-900/60" : "hover:bg-neutral-900/30"
                  )}
                >
                  <p className="text-[10px] text-neutral-400 truncate flex-1 font-mono">{s}</p>
                  <button
                    onClick={() => handleSelection(s, index)}
                    className={cn(
                      "border text-[9px] font-mono px-2 py-1 transition-all duration-150 cursor-pointer shrink-0 active:scale-95",
                      selectedIdx === index
                        ? "bg-neutral-200 border-neutral-400 text-neutral-900"
                        : "bg-neutral-100 border-neutral-300 text-neutral-800"
                    )}
                  >
                    {selectedIdx === index ? "✓ Selected" : "Select"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Empty Banner CTA */}
          <div className="w-full max-w-2xl border border-neutral-800 p-4 flex flex-col items-center text-center bg-[#030303] select-none">

            <p className="text-[10px] text-neutral-500 max-w-sm mt-1 leading-relaxed font-mono">
              Be completely anonymous with Feedy. Create your account and start receiving anonymous messages today.
            </p>

          </div>
        </div>
      </div>

      {/* Interactive Reveal Image (mouse-follow masked image) */}
      <img
        ref={revealImgRef}
        src="/bg_hero.jpeg"
        alt="Reveal effect"
        style={{
          position: 'absolute',
          width: '180%',
          top: '-50%',
          left: 0,
          zIndex: 5,
          mixBlendMode: 'lighten',
          opacity: 0.3,
          pointerEvents: 'none',
          ['--mx' as any]: '-9999px',
          ['--my' as any]: '-9999px',
          WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
          maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        }}
      />
    </div>
  );
}