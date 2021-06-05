import { motion } from "framer-motion";
import styles from "./AboutText.module.scss";

export default function AboutText() {
    const pMotionProps = {
        initial: {
            opacity: 0,
            x: 0,
            skew: "0deg"
        },
        animate: {
            opacity: 1,
            x: 0,
            skew: "5deg"
        }
    }

    return (
        <div className={styles.container}>
            <motion.h1 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>About</motion.h1>
            <div>
                <motion.p {...pMotionProps} transition={{delay: 0.2}} >My name is Luca Palmisano. I’m 18 years old and I’m currently studying computer science at university.</motion.p>
                <motion.p {...pMotionProps} transition={{delay: 0.35}} >I’ve been coding for several years now. Through the years, what was once a hobby has became a passion. I have always been interested in discovering new things and this has helped me to expand my knowledge of information technology.</motion.p>
                <motion.p {...pMotionProps} transition={{delay: 0.5}} >Besides that I am enjoying living a student’s life, having fun with my friends, playing games, etc.Well, there you have it, this is me! This is who I am! </motion.p>
            </div>
        </div>
    )
}