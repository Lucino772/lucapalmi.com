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

    // Icons swap on the .dark class so the right one shows before hydration
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
            <SunIcon aria-hidden className="hidden size-4 dark:block" />
            <MoonIcon aria-hidden className="block size-4 dark:hidden" />
        </button>
    );
}
