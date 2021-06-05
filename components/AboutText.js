import { motion } from "framer-motion";
import styles from "./AboutText.module.scss";

export default function AboutText() {
    const h1Variants = {
        initial: { opacity: 0, x: -10 },
        enter: { opacity: 1, x: 0, transition: { duration: 0.2 } },
        exit: { opacity: 0, x: -10, transition: { duration: 0.2 } }
    }

    const pVariants = {
        initial: { opacity: 0, x: -10, skew: "0deg" },
        enter: ({ delay }) => ({ opacity: 1, x: 0, skew: "5deg", transition: { duration: 0.5, delay: delay } }),
        exit: ({ delay }) => ({ opacity: 0, x: -10, transition: { duration: 0.3, delay: delay }})
    }

    return (
        <div className={styles.container}>
            <motion.h1 initial="initial" animate="enter" exit="exit" variants={h1Variants} >About</motion.h1>
            <div>
                <motion.p custom={{ delay: 0.2 }} initial="initial" animate="enter" exit="exit" variants={pVariants} >My name is Luca Palmisano. I’m 18 years old and I’m currently studying computer science at university.</motion.p>
                <motion.p custom={{ delay: 0.35 }} initial="initial" animate="enter" exit="exit" variants={pVariants} >I’ve been coding for several years now. Through the years, what was once a hobby has became a passion. I have always been interested in discovering new things and this has helped me to expand my knowledge of information technology.</motion.p>
                <motion.p custom={{ delay: 0.5 }} initial="initial" animate="enter" exit="exit" variants={pVariants} >Besides that I am enjoying living a student’s life, having fun with my friends, playing games, etc.Well, there you have it, this is me! This is who I am! </motion.p>
            </div>
        </div>
    )
}