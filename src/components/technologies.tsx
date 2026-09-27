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
        <ul
            className="not-prose my-8 flex flex-wrap gap-2"
            aria-label="Technologies"
        >
            {technologies.map((technology) => (
                <li
                    key={technology.name}
                    className="border-line bg-raised flex items-center gap-2 rounded-[4px] border py-1.5 pr-3 pl-1.5 font-mono text-[0.875rem]"
                >
                    <Image
                        src={technology.icon.src}
                        alt=""
                        width={technology.icon.width}
                        height={technology.icon.height}
                        className="size-5 rounded-[3px] object-cover"
                    />
                    {technology.name}
                </li>
            ))}
        </ul>
    );
}
