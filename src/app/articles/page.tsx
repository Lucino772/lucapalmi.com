import type { Metadata } from "next";
import { getWritingLog } from "@/lib/writing";
import WritingTimeline from "@/components/WritingTimeline";

export const metadata: Metadata = {
    title: "Writing | Luca Palmisano",
    description:
        "How software systems get designed and built, and what I learn from the things I try along the way.",
    alternates: { canonical: "https://lucapalmi.com/articles" },
};

export default async function Articles() {
    const entries = await getWritingLog();

    return (
        <div className="max-w-page mx-auto w-full px-5 pt-8 pb-24 md:px-6 md:pt-12">
            <WritingTimeline entries={entries} />
        </div>
    );
}
