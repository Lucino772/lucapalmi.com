import { ProjectMeta } from "@/lib/types";

import GithubIcon from "@/assets/svg/github.svg";
import WebIcon from "@/assets/svg/web.svg";
import BookIcon from "@/assets/svg/book.svg";

type Props = {
    meta: ProjectMeta
}

const ProjectHeader = ({ meta }: Props) => {
    return (
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
    )
};

export default ProjectHeader;