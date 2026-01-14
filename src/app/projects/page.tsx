import Link from "next/link";
import projects from "@/content/projects.json";

export default async function Projects() {
    return (
        <div className="relative mx-auto my-0 flex max-w-4xl flex-col gap-4 px-5">
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                {projects.featured.map((project, i) => (
                    <div
                        className="flex animate-[fade_300ms_ease-in-out_normal_forwards] opacity-0"
                        style={{
                            animationDelay: `${(0.1 + 0.2 * i) * 1000}ms`,
                        }}
                        key={i}
                    >
                        <div className="bg-primary relative flex w-full flex-col rounded-sm border-2 border-[#292936] p-5 shadow-md transition-all hover:scale-101 hover:border-[#4169E1]">
                            <div className="relative flex items-center gap-2">
                                <div className="bg-accent-blue/25 flex size-10 items-center justify-center rounded-sm p-2">
                                    {project.type === "tool" && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-full"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 19h8" />
                                            <path d="m4 17 6-6-6-6" />
                                        </svg>
                                    )}
                                    {project.type === "package" && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="size-full"
                                        >
                                            <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
                                            <path d="M12 22V12" />
                                            <polyline points="3.29 7 12 12 20.71 7" />
                                            <path d="m7.5 4.27 9 5.15" />
                                        </svg>
                                    )}
                                    {project.type === "website" && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="size-full"
                                        >
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                            <path d="M2 12h20" />
                                        </svg>
                                    )}
                                </div>
                                <h2 className="font-headings px-0 py-2 text-lg font-semibold text-white md:text-xl">
                                    {project.title}
                                </h2>
                            </div>
                            <div className="relative mt-5 flex flex-row items-center gap-2">
                                {project.tags.slice(0, 3).map((item) => (
                                    <div
                                        key={item}
                                        className="font-content rounded-lg bg-[#4169E1] px-1.5 py-0.5 text-xs shadow md:text-sm"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <div className="relative mt-5 flex h-full flex-col justify-between gap-2">
                                <p className="font-content text-xs text-white/85 md:text-base">
                                    {project.description}
                                </p>
                            </div>
                            <div className="mt-5 flex flex-row items-center justify-between">
                                <Link
                                    href={`/articles/${project.article}`}
                                    className="group bg-secondary flex flex-row items-center gap-2 border-2 border-[#292936] px-2 py-1 text-xs text-white/80 shadow transition-all hover:text-white md:text-base"
                                >
                                    Read case study
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="size-3 transition-transform group-hover:scale-115 md:size-4"
                                    >
                                        <path d="M13 5H19V11" />
                                        <path d="M19 5L5 19" />
                                    </svg>
                                </Link>
                                <div className="flex flex-row items-center gap-2">
                                    {project.links.website !== undefined && (
                                        <a
                                            className="flex items-center justify-center fill-neutral-300 font-normal text-neutral-300 no-underline transition-colors hover:fill-white hover:text-white"
                                            href={project.links.website}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="mr-1 size-5"
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                />
                                                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                                <path d="M2 12h20" />
                                            </svg>
                                        </a>
                                    )}

                                    <a
                                        className="flex items-center justify-center fill-neutral-300 font-normal text-neutral-300 no-underline transition-colors hover:fill-white hover:text-white"
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <svg
                                            role="img"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mr-1 size-5"
                                        >
                                            <title>GitHub</title>
                                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.others.map((project, i) => (
                    <a
                        href={project.url}
                        className="flex animate-[fade_300ms_ease-in-out_normal_forwards] text-sm opacity-0 md:text-base"
                        style={{
                            animationDelay: `${(0.1 + 0.2 * i) * 1000}ms`,
                        }}
                        target="_blank"
                        rel="noreferrer"
                        key={i}
                    >
                        <div className="bg-primary relative flex w-full flex-row items-center gap-2 rounded-sm border-2 border-[#292936] p-3 shadow-md transition-all hover:scale-101 hover:border-[#4169E1]">
                            {project.url.startsWith("https://github.com") && (
                                <svg
                                    role="img"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-5 fill-white"
                                >
                                    <title>GitHub</title>
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                </svg>
                            )}
                            <span className="font-content flex-1">
                                {project.title}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="size-5 stroke-white"
                            >
                                <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                                <path d="m21 3-9 9" />
                                <path d="M15 3h6v6" />
                            </svg>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
