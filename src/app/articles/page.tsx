import type { Metadata } from "next";
import { getWritingLog } from "@/lib/writing";
import PageHeader from "@/components/PageHeader";
import WritingTimeline from "@/components/WritingTimeline";

export const metadata: Metadata = {
    title: "Writing | Luca Palmisano",
    description:
        "Writing on how software systems are designed and built, from infrastructure to developer tools.",
    alternates: { canonical: "https://lucapalmi.com/articles" },
};

export default async function Articles() {
    const entries = await getWritingLog();

    return (
        <div className="max-w-page mx-auto w-full px-5 pb-20 md:px-6 md:pb-28">
            <PageHeader path="~/writing" title="Writing">
                <p>
                    How software systems get designed and built, and what I
                    learn from the things I try along the way.
                </p>
            </PageHeader>
            <WritingTimeline entries={entries} />
        </div>
    );
}
