"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { socialMedia } from "@/data";
import Magnet from "@/components/ui/magnet";
import RoundedButton from "@/components/ui/rounded-button";
import { motion, useInView, type Variants } from "framer-motion";

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

export default function Footer() {
  const [disableMagnet, setDisableMagnet] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { margin: "-20% 0px", once: false });

  // Disable magnet on touch/reduced-motion
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const update = () => setDisableMagnet(reduced.matches || coarse.matches);
    update();
    reduced.addEventListener?.("change", update);
    coarse.addEventListener?.("change", update);
    return () => {
      reduced.removeEventListener?.("change", update);
      coarse.removeEventListener?.("change", update);
    };
  }, []);

  return (
    <footer
      ref={ref}
      className="relative w-full px-4 pb-10 pt-12 sm:px-6 md:px-10 md:pb-8 md:pt-14 lg:pt-16"
      id="contact"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[22vh] select-none opacity-50"
        aria-hidden="true"
      >
        <Image
          src="/footer-grid.svg"
          alt="footer grid"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-50 [mask-image:linear-gradient(to_top,black_45%,transparent_95%)]"
          priority
        />
      </div>

      {/* ---------- Card ---------- */}
      <div
        className="
          relative z-10 mx-auto max-w-7xl
          rounded-3xl bg-[#0b0b0f]/80
          px-6 py-12 text-center backdrop-blur-xl
          sm:px-8 sm:py-14 md:px-14 md:py-14
        "
      >
        {/* Availability */}
        <motion.div
          variants={slideUp}
          custom={0}
          initial="initial"
          animate={isInView ? "open" : "closed"}
          className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-neutral-800/60 px-3 py-1 text-xs text-white/80 sm:mb-6 sm:px-4 sm:py-1.5 sm:text-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          Available for work
        </motion.div>

        {/* Headline */}
        <p className="mx-auto mb-2 max-w-xl text-[28px] font-semibold leading-snug text-white md:text-[40px] md:leading-[1.2]">
          {"Let's create your next big idea."
            .split(" ")
            .map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="relative mr-[4px] inline-flex overflow-hidden align-top"
              >
                <motion.span
                  variants={slideUp}
                  custom={i + 1}
                  initial="initial"
                  animate={isInView ? "open" : "closed"}
                  className={`inline-block ${
                    i === 2 || i === 4
                      ? "bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent"
                      : ""
                  }`}
                >
                  {word}
                </motion.span>
                {(i === 2 || i === 4) && (
                  <span className="pointer-events-none absolute bottom-[-3px] left-0 h-[1.5px] w-full bg-gradient-to-r from-purple-400/60 via-purple-500/50 to-transparent" />
                )}
              </span>
            ))}
        </p>

        {/* CTA Button */}
        <motion.div
          variants={slideUp}
          custom={8}
          initial="initial"
          animate={isInView ? "open" : "closed"}
          className="mt-7 flex justify-center sm:mt-8"
        >
          <RoundedButton backgroundColor="#6366F1" aria-label="Contact Me">
            <p className="text-sm sm:text-base">Contact Me</p>
          </RoundedButton>
        </motion.div>

        {/* Mobile icons inside card */}
        <motion.div
          variants={slideUp}
          custom={9}
          initial="initial"
          animate={isInView ? "open" : "closed"}
          className="mt-8 flex justify-center gap-4 sm:hidden"
        >
          {socialMedia.map(({ id, icon: Icon, url }) => (
            <button
              key={id}
              type="button"
              onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
              aria-label={url}
              className="
                flex h-11 w-11 items-center justify-center rounded-xl
                border border-white/10 bg-white/5 backdrop-blur-md
                transition active:scale-95 focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-white/40
              "
            >
              <Icon className="text-[18px] text-white" />
            </button>
          ))}
        </motion.div>
      </div>

      {/* ---------- Bottom Section ---------- */}
      <motion.div
        variants={slideUp}
        custom={10}
        initial="initial"
        animate={isInView ? "open" : "closed"}
        className="relative z-10 mt-8 flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-4"
      >
        <p className="text-center text-xs text-white/60 sm:text-left sm:text-sm">
          © {new Date().getFullYear()} Dito Rifki Irawan. All rights reserved.
        </p>

        {/* Desktop icons */}
        <div className="hidden items-center gap-3 sm:flex sm:gap-4">
          {socialMedia.map(({ id, icon: Icon, url }) => (
            <Magnet
              key={id}
              disabled={disableMagnet}
              magnetStrength={4}
              wrapperClassName="inline-block"
            >
              <button
                type="button"
                onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
                aria-label={url}
                className="
                  flex h-10 w-10 items-center justify-center rounded-xl
                  border border-white/10 bg-white/5 backdrop-blur-md
                  transition hover:scale-110 focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer
                "
              >
                <Icon className="text-[16px] text-white" />
              </button>
            </Magnet>
          ))}
        </div>
      </motion.div>
    </footer>
  );
}
