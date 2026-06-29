import React from "react"
import { cn } from "@/lib/className";
import { Container } from "@/components/Container"
import LaserFlowBox from "@/components/Hero"
import {
  FeaturesSection,
  HowItWorksSection,
  StatsSection,
  TestimonialsSection,
  CTASection,
  AboutSection,
} from "@/components/HomeSections"

export default function Home() {
  return (
    <>
      <div className={cn("bg-black")}>
        <Container className="h-full border border-neutral-900">
          <LaserFlowBox />
        </Container>

        {/* Home Page Sections */}
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <AboutSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </>
  );
}
