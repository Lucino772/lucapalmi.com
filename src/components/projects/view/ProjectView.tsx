"use client";

import { m as motion, Variants } from "framer-motion";
import Image from "next/image";
import ProjectHeader from "./ProjectHeader";
import ProjectTechs from "./ProjectTechs";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ProjectEntrySkeleton } from "@/lib/cms";
import { Entry } from "contentful";

type Props = {
    project: Entry<ProjectEntrySkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;
    content: MDXRemoteSerializeResult<
        Record<string, unknown>,
        Record<string, unknown>
    >;
};

const ProjectView = ({ project, content }: Props) => {
    const variants: Variants = {
        initial: { opacity: 0 },
        enter: {
            opacity: 1,
            transition: { duration: 0.3 },
        },
        exit: { opacity: 0, transition: { duration: 0.3 } },
    };

    return (
        <motion.div
            className="relative mx-auto my-0 flex max-w-4xl flex-col gap-6 px-5"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
        >
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
                <MDXRemote {...content} />
            </div>
        </motion.div>
    );
};

export default ProjectView;
