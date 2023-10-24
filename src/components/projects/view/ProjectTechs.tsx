"use client";

import TechStack from "@/components/TechStack";
import { ProjectEntrySkeleton } from "@/lib/cms";
import { Entry } from "contentful";

type Props = {
  project: Entry<ProjectEntrySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;
};

const ProjectTechs = ({ project }: Props) => {
  return (
    <div className="flex flex-row gap-5">
      {project.fields.technologies.map((technology) => (
        <TechStack key={technology?.fields.slug} technology={technology!} />
      ))}
    </div>
  );
};

export default ProjectTechs;
