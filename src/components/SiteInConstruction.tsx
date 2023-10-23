"use client";

import { m as motion } from "framer-motion";

export default function SiteInConstruction() {
  const variants = {
    initial: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0, transition: { delay: 0 } },
    exit: { opacity: 0, transition: { delay: 0 } },
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-start p-2 md:justify-end">
      <motion.div
        className="flex w-full items-center justify-center rounded-lg bg-black bg-opacity-70 py-5 text-xl font-bold text-white md:w-auto md:px-12"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants}
      >
        This site is currently in construction
      </motion.div>
    </div>
  );
}
