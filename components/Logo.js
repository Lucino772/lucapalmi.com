import PropTypes from "prop-types";
import { motion } from "framer-motion";
import styled from "styled-components";

const LogoImg = styled(motion.img)`
    position: absolute;

    border-radius: 50%;

    left: 25%;
    top: 50%;
`

export default function Logo(props) {
    const variants = {
        initial: { opacity: 0, x: "-100%", y: "-50%", rotateZ: "0deg" },
        enter: { opacity: 1, x: "-50%", rotateZ: "-15deg", transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    }

    return <LogoImg 
        src="/images/logo.jpg" 
        alt="Logo" 
        width={props.width} 
        height={props.height} 
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants} />
}


Logo.defaultProps = {
    width: 312,
    height: 312
}

Logo.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
}