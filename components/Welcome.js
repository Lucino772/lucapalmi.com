import styles from "./Welcome.module.scss";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faGithub, faStackOverflow  } from "@fortawesome/free-brands-svg-icons";


export default function Welcome() {
    const linkMotionProps = {
        initial: {
            opacity: 0,
            y: 10
        },
        animate: {
            opacity: 1,
            y: 0
        }
    }
    
    return (
        <div className={styles.container}>
            <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>Welcome, I'm</motion.p>
            <motion.h1 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>Luca Palmisano</motion.h1>
            <div className={styles.socials}>
                <motion.a {...linkMotionProps} transition={{ delay: 0.3 }} href="/"><FontAwesomeIcon icon={faStackOverflow} color="white" size="2x" fixedWidth /></motion.a>
                <motion.a {...linkMotionProps} transition={{ delay: 0.4 }} href="/"><FontAwesomeIcon icon={faGithub} color="white" size="2x" fixedWidth /></motion.a>
                <motion.a {...linkMotionProps} transition={{ delay: 0.5 }} href="/"><FontAwesomeIcon icon={faFacebookF} color="white" size="2x" fixedWidth /></motion.a>
                <motion.a {...linkMotionProps} transition={{ delay: 0.6 }} href="/"><FontAwesomeIcon icon={faInstagram} color="white" size="2x" fixedWidth /></motion.a>
            </div>
        </div>
    )
}