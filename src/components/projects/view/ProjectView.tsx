import { ProjectMeta } from "@/lib/types";
import Image from "next/image";
import ProjectHeader from "./ProjectHeader";
import ProjectTechs from "./ProjectTechs";

type Props = {
    meta: ProjectMeta,
    content: string
}

const ProjectView = ({ meta, content }: Props) => {
    return (
        <div className="relative max-w-4xl my-0 mx-auto px-5 flex flex-col gap-6">
            <ProjectHeader meta={meta} />
            <Image
                src={meta.thumbnail}
                alt="project-cover"
                width={1000}
                height={1000}
                className="w-full aspect-video object-cover rounded-lg drop-shadow"
            />
            <ProjectTechs meta={meta} />
            <div className="prose prose-lg prose-pre:p-0 dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
};

export default ProjectView;