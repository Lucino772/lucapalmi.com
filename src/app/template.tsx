"use client"

import { LazyMotion, AnimatePresence, m as motion } from "framer-motion";
import { usePathname } from "next/navigation";

const loadFramerFeatures = () => import("../lib/framer-lazy").then((res) => res.default);

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <LazyMotion features={loadFramerFeatures} strict>
          <AnimatePresence mode='wait'>
            <motion.div key={pathname}>
              {children}
            </motion.div>
          </AnimatePresence>
        </LazyMotion>
    );
}