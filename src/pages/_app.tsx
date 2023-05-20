import "@/styles/globals.scss";
// import 'highlight.js/styles/base16/chalk.css';
// import 'highlight.js/styles/base16/default-dark.css';
// import 'highlight.js/styles/base16/framer.css';
// import 'highlight.js/styles/base16/onedark.css';
// import 'highlight.js/styles/felipec.css';
import 'highlight.js/styles/github-dark-dimmed.css';
// import 'highlight.js/styles/hybrid.css';
// import 'highlight.js/styles/nord.css';
// import 'highlight.js/styles/obsidian.css';
// import 'highlight.js/styles/stackoverflow-dark.css';
// import 'highlight.js/styles/vs2015.css';


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
