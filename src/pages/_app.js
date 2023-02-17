import "./global.scss";

import { AnimatePresence } from "framer-motion";
import { Josefin_Sans } from '@next/font/google';

const font = Josefin_Sans({
    subsets: ["latin"],
    weight: ["400", "600"],
    display: "swap"
  })

export default function App({Component, pageProps, router}) {
    return (
        <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.route} className={font.className} />
        </AnimatePresence>
    )
}