import { cn } from "@/lib/cn";
import { portraitPaths } from "./portrait-paths";

// Inline so the drawing inherits currentColor and can draw itself in
export default function Portrait({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 2000 2675"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            fillRule="evenodd"
            role="img"
            aria-label="Line drawing of Luca sitting at his desk, typing on a laptop"
            className={cn("portrait", className)}
        >
            {/* Laptop screen, lights up once the drawing is done */}
            <polygon
                className="portrait-screen"
                points="377,877 607,900 760,1193 627,1227"
            />
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
