import fg from "fast-glob";
import path from "path";
import React from "react";

import { z } from "zod";

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
        z.object({
            kind: z.literal("internal"),
            data: z.object({
                src: z.string(),
                width: z.number(),
                height: z.number(),
            }),
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
    return await Promise.all(
        (await fg("*.{md,mdx}", { cwd: "src/content/articles" })).map(
            (filename) =>
                import(`@/content/articles/${filename}`).then((val) => ({
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
