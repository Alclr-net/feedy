interface EmailTemplateProps {
    username: string;
    verifyCode: number;
}

import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from 'react-email';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://feedy.sethrachit.in';

export const FeedyVerifyCodeEmail = ({
    username, verifyCode
}: EmailTemplateProps) => (
    <Html>
        <Head />
        <Tailwind>
            <Body className="bg-white mx-auto my-0 font-sans">
                <Preview>Hey {username}, here is your Feedy verification code</Preview>

                <Container className="mx-auto my-10 max-w-[480px] px-6 py-8 bg-white border border-solid border-[#e5e7eb] rounded-xl shadow-sm">

                    {/* Logo */}
                    <Section className="mb-6">
                        <Img
                            src={`${baseUrl}/feedy-favicons/favicon-192x192.png`}
                            width="40"
                            height="40"
                            alt="Feedy"
                        />
                    </Section>

                    {/* Heading */}
                    <Heading className="text-[#111827] text-2xl font-bold m-0 mb-3 leading-tight">
                        Verify your email address
                    </Heading>

                    {/* Greeting */}
                    <Text className="text-[#374151] text-base leading-6 m-0 mb-4">
                        Hey <strong>{username}</strong>, welcome to Feedy
                    </Text>

                    <Text className="text-[#374151] text-base leading-6 m-0 mb-6">
                        Use the verification code below to confirm your email address and
                        activate your anonymous inbox. This code expires in{' '}
                        <strong>10 minutes</strong>.
                    </Text>

                    {/* OTP Code Box */}
                    <Section className="bg-[#f3f4f6] rounded-lg mb-6 py-8 px-4 text-center">
                        <Text className="text-[#111827] text-4xl font-bold tracking-[8px] leading-none m-0">
                            {verifyCode}
                        </Text>
                    </Section>

                    {/* What is Feedy blurb */}
                    <Text className="text-[#374151] text-base leading-6 m-0 mb-4">
                        With Feedy, you get a personal anonymous link where anyone can send
                        you messages, feedback, questions, or confessions — completely
                        anonymously, with no sign-in required on their end.
                    </Text>

                    <Text className="text-[#6b7280] text-sm leading-6 m-0 mb-6">
                        If you didn&apos;t create a Feedy account, you can safely ignore this
                        email. Someone may have entered your address by mistake.
                    </Text>

                    {/* CTA */}
                    <Section className="mb-8">
                        <Link
                            href={baseUrl}
                            className="bg-[#111827] text-white text-sm font-semibold rounded-lg px-6 py-3 no-underline inline-block"
                        >
                            Go to Feedy →
                        </Link>
                    </Section>

                    {/* Divider */}
                    <Section className="border-t border-solid border-[#e5e7eb] pt-6">
                        {/* Footer links */}
                        <Text className="text-[#9ca3af] text-xs leading-5 m-0 mb-2">
                            <Link
                                href={`${baseUrl}/privacy-policy`}
                                className="text-[#9ca3af] underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Privacy Policy
                            </Link>
                            {' · '}
                            <Link
                                href={`${baseUrl}/terms`}
                                className="text-[#9ca3af] underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Terms of Service
                            </Link>
                            {' · '}
                            <Link
                                href={`${baseUrl}/contact`}
                                className="text-[#9ca3af] underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Contact
                            </Link>
                        </Text>

                        {/* Copyright */}
                        <Text className="text-[#9ca3af] text-xs leading-5 m-0">
                            © {new Date().getFullYear()} Feedy by{' '}
                            <Link
                                href="https://converzion.in"
                                className="text-[#9ca3af] underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Converzion
                            </Link>
                            . All rights reserved.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

export default FeedyVerifyCodeEmail;
