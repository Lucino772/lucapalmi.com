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
      <div className="relative w-full p-5 rounded-lg shadow-md flex flex-col bg-[#242424] transition-all border-2 border-transparent hover:border-[#4169E1] hover:scale-[1.01]">
        <div className="relative flex justify-between items-center">
          <Image
            src={project.thumbnail}
            alt="project-cover"
            width={64}
            height={64}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <h2 className="text-white py-2 px-0 text-xl font-semibold">
            {project.title}
          </h2>
        </div>
        <div className="relative h-full mt-5 flex flex-col gap-2 justify-between">
          <p className="text-white">{project.description}</p>
        </div>
      </div>
    </MotionLink>
  );
};

export default ProjectItem;
