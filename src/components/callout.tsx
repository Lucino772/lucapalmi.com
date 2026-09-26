import React from "react";

export function Callout({
    type,
    children,
}: React.PropsWithChildren<{ type: "note" }>) {
    return (
        <aside
            className="not-prose border-accent bg-accent/[0.06] my-8 border-l-2 py-3.5 pr-5 pl-5"
            aria-label={type}
        >
            <p className="text-accent-text font-mono text-[0.8125rem] leading-5">
                {type}
            </p>
            <div className="text-fg/90 mt-1.5 font-serif text-[1rem] leading-7">
                {children}
            </div>
        </aside>
    );
}
