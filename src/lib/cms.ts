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

const articleSchema = z.object({
    title: z.string(),
    subtitle: z.string(),
    createdAt: z.date(),
    updatedAt: z.date().optional(),
    tags: z.array(z.string()),
    readingTime: z.number().optional(),
    author: z.string().optional(),
    cover: z.discriminatedUnion("kind", [
        z.object({
            kind: z.literal("ai-generated"),
            data: z.object({
                src: z.string(),
                width: z.number(),
                height: z.number(),
            }),
            prompt: z.string(),
        }),
        z.object({
            kind: z.literal("external"),
            data: z.object({
                src: z.string(),
                width: z.number(),
                height: z.number(),
            }),
            source: z.url(),
        }),
    ]),
});

export type Article = z.infer<typeof articleSchema>;

export async function getArticles(): Promise<
    {
        filename: string;
        metadata: Article;
        slug: string;
    }[]
> {
    const articlesDir = path.join(process.cwd(), "src/content/articles");
    return await Promise.all(
        fs
            .readdirSync(articlesDir)
            .map((val) => ({
                _import: import(`@/content/articles/${val}`),
                filename: val,
            }))
            .map(({ _import, filename }) =>
                _import.then((val) => ({
                    filename: filename,
                    metadata: articleSchema.parse(val.metadata),
                    slug: path.parse(filename).name,
                })),
            ),
    );
}

export async function getArticle(
    slug: string,
): Promise<{ Content: () => React.JSX.Element; metadata: Article }> {
    return await import(`@/content/articles/${slug}.mdx`).then((v) => ({
        Content: v.default,
        metadata: articleSchema.parse(v.metadata),
    }));
}
