import type { Metadata } from "next";
import AboutPageClient from "@/app/about/AboutPageClient";

export const metadata: Metadata = {
  title: "About Feedy — Our Mission, Privacy Architecture & Values",
  description:
    "Learn about Feedy's mission to enable honest, anonymous communication. Discover how our privacy-first architecture ensures complete anonymity for every anonymous message, feedback, and question.",
  alternates: {
    canonical: "https://feedy.converzion.in/about",
  },
  openGraph: {
    title: "About Feedy — Anonymous Messaging Platform Built on Privacy",
    description:
      "Feedy is built on a zero-knowledge privacy architecture. Learn how we protect anonymous senders and why Feedy is the most trustworthy anonymous messaging app available.",
    url: "https://feedy.converzion.in/about",
    type: "website",
  },
  twitter: {
    title: "About Feedy — Anonymous Messaging Built on Privacy",
    description:
      "Feedy enables anonymous messages, anonymous feedback, and anonymous questions with a zero-knowledge privacy architecture. Learn more about our mission.",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
