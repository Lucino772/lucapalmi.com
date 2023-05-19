import Image from "next/image";

type Props = {
    icon: string,
    label: string
};

export default function TechStack({ icon, label }: Props) {
    return (
        <div className="flex flex-row justify-center items-center gap-2 px-2 py-2 drop-shadow rounded-3xl" style={{ background: "#1d1d1d" }}>
            <Image 
                src={icon}
                alt="tech-stack-icon"
                width={32}
                height={32}
                className="w-8 h-8 object-cover rounded-full"
            />
            <span className="text-white">{label}</span>
        </div>
    )
}