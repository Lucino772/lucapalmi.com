import { cn } from "@/lib/cn";
import { portraitPaths } from "./portrait-paths";

const HEIGHT = 2675;

// The left hand's outer contour: subpath 56 of the traced drawing's main
// compound path. Filled, it is the hand's silhouette (fingers included),
// used to keep the lit screen behind the hand.
const mainPath = portraitPaths[0];
const handOutline = mainPath.d.split(/(?=M)/)[56];

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
                {/* A lit screen: a quiet royal-blue wash, a touch lighter at
                    the top of the lid, running along the screen's length */}
                <linearGradient
                    id="portrait-screen-lit"
                    gradientUnits="userSpaceOnUse"
                    x1="420"
                    y1="880"
                    x2="700"
                    y2="1220"
                >
                    <stop offset="0%" className="portrait-lit-top" />
                    <stop offset="100%" className="portrait-lit-bottom" />
                </linearGradient>
                {/* Everything but the hand, so the screen sits behind it */}
                <mask
                    id="portrait-screen-mask"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="2000"
                    height={HEIGHT}
                >
                    <rect width="2000" height={HEIGHT} fill="white" />
                    <path
                        d={handOutline}
                        transform={mainPath.transform}
                        fill="black"
                        fillRule="nonzero"
                    />
                </mask>
            </defs>
            {/* Laptop screen, fitted to the bezel's inner edge (its lower
                right corner sits under the hand); lights up once the drawing
                is done */}
            <g className="portrait-screen">
                <polygon
                    points="388,886 601,916 774,1186 622,1229"
                    fill="url(#portrait-screen-lit)"
                    mask="url(#portrait-screen-mask)"
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
