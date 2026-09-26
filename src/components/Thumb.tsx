import Image from "next/image";
import { cn } from "@/lib/cn";
import type { LogEntry } from "@/lib/writing";
import FallbackThumb from "./FallbackThumb";

// Same frame and 16:10 ratio for every entry, cover or not
export default function Thumb({
    entry,
    sizes,
    className,
}: {
    entry: Pick<LogEntry, "slug" | "topics" | "cover">;
    sizes: string;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "border-line bg-raised aspect-[16/10] overflow-hidden rounded-[4px] border",
                className,
            )}
        >
            {entry.cover ? (
                <Image
                    src={entry.cover.src}
                    width={entry.cover.width}
                    height={entry.cover.height}
                    sizes={sizes}
                    alt=""
                    className="h-full w-full object-cover"
                />
            ) : (
                <FallbackThumb slug={entry.slug} topic={entry.topics[0]} />
            )}
        </div>
    );
}
