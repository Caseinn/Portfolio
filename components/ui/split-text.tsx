"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Word-by-word slide-up reveal. Shared by headlines that animate one word
 * at a time.
 */
export const slideUpVariants: Variants = {
  initial: { y: "100%", opacity: 0 },
  open: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.42,
      delay: 0.055 * i,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  closed: {
    y: "100%",
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const reducedVariants: Variants = {
  initial: { y: 0, opacity: 1 },
  open: { y: 0, opacity: 1 },
  closed: { y: 0, opacity: 1 },
};

type SplitWordsProps = {
  text: string;
  isInView: boolean;
  /** Decides whether a given word gets the accent treatment. */
  isAccent: (word: string, index: number) => boolean;
  /** Shift applied to the stagger index, e.g. to continue a sequence. */
  indexOffset?: number;
  gapClassName?: string;
  accentClassName?: string;
};

export function SplitWords({
  text,
  isInView,
  isAccent,
  indexOffset = 0,
  gapClassName = "mr-[0.24em]",
  accentClassName = "text-signal",
}: SplitWordsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {text.split(" ").map((word, i) => {
        const accent = isAccent(word, i);

        return (
          <span
            key={`${word}-${i}`}
            className={cn(
              "relative inline-flex overflow-hidden align-top",
              gapClassName,
            )}
          >
            <motion.span
              variants={reduceMotion ? reducedVariants : slideUpVariants}
              custom={i + indexOffset}
              initial="initial"
              animate={isInView ? "open" : "closed"}
              className={cn("inline-block", accent && accentClassName)}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </>
  );
}
