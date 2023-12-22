import Image from "next/image";
import Link from "next/link";
import desktopDimmed from "../../public/images/desktop-dimmed.webp";

export default function Index() {
  return (
    <>
      {/* Background Image */}
      <div
        className="absolute left-1/2 top-1/2 -z-10 h-screen w-screen max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        style={{
          background: "linear-gradient(80deg, #242424 50%, #272727 50%)",
        }}
      >
        <div className="absolute right-7 top-32 w-1/2 xl:top-60">
          <Image
            className="relative w-full animate-fade-in object-cover object-top"
            src={desktopDimmed}
            alt="Desktop"
            width={500}
            priority={true}
          />
          <div
            className="absolute bottom-0 left-0 right-0 top-0"
            style={{
              background:
                "linear-gradient(to top, #272727 10%, transparent 30%)",
            }}
          ></div>
        </div>
        <div
          className="absolute h-full w-full"
          style={{
            background: "linear-gradient(80deg, #242424 50%, transparent 50%)",
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <div className="absolute left-1/2 top-1/2 w-screen max-w-6xl -translate-x-1/2 -translate-y-1/2">
        <div className="relative ml-7 max-w-80">
          <div className="origin-top scale-y-0 animate-[scale-y_200ms_ease-out_normal_forwards] border-l-2 border-[#4169E1] pl-5">
            <h1 className="animate-[fade_200ms_200ms_ease-out_normal_forwards] text-[2.375rem]/[normal] font-bold opacity-0">
              Hi, my name is Luca Palmisano
            </h1>
            <p className="mt-1 animate-[fade_200ms_300ms_ease-out_normal_forwards] text-2xl font-normal opacity-0">
              {"I'm a fullstack developper"}
            </p>
          </div>
          <div className="relative mt-5 flex flex-row justify-start gap-5 pl-5">
            <Link
              href="/about"
              className="animate-[fade_200ms_500ms_ease-out_normal_forwards] rounded-md border-2 border-[#4169E1] bg-[#4169E1] px-3 py-2 text-base font-semibold text-white opacity-0 hover:cursor-pointer hover:text-opacity-80"
            >
              Learn more
            </Link>
            <Link
              href="/projects"
              className="animate-[fade_200ms_600ms_ease-out_normal_forwards] rounded-md border-2 border-[#4169E1] px-3 py-2 text-base font-semibold text-white opacity-0 hover:cursor-pointer hover:text-opacity-80"
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
