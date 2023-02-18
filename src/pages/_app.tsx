import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { LazyMotion } from "framer-motion";

import { AnimatePresence, m as motion } from "framer-motion";
import { Josefin_Sans } from "@next/font/google";
import { useRouter } from "next/router";
import Head from "next/head";

const font = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const loadFramerFeatures = () =>
  import("../lib/framer-lazy").then((res) => res.default);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <main className={font.className}>
      <Head>
        <title>lucapalmi.com - fullstack developer</title>
      </Head>
      <LazyMotion features={loadFramerFeatures} strict>
        <AnimatePresence mode="wait">
          <motion.div key={router.pathname}>
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </LazyMotion>
    </main>
  );
}
