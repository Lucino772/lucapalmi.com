import Image from "next/image";
import { getArticle, getArticles } from "@/lib/cms";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { AiImageDescription } from "@/components/ai-image-description";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { Content, metadata: article } = await getArticle(slug);

    return (
        <div className="relative mx-auto my-0 flex max-w-4xl animate-[fade_300ms_ease-in-out_normal_forwards] flex-col gap-6 px-6">
            <div className="prose md:prose-lg dark:prose-invert prose-pre:p-0 prose-headings:font-headings font-content prose-pre:border-2 prose-pre:border-[#4169E1]/40 mt-5 max-w-none">
                <div className="not-prose mb-5 flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                        {article.tags.map((item) => (
                            <div
                                key={item}
                                className="font-content rounded-lg bg-[#4169E1] px-1.5 py-0.5 text-xs shadow md:text-sm"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row items-center gap-6">
                        <div className="flex flex-row items-center gap-2">
                            <CalendarIcon className="size-4" />
                            <span>
                                {article.createdAt.toLocaleDateString()}
                            </span>
                        </div>
                        {article.readingTime !== undefined && (
                            <div className="flex flex-row items-center gap-2">
                                <ClockIcon className="size-4" />
                                <span>
                                    {(article.readingTime / 60).toFixed(0)} min
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <h1 className="mb-0!">{article.title}</h1>
                <p className="mt-1!">{article.subtitle}</p>
                <div className="not-prose flex flex-col gap-4">
                    <div className="aspect-video overflow-hidden rounded-lg shadow-sm">
                        <Image
                            src={article.cover.data.src}
                            alt="article-cover"
                            width={article.cover.data.width}
                            height={article.cover.data.height}
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-[101%]"
                        />
                    </div>
                    {article.cover.kind === "ai-generated" && (
                        <AiImageDescription prompt={article.cover.prompt} />
                    )}
                </div>
                <Content />
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    return await Promise.all(
        (await getArticles()).map(async (article) => {
            return {
                slug: article.slug as string,
            };
        }),
    );
}

export const dynamicParams = false;
