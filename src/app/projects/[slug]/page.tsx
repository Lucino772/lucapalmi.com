import rehypeHighlight from "rehype-highlight";

import NavBar from "@/components/NavBar";
import { serialize } from "next-mdx-remote/serialize";

import { ProjectMeta } from "@/lib/types";
import { ProjectView } from "@/components/projects";
import { getAllProjects, getProject } from "@/lib/cms";

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
  const meta = {
    title: project?.fields.title,
    description: project?.fields.description,
    links: project?.fields.links,
    techs: project?.fields.technologies,
    thumbnail: project?.fields.thumbnail,
  } as ProjectMeta;

  const markdown = await serialize(project?.fields.content!, {
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
  return (
    <div style={{ paddingBottom: 100 }}>
      <NavBar showLogo exitDelay={0.2} />
      <ProjectView meta={meta} content={content} />
    </div>
  );
}
