import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faGithub, faStackOverflow  } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const ContainerDiv = styled.div`
    position: absolute;

    top: 50%;
    right: 25%;

    transform: translate(50%, -50%);

    p, h1 {
        font-size: 50px;
        font-weight: 600;
        color: white;

        margin-bottom: 20px;

        &:nth-child(2) {
            padding-left: 30px;
        }
    }
`

const Socials = styled(motion.div)`
    position: relative;
    
    display: flex;
    justify-content: center;
    align-items: center;

    padding-top: 25px;

    a {
        position: relative;
        display: inline-block;
        margin-right: 20px;

        &:last-child {
            margin-right: 0px;
        }
    }

    &:before {
        content: '';
        position: absolute;

        width: 75%;
        height: 1px;
        
        top: 0px;

        background: white;
    }
`

export default function Welcome() {
    const titleVariants = {
        initial: { opacity: 0, x: -10 },
        enter: ({ delay }) => ({ opacity: 1, x: 0, transition: { delay: delay } }),
        exit: ({ delay }) => ({opacity: 0, transition: { delay: delay }})
    }

    const linkVariants = {
        containerExit: { opacity: 0, transition: { delay: 0.7 } },

        linkInit: { opacity: 0, y: 10 },
        linkEnter: ({ delay }) => ({ opacity: 1, y: 0, transition: { duration: 0.2, delay: delay } }),
        linkExit: ({ delay }) => ({ opacity: 0, y: 10, transition: { duration: 0.2, delay: delay } }),
    }
    
    return (
        <ContainerDiv>
            <motion.p initial="initial" animate="enter" exit="exit" variants={titleVariants} custom={{ delay: 0 }}>Welcome, I'm</motion.p>
            <motion.h1 initial="initial" animate="enter" exit="exit" variants={titleVariants} custom={{ delay: 0.2 }}>Luca Palmisano</motion.h1>
            <Socials exit="containerExit" variants={linkVariants}>
                <motion.a initial="linkInit" animate="linkEnter" exit="linkExit" custom={{ delay: 0.3 }} variants={linkVariants} href="/"><FontAwesomeIcon icon={faStackOverflow} color="white" size="2x" fixedWidth /></motion.a>
                <motion.a initial="linkInit" animate="linkEnter" exit="linkExit" custom={{ delay: 0.4 }} variants={linkVariants} href="/"><FontAwesomeIcon icon={faGithub} color="white" size="2x" fixedWidth /></motion.a>
                <motion.a initial="linkInit" animate="linkEnter" exit="linkExit" custom={{ delay: 0.5 }} variants={linkVariants} href="/"><FontAwesomeIcon icon={faFacebookF} color="white" size="2x" fixedWidth /></motion.a>
                <motion.a initial="linkInit" animate="linkEnter" exit="linkExit" custom={{ delay: 0.6 }} variants={linkVariants} href="/"><FontAwesomeIcon icon={faInstagram} color="white" size="2x" fixedWidth /></motion.a>
            </Socials>
        </ContainerDiv>
    )
}