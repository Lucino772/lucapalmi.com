import Image from "next/image";
import Link from "next/link";
import desktopDimmed from "../../public/images/desktop-dimmed.webp";

export default function Index() {
    return (
        <>
            {/* Background Image */}
            <div className="absolute top-1/2 left-1/2 -z-10 hidden h-screen w-screen max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-hidden lg:block">
                <div className="absolute h-full w-full md:top-3/5 md:right-7 md:h-auto md:w-1/2 md:-translate-y-1/2">
                    <Image
                        className="relative h-full w-full animate-[fade_800ms_ease-out_normal_forwards] object-cover object-top md:h-auto"
                        src={desktopDimmed}
                        alt="Desktop"
                        width={500}
                        priority={true}
                    />
                    <div className="bg-opacity-60 from-secondary absolute top-0 right-0 bottom-0 left-0 bg-linear-to-t from-10% to-transparent to-50% md:bg-transparent"></div>
                    <div className="bg-opacity-60 from-secondary absolute top-0 right-0 bottom-0 left-0 bg-linear-to-r from-10% to-transparent to-50% md:bg-transparent"></div>
                </div>
                <div className="from-secondary absolute hidden h-full w-full bg-linear-80 from-50% to-transparent to-50% md:block"></div>
            </div>

            {/* Hero Section */}
            <div className="absolute top-1/2 left-1/2 w-screen max-w-6xl -translate-x-1/2 -translate-y-1/2 px-6">
                <div className="relative flex w-full flex-col gap-6 sm:gap-0 lg:max-w-130">
                    {/* Welcome */}
                    <div className="sm:bg-primary border-x-none relative flex animate-[fade_300ms_100ms_ease-out_normal_forwards] flex-row items-center gap-4 rounded-none border-[#4169E1]/20 bg-transparent p-0 opacity-0 transition-all first:rounded-t-sm last:rounded-b-sm sm:border-x-2 sm:border-t-0 sm:border-b-2 sm:p-5 sm:shadow-md sm:first:border-t-2">
                        {/* <Image
                            className="relative aspect-square size-13 animate-[fade_800ms_ease-out_normal_forwards] rounded-full border-2 border-[#292936] object-cover sm:size-18"
                            src={portrait}
                            alt="Portrait"
                            width={500}
                            priority={true}
                        /> */}
                        <div className="flex flex-col gap-1">
                            <p className="font-content text-xs font-normal text-white/75 sm:text-base">
                                👋 Hi there, I'm
                            </p>
                            <h1 className="font-headings text-base font-bold sm:text-3xl">
                                Luca Palmisano
                            </h1>
                        </div>
                    </div>

                    {/* About */}
                    <div className="sm:bg-primary border-x-none relative flex animate-[fade_300ms_200ms_ease-out_normal_forwards] flex-col gap-5 rounded-none border-[#4169E1]/20 bg-transparent p-0 opacity-0 transition-all first:rounded-t-sm last:rounded-b-sm sm:border-x-2 sm:border-t-0 sm:border-b-2 sm:p-5 sm:shadow-md sm:first:border-t-2">
                        {/* Mission */}
                        <div className="flex flex-col gap-2">
                            <h2 className="font-headings text-sm font-bold sm:text-base">
                                My Mission
                            </h2>
                            <p className="font-content text-sm text-white/75 sm:text-base">
                                I design and build software that empower
                                individuals and professionals to work smarter,
                                faster, and more efficiently.
                            </p>
                        </div>

                        {/* I Tend to */}
                        <div className="flex flex-col gap-2">
                            <h2 className="font-headings text-sm font-bold sm:text-base">
                                I tend to
                            </h2>
                            <ul className="font-content text-sm text-white/75 sm:text-base">
                                <li>
                                    - break complex problems down into simpler
                                    ones
                                </li>
                                <li>
                                    - think beyond the code when making
                                    decisions
                                </li>
                                <li>
                                    - rely on proven solutions when they do the
                                    job
                                </li>
                            </ul>
                        </div>

                        {/* Technologies */}
                        {/* <div className="flex flex-col gap-2">
                            <h2 className="font-headings text-sm font-bold sm:text-base">
                                Technologies I've used
                            </h2>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                <TechStack
                                    name="Vercel"
                                    slug="vercel"
                                    icon={vercel}
                                />
                                <TechStack
                                    name="Tailwind"
                                    slug="tailwind"
                                    icon={tailwind}
                                />
                                <TechStack
                                    name="Next.js"
                                    slug="next-js"
                                    icon={nextjs}
                                />
                                <TechStack
                                    name="Contentful"
                                    slug="contentful"
                                    icon={contentful}
                                />
                                <TechStack
                                    name="Python"
                                    slug="python"
                                    icon={python}
                                />
                            </div>
                        </div> */}
                    </div>

                    {/* What next ? */}
                    <div className="sm:bg-primary border-x-none relative flex animate-[fade_300ms_300ms_ease-out_normal_forwards] flex-col gap-2 rounded-none border-[#4169E1]/20 bg-transparent p-0 opacity-0 transition-all first:rounded-t-sm last:rounded-b-sm sm:border-x-2 sm:border-t-0 sm:border-b-2 sm:p-5 sm:shadow-md sm:first:border-t-2">
                        <h2 className="font-headings text-sm font-bold sm:text-base">
                            If you're curious
                        </h2>
                        <div className="font-content flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
                            <Link
                                href="/projects"
                                className="border-accent-blue bg-accent-blue animate-[fade_200ms_400ms_ease-out_normal_forwards] rounded-md border-2 px-3 py-2 text-xs font-semibold text-white/90 opacity-0 transition-colors hover:cursor-pointer hover:text-white sm:text-sm"
                            >
                                See what I've built 🛠️
                            </Link>
                            <Link
                                href="/articles"
                                className="border-accent-dark-blue hover:border-accent-blue animate-[fade_200ms_500ms_ease-out_normal_forwards] rounded-md border-2 px-3 py-2 text-xs font-semibold text-white/90 opacity-0 transition-colors hover:cursor-pointer hover:text-white sm:text-sm"
                            >
                                Read my thoughts 💡
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
