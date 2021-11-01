import Logo from "../components/Logo";
import NavBar from "../components/NavBar";
import Welcome from "../components/Welcome";
import SiteInConstruction from "../components/SiteInConstruction";

export default function Index() {
    return (
        <>
            <SiteInConstruction />
            <NavBar />
            <div className="absolute w-full left-0 right-0 top-[50%] -translate-y-1/2 flex justify-evenly items-center overflow-hidden">
                <Logo />
                <Welcome />
            </div>
        </>
    )
}