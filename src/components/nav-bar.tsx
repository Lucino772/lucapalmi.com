"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { about } from "@/content/about";
import { ThemeToggle } from "./theme";
import { GitHubIcon, LinkedInIcon } from "./icons";
import LogoMark from "./logo-mark";
import MobileNav from "./mobile-nav";
import { isActive, navItems } from "./nav-items";

// Touch screens (tablets get this nav from md): a 44px-tall, 36px-wide hit
// area, the full pitch between icons, with no visual change
const coarseHit =
    "pointer-coarse:-mx-0.5 pointer-coarse:-my-1.5 pointer-coarse:h-11 pointer-coarse:w-9";

const iconLink = `text-muted hover:text-fg inline-flex size-8 items-center justify-center rounded-[4px] transition-colors duration-150 ${coarseHit}`;

export default function NavBar() {
    const pathname = usePathname();
    const [menu, setMenu] = useState({ open: false, pathname });

    // Close the mobile menu whenever the route changes
    const open = menu.open && menu.pathname === pathname;
    const setOpen = (next: boolean) => setMenu({ open: next, pathname });
    const menuButton = useRef<HTMLButtonElement>(null);
    // Escape and the scrim hand focus back to the menu button
    const closeMenu = (restoreFocus: boolean) => {
        setOpen(false);
        if (restoreFocus) menuButton.current?.focus();
    };

    return (
        <header className="border-line bg-bg scrollbar-offset sticky top-0 z-40 w-full border-b">
            <div className="max-w-page mx-auto flex h-14 w-full items-center justify-between px-5 md:px-6">
                <Link
                    href="/"
                    className="group -mx-1 flex h-11 items-center gap-2.5 px-1 text-[0.9375rem] font-semibold tracking-tight"
                >
                    <LogoMark className="logo-mark h-[1.375rem] w-auto shrink-0" />
                    <span className="group-hover:text-accent-text transition-colors duration-150">
                        {about.name.toLowerCase()}
                    </span>
                </Link>

                <nav
                    aria-label="Main"
                    className="hidden h-full items-center md:flex"
                >
                    <ul className="flex h-full items-center">
                        {navItems.map((item) => {
                            const active = isActive(pathname, item.href);
                            return (
                                <li key={item.href} className="h-full">
                                    <Link
                                        href={item.href}
                                        aria-current={
                                            active ? "page" : undefined
                                        }
                                        className={cn(
                                            "relative flex h-full items-center px-3.5 text-[0.9375rem] transition-colors duration-150",
                                            "after:absolute after:inset-x-3.5 after:-bottom-px after:h-0.5 after:content-['']",
                                            active
                                                ? "text-fg after:bg-accent"
                                                : "text-muted hover:text-fg",
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <span aria-hidden className="bg-line mx-3 h-5 w-px" />
                    <div className="flex items-center gap-1">
                        <a
                            href={about.links.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                            title="GitHub"
                            className={iconLink}
                        >
                            <GitHubIcon className="size-[1.125rem]" />
                        </a>
                        <a
                            href={about.links.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                            title="LinkedIn"
                            className={iconLink}
                        >
                            <LinkedInIcon className="size-[1rem]" />
                        </a>
                        <ThemeToggle className={coarseHit} />
                    </div>
                </nav>

                <button
                    ref={menuButton}
                    type="button"
                    className="text-fg hover:text-accent-text -mr-2 inline-flex size-11 cursor-pointer items-center justify-center rounded-[4px] md:hidden"
                    aria-expanded={open}
                    aria-controls="mobile-nav"
                    aria-label={open ? "Close menu" : "Open menu"}
                    onClick={() => setOpen(!open)}
                >
                    {open ? (
                        <XIcon aria-hidden className="size-5" />
                    ) : (
                        <MenuIcon aria-hidden className="size-5" />
                    )}
                </button>
            </div>
            <MobileNav open={open} close={closeMenu} />
        </header>
    );
}
