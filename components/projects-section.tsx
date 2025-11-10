"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { motion, Variants, AnimatePresence } from "framer-motion";
import RoundedButton from "@/components/ui/rounded-button";
import { ChevronRight } from "lucide-react";

type Project = {
  title: string;
  src: string;
  color: string;
  role?: string;
};

const PROJECTS: Project[] = [
  { title: "Portfolio", src: "/projects/p1.png", color: "#0b0b0b", role: "Design & Development" },
  { title: "PPLK ITERA 2024", src: "/projects/p2.png", color: "#111318", role: "Development" },
  { title: "HarusGerak", src: "/projects/p3.png", color: "#14161d", role: "Design & Development" },
  { title: "Ghost Jump", src: "/projects/p4.png", color: "#1b1e27", role: "Design & Development" },
];

const scaleVariant: Variants = {
  initial: { scale: 0 },
  enter: { scale: 1, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  closed: { scale: 0, transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] } },
};

function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsTouch(
      window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
    );
  }, []);
  return isTouch;
}

function ProjectRow({
  index,
  title,
  role,
  onHoverChange,
  disabled,
}: {
  index: number;
  title: string;
  role?: string;
  onHoverChange: (active: boolean, idx: number, x: number, y: number) => void;
  disabled?: boolean;
}) {
  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) =>
    !disabled && onHoverChange(true, index, e.clientX, e.clientY);
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) =>
    !disabled && onHoverChange(false, index, e.clientX, e.clientY);

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group flex w-full items-center justify-between border-t border-white/20 px-6 md:px-24 py-10 md:py-14 cursor-pointer transition-opacity duration-200 last:border-b hover:opacity-60"
    >
      <h2 className="m-0 bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent text-[30px] md:text-[60px] font-normal leading-none transition-transform duration-300 group-hover:-translate-x-2">
        {title}
      </h2>
      <p className="m-0 hidden text-white/70 font-light transition-transform duration-300 group-hover:translate-x-2 md:block">
        {role}
      </p>
    </div>
  );
}

/** MOBILE TWEAK: friendlier accordion with bigger taps, clearer active, and smoother animation */
function MobileAccordion({ projects }: { projects: Project[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="w-full space-y-3"> {/* MOBILE TWEAK: consistent spacing */}
      {projects.map((p, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={p.title}
            className="overflow-hidden rounded-2xl border border-white/10 bg-black/30"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className={[
                // MOBILE TWEAK: bigger tap target, nicer layout
                "flex w-full items-center justify-between gap-3 px-4 py-4",
                "text-left text-white select-none",
                "active:scale-[0.99] transition-transform duration-150 ease-out",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-2xl",
              ].join(" ")}
              aria-expanded={isOpen}
              aria-controls={`acc-panel-${i}`}
            >
              <span className="font-semibold text-[15px] leading-6">{p.title}</span>
              <ChevronRight
                className={[
                  "h-5 w-5 shrink-0 transform transition-transform duration-300",
                  isOpen ? "rotate-90 text-purple-400" : "text-white/70",
                ].join(" ")}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  id={`acc-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={
                    prefersReduced
                      ? { duration: 0.001 }
                      : { duration: 0.32, ease: "easeOut" }
                  }
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4">
                    <div
                      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl ring-1 ring-white/10"
                      style={{ backgroundColor: p.color }}
                    >
                      <Image
                        src={p.src}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"                 // MOBILE TWEAK: lazy for perf
                        priority={false}
                      />
                    </div>
                    <p className="mt-2 text-xs text-white/70">{p.role}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function ProjectsSection() {
  const isTouch = useIsTouch();
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const modalWrap = useRef<HTMLDivElement>(null);

  const move = (x: number, y: number) => {
    const el = modalWrap.current;
    if (!el) return;
    gsap.to(el, {
      left: x,
      top: y,
      duration: 0.18,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleHover = (isActive: boolean, i: number, x: number, y: number) => {
    move(x, y);
    setModal({ active: isActive, index: i });
  };

  useEffect(() => {
    if (!active) return;
    const onMove = (e: globalThis.MouseEvent) => move(e.clientX, e.clientY);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [active]);

  return (
    <section
      className={[
        "relative flex flex-col items-center",
        // MOBILE TWEAK: comfy side gutters & safe-area top; keep your original top margin
        "px-4 md:px-6",
        "pt-[calc(env(safe-area-inset-top,0px))]",
        "mt-46",
      ].join(" ")}
      onMouseMove={(e) => active && move(e.clientX, e.clientY)}
    >
      {/* Desktop list (unchanged) */}
      <div className="mx-auto mb-16 hidden w-full max-w-7xl md:block">
        {PROJECTS.map((p, i) => (
          <ProjectRow
            key={p.title}
            index={i}
            title={p.title}
            role={p.role}
            onHoverChange={handleHover}
          />
        ))}
      </div>

      {/* Mobile accordion (improved) */}
      <div className="mx-auto mb-16 w-full max-w-2xl md:hidden">{/* MOBILE TWEAK: better max width */}
        <MobileAccordion projects={PROJECTS} />
      </div>

      {/* CTA (small spacing tweaks for mobile rhythm) */}
      <div className="mt-4 md:mt-6">
        <RoundedButton backgroundColor="#6366F1">
          <p>More Work</p>
        </RoundedButton>
      </div>

      {/* Hover Modal (disabled on touch as before) */}
      {!isTouch && (
        <div
          ref={modalWrap}
          className="fixed pointer-events-none z-40 -translate-x-1/2 -translate-y-1/2"
          style={{ top: "50%", left: "50%" }}
        >
          <motion.div
            variants={scaleVariant}
            initial="initial"
            animate={active ? "enter" : "closed"}
            className="w-[360px] h-[225px] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 bg-black/80 transition-transform duration-300 ease-out"
          >
            <div
              className="relative h-full w-full transition-[top] duration-500 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)]"
              style={{ top: `${index * -100}%` }}
            >
              {PROJECTS.map((p, i) => (
                <div
                  key={`modal_${i}`}
                  className="flex h-full w-full items-center justify-center"
                  style={{ backgroundColor: p.color }}
                >
                  <Image
                    src={p.src}
                    alt={p.title}
                    width={360}
                    height={225}
                    className="h-full w-full object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
