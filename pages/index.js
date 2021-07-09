import Logo from "../components/Logo";
import NavBar from "../components/NavBar";
import Welcome from "../components/Welcome";
import SiteInConstruction from "../components/SiteInConstruction";

export default function Index() {
    return (
        <>
            <SiteInConstruction />
            <NavBar hideLogo />
            <Logo />
            <Welcome />
        </>
    )
}