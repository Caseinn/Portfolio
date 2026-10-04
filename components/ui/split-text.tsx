"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Word-by-word slide-up reveal. Shared by every headline that animates
 * one word at a time.
 */
export const slideUpVariants: Variants = {
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

const ACCENT_CLASS =
  "bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent";

const UNDERLINE_CLASS =
  "pointer-events-none absolute bottom-[-3px] left-0 h-[1.5px] w-full bg-gradient-to-r from-purple-400/60 via-purple-500/50 to-transparent";

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
  gapClassName = "mr-[3px]",
  accentClassName = ACCENT_CLASS,
}: SplitWordsProps) {
  return (
    <>
      {text.split(" ").map((word, i) => {
        const accent = isAccent(word, i);

        return (
          <span
            key={`${word}-${i}`}
            className={cn(
              "relative inline-flex overflow-hidden align-top",
              gapClassName
            )}
          >
            <motion.span
              variants={slideUpVariants}
              custom={i + indexOffset}
              initial="initial"
              animate={isInView ? "open" : "closed"}
              className={cn("inline-block", accent && accentClassName)}
            >
              {word}
            </motion.span>

            {accent && <span className={UNDERLINE_CLASS} />}
          </span>
        );
      })}
    </>
  );
}
