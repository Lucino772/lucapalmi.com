import Logo from "../components/Logo";
import NavBar from "../components/NavBar";
import Welcome from "../components/Welcome";

export default function Index() {
    return (
        <>
            <NavBar hideLogo />
            <Logo />
            <Welcome />
        </>
    )
}