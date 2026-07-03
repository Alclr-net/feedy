"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";

const row1 = [
    {
        comment: `"We started using Feedy for our weekly team retro. The feedback became 10x more honest and actionable. No more awkward silence."`,
        logo: "/profile1.jpg",
        username: "Karan Malhotra",
    },
    {
        comment: `"I shared my Feedy link on Twitter. The constructive critiques on my side-projects helped me fix bugs I didn't even know existed."`,
        logo: "/profile2.jpg",
        username: "Riha",
    },
    {
        comment: `"As an executive, it's hard to get unfiltered truth from employees. Feedy gives our leadership insight into the real issues."`,
        logo: "/profile3.jpg",
        username: "Lex Luther",
    },
    {
        comment: `"My friends were too polite to point out where my presentations lacked. Feedy gave me the raw, helpful feedback I needed to improve."`,
        logo: "/profile4.jpg",
        username: "Vishal Gupta",
    },
    {
        comment: `"The AI message suggestions are great! People who usually don't know what to write are sending really thoughtful feedback now."`,
        logo: "/profile10.jpg",
        username: "Raghav beniwal",
    },
    {
        comment: `"I love that Feedy stores zero tracking info. My team actually trusts that their feedback is completely anonymous, which is key."`,
        logo: "/profile11.jpg",
        username: "Albert Derak",
    },
];

const row2 = [
    {
        comment: `"We replaced our bloated, expensive feedback tools with Feedy. It's clean, fast, and does exactly what we need without any bloat."`,
        logo: "/profile5.jpg",
        username: "Dhawal Nandale",
    },
    {
        comment: `"Feedy is perfect for collecting quick, anonymous QA reports and feature suggestions from our early beta testers."`,
        logo: "/profile6.jpg",
        username: "Harsh",
    },
    {
        comment: `"The interface is incredibly clean. I've received so much helpful, constructive criticism from my newsletter readers."`,
        logo: "/profile7.jpg",
        username: "Kezia",
    },
    {
        comment: `"The analytics dashboard is a game changer. Being able to see the sentiment trend of feedback over time is so helpful."`,
        logo: "/profile8.jpg",
        username: "Daniel David",
    },
    {
        comment: `"It took me literally 30 seconds to set up my inbox page. The ease of sharing the link is brilliant."`,
        logo: "/profile9.jpg",
        username: "Bureska Koena",
    },
    {
        comment: `"Since using Feedy, our open source project contributors have a safe space to give us suggestions without any friction."`,
        logo: "/profile12.jpg",
        username: "Diego Hernández",
    },
];

function CaseStudy() {
    // Duplicate the rows to enable seamless marquee looping
    const row1Double = [...row1, ...row1];
    const row2Double = [...row2, ...row2];

    return (
        <>
            <div className="relative overflow-hidden after:content-[''] after:absolute after:inset-0 
after:bg-[linear-gradient(to_right,white_0.1%,transparent_50%,white_99%)] 
dark:after:bg-[linear-gradient(to_right,black_0.1%,transparent_50%,black_99%)] 
after:pointer-events-none after:z-10" >
                <h2 className="text-center mb-10 text-2xl  text-black dark:text-white">What people {" "}
                    <span className="border-b border-red-500 dark:border-teal-300">say</span> about us?</h2>

                <div className="flex flex-col w-full overflow-hidden">
                    <motion.div
                        className="flex justify-between p-8 gap-7 w-max"
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{
                            duration: 25,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {row1Double.map((card, index) => (
                            <CaseStudyCard
                                key={`row1-${index}`}
                                comment={card.comment}
                                logo={card.logo}
                                username={card.username}
                            />
                        ))}
                    </motion.div>
                    <motion.div
                        className="flex justify-between p-8 gap-7 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 25,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {row2Double.map((card, index) => (
                            <CaseStudyCard
                                key={`row2-${index}`}
                                comment={card.comment}
                                logo={card.logo}
                                username={card.username}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </>
    );
}

function CaseStudyCard({
    comment,
    logo,
    username,
}: {
    comment: string;
    logo: string;
    username: string;
}) {
    return (
        <>
            <div
                className={cn(
                    " flex flex-col border border-neutral-700 dark:border-neutral-400 shadow-lg"
                )}
            >
                <div
                    className={cn(
                        "text-sm p-4 border-b border-neutral-700 dark:border-neutral-400 w-[280px] sm:w-110 h-48 sm:h-40"
                    )}
                >
                    <p
                        className={cn(
                            " leading-relaxed text-base text-[var(--text-light)] dark:text-[var(--text-dark)]"
                        )}
                    >
                        {comment}
                    </p>
                </div>
                <div className={cn("flex justify-center items-center ml-2 gap-2")}>
                    <div
                        className={cn(
                            "  relative w-13 h-10 rounded-full border border-neutral-700 dark:border-neutral-400 overflow-hidden"
                        )}
                    >
                        <Image alt="user" src={logo} fill className="object-cover" />
                    </div>
                    <div
                        className={cn(
                            "flex items-center w-full text-neutral-950/70 dark:text-neutral-50/70 "
                        )}
                    >
                        {username}
                    </div>
                    <div
                        className={cn(
                            " p-2 border-l border-neutral-700 dark:border-neutral-400"
                        )}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x text-black dark:text-white size-10"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CaseStudy;
