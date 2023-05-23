import { m as motion, Variants } from "framer-motion";

import GithubIcon from "@/assets/svg/github.svg";
import StackoverflowIcon from "@/assets/svg/stackoverflow.svg";
import InstagramIcon from "@/assets/svg/instagram.svg";

export default function Welcome() {
  const titleVariants: Variants = {
    initial: { opacity: 0, x: -10 },
    enter: ({ delay }) => ({ opacity: 1, x: 0, transition: { delay: delay } }),
    exit: ({ delay }) => ({ opacity: 0, transition: { delay: delay } }),
  };

  const linkVariants: Variants = {
    containerExit: { opacity: 0, transition: { delay: 0.7 } },

    linkInit: { opacity: 0, y: 10 },
    linkEnter: ({ delay }) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, delay: delay },
    }),
    linkExit: ({ delay }) => ({
      opacity: 0,
      y: 10,
      transition: { duration: 0.2, delay: delay },
    }),
  };

  return (
    <div className="relative">
      <motion.p
        className="text-5xl font-semibold text-white mb-5"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={titleVariants}
        custom={{ delay: 0 }}
      >
        Welcome, I&lsquo;m
      </motion.p>
      <motion.h1
        className="text-5xl font-semibold text-white mb-5 md:pl-8"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={titleVariants}
        custom={{ delay: 0.2 }}
      >
        Luca Palmisano
      </motion.h1>
      <motion.div
        className="relative flex justify-center items-center pt-6 before:content-[''] before:absolute before:w-3/4 before:h-[1px] before:top-0 before:bg-white"
        exit="containerExit"
        variants={linkVariants}
      >
        <motion.a
          target="_blank"
          className="relative inline-block mr-8"
          initial="linkInit"
          animate="linkEnter"
          exit="linkExit"
          custom={{ delay: 0.3 }}
          variants={linkVariants}
          href="https://stackoverflow.com/users/13569159/lucino772"
          title="stackoverflow"
        >
          <StackoverflowIcon color="white" width={32} height={32} />
        </motion.a>
        <motion.a
          target="_blank"
          className="relative inline-block mr-8"
          initial="linkInit"
          animate="linkEnter"
          exit="linkExit"
          custom={{ delay: 0.4 }}
          variants={linkVariants}
          href="https://github.com/Lucino772"
          title="github"
        >
          <GithubIcon color="white" width={32} height={32} />
        </motion.a>
        <motion.a
          target="_blank"
          className="relative inline-block mr-0"
          initial="linkInit"
          animate="linkEnter"
          exit="linkExit"
          custom={{ delay: 0.5 }}
          variants={linkVariants}
          href="https://www.instagram.com/lucapalmi772/"
          title="instagram"
        >
          <InstagramIcon color="white" width={32} height={32} />
        </motion.a>
      </motion.div>
    </div>
  );
}
