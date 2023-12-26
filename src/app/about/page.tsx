import Logo from "@/components/Logo";
import AboutText from "@/components/AboutText";

export default function About() {
    return (
        <>
            <div className="absolute left-0 right-0 top-[50%] flex w-full -translate-y-1/2 items-center justify-evenly overflow-hidden">
                <Logo width={312} height={312} />
                <AboutText />
            </div>
        </>
    );
}
