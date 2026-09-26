"use client";

import { useEffect, useState } from "react";

export type ArticleSection = {
    id: string;
    title: string;
    level: 2 | 3;
};

export const ARTICLE_BODY_ATTRIBUTE = "data-article-body";

// A heading becomes active once its top crosses this share of the viewport
const ACTIVE_LINE = 0.3;

/**
 * Headless section tracking for long articles. Wrap the MDX content in an
 * element carrying `data-article-body`; headings inside it need ids (added
 * by `mdx-components.tsx`). Styling is left to the consumer.
 */
export function useArticleSections({
    levels = [2],
}: { levels?: (2 | 3)[] } = {}) {
    const [sections, setSections] = useState<ArticleSection[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [inBody, setInBody] = useState(false);
    const selector = levels.map((level) => `h${level}[id]`).join(",");

    useEffect(() => {
        const body = document.querySelector<HTMLElement>(
            `[${ARTICLE_BODY_ATTRIBUTE}]`,
        );
        if (!body) {
            return;
        }
        const headings = Array.from(
            body.querySelectorAll<HTMLHeadingElement>(selector),
        );
        const found: ArticleSection[] = headings.map((heading) => ({
            id: heading.id,
            title: heading.textContent?.trim() ?? "",
            level: heading.tagName === "H3" ? 3 : 2,
        }));

        let frame = 0;
        let published = false;
        const update = () => {
            frame = 0;
            if (!published) {
                published = true;
                setSections(found);
            }
            const line = window.innerHeight * ACTIVE_LINE;
            const atBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 2;

            let active: HTMLHeadingElement | undefined;
            if (atBottom) {
                active = headings.at(-1);
            } else {
                for (const heading of headings) {
                    if (heading.getBoundingClientRect().top > line) {
                        break;
                    }
                    active = heading;
                }
            }
            setActiveId(active?.id ?? null);

            const rect = body.getBoundingClientRect();
            setInBody(rect.top < line && rect.bottom > line);
        };
        const schedule = () => {
            if (!frame) {
                frame = requestAnimationFrame(update);
            }
        };

        schedule();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
        };
    }, [selector]);

    return { sections, activeId, inBody };
}
