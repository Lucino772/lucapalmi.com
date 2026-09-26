import { cn } from "@/lib/cn";
import React from "react";
import { calloutLabels, type CalloutType } from "./callout-types";

export function Callout({
    type = "note",
    children,
}: React.PropsWithChildren<{ type?: CalloutType }>) {
    return (
        <aside
            aria-label={calloutLabels[type]}
            className={cn("not-prose flex flex-col rounded-sm p-3", {
                "border-2 border-[#4169E1] bg-[#4169E1]/40": type === "note",
                "border-2 border-emerald-500 bg-emerald-500/30": type === "tip",
                "border-2 border-amber-500 bg-amber-500/30": type === "warning",
            })}
        >
            <span className="font-headings mb-0 font-bold text-white">
                {calloutLabels[type]}
            </span>
            <div className="font-content text-base text-white/90">
                {children}
            </div>
        </aside>
    );
}
