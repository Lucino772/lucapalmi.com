import NavBar from "@/components/NavBar";
import { markdown2html } from "@/lib/markdown";
import { getProject, getProjects } from "@/lib/projects";
import Scrollbars from "react-custom-scrollbars";

import GithubIcon from "../../../public/svg/github.svg";
import WebIcon from "../../../public/svg/web.svg";
import BookIcon from "../../../public/svg/book.svg";
import Image from "next/image";
import TechStack from "@/components/TechStack";
import { ProjectMeta } from "@/lib/types";

type Props = {
  meta: ProjectMeta,
  content: string
}

export default function Project({ meta, content }: Props) {
  console.log(meta)
  return (
    <Scrollbars universal autoHeight autoHeightMin="100vh">
      <div style={{ paddingBottom: 100 }}>
        <NavBar showLogo exitDelay={0.2} />
        <div className="relative max-w-4xl my-0 mx-auto px-5 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-5xl">{meta.title}</h1>
            <div className="flex flex-row divide-x-2 divide-neutral-300">
              {meta.links.github !== undefined && (
                <a className="text-neutral-300 no-underline font-normal flex justify-center items-center px-4 first:pl-0" href={meta.links.github} target="_blank" rel="noreferrer">
                  <GithubIcon
                    color="rgb(212 212 212)"
                    className="mr-1"
                    width={20}
                    height={20}
                  />
                  Source Code
                </a>
              )}
              {meta.links.docs !== undefined && (
                <a className="text-neutral-300 no-underline font-normal flex justify-center items-center px-4 first:pl-0" href={meta.links.docs} target="_blank" rel="noreferrer">
                  <BookIcon
                    color="rgb(212 212 212)"
                    className="mr-1"
                    width={20}
                    height={20}
                  />
                  Documentation
                </a>
              )}
              {meta.links.url !== undefined && (
                <a className="text-neutral-300 no-underline font-normal flex justify-center items-center px-4 first:pl-0" href={meta.links.url} target="_blank" rel="noreferrer">
                  <WebIcon
                    color="rgb(212 212 212)"
                    className="mr-1"
                    width={20}
                    height={20}
                  />
                  Website
                </a>
              )}
            </div>
          </div>
          <Image
            src={meta.thumbnail}
            alt="project-cover"
            width={1000}
            height={1000}
            className="w-full aspect-video object-cover rounded-lg drop-shadow"
          />
          <div className="flex flex-row gap-5">
            {meta.techs.map((name) => <TechStack key={name} name={name} />)}
          </div>
          <div className="prose prose-lg prose-pre:p-0 dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
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
