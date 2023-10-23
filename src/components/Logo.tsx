"use client";

import { Variants } from "framer-motion";
import MotionNextImage from "./MotionNextImage";

type Props = {
  width: number;
  height: number;
};

export default function Logo(props: Props = { width: 312, height: 312 }) {
  const variants: Variants = {
    initial: { opacity: 0, x: "-100%", rotateZ: "0deg" },
    enter: {
      opacity: 1,
      x: 0,
      rotateZ: "-15deg",
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <MotionNextImage
      className="relative hidden rounded-full border md:block"
      src="/images/logo.webp"
      alt="Logo"
      width={props.width}
      height={props.height}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
    />
  );
}
