import NavBar from "@/components/NavBar";
import { markdown2html } from "@/lib/markdown";
import { getProject, getProjects } from "@/lib/projects";
import Scrollbars from "react-custom-scrollbars";

import { ProjectMeta } from "@/lib/types";
import { ProjectView } from "@/components/projects";

type Props = {
  meta: ProjectMeta,
  content: string
}

export default function Project({ meta, content }: Props) {
  return (
    <Scrollbars universal autoHeight autoHeightMin="100vh">
      <div style={{ paddingBottom: 100 }}>
        <NavBar showLogo exitDelay={0.2} />
        <ProjectView meta={meta} content={content} />
      </div>
    </Scrollbars>
  )
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
  const markdown = await markdown2html(project.content);
  return {
    props: {
      meta: project.meta,
      content: markdown,
      slug: project.slug,
    },
  };
}
