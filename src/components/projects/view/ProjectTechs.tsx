import TechStack from "@/components/TechStack";
import { ProjectMeta } from "@/lib/types";

type Props = {
    meta: ProjectMeta
}

const ProjectTechs = ({ meta }: Props) => {
    return (
        <div className="flex flex-row gap-5">
            {meta.techs.map((name) => <TechStack key={name} name={name} />)}
        </div>
    )
};

export default ProjectTechs;