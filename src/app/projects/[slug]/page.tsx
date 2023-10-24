import rehypeHighlight from "rehype-highlight";
import { serialize } from "next-mdx-remote/serialize";

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

  const markdown = await serialize(project.fields.content!, {
    parseFrontmatter: false,
    mdxOptions: {
      rehypePlugins: [rehypeHighlight],
    },
  });

  return {
    project: project,
    content: markdown,
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
