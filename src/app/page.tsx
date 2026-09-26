import Link from "next/link";
import { about } from "@/content/about";
import { projects } from "@/lib/projects";
import { getWritingLog } from "@/lib/writing";
import Portrait from "@/components/Portrait";

// A short, lowercase take on about.hobbies for the dotfile row
const hobbyLine =
    "hardware · raspberry pi · lorawan · networking · game servers · lego · cooking · travel";

const quietLink =
    "hover:text-accent-text decoration-transparent underline underline-offset-4 transition-colors duration-150 hover:decoration-current";

// A timeless calling card. "fit" (default) is exactly one screen: whoami,
// headline, "I tend to", and an `ls -a` of writing/, projects/ and the
// .hobbies dotfile. "fit-first" keeps the same first screen and adds the
// hobbies in full below the fold.
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
                className="flex min-h-[calc(100svh-3.5rem-1px)] flex-col py-4 md:py-[clamp(1.5rem,4svh,3rem)]"
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
                        <p className="mt-2 text-[clamp(1.125rem,2.9svh,1.4rem)] leading-[1.2] font-medium tracking-[-0.02em] text-balance md:mt-3 md:text-[clamp(1.375rem,3.8svh,var(--home-headline-size,34px))] md:leading-[1.15]">
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
                                ~ $ ls -a
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
                                {/* Dotfile row: information only, not a link */}
                                <li className="border-line grid grid-cols-[minmax(0,1fr)] items-baseline gap-x-6 border-b py-2 sm:grid-cols-[8.5rem_minmax(0,1fr)] md:py-[min(0.75rem,1.3svh)]">
                                    <h2 className="text-faint text-[1rem] leading-7 md:text-[1.125rem]">
                                        .hobbies/
                                    </h2>
                                    <p className="text-muted text-[0.8125rem] leading-6 md:text-[0.875rem]">
                                        {hobbyLine}
                                    </p>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="text-muted order-first lg:order-none">
                        <Portrait className="block h-[calc(14svh*var(--home-drawing-size,100)/100)] w-auto [mask-image:linear-gradient(to_bottom,black_82%,transparent)] lg:mx-auto lg:h-[calc(min(62svh,40rem)*var(--home-drawing-size,100)/100)]" />
                    </div>
                </div>
            </section>

            {/* Fit-first: the same first screen, then the hobbies in full */}
            <section
                aria-label="Hobbies"
                className="fitfirst:block hidden pt-10 pb-16 md:pt-14 md:pb-24"
            >
                <div className="border-line mb-4 flex items-baseline gap-4 border-b pb-3">
                    <h2 className="text-[0.9375rem] font-semibold">
                        <span aria-hidden className="text-faint font-normal">
                            ~/
                        </span>
                        .hobbies
                    </h2>
                </div>
                <div className="grid gap-x-12 gap-y-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                    <p className="text-muted max-w-[46ch] text-[0.9375rem] leading-7">
                        {about.hobbies.intro}
                    </p>
                    <div className="grid grid-cols-2 gap-x-[2ch] text-[0.875rem] leading-6">
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
