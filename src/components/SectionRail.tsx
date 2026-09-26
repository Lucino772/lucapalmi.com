"use client";

import { cn } from "@/lib/cn";
import { useArticleSections } from "./article-sections";

// Right-edge outline for long articles: one tick per h2, like the markers in
// an editor's scrollbar. Hover or focus reveals the section titles.
export default function SectionRail() {
    const { sections, activeId, inBody } = useArticleSections({ levels: [2] });
    if (sections.length < 3) return null;
    const activeIndex = sections.findIndex((s) => s.id === activeId);

    return (
        <nav
            aria-label="On this page"
            className={cn(
                "group fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 transition-opacity duration-200 focus-within:opacity-100 xl:block",
                inBody ? "opacity-100" : "pointer-events-none opacity-0",
            )}
        >
            <ol className="group-focus-within:border-line group-focus-within:bg-bg group-hover:border-line group-hover:bg-bg flex flex-col items-end rounded-[6px] border border-transparent px-2 py-2 transition-colors duration-150">
                {sections.map((section, i) => {
                    const active = i === activeIndex;
                    const passed = activeIndex !== -1 && i < activeIndex;
                    return (
                        <li key={section.id} className="w-full">
                            <a
                                href={`#${section.id}`}
                                aria-current={active ? "location" : undefined}
                                className="flex items-center justify-end gap-3 rounded-[3px] py-[5px] pl-2 focus-visible:outline-offset-0"
                            >
                                <span
                                    className={cn(
                                        "sr-only text-right text-[0.8125rem] leading-5",
                                        "group-focus-within:not-sr-only group-focus-within:line-clamp-2 group-focus-within:max-w-[12rem] group-focus-within:animate-[fade_150ms_ease-out] min-[1440px]:group-focus-within:max-w-[15rem]",
                                        "group-hover:not-sr-only group-hover:line-clamp-2 group-hover:max-w-[12rem] group-hover:animate-[fade_150ms_ease-out] min-[1440px]:group-hover:max-w-[15rem]",
                                        active
                                            ? "text-fg"
                                            : "text-muted hover:text-fg",
                                    )}
                                >
                                    {section.title}
                                </span>
                                <span
                                    aria-hidden
                                    className={cn(
                                        "h-0.5 shrink-0 rounded-full transition-[width,background-color] duration-200",
                                        active
                                            ? "bg-accent w-6"
                                            : passed
                                              ? "bg-muted w-3"
                                              : "bg-faint/45 w-3",
                                    )}
                                />
                            </a>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
