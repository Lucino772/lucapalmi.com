import Image from "next/image";
import Link from "next/link";

import { getProjects } from "@/lib/cms";

export default async function Projects() {
    const projects = await getProjects();
    return (
        <div className="relative mx-auto my-0 grid max-w-4xl grid-cols-1 gap-4 px-5 md:grid-cols-2">
            {projects.map((project, i) => (
                <Link
                    href={`/projects/${project.slug}`}
                    className="flex animate-[fade_300ms_ease-in-out_normal_forwards] opacity-0"
                    style={{ animationDelay: `${(0.1 + 0.2 * i) * 1000}ms` }}
                    key={i}
                >
                    <div className="bg-primary relative flex w-full flex-col rounded-sm border-2 border-[#292936] p-5 shadow-md transition-all hover:scale-[1.01] hover:border-[#4169E1]">
                        <div className="relative flex items-center justify-between gap-2">
                            {project.metadata.thumbnail !== undefined && (
                                <Image
                                    src={project.metadata.thumbnail.src}
                                    alt={`${project.metadata.title} project thumbnail`}
                                    width={project.metadata.thumbnail.width}
                                    height={project.metadata.thumbnail.height}
                                    className="h-16 w-16 rounded-lg object-cover"
                                />
                            )}
                            {project.metadata.thumbnail === undefined && (
                                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white">
                                    Error
                                </div>
                            )}
                            <h2 className="font-headings px-0 py-2 text-lg font-semibold text-white md:text-xl">
                                {project.metadata.title}
                            </h2>
                        </div>
                        <div className="relative mt-5 flex flex-row items-center gap-2">
                            {project.metadata.technologies
                                .slice(0, 3)
                                .map((item) => (
                                    <div
                                        key={item.slug}
                                        className="font-content rounded-lg bg-[#4169E1] px-1.5 py-0.5 text-xs shadow md:text-sm"
                                    >
                                        {item.name}
                                    </div>
                                ))}
                        </div>
                        <div className="relative mt-5 flex h-full flex-col justify-between gap-2">
                            <p className="font-content text-xs text-white md:text-base">
                                {project.metadata.description}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
