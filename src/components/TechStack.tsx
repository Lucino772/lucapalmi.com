"use client";

import { TechnologyEntrySkeleton } from "@/lib/cms";
import { Entry } from "contentful";
import Image from "next/image";

type Props = {
    technology: Entry<
        TechnologyEntrySkeleton,
        "WITHOUT_UNRESOLVABLE_LINKS",
        string
    >;
};

export default function TechStack({ technology }: Props) {
    return (
        <div
            className="flex flex-row items-center justify-center gap-2 rounded-3xl px-2 py-2 drop-shadow-sm"
            style={{ background: "#1d1d1d" }}
        >
            {technology.fields.icon !== undefined && (
                <Image
                    src={`https:${technology.fields.icon.fields.file?.url}`}
                    alt={technology.fields.slug}
                    width={
                        technology.fields.icon.fields.file?.details.image?.width
                    }
                    height={
                        technology.fields.icon.fields.file?.details.image?.width
                    }
                    className="size-7 rounded-full object-cover md:size-8"
                />
            )}
            {technology.fields.icon === undefined && (
                <div className="flex size-7 items-center justify-center rounded-full bg-white text-xs md:size-8">
                    Error
                </div>
            )}
            <span className="font-content text-sm text-white md:text-base">
                {technology.fields.name}
            </span>
        </div>
    );
}
