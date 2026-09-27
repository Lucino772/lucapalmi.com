import React from "react";
import { calloutLabels, type CalloutType } from "./callout-types";

// Tinted box: the type colour at 11% with a 1px border at 28% (see
// .callout in globals.css)
export function Callout({
    type = "note",
    children,
}: React.PropsWithChildren<{ type?: CalloutType }>) {
    return (
        <aside
            aria-label={calloutLabels[type]}
            data-type={type}
            className="callout not-prose my-8"
        >
            <p className="callout-label font-serif text-[0.9375rem] leading-6 italic">
                {calloutLabels[type]}
            </p>
            <div className="callout-body mt-1 font-serif text-[1.0625rem] leading-7">
                {children}
            </div>
        </aside>
    );
}
