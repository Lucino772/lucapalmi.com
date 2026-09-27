"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const subscribe = () => () => {};

export default function MissingPath() {
    const pathname = usePathname();
    // The 404 page is prerendered once, without the requested path, so the
    // path only appears after hydration; rendering it straight away made
    // the server and client text differ (React #418), and the recovery
    // re-render dropped the pre-paint `dark` class
    const hydrated = useSyncExternalStore(
        subscribe,
        () => true,
        () => false,
    );
    const path = hydrated ? pathname : "";
    return (
        <pre className="bg-raised border-line rounded-[6px] border px-5 py-4 font-mono text-[0.9375rem] leading-7 break-words whitespace-pre-wrap">
            <span className="text-faint">~ $ </span>
            <span>open {path}</span>
            {"\n"}
            <span className="text-muted">
                open: no such file or directory: {path}
            </span>
        </pre>
    );
}
