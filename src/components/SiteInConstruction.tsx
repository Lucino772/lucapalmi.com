import { motion } from "framer-motion";

export default function SiteInConstruction() {
  const variants = {
    initial: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0, transition: { delay: 0 } },
    exit: { opacity: 0, transition: { delay: 0 } },
  };

  return (
    <div className="fixed z-50 bottom-0 left-0 right-0 p-2 flex items-center justify-start md:justify-end">
      <motion.div
        className="py-5 flex justify-center items-center w-full md:px-12 md:w-auto text-xl font-bold bg-black bg-opacity-70 text-white rounded-lg"
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
