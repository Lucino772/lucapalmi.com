import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Projects } from "@/lib/projects";
import { ProjectSketch } from "./InkThumbnail";

type Featured = Projects["featured"][number];

function StatusLight({ status }: { status: Featured["status"] }) {
    return (
        <span
            aria-hidden
            className={cn(
                "inline-block size-2 shrink-0 rounded-full",
                status === "active" ? "bg-accent" : "border-faint border",
            )}
        />
    );
}

function Tags({ tags }: { tags: string[] }) {
    return (
        <ul
            aria-label="Tags"
            className="text-faint flex flex-wrap gap-x-[1.5ch] gap-y-0.5 text-[0.8125rem] leading-6"
        >
            {tags.map((tag) => (
                <li key={tag}>#{tag}</li>
            ))}
        </ul>
    );
}

const linkClass =
    "text-accent-text underline decoration-current/40 underline-offset-4 hover:decoration-current";

function Links({ project }: { project: Featured }) {
    return (
        <>
            <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className={linkClass}
            >
                Source
                <span className="sr-only"> of {project.title} on GitHub</span>
            </a>
            {project.links.website && (
                <a
                    href={project.links.website}
                    target="_blank"
                    rel="noreferrer"
                    className={linkClass}
                >
                    Website
                </a>
            )}
            {project.article && (
                <Link
                    href={`/articles/${project.article}`}
                    className={linkClass}
                >
                    Case study
                </Link>
            )}
        </>
    );
}

// Default: each featured project is an editor pane. A tab strip holds the
// project folder (status light + name) with type and year, the body reads
// like its README, and a status bar at the bottom carries the links.
function Panes({ projects }: { projects: Featured[] }) {
    return (
        <ul className="projects-stacked:hidden grid gap-6 md:grid-cols-2">
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
                            <h3
                                id={`pane-${project.title}`}
                                className="bg-raised border-line before:bg-accent relative -mb-px flex items-center gap-2.5 border-r px-4 py-2.5 text-[1.375rem] leading-8 font-semibold tracking-[-0.01em] before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:content-['']"
                            >
                                <StatusLight status={project.status} />
                                <span>
                                    {project.title}
                                    <span
                                        aria-hidden
                                        className="text-faint font-normal"
                                    >
                                        /
                                    </span>
                                </span>
                            </h3>
                            <p className="text-faint flex items-center gap-x-[2ch] px-4 text-[0.8125rem] tabular-nums">
                                <span className="hidden sm:inline">
                                    {project.type}
                                </span>
                                <span>{project.year}</span>
                            </p>
                        </header>

                        <div className="flex-1 px-4 pt-4 pb-5">
                            <p className="text-faint flex flex-wrap gap-x-[2ch] text-[0.8125rem]">
                                <span>
                                    <span className="sr-only">Status: </span>
                                    {project.status}
                                </span>
                                <span className="sm:hidden">
                                    {project.type}
                                </span>
                                <span aria-hidden>README.md</span>
                            </p>
                            <div className="mt-3 grid gap-4 sm:grid-cols-[10rem_minmax(0,1fr)]">
                                <ProjectSketch
                                    title={project.title}
                                    type={project.type}
                                    className="border-line bg-bg aspect-[16/10] h-auto max-w-[16rem] rounded-[4px] border sm:max-w-none"
                                />
                                <div className="min-w-0">
                                    <p className="text-fg/90 text-[0.9375rem] leading-7">
                                        {project.description}
                                    </p>
                                    <div className="mt-2">
                                        <Tags tags={project.tags} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer className="border-line bg-bg flex flex-wrap items-center gap-x-5 gap-y-1 border-t px-4 py-2.5 text-[0.8125rem]">
                            <Links project={project} />
                        </footer>
                    </article>
                </li>
            ))}
        </ul>
    );
}

// Alternative: large stacked entries, like an ls -l blown up. Metadata
// column, big name, description, tags, links, sketch on the right.
function Stack({ projects }: { projects: Featured[] }) {
    return (
        <ul className="projects-stacked:block hidden">
            {projects.map((project) => (
                <li
                    key={project.title}
                    className="border-line border-b first:-mt-8 md:first:-mt-10"
                >
                    <article
                        aria-labelledby={`stack-${project.title}`}
                        className="grid gap-x-10 gap-y-4 py-9 md:grid-cols-[10rem_minmax(0,1fr)_14rem] md:py-12"
                    >
                        <dl className="text-faint grid grid-cols-[auto_1fr] gap-x-[2ch] gap-y-0.5 self-start text-[0.8125rem] leading-6 tabular-nums md:order-first md:pt-3">
                            <dt>status</dt>
                            <dd className="text-muted flex items-center gap-2">
                                <StatusLight status={project.status} />
                                {project.status}
                            </dd>
                            <dt>type</dt>
                            <dd className="text-muted">{project.type}</dd>
                            <dt>year</dt>
                            <dd className="text-muted">{project.year}</dd>
                        </dl>
                        <div className="min-w-0 md:order-none">
                            <h3
                                id={`stack-${project.title}`}
                                className="text-[2rem] leading-tight font-semibold tracking-[-0.02em] md:text-[2.5rem]"
                            >
                                {project.title}
                                <span
                                    aria-hidden
                                    className="text-faint font-normal"
                                >
                                    /
                                </span>
                            </h3>
                            <p className="text-fg/90 mt-4 max-w-[60ch] text-[1rem] leading-7">
                                {project.description}
                            </p>
                            <div className="mt-3">
                                <Tags tags={project.tags} />
                            </div>
                            <p className="mt-5 flex flex-wrap gap-x-5 text-[0.875rem]">
                                <Links project={project} />
                            </p>
                        </div>
                        <ProjectSketch
                            title={project.title}
                            type={project.type}
                            className="border-line order-first aspect-[16/10] h-auto max-w-[12rem] rounded-[4px] border md:order-last md:max-w-none md:self-start"
                        />
                    </article>
                </li>
            ))}
        </ul>
    );
}

export default function FeaturedProjects({
    projects,
}: {
    projects: Featured[];
}) {
    return (
        <>
            <Panes projects={projects} />
            <Stack projects={projects} />
        </>
    );
}
