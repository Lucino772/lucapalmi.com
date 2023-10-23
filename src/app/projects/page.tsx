import * as fs from "fs/promises";
import { serialize } from "next-mdx-remote/serialize";

import NavBar from "@/components/NavBar";
import { getProjects } from "@/lib/projects";
import { ProjectMeta } from "@/lib/types";
import { ProjectList } from "@/components/projects";
import rehypeHighlight from "rehype-highlight";

type Props = {
  projects: {
    meta: ProjectMeta;
    slug: string;
  }[];
};

async function getProjectsInfo() {
  const projects = await Promise.all(
    (await getProjects()).map(async (project) => {
      const source = await fs.readFile(project.filename, { encoding: "utf-8" });
      const markdown = await serialize(source, {
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [rehypeHighlight],
        },
      });
      return {
        meta: markdown.frontmatter as ProjectMeta,
        slug: project.slug,
      };
    }),
  );
  return projects;
}

export default async function Projects(props: Props) {
  const projects = await getProjectsInfo();

  return (
    <div style={{ paddingBottom: 100 }}>
      <NavBar showLogo exitDelay={0.2} />
      <ProjectList projects={projects} />
    </div>
  );
}
