"use client";

import TechStack from "@/components/TechStack";
import { ProjectMeta } from "@/lib/types";

type Props = {
  meta: ProjectMeta;
};

const ProjectTechs = ({ meta }: Props) => {
  return (
    <div className="flex flex-row gap-5">
      {meta.techs.map((technology) => (
        <TechStack key={technology.fields.slug} technology={technology} />
      ))}
    </div>
  );
};

export default ProjectTechs;
