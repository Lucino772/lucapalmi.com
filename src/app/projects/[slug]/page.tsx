import rehypeHighlight from "rehype-highlight";
import { compileMDX } from "next-mdx-remote/rsc";

import { ProjectView } from "@/components/projects";
import { getAllProjects, getProject } from "@/lib/cms";
import { notFound } from "next/navigation";

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
    params: { slug: string };
}) {
    const { project, content } = await getProjectInfo(params.slug);
    return <ProjectView project={project} content={content} />;
}
