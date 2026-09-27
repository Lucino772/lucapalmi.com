import Link from "next/link";
import { about } from "@/content/about";
import { projects } from "@/lib/projects";
import { getWritingLog } from "@/lib/writing";
import Portrait from "@/components/Portrait";

const quietLink =
    "hover:text-accent-text decoration-transparent underline underline-offset-4 transition-colors duration-150 hover:decoration-current";

// A timeless calling card, exactly one screen: whoami, headline, "I tend to"
// and an `ls` of writing/ and projects/ beside the self-drawing portrait.

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
                className="relative flex min-h-[calc(100dvh-3.5rem-1px)] flex-col py-4 sm:min-h-[calc(100svh-3.5rem-1px)] md:py-[clamp(1.5rem,4svh,3rem)]"
            >
                {/* Phones: no drawing; the text is centred optically
                    between the nav and the bottom (see .home-grid) */}
                <div className="home-grid grid flex-1 content-center items-center gap-x-12 gap-y-2 lg:grid-cols-[minmax(0,31rem)_minmax(0,1fr)]">
                    <div className="fade-in relative z-10 min-w-0">
                        <p className="text-faint text-[0.875rem] md:text-[0.9375rem]">
                            <span aria-hidden>~ $ </span>whoami
                        </p>
                        <h1 className="mt-2 text-[0.875rem] md:mt-3 md:text-[0.9375rem]">
                            <span className="font-semibold">{about.name}</span>
                            <span className="text-muted">, {about.role}</span>
                        </h1>
                        <p className="mt-2 max-w-[29ch] text-[clamp(1.125rem,2.9svh,1.4rem)] leading-[1.2] font-medium tracking-[-0.02em] text-balance max-sm:text-[clamp(1.6875rem,4.35svh,2.1rem)] md:mt-3 md:text-[clamp(1.375rem,3.8svh,var(--home-headline-size,2.125rem))] md:leading-[1.15]">
                            {about.headline}
                        </p>
                        <div className="mt-3 text-[0.8125rem] leading-6 md:mt-[min(1.75rem,3svh)] md:text-[0.9375rem] md:leading-7">
                            <h2 className="text-faint">I tend to</h2>
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
                        </div>

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

                    {/* One scene: cropped at the desk, anchored right, its
                        desk line sliding under the text column where the mask
                        has already faded it out */}
                    <div className="home-drawing portrait-tone relative z-0 order-first justify-self-end lg:order-none lg:-ml-16 lg:flex lg:justify-end lg:justify-self-stretch">
                        <Portrait
                            cropHeight={1680}
                            className="portrait-fade block h-[calc(20svh*var(--home-drawing-size,100)/100)] w-auto lg:h-auto lg:w-[min(calc(min(62svh,42rem)*1.1905*var(--home-drawing-size,100)/100),100%)]"
                        />
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
        // Phones: no detail line, the whole row is the folder link
        <li className="border-line relative grid grid-cols-[minmax(0,1fr)] items-baseline gap-x-6 border-b py-2.5 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:py-2 md:py-[min(1rem,1.6svh)]">
            <Link
                href={href}
                className={`${quietLink} justify-self-start text-[1.125rem] leading-7 font-semibold max-sm:after:absolute max-sm:after:inset-0 max-sm:after:content-[''] md:text-[1.375rem]`}
            >
                {name}
            </Link>
            {detail && (
                <p className="hidden min-w-0 truncate text-[0.8125rem] sm:block md:text-[0.875rem]">
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
