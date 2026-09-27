import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import ThemeColorSync from "@/components/theme-color-sync";
import { themeScript } from "@/components/theme";
import ScrollbarWidthSync from "@/components/scrollbar-width";
import { scrollbarWidthScript } from "@/lib/scrollbar-width";

import localFont from "next/font/local";
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

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#e8e5de" },
        { media: "(prefers-color-scheme: dark)", color: "#272727" },
    ],
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

const inconsolata = localFont({
    src: "../fonts/inconsolata-latin.woff2",
    variable: "--font-inconsolata",
    display: "swap",
    weight: "200 900",
});
const cascadiaCode = localFont({
    src: "../fonts/cascadia-code-latin.woff2",
    variable: "--font-cascadia-code",
    display: "swap",
    weight: "200 700",
});
const literata = localFont({
    src: "../fonts/literata-latin.woff2",
    variable: "--font-literata",
    display: "swap",
    weight: "200 900",
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn(
                "antialiased",
                inconsolata.variable,
                cascadiaCode.variable,
                literata.variable,
            )}
        >
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
                <script
                    dangerouslySetInnerHTML={{ __html: scrollbarWidthScript }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: serialize(jsonLd) }}
                />
            </head>
            <body className="bg-bg text-fg flex min-h-dvh flex-col">
                <a
                    href="#content"
                    className="bg-accent fixed top-2 left-2 z-50 -translate-y-16 px-3 py-2 text-sm text-white focus-visible:translate-y-0"
                >
                    Skip to content
                </a>
                <NavBar />
                <main
                    id="content"
                    className="scrollbar-offset flex w-full flex-1 flex-col"
                >
                    {children}
                </main>
                <ThemeColorSync />
                <ScrollbarWidthSync />
            </body>
        </html>
    );
}
