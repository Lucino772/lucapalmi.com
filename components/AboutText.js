import { motion } from "framer-motion";
import styled from "styled-components";

const ContainerDiv = styled.div`
    position: absolute;

    top: 50%;
    right: 25%;

    transform: translate(50%, -50%);

    color: white;
    max-width: 400px;

    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Title = styled(motion.h1)`
    position: relative;

    font-size: 50px;
    font-weight: 600;
`

const Paragraph = styled(motion.p)`
    position: relative;

    font-size: 20px;
    font-weight: 400;
    line-height: 120%;

    margin-top: 10px;

    &:nth-child(1) {
        padding-left: 10px;
    }
    &:nth-child(2) {
        padding-left: 20px;
    }
    &:nth-child(3) {
        padding-left: 30px;
    }
`

export default function AboutText() {
    const h1Variants = {
        initial: { opacity: 0, x: -10 },
        enter: { opacity: 1, x: 0, transition: { duration: 0.2 } },
        exit: { opacity: 0, x: -10, transition: { duration: 0.2 } }
    }

    const pVariants = {
        initial: { opacity: 0, x: -10, skew: "0deg" },
        enter: ({ delay }) => ({ opacity: 1, x: 0, skew: "5deg", transition: { duration: 0.5, delay: delay } }),
        exit: ({ delay }) => ({ opacity: 0, x: -10, transition: { duration: 0.2, delay: delay }})
    }

    return (
        <ContainerDiv>
            <Title initial="initial" animate="enter" exit="exit" variants={h1Variants} >About</Title>
            <div>
                <Paragraph custom={{ delay: 0.2 }} initial="initial" animate="enter" exit="exit" variants={pVariants} >My name is Luca Palmisano. I’m 18 years old and I’m currently studying computer science at university.</Paragraph>
                <Paragraph custom={{ delay: 0.35 }} initial="initial" animate="enter" exit="exit" variants={pVariants} >I’ve been coding for several years now. Through the years, what was once a hobby has became a passion. I have always been interested in discovering new things and this has helped me to expand my knowledge of information technology.</Paragraph>
                <Paragraph custom={{ delay: 0.5 }} initial="initial" animate="enter" exit="exit" variants={pVariants} >Besides that I am enjoying living a student’s life, having fun with my friends, playing games, etc.Well, there you have it, this is me! This is who I am! </Paragraph>
            </div>
        </ContainerDiv>
    )
}