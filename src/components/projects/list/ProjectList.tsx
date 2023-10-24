"use client";

import ProjectItem from "./ProjectItem";
import { Entry } from "contentful";
import { ProjectEntrySkeleton } from "@/lib/cms";

type Props = {
  projects: Entry<ProjectEntrySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>[];
};

const ProjectList = ({ projects }: Props) => {
  return (
    <div className="relative mx-auto my-0 grid max-w-4xl grid-cols-1 gap-4 px-5 md:grid-cols-2">
      {projects.map((project, i) => (
        <ProjectItem key={i} enterDelay={0.1 + 0.2 * i} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
