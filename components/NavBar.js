import Link from "next/link";
import PropTypes from "prop-types";

import styles from "./NavBar.module.scss";

export default function NavBar(props) {
    const logoClassName = props.hideLogo ? "logo-invisible" : "logo"

    return (
        <div className={styles.container}>
            <img src="/images/logo.jpg" alt="Logo" className={styles[logoClassName]}/>
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