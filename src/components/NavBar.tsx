"use client";

import Link from "next/link";
import MobileNav from "./MobileNav";
import { useState } from "react";
import Image from "next/image";
import logo from "../../public/images/logo.webp";
import { GithubIcon, MenuIcon } from "lucide-react";

export default function NavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-7 py-4">
                <Image
                    className="visible relative h-[50px] w-[50px] animate-fade-in rounded-full"
                    src={logo}
                    alt="Logo"
                    width={50}
                    priority={true}
                />

                <nav className="relative hidden items-center justify-center md:flex">
                    <Link
                        className="relative mr-5 text-xl font-normal text-white no-underline after:absolute after:bottom-0 after:left-[5%] after:h-[2px] after:w-0 after:bg-white after:duration-200 after:content-[''] hover:after:w-3/4"
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="relative mr-5 text-xl font-normal text-white no-underline after:absolute after:bottom-0 after:left-[5%] after:h-[2px] after:w-0 after:bg-white after:duration-200 after:content-[''] hover:after:w-3/4"
                        href="/about"
                    >
                        About
                    </Link>
                    <Link
                        className="relative mr-5 text-xl font-normal text-white no-underline after:absolute after:bottom-0 after:left-[5%] after:h-[2px] after:w-0 after:bg-white after:duration-200 after:content-[''] hover:after:w-3/4"
                        href="/projects"
                    >
                        Projects
                    </Link>
                    <a
                        target="_blank"
                        className="relative inline-block"
                        href="https://github.com/Lucino772"
                        title="github"
                    >
                        <GithubIcon color="white" className="h-6 w-6" />
                    </a>
                </nav>

                <MenuIcon
                    onClick={() => setMobileMenuOpen(true)}
                    className="block h-8 w-8 hover:cursor-pointer md:hidden"
                    color="white"
                />
            </div>
            <MobileNav
                open={mobileMenuOpen}
                close={() => setMobileMenuOpen(false)}
            />
        </>
    );
}
