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
          "relative h-screen w-full overflow-hidden bg-[#272727] to-50% md:bg-gradient-80deg md:from-[#242424] md:from-50% md:to-[#272727]",
          josefin.className,
        )}
        style={{ overflow: "auto" }}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
