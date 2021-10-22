import React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub} from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { motion } from "framer-motion";


export function ProjectContainer({ children }) {
    return <div className="projects-container">{children}</div>
}


export function ProjectRow(props) {
    return (
        <div className="project-row">
            {React.Children.map(props.children, e => {
                const props = {...e.props, portrait: true}
                return <ProjectItem {...props} />
            })}
        </div>
    )
}


export function ProjectItem(props) {
    const variants = {
        initial: { opacity: 0 },
        enter: { opacity: 1, transition: { duration: 0.3, delay: props.enterDelay } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    }

    
    return (
        <motion.div className={'project-item ' + (props.portrait ? 'project-item-portrait': '')} portrait={props.portrait} variants={variants} initial="initial" animate="enter" exit="exit" style={{background: `white url(${props.image}) no-repeat center center`, backgroundSize: "cover"}}>
            <div className="project-item-content">
                <h2>{props.title}</h2>
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
    portrait: PropTypes.bool,
    title: PropTypes.string,
    image: PropTypes.string,
    github_url: PropTypes.string,
    project_url: PropTypes.string
}
