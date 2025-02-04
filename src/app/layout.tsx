import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import "highlight.js/styles/github-dark-dimmed.css";
import NavBar from "@/components/NavBar";
import { cn } from "@/lib/cn";

const josefin = Josefin_Sans({
    subsets: ["latin"],
    weight: ["400", "600"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "lucapalmi.com - fullstack developer",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body
                className={cn(
                    "relative h-screen w-full overflow-auto",
                    josefin.className,
                )}
            >
                <div className="bg-secondary md:from-primary md:to-secondary relative z-0 flex min-h-full w-full flex-col items-center to-50% md:bg-linear-80 md:from-50%">
                    <NavBar />
                    {children}
                </div>
            </body>
        </html>
    );
}
