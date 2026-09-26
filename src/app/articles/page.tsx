import { Suspense } from "react";
import type { Metadata } from "next";
import { getWritingLog } from "@/lib/writing";
import PageHeader from "@/components/PageHeader";
import WritingFeed, { WritingFeedView } from "@/components/WritingFeed";

export const metadata: Metadata = {
    title: "Writing | Luca Palmisano",
    description:
        "Essays on software systems and architecture, and short notes on what I am building and trying.",
    alternates: { canonical: "https://lucapalmi.com/articles" },
};

export default async function Articles() {
    const entries = await getWritingLog();

    return (
        <div className="max-w-page mx-auto w-full px-5 pb-20 md:px-6 md:pb-28">
            <PageHeader path="~/writing" title="Writing">
                <p>
                    <span className="text-accent">Essays</span> are long pieces
                    on how systems are designed and built.{" "}
                    <span className="text-fg">Notes</span> are short: something
                    I tried, and what I think about it.
                </p>
            </PageHeader>
            <Suspense
                fallback={<WritingFeedView entries={entries} kind="all" />}
            >
                <WritingFeed entries={entries} />
            </Suspense>
        </div>
    );
}
