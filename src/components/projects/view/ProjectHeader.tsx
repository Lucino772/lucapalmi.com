"use client";

import GithubIcon from "@/assets/svg/github.svg";
import WebIcon from "@/assets/svg/web.svg";
import BookIcon from "@/assets/svg/book.svg";
import { ProjectEntrySkeleton } from "@/lib/cms";
import { Entry } from "contentful";

type Props = {
  project: Entry<ProjectEntrySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;
};

const ProjectHeader = ({ project }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-5xl text-white">{project.fields.title}</h1>
      <div className="flex flex-row gap-4">
        {project.fields.github !== undefined && (
          <a
            className="flex items-center justify-center font-normal text-neutral-300 no-underline"
            href={project.fields.github}
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon
              color="rgb(212 212 212)"
              className="mr-1"
              width={20}
              height={20}
            />
            <span className="h-[20px]">GitHub</span>
          </a>
        )}
        {project.fields.website !== undefined && (
          <a
            className="flex items-center justify-center font-normal text-neutral-300 no-underline"
            href={project.fields.website}
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
