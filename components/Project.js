import React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub} from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { motion } from "framer-motion";


export function ProjectContainer({ children }) {
    return <div className="projects-container">{children}</div>
}

export function ProjectItem(props) {
    const variants = {
        initial: { opacity: 0 },
        enter: { opacity: 1, transition: { duration: 0.3, delay: props.enterDelay } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    }

    
    return (
        <motion.div className="project-item" portrait={props.portrait} variants={variants} initial="initial" animate="enter" exit="exit" >
            <div className="project-item-header">
                <img src={props.image} />
                <h2>{props.title}</h2>
            </div>
            <div className="project-item-content">
                <p>{props.description}</p>
                <div className="project-item-links">
                    {props.github_url !== undefined ? <a href={props.github_url} target="_blank"><FontAwesomeIcon icon={faGithub} color="white" fixedWidth />Github</a> : null }
                    {props.project_url !== undefined ? <a href={props.project_url} target="_blank"><FontAwesomeIcon icon={faEye} color="white" fixedWidth />Project</a> : null }
                    {props.github_url || props.project_url ? null : <p>No links provided</p>}
                </div>
            </div>
        </motion.div>
    )
}


ProjectItem.defaultProps = {
    enterDelay: 0,
}

ProjectItem.propTypes = {
    enterDelay: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    github_url: PropTypes.string,
    project_url: PropTypes.string
}
