import Image from "next/image";
import * as technologies from "@/lib/technologies.json";
import { Technologies } from "@/lib/types";

type Props = {
    name: keyof Technologies,
    size?: "normal" | "small"
};

export default function TechStack({ name, size }: Props) {
    const { label, image, alt } = technologies[name];
    if (size === undefined) size = "normal";

    return (
        <div className="flex flex-row justify-center items-center gap-2 px-2 py-2 drop-shadow rounded-3xl" style={{ background: "#1d1d1d" }}>
            <Image 
                src={image}
                alt={alt}
                width={size === "normal" ? 32 : 28}
                height={size === "normal" ? 32 : 28}
                className={`${size === "normal" ? "w-8 h-8" : "w-7 h-7"} object-cover rounded-full`}
            />
            <span className={`${size === "normal" ? "text-base" : "text-sm"} text-white`}>{label}</span>
        </div>
    )
}