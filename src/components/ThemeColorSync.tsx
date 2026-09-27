"use client";

import { useEffect } from "react";

// Keeps <meta name="theme-color"> on the actual page background, which can
// differ from the OS scheme (theme toggle) or change with the design panel's
// light surfaces
export default function ThemeColorSync() {
    useEffect(() => {
        const root = document.documentElement;
        const sync = () => {
            const bg = getComputedStyle(root)
                .getPropertyValue("--color-bg")
                .trim();
            if (!bg) return;
            document
                .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
                .forEach((meta) => meta.setAttribute("content", bg));
        };
        sync();
        const observer = new MutationObserver(sync);
        observer.observe(root, {
            attributes: true,
            attributeFilter: ["class", "data-light-surfaces"],
        });
        return () => observer.disconnect();
    }, []);

    return null;
}
