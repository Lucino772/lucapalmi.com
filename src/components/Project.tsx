import React from "react";

import GithubIcon from "../../public/svg/github.svg";
import EyeIcon from "../../public/svg/eye.svg";
import BookIcon from "../../public/svg/book.svg";

import { m as motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function ProjectContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative max-w-4xl my-0 mx-auto px-5 grid gap-4 grid-cols-1 md:grid-cols-2">
      {children}
    </div>
  );
}

type Props = {
  enterDelay?: number;
  slug: string;
  title: string;
  image: string;
  portrait: boolean;
  description: string;
  github_url?: string;
  project_url?: string;
  docs_url?: string;
};

export function ProjectItem(props: Props) {
  if (props.enterDelay === undefined) props.enterDelay = 0;

  const variants: Variants = {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: { duration: 0.3, delay: props.enterDelay },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="relative w-full p-5 rounded-lg shadow-xl flex flex-col bg-[#242424]"
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <div className="relative flex justify-between items-center">
        <Image
          src={props.image}
          alt="project-cover"
          width={64}
          height={64}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <Link href={`/projects/${props.slug}`}>
          <h2 className="text-white py-2 px-0 text-xl font-semibold">
            {props.title}
          </h2>
        </Link>
      </div>
      <div className="relative h-full mt-5 flex flex-col justify-between">
        <p className="text-white">{props.description}</p>
        <div className="mt-5 flex gap-5">
          {props.github_url !== undefined ? (
            <a
              className="text-white no-underline font-normal flex justify-center items-center"
              href={props.github_url}
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon
                color="white"
                className="mr-1"
                width={20}
                height={20}
              />
              Github
            </a>
          ) : null}
          {props.project_url !== undefined ? (
            <a
              className="text-white no-underline font-normal flex justify-center items-center"
              href={props.project_url}
              target="_blank"
              rel="noreferrer"
            >
              <EyeIcon color="white" className="mr-1" width={20} height={20} />
              Project
            </a>
          ) : null}
          {props.docs_url !== undefined ? (
            <a
              className="text-white no-underline font-normal flex justify-center items-center"
              href={props.docs_url}
              target="_blank"
              rel="noreferrer"
            >
              <BookIcon color="white" className="mr-1" width={20} height={20} />
              Docs
            </a>
          ) : null}
          {props.github_url || props.project_url || props.docs_url ? null : (
            <p className="font-normal italic">No links provided</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
