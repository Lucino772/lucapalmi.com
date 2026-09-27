"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { topicLabel, topics, type TopicId } from "@/content/topics";
import type { LogEntry } from "@/lib/writing";
import Thumb from "./Thumb";

// The selected topic lives in ?topic= so filtered views can be shared.
// Read on the client only, so /articles stays statically prerendered.
const TOPIC_EVENT = "topicchange";

function subscribe(callback: () => void) {
    window.addEventListener("popstate", callback);
    window.addEventListener(TOPIC_EVENT, callback);
    return () => {
        window.removeEventListener("popstate", callback);
        window.removeEventListener(TOPIC_EVENT, callback);
    };
}

const readTopic = () =>
    new URLSearchParams(window.location.search).get("topic");

function selectTopic(topic: string | null) {
    const url = new URL(window.location.href);
    if (topic) url.searchParams.set("topic", topic);
    else url.searchParams.delete("topic");
    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new Event(TOPIC_EVENT));
}

export default function WritingTimeline({ entries }: { entries: LogEntry[] }) {
    const selected = useSyncExternalStore(subscribe, readTopic, () => null);

    const available = topics
        .map((topic) => ({
            ...topic,
            count: entries.filter((e) => e.topics.includes(topic.id)).length,
        }))
        .filter((topic) => topic.count > 0);

    const visible = selected
        ? entries.filter((e) => e.topics.includes(selected as TopicId))
        : entries;
    const years = Array.from(new Set(visible.map((e) => e.year)));
    const label = selected
        ? (topics.find((t) => t.id === selected)?.label ?? selected)
        : null;

    const filters = [
        { id: null, label: "All", count: entries.length },
        ...available,
    ];

    // Tabs and timeline share one centred 54rem column (all 8 tabs fit on one
    // row)
    const column = "mx-auto w-full max-w-[54rem]";
    return (
        <div className="flex flex-col gap-10">
            <div className="mx-auto w-full max-w-[54rem]">
                <h1 className="sr-only">Writing</h1>
                {/* Phones: one native select, the OS picker does the rest */}
                <div className="flex items-center gap-3 sm:hidden">
                    <label
                        htmlFor="topic-filter"
                        className="text-faint text-[0.875rem]"
                    >
                        topic
                    </label>
                    <div className="relative min-w-0 flex-1">
                        <select
                            id="topic-filter"
                            value={selected ?? ""}
                            onChange={(event) =>
                                selectTopic(event.target.value || null)
                            }
                            className="border-line bg-raised text-fg focus-visible:outline-accent h-11 w-full cursor-pointer appearance-none rounded-[4px] border pr-9 pl-3 text-base focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            {filters.map((filter) => (
                                <option
                                    key={filter.id ?? "all"}
                                    value={filter.id ?? ""}
                                >
                                    {filter.label} ({filter.count})
                                </option>
                            ))}
                            {/* An unknown ?topic= still shows what is filtered */}
                            {selected &&
                                !filters.some((f) => f.id === selected) && (
                                    <option value={selected}>
                                        {label} (0)
                                    </option>
                                )}
                        </select>
                        <svg
                            aria-hidden
                            viewBox="0 0 12 12"
                            className="text-faint pointer-events-none absolute top-1/2 right-3 size-3 -translate-y-1/2"
                        >
                            <path
                                d="M2.5 4.5 6 8l3.5-3.5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                        </svg>
                    </div>
                </div>
                {/* From sm up: the topic tabs start the page, on the content's
                    left edge */}
                <div className="-mx-5 hidden items-start pl-5 sm:flex md:mx-0 md:pl-0">
                    <div
                        role="group"
                        aria-label="Filter by topic"
                        className="no-scrollbar -ml-3 flex min-w-0 flex-1 gap-1 overflow-x-auto overflow-y-hidden [mask-image:linear-gradient(to_right,black_calc(100%-2.5rem),transparent)] pr-8 md:flex-wrap md:overflow-visible md:[mask-image:none] md:pr-0"
                    >
                        {filters.map((filter) => {
                            const active = filter.id === selected;
                            return (
                                <button
                                    key={filter.id ?? "all"}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() => selectTopic(filter.id)}
                                    className={cn(
                                        "relative flex shrink-0 cursor-pointer items-baseline gap-2 px-3 pt-1 pb-3 text-[0.9375rem] whitespace-nowrap transition-colors duration-150 focus-visible:outline-offset-[-2px]",
                                        "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:content-['']",
                                        active
                                            ? "text-fg after:bg-accent"
                                            : "text-muted hover:text-fg",
                                    )}
                                >
                                    {filter.label}
                                    <span className="text-faint text-[0.8125rem] tabular-nums">
                                        {filter.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
                <p aria-live="polite" className="sr-only">
                    {label
                        ? `${visible.length} of ${entries.length} filed under ${label}`
                        : `${entries.length} entries, newest first`}
                </p>
            </div>

            <div className={column}>
                {visible.length === 0 ? (
                    <div className="text-muted text-[0.9375rem] leading-7">
                        <p>Nothing filed under {label} yet.</p>
                        <button
                            type="button"
                            onClick={() => selectTopic(null)}
                            className="text-accent-text mt-1 cursor-pointer underline decoration-current/40 underline-offset-4 hover:decoration-current"
                        >
                            Show all writing
                        </button>
                    </div>
                ) : (
                    // One spine for the whole timeline, like `git log --graph`
                    <div className="relative">
                        <span
                            aria-hidden
                            className="bg-line absolute top-2 bottom-2 left-[3.5px] w-px"
                        />
                        {years.map((year) => (
                            <section
                                key={year}
                                aria-labelledby={`year-${year}`}
                                className="relative pb-6 last:pb-0"
                            >
                                <h2
                                    id={`year-${year}`}
                                    className="flex items-center gap-4 pb-2 text-[0.9375rem] leading-7 font-semibold tabular-nums"
                                >
                                    <span
                                        aria-hidden
                                        className="bg-accent ring-bg relative size-2 ring-4"
                                    />
                                    {year}
                                </h2>
                                <ol>
                                    {visible
                                        .filter((e) => e.year === year)
                                        .map((entry) => (
                                            <TimelineEntry
                                                key={entry.slug}
                                                entry={entry}
                                            />
                                        ))}
                                </ol>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function TimelineEntry({ entry }: { entry: LogEntry }) {
    return (
        <li className="group relative pl-6 [--entry-gap:calc(var(--writing-entry-gap,16px)*0.75)] sm:[--entry-gap:var(--writing-entry-gap,16px)] md:pl-8">
            <span
                aria-hidden
                className="border-faint bg-bg group-hover:border-accent absolute top-[calc(var(--entry-gap)+0.5rem)] left-0 size-2 rounded-full border transition-colors duration-150 sm:top-[calc(var(--entry-gap)+0.9rem)] md:top-[calc(var(--entry-gap)+1.15rem)]"
            />
            <div className="group-hover:bg-raised -mx-3 grid grid-cols-[minmax(0,1fr)] items-start gap-x-4 rounded-[6px] px-3 py-[var(--entry-gap)] transition-colors duration-150 sm:grid-cols-[calc(var(--writing-thumb-width,176px)/2)_minmax(0,1fr)] md:grid-cols-[var(--writing-thumb-width,176px)_minmax(0,1fr)] md:gap-x-6">
                {/* No thumbnails on phones: titles get the full width */}
                <Thumb
                    entry={entry}
                    sizes="(min-width: 768px) 176px, 88px"
                    className="hidden sm:block"
                />
                <div className="min-w-0">
                    <p className="text-faint flex flex-wrap gap-x-[2ch] text-[0.8125rem] leading-6 tabular-nums">
                        <time dateTime={entry.date}>{entry.date}</time>
                        {entry.minutes && <span>{entry.minutes}</span>}
                    </p>
                    <h3 className="mt-0.5 text-[length:min(var(--writing-title-size,17px),16px)] leading-[1.45] font-semibold md:text-[length:var(--writing-title-size,17px)] md:leading-[1.6]">
                        <Link
                            href={`/articles/${entry.slug}`}
                            className="group-hover:text-accent-text transition-colors duration-150 after:absolute after:inset-0 after:content-['']"
                        >
                            {entry.title}
                        </Link>
                    </h3>
                    <p className="text-muted mt-1 hidden font-serif text-[0.9375rem] leading-6 italic sm:block">
                        {entry.subtitle}
                    </p>
                    {entry.topics.length > 0 && (
                        <ul className="text-faint mt-1.5 flex flex-wrap gap-x-[2ch] text-[0.8125rem] leading-6">
                            {entry.topics.map((topic) => (
                                <li key={topic}>{topicLabel(topic)}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </li>
    );
}
