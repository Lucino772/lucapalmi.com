"use client";

import Image from "next/image";

type Props = {
    name: string;
    slug: string;
    icon?: {
        src: string;
        width: number;
        height: number;
    };
};

export default function TechStack({ name, slug, icon }: Props) {
    return (
        <div className="bg-primary flex flex-row items-center justify-center gap-2 rounded-sm border-2 border-[#292936] px-2 py-2 shadow-md transition-all hover:border-[#4169E1]">
            {icon !== undefined && (
                <Image
                    src={icon.src}
                    alt={slug}
                    width={icon.width}
                    height={icon.height}
                    className="size-7 rounded-full object-cover md:size-8"
                />
            )}
            {icon === undefined && (
                <div className="flex size-7 items-center justify-center rounded-full bg-white text-xs md:size-8">
                    Error
                </div>
            )}
            <span className="font-content text-sm text-white md:text-base">
                {name}
            </span>
        </div>
    );
}
