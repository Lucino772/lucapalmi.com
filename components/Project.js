import React from "react";
import PropTypes from "prop-types";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub} from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import styles from "./Project.module.scss";

export function ProjectContainer(props) {
    return (
        <div className={styles["pc-container"]}>
            {props.children}
        </div>
    )
}

export function ProjectRow(props) {
    return (
        <div className={styles["pr-container"]}>
            {React.Children.map(props.children, e => {
                const props = {...e.props, portrait: true}
                return <ProjectItem {...props} />
            })}
        </div>
    )
}

export function ProjectItem(props) {
    let containerClassName = styles["pi-container"]
    if (props.portrait) containerClassName += " " + styles["pi-container-1-2"]

    return (
        <div className={containerClassName} style={{background: `white url(${props.image}) no-repeat center center`, backgroundSize: "cover"}}>
            <div className={styles["pi-content"]}>
                <h2>{props.title}</h2>
                <div className={styles["pi-links"]}>
                    {props.github_url !== undefined ? <a href={props.github_url} target="_blank"><FontAwesomeIcon icon={faGithub} color="white" fixedWidth />Github</a> : null }
                    {props.project_url !== undefined ? <a href={props.project_url} target="_blank"><FontAwesomeIcon icon={faEye} color="white" fixedWidth />Project</a> : null }
                    {props.github_url || props.project_url ? null : <p>No links provided</p>}
                </div>
            </div>
        </div>
    )
}

ProjectItem.propTypes = {
    portrait: PropTypes.bool,
    title: PropTypes.string,
    image: PropTypes.string,
    github_url: PropTypes.string,
    project_url: PropTypes.string
}
