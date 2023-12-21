import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import "highlight.js/styles/github-dark-dimmed.css";
import NavBar from "@/components/NavBar";

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
      <body className={josefin.className} style={{ overflow: "auto" }}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
