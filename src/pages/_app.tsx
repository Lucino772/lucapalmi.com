import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import { AnimatePresence, motion } from "framer-motion";
import { Josefin_Sans } from '@next/font/google';
import { useRouter } from 'next/router';

const font = Josefin_Sans({
    subsets: ["latin"],
    weight: ["400", "600"],
    display: "swap"
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <main className={font.className}>
      <AnimatePresence mode="wait">
        <motion.div key={router.pathname}><Component {...pageProps} /></motion.div>
      </AnimatePresence>
    </main>
  )
}
