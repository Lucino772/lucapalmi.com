import Link from "next/link";
import { about } from "@/content/about";
import { projects } from "@/lib/projects";
import { getWritingLog } from "@/lib/writing";
import Portrait from "@/components/Portrait";

const hobbies = [...about.hobbies.technical, ...about.hobbies.personal];

const quietLink =
    "hover:text-accent-text decoration-transparent underline underline-offset-4 transition-colors duration-150 hover:decoration-current";

// A timeless calling card. "fit" (default) is exactly one screen, with
// "I tend to" and the hobbies in a compact bottom panel, like an editor's
// terminal panel. "fit-first" keeps the same first screen and moves them to
// a comfortable section below the fold.
export default async function Index() {
    const log = await getWritingLog();
    const article =
        log.find((entry) => entry.slug === about.pinnedArticle) ?? log[0];
    const flagship = [...projects.featured, ...projects.others].find(
        (project) => project.title === about.flagshipProject,
    );
    const flagshipHref = flagship
        ? flagship.article
            ? `/articles/${flagship.article}`
            : "links" in flagship
              ? flagship.links.github
              : flagship.url
        : "/projects";

    return (
        <div data-home className="max-w-page mx-auto w-full px-5 md:px-6">
            <section
                aria-label="About"
                className="flex min-h-[calc(100svh-3.5rem-1px)] flex-col pt-4 pb-3 md:pt-8 md:pb-5"
            >
                <div className="grid flex-1 content-center items-center gap-x-12 gap-y-2 lg:grid-cols-[minmax(0,1fr)_auto]">
                    <div className="fade-in max-w-[46rem] min-w-0">
                        <p className="text-faint text-[0.875rem] md:text-[0.9375rem]">
                            <span aria-hidden>~ $ </span>whoami
                        </p>
                        <h1 className="mt-2 text-[0.875rem] md:mt-3 md:text-[0.9375rem]">
                            <span className="font-semibold">{about.name}</span>
                            <span className="text-muted">, {about.role}</span>
                        </h1>
                        <p className="mt-2 text-[clamp(1.25rem,3.3svh,1.625rem)] leading-[1.2] font-medium tracking-[-0.02em] text-balance md:mt-3 md:text-[clamp(1.5rem,4.4svh,var(--home-headline-size,40px))] md:leading-[1.15]">
                            {about.headline}
                        </p>
                        <p className="text-muted mt-3 text-[0.8125rem] leading-6 md:mt-5 md:text-[0.9375rem] md:leading-7">
                            <span className="text-faint">focus </span>
                            {about.focus.join(" / ")}
                        </p>

                        <nav
                            aria-label="Explore"
                            className="mt-4 md:mt-[min(2.25rem,4svh)]"
                        >
                            <p
                                aria-hidden
                                className="text-faint text-[0.875rem] md:text-[0.9375rem]"
                            >
                                ~ $ ls
                            </p>
                            <ul className="border-line mt-1.5 border-t">
                                <Entry
                                    href="/articles"
                                    name="writing/"
                                    label={
                                        article?.slug === about.pinnedArticle
                                            ? "pinned"
                                            : "latest"
                                    }
                                    detail={
                                        article && {
                                            href: `/articles/${article.slug}`,
                                            text: article.title,
                                        }
                                    }
                                />
                                <Entry
                                    href="/projects"
                                    name="projects/"
                                    label="flagship"
                                    detail={
                                        flagship && {
                                            href: flagshipHref,
                                            text: flagship.title,
                                            external:
                                                !flagshipHref.startsWith("/"),
                                        }
                                    }
                                />
                            </ul>
                        </nav>
                    </div>

                    <div className="text-muted order-first lg:order-none">
                        <Portrait className="block h-[calc(10svh*var(--home-drawing-size,100)/100)] w-auto [mask-image:linear-gradient(to_bottom,black_82%,transparent)] lg:mx-auto lg:h-[calc(min(62svh,40rem)*var(--home-drawing-size,100)/100)]" />
                    </div>
                </div>

                {/* Fit: the personality, compressed into a bottom panel */}
                <aside
                    aria-label="Personality"
                    className="fitfirst:hidden border-line mt-3 grid gap-x-10 gap-y-2 border-t pt-2.5 text-[0.75rem] leading-[1.35rem] md:mt-6 md:grid-cols-2 md:pt-4 md:text-[0.8125rem] md:leading-6"
                >
                    <div>
                        <h2 className="text-faint">I tend to</h2>
                        <ul className="text-muted">
                            {about.tendencies.map((item) => (
                                <li key={item} className="flex gap-[1ch]">
                                    <span aria-hidden className="text-faint">
                                        -
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-faint">~/.hobbies</h2>
                        <p className="text-muted">{hobbies.join(" / ")}</p>
                    </div>
                </aside>
            </section>

            {/* Fit-first: the same personality, laid out comfortably */}
            <section
                aria-label="Personality"
                className="fitfirst:grid hidden gap-x-12 gap-y-10 pt-10 pb-16 md:grid-cols-2 md:pt-14 md:pb-24"
            >
                <div>
                    <div className="border-line mb-4 flex items-baseline gap-4 border-b pb-3">
                        <h2 className="text-[0.9375rem] font-semibold">
                            I tend to
                        </h2>
                    </div>
                    <ul className="text-fg/90 flex flex-col gap-1.5 text-[0.9375rem] leading-7">
                        {about.tendencies.map((item) => (
                            <li key={item} className="flex gap-[1ch]">
                                <span aria-hidden className="text-faint">
                                    -
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className="border-line mb-4 flex items-baseline gap-4 border-b pb-3">
                        <h2 className="text-[0.9375rem] font-semibold">
                            <span
                                aria-hidden
                                className="text-faint font-normal"
                            >
                                ~/
                            </span>
                            .hobbies
                        </h2>
                    </div>
                    <p className="text-muted text-[0.9375rem] leading-7">
                        {about.hobbies.intro}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-x-[2ch] text-[0.875rem] leading-6">
                        <ul className="text-fg/90">
                            {about.hobbies.technical.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                        <ul className="text-fg/90">
                            {about.hobbies.personal.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}

// One ls row: the folder is the main link, then one pointer inside it
function Entry({
    href,
    name,
    label,
    detail,
}: {
    href: string;
    name: string;
    label: string;
    detail?: { href: string; text: string; external?: boolean } | false;
}) {
    return (
        <li className="border-line grid grid-cols-[minmax(0,1fr)] items-baseline gap-x-6 border-b py-2 sm:grid-cols-[8.5rem_minmax(0,1fr)] md:py-[min(1rem,1.6svh)]">
            <Link
                href={href}
                className={`${quietLink} justify-self-start text-[1.125rem] leading-7 font-semibold md:text-[1.375rem]`}
            >
                {name}
            </Link>
            {detail && (
                <p className="min-w-0 truncate text-[0.8125rem] md:text-[0.875rem]">
                    <span className="text-faint">{label} </span>
                    {detail.external ? (
                        <a
                            href={detail.href}
                            target="_blank"
                            rel="noreferrer"
                            className={`text-fg/90 ${quietLink}`}
                        >
                            {detail.text}
                        </a>
                    ) : (
                        <Link
                            href={detail.href}
                            className={`text-fg/90 ${quietLink}`}
                        >
                            {detail.text}
                        </Link>
                    )}
                </p>
            )}
        </li>
    );
}
