import Image from "next/image";
import Link from "next/link";
import desktopDimmed from "../../public/images/desktop-dimmed.webp";

export default function Index() {
    return (
        <>
            {/* Background Image */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-screen w-screen max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                <div className="absolute h-full w-full md:top-32 md:right-7 md:h-auto md:w-1/2 xl:top-60">
                    <Image
                        className="relative h-full w-full animate-[fade_800ms_ease-out_normal_forwards] object-cover object-top md:h-auto"
                        src={desktopDimmed}
                        alt="Desktop"
                        width={500}
                        priority={true}
                    />
                    <div className="bg-opacity-60 from-secondary absolute top-0 right-0 bottom-0 left-0 bg-linear-to-t from-10% to-transparent to-50% md:bg-transparent"></div>
                </div>
                <div className="from-primary absolute hidden h-full w-full bg-linear-80 from-50% to-transparent to-50% md:block"></div>
            </div>

            {/* Hero Section */}
            <div className="absolute top-1/2 left-1/2 w-screen max-w-6xl -translate-x-1/2 -translate-y-1/2">
                <div className="relative ml-7 max-w-96">
                    <div className="border-accent-blue origin-top animate-[scale-y_200ms_ease-out_normal_forwards] border-l-2 pl-5">
                        <h1 className="font-headings animate-[fade_200ms_200ms_ease-out_normal_forwards] text-[2.375rem]/[normal] font-bold opacity-0">
                            Hi, my name is Luca Palmisano
                        </h1>
                        <p className="font-content mt-1 animate-[fade_200ms_300ms_ease-out_normal_forwards] text-2xl font-normal text-white/75 opacity-0">
                            {"I'm a fullstack developer"}
                        </p>
                    </div>
                    <div className="font-content relative mt-5 flex flex-row justify-start gap-5 pl-5">
                        <Link
                            href="/about"
                            className="border-accent-blue bg-accent-blue hover:text-opacity-80 animate-[fade_200ms_500ms_ease-out_normal_forwards] rounded-md border-2 px-3 py-2 text-base font-semibold text-white opacity-0 transition-colors hover:cursor-pointer"
                        >
                            Learn more
                        </Link>
                        <Link
                            href="/projects"
                            className="border-accent-blue hover:text-opacity-80 animate-[fade_200ms_600ms_ease-out_normal_forwards] rounded-md border-2 px-3 py-2 text-base font-semibold text-white opacity-0 transition-colors hover:cursor-pointer"
                        >
                            Projects
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
