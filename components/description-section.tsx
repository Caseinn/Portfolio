"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SplitWords } from "@/components/ui/split-text";

const PHRASE =
  "Designing interfaces, writing code, and learning every day to build clearer, more useful digital experiences.";

const ACCENT = new Set([
  "designing",
  "interfaces",
  "code",
  "learning",
  "clearer",
  "useful",
  "experiences",
]);

const normalize = (word: string) => word.toLowerCase().replace(/[^\w]/g, "");

export default function DescriptionSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { margin: "-20% 0px", once: false });

  return (
    <section
      className="mt-32 px-4 sm:px-6 md:px-10 lg:px-24"
      id="about"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:gap-10 lg:flex-row lg:items-start lg:gap-16 px-5 md:px-8">
        {/* Animated Headline */}
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 40 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="m-0 bg-gradient-to-b font-semibold text-white bg-clip-text text-[28px] leading-snug md:text-[36px] md:leading-[1.3]"
        >
          <SplitWords
            text={PHRASE}
            isInView={isInView}
            isAccent={(word) => ACCENT.has(normalize(word))}
          />
        </motion.p>


        {/* Static Subtext */}
        <p className="m-0 text-[15px] font-light text-white/80 md:text-[18px] lg:w-4/5">
          <span className="mr-3 inline-block h-[18px] w-[3px] translate-y-[2px] rounded-full bg-purple-400" />
          <span className="text-white">Informatics Engineering</span> Graduate from{" "}
          <span className="text-white">Institut Teknologi Sumatera (ITERA)</span>. Interested
          in <span className="text-white">Machine Learning</span>,{" "}
          <span className="text-white">Deep Learning</span>, and{" "}
          <span className="text-white">Web Development</span>. Passionate about building practical
          technology solutions, continuously learning new skills, and collaborating effectively
          in team environments.
        </p>
      </div>
    </section>
  );
}
