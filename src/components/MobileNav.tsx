"use client";

import Link from "next/link";
import { m as motion, Variants } from "framer-motion";
import CloseIcon from "@/assets/svg/close.svg";

type Props = {
  open: boolean;
  close?: () => void;
};

export default function MobileNav(props: Props = { open: false }) {
  const containerVariants: Variants = {
    initial: { opacity: 0, scale: 1, x: "100%" },
    enter: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.2 } },
    exit: {
      opacity: 0,
      scale: 1,
      x: "100%",
      transition: { duration: 0.2, delay: 0.1 },
    },
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex 
                     h-screen w-full flex-col items-center justify-center bg-white"
      variants={containerVariants}
      initial="initial"
      exit="exit"
      animate={props.open ? "enter" : "exit"}
    >
      <nav className="flex h-1/2 flex-col items-center justify-evenly gap-5">
        <Link className="text-2xl tracking-widest text-black" href="/">
          Home
        </Link>
        <Link className="text-2xl tracking-widest text-black" href="/about">
          About
        </Link>
        <Link className="text-2xl tracking-widest text-black" href="/projects">
          Projects
        </Link>
      </nav>

      <CloseIcon
        className="absolute right-4 top-4 block hover:cursor-pointer"
        color="black"
        width={32}
        height={32}
        onClick={() => (props.close !== undefined ? props.close() : null)}
      />
    </motion.div>
  );
}
