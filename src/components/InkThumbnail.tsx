import type { TopicId } from "@/content/topics";
import { cn } from "@/lib/cn";

// A generated thumbnail for pieces without a cover: a small pen sketch of the
// first topic, with hatching and one mark in royal blue. Everything is derived
// from the slug, so the same article always gets the same sketch.
// Adapted from the Sketchbook variant, recoloured with Workstation tokens.

const W = 160;
const H = 100;

function hash(text: string) {
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) {
        h ^= text.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

function random(seed: number) {
    let a = seed;
    return () => {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

type Pen = {
    line: (x1: number, y1: number, x2: number, y2: number) => string;
    rect: (x: number, y: number, w: number, h: number) => string;
    ellipse: (cx: number, cy: number, rx: number, ry: number) => string;
};

const r1 = (n: number) => Math.round(n * 10) / 10;

function makePen(rand: () => number): Pen {
    const j = (amount: number) => (rand() - 0.5) * amount;
    // Lines bow a little and overshoot, like a quick pen stroke
    const line: Pen["line"] = (x1, y1, x2, y2) => {
        const mx = (x1 + x2) / 2 + j(2.4);
        const my = (y1 + y2) / 2 + j(2.4);
        return `M${r1(x1 + j(1.2))} ${r1(y1 + j(1.2))}Q${r1(mx)} ${r1(my)} ${r1(x2 + j(1.6))} ${r1(y2 + j(1.6))}`;
    };
    const rect: Pen["rect"] = (x, y, w, h) =>
        [
            line(x - 1, y, x + w + 1.5, y),
            line(x + w, y - 1, x + w, y + h + 1.5),
            line(x + w + 1, y + h, x - 1.5, y + h),
            line(x, y + h + 1, x, y - 1.5),
        ].join("");
    // An ellipse that does not quite close: start and end overshoot
    const ellipse: Pen["ellipse"] = (cx, cy, rx, ry) => {
        const start = rand() * Math.PI * 2;
        const steps = 14;
        let d = "";
        for (let i = 0; i <= steps; i++) {
            const t = start + (i / steps) * Math.PI * 2.12;
            const wob = 1 + j(0.07);
            const x = cx + Math.cos(t) * rx * wob;
            const y = cy + Math.sin(t) * ry * wob;
            d += `${i === 0 ? "M" : "L"}${r1(x)} ${r1(y)}`;
        }
        return d;
    };
    return { line, rect, ellipse };
}

type Sketch = { ink: string; accent: string };

// One small motif per topic, drawn around the centre of the sheet
const MOTIFS: Record<TopicId | "default", (p: Pen) => Sketch> = {
    architecture: (p) => ({
        ink:
            p.rect(46, 30, 30, 22) +
            p.rect(84, 30, 30, 22) +
            p.rect(46, 66, 68, 22) +
            p.line(61, 52, 61, 66) +
            p.line(99, 52, 99, 66),
        accent: p.ellipse(99, 41, 22, 16),
    }),
    backend: (p) => ({
        ink:
            p.ellipse(80, 34, 26, 8) +
            p.line(54, 34, 54, 84) +
            p.line(106, 34, 106, 84) +
            p.ellipse(80, 84, 26, 8) +
            p.line(56, 59, 104, 59),
        accent: p.line(62, 48, 98, 48),
    }),
    infrastructure: (p) => ({
        ink:
            p.rect(50, 26, 60, 18) +
            p.rect(50, 50, 60, 18) +
            p.rect(50, 74, 60, 18) +
            p.line(58, 35, 76, 35) +
            p.line(58, 59, 76, 59) +
            p.line(58, 83, 76, 83),
        accent:
            p.ellipse(100, 35, 2.4, 2.4) +
            p.ellipse(100, 59, 2.4, 2.4) +
            p.ellipse(100, 83, 2.4, 2.4),
    }),
    tooling: (p) => ({
        ink:
            p.rect(38, 30, 84, 58) +
            p.line(38, 42, 122, 42) +
            p.line(50, 54, 60, 62) +
            p.line(60, 62, 50, 70),
        accent: p.line(66, 71, 84, 71),
    }),
    desktop: (p) => ({
        ink:
            p.rect(36, 28, 88, 62) +
            p.line(36, 40, 124, 40) +
            p.rect(46, 50, 26, 30) +
            p.line(80, 52, 112, 52) +
            p.line(80, 62, 106, 62) +
            p.line(80, 72, 110, 72),
        accent: p.ellipse(44, 34, 2.2, 2.2) + p.ellipse(52, 34, 2.2, 2.2),
    }),
    web: (p) => ({
        ink:
            p.ellipse(80, 60, 32, 32) +
            p.ellipse(80, 60, 13, 32) +
            p.line(48, 60, 112, 60) +
            p.line(53, 44, 107, 44) +
            p.line(53, 76, 107, 76),
        accent: p.line(80, 26, 80, 94),
    }),
    ai: (p) => ({
        ink:
            p.ellipse(80, 60, 34, 24) +
            p.line(108, 44, 116, 46) +
            p.line(108, 44, 110, 36),
        accent: p.ellipse(80, 60, 6, 6),
    }),
    hardware: (p) => ({
        ink:
            p.rect(56, 40, 48, 40) +
            [0, 1, 2, 3]
                .map(
                    (i) =>
                        p.line(64 + i * 11, 40, 64 + i * 11, 30) +
                        p.line(64 + i * 11, 80, 64 + i * 11, 90),
                )
                .join("") +
            p.line(56, 52, 46, 52) +
            p.line(56, 68, 46, 68) +
            p.line(104, 52, 114, 52) +
            p.line(104, 68, 114, 68),
        accent: p.rect(70, 52, 20, 16),
    }),
    default: (p) => ({
        ink: p.line(40, 50, 120, 46) + p.line(40, 62, 110, 60),
        accent: p.line(40, 74, 90, 72),
    }),
};

function SketchSvg({
    seedText,
    draw,
    className,
}: {
    seedText: string;
    draw: (p: Pen) => Sketch;
    className?: string;
}) {
    const seed = hash(seedText);
    const rand = random(seed);
    const pen = makePen(rand);

    // Hatching in one corner, a different corner and angle per piece
    const corner = seed % 4;
    const hatchCount = 5 + (seed % 4);
    let hatch = "";
    for (let i = 0; i < hatchCount; i++) {
        const o = i * 5;
        const [x1, y1, x2, y2] =
            corner === 0
                ? [8 + o, 8, 8, 8 + o]
                : corner === 1
                  ? [W - 8 - o, 8, W - 8, 8 + o]
                  : corner === 2
                    ? [8, H - 8 - o, 8 + o, H - 8]
                    : [W - 8, H - 8 - o, W - 8 - o, H - 8];
        hatch += pen.line(x1, y1, x2, y2);
    }

    // Tilt and nudge the motif so no two sheets sit exactly the same
    const tilt = r1((rand() - 0.5) * 7);
    const dx = r1((rand() - 0.5) * 10);
    const dy = r1((rand() - 0.5) * 4);
    const sketch = draw(pen);

    return (
        <svg
            aria-hidden
            viewBox={`0 0 ${W} ${H}`}
            className={cn("bg-raised block h-auto w-full", className)}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                d={hatch}
                stroke="var(--color-faint)"
                strokeWidth="0.7"
                vectorEffect="non-scaling-stroke"
            />
            <g
                transform={`translate(${dx} ${dy}) rotate(${tilt} 80 50) translate(80 50) scale(1.08) translate(-80 -60)`}
            >
                <path
                    d={sketch.ink}
                    stroke="var(--color-sketch)"
                    strokeWidth="1.3"
                    vectorEffect="non-scaling-stroke"
                />
                <path
                    d={sketch.accent}
                    stroke="var(--color-accent)"
                    strokeWidth="1.6"
                    vectorEffect="non-scaling-stroke"
                />
            </g>
        </svg>
    );
}

type Props = {
    slug: string;
    topic?: TopicId;
    className?: string;
};

export default function InkThumbnail({ slug, topic, className }: Props) {
    return (
        <SketchSvg
            seedText={slug}
            draw={MOTIFS[topic ?? "default"]}
            className={className}
        />
    );
}
