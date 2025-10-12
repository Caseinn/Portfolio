// components/ui/preloader.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const WORDS = ["Hello","Bonjour","Ciao","Olà","やあ","Hallå","Guten tag","Hallo"] as const;

const opacity: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 0.75, transition: { duration: 1, delay: 0.2 } },
};

const slideUp: Variants = {
  initial: { top: 0 },
  exit: { top: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } },
};

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [dim, setDim] = useState({ width: 0, height: 0 });

  // Lock scroll while visible
  useEffect(() => {
    if (!isLoading) return;
    const { style: htmlStyle } = document.documentElement;
    const { style: bodyStyle } = document.body;

    const prevHtmlOverflow = htmlStyle.overflow;
    const prevBodyOverflow = bodyStyle.overflow;
    const prevBodyHeight = bodyStyle.height;

    htmlStyle.overflow = "hidden";
    bodyStyle.overflow = "hidden";
    bodyStyle.height = "100vh";

    return () => {
      htmlStyle.overflow = prevHtmlOverflow;
      bodyStyle.overflow = prevBodyOverflow;
      bodyStyle.height = prevBodyHeight;
    };
  }, [isLoading]);

  // viewport
  useEffect(() => {
    const resize = () => setDim({ width: window.innerWidth, height: window.innerHeight });
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // rotate words
  useEffect(() => {
    if (index === WORDS.length - 1) return;
    const t = setTimeout(() => setIndex((i) => i + 1), index === 0 ? 1000 : 150);
    return () => clearTimeout(t);
  }, [index]);

  // auto hide + notify others
  useEffect(() => {
    const t = setTimeout(() => {
      setIsLoading(false);
      // Notify the app that preloader finished
      window.dispatchEvent(new Event("preloader:done"));
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  const initialPath = `M0 0 L${dim.width} 0 L${dim.width} ${dim.height} Q${dim.width / 2} ${dim.height + 300} 0 ${dim.height}  L0 0`;
  const targetPath  = `M0 0 L${dim.width} 0 L${dim.width} ${dim.height} Q${dim.width / 2} ${dim.height} 0 ${dim.height}  L0 0`;

  const curve: Variants = {
    initial: { d: initialPath, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
    exit:    { d: targetPath,  transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 } },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[99] flex h-screen w-screen items-center justify-center bg-[#141516]"
        >
          {dim.width > 0 && (
            <>
              <motion.p
                variants={opacity}
                initial="initial"
                animate="enter"
                className="absolute z-10 flex items-center text-white font-semibold [font-size:42px]"
              >
                <span className="mr-2 inline-block h-[10px] w-[10px] rounded-full bg-white" />
                {WORDS[index]}
              </motion.p>

              <svg className="absolute top-0 h-[calc(100%+300px)] w-full">
                <motion.path variants={curve} initial="initial" exit="exit" fill="#000319" />
              </svg>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
