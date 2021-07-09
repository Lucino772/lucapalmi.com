import Logo from "../components/Logo";
import NavBar from "../components/NavBar";
import AboutText from "../components/AboutText";
import SiteInConstruction from "../components/SiteInConstruction";


export default function About() {
    return (
        <>
            <SiteInConstruction />
            <NavBar hideLogo />
            <Logo />
            <AboutText />
        </>
    )
}