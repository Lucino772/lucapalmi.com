"use client"

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
    <div className="relative max-w-4xl my-0 mx-auto px-5 grid gap-4 grid-cols-1 md:grid-cols-2">
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
