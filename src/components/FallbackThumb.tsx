import { cn } from "@/lib/cn";

// Deterministic PRNG seeded from the slug and first topic, so an article
// always gets the same tile
function seeded(seed: string) {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) {
        h ^= seed.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return () => {
        h = Math.imul(h ^ (h >>> 15), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        h ^= h >>> 16;
        return (h >>> 0) / 4294967296;
    };
}

const syntax = [
    "fill-syn-keyword",
    "fill-syn-string",
    "fill-syn-number",
    "fill-syn-title",
    "fill-syn-attr",
];

// A tiny editor pane: file tab, line-number gutter and syntax-coloured
// "code" whose shape is derived from the article, no images needed
export default function FallbackThumb({
    slug,
    topic,
    className,
}: {
    slug: string;
    topic?: string;
    className?: string;
}) {
    const rand = seeded(`${slug}:${topic ?? ""}`);
    const pick = <T,>(items: T[]) => items[Math.floor(rand() * items.length)];
    const primary = pick(syntax);
    const secondary = pick(syntax.filter((s) => s !== primary));

    const lines: { x: number; w: number; fill: string }[][] = [];
    let indent = 0;
    for (let i = 0; i < 8; i++) {
        if (i > 0 && rand() < 0.14) {
            lines.push([]);
            indent = 0;
            continue;
        }
        const segments = [];
        let x = 26 + indent * 9;
        const count = 1 + Math.floor(rand() * 3);
        for (let s = 0; s < count && x < 138; s++) {
            const w = Math.min(10 + Math.floor(rand() * 30), 150 - x);
            const r = rand();
            const fill =
                s === 0 && r < 0.45
                    ? primary
                    : r < 0.3
                      ? secondary
                      : "fill-muted";
            segments.push({ x, w, fill });
            x += w + 4;
        }
        lines.push(segments);
        indent = Math.max(0, Math.min(3, indent + pick([-1, 0, 1, 1])));
    }
    const tabWidth = 34 + Math.floor(rand() * 26);

    return (
        <svg
            viewBox="0 0 160 100"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
            className={cn("bg-raised block h-full w-full", className)}
        >
            <rect width="160" height="13" className="fill-bg" />
            <rect
                x="0"
                y="0"
                width={tabWidth + 14}
                height="13"
                className="fill-raised"
            />
            <rect
                x="0"
                y="0"
                width={tabWidth + 14}
                height="1.5"
                className="fill-accent-solid"
            />
            <rect
                x="7"
                y="5"
                width={tabWidth}
                height="3"
                rx="1.5"
                className="fill-muted"
                opacity="0.7"
            />
            <rect
                x="0"
                y="13"
                width="160"
                height="0.75"
                className="fill-line"
            />
            {lines.map((segments, i) => (
                <g key={i}>
                    <rect
                        x="8"
                        y={21 + i * 9}
                        width={i >= 9 ? 9 : 6}
                        height="3"
                        rx="1"
                        className="fill-faint"
                        opacity="0.45"
                    />
                    {segments.map((seg, j) => (
                        <rect
                            key={j}
                            x={seg.x}
                            y={21 + i * 9}
                            width={seg.w}
                            height="3"
                            rx="1.5"
                            className={seg.fill}
                            opacity={seg.fill === "fill-muted" ? 0.55 : 0.9}
                        />
                    ))}
                </g>
            ))}
            <rect x="0" y="94" width="160" height="6" className="fill-bg" />
            <rect
                x="6"
                y="96"
                width="4"
                height="2"
                rx="1"
                className="fill-accent-solid"
            />
        </svg>
    );
}
