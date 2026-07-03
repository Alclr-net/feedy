import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Feedy — Anonymous Messaging Platform",
  description:
    "Read Feedy's Privacy Policy. Learn how we protect your data, ensure complete sender anonymity, and operate with zero tracking on our anonymous messaging platform.",
  alternates: { canonical: "https://feedy.sethrachit.in/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Feedy",
    description:
      "Feedy's privacy-first architecture ensures zero IP logging, zero tracking, and complete sender anonymity. Read our full Privacy Policy.",
    url: "https://feedy.sethrachit.in/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "June 30, 2025";

  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        {
          subtitle: "Account Information",
          text: "When you create a Feedy account, we collect your username, email address, and a hashed password. This information is used solely to authenticate you and deliver messages to your inbox. We do not collect your real name, phone number, or any other personally identifying information unless you voluntarily provide it.",
        },
        {
          subtitle: "Anonymous Message Data",
          text: "When someone sends a message through your Feedy link, we store the message content and the timestamp of submission. We do NOT store the sender's IP address, browser fingerprint, device identifier, user agent, or any metadata that could be used to identify the sender. This is a core architectural guarantee of our platform.",
        },
        {
          subtitle: "Usage Data",
          text: "We may collect minimal, aggregated usage data such as the total number of messages received or dashboard interactions. This data is never linked to individual user identities and is used solely to improve the platform's performance and reliability.",
        },
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: [
        {
          subtitle: "Service Delivery",
          text: "Your account information is used to authenticate your sessions, deliver anonymous messages to your inbox, and send you optional email notifications about new messages when enabled.",
        },
        {
          subtitle: "Platform Improvement",
          text: "Aggregated, anonymised usage statistics help us identify performance bottlenecks and prioritise feature development. No individual user data is ever used for this purpose.",
        },
        {
          subtitle: "Security",
          text: "We may analyse patterns in message content to detect and block automated spam, malicious script injections, and abuse of the platform. This analysis is automated and does not involve human review of your messages unless required by law enforcement with a valid legal order.",
        },
      ],
    },
    {
      title: "3. Data We Never Collect",
      content: [
        {
          subtitle: "Sender Identity",
          text: "We architecturally strip all sender-identifying information before it reaches our database. IP addresses, browser fingerprints, device identifiers, and session tokens of anonymous senders are never stored. This makes it technically impossible for us — or any third party — to identify who sent a particular message.",
        },
        {
          subtitle: "Advertising Data",
          text: "Feedy does not serve advertisements. We do not collect, sell, or share any of your data with advertising networks, data brokers, or marketing platforms.",
        },
        {
          subtitle: "Third-Party Tracking",
          text: "We do not embed third-party tracking pixels, cross-site tracking cookies, or browser fingerprinting scripts on our platform.",
        },
      ],
    },
    {
      title: "4. Data Sharing & Third Parties",
      content: [
        {
          subtitle: "No Data Sales",
          text: "We do not sell, rent, or trade your personal information to any third party under any circumstances.",
        },
        {
          subtitle: "Service Providers",
          text: "We use a limited number of trusted third-party service providers (such as database hosting and email delivery) who process data only on our behalf and under strict data processing agreements.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose account information if required by a valid court order, subpoena, or applicable law. We will notify affected users where legally permitted to do so.",
        },
      ],
    },
    {
      title: "5. Data Retention",
      content: [
        {
          subtitle: "Account Data",
          text: "Your account information is retained for as long as your account is active. You may delete your account at any time from your dashboard, which will permanently erase all associated data including your messages.",
        },
        {
          subtitle: "Message Data",
          text: "Messages in your inbox are retained until you delete them. Deleted messages are permanently removed from our databases within 30 days.",
        },
      ],
    },
    {
      title: "6. Your Rights",
      content: [
        {
          subtitle: "Access & Portability",
          text: "You have the right to access all personal data we hold about you and request a copy in a portable format. Contact us at privacy@feedy.app to make such a request.",
        },
        {
          subtitle: "Deletion",
          text: "You have the right to request deletion of all your personal data. You can do this directly from your dashboard, or by contacting us at privacy@feedy.app.",
        },
        {
          subtitle: "Correction",
          text: "If any of your account information is inaccurate, you have the right to request correction through your account settings.",
        },
      ],
    },
    {
      title: "7. Cookies",
      content: [
        {
          subtitle: "Essential Cookies Only",
          text: "Feedy uses only strictly necessary session cookies to maintain your authenticated state while using the platform. We do not use analytics cookies, advertising cookies, or any third-party cookies.",
        },
      ],
    },
    {
      title: "8. Security",
      content: [
        {
          subtitle: "Technical Safeguards",
          text: "All data transmitted between your browser and our servers is encrypted using TLS 1.3. Passwords are stored using bcrypt hashing with salting. Database access is restricted by role-based permissions and audited access logs.",
        },
      ],
    },
    {
      title: "9. Changes to This Policy",
      content: [
        {
          subtitle: "Notification",
          text: "We will notify you of any material changes to this Privacy Policy via email or a prominent notice on the platform at least 14 days before the changes take effect.",
        },
      ],
    },
    {
      title: "10. Contact",
      content: [
        {
          subtitle: "Privacy Inquiries",
          text: "For all privacy-related questions or requests, contact us at: privacy@feedy.app or through our Contact page. We respond to all privacy inquiries within 5 business days.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 font-mono text-foreground">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Legal</span>
          <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight mt-3">Privacy Policy</h1>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed max-w-xl">
            Feedy is built on a privacy-first foundation. This policy explains exactly what data we collect, what we don't, and how we protect your anonymity and your senders' anonymity.
          </p>
          <div className="flex gap-6 mt-6 text-[10px] text-muted-foreground uppercase tracking-widest">
            <span>Last Updated: {lastUpdated}</span>
            <span className="text-green-600 font-bold">Status: Active</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pt-12">
        <div className="flex flex-col gap-10">
          {sections.map((section, i) => (
            <div key={i} className="flex flex-col gap-5 border-b border-border/20 pb-10 last:border-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">{section.title}</h2>
              <div className="flex flex-col gap-5 pl-0 sm:pl-4">
                {section.content.map((item, j) => (
                  <div key={j} className="flex flex-col gap-1.5">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-foreground/80">{item.subtitle}</h3>
                    <p className="text-[12px] text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
