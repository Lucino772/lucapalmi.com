import Image from "next/image";
import * as technologies from "@/lib/technologies.json";
import { Technologies } from "@/lib/types";

type Props = {
    name: keyof Technologies,
};

export default function TechStack({ name }: Props) {
    const { label, image, alt } = technologies[name];

    return (
        <div className="flex flex-row justify-center items-center gap-2 px-2 py-2 drop-shadow rounded-3xl" style={{ background: "#1d1d1d" }}>
            <Image 
                src={image}
                alt={alt}
                width={32}
                height={32}
                className="w-8 h-8 object-cover rounded-full"
            />
            <span className="text-white">{label}</span>
        </div>
    )
}