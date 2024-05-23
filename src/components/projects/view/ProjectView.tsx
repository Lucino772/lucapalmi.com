import Image from "next/image";
import ProjectHeader from "./ProjectHeader";
import ProjectTechs from "./ProjectTechs";

import { ProjectEntrySkeleton } from "@/lib/cms";
import { Entry } from "contentful";

type Props = {
    project: Entry<ProjectEntrySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;
    content: React.ReactElement;
};

const ProjectView = ({ project, content }: Props) => {
    return (
        <div className="relative mx-auto my-0 flex max-w-4xl animate-[fade_300ms_ease-in-out_normal_forwards] flex-col gap-6 px-5">
            <ProjectHeader project={project} />
            {project.fields.thumbnail !== undefined && (
                <Image
                    src={`https:${project.fields.thumbnail.fields.file?.url}`}
                    alt="project-cover"
                    width={
                        project.fields.thumbnail.fields.file?.details.image
                            ?.width
                    }
                    height={
                        project.fields.thumbnail.fields.file?.details.image
                            ?.height
                    }
                    className="aspect-video w-full rounded-lg object-cover drop-shadow"
                />
            )}
            {project.fields.thumbnail === undefined && (
                <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-white drop-shadow">
                    Error
                </div>
            )}
            <ProjectTechs project={project} />
            <div className="prose prose-lg max-w-none dark:prose-invert prose-pre:p-0">
                {content}
            </div>
        </div>
    );
};

export default ProjectView;
