"use client";

import Link from "next/link";
import { useCallback } from "react";
import { cn } from "@/lib/cn";
import { XIcon } from "lucide-react";

type Props = {
    open: boolean;
    close?: () => void;
};

export default function MobileNav({ open, close }: Props = { open: false }) {
    const handleClose = useCallback(() => {
        if (close === undefined) return;
        close();
    }, [close]);

    return (
        <div
            className={cn(
                "fixed bottom-0 top-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-white transition-all duration-200 md:hidden",
                {
                    "right-0": open,
                    "-right-full": !open,
                },
            )}
        >
            <nav className="flex h-1/2 flex-col items-center justify-evenly gap-5">
                <Link
                    onClick={handleClose}
                    className="text-2xl tracking-widest text-black"
                    href="/"
                >
                    Home
                </Link>
                <Link
                    onClick={handleClose}
                    className="text-2xl tracking-widest text-black"
                    href="/about"
                >
                    About
                </Link>
                <Link
                    onClick={handleClose}
                    className="text-2xl tracking-widest text-black"
                    href="/projects"
                >
                    Projects
                </Link>
            </nav>

            <XIcon
                className="absolute right-4 top-4 block h-8 w-8 hover:cursor-pointer"
                color="black"
                onClick={handleClose}
            />
        </div>
    );
}
