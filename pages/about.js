import Logo from "../components/Logo";
import NavBar from "../components/NavBar";
import AboutText from "../components/AboutText";

export default function About() {
    return (
        <>
            <NavBar hideLogo />
            <Logo />
            <AboutText />
        </>
    )
}