import Image from "next/image";
import { getArticle, getArticles } from "@/lib/cms";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { isoDay, longDay, readingMinutes } from "@/lib/format";
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
    const essay = article.kind === "essay";
    const minutes = readingMinutes(article.readingTime);

    return (
        <article className="max-w-page mx-auto grid w-full gap-x-10 px-5 pt-8 pb-20 md:grid-cols-[12rem_minmax(0,1fr)] md:px-6 md:pt-16 md:pb-28">
            {/* File info: sits in the gutter on desktop, above the title on mobile */}
            <aside className="text-faint mb-6 flex flex-wrap items-baseline gap-x-[2ch] gap-y-1 text-[0.8125rem] leading-6 md:mb-0 md:flex-col md:gap-y-1.5 md:pt-1 md:text-[0.875rem]">
                <Link
                    href="/articles"
                    className="text-muted hover:text-accent mb-0 transition-colors duration-150 md:mb-5"
                >
                    <span aria-hidden>../</span>writing
                </Link>
                <span className={essay ? "text-accent" : "text-faint"}>
                    {article.kind}
                </span>
                <time
                    dateTime={isoDay(article.createdAt)}
                    className="tabular-nums"
                >
                    {longDay(article.createdAt)}
                </time>
                {minutes && <span>{minutes} read</span>}
                <ul className="flex flex-wrap gap-x-[1.5ch] md:mt-3 md:flex-col md:gap-y-0.5">
                    {article.tags.map((tag) => (
                        <li key={tag}>#{tag}</li>
                    ))}
                </ul>
            </aside>

            <div className="min-w-0">
                <header
                    className={cn(
                        "fade-in max-w-[42rem]",
                        essay ? "mb-10" : "mb-8",
                    )}
                >
                    <h1
                        className={cn(
                            "font-semibold tracking-[-0.02em]",
                            essay
                                ? "text-[2rem] leading-[1.15] md:text-[2.5rem]"
                                : "text-[1.625rem] leading-tight md:text-[1.75rem]",
                        )}
                    >
                        {article.title}
                    </h1>
                    <p
                        className={cn(
                            "text-muted mt-4 font-serif",
                            essay
                                ? "text-[1.1875rem] leading-8 italic md:text-[1.3125rem]"
                                : "text-[1rem] leading-7",
                        )}
                    >
                        {article.subtitle}
                    </p>
                </header>

                {article.cover && (
                    <figure className="mb-12 max-w-[52rem]">
                        <div className="border-line overflow-hidden rounded-[6px] border">
                            <Image
                                src={article.cover.data.src}
                                alt={`Cover image for ${article.title}`}
                                width={article.cover.data.width}
                                height={article.cover.data.height}
                                priority
                                sizes="(min-width: 1120px) 832px, 100vw"
                                className="aspect-video h-auto w-full object-cover"
                            />
                        </div>
                        {article.cover.kind === "ai-generated" && (
                            <figcaption className="mt-3">
                                <AiImageDescription
                                    prompt={article.cover.prompt}
                                />
                            </figcaption>
                        )}
                    </figure>
                )}

                <div className="prose">
                    <Content />
                </div>

                <footer className="border-line text-muted mt-16 flex max-w-[42rem] items-center justify-between border-t pt-6 text-[0.875rem]">
                    <Link
                        href="/articles"
                        className="hover:text-accent transition-colors duration-150"
                    >
                        <span aria-hidden>../</span>writing
                    </Link>
                    <a
                        href="#content"
                        className="hover:text-accent transition-colors duration-150"
                    >
                        Back to top
                    </a>
                </footer>
            </div>
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
