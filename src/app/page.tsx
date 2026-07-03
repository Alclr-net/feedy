import type { Metadata } from "next";
import React from "react";
import { cn } from "@/lib/className";
import LaserFlowBox from "@/components/Hero";
import {
  FeaturesSection,
  HowItWorksSection,
  StatsSection,
  TestimonialsSection,
  CTASection,
  AboutSection,
} from "@/components/HomeSections";
import { SeoArticle } from "@/components/SeoArticle";

export const metadata: Metadata = {
  title: "Feedy — Free Anonymous Messaging, Feedback & Question Platform",
  description:
    "Feedy is the free anonymous messaging platform that lets you receive anonymous messages, anonymous feedback, anonymous questions, and anonymous confessions through your personal anonymous link. No login required to send.",
  alternates: {
    canonical: "https://feedy.sethrachit.in",
  },
  openGraph: {
    title: "Feedy — Free Anonymous Messaging, Feedback & Question Platform",
    description:
      "Receive anonymous messages, anonymous feedback, anonymous questions, and anonymous confessions for free. Create your anonymous link today on Feedy.",
    url: "https://feedy.sethrachit.in",
    type: "website",
  },
  twitter: {
    title: "Feedy — Free Anonymous Messaging, Feedback & Question Platform",
    description:
      "Receive anonymous messages, feedback, questions & confessions for free. Create your anonymous link on Feedy.",
  },
};

export default function Home() {
  return (
    <>
      <div className={cn("bg-background overflow-x-hidden")}>
        <LaserFlowBox />

        {/* Home Page Sections */}
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <AboutSection />
        <TestimonialsSection />
        <CTASection />

        {/* SEO Article — 600 words about Feedy for on-page SEO */}
        <SeoArticle />
      </div>
    </>
  );
}
