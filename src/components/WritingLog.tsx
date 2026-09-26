import Link from "next/link";
import type { LogEntry } from "@/lib/writing";

// Compact dated log for the home page: every entry gets the same row
export default function WritingLog({ entries }: { entries: LogEntry[] }) {
    return (
        <ol className="-mx-3 flex flex-col">
            {entries.map((entry) => (
                <li
                    key={entry.slug}
                    className="group hover:bg-raised relative grid grid-cols-[minmax(0,1fr)] gap-x-[2ch] rounded-[4px] px-3 py-3 transition-colors duration-150 sm:grid-cols-[10ch_minmax(0,1fr)_auto]"
                >
                    <time
                        dateTime={entry.date}
                        className="text-faint text-[0.8125rem] leading-6 tabular-nums sm:text-[0.9375rem] sm:leading-7"
                    >
                        {entry.date}
                    </time>
                    <div className="min-w-0">
                        <Link
                            href={`/articles/${entry.slug}`}
                            className="text-fg group-hover:text-accent-text text-[1rem] leading-7 font-semibold transition-colors duration-150 after:absolute after:inset-0 after:content-['']"
                        >
                            {entry.title}
                        </Link>
                        <p className="text-muted mt-0.5 font-serif text-[0.9375rem] leading-6 italic">
                            {entry.subtitle}
                        </p>
                    </div>
                    <span className="text-faint hidden text-[0.8125rem] leading-7 tabular-nums sm:block">
                        {entry.minutes}
                    </span>
                </li>
            ))}
        </ol>
    );
}
