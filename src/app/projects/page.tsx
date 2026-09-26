import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { toSorted } from "@/lib/utils";
import FeaturedProjects from "@/components/FeaturedProjects";

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
            <div className="flex flex-col gap-20 md:gap-28">
                <section aria-labelledby="featured">
                    {/* Path bar, the same row grammar as ~/writing */}
                    <div className="border-line mb-8 flex items-baseline gap-4 border-b pb-3 md:mb-10">
                        <h1 className="text-[0.9375rem] font-semibold">
                            <span
                                aria-hidden
                                className="text-faint font-normal"
                            >
                                ~/
                            </span>
                            projects
                        </h1>
                        <span
                            aria-hidden
                            className="bg-line h-4 w-px self-center"
                        />
                        <h2
                            id="featured"
                            className="text-muted text-[0.9375rem]"
                        >
                            Featured
                        </h2>
                    </div>
                    <FeaturedProjects projects={projects.featured} />
                </section>

                <section aria-labelledby="more">
                    {/* Label on top, same bar grammar as ~/projects */}
                    <div className="border-line mb-4 flex items-baseline gap-4 border-b pb-3">
                        <h2
                            id="more"
                            className="text-[0.9375rem] font-semibold"
                        >
                            Smaller things
                        </h2>
                        <span
                            aria-hidden
                            className="bg-line h-4 w-px self-center"
                        />
                        <p className="text-faint text-[0.8125rem] tabular-nums">
                            {others.length} projects
                        </p>
                    </div>
                    {/* One shared column template (subgrid) so every row aligns:
                        name, description, year, write-up. No table chrome. */}
                    <ul className="-mx-3 flex min-w-0 flex-col sm:grid sm:grid-cols-[11rem_minmax(0,1fr)_4ch_9ch] sm:gap-x-[2ch]">
                        {others.map((project) => (
                            <li
                                key={project.title}
                                className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-[2ch] px-3 py-2.5 text-[0.9375rem] leading-7 transition-colors duration-150 sm:col-span-4 sm:grid-cols-subgrid sm:py-2"
                            >
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-fg hover:text-accent-text min-w-0 justify-self-start font-semibold underline decoration-transparent underline-offset-4 transition-colors duration-150 hover:decoration-current"
                                >
                                    {project.title}
                                </a>
                                <p className="text-muted order-3 col-span-2 sm:order-none sm:col-span-1">
                                    {project.description}
                                </p>
                                <span className="text-faint order-2 text-right tabular-nums sm:order-none">
                                    {project.year}
                                </span>
                                <span className="order-4 col-span-2 text-[0.8125rem] sm:order-none sm:col-span-1 sm:text-right">
                                    {project.article && (
                                        <Link
                                            href={`/articles/${project.article}`}
                                            className="text-accent-text underline decoration-current/40 underline-offset-4 hover:decoration-current"
                                        >
                                            write-up
                                            <span className="sr-only">
                                                {" "}
                                                about {project.title}
                                            </span>
                                        </Link>
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}
