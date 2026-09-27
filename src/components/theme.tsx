"use client";

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

    // The lever position rides on the .dark class, set before paint, so
    // nothing flashes
    return (
        <button
            type="button"
            className={cn(
                "text-muted hover:text-fg inline-flex size-8 cursor-pointer items-center justify-center rounded-[4px] transition-colors duration-150",
                className,
            )}
            onClick={() => setTheme(next)}
            aria-label={label}
            title={label}
        >
            {/* The Lamplight wall switch, same geometry and 24px size as
                V6 (smaller, the lever shrinks to a stray dot); lever lit
                royal blue when up (light), outline colour when down (dark) */}
            <svg
                aria-hidden
                viewBox="0 0 20 28"
                fill="none"
                className="block h-6 w-auto"
            >
                <rect
                    x="1"
                    y="1"
                    width="18"
                    height="26"
                    rx="3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <rect
                    x="6.5"
                    y="6"
                    width="7"
                    height="16"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    opacity="0.6"
                />
                <rect
                    x="7.75"
                    width="4.5"
                    height="7"
                    rx="1.25"
                    className="fill-accent translate-y-[7.25px] transition-transform duration-150 dark:translate-y-[13.75px] dark:fill-current"
                />
            </svg>
        </button>
    );
}
