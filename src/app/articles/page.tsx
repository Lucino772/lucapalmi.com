import Link from "next/link";
import Image from "next/image";
import { getArticles } from "@/lib/cms";
import { CalendarIcon, ClockIcon } from "lucide-react";

export default async function Articles() {
    const articles = await getArticles();

    return (
        <div className="relative mx-auto my-0 grid max-w-4xl grid-cols-1 gap-4 px-5 md:grid-cols-2">
            {articles.map((article, i) => (
                <Link
                    href={`/articles/${article.slug}`}
                    className="flex animate-[fade_300ms_ease-in-out_normal_forwards] opacity-0"
                    style={{ animationDelay: `${(0.1 + 0.2 * i) * 1000}ms` }}
                    key={i}
                >
                    <div className="bg-primary relative flex aspect-video w-full flex-col justify-between overflow-hidden rounded-sm border-2 border-[#292936] shadow-md transition-all hover:scale-[1.01] hover:border-[#4169E1]">
                        <div className="absolute inset-px aspect-video rounded-sm">
                            <Image
                                src={article.metadata.cover.data.src}
                                alt="article-cover"
                                width={article.metadata.cover.data.width}
                                height={article.metadata.cover.data.height}
                                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[101%]"
                            />
                        </div>

                        <div className="from-primary relative flex flex-row items-center justify-between bg-linear-to-b to-transparent p-2">
                            <div className="flex flex-row items-center gap-2">
                                <CalendarIcon className="size-4" />
                                <span>
                                    {article.metadata.createdAt.toLocaleDateString(
                                        undefined,
                                        {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        },
                                    )}
                                </span>
                            </div>
                            {article.metadata.readingTime !== undefined && (
                                <div className="flex flex-row items-center gap-2">
                                    <ClockIcon className="size-4" />
                                    <span>
                                        {(
                                            article.metadata.readingTime / 60
                                        ).toFixed(0)}{" "}
                                        min
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="gap- from-primary relative flex flex-col bg-linear-to-t to-transparent p-2">
                            <div className="mt-5 flex flex-row items-center gap-2">
                                {article.metadata.tags
                                    .slice(0, 3)
                                    .map((item) => (
                                        <div
                                            key={item}
                                            className="font-content rounded-lg bg-[#4169E1] px-1.5 py-0.5 text-xs shadow md:text-sm"
                                        >
                                            {item}
                                        </div>
                                    ))}
                            </div>
                            <h2 className="font-headings px-0 py-2 text-lg font-semibold text-white md:text-xl">
                                {article.metadata.title}
                            </h2>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
