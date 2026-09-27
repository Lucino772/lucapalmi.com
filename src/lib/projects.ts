import { z } from "zod";
import data from "@/content/projects.json";

const projectsSchema = z.object({
    featured: z.array(
        z.object({
            title: z.string(),
            type: z.enum([
                "infrastructure",
                "tool",
                "desktop",
                "package",
                "website",
            ]),
            status: z.enum(["early", "active", "archived"]),
            year: z.number(),
            description: z.string(),
            tags: z.array(z.string()),
            article: z.string().optional(),
            links: z.object({
                github: z.url(),
                website: z.url().optional(),
            }),
        }),
    ),
    others: z.array(
        z.object({
            title: z.string(),
            description: z.string(),
            year: z.number(),
            url: z.url(),
            article: z.string().optional(),
        }),
    ),
});

export type Projects = z.infer<typeof projectsSchema>;

export const projects: Projects = projectsSchema.parse(data);
