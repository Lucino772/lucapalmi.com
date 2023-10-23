import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";
import AboutText from "@/components/AboutText";

export default function About() {
  return (
    <>
      <NavBar showLogo={false} exitDelay={0} />
      <div className="absolute left-0 right-0 top-[50%] flex w-full -translate-y-1/2 items-center justify-evenly overflow-hidden">
        <Logo width={312} height={312} />
        <AboutText />
      </div>
    </>
  );
}
