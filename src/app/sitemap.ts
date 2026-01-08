import { getArticles } from "@/lib/cms";
import { getProjects } from "@/lib/cms";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const articles = await getArticles();
    const projects = await getProjects();

    const articleUrls = articles.map((article) => ({
        url: `https://lucapalmi.com/articles/${article.slug}`,
        lastModified: article.metadata.createdAt,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const projectUrls = projects.map((project) => ({
        url: `https://lucapalmi.com/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [
        {
            url: "https://lucapalmi.com",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://lucapalmi.com/articles",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: "https://lucapalmi.com/projects",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        ...articleUrls,
        ...projectUrls,
    ];
}
