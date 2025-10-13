"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const PHRASE =
  "Crafting ideas into code and experiences. Still learning, still growing, always building toward something better.";

const slideUp: Variants = {
  initial: { y: "100%", opacity: 0 },
    open: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
        duration: 0.3,
        delay: 0.08 * i,
        ease: "easeOut",
    },
    }),
  closed: {
    y: "100%",
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const ACCENT = new Set(["crafting", "code", "learning", "growing", "building", "better"]);

export default function DescriptionSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { margin: "-20% 0px", once: false });

  return (
    <section className="mt-52 flex justify-center px-5 md:px-12 lg:px-24">
      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-10 lg:flex-row lg:gap-16">
        {/* Animated Headline */}
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 40 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="m-0 bg-gradient-to-b font-semibold text-white bg-clip-text text-[28px] leading-snug md:text-[36px] md:leading-[1.3]"
        >
          {PHRASE.split(" ").map((word, i) => {
            const clean = word.toLowerCase().replace(/[^\w]/g, "");
            const isAccent = ACCENT.has(clean);

            return (
              <span
                key={`${word}-${i}`}
                className="relative mr-[3px] inline-flex overflow-hidden align-top"
              >
                <motion.span
                  variants={slideUp}
                  custom={i}
                  initial="initial"
                  animate={isInView ? "open" : "closed"}
                  className={`inline-block ${
                    isAccent
                      ? "bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent"
                      : ""
                  }`}
                >
                  {word}
                </motion.span>

                {isAccent && (
                  <span className="pointer-events-none absolute bottom-[-3px] left-0 h-[1.5px] w-full bg-gradient-to-r from-purple-400/60 via-purple-500/50 to-transparent" />
                )}
              </span>
            );
          })}
        </motion.p>

        {/* Static Subtext (no motion) */}
        <p className="m-0 text-[15px] font-light text-white/80 md:text-[18px] lg:w-4/5">
          <span className="mr-3 inline-block h-[18px] w-[3px] translate-y-[2px] rounded-full bg-purple-400" />
          Driven by curiosity for <span className="text-white">technology</span>,{" "}
          <span className="text-white">creativity</span>, and{" "}
          <span className="text-white">problem-solving</span>, I keep learning every day
          to build experiences that inspire and connect.
        </p>
      </div>
    </section>
  );
}