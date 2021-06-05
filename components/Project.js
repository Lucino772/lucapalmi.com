import React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub} from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { motion } from "framer-motion";
import styled, { css } from "styled-components";

// Project Container
export const ProjectContainer = styled.div`
    position: relative;

    max-width: 900px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: center;

    grid-gap: 10px;
`

// Project Row
const ProjectRowContainer = styled.div`
    position: relative;

    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    grid-gap: 10px;
`

export function ProjectRow(props) {
    return (
        <ProjectRowContainer>
            {React.Children.map(props.children, e => {
                const props = {...e.props, portrait: true}
                return <ProjectItem {...props} />
            })}
        </ProjectRowContainer>
    )
}


// Project Item
const ProjectItemContainer = styled(motion.div)`
    position: relative;
    background: green;

    width: 100%;
    padding-bottom: 56.25%;

    border: 2px solid white;

    ${props => props.portrait && css`
        width: 50%;
        padding-bottom: 61.81%;
    `}
`

const ProjectItemContent = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;

    width: 100%;
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: rgba(0, 0, 0, 0.5);

    color: white;

    h2 {
        padding: 10px 0px;

        font-size: 30px;
        font-weight: 600;
    }
`

const ProjectItemLinks = styled.div`
    position: relative;
    margin-top: 10px;

    a {
        color: white;
        text-decoration: none;

        font-size: 20px;
        font-weight: 400;

        margin-right: 20px;

        &:last-child {
            margin-right: 0px;
        }
    }

    p {
        font-size: 20px;
        font-weight: 400;

        font-style: italic;
    }
`

export function ProjectItem(props) {
    const variants = {
        initial: { opacity: 0 },
        enter: { opacity: 1, transition: { duration: 0.3, delay: props.delay } },
        exit: { opacity: 0, transition: { duration: 0.3, delay: props.delay } }
    }

    
    return (
        <ProjectItemContainer portrait={props.portrait} variants={variants} initial="initial" animate="enter" exit="exit" style={{background: `white url(${props.image}) no-repeat center center`, backgroundSize: "cover"}}>
            <ProjectItemContent>
                <h2>{props.title}</h2>
                <ProjectItemLinks>
                    {props.github_url !== undefined ? <a href={props.github_url} target="_blank"><FontAwesomeIcon icon={faGithub} color="white" fixedWidth />Github</a> : null }
                    {props.project_url !== undefined ? <a href={props.project_url} target="_blank"><FontAwesomeIcon icon={faEye} color="white" fixedWidth />Project</a> : null }
                    {props.github_url || props.project_url ? null : <p>No links provided</p>}
                </ProjectItemLinks>
            </ProjectItemContent>
        </ProjectItemContainer>
    )
}

ProjectItem.propTypes = {
    delay: PropTypes.number,
    portrait: PropTypes.bool,
    title: PropTypes.string,
    image: PropTypes.string,
    github_url: PropTypes.string,
    project_url: PropTypes.string
}
