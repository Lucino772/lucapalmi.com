import type { Projects } from "@/lib/projects";

type ProjectType = Projects["featured"][number]["type"];

const ink = { stroke: "var(--color-sketch)" };
const blue = { stroke: "var(--color-accent)" };

// One clean line motif per project type, with a single royal-blue detail
const MOTIFS: Record<ProjectType, React.ReactNode> = {
    // GPU card, one blue fan
    infrastructure: (
        <>
            <rect x="2.5" y="6.5" width="17" height="9" {...ink} />
            <circle cx="8" cy="11" r="2.4" {...ink} />
            <circle cx="14" cy="11" r="2.4" {...blue} />
            <path d="M4 16v2.5M7 16v2.5M10 16v2.5M13 16v2.5" {...ink} />
        </>
    ),
    // Terminal with a blue play mark
    tool: (
        <>
            <rect x="2.5" y="3.5" width="17" height="15" {...ink} />
            <path d="M2.5 7h17M5.5 10.5l2.5 2-2.5 2M10 15h3" {...ink} />
            <path d="M15 12.5l3 1.8-3 1.8z" {...blue} />
        </>
    ),
    // Window with a component tree, blue root
    desktop: (
        <>
            <rect x="2.5" y="3.5" width="17" height="15" {...ink} />
            <path d="M2.5 7h17" {...ink} />
            <rect x="8.5" y="9" width="5" height="3" {...blue} />
            <path d="M11 12v1.5M6 13.5h10M6 13.5V15M16 13.5V15" {...ink} />
            <rect x="4.5" y="15" width="3" height="2" {...ink} />
            <rect x="14.5" y="15" width="3" height="2" {...ink} />
        </>
    ),
    // Stacked modules, top one blue
    package: (
        <>
            <rect x="6.5" y="3" width="9" height="4.5" {...blue} />
            <rect x="4.5" y="9" width="13" height="4.5" {...ink} />
            <rect x="3" y="15" width="16" height="4.5" {...ink} />
        </>
    ),
    // Browser window, blue address bar
    website: (
        <>
            <rect x="2.5" y="3.5" width="17" height="15" {...ink} />
            <path d="M2.5 7.5h17M5.5 11h11M5.5 14h7" {...ink} />
            <path d="M6 5.5h10" {...blue} />
        </>
    ),
};

export default function ProjectIcon({ type }: { type: ProjectType }) {
    return (
        <span
            aria-hidden
            className="border-line bg-bg grid size-[1.875rem] shrink-0 place-items-center rounded-[4px] border"
        >
            <svg
                viewBox="0 0 22 22"
                width="22"
                height="22"
                fill="none"
                strokeWidth="1.2"
            >
                {MOTIFS[type]}
            </svg>
        </span>
    );
}
