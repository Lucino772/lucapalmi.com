"use client";

import { LazyMotion, m as motion } from "framer-motion";
import { usePathname } from "next/navigation";

const loadFramerFeatures = () =>
    import("../lib/framer-lazy").then((res) => res.default);

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <LazyMotion features={loadFramerFeatures} strict>
            <motion.div key={pathname}>{children}</motion.div>
        </LazyMotion>
    );
}
