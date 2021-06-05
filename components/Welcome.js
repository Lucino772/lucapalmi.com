import styles from "./Welcome.module.scss";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faGithub, faStackOverflow  } from "@fortawesome/free-brands-svg-icons";


export default function Welcome() {
    const titleVariants = {
        initial: { opacity: 0, x: -10 },
        enter: ({ delay }) => ({ opacity: 1, x: 0, transition: { delay: delay } }),
        exit: ({ delay }) => ({opacity: 0, transition: { delay: delay }})
    }

    const linkVariants = {
        containerExit: { opacity: 0, transition: { delay: 0.7 } },

        linkInit: { opacity: 0, y: 10 },
        linkEnter: ({ delay }) => ({ opacity: 1, y: 0, transition: { duration: 0.2, delay: delay } }),
        linkExit: ({ delay }) => ({ opacity: 0, y: 10, transition: { duration: 0.2, delay: delay } }),
    }
    
    return (
        <div className={styles.container}>
            <motion.p initial="initial" animate="enter" exit="exit" variants={titleVariants} custom={{ delay: 0 }}>Welcome, I'm</motion.p>
            <motion.h1 initial="initial" animate="enter" exit="exit" variants={titleVariants} custom={{ delay: 0.2 }}>Luca Palmisano</motion.h1>
            <motion.div exit="containerExit" variants={linkVariants} className={styles.socials}>
                <motion.a initial="linkInit" animate="linkEnter" exit="linkExit" custom={{ delay: 0.3 }} variants={linkVariants} href="/"><FontAwesomeIcon icon={faStackOverflow} color="white" size="2x" fixedWidth /></motion.a>
                <motion.a initial="linkInit" animate="linkEnter" exit="linkExit" custom={{ delay: 0.4 }} variants={linkVariants} href="/"><FontAwesomeIcon icon={faGithub} color="white" size="2x" fixedWidth /></motion.a>
                <motion.a initial="linkInit" animate="linkEnter" exit="linkExit" custom={{ delay: 0.5 }} variants={linkVariants} href="/"><FontAwesomeIcon icon={faFacebookF} color="white" size="2x" fixedWidth /></motion.a>
                <motion.a initial="linkInit" animate="linkEnter" exit="linkExit" custom={{ delay: 0.6 }} variants={linkVariants} href="/"><FontAwesomeIcon icon={faInstagram} color="white" size="2x" fixedWidth /></motion.a>
            </motion.div>
        </div>
    )
}