import Link from "next/link";
import MenuIcon from "@/assets/svg/menu.svg";
import MobileNav from "./MobileNav";
import { useState } from "react";
import MotionNextImage from "./MotionNextImage";

type Props = {
  showLogo: boolean;
  exitDelay: number;
};

export default function NavBar(
  props: Props = { showLogo: false, exitDelay: 0 }
) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoVariants = {
    initial: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.3, delay: props.exitDelay },
    },
  };

  return (
    <>
      <div className="relative w-full max-w-6xl flex justify-between items-center py-4 px-7 mx-auto">
        <MotionNextImage
          className="relative w-[50px] h-[50px] rounded-full visible md:invisible"
          src="/images/logo.webp"
          alt="Logo"
          initial="initial"
          animate="enter"
          exit="exit"
          variants={logoVariants}
          width={50}
          height={50}
          style={props.showLogo ? { visibility: "visible" } : {}}
        />

        <nav className="relative justify-center items-center hidden md:flex">
          <Link
            className="relative text-xl text-white font-normal no-underline mr-5 after:content-[''] after:absolute after:left-[5%] after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:duration-200 hover:after:w-3/4"
            href="/"
          >
            Home
          </Link>
          <Link
            className="relative text-xl text-white font-normal no-underline mr-5 after:content-[''] after:absolute after:left-[5%] after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:duration-200 hover:after:w-3/4"
            href="/about"
          >
            About
          </Link>
          <Link
            className="relative text-xl text-white font-normal no-underline mr-0 after:content-[''] after:absolute after:left-[5%] after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:duration-200 hover:after:w-3/4"
            href="/projects"
          >
            Projects
          </Link>
        </nav>

        <MenuIcon
          onClick={() => setMobileMenuOpen(true)}
          className="block md:hidden hover:cursor-pointer"
          color="white"
          width={32}
          height={32}
        />
      </div>
      <MobileNav open={mobileMenuOpen} close={() => setMobileMenuOpen(false)} />
    </>
  );
}
