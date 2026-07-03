
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import dbConnect from "@/lib/dbConnect";
import { searchByUserNameService } from "@/services/auth.service";
import { UserMessageClient } from "./UserMessageClient";
import axios from "axios";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  console.log("username", username)
  const siteUrl = process.env.NEXT_APP_BASE_URL
  return {
    title: `Send an anonymous message to @${username}`,
    description: `Send ${username} an anonymous message, anonymous feedback, or anonymous question on Feedy — 100% free and no sign-in required.`,
    alternates: {
      canonical: `${siteUrl}/u/${username}`,
    },
    openGraph: {
      title: `Send an anonymous message to @${username} on Feedy`,
      description: `Send ${username} a completely anonymous message, feedback, or question. No account required to send.`,
      url: `${siteUrl}/u/${username}`,
      type: "website",
    },
    twitter: {
      title: `Send @${username} an anonymous message on Feedy`,
      description: `Message ${username} anonymously — no sign-in required. Try Feedy, the free anonymous messaging platform.`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function UserPage({ params }: PageProps) {
  try {
    const { username } = await params;
    const res = await axios.get(`${process.env.APPLICATION_URI}/api/username_exist/${username}`)
    if (!res.data.success) {
      notFound()
    }
    return <UserMessageClient username={username} />;
  } catch (error) {
    notFound()
  }

}
