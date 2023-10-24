import rehypeHighlight from "rehype-highlight";
import { serialize } from "next-mdx-remote/serialize";

import { ProjectMeta } from "@/lib/types";
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

  const meta = {
    title: project.fields.title,
    description: project.fields.description,
    links: project.fields.links,
    techs: project.fields.technologies,
    thumbnail: project.fields.thumbnail,
  } as ProjectMeta;

  const markdown = await serialize(project.fields.content!, {
    parseFrontmatter: false,
    mdxOptions: {
      rehypePlugins: [rehypeHighlight],
    },
  });

  return {
    meta: meta,
    content: markdown,
  };
}

export default async function Project({
  params,
}: {
  params: { slug: string };
}) {
  const { meta, content } = await getProjectInfo(params.slug);
  return <ProjectView meta={meta} content={content} />;
}
