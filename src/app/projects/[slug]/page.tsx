import Image from "next/image";
import rehypeHighlight from "rehype-highlight";
import { compileMDX } from "next-mdx-remote/rsc";

import { getAllProjects, getProject } from "@/lib/cms";
import { notFound } from "next/navigation";
import TechStack from "@/components/TechStack";
import { GlobeIcon } from "lucide-react";

export async function generateStaticParams() {
    return await Promise.all(
        (await getAllProjects()).items.map(async (project) => {
            return {
                slug: project.fields.slug as string,
            };
        }),
    );
}

async function getProjectInfo(slug: string) {
    const project = await getProject(slug);
    if (project === undefined) notFound();

    const { content } = await compileMDX({
        source: project.fields.content!,
        options: {
            parseFrontmatter: false,
            mdxOptions: {
                rehypePlugins: [rehypeHighlight],
            },
        },
    });

    return {
        project: project,
        content: content,
    };
}

export default async function Project({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { project, content } = await getProjectInfo(slug);
    return (
        <div className="relative mx-auto my-0 flex max-w-4xl animate-[fade_300ms_ease-in-out_normal_forwards] flex-col gap-6 px-6">
            <div className="flex flex-col gap-2 md:gap-4">
                <h1 className="font-headings text-3xl text-white md:text-5xl">
                    {project.fields.title}
                </h1>
                <div className="font-content flex flex-row gap-4">
                    {project.fields.github !== undefined && (
                        <a
                            className="flex items-center justify-center font-normal text-neutral-300 no-underline"
                            href={project.fields.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <svg
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-1 size-5 fill-[#d4d4d4]"
                            >
                                <title>GitHub</title>
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                            <span className="h-5">GitHub</span>
                        </a>
                    )}
                    {project.fields.website !== undefined && (
                        <a
                            className="flex items-center justify-center font-normal text-neutral-300 no-underline"
                            href={project.fields.website}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GlobeIcon
                                color="rgb(212 212 212)"
                                className="mr-1 h-5 w-5"
                            />
                            <span className="h-5">Website</span>
                        </a>
                    )}
                </div>
            </div>
            {project.fields.thumbnail !== undefined && (
                <Image
                    src={`https:${project.fields.thumbnail.fields.file?.url}`}
                    alt="project-cover"
                    width={
                        project.fields.thumbnail.fields.file?.details.image
                            ?.width
                    }
                    height={
                        project.fields.thumbnail.fields.file?.details.image
                            ?.height
                    }
                    className="aspect-video w-full rounded-lg object-cover drop-shadow-sm"
                />
            )}
            {project.fields.thumbnail === undefined && (
                <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-white drop-shadow-sm">
                    Error
                </div>
            )}
            <div className="flex flex-row flex-wrap gap-5">
                {project.fields.technologies.map((technology) => (
                    <TechStack
                        key={technology?.fields.slug}
                        technology={technology!}
                    />
                ))}
            </div>
            <div className="prose md:prose-xl dark:prose-invert prose-pre:p-0 prose-headings:font-headings font-content max-w-none">
                {content}
            </div>
        </div>
    );
}
