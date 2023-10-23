"use client";

import { ProjectMeta } from "@/lib/types";
import ProjectItem from "./ProjectItem";

type Props = {
  projects: {
    meta: ProjectMeta;
    slug: string;
  }[];
};

const ProjectList = ({ projects }: Props) => {
  return (
    <div className="relative mx-auto my-0 grid max-w-4xl grid-cols-1 gap-4 px-5 md:grid-cols-2">
      {projects.map((project, i) => (
        <ProjectItem
          key={i}
          enterDelay={0.1 + 0.2 * i}
          slug={project.slug}
          project={project.meta}
        />
      ))}
    </div>
  );
};

export default ProjectList;
