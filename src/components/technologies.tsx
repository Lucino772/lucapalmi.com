"use client";

import Image from "next/image";

type Props = {
    technologies: {
        name: string;
        icon: {
            src: string;
            width: number;
            height: number;
        };
    }[];
};

export default function Technologies({ technologies }: Props) {
    return (
        <div className="flex flex-row flex-wrap gap-1 md:gap-5">
            {technologies.map((technology) => (
                <div
                    key={technology.name}
                    className="bg-primary flex flex-row items-center justify-center gap-2 rounded-sm border-2 border-[#292936] px-2 py-2 shadow-md transition-all hover:border-[#4169E1]"
                >
                    <Image
                        src={technology.icon.src}
                        alt={technology.name}
                        width={technology.icon.width}
                        height={technology.icon.height}
                        className="m-0! size-7 rounded-full object-cover md:size-8"
                    />
                    <span className="font-content text-sm text-white md:text-base">
                        {technology.name}
                    </span>
                </div>
            ))}
        </div>
    );
}
