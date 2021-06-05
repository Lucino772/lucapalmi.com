import Link from "next/link";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import styles from "./NavBar.module.scss";

export default function NavBar(props) {
    const logoClassName = props.hideLogo ? "logo-invisible" : "logo"
    const logoVariants = {
        initial: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0, transition: { duration: 0.3 } }
    }
    const logoProps = props.hideLogo ? {} : { initial: "initial", animate: "enter", exit: "exit", variants: logoVariants}

    return (
        <div className={styles.container}>
            <motion.img src="/images/logo.jpg" alt="Logo" className={styles[logoClassName]} {...logoProps} />
            <nav className={styles.nav}>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/about">
                    <a>About</a>
                </Link>
                <Link href="/projects">
                    <a>Projects</a>
                </Link>
            </nav>
        </div>
    )
}

NavBar.defaultProps = {
    hideLogo: false
}

NavBar.propTypes = {
    hideLogo: PropTypes.bool
} 