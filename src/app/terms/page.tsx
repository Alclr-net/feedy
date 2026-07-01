import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Feedy — Anonymous Messaging Platform",
  description:
    "Read Feedy's Terms and Conditions. Understand the rules governing use of our free anonymous messaging, anonymous feedback, and anonymous question platform.",
  alternates: { canonical: "https://feedy.converzion.in/terms" },
  openGraph: {
    title: "Terms & Conditions | Feedy",
    description:
      "The rules governing your use of Feedy's anonymous messaging platform. Read before creating an account.",
    url: "https://feedy.converzion.in/terms",
    type: "website",
  },
};

export default function TermsPage() {
  const lastUpdated = "June 30, 2025";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      text: `By accessing or using Feedy ("the Platform", "we", "us", "our"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use the Platform. These Terms apply to all visitors, registered users, and anyone who submits anonymous messages through a Feedy link.`,
    },
    {
      title: "2. Description of Service",
      text: `Feedy is a free anonymous messaging platform that allows registered users to receive anonymous messages, anonymous feedback, anonymous questions, anonymous confessions, and other anonymous content through a personalised shareable link. Senders do not need to create an account to submit messages.`,
    },
    {
      title: "3. Account Registration",
      text: `To receive messages on Feedy, you must create an account with a valid email address and a unique username. You are responsible for maintaining the security of your account credentials. You must not share your password with any third party. You must be at least 13 years of age (or the minimum digital age of consent in your jurisdiction) to create an account. We reserve the right to terminate accounts that violate these terms without notice.`,
    },
    {
      title: "4. Acceptable Use",
      text: `You agree not to use Feedy to send or facilitate the sending of content that: (a) is unlawful, threatening, abusive, harassing, defamatory, or obscene; (b) infringes on the intellectual property rights of any third party; (c) constitutes spam, phishing, or automated message submission; (d) contains malicious code, scripts, or viruses; (e) violates the privacy of any individual by sharing personal information without consent; (f) constitutes cyberbullying, hate speech, or targeted harassment of any individual. Account holders are responsible for moderating the messages they receive. Feedy provides moderation tools including message deletion and the ability to disable message reception.`,
    },
    {
      title: "5. Anonymous Sender Responsibilities",
      text: `Individuals who submit anonymous messages through Feedy links, even without an account, are bound by these Terms to the extent applicable. Anonymous senders agree not to submit content that violates Section 4 (Acceptable Use). While Feedy does not log sender identities by design, abuse of the Platform may be reported to appropriate authorities where legally required, using available information such as the message content and timestamp.`,
    },
    {
      title: "6. Content Ownership",
      text: `You retain ownership of any content you post or receive on Feedy. By submitting content, you grant Feedy a non-exclusive, royalty-free licence to store and display that content solely for the purpose of operating the Platform. Feedy does not claim ownership over any messages, feedback, or other content transmitted through the Platform.`,
    },
    {
      title: "7. Intellectual Property",
      text: `The Feedy name, logo, interface design, and all Platform code are the intellectual property of converzion.pvt.ltd. You may not copy, reproduce, distribute, or create derivative works from any part of the Platform without prior written consent.`,
    },
    {
      title: "8. Privacy",
      text: `Your use of the Platform is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Platform, you confirm that you have read and understood our Privacy Policy.`,
    },
    {
      title: "9. Disclaimer of Warranties",
      text: `Feedy is provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that the Platform will be error-free, uninterrupted, or free of security vulnerabilities. We make no representations about the accuracy or reliability of any content submitted by users or senders.`,
    },
    {
      title: "10. Limitation of Liability",
      text: `To the maximum extent permitted by applicable law, converzion.pvt.ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use or inability to use the Platform, even if we have been advised of the possibility of such damages. Our total liability in connection with these Terms shall not exceed the amount you paid (if any) for the use of the Platform in the past 12 months.`,
    },
    {
      title: "11. Termination",
      text: `We reserve the right to suspend or terminate your account at any time for violations of these Terms, illegal activity, or any conduct we determine to be harmful to the Platform or other users. You may terminate your account at any time through your dashboard settings.`,
    },
    {
      title: "12. Modifications to Terms",
      text: `We may update these Terms from time to time. We will notify registered users by email and post a prominent notice on the Platform at least 14 days before material changes take effect. Continued use of the Platform after changes constitute your acceptance of the revised Terms.`,
    },
    {
      title: "13. Governing Law",
      text: `These Terms are governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of India.`,
    },
    {
      title: "14. Contact",
      text: `For questions about these Terms, please contact us at: legal@feedy.app or through our Contact page.`,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 font-mono text-foreground">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Legal</span>
          <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight mt-3">Terms &amp; Conditions</h1>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed max-w-xl">
            Please read these Terms and Conditions carefully before using Feedy. By creating an account or sending an anonymous message, you agree to be bound by these terms.
          </p>
          <div className="flex gap-6 mt-6 text-[10px] text-muted-foreground uppercase tracking-widest">
            <span>Last Updated: {lastUpdated}</span>
            <span className="text-blue-500 font-bold">Effective: Immediately</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pt-12">
        <div className="flex flex-col gap-8">
          {sections.map((section, i) => (
            <div key={i} className="flex flex-col gap-3 border-b border-border/20 pb-8 last:border-0">
              <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">{section.title}</h2>
              <p className="text-[12px] text-muted-foreground leading-relaxed sm:pl-4">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
