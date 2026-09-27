"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { about } from "@/content/about";
import { ThemeToggle } from "./theme";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { navItems } from "@/content/nav";

type Props = {
    open: boolean;
    close: (restoreFocus: boolean) => void;
};

const iconLink =
    "text-muted hover:text-fg inline-flex size-11 items-center justify-center rounded-[4px] transition-colors duration-150";

const items = [{ href: "/", label: "Home", path: "~" }, ...navItems];

export default function MobileNav({ open, close }: Props) {
    const pathname = usePathname();

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") close(true);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, close]);

    // The page stays put under the open menu. The body is pinned at the
    // current offset instead of hiding the overflow, so html keeps its
    // permanent scrollbar track (nothing shifts sideways); closing restores
    // the exact scroll position.
    useEffect(() => {
        if (!open) return;
        const body = document.body;
        const y = window.scrollY;
        const saved = body.getAttribute("style");
        Object.assign(body.style, {
            position: "fixed",
            top: `-${y}px`,
            left: "0",
            right: "0",
        });
        return () => {
            if (saved === null) body.removeAttribute("style");
            else body.setAttribute("style", saved);
            window.scrollTo({ top: y, behavior: "instant" });
        };
    }, [open]);

    return (
        <>
            {/* Scrim: dims the page under the menu; a tap closes it */}
            {open && (
                <div
                    aria-hidden
                    onClick={() => close(true)}
                    className="fixed inset-x-0 top-[calc(3.5rem+1px)] bottom-0 bg-black/25 motion-safe:animate-[fade_150ms_ease-out] md:hidden dark:bg-black/55"
                />
            )}
            <div
                id="mobile-nav"
                hidden={!open}
                className="border-line bg-bg absolute inset-x-0 top-full border-b md:hidden"
            >
                <nav aria-label="Main" className="px-5 pt-3 pb-5">
                    <ul className="flex flex-col">
                        {items.map((item) => {
                            const active =
                                pathname === item.href ||
                                (item.href !== "/" &&
                                    pathname.startsWith(`${item.href}/`));
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => close(false)}
                                        aria-current={
                                            active ? "page" : undefined
                                        }
                                        className={cn(
                                            "flex items-baseline justify-between py-3 text-lg",
                                            active ? "text-fg" : "text-muted",
                                        )}
                                    >
                                        <span className="flex items-baseline gap-3">
                                            <span
                                                aria-hidden
                                                className={cn(
                                                    "text-accent-text w-3",
                                                    !active && "invisible",
                                                )}
                                            >
                                                &gt;
                                            </span>
                                            {item.label}
                                        </span>
                                        <span
                                            aria-hidden
                                            className="text-faint text-sm"
                                        >
                                            {item.path}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="mt-4 flex items-center justify-between">
                        {/* The first glyph lines up with the item text */}
                        <div className="-ml-[0.8125rem] flex">
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
                        </div>
                        <ThemeToggle className="-mr-2 size-11" />
                    </div>
                </nav>
            </div>
        </>
    );
}
