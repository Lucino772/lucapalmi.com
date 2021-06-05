import PropTypes from "prop-types";
import { motion } from "framer-motion";

import styles from "./Logo.module.scss";


export default function Logo(props) {    
    return (
        <motion.img 
            src="/images/logo.jpg" 
            alt="Logo" 
            className={styles.logo} 
            width={props.width} 
            height={props.height} 
            initial={{ opacity: 0, x: "-100%", y: "-50%", rotateZ: "0deg" }} 
            animate={{ opacity: 1, x: "-50%", y: "-50%", rotateZ: "-15deg" }}
            transition={{ delay: 0.1 }} />
    )
}


Logo.defaultProps = {
    width: 312,
    height: 312
}

Logo.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
}