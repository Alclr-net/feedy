"use client";

import React, { useState, useEffect, useRef } from "react";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "neutral" | "help";
}

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scrolls terminal to bottom without scrolling the parent browser window
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  // Initial boot simulation
  useEffect(() => {
    const sequence = [
      { delay: 400, text: "feedy init", type: "input" },
      { delay: 1000, text: "creating your anonymous inbox...", type: "neutral" },
      { delay: 1800, text: "✓ inbox ready: feedy.app/u/you", type: "success" },
      { delay: 2400, text: "feedy messages", type: "input" },
      { delay: 3000, text: "3 new anonymous messages loaded:", type: "neutral" },
      { delay: 3400, text: '[1] "Your talk last week genuinely inspired me to start coding!"', type: "output" },
      { delay: 3800, text: '[2] "Honest feedback: the dashboard design could use some more contrast."', type: "output" },
      { delay: 4200, text: '[3] "I never told you this, but thanks for being a great mentor."', type: "output" },
      { delay: 4800, text: 'Type "help" to see available commands.', type: "help" },
    ];

    let currentTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
    const runSequence = (index: number) => {
      if (index >= sequence.length) return;

      const step = sequence[index];
      currentTimeout = setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          { text: step.text, type: step.type as TerminalLine["type"] },
        ]);
        runSequence(index + 1);
      }, step.delay);
    };

    runSequence(0);

    return () => {
      clearTimeout(currentTimeout);
    };
  }, []);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim().toLowerCase();
    if (!command) return;

    // Append user input to history
    const newHistory = [...history, { text: inputValue, type: "input" as const }];
    setHistory(newHistory);
    setInputValue("");

    // Command parser
    setTimeout(() => {
      const parts = command.split(" ");
      const mainCommand = parts[0];
      const args = parts.slice(1).join(" ");

      switch (mainCommand) {
        case "help":
          setHistory((prev) => [
            ...prev,
            { text: "Available commands:", type: "neutral" },
            { text: "  about    - What is Feedy?", type: "neutral" },
            { text: "  feedy    - interact with the feedy CLI (e.g., feedy init, feedy stats)", type: "neutral" },
            { text: "  social   - get links to Alclr-net profiles", type: "neutral" },
            { text: "  clear    - clear the terminal screen", type: "neutral" },
            { text: "  help     - show this help screen", type: "neutral" },
          ]);
          break;

        case "about":
          setHistory((prev) => [
            ...prev,
            { text: "Feedy is a purpose-built anonymous feedback platform. It provides shareable bio links, AI message helpers, and analytics dashboards while guaranteeing 100% sender privacy.", type: "output" },
          ]);
          break;

        case "clear":
          setHistory([]);
          break;

        case "social":
          setHistory((prev) => [
            ...prev,
            { text: "★ Connected Social Accounts ★", type: "success" },
            { text: "  • GitHub: https://github.com/Alclr-net", type: "neutral" },
            { text: "  • Twitter/X: https://x.com/seth_rachit_", type: "neutral" },
            { text: "  • Discord: seth_rachit", type: "neutral" },
            { text: "  • LinkedIn: https://linkedin.com/in/sethrachit", type: "neutral" },
          ]);
          break;

        case "feedy":
          if (args === "init") {
            setHistory((prev) => [
              ...prev,
              { text: "creating your anonymous inbox...", type: "neutral" },
              { text: "✓ inbox ready: feedy.app/u/guest_" + Math.floor(Math.random() * 1000), type: "success" },
            ]);
          } else if (args === "stats") {
            setHistory((prev) => [
              ...prev,
              { text: "Feedy Platform Live Stats:", type: "success" },
              { text: "  • Total messages sent: 2,492,082", type: "neutral" },
              { text: "  • Active monthly users: 120,490", type: "neutral" },
              { text: "  • System Uptime: 99.99%", type: "neutral" },
              { text: "  • Sender identities stored: 0 (True anonymity)", type: "neutral" },
            ]);
          } else if (args === "messages") {
            const mockFeedback = [
              '"The product interface flows nicely."',
              '"Your side-project looks clean, keep shipping!"',
              '"Honest feedback: add a light-theme option."',
              '"Loved the talk you gave on open-source scaling."',
              '"The AI suggestions really helped write this message!"',
            ];
            const selected: any = [];
            while (selected.length < 3) {
              const item = mockFeedback[Math.floor(Math.random() * mockFeedback.length)];
              if (!selected.includes(item)) selected.push(item);
            }
            setHistory((prev) => [
              ...prev,
              { text: "Retrieved 3 random anonymous messages:", type: "neutral" },
              { text: `[1] ${selected[0]}`, type: "output" },
              { text: `[2] ${selected[1]}`, type: "output" },
              { text: `[3] ${selected[2]}`, type: "output" },
            ]);
          } else {
            setHistory((prev) => [
              ...prev,
              { text: "Usage: feedy [init | stats | messages]", type: "neutral" },
            ]);
          }
          break;

        default:
          setHistory((prev) => [
            ...prev,
            { text: `command not found: ${command}. Type "help" for options.`, type: "error" },
          ]);
      }
    }, 150);
  };

  return (
    <div
      onClick={handleTerminalClick}
      className={`bg-neutral-950 text-neutral-300 p-6 rounded-lg font-mono text-[11px] border border-neutral-900 transition-all duration-300 relative h-full flex flex-col justify-between cursor-text ${isFocused ? "border-neutral-700 ring-1 ring-neutral-700/25" : "border-neutral-900"
        }`}
    >
      {/* Terminal Title Bar */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="text-neutral-500 text-[10px] uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            feedy — terminal
          </div>
        </div>
        <div className="border-b border-neutral-900 mb-4" />
      </div>

      {/* Terminal Output Stream */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto pr-2 space-y-2 mb-4 scrollbar-thin scrollbar-thumb-neutral-800"
      >
        {history.map((line, idx) => {
          if (line.type === "input") {
            return (
              <div key={idx} className="flex items-start gap-1">
                <span className="text-emerald-500 font-bold shrink-0 select-none">$</span>
                <span className="text-neutral-100 font-semibold break-all">{line.text}</span>
              </div>
            );
          } else if (line.type === "success") {
            return (
              <div key={idx} className="text-emerald-400 break-words font-medium">
                {line.text}
              </div>
            );
          } else if (line.type === "error") {
            return (
              <div key={idx} className="text-rose-500 break-words font-medium">
                {line.text}
              </div>
            );
          } else if (line.type === "help") {
            return (
              <div key={idx} className="text-cyan-400 break-words font-semibold">
                {line.text}
              </div>
            );
          } else if (line.type === "output") {
            return (
              <div key={idx} className="text-neutral-100 pl-3 border-l border-neutral-800 italic break-words">
                {line.text}
              </div>
            );
          } else {
            return (
              <div key={idx} className="text-neutral-400 break-words">
                {line.text}
              </div>
            );
          }
        })}
      </div>

      {/* Terminal Input Line */}
      <form onSubmit={handleCommandSubmit} className="flex items-center gap-1.5 mt-auto shrink-0">
        <span className="text-emerald-500 font-bold select-none">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-neutral-100 font-semibold font-mono text-[11px] p-0 m-0 cursor-text min-w-0"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
