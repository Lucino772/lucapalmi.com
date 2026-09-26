"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

// Runs before first paint: an explicit choice wins, otherwise follow the OS
export const themeScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.classList.toggle("dark",t==="dark")}catch(e){}})()`;

function subscribe(callback: () => void) {
    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
    });
    return () => observer.disconnect();
}

function getTheme(): Theme {
    return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
}

export function useTheme() {
    const theme = useSyncExternalStore<Theme | null>(
        subscribe,
        getTheme,
        () => null,
    );

    const setTheme = (next: Theme) => {
        document.documentElement.classList.toggle("dark", next === "dark");
        localStorage.setItem(STORAGE_KEY, next);
    };

    return { theme, setTheme };
}

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();
    const next = theme === "dark" ? "light" : "dark";
    const label = theme === null ? "Toggle theme" : `Switch to ${next} theme`;

    // Everything swaps on classes/attributes set before paint, so nothing
    // flashes: the lever sits on the .dark class, and data-theme-toggle
    // (design panel) picks the wall switch (default) or the sun/moon icon
    return (
        <button
            type="button"
            className={cn(
                "text-muted hover:text-fg hover:bg-raised inline-flex size-8 cursor-pointer items-center justify-center rounded-[4px] transition-colors duration-150",
                className,
            )}
            onClick={() => setTheme(next)}
            aria-label={label}
            title={label}
        >
            <svg
                aria-hidden
                viewBox="0 0 16 22"
                fill="none"
                className="theme-icon:hidden block h-5 w-auto"
            >
                {/* Wall plate with two screw ticks */}
                <rect
                    x="0.5"
                    y="0.5"
                    width="15"
                    height="21"
                    rx="1.5"
                    stroke="currentColor"
                    vectorEffect="non-scaling-stroke"
                />
                <path
                    d="M7 2.75h2M7 19.25h2"
                    stroke="currentColor"
                    opacity="0.6"
                    vectorEffect="non-scaling-stroke"
                />
                {/* Slot */}
                <rect
                    x="5"
                    y="5"
                    width="6"
                    height="12"
                    rx="0.75"
                    stroke="currentColor"
                    opacity="0.55"
                    vectorEffect="non-scaling-stroke"
                />
                {/* Lever: up and lit in royal blue in light mode, down in dark */}
                <rect
                    x="6.25"
                    y="6"
                    width="3.5"
                    height="5"
                    rx="0.5"
                    className="fill-accent transition-transform duration-150 dark:translate-y-[5px] dark:fill-current"
                />
            </svg>
            <SunIcon
                aria-hidden
                className="theme-icon:dark:block hidden size-4"
            />
            <MoonIcon
                aria-hidden
                className="theme-icon:block theme-icon:dark:hidden hidden size-4"
            />
        </button>
    );
}
