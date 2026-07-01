"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";
import { cn } from "@/lib/className";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API call for newsletter subscription
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    toast.success("Thank you for subscribing to Feedy updates!");
    setEmail("");
  };

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "How It Works", href: "/#how-it-works" },
        { label: "Security", href: "/privacy-policy" },
        { label: "Get Started", href: "/signup" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-black border-t border-neutral-900 text-neutral-400 font-mono py-16 px-4 relative overflow-hidden">
      {/* Decorative gradient blur background */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neutral-900/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-neutral-900/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Brand & Tagline */}
        <div className="col-span-1 md:col-span-4 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 text-white group">
              <span className="text-2xl text-white transition-transform duration-300 group-hover:rotate-12">
                <img src="/feedy-favicons/favicon.svg" alt="Feedy Logo" className="w-6 h-6 rounded-md object-contain inline-block" />
              </span>

            </Link>
            <p className="text-sm text-neutral-500 max-w-sm leading-relaxed">
              Everyone has something to say, but not always the courage to say it out loud.
              We make it easy to be honest, open, and completely anonymous.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2 bg-neutral-950 border border-neutral-900 rounded-lg text-neutral-400 hover:text-white hover:border-neutral-700 hover:scale-105 transition duration-200"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="p-2 bg-neutral-950 border border-neutral-900 rounded-lg text-neutral-400 hover:text-white hover:border-neutral-700 hover:scale-105 transition duration-200"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
              className="p-2 bg-neutral-950 border border-neutral-900 rounded-lg text-neutral-400 hover:text-white hover:border-neutral-700 hover:scale-105 transition duration-200"
            >
              <FaDiscord size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2 bg-neutral-950 border border-neutral-900 rounded-lg text-neutral-400 hover:text-white hover:border-neutral-700 hover:scale-105 transition duration-200"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        {/* Dynamic Navigation Links */}
        <div className="col-span-1 md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {footerLinks.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors duration-200 block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="col-span-1 md:col-span-3 space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">
            Stay Updated
          </h3>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Subscribe to our newsletter for features, design logs, and updates.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-neutral-950 border border-neutral-900 rounded-lg px-4 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-neutral-700 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full bg-white text-black font-semibold text-sm py-2  hover:bg-neutral-200 transition duration-200 cursor-pointer disabled:opacity-50",
                loading && "cursor-not-allowed"
              )}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
        <p>© {new Date().getFullYear()} Feedy Inc. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made by converzion.pvt.ltd
        </p>
      </div>
    </footer>
  );
};
