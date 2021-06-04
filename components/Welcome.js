import styles from "./Welcome.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faGithub, faStackOverflow  } from "@fortawesome/free-brands-svg-icons";


export default function Welcome() {
    
    return (
        <div className={styles.container}>
            <p>Welcome, I'm</p>
            <p>Luca Palmisano</p>
            <div className={styles.socials}>
                <a href="/"><FontAwesomeIcon icon={faStackOverflow} color="white" size="2x" fixedWidth /></a>
                <a href="/"><FontAwesomeIcon icon={faGithub} color="white" size="2x" fixedWidth /></a>
                <a href="/"><FontAwesomeIcon icon={faFacebookF} color="white" size="2x" fixedWidth /></a>
                <a href="/"><FontAwesomeIcon icon={faInstagram} color="white" size="2x" fixedWidth /></a>
            </div>
        </div>
    )
}