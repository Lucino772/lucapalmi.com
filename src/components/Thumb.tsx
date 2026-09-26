import Image from "next/image";
import { cn } from "@/lib/cn";
import type { LogEntry } from "@/lib/writing";
import FallbackThumb from "./FallbackThumb";
import InkThumbnail from "./InkThumbnail";

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
                <>
                    {/* Ink sketch by default; the design panel can switch
                        back to the earlier code-pane tile */}
                    <InkThumbnail
                        slug={entry.slug}
                        topic={entry.topics[0]}
                        className="thumb-code:hidden h-full"
                    />
                    <FallbackThumb
                        slug={entry.slug}
                        topic={entry.topics[0]}
                        className="thumb-code:block hidden"
                    />
                </>
            )}
        </div>
    );
}
