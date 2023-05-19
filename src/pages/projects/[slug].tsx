import NavBar from "@/components/NavBar";
import { markdown2html } from "@/lib/markdown";
import { getProject, getProjects } from "@/lib/projects";
import Scrollbars from "react-custom-scrollbars";

import GithubIcon from "../../../public/svg/github.svg";
import EyeIcon from "../../../public/svg/eye.svg";
import BookIcon from "../../../public/svg/book.svg";
import Image from "next/image";
import TechStack from "@/components/TechStack";

export default function Project({
  meta,
  content,
}: {
  meta: {
    [key: string]: any
  };
  content: any;
}) {
  console.log(meta)
  return (
    <Scrollbars universal autoHeight autoHeightMin="100vh">
      <div style={{ paddingBottom: 100 }}>
        <NavBar showLogo exitDelay={0.2} />
        <div className="relative max-w-4xl my-0 mx-auto px-5 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-white text-5xl">{ meta.title }</h1>
            <div className="flex flex-row divide-x divide-neutral-300">
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
                  <EyeIcon
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
              <TechStack icon="/images/tech/nextjs.webp" label="Next.js" />
              <TechStack icon="/images/tech/python.webp" label="Python"/>
              <TechStack icon="/images/tech/tailwindcss.webp" label="Tailwind"/>
              <TechStack icon="/images/tech/vercel.webp" label="Vercel"/>
          </div>
          <div dangerouslySetInnerHTML={{ __html: content }} />
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
