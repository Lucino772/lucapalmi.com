import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub} from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";

import { motion, Variants } from "framer-motion";
import Image from "next/image";


export function ProjectContainer({ children }: { children: React.ReactNode }) {
    return <div className="projects-container">{children}</div>
}

type Props = {
    enterDelay?: number,
    title: string,
    image: string,
    portrait: boolean,
    description: string,
    github_url: string,
    project_url: string,
    docs_url: string
};

export function ProjectItem(props: Props) {
    if (props.enterDelay === undefined)
        props.enterDelay = 0

    const variants: Variants = {
        initial: { opacity: 0 },
        enter: { opacity: 1, transition: { duration: 0.3, delay: props.enterDelay } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    }

    
    return (
        <motion.div className="project-item" variants={variants} initial="initial" animate="enter" exit="exit" >
            <div className="project-item-header">
                <Image src={props.image} alt="project-cover" />
                <h2>{props.title}</h2>
            </div>
            <div className="project-item-content">
                <p>{props.description}</p>
                <div className="project-item-links">
                    {props.github_url !== undefined ? <a href={props.github_url} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} color="white" fixedWidth />Github</a> : null }
                    {props.project_url !== undefined ? <a href={props.project_url} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faEye} color="white" fixedWidth />Project</a> : null }
                    {props.docs_url !== undefined ? <a href={props.docs_url} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faBook} color="white" fixedWidth />Docs</a> : null }
                    {props.github_url || props.project_url || props.docs_url ? null : <p>No links provided</p>}
                </div>
            </div>
        </motion.div>
    )
}

