import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { topicLabel, topics } from "@/content/topics";
import { getWritingLog, type LogEntry } from "@/lib/writing";
import InkThumbnail from "@/components/ink-thumbnail";
import TopicFilter from "@/components/topic-filter";

export const metadata: Metadata = {
    title: "Writing | Luca Palmisano",
    description:
        "How software systems get designed and built, and what I learn from the things I try along the way.",
    alternates: { canonical: "https://lucapalmi.com/articles" },
};

const LIST_ID = "writing-list";

// The timeline sits in a centred 54rem column; the topic filter above it
// uses the full page container
const column = "mx-auto w-full max-w-[54rem]";

// Filtering is CSS: every entry and year group carries its topic ids, the
// filter sets data-topic on the list, and these rules (one per topic) keep
// only the matches. An unknown topic hides everything; data-empty hides the
// list so the filter's empty state stands alone.
const filterCss = [
    `#${LIST_ID}[data-topic] [data-topics]{display:none}`,
    ...topics.map(
        ({ id }) =>
            `#${LIST_ID}[data-topic="${id}"] [data-topics~="${id}"]{display:revert}`,
    ),
    `#${LIST_ID}[data-empty]{display:none}`,
].join("");

export default async function Articles() {
    const entries = await getWritingLog();
    const years = Array.from(new Set(entries.map((e) => e.year)));
    const filters = [
        { id: null, label: "All", count: entries.length },
        ...topics
            .map((topic) => ({
                id: topic.id,
                label: topic.label,
                count: entries.filter((e) => e.topics.includes(topic.id))
                    .length,
            }))
            .filter((topic) => topic.count > 0),
    ];
    // The first cover is usually the largest paint: preload it (the rest
    // stay lazy); phones hide thumbnails, so they only get a 1px candidate
    const firstCover = entries.find((e) => e.cover)?.slug;

    return (
        <div className="max-w-page mx-auto w-full px-5 pt-8 pb-24 md:px-6 md:pt-12">
            <style>{filterCss}</style>
            <div className="flex flex-col gap-10">
                <h1 className="sr-only">Writing</h1>
                <TopicFilter
                    filters={filters}
                    listId={LIST_ID}
                    column={column}
                />

                <div id={LIST_ID} className={column}>
                    {/* One spine for the whole timeline, like `git log --graph` */}
                    <div className="relative flex flex-col gap-6">
                        <span
                            aria-hidden
                            className="bg-line absolute top-2 bottom-2 left-[calc(0.25rem-0.5px)] w-px"
                        />
                        {years.map((year) => {
                            const inYear = entries.filter(
                                (e) => e.year === year,
                            );
                            return (
                                <section
                                    key={year}
                                    aria-labelledby={`year-${year}`}
                                    data-topics={Array.from(
                                        new Set(
                                            inYear.flatMap((e) => e.topics),
                                        ),
                                    ).join(" ")}
                                    className="relative"
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
                                        {inYear.map((entry) => (
                                            <TimelineEntry
                                                key={entry.slug}
                                                entry={entry}
                                                preload={
                                                    entry.slug === firstCover
                                                }
                                            />
                                        ))}
                                    </ol>
                                </section>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TimelineEntry({
    entry,
    preload,
}: {
    entry: LogEntry;
    preload: boolean;
}) {
    return (
        <li
            data-topics={entry.topics.join(" ")}
            className="group relative pl-6 [--entry-gap:0.75rem] sm:[--entry-gap:1rem] md:pl-8"
        >
            <span
                aria-hidden
                className="border-faint bg-bg group-hover:border-accent absolute top-[calc(var(--entry-gap)+0.5rem)] left-0 size-2 rounded-full border transition-colors duration-150"
            />
            <div className="group-hover:bg-raised -mx-3 grid grid-cols-[minmax(0,1fr)] items-start gap-x-4 rounded-[6px] px-3 py-[var(--entry-gap)] transition-colors duration-150 sm:grid-cols-[6.25rem_minmax(0,1fr)] md:grid-cols-[12.5rem_minmax(0,1fr)] md:gap-x-6">
                {/* Same 16:10 frame for every entry, cover or not; no
                    thumbnails on phones, where titles get the full width */}
                <div className="border-line bg-raised hidden aspect-[16/10] overflow-hidden rounded-[4px] border sm:block">
                    {entry.cover ? (
                        <Image
                            src={entry.cover.src}
                            width={entry.cover.width}
                            height={entry.cover.height}
                            sizes="(min-width: 768px) 200px, (min-width: 640px) 100px, 1px"
                            preload={preload}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <InkThumbnail
                            slug={entry.slug}
                            topic={entry.topics[0]}
                            className="h-full"
                        />
                    )}
                </div>
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
