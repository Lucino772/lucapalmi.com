"use client";

import { useEffect } from "react";
import { measureScrollbarWidth } from "@/lib/scrollbar-width";

// Browser zoom changes the scrollbar's width in CSS px. Zoom shows up as a
// resize with a new devicePixelRatio, so plain resizes cost nothing; the
// re-measure runs at most once per frame.
export default function ScrollbarWidthSync() {
    useEffect(() => {
        let ratio = window.devicePixelRatio;
        let frame = 0;
        const onResize = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                if (window.devicePixelRatio === ratio) return;
                ratio = window.devicePixelRatio;
                measureScrollbarWidth();
            });
        };
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
            cancelAnimationFrame(frame);
        };
    }, []);
    return null;
}
