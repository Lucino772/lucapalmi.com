import { getAllProjects } from "@/lib/cms";
import Image from "next/image";
import Link from "next/link";

export default async function Projects() {
    const projects = await getAllProjects();
    return (
        <div className="relative mx-auto my-0 grid max-w-4xl grid-cols-1 gap-4 px-5 md:grid-cols-2">
            {projects.items.map((project, i) => (
                <Link
                    href={`/projects/${project.fields.slug}`}
                    className="flex animate-[fade_300ms_ease-in-out_normal_forwards] opacity-0"
                    style={{ animationDelay: `${(0.1 + 0.2 * i) * 1000}ms` }}
                    key={i}
                >
                    <div className="relative flex w-full flex-col rounded-lg border-2 border-transparent bg-[#242424] p-5 shadow-md transition-all hover:scale-[1.01] hover:border-[#4169E1]">
                        <div className="relative flex items-center justify-between">
                            {project.fields.thumbnail !== undefined && (
                                <Image
                                    src={`https:${project.fields.thumbnail.fields.file?.url}`}
                                    alt="project-cover"
                                    width={
                                        project.fields.thumbnail.fields.file
                                            ?.details.image?.width
                                    }
                                    height={
                                        project.fields.thumbnail.fields.file
                                            ?.details.image?.height
                                    }
                                    className="h-16 w-16 rounded-lg object-cover"
                                />
                            )}
                            {project.fields.thumbnail === undefined && (
                                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white">
                                    Error
                                </div>
                            )}
                            <h2 className="px-0 py-2 text-xl font-semibold text-white">
                                {project.fields.title}
                            </h2>
                        </div>
                        <div className="relative mt-5 flex h-full flex-col justify-between gap-2">
                            <p className="text-white">
                                {project.fields.description}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
