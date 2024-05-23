import { ProjectEntrySkeleton } from "@/lib/cms";
import { Entry } from "contentful";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

type Props = {
    enterDelay?: number;
    project: Entry<ProjectEntrySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;
};

const ProjectItem = ({ project, enterDelay }: Props) => {
    const delay = useMemo(() => {
        if (enterDelay === undefined) return 0;
        return enterDelay * 1000;
    }, [enterDelay]);

    const {
        fields: { thumbnail, title, slug, description },
    } = project;

    return (
        <Link
            href={`/projects/${slug}`}
            className="flex animate-[fade_300ms_ease-in-out_normal_forwards] opacity-0"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="relative flex w-full flex-col rounded-lg border-2 border-transparent bg-[#242424] p-5 shadow-md transition-all hover:scale-[1.01] hover:border-[#4169E1]">
                <div className="relative flex items-center justify-between">
                    {thumbnail !== undefined && (
                        <Image
                            src={`https:${thumbnail.fields.file?.url}`}
                            alt="project-cover"
                            width={thumbnail.fields.file?.details.image?.width}
                            height={
                                thumbnail.fields.file?.details.image?.height
                            }
                            className="h-16 w-16 rounded-lg object-cover"
                        />
                    )}
                    {thumbnail === undefined && (
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white">
                            Error
                        </div>
                    )}
                    <h2 className="px-0 py-2 text-xl font-semibold text-white">
                        {title}
                    </h2>
                </div>
                <div className="relative mt-5 flex h-full flex-col justify-between gap-2">
                    <p className="text-white">{description}</p>
                </div>
            </div>
        </Link>
    );
};

export default ProjectItem;
