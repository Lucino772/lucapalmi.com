import Image from "next/image";
import { getArticle, getArticles } from "@/lib/cms";
import Link from "next/link";
import { topicLabel } from "@/content/topics";
import { isoDay, readingMinutes } from "@/lib/format";
import SectionRail from "@/components/SectionRail";
import { AiImageDescription } from "@/components/ai-image-description";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const { metadata: article } = await getArticle(slug);

    return {
        title: `${article.title} | Luca Palmisano`,
        description: article.subtitle,
        keywords: article.tags,
        openGraph: {
            title: article.title,
            description: article.subtitle,
            images: article.cover && [
                {
                    url: article.cover.data.src,
                    width: article.cover.data.width,
                    height: article.cover.data.height,
                    alt: `${article.title} cover image`,
                },
            ],
            type: "article",
            publishedTime: article.createdAt.toISOString(),
            modifiedTime: article.updatedAt?.toISOString(),
            authors: ["Luca Palmisano"],
            tags: article.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.subtitle,
            images: article.cover && [article.cover.data.src],
        },
        alternates: {
            canonical: `https://lucapalmi.com/articles/${slug}`,
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { Content, metadata: article } = await getArticle(slug);
    const minutes = readingMinutes(article.readingTime);

    return (
        <article className="w-full px-6 pt-8 pb-20 md:px-6 md:pt-14 md:pb-28">
            <header className="fade-in max-w-measure mx-auto">
                <Link
                    href="/articles"
                    className="text-faint hover:text-accent-text text-[0.875rem] transition-colors duration-150"
                >
                    <span aria-hidden>../</span>writing
                </Link>
                {/* Same columns as the writing timeline */}
                <p className="text-faint mt-8 flex flex-wrap gap-x-[2ch] text-[0.875rem] leading-6 tabular-nums">
                    <time dateTime={isoDay(article.createdAt)}>
                        {isoDay(article.createdAt)}
                    </time>
                    {minutes && <span>{minutes} read</span>}
                </p>
                <h1 className="mt-3 text-[2rem] leading-[1.15] font-semibold tracking-[-0.02em] md:text-[2.5rem]">
                    {article.title}
                </h1>
                <p className="text-muted mt-4 font-serif text-[1.1875rem] leading-8 italic md:text-[1.3125rem]">
                    {article.subtitle}
                </p>
                {article.topics.length > 0 && (
                    <ul
                        aria-label="Topics"
                        className="mt-5 flex flex-wrap gap-x-[2ch] text-[0.875rem]"
                    >
                        {article.topics.map((topic) => (
                            <li key={topic}>
                                <Link
                                    href={`/articles?topic=${topic}`}
                                    className="text-accent-text underline decoration-current/40 underline-offset-4 hover:decoration-current"
                                >
                                    {topicLabel(topic)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </header>

            {article.cover && (
                <figure className="mx-auto mt-10 max-w-[52rem]">
                    <div className="border-line overflow-hidden rounded-[6px] border">
                        <Image
                            src={article.cover.data.src}
                            alt={`Cover image for ${article.title}`}
                            width={article.cover.data.width}
                            height={article.cover.data.height}
                            priority
                            sizes="(min-width: 880px) 832px, 100vw"
                            className="aspect-video h-auto w-full object-cover"
                        />
                    </div>
                    {article.cover.kind === "ai-generated" && (
                        <figcaption className="max-w-measure mx-auto mt-3">
                            <AiImageDescription prompt={article.cover.prompt} />
                        </figcaption>
                    )}
                </figure>
            )}

            <div data-article-body className="prose mx-auto mt-12 md:mt-14">
                <Content />
            </div>

            <footer className="border-line text-muted max-w-measure mx-auto mt-16 border-t pt-6 text-[0.875rem]">
                <ul
                    aria-label="Tags"
                    className="text-faint mb-5 flex flex-wrap gap-x-[1.5ch] text-[0.8125rem]"
                >
                    {article.tags.map((tag) => (
                        <li key={tag}>#{tag}</li>
                    ))}
                </ul>
                <div className="flex items-center justify-between">
                    <Link
                        href="/articles"
                        className="hover:text-accent-text transition-colors duration-150"
                    >
                        <span aria-hidden>../</span>writing
                    </Link>
                    <a
                        href="#content"
                        className="hover:text-accent-text transition-colors duration-150"
                    >
                        Back to top
                    </a>
                </div>
            </footer>

            <SectionRail />
        </article>
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
