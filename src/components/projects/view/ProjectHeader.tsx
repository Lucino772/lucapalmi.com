"use client";

import { ProjectMeta } from "@/lib/types";

import GithubIcon from "@/assets/svg/github.svg";
import WebIcon from "@/assets/svg/web.svg";
import BookIcon from "@/assets/svg/book.svg";

type Props = {
  meta: ProjectMeta;
};

const ProjectHeader = ({ meta }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-5xl text-white">{meta.title}</h1>
      <div className="flex flex-row gap-4">
        {meta.links.github !== undefined && (
          <a
            className="flex items-center justify-center font-normal text-neutral-300 no-underline"
            href={meta.links.github}
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon
              color="rgb(212 212 212)"
              className="mr-1"
              width={20}
              height={20}
            />
            <span className="h-[20px]">Source Code</span>
          </a>
        )}
        {meta.links.docs !== undefined && (
          <a
            className="flex items-center justify-center font-normal text-neutral-300 no-underline"
            href={meta.links.docs}
            target="_blank"
            rel="noreferrer"
          >
            <BookIcon
              color="rgb(212 212 212)"
              className="mr-1"
              width={20}
              height={20}
            />
            <span className="h-[20px]">Documentation</span>
          </a>
        )}
        {meta.links.url !== undefined && (
          <a
            className="flex items-center justify-center font-normal text-neutral-300 no-underline"
            href={meta.links.url}
            target="_blank"
            rel="noreferrer"
          >
            <WebIcon
              color="rgb(212 212 212)"
              className="mr-1"
              width={20}
              height={20}
            />
            <span className="h-[20px]">Website</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectHeader;
