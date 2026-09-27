"use client";

import { useEffect, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { topics } from "@/content/topics";

// The topic filter above the writing timeline. The timeline itself is
// server-rendered (all entries in the static HTML); this sets data-topic
// (and data-empty) on the list container and CSS hides what doesn't match.
// The selection lives in ?topic= so filtered views can be shared; it is
// read on the client only, so /articles stays statically generated.

export type TopicFilterItem = {
    id: string | null;
    label: string;
    count: number;
};

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

export default function TopicFilter({
    filters,
    listId,
    column,
}: {
    filters: TopicFilterItem[];
    // The server-rendered list container to mark with the active topic
    listId: string;
    // The timeline column's classes, for the select and the empty state
    column: string;
}) {
    const selected = useSyncExternalStore(subscribe, readTopic, () => null);
    const total = filters[0].count;
    const current = filters.find((f) => f.id === selected);
    const count = selected ? (current?.count ?? 0) : total;
    // Any known topic keeps its label, even with no articles yet
    const label = selected
        ? (topics.find((t) => t.id === selected)?.label ?? selected)
        : null;

    useEffect(() => {
        const list = document.getElementById(listId);
        if (!list) return;
        if (selected) list.dataset.topic = selected;
        else delete list.dataset.topic;
        if (count === 0) list.dataset.empty = "";
        else delete list.dataset.empty;
    }, [listId, selected, count]);

    return (
        <div className="w-full">
            {/* Below lg (phones, portrait tablets): one native select, the
                OS picker does the rest; label and select span the list
                column, on the timeline's edges */}
            <div className={`${column} flex items-center gap-3 lg:hidden`}>
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
                        {selected && !current && (
                            <option value={selected}>{label} (0)</option>
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
            {/* From lg (landscape tablets, desktops): the topic tabs on one
                line, centred in the page; if they outgrow it they scroll
                sideways (the thin native scrollbar only appears then) */}
            <div className="tab-scroller hidden overflow-x-auto overflow-y-hidden lg:block">
                <div
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
                    ? `${count} of ${total} filed under ${label}`
                    : `${total} entries, newest first`}
            </p>
            {count === 0 && (
                <div
                    className={`${column} text-muted mt-10 text-center text-[0.9375rem] leading-7`}
                >
                    <p>Nothing filed under {label} yet.</p>
                    <button
                        type="button"
                        onClick={() => selectTopic(null)}
                        className="text-accent-text mt-1 cursor-pointer underline decoration-current/40 underline-offset-4 hover:decoration-current max-sm:relative max-sm:after:absolute max-sm:after:inset-x-0 max-sm:after:-inset-y-2 max-sm:after:content-[''] pointer-coarse:relative pointer-coarse:after:absolute pointer-coarse:after:inset-x-0 pointer-coarse:after:-inset-y-2 pointer-coarse:after:content-['']"
                    >
                        Show all writing
                    </button>
                </div>
            )}
        </div>
    );
}
