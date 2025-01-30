import Image from "next/image";
import rehypeHighlight from "rehype-highlight";
import { compileMDX } from "next-mdx-remote/rsc";

import { getAllProjects, getProject } from "@/lib/cms";
import { notFound } from "next/navigation";
import TechStack from "@/components/TechStack";
import { GithubIcon, GlobeIcon } from "lucide-react";

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
        <div className="relative mx-auto my-0 flex max-w-4xl animate-[fade_300ms_ease-in-out_normal_forwards] flex-col gap-6 px-5">
            <div className="flex flex-col gap-2">
                <h1 className="text-5xl text-white">{project.fields.title}</h1>
                <div className="flex flex-row gap-4">
                    {project.fields.github !== undefined && (
                        <a
                            className="flex items-center justify-center font-normal text-neutral-300 no-underline"
                            href={project.fields.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GithubIcon
                                color="rgb(212 212 212)"
                                className="mr-1 h-5 w-5"
                            />
                            <span className="h-[20px]">GitHub</span>
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
                            <span className="h-[20px]">Website</span>
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
                    className="aspect-video w-full rounded-lg object-cover drop-shadow"
                />
            )}
            {project.fields.thumbnail === undefined && (
                <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-white drop-shadow">
                    Error
                </div>
            )}
            <div className="flex flex-row gap-5">
                {project.fields.technologies.map((technology) => (
                    <TechStack
                        key={technology?.fields.slug}
                        technology={technology!}
                    />
                ))}
            </div>
            <div className="prose prose-lg max-w-none dark:prose-invert prose-pre:p-0">
                {content}
            </div>
        </div>
    );
}
