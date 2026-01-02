import { cn } from "@/lib/cn";
import React from "react";

export function Callout({
    type,
    children,
}: React.PropsWithChildren<{ type: "note" }>) {
    return (
        <div
            className={cn("not-prose flex flex-col rounded-sm p-3", {
                "border-2 border-[#4169E1] bg-[#4169E1]/40": type === "note",
            })}
        >
            <span className="font-headings mb-0 font-bold text-white">
                NOTE
            </span>
            <div className="font-content text-base text-white/90">
                {children}
            </div>
        </div>
    );
}
