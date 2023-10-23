import * as fs from "fs/promises";
import rehypeHighlight from "rehype-highlight";

import NavBar from "@/components/NavBar";
import { serialize } from "next-mdx-remote/serialize";
import { getProject } from "@/lib/projects";

import { ProjectMeta } from "@/lib/types";
import { ProjectView } from "@/components/projects";

async function getProjectInfo(slug: string) {
  const project = await getProject(slug);
  const source = await fs.readFile(project.filename, { encoding: "utf-8" });
  const markdown = await serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [rehypeHighlight],
    },
  });
  return {
    meta: markdown.frontmatter as ProjectMeta,
    content: markdown,
    slug: project.slug,
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
