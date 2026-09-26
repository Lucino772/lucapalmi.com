"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

/**
 * Two candidate home page layouts, under evaluation:
 * - "scroll": the full home page with sections below the fold
 * - "fit": a single-screen home page that never scrolls on typical viewports
 *
 * The active layout is exposed as `data-home-layout` on <html> so each design
 * can switch with CSS. Only the default applies in production; the override
 * (query param, localStorage, toggle) is a development review aid.
 */
export type HomeLayout = "scroll" | "fit";

export const DEFAULT_HOME_LAYOUT: HomeLayout = "scroll";

const STORAGE_KEY = "home-layout";
const ATTRIBUTE = "data-home-layout";
const allowOverride = process.env.NODE_ENV !== "production";

// Runs before first paint so the chosen layout never flashes
export const homeLayoutScript = allowOverride
    ? `(function(){try{var v=new URLSearchParams(location.search).get("home");if(v==="fit"||v==="scroll"){localStorage.setItem("${STORAGE_KEY}",v)}else{v=localStorage.getItem("${STORAGE_KEY}")}if(v!=="fit"&&v!=="scroll"){v="${DEFAULT_HOME_LAYOUT}"}document.documentElement.setAttribute("${ATTRIBUTE}",v)}catch(e){document.documentElement.setAttribute("${ATTRIBUTE}","${DEFAULT_HOME_LAYOUT}")}})()`
    : `document.documentElement.setAttribute("${ATTRIBUTE}","${DEFAULT_HOME_LAYOUT}")`;

function subscribe(callback: () => void) {
    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: [ATTRIBUTE],
    });
    return () => observer.disconnect();
}

function getLayout(): HomeLayout {
    return document.documentElement.getAttribute(ATTRIBUTE) === "fit"
        ? "fit"
        : "scroll";
}

export function useHomeLayout() {
    const layout = useSyncExternalStore<HomeLayout>(
        subscribe,
        getLayout,
        () => DEFAULT_HOME_LAYOUT,
    );

    const setLayout = (next: HomeLayout) => {
        document.documentElement.setAttribute(ATTRIBUTE, next);
        localStorage.setItem(STORAGE_KEY, next);
        const url = new URL(window.location.href);
        url.searchParams.set("home", next);
        window.history.replaceState(null, "", url);
    };

    return { layout, setLayout };
}

/**
 * Development-only switch between the two home layouts. Renders nothing in
 * production or outside the home page. Style it via `className`.
 */
export function HomeLayoutToggle({ className }: { className?: string }) {
    const pathname = usePathname();
    const { layout, setLayout } = useHomeLayout();

    if (!allowOverride || pathname !== "/") {
        return null;
    }

    return (
        <div
            role="group"
            aria-label="Home layout (review)"
            className={cn(
                "fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border p-1 text-xs shadow-lg",
                className,
            )}
        >
            {(["scroll", "fit"] as const).map((option) => (
                <button
                    key={option}
                    type="button"
                    aria-pressed={layout === option}
                    onClick={() => setLayout(option)}
                    className="cursor-pointer rounded-full px-3 py-1 capitalize aria-pressed:font-semibold"
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
