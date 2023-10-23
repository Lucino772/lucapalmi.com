import * as fs from "fs/promises";

import NavBar from "@/components/NavBar";
import { serialize } from "next-mdx-remote/serialize";
import { getProject, getProjects } from "@/lib/projects";
import Scrollbars from "react-custom-scrollbars";

import { ProjectMeta } from "@/lib/types";
import { ProjectView } from "@/components/projects";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

type Props = {
  meta: ProjectMeta;
  content: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
};

export default function Project({ meta, content }: Props) {
  return (
    <Scrollbars universal autoHeight autoHeightMin="100vh">
      <div style={{ paddingBottom: 100 }}>
        <NavBar showLogo exitDelay={0.2} />
        <ProjectView meta={meta} content={content} />
      </div>
    </Scrollbars>
  );
}

export async function getStaticPaths() {
  const projects = await getProjects();
  const paths = projects.map(({ slug }) => ({
    params: {
      slug: slug,
    },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const project = await getProject(slug);
  const source = await fs.readFile(project.filename, { encoding: "utf-8" });
  const markdown = await serialize(source, { parseFrontmatter: true });
  return {
    props: {
      meta: markdown.frontmatter as ProjectMeta,
      content: markdown,
      slug: project.slug,
    },
  };
}
