import { motion } from "framer-motion";

export default function SiteInConstruction() {
    const variants = {
        initial: { opacity: 0, y: -50, x: '-50%' },
        enter: { opacity: 1, y: 0, transition: { delay: 0 } },
        exit: {opacity: 0, transition: { delay: 0 }}
    }

    return <motion.div
                className="absolute top-2 left-1/2 py-5 px-12 text-xl font-bold bg-black bg-opacity-70 text-white rounded-lg"
                initial="initial"
                animate="enter" 
                exit="exit" 
                variants={variants} >
                    This site is currently in construction
            </motion.div>;
}