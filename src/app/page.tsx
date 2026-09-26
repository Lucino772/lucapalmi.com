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
        <div className="max-w-page mx-auto w-full px-5 md:px-6">
            {/* whoami */}
            <section
                aria-label="About"
                className="grid items-center gap-x-12 gap-y-10 pt-10 pb-14 md:pt-16 md:pb-20 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_26rem]"
            >
                <div className="fade-in max-w-[44rem]">
                    <p className="text-faint text-[0.9375rem]">
                        <span aria-hidden>~ $ </span>whoami
                    </p>
                    <h1 className="mt-3 text-[0.9375rem]">
                        <span className="font-semibold">{about.name}</span>
                        <span className="text-muted">, {about.role}</span>
                    </h1>
                    <p className="mt-4 text-[1.75rem] leading-[1.2] font-medium tracking-[-0.02em] text-balance md:text-[2.5rem] md:leading-[1.15]">
                        {about.headline}
                    </p>

                    <dl className="mt-9 grid grid-cols-1 gap-x-[2ch] text-[0.9375rem] leading-7 sm:grid-cols-[10ch_minmax(0,1fr)] sm:gap-y-5">
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
                                className="text-accent underline decoration-current/40 underline-offset-4 hover:decoration-current"
                            >
                                GitHub
                            </a>
                            <a
                                href={about.links.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="text-accent underline decoration-current/40 underline-offset-4 hover:decoration-current"
                            >
                                LinkedIn
                            </a>
                        </dd>
                    </dl>
                </div>

                <div className="text-muted mx-auto w-full max-w-[17rem] sm:max-w-[20rem] lg:max-w-none">
                    <Portrait className="h-auto w-full [mask-image:linear-gradient(to_bottom,black_82%,transparent)]" />
                </div>
            </section>

            <div className="border-line flex flex-col gap-16 border-t pt-12 pb-20 md:gap-20 md:pt-16 md:pb-28">
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
