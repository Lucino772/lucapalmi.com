import type { Metadata } from "next";
import "./globals.css";
import "highlight.js/styles/github-dark-dimmed.css";
import NavBar from "@/components/NavBar";

import { Inconsolata, Cascadia_Code } from "next/font/google";
import { cn } from "@/lib/cn";
import { Person, WithContext } from "schema-dts";

import serialize from "serialize-javascript";

export const metadata: Metadata = {
    metadataBase: new URL("https://lucapalmi.com"),
    title: "Luca Palmisano - Software Engineer | Personal Website",
    description:
        "Software engineer designing and building solutions that empower individuals and professionals to work smarter, faster, and more efficiently. Explore my projects and insights on software development.",
    keywords: [
        "software engineer",
        "software development",
        "problem solving",
        "software design",
        "technology",
    ],
    authors: [{ name: "Luca Palmisano" }],
    creator: "Luca Palmisano",
    publisher: "Luca Palmisano",
    openGraph: {
        title: "Luca Palmisano - Software Engineer",
        description:
            "Software engineer designing and building solutions that empower individuals and professionals to work smarter, faster, and more efficiently. Explore my projects and insights on software development.",
        url: "https://lucapalmi.com",
        siteName: "Luca Palmisano",
        images: [
            {
                url: "/images/logo.webp",
                width: 1200,
                height: 630,
                alt: "Luca Palmisano - Software Engineer",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Luca Palmisano - Software Engineer",
        description:
            "Software engineer designing and building solutions that empower individuals and professionals to work smarter, faster, and more efficiently. Explore my projects and insights on software development.",
        images: ["/images/logo.webp"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: "https://lucapalmi.com",
    },
};

const jsonLd: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Luca Palmisano",
    jobTitle: "Software Engineer",
    url: "https://lucapalmi.com",
    description:
        "Software engineer designing and building solutions that empower individuals and professionals to work smarter, faster, and more efficiently",
    sameAs: ["https://github.com/Lucino772"],
};

const inconsolata = Inconsolata({
    variable: "--font-inconsolata",
    subsets: ["latin"],
    display: "swap",
});
const cascadiaCode = Cascadia_Code({
    variable: "--font-cascadia-code",
    subsets: ["latin"],
    display: "swap",
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={cn(
                "dark antialiased",
                inconsolata.variable,
                cascadiaCode.variable,
            )}
        >
            <head>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(jsonLd) }} />
            </head>
            <body className="relative h-screen w-full overflow-auto">
                <div className="bg-secondary relative z-0 flex min-h-full w-full flex-col items-center">
                    <NavBar />
                    {children}
                </div>
            </body>
        </html>
    );
}
