import { markdown2html } from "@/lib/markdown";
import { getProject, getProjects } from "@/lib/projects";

export default function Project({
  meta,
  content,
}: {
  meta: any;
  content: any;
}) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
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
