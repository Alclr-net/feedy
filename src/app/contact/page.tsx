import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Feedy Support & Inquiries",
  description:
    "Get in touch with the Feedy team. Reach us for support, bug reports, privacy inquiries, feature requests, or partnership opportunities.",
  alternates: {
    canonical: "https://feedy.converzion.in/contact",
  },
  openGraph: {
    title: "Contact Feedy — We're Here to Help",
    description:
      "Have a question or issue? Contact the Feedy team. We respond to all inquiries within 1–2 business days.",
    url: "https://feedy.converzion.in/contact",
    type: "website",
  },
  twitter: {
    title: "Contact Feedy Support",
    description:
      "Reach the Feedy team for support, bug reports, or feature requests. We respond within 1–2 business days.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
