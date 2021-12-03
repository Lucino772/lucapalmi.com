import Link from "next/link"
import { motion } from "framer-motion";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function MobileNav({ open = false, close = null }) {    
    const containerVariants = {
        initial: { opacity: 0, scale: 1, x: '100%' },
        enter: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.2 } },
        exit: { opacity: 0, scale: 1, x: '100%', transition: { duration: 0.2, delay: 0.1 } }
    }

    return (
        <motion.div 
            className="fixed left-0 right-0 top-0 bottom-0 w-full h-screen 
                     bg-white z-50 flex flex-col justify-center items-center"
            variants={containerVariants}
            initial="initial"
            enter="enter"
            exit="exit"
            animate={open ? "enter": "exit"}>

                <nav className="h-1/2 flex flex-col justify-evenly items-center gap-5">
                    <Link href="/">
                        <a className="text-2xl tracking-widest text-black">Home</a>
                    </Link>
                    <Link href="/about">
                        <a className="text-2xl tracking-widest text-black">About</a>
                    </Link>
                    <Link href="/projects">
                        <a className="text-2xl tracking-widest text-black">Projects</a>
                    </Link>
                </nav>

                <FontAwesomeIcon onClick={() => close()} className="absolute right-4 top-4 block hover:cursor-pointer" icon={faTimes} color="black" size="2x" fixedWidth />
        </motion.div>
    )
}