import Image from "next/image";

type Props = {
    width: number;
    height: number;
};

export default function Logo(props: Props = { width: 312, height: 312 }) {
    return (
        <Image
            className="relative hidden animate-[logo-in_300ms_0ms_ease-in-out_normal_forwards] rounded-full border opacity-0 md:block"
            src="/images/logo.webp"
            alt="Logo"
            width={props.width}
            height={props.height}
        />
    );
}
