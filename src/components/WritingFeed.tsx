"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";
import type { LogEntry } from "@/lib/writing";
import WritingLog from "./WritingLog";

type Kind = "all" | "essay" | "note";

const filters: { kind: Kind; label: string; href: string }[] = [
    { kind: "all", label: "All", href: "/articles" },
    { kind: "essay", label: "Essays", href: "/articles?kind=essay" },
    { kind: "note", label: "Notes", href: "/articles?kind=note" },
];

export default function WritingFeed({ entries }: { entries: LogEntry[] }) {
    const param = useSearchParams().get("kind");
    const kind: Kind = param === "essay" || param === "note" ? param : "all";
    return <WritingFeedView entries={entries} kind={kind} />;
}

export function WritingFeedView({
    entries,
    kind,
}: {
    entries: LogEntry[];
    kind: Kind;
}) {
    const visible =
        kind === "all" ? entries : entries.filter((e) => e.kind === kind);
    const years = Array.from(new Set(visible.map((e) => e.year)));

    return (
        <div className="flex flex-col gap-10">
            <nav aria-label="Filter by kind">
                <ul className="border-line flex gap-1 border-b">
                    {filters.map((filter) => {
                        const count =
                            filter.kind === "all"
                                ? entries.length
                                : entries.filter((e) => e.kind === filter.kind)
                                      .length;
                        const active = filter.kind === kind;
                        return (
                            <li key={filter.kind}>
                                <Link
                                    href={filter.href}
                                    scroll={false}
                                    aria-current={active ? "page" : undefined}
                                    className={cn(
                                        "relative flex items-baseline gap-2 px-3 pt-1 pb-3 text-[0.9375rem] transition-colors duration-150",
                                        "after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:content-['']",
                                        active
                                            ? "text-fg after:bg-accent"
                                            : "text-muted hover:text-fg",
                                    )}
                                >
                                    {filter.label}
                                    <span className="text-faint text-[0.8125rem] tabular-nums">
                                        {count}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {visible.length === 0 ? (
                <p className="text-muted text-[0.9375rem]">
                    Nothing here yet.{" "}
                    <Link
                        href="/articles"
                        className="text-accent underline decoration-current/40 underline-offset-4"
                    >
                        Show all writing
                    </Link>
                </p>
            ) : (
                years.map((year) => (
                    <section
                        key={year}
                        aria-labelledby={`year-${year}`}
                        className="grid gap-x-10 gap-y-3 md:grid-cols-[12rem_minmax(0,1fr)]"
                    >
                        <h2
                            id={`year-${year}`}
                            className="text-faint text-[0.9375rem] leading-7 tabular-nums md:pt-2"
                        >
                            {year}
                        </h2>
                        <WritingLog
                            entries={visible.filter((e) => e.year === year)}
                        />
                    </section>
                ))
            )}
        </div>
    );
}
