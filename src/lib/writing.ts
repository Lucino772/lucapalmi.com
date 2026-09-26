import { getArticles } from "@/lib/cms";
import { isoDay, readingMinutes } from "@/lib/format";
import { toSorted } from "@/lib/utils";

export type LogEntry = {
    slug: string;
    kind: "essay" | "note";
    title: string;
    subtitle: string;
    date: string;
    year: number;
    minutes?: string;
};

// Newest first, flattened to plain data so it can cross into client components
export async function getWritingLog(): Promise<LogEntry[]> {
    const articles = await getArticles();
    return toSorted(articles, (a) => a.metadata.createdAt, false).map(
        ({ slug, metadata }) => ({
            slug,
            kind: metadata.kind,
            title: metadata.title,
            subtitle: metadata.subtitle,
            date: isoDay(metadata.createdAt),
            year: metadata.createdAt.getFullYear(),
            minutes: readingMinutes(metadata.readingTime),
        }),
    );
}
