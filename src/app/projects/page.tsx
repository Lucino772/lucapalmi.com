import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { toSorted } from "@/lib/utils";
import FeaturedProjects from "@/components/featured-projects";

export const metadata: Metadata = {
    title: "Projects | Luca Palmisano",
    description:
        "What I build when nobody asks: infrastructure, developer tools, desktop apps and small packages. Almost all of it is open source.",
    alternates: { canonical: "https://lucapalmi.com/projects" },
};

export default async function Projects() {
    const others = toSorted(projects.others, (p) => p.year, false);

    return (
        <div className="max-w-page mx-auto w-full px-5 pt-8 pb-24 md:px-6 md:pt-12">
            <div className="flex flex-col gap-10 md:gap-14">
                <section aria-labelledby="featured">
                    <h1 className="sr-only">Projects</h1>
                    <h2 id="featured" className="sr-only">
                        Featured projects
                    </h2>
                    <FeaturedProjects projects={projects.featured} />
                </section>

                <section aria-labelledby="more">
                    <h2 id="more" className="sr-only">
                        Other projects
                    </h2>
                    {/* Introduced like a comment in the editor */}
                    <p aria-hidden className="text-faint mb-2 text-[0.8125rem]">
                        {"// other projects"}
                    </p>
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
                                    className="text-fg hover:text-accent-text min-w-0 justify-self-start font-semibold underline decoration-transparent underline-offset-4 transition-colors duration-150 hover:decoration-current max-sm:-my-2 max-sm:py-2 pointer-coarse:-my-2 pointer-coarse:py-2"
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
                                            className="text-accent-text leading-5 underline decoration-current/40 underline-offset-4 hover:decoration-current max-sm:-my-3 max-sm:inline-block max-sm:py-3 pointer-coarse:-my-3 pointer-coarse:inline-block pointer-coarse:py-3"
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
