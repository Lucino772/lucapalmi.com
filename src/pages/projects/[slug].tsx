import { markdown2html } from "@/lib/markdown";
import * as fs from "fs/promises";
import matter from "gray-matter";

export default function Project({
  meta,
  content,
}: {
  meta: any;
  content: any;
}) {
  console.log(meta);
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export async function getStaticPaths() {
  const files = await fs.readdir("_projects");
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(/\.md$/, ""),
    },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const fileBuffer = await fs.readFile(`_projects/${slug}.md`);
  const { data, content } = matter(fileBuffer);
  const markdown = await markdown2html(content);
  return {
    props: {
      meta: data,
      content: markdown,
    },
  };
}
