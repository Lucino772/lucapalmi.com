import type { Metadata } from "next";
import "./globals.css";
import "highlight.js/styles/github-dark-dimmed.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
    title: "lucapalmi.com - fullstack developer",
};

import { Inconsolata, Cascadia_Code } from "next/font/google";
import { cn } from "@/lib/cn";

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

export default function RootLayout({
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
            <body className="relative h-screen w-full overflow-auto">
                <div className="bg-secondary relative z-0 flex min-h-full w-full flex-col items-center">
                    <NavBar />
                    {children}
                </div>
            </body>
        </html>
    );
}
