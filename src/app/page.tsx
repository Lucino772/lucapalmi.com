import Link from "next/link";
import { about } from "@/content/about";
import { projects } from "@/lib/projects";
import { getWritingLog } from "@/lib/writing";
import Portrait from "@/components/Portrait";
import Section from "@/components/Section";
import WritingLog from "@/components/WritingLog";
import ProjectRows from "@/components/ProjectRows";

export default async function Index() {
    const log = await getWritingLog();

    return (
        <div data-home className="max-w-page mx-auto w-full px-5 md:px-6">
            {/* whoami. In the "fit" layout this section is the whole page:
                one screen, then an ls of the two places to go next */}
            <section
                aria-label="About"
                className="fit:min-h-[calc(100svh-3.5rem-1px)] fit:content-center fit:gap-y-5 fit:py-5 md:fit:py-8 lg:fit:grid-cols-[minmax(0,1fr)_auto] grid items-center gap-x-12 gap-y-10 pt-10 pb-14 md:pt-16 md:pb-20 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_26rem]"
            >
                <div className="fade-in max-w-[44rem]">
                    <p className="text-faint text-[0.9375rem]">
                        <span aria-hidden>~ $ </span>whoami
                    </p>
                    <h1 className="mt-3 text-[0.9375rem]">
                        <span className="font-semibold">{about.name}</span>
                        <span className="text-muted">, {about.role}</span>
                    </h1>
                    <p className="fit:mt-3 fit:text-[1.5rem] md:fit:text-[clamp(1.75rem,4.6svh,var(--home-headline-size,40px))] mt-4 text-[1.75rem] leading-[1.2] font-medium tracking-[-0.02em] text-balance md:text-[length:var(--home-headline-size,40px)] md:leading-[1.15]">
                        {about.headline}
                    </p>

                    <p className="text-muted fit:block md:fit:mt-6 mt-5 hidden text-[0.9375rem] leading-7">
                        <span className="text-faint">focus </span>
                        {about.focus.join(" / ")}
                    </p>

                    <nav
                        aria-label="Explore"
                        className="fit:block md:fit:mt-9 mt-6 hidden"
                    >
                        <p aria-hidden className="text-faint text-[0.9375rem]">
                            ~ $ ls
                        </p>
                        <ul className="border-line mt-2 border-t">
                            <FitEntry
                                href="/articles"
                                name="writing/"
                                count={`${log.length} ${log.length === 1 ? "entry" : "entries"}`}
                                detail={
                                    log[0] && (
                                        <>
                                            <span className="text-faint">
                                                latest{" "}
                                            </span>
                                            {log[0].title}
                                        </>
                                    )
                                }
                            />
                            <FitEntry
                                href="/projects"
                                name="projects/"
                                count={`${projects.featured.length + projects.others.length} projects`}
                                detail={projects.featured
                                    .map((p) => p.title)
                                    .join(", ")}
                            />
                        </ul>
                    </nav>

                    <dl className="fit:hidden mt-9 grid grid-cols-1 gap-x-[2ch] text-[0.9375rem] leading-7 sm:grid-cols-[10ch_minmax(0,1fr)] sm:gap-y-5">
                        <dt className="text-faint">focus</dt>
                        <dd className="mb-4 sm:mb-0">
                            <ul className="text-fg/90">
                                {about.focus.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </dd>
                        <dt className="text-faint">I tend to</dt>
                        <dd className="mb-4 sm:mb-0">
                            <ul className="text-fg/90">
                                {about.tendencies.map((item) => (
                                    <li key={item} className="flex gap-[1ch]">
                                        <span
                                            aria-hidden
                                            className="text-faint"
                                        >
                                            -
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </dd>
                        <dt className="text-faint">elsewhere</dt>
                        <dd className="flex gap-[2ch]">
                            <a
                                href={about.links.github}
                                target="_blank"
                                rel="noreferrer"
                                className="text-accent-text underline decoration-current/40 underline-offset-4 hover:decoration-current"
                            >
                                GitHub
                            </a>
                            <a
                                href={about.links.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="text-accent-text underline decoration-current/40 underline-offset-4 hover:decoration-current"
                            >
                                LinkedIn
                            </a>
                        </dd>
                    </dl>
                </div>

                <div className="text-muted fit:w-auto fit:max-w-none max-lg:fit:order-first max-lg:fit:mx-0 mx-auto w-full max-w-[17rem] sm:max-w-[20rem] lg:max-w-none">
                    <Portrait className="fit:h-[calc(18svh*var(--home-drawing-size,100)/100)] fit:w-auto lg:fit:h-[calc(min(64svh,40rem)*var(--home-drawing-size,100)/100)] mx-auto block h-auto w-[calc(var(--home-drawing-size,100)*1%)] [mask-image:linear-gradient(to_bottom,black_82%,transparent)]" />
                </div>
            </section>

            <div className="border-line fit:hidden flex flex-col gap-16 border-t pt-12 pb-20 md:gap-20 md:pt-16 md:pb-28">
                <Section
                    id="writing"
                    path="~/writing"
                    title="Latest writing"
                    link={{ href: "/articles", label: "All writing" }}
                >
                    <WritingLog entries={log.slice(0, 6)} />
                </Section>

                <Section
                    id="projects"
                    path="~/projects"
                    title="Selected projects"
                    link={{ href: "/projects", label: "All projects" }}
                >
                    <ProjectRows projects={projects.featured} />
                </Section>

                <Section id="hobbies" path="~/.hobbies" title="Hobbies">
                    <p className="text-muted max-w-[60ch] text-[0.9375rem] leading-7">
                        {about.hobbies.intro}
                    </p>
                    <ul className="text-faint mt-4 grid gap-x-[2ch] gap-y-1 text-[0.875rem] leading-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            ...about.hobbies.technical,
                            ...about.hobbies.personal,
                        ].map((hobby) => (
                            <li key={hobby}>{hobby}</li>
                        ))}
                    </ul>
                </Section>
            </div>
        </div>
    );
}

function FitEntry({
    href,
    name,
    count,
    detail,
}: {
    href: string;
    name: string;
    count: string;
    detail: React.ReactNode;
}) {
    return (
        <li className="border-line border-b">
            <Link
                href={href}
                className="group hover:bg-raised hover:before:bg-accent relative -mx-3 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-0.5 px-3 py-3 transition-colors duration-150 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-transparent before:transition-colors before:duration-150 before:content-[''] sm:grid-cols-[8.5rem_minmax(0,1fr)_auto] md:py-4"
            >
                <span className="group-hover:text-accent-text text-[1.25rem] leading-7 font-semibold transition-colors duration-150 md:text-[1.375rem]">
                    {name}
                </span>
                <span className="text-faint text-right text-[0.8125rem] tabular-nums sm:order-last">
                    {count}
                </span>
                <span className="text-muted col-span-2 truncate text-[0.875rem] sm:col-span-1">
                    {detail}
                </span>
            </Link>
        </li>
    );
}
