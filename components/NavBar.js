import Link from "next/link";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import styles from "./NavBar.module.scss";

export default function NavBar(props) {
    const logoClassName = props.hideLogo ? "logo-invisible" : "logo"
    const logoProps = props.hideLogo ? {} : {
        initial: {
            opacity: 0,
            scale: 0
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        transition: {
            duration: 0.2
        }
    }

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