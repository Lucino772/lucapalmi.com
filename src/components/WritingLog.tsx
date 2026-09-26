import Link from "next/link";
import { cn } from "@/lib/cn";
import type { LogEntry } from "@/lib/writing";

export default function WritingLog({ entries }: { entries: LogEntry[] }) {
    return (
        <ol className="-mx-3 flex flex-col">
            {entries.map((entry) => (
                <LogRow key={entry.slug} entry={entry} />
            ))}
        </ol>
    );
}

function LogRow({ entry }: { entry: LogEntry }) {
    const essay = entry.kind === "essay";
    return (
        <li
            className={cn(
                "group hover:bg-raised relative grid grid-cols-[auto_1fr] gap-x-[2ch] rounded-[4px] px-3 transition-colors duration-150",
                "sm:grid-cols-[10ch_5ch_minmax(0,1fr)_auto]",
                essay ? "py-3.5" : "py-2",
            )}
        >
            <time
                dateTime={entry.date}
                className="text-faint text-[0.8125rem] leading-6 tabular-nums sm:text-[0.9375rem] sm:leading-7"
            >
                {entry.date}
            </time>
            <span
                className={cn(
                    "text-[0.8125rem] leading-6 sm:text-[0.9375rem] sm:leading-7",
                    essay ? "text-accent" : "text-faint",
                )}
            >
                {entry.kind}
            </span>
            <div className="col-span-2 min-w-0 sm:col-span-1">
                <Link
                    href={`/articles/${entry.slug}`}
                    className={cn(
                        "group-hover:text-accent leading-7 transition-colors duration-150 after:absolute after:inset-0 after:content-['']",
                        essay
                            ? "text-fg text-[1.0625rem] font-semibold"
                            : "text-fg/90 text-[0.9375rem]",
                    )}
                >
                    {entry.title}
                </Link>
                {essay && (
                    <p className="text-muted mt-0.5 font-serif text-[0.9375rem] leading-6 italic">
                        {entry.subtitle}
                    </p>
                )}
            </div>
            <span className="text-faint hidden text-[0.8125rem] leading-7 tabular-nums sm:block">
                {entry.minutes}
            </span>
        </li>
    );
}
