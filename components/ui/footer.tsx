"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { socialMedia } from "@/data";
import Magnet from "@/components/ui/magnet";
import RoundedButton from "@/components/ui/rounded-button";
import { motion, useInView } from "framer-motion";
import {
  useCoarsePointer,
  usePrefersReducedMotion,
} from "@/lib/use-media-query";
import { slideUpVariants, SplitWords } from "@/components/ui/split-text";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";

const HEADLINE = "Have a website or app in mind?";
const ACCENTED_HEADLINE_WORDS = new Set([2, 4]);

const SOCIAL_BUTTON_BASE =
  "flex items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer";

function SocialIconButton({
  url,
  icon: Icon,
  size,
}: {
  url: string;
  icon: IconType;
  size: "sm" | "md";
}) {
  const iconSize = size === "md" ? "text-[18px]" : "text-[16px]";

  return (
    <button
      type="button"
      onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
      aria-label={url}
      className={cn(
        SOCIAL_BUTTON_BASE,
        size === "md" ? "h-11 w-11" : "h-10 w-10",
        size === "md" ? "active:scale-95" : "hover:scale-110"
      )}
    >
      <Icon className={cn(iconSize, "text-white")} />
    </button>
  );
}

export default function Footer() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const coarsePointer = useCoarsePointer();
  const disableMagnet = prefersReducedMotion || coarsePointer;
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { margin: "-20% 0px", once: false });

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
          variants={slideUpVariants}
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
          <SplitWords
            text={HEADLINE}
            isInView={isInView}
            isAccent={(_, i) => ACCENTED_HEADLINE_WORDS.has(i)}
            indexOffset={1}
            gapClassName="mr-[4px]"
            accentClassName="bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent"
          />
        </p>

        {/* CTA Button */}
        <motion.div
          variants={slideUpVariants}
          custom={8}
          initial="initial"
          animate={isInView ? "open" : "closed"}
          className="mt-7 flex justify-center sm:mt-8"
        >
        <a href="mailto:ditorifki.irawan@gmail.com" className="inline-block no-underline">
          <RoundedButton backgroundColor="#6366F1" aria-label="Contact Me">
            <p className="text-sm sm:text-base">Contact Me</p>
          </RoundedButton>
        </a>
        </motion.div>

        {/* Mobile icons inside card */}
        <motion.div
          variants={slideUpVariants}
          custom={9}
          initial="initial"
          animate={isInView ? "open" : "closed"}
          className="mt-8 flex justify-center gap-4 sm:hidden"
        >
          {socialMedia.map(({ id, icon, url }) => (
            <SocialIconButton key={id} url={url} icon={icon} size="md" />
          ))}
        </motion.div>
      </div>

      {/* ---------- Bottom Section ---------- */}
      <motion.div
        variants={slideUpVariants}
        custom={10}
        initial="initial"
        animate={isInView ? "open" : "closed"}
        className="
          relative z-10 mt-8
          mx-auto w-full max-w-7xl
          flex flex-col items-center justify-between gap-6 sm:flex-row
        "
      >
        <p className="text-center text-xs text-white/60 sm:text-left sm:text-sm">
          © {new Date().getFullYear()} Dito Rifki Irawan. All rights reserved.
        </p>

        {/* Desktop icons */}
        <div className="hidden items-center gap-3 sm:flex sm:gap-4">
          {socialMedia.map(({ id, icon, url }) => (
            <Magnet
              key={id}
              disabled={disableMagnet}
              magnetStrength={4}
              wrapperClassName="inline-block"
            >
              <SocialIconButton url={url} icon={icon} size="sm" />
            </Magnet>
          ))}
        </div>
      </motion.div>
    </footer>
  );
}
