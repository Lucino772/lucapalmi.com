"use client";

import { ProjectMeta } from "@/lib/types";
import { m as motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

type Props = {
  enterDelay?: number;
  slug: string;
  project: ProjectMeta;
};

const MotionLink = motion(Link);

const ProjectItem = ({ slug, project, enterDelay }: Props) => {
  const delay = useMemo(() => {
    if (enterDelay === undefined) return 0;
    return enterDelay;
  }, [enterDelay]);

  const variants: Variants = {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: { duration: 0.3, delay: delay },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <MotionLink
      href={`/projects/${slug}`}
      className="flex"
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <div className="relative flex w-full flex-col rounded-lg border-2 border-transparent bg-[#242424] p-5 shadow-md transition-all hover:scale-[1.01] hover:border-[#4169E1]">
        <div className="relative flex items-center justify-between">
          <Image
            src={project.thumbnail}
            alt="project-cover"
            width={64}
            height={64}
            className="h-16 w-16 rounded-lg object-cover"
          />
          <h2 className="px-0 py-2 text-xl font-semibold text-white">
            {project.title}
          </h2>
        </div>
        <div className="relative mt-5 flex h-full flex-col justify-between gap-2">
          <p className="text-white">{project.description}</p>
        </div>
      </div>
    </MotionLink>
  );
};

export default ProjectItem;
