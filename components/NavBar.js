import Link from "next/link";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

export default function NavBar(props) {
    const logoVariants = {
        initial: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0, transition: { duration: 0.3, delay: props.exitDelay } }
    }
    const logoProps = props.hideLogo ? {style: { visibility: "hidden" }} : { initial: "initial", animate: "enter", exit: "exit", variants: logoVariants}

    return (
        <div className="relative w-full flex justify-between items-center py-4 px-7">
            <motion.img className="relative w-[75px] h-[75px] rounded-full" src="/images/logo.jpg" alt="Logo" {...logoProps} />
            <nav className="relative flex justify-center items-center">
                <Link href="/">
                    <a className="nav-link">Home</a>
                </Link>
                <Link href="/about">
                    <a className="nav-link">About</a>
                </Link>
                <Link href="/projects">
                    <a className="nav-link">Projects</a>
                </Link>
            </nav>
        </div>
    )
}

NavBar.defaultProps = {
    hideLogo: false,
    exitDelay: 0
}

NavBar.propTypes = {
    hideLogo: PropTypes.bool,
    exitDelay: PropTypes.number
} 