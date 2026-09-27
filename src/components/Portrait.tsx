import { cn } from "@/lib/cn";
import { portraitPaths } from "./portrait-paths";

const HEIGHT = 2675;

// Inline so the drawing inherits currentColor and can draw itself in.
// `cropHeight` cuts the drawing at that height (drawing units), e.g. at the
// desk, so the chair legs and lower desk never show.
export default function Portrait({
    className,
    cropHeight = HEIGHT,
}: {
    className?: string;
    cropHeight?: number;
}) {
    return (
        <svg
            viewBox={`0 0 2000 ${cropHeight}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            fillRule="evenodd"
            role="img"
            aria-label="Line drawing of Luca sitting at his desk, typing on a laptop"
            className={cn("portrait", className)}
        >
            <defs>
                {/* A lit screen: brighter towards the centre, translucent */}
                <radialGradient
                    id="portrait-screen-lit"
                    cx="0.55"
                    cy="0.5"
                    r="0.65"
                >
                    <stop offset="0%" className="portrait-lit-core" />
                    <stop offset="55%" className="portrait-lit-mid" />
                    <stop offset="100%" className="portrait-lit-edge" />
                </radialGradient>
            </defs>
            {/* Laptop screen, lights up once the drawing is done */}
            <g className="portrait-screen">
                <polygon
                    points="377,877 607,900 760,1193 627,1227"
                    fill="url(#portrait-screen-lit)"
                />
            </g>
            {portraitPaths.map((path, i) => (
                <path
                    key={i}
                    d={path.d}
                    transform={path.transform}
                    pathLength={1}
                    style={{ "--i": i } as React.CSSProperties}
                />
            ))}
        </svg>
    );
}
