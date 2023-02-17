"use client"

import Logo from "../../components/Logo";
import NavBar from "../../components/NavBar";
import AboutText from "../../components/AboutText";

export default function About() {
    return (
        <>
            <NavBar showLogo={false} exitDelay={0} />
            <div className="absolute w-full left-0 right-0 top-[50%] -translate-y-1/2 flex justify-evenly items-center overflow-hidden">
                <Logo width={312} height={312} />
                <AboutText />
            </div>
        </>
    )
}