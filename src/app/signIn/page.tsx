import type { Metadata } from "next";
import SignInClient from "./SignInClient";

export const metadata: Metadata = {
  title: "Sign In — Log Into Your Feedy Anonymous Inbox",
  description:
    "Sign in to your Feedy account to read your anonymous messages, manage your inbox, and control who can send you messages.",
  alternates: {
    canonical: "https://feedy.converzion.in/signIn",
  },
  openGraph: {
    title: "Sign In to Feedy",
    description:
      "Access your Feedy anonymous inbox. Read messages, manage your link, and control your anonymous messaging settings.",
    url: "https://feedy.converzion.in/signIn",
    type: "website",
  },
  twitter: {
    title: "Sign In to Feedy",
    description:
      "Sign in to read your anonymous messages and manage your Feedy inbox.",
  },
};

export default function SignInPage() {
  return <SignInClient />;
}
