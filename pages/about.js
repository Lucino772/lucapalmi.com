import Logo from "../components/Logo";
import NavBar from "../components/NavBar";
import AboutText from "../components/AboutText";
import SiteInConstruction from "../components/SiteInConstruction";


export default function About() {
    return (
        <>
            <SiteInConstruction />
            <NavBar hideLogo />
            <div className="absolute w-full left-0 right-0 top-[50%] -translate-y-1/2 flex justify-evenly items-center overflow-hidden">
                <Logo />
                <AboutText />
            </div>
        </>
    )
}