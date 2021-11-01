import Link from "next/link";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MobileNav from "./MobileNav";
import { useState } from "react";

export default function NavBar(props) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const logoVariants = {
        initial: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0, transition: { duration: 0.3, delay: props.exitDelay } }
    }

    return (
        <>
            <div className="relative w-full max-w-6xl flex justify-between items-center py-4 px-7 mx-auto">
                <motion.img 
                    className="relative w-[50px] h-[50px] md:w-[75px] md:h-[75px] rounded-full visible md:invisible"
                    src="/images/logo.jpg"
                    alt="Logo"
                    initial="initial"
                    animate="enter"
                    exit="exit" 
                    variants={logoVariants}
                    style={props.showLogo ? {visibility: 'visible'}: {}} />
                
                <nav className="relative justify-center items-center hidden md:flex">
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
                
                <FontAwesomeIcon onClick={() => setMobileMenuOpen(true)} className="block md:hidden hover:cursor-pointer" icon={faBars} color="white" size="2x" fixedWidth />
            </div>
            <MobileNav open={mobileMenuOpen} close={() => setMobileMenuOpen(false)} />
        </>
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