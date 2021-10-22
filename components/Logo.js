import PropTypes from "prop-types";
import { motion } from "framer-motion";

export default function Logo(props) {
    const variants = {
        initial: { opacity: 0, x: "-100%", y: "-50%", rotateZ: "0deg" },
        enter: { opacity: 1, x: "-50%", rotateZ: "-15deg", transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    }

    return <motion.img 
                className="absolute border rounded-full left-[25%] top-[50%]" 
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