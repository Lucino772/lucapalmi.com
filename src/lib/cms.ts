import fs from "fs";
import path from "path";
import React from "react";

import { z } from "zod";

const projectSchema = z.object({
    title: z.string(),
    description: z.string(),
    github: z.url().optional(),
    website: z.url().optional(),
    thumbnail: z
        .object({
            src: z.string(),
            width: z.number(),
            height: z.number(),
        })
        .optional(),
    technologies: z.array(
        z.object({
            name: z.string(),
            slug: z.string(),
            icon: z
                .object({
                    src: z.string(),
                    width: z.number(),
                    height: z.number(),
                })
                .optional(),
        }),
    ),
});

export type Project = z.infer<typeof projectSchema>;

export async function getProjects(): Promise<
    {
        filename: string;
        metadata: Project;
        slug: string;
    }[]
> {
    const projectsDir = path.join(process.cwd(), "src/content/projects");
    return await Promise.all(
        fs
            .readdirSync(projectsDir)
            .map((val) => ({
                _import: import(`@/content/projects/${val}`),
                filename: val,
            }))
            .map(({ _import, filename }) =>
                _import.then((val) => ({
                    filename: filename,
                    metadata: projectSchema.parse(val.metadata),
                    slug: path.parse(filename).name,
                })),
            ),
    );
}

export async function getProject(
    slug: string,
): Promise<{ Content: () => React.JSX.Element; metadata: Project }> {
    return await import(`@/content/projects/${slug}.mdx`).then((v) => ({
        Content: v.default,
        metadata: projectSchema.parse(v.metadata),
    }));
}
