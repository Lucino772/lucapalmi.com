"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { ChevronRightIcon, XIcon } from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {
    open: boolean;
    close?: () => void;
};

export default function MobileNav({ open, close }: Props = { open: false }) {
    const currentPath = usePathname();
    const handleClose = close !== undefined ? close : () => null;
    return (
        <div
            className={cn(
                "fixed top-0 bottom-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-white transition-all duration-200 md:hidden",
                {
                    "right-0": open,
                    "-right-full": !open,
                },
            )}
        >
            <nav className="font-content flex h-1/2 flex-col items-center justify-evenly gap-5">
                <Link
                    onClick={handleClose}
                    className="flex flex-row items-center gap-2 text-2xl tracking-widest text-black"
                    href="/"
                >
                    {currentPath === "/" && (
                        <ChevronRightIcon className="size-5" color="black" />
                    )}
                    Home
                </Link>
                <Link
                    onClick={handleClose}
                    className="flex flex-row items-center gap-2 text-2xl tracking-widest text-black"
                    href="/projects"
                >
                    {currentPath === "/projects" && (
                        <ChevronRightIcon className="size-5" color="black" />
                    )}
                    Projects
                </Link>
                <Link
                    onClick={handleClose}
                    className="flex flex-row items-center gap-2 text-2xl tracking-widest text-black"
                    href="/articles"
                >
                    {currentPath === "/articles" && (
                        <ChevronRightIcon className="size-5" color="black" />
                    )}
                    Blog
                </Link>
            </nav>

            <XIcon
                className="absolute top-4 right-4 block h-8 w-8 hover:cursor-pointer"
                color="black"
                onClick={handleClose}
            />
        </div>
    );
}
