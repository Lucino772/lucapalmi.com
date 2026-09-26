import Link from "next/link";
import type { Projects } from "@/lib/projects";
import ProjectIcon from "./ProjectIcon";

type Featured = Projects["featured"][number];

const linkClass =
    "text-accent-text underline decoration-current/40 underline-offset-[3px] hover:decoration-current";

// Each featured project is an editor pane: the tab holds the project folder
// (icon, name, wip) with the year on the right, the body is the description,
// and a status bar carries the links (left) and technologies (right).
export default function FeaturedProjects({
    projects,
}: {
    projects: Featured[];
}) {
    return (
        <ul className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
                <li
                    key={project.title}
                    className="border-line bg-raised flex flex-col overflow-hidden rounded-[6px] border"
                >
                    <article
                        aria-labelledby={`pane-${project.title}`}
                        className="flex flex-1 flex-col"
                    >
                        <header className="border-line bg-bg flex items-stretch justify-between border-b">
                            <div className="bg-raised border-line border-t-accent relative -mb-px flex min-w-0 items-center gap-2.5 border-t-2 border-r py-1.5 pr-4 pl-2">
                                <ProjectIcon type={project.type} />
                                <h3
                                    id={`pane-${project.title}`}
                                    className="text-[1.125rem] leading-7 font-semibold"
                                >
                                    {project.title}
                                    <span
                                        aria-hidden
                                        className="text-faint font-normal"
                                    >
                                        /
                                    </span>
                                </h3>
                                {project.status === "early" && (
                                    <span className="text-muted border-line rounded-[3px] border px-[5px] text-[0.6875rem] leading-[17px]">
                                        wip
                                    </span>
                                )}
                            </div>
                            <span className="text-faint self-center pr-4 text-[0.8125rem] tabular-nums">
                                {project.year}
                            </span>
                        </header>

                        <p className="text-fg flex-1 p-4 text-[0.9375rem] leading-[1.6]">
                            {project.description}
                        </p>

                        <footer className="border-line bg-bg flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t px-4 py-2 text-[0.8125rem]">
                            <span className="flex flex-wrap gap-x-3.5">
                                <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={linkClass}
                                >
                                    source<span aria-hidden> ↗</span>
                                    <span className="sr-only">
                                        {" "}
                                        of {project.title} on GitHub
                                    </span>
                                </a>
                                {project.links.website && (
                                    <a
                                        href={project.links.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={linkClass}
                                    >
                                        website<span aria-hidden> ↗</span>
                                    </a>
                                )}
                                {project.article && (
                                    <Link
                                        href={`/articles/${project.article}`}
                                        className={linkClass}
                                    >
                                        case study<span aria-hidden> ↗</span>
                                    </Link>
                                )}
                            </span>
                            <span className="text-faint">
                                <span className="sr-only">Built with </span>
                                {project.tags.join(" · ")}
                            </span>
                        </footer>
                    </article>
                </li>
            ))}
        </ul>
    );
}
