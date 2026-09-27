"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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

    // The timeline sits in a centred 54rem column; the topic filter above it
    // uses the full page container
    const column = "mx-auto w-full max-w-[54rem]";

    // From sm up the tabs show when they fit on one line; otherwise (and on
    // phones) the native select does. A ResizeObserver compares the tab
    // row's natural width with the space it has, so it keeps working as
    // topics are added. Until it reports, the server's render stands: tabs
    // from sm up, clipped rather than wrapped.
    const slotRef = useRef<HTMLDivElement>(null);
    const rowRef = useRef<HTMLDivElement>(null);
    const [tabsOverflow, setTabsOverflow] = useState(false);
    useEffect(() => {
        const slot = slotRef.current;
        const row = rowRef.current;
        if (!slot || !row) return;
        const observer = new ResizeObserver(() => {
            setTabsOverflow(
                row.getBoundingClientRect().width >
                    slot.getBoundingClientRect().width + 0.5,
            );
        });
        observer.observe(slot);
        observer.observe(row);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex flex-col gap-10">
            <div className="w-full">
                <h1 className="sr-only">Writing</h1>
                {/* Phones, or tabs that don't fit: one native select, the OS
                    picker does the rest */}
                <div
                    className={cn(
                        "flex items-center gap-3 sm:mx-auto sm:max-w-[22rem]",
                        !tabsOverflow && "sm:hidden",
                    )}
                >
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
                {/* From sm up: the topic tabs on one line, centred in the
                    page. When they don't fit, the slot collapses (still laid
                    out, so it can be measured) */}
                <div
                    ref={slotRef}
                    aria-hidden={tabsOverflow || undefined}
                    className={cn(
                        "hidden overflow-hidden sm:block",
                        tabsOverflow ? "invisible h-0" : "min-h-11",
                    )}
                >
                    <div
                        ref={rowRef}
                        role="group"
                        aria-label="Filter by topic"
                        className="mx-auto flex w-max gap-1"
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
                            className="bg-line absolute top-2 bottom-2 left-[calc(0.25rem-0.5px)] w-px"
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
        <li className="group relative pl-6 [--entry-gap:0.75rem] sm:[--entry-gap:1rem] md:pl-8">
            <span
                aria-hidden
                className="border-faint bg-bg group-hover:border-accent absolute top-[calc(var(--entry-gap)+0.5rem)] left-0 size-2 rounded-full border transition-colors duration-150 sm:top-[calc(var(--entry-gap)+0.9rem)] md:top-[calc(var(--entry-gap)+1.15rem)]"
            />
            <div className="group-hover:bg-raised -mx-3 grid grid-cols-[minmax(0,1fr)] items-start gap-x-4 rounded-[6px] px-3 py-[var(--entry-gap)] transition-colors duration-150 sm:grid-cols-[6.25rem_minmax(0,1fr)] md:grid-cols-[12.5rem_minmax(0,1fr)] md:gap-x-6">
                {/* No thumbnails on phones: titles get the full width */}
                <Thumb
                    entry={entry}
                    sizes="(min-width: 768px) 200px, 100px"
                    className="hidden sm:block"
                />
                <div className="min-w-0">
                    <p className="text-faint flex flex-wrap gap-x-[2ch] text-[0.8125rem] leading-6 tabular-nums">
                        <time dateTime={entry.date}>{entry.date}</time>
                        {entry.minutes && <span>{entry.minutes}</span>}
                    </p>
                    <h3 className="mt-0.5 text-[1.125rem] leading-[1.45] font-semibold sm:text-[1.25rem] md:leading-[1.6]">
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
