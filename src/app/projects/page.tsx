import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { toSorted } from "@/lib/utils";
import ProjectRows from "@/components/ProjectRows";

export const metadata: Metadata = {
    title: "Projects | Luca Palmisano",
    description:
        "What I build when nobody asks: infrastructure, developer tools, desktop apps and small packages. Almost all of it is open source.",
    alternates: { canonical: "https://lucapalmi.com/projects" },
};

export default async function Projects() {
    const others = toSorted(projects.others, (p) => p.year, false);

    return (
        <div className="max-w-page mx-auto w-full px-5 pt-6 pb-20 md:px-6 md:pt-10 md:pb-28">
            <div className="flex flex-col gap-16 md:gap-20">
                <section
                    aria-labelledby="featured"
                    className="grid gap-x-10 gap-y-4 md:grid-cols-[12rem_minmax(0,1fr)]"
                >
                    {/* The title sits in the gutter, on the line of the
                        column headers, like the path above an ls -l */}
                    <div className="flex items-baseline gap-4 md:block">
                        <h1 className="text-[0.9375rem] leading-5 font-semibold">
                            <span
                                aria-hidden
                                className="text-faint font-normal"
                            >
                                ~/
                            </span>
                            projects
                        </h1>
                        <h2
                            id="featured"
                            className="text-muted text-[0.9375rem] leading-7 md:mt-[1.625rem]"
                        >
                            Featured
                        </h2>
                    </div>
                    <div className="min-w-0">
                        <div
                            aria-hidden
                            className="text-faint border-line mb-1 hidden grid-cols-[8ch_4ch_11ch_minmax(0,1fr)_auto] gap-x-[2ch] border-b pb-2 text-[0.8125rem] sm:grid"
                        >
                            <span>status</span>
                            <span>year</span>
                            <span>name</span>
                            <span>description</span>
                            <span>type</span>
                        </div>
                        <ProjectRows projects={projects.featured} detailed />
                    </div>
                </section>

                <section
                    aria-labelledby="more"
                    className="grid gap-x-10 gap-y-4 md:grid-cols-[12rem_minmax(0,1fr)]"
                >
                    <h2
                        id="more"
                        className="text-muted text-[0.9375rem] leading-7 md:pt-2"
                    >
                        Smaller things
                    </h2>
                    <ul className="-mx-3 flex min-w-0 flex-col">
                        {others.map((project) => (
                            <li
                                key={project.title}
                                className="group hover:bg-raised relative grid grid-cols-[4ch_minmax(0,1fr)] gap-x-[2ch] rounded-[4px] px-3 py-2 text-[0.9375rem] leading-7 transition-colors duration-150 sm:grid-cols-[4ch_14ch_minmax(0,1fr)]"
                            >
                                <span className="text-faint tabular-nums">
                                    {project.year}
                                </span>
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-fg group-hover:text-accent font-semibold transition-colors duration-150 after:absolute after:inset-0 after:content-['']"
                                >
                                    {project.title}
                                </a>
                                <div className="text-muted col-start-2 sm:col-start-3">
                                    {project.description}
                                    {project.article && (
                                        <>
                                            {" "}
                                            <Link
                                                href={`/articles/${project.article}`}
                                                className="text-accent relative z-10 whitespace-nowrap underline decoration-current/40 underline-offset-4 hover:decoration-current"
                                            >
                                                Case study
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}
