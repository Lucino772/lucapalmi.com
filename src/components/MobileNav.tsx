"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { about } from "@/content/about";
import { ThemeToggle } from "./theme";
import { isActive, navItems } from "./nav-items";

type Props = {
    open: boolean;
    close: () => void;
};

const items = [{ href: "/", label: "Home", path: "~" }, ...navItems];

export default function MobileNav({ open, close }: Props) {
    const pathname = usePathname();

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, close]);

    return (
        <div
            id="mobile-nav"
            hidden={!open}
            className="border-line bg-bg absolute inset-x-0 top-full border-b md:hidden"
        >
            <nav aria-label="Main" className="px-5 pt-3 pb-5">
                <ul className="flex flex-col">
                    {items.map((item) => {
                        const active =
                            item.href === "/"
                                ? pathname === "/"
                                : isActive(pathname, item.href);
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={close}
                                    aria-current={active ? "page" : undefined}
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
                <div className="text-muted mt-4 flex items-center justify-between text-sm">
                    <div className="flex gap-5">
                        <a
                            href={about.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-fg py-2"
                        >
                            GitHub
                        </a>
                        <a
                            href={about.links.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-fg py-2"
                        >
                            LinkedIn
                        </a>
                    </div>
                    <ThemeToggle className="size-10" />
                </div>
            </nav>
        </div>
    );
}
