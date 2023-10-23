"use client";

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
  props: Props = { showLogo: false, exitDelay: 0 },
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
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-7 py-4">
        <MotionNextImage
          className="visible relative h-[50px] w-[50px] rounded-full md:invisible"
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

        <nav className="relative hidden items-center justify-center md:flex">
          <Link
            className="relative mr-5 text-xl font-normal text-white no-underline after:absolute after:bottom-0 after:left-[5%] after:h-[2px] after:w-0 after:bg-white after:duration-200 after:content-[''] hover:after:w-3/4"
            href="/"
          >
            Home
          </Link>
          <Link
            className="relative mr-5 text-xl font-normal text-white no-underline after:absolute after:bottom-0 after:left-[5%] after:h-[2px] after:w-0 after:bg-white after:duration-200 after:content-[''] hover:after:w-3/4"
            href="/about"
          >
            About
          </Link>
          <Link
            className="relative mr-0 text-xl font-normal text-white no-underline after:absolute after:bottom-0 after:left-[5%] after:h-[2px] after:w-0 after:bg-white after:duration-200 after:content-[''] hover:after:w-3/4"
            href="/projects"
          >
            Projects
          </Link>
        </nav>

        <MenuIcon
          onClick={() => setMobileMenuOpen(true)}
          className="block hover:cursor-pointer md:hidden"
          color="white"
          width={32}
          height={32}
        />
      </div>
      <MobileNav open={mobileMenuOpen} close={() => setMobileMenuOpen(false)} />
    </>
  );
}
