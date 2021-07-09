import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)`
    position: absolute;

    top: 10px;
    left: 50%;

    padding: 20px 50px;

    font-size: 20px;
    font-weight: bold;

    background: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: 10px;
`

export default function SiteInConstruction() {
    const variants = {
        initial: { opacity: 0, y: -50, x: '-50%' },
        enter: { opacity: 1, y: 0, transition: { delay: 0 } },
        exit: {opacity: 0, transition: { delay: 0 }}
    }

    return <Container initial="initial" animate="enter" exit="exit" variants={variants}>This site is currently in construction</Container>;
}