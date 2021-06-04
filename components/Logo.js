import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import styles from "./Logo.module.scss";


export default function Logo(props) {
    const className = props.useRotate ? "logo-rotate" : "logo";
    
    return <img id="logo" src="/images/logo.jpg" alt="Logo" className={styles[className]} width={props.width} height={props.height} />
}


Logo.defaultProps = {
    useRotate: false,
    width: 312,
    height: 312
}

Logo.propTypes = {
    useRotate: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number
}