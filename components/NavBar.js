import Link from "next/link";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import styled from "styled-components";

const ContainerDiv = styled.div`
    position: relative;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 15px 30px;
`

const Logo = styled(motion.img)`
    position: relative;
    width: 75px;
    height: 75px;

    border-radius: 50%;
`

const Nav = styled.nav`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    a {
        position: relative;
        font-size: 20px;
        color: white;
        font-weight: 400;
        text-decoration: none;

        margin-right: 20px;
    }

    a:last-child {
        margin-right: 0px;
    }

    a:after {
        content: '';
        position: absolute;
        
        left: 5%;
        bottom: 0;

        width: 0%;
        height: 2px;
        background: white;

        transition: width 200ms;
    }

    a:hover {
        &:after {
            width: 75%;
        }
    }
`

export default function NavBar(props) {
    const logoVariants = {
        initial: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0, transition: { duration: 0.3 } }
    }
    const logoProps = props.hideLogo ? {style: { visibility: "hidden" }} : { initial: "initial", animate: "enter", exit: "exit", variants: logoVariants}

    return (
        <ContainerDiv>
            <Logo src="/images/logo.jpg" alt="Logo" {...logoProps} />
            <Nav>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/about">
                    <a>About</a>
                </Link>
                <Link href="/projects">
                    <a>Projects</a>
                </Link>
            </Nav>
        </ContainerDiv>
    )
}

NavBar.defaultProps = {
    hideLogo: false
}

NavBar.propTypes = {
    hideLogo: PropTypes.bool
} 