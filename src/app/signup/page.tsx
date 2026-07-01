import type { Metadata } from "next";
import SignupClient from "./SignupClient";

export const metadata: Metadata = {
  title: "Sign Up — Create Your Free Anonymous Messaging Account",
  description:
    "Create your free Feedy account in seconds. Get your personal anonymous link and start receiving anonymous messages, feedback, and questions — no credit card required.",
  alternates: {
    canonical: "https://feedy.converzion.in/signup",
  },
  openGraph: {
    title: "Sign Up for Feedy — Free Anonymous Messaging",
    description:
      "Join Feedy for free. Create your anonymous link and receive anonymous messages, feedback, and questions from anyone.",
    url: "https://feedy.converzion.in/signup",
    type: "website",
  },
  twitter: {
    title: "Sign Up for Feedy — Free Anonymous Messaging",
    description:
      "Create your free anonymous inbox on Feedy. Receive anonymous messages, feedback, and questions instantly.",
  },
};

export default function SignupPage() {
  return <SignupClient />;
}
