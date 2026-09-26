import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Projects } from "@/lib/projects";

type Featured = Projects["featured"][number];

export function StatusMark({ status }: { status: Featured["status"] }) {
    return (
        <span className="text-muted inline-flex h-7 items-center gap-2 self-start">
            <span
                aria-hidden
                className={cn(
                    "inline-block size-[7px] rounded-full",
                    status === "active" ? "bg-accent" : "border-faint border",
                )}
            />
            {status}
        </span>
    );
}

// ls -l for projects: status, year, name, what it does, what it is
export default function ProjectRows({
    projects,
    detailed = false,
}: {
    projects: Featured[];
    detailed?: boolean;
}) {
    return (
        <ul className="-mx-3 flex flex-col">
            {projects.map((project) => (
                <li
                    key={project.title}
                    className={cn(
                        "group hover:bg-raised relative grid grid-cols-[auto_auto_1fr] gap-x-[2ch] rounded-[4px] px-3 py-2.5 text-[0.9375rem] leading-7 transition-colors duration-150",
                        "sm:grid-cols-[8ch_4ch_11ch_minmax(0,1fr)_auto]",
                        detailed && "py-4",
                    )}
                >
                    <StatusMark status={project.status} />
                    <span className="text-faint tabular-nums">
                        {project.year}
                    </span>
                    <span className="text-faint text-right sm:order-last">
                        {project.type}
                    </span>
                    <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-fg group-hover:text-accent-text col-span-3 font-semibold transition-colors duration-150 after:absolute after:inset-0 after:content-[''] sm:col-span-1"
                    >
                        {project.title}
                        <span className="sr-only"> (GitHub)</span>
                    </a>
                    <div className="col-span-3 min-w-0 sm:col-span-1">
                        <p className="text-muted">{project.description}</p>
                        {detailed && (
                            <div className="text-faint mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8125rem]">
                                {project.tags.map((tag) => (
                                    <span key={tag}>#{tag}</span>
                                ))}
                                {project.article && (
                                    <Link
                                        href={`/articles/${project.article}`}
                                        className="text-accent-text relative z-10 underline decoration-current/40 underline-offset-4 hover:decoration-current"
                                    >
                                        Read the case study
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
}
