import React from "react";
import Link from "next/link";
import { Container } from "@/components/Container";

export function SeoArticle() {
  return (
    <section
      aria-label="About Feedy - Anonymous Messaging Platform"
      className="bg-background border-t border-border/30 py-20 px-4 font-mono"
    >
      <Container className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-10">

          {/* Section label */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              About Feedy
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
              The Free Anonymous Messaging &amp; Feedback Platform
            </h2>
          </div>

          {/* Article content */}
          <article className="flex flex-col gap-6 text-[12px] sm:text-[13px] text-muted-foreground leading-[1.9] max-w-3xl">

            <p>
              <strong className="text-foreground">Feedy</strong> is a free anonymous messaging platform designed for people who want to communicate openly, honestly, and without fear of judgment. Whether you want to receive <strong className="text-foreground">anonymous messages</strong>, gather <strong className="text-foreground">anonymous feedback</strong>, host an <strong className="text-foreground">anonymous question box</strong>, or collect <strong className="text-foreground">anonymous confessions</strong>, Feedy gives you a single shareable link that makes it all possible — instantly and for free.
            </p>

            <p>
              In today's social landscape, people frequently hold back honest thoughts, opinions, and emotions out of fear of social consequences. Feedy breaks that barrier. By allowing anyone to <strong className="text-foreground">send anonymous text</strong> messages, share <strong className="text-foreground">anonymous opinions</strong>, or ask <strong className="text-foreground">anonymous questions</strong> without creating an account or logging in, Feedy empowers genuine communication at scale. Whether you are a student, a creator, a teacher, or a team lead, your personal <strong className="text-foreground">anonymous profile link</strong> becomes a space for authentic interaction.
            </p>

            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mt-2">
              How Feedy Works as an Anonymous Messaging App
            </h3>

            <p>
              Getting started with Feedy is simple. Create a free account, and you instantly receive your own <strong className="text-foreground">anonymous link</strong> — a personalised URL that you can share anywhere: your social media bio, Instagram story, Twitter/X profile, WhatsApp status, or wherever your audience lives. Anyone who visits that link can <strong className="text-foreground">send anonymous messages</strong>, post <strong className="text-foreground">anonymous questions</strong>, or leave <strong className="text-foreground">anonymous feedback</strong> directly to you — no sign-up required on their end.
            </p>

            <p>
              Every message lands in your private <strong className="text-foreground">anonymous inbox</strong>, which you can manage through your dashboard. You can read, reply, delete, or archive messages. You are always in control. Feedy is also the perfect <strong className="text-foreground">digital suggestion box</strong> or <strong className="text-foreground">online suggestion box</strong> for teams, classrooms, or communities who want candid input without the politics of attribution.
            </p>

            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mt-2">
              Who Uses Feedy?
            </h3>

            <p>
              Feedy is used by a wide variety of people across the globe. Content creators use it as an <strong className="text-foreground">anonymous Q&amp;A</strong> tool for their audience. Educators set it up as an <strong className="text-foreground">anonymous question platform</strong> so students can ask freely without embarrassment. Professionals use it as an <strong className="text-foreground">anonymous feedback website</strong> to collect honest peer reviews. Couples and friends share it as an <strong className="text-foreground">anonymous confession app</strong> to express things they can't say face-to-face. No matter the use case, Feedy's clean and fast interface makes <strong className="text-foreground">anonymous communication</strong> effortless.
            </p>

            <p>
              Brands and businesses rely on Feedy as an <strong className="text-foreground">anonymous feedback app</strong> to gather unfiltered customer opinions, conduct <strong className="text-foreground">anonymous surveys</strong>, and power <strong className="text-foreground">anonymous polls</strong> — all without intimidating respondents with sign-up requirements. If you need an <strong className="text-foreground">anonymous contact form</strong> or an <strong className="text-foreground">anonymous response</strong> collection tool that just works, Feedy is the answer.
            </p>

            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mt-2">
              Privacy &amp; Security at the Core
            </h3>

            <p>
              Feedy is built on a privacy-first architecture. We do not log sender IP addresses, browser fingerprints, or device metadata. When someone sends you an <strong className="text-foreground">anonymous message</strong> through Feedy, their identity is never recorded — making it mathematically impossible to trace a message back to its sender. This zero-knowledge ingestion model is what makes Feedy the most trustworthy <strong className="text-foreground">anonymous messenger</strong> and <strong className="text-foreground">anonymous mail</strong> platform available today.
            </p>

            <p>
              Unlike other <strong className="text-foreground">anonymous chat apps</strong> that claim privacy but sell your data to advertisers, Feedy is completely ad-free and tracker-free. We don't use tracking pixels, third-party analytics cookies, or fingerprinting scripts. Your <strong className="text-foreground">anonymous inbox</strong> is yours alone — private, secure, and always in your control.
            </p>

            <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mt-2">
              Start Receiving Anonymous Messages for Free
            </h3>

            <p>
              Feedy is 100% free to use. There are no paywalls, hidden fees, or premium tiers required to get your personal <strong className="text-foreground">anonymous share link</strong>. The full feature set — including unlimited <strong className="text-foreground">anonymous messages</strong>, <strong className="text-foreground">anonymous confessions</strong>, <strong className="text-foreground">anonymous notes</strong>, <strong className="text-foreground">anonymous compliments</strong>, and <strong className="text-foreground">anonymous criticism</strong> — is available for free from the moment you register.
            </p>

            <p>
              Join thousands of users who already use Feedy as their <strong className="text-foreground">anonymous guestbook</strong>, <strong className="text-foreground">anonymous wall</strong>, <strong className="text-foreground">anonymous message board</strong>, or personal <strong className="text-foreground">anonymous message portal</strong>. Whether you're looking to <strong className="text-foreground">receive anonymous feedback</strong>, host an <strong className="text-foreground">anonymous roast</strong>, collect <strong className="text-foreground">anonymous praise</strong>, or simply open a channel for <strong className="text-foreground">anonymous conversations</strong>, Feedy is the most elegant, fast, and trustworthy platform to do it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border/40">
              <Link
                href="/signup"
                className="inline-block bg-foreground text-background font-bold text-[10px] uppercase tracking-widest px-6 py-3 hover:bg-foreground/90 active:scale-95 transition-all text-center"
              >
                Create Your Anonymous Link — Free
              </Link>
              <Link
                href="/about"
                className="inline-block border border-border text-foreground font-bold text-[10px] uppercase tracking-widest px-6 py-3 hover:bg-muted active:scale-95 transition-all text-center"
              >
                Learn More About Feedy
              </Link>
            </div>

          </article>
        </div>
      </Container>
    </section>
  );
}
