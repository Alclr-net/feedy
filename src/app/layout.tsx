import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StoreProvider } from "@/helpers/storeProvider";
import dbConnect from "@/lib/dbConnect";
import { ClientProvider } from "@/helpers/QueryClient";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://feedy.converzion.in";
const siteTitle = "Feedy — Free Anonymous Messaging, Feedback & Question Platform";
const siteDescription =
  "Feedy is the #1 free anonymous messaging app. Send & receive anonymous messages, anonymous feedback, anonymous questions, and anonymous confessions through your personal anonymous link. No sign-in required to send.";
const keywords = [
  "feedy",
  "anonymous messages",
  "anonymous messaging",
  "anonymous text",
  "anonymous texting",
  "anonymous text message",
  "anonymous messenger",
  "anonymous inbox",
  "anonymous inbox app",
  "anonymous inbox website",
  "anonymous ask",
  "anonymous ask link",
  "anonymous question",
  "anonymous questions",
  "anonymous question box",
  "anonymous Q&A",
  "anonymous replies",
  "anonymous replies app",
  "anonymous feedback",
  "anonymous feedback app",
  "anonymous feedback website",
  "anonymous suggestion",
  "anonymous suggestion box",
  "anonymous confessions",
  "anonymous confession app",
  "anonymous confession website",
  "anonymous secrets",
  "anonymous notes",
  "anonymous compliments",
  "anonymous opinions",
  "anonymous polls",
  "anonymous survey",
  "anonymous social app",
  "anonymous social network",
  "anonymous chat",
  "anonymous chat app",
  "anonymous chat website",
  "anonymous profile",
  "anonymous profile link",
  "anonymous link",
  "anonymous share link",
  "anonymous invite",
  "anonymous invite link",
  "anonymous message generator",
  "anonymous message creator",
  "anonymous message platform",
  "anonymous message service",
  "anonymous message online",
  "free anonymous message",
  "free anonymous messaging",
  "send anonymous text",
  "send anonymous texts",
  "send private message anonymously",
  "anonymous direct message",
  "anonymous DM",
  "receive anonymous messages",
  "receive anonymous feedback",
  "receive anonymous questions",
  "ask anonymously",
  "reply anonymously",
  "message anonymously",
  "text anonymously",
  "anonymous communication",
  "anonymous interaction",
  "anonymous conversations",
  "anonymous community",
  "anonymous wall",
  "anonymous guestbook",
  "anonymous message board",
  "anonymous shoutbox",
  "anonymous guest messages",
  "secret message",
  "secret messages",
  "private message link",
  "digital suggestion box",
  "online suggestion box",
  "anonymous profile page",
  "anonymous bio link",
  "anonymous form",
  "anonymous contact form",
  "anonymous response",
  "anonymous review",
  "anonymous appreciation",
  "anonymous praise",
  "anonymous criticism",
  "anonymous roast",
  "anonymous truth",
  "anonymous opinion box",
  "anonymous message URL",
  "anonymous message page",
  "anonymous message profile",
  "anonymous message portal",
  "anonymous message room",
  "anonymous note sender",
  "anonymous mail",
  "anonymous confession wall",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Feedy — Anonymous Messaging Platform",
  },
  description: siteDescription,
  keywords: keywords,
  authors: [{ name: "Feedy", url: siteUrl }],
  creator: "converzion.pvt.ltd",
  publisher: "converzion.pvt.ltd",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: "Feedy",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Feedy — Free Anonymous Messaging & Feedback Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
    creator: "@feedyapp",
    site: "@feedyapp",
  },
  icons: {
    icon: [
      { url: "/feedy-favicons/favicon.ico" },
      { url: "/feedy-favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/feedy-favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/feedy-favicons/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/feedy-favicons/favicon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/feedy-favicons/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/feedy-favicons/apple-touch-icon.png" }],
  },
  manifest: "/feedy-favicons/site.webmanifest",
  category: "technology",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbConnect();
  return (
    <html lang="en" suppressHydrationWarning={true} className={cn("font-mono ", jetbrainsMono.variable)}>
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Feedy",
              url: siteUrl,
              description: siteDescription,
              applicationCategory: "SocialNetworkingApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Anonymous messaging",
                "Anonymous feedback",
                "Anonymous questions",
                "Anonymous confessions",
                "Anonymous suggestion box",
                "Personal anonymous link",
                "Free to use",
              ],
            }),
          }}
        />
      </head>
      <body className={`${geistMono.variable} antialiased`}>
        <ClientProvider>
          <StoreProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="bg-background text-foreground min-h-screen flex flex-col justify-between">
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </ThemeProvider>
          </StoreProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
