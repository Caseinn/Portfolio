"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { SplitWords } from "@/components/ui/split-text";

const PHRASE = "Design the interface, then build it.";

const ACCENT = new Set(["design", "interface", "build"]);

const normalize = (word: string) => word.toLowerCase().replace(/[^\w]/g, "");

export default function DescriptionSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { margin: "-20% 0px", once: true });

  return (
    <section
      id="about"
      className="border-b border-bone/20 px-5 py-24 md:px-8 md:py-32 lg:px-12"
    >
      <div ref={ref} className="mx-auto w-full max-w-[1600px]">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <div>
            <p className="display-tight max-w-[15ch] text-[clamp(2.8rem,5.4vw,5rem)] font-semibold uppercase text-bone">
              <SplitWords
                text={PHRASE}
                isInView={isInView}
                isAccent={(word) => ACCENT.has(normalize(word))}
                accentClassName="text-signal"
              />
            </p>
          </div>

          <div className="border-t border-bone/20 pt-6">
            <p className="max-w-[62ch] text-[16px] leading-[1.75] text-bone/78 md:text-[19px]">
              <span className="text-bone">Informatics Engineering</span> graduate from{" "}
              <span className="text-bone">Institut Teknologi Sumatera (ITERA)</span>. I
              build <span className="text-bone">websites</span> end to end, interface
              and server, and keep them running after launch. I also work with{" "}
              <span className="text-bone">machine learning</span>,{" "}
              <span className="text-bone">deep learning</span>,{" "}
              <span className="text-bone">computer vision</span>, and data science.
            </p>

            <div className="mt-10">
              <div className="max-w-sm border-t border-bone/15 pt-3">
                <p className="label-caps text-bone/60">Education</p>
                <p className="mt-2 text-sm leading-relaxed text-bone/80">
                  Institut Teknologi Sumatera (ITERA)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
