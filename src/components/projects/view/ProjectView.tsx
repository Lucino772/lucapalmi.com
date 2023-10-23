"use client";

import { ProjectMeta } from "@/lib/types";
import { m as motion, Variants } from "framer-motion";
import Image from "next/image";
import ProjectHeader from "./ProjectHeader";
import ProjectTechs from "./ProjectTechs";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

type Props = {
  meta: ProjectMeta;
  content: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
};

const ProjectView = ({ meta, content }: Props) => {
  const variants: Variants = {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="relative mx-auto my-0 flex max-w-4xl flex-col gap-6 px-5"
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <ProjectHeader meta={meta} />
      <Image
        src={meta.thumbnail}
        alt="project-cover"
        width={1000}
        height={1000}
        className="aspect-video w-full rounded-lg object-cover drop-shadow"
      />
      <ProjectTechs meta={meta} />
      <div className="prose prose-lg max-w-none dark:prose-invert prose-pre:p-0">
        <MDXRemote {...content} />
      </div>
    </motion.div>
  );
};

export default ProjectView;
