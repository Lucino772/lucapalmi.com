"use client";

import { usePathname } from "next/navigation";

export default function MissingPath() {
    const pathname = usePathname();
    return (
        <pre className="bg-raised border-line rounded-[6px] border px-5 py-4 font-mono text-[0.9375rem] leading-7 break-words whitespace-pre-wrap">
            <span className="text-faint">~ $ </span>
            <span>open {pathname}</span>
            {"\n"}
            <span className="text-muted">
                open: no such file or directory: {pathname}
            </span>
        </pre>
    );
}
