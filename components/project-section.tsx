"use client";

import React, { useEffect, useRef, useState, MouseEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import { motion, Variants, AnimatePresence } from "framer-motion";
import RoundedButton from "@/components/ui/rounded-button";

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
    setIsTouch(
      typeof window !== "undefined" &&
        (window.matchMedia("(pointer: coarse)").matches ||
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0)
    );
  }, []);
  return isTouch;
}

/* ---------- Desktop Project Row ---------- */
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
  const onEnter = (e: MouseEvent<HTMLDivElement>) => !disabled && onHoverChange(true, index, e.clientX, e.clientY);
  const onLeave = (e: MouseEvent<HTMLDivElement>) => !disabled && onHoverChange(false, index, e.clientX, e.clientY);

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
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

/* ---------- Mobile Accordion ---------- */
function MobileAccordion({ projects }: { projects: Project[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full">
      {projects.map((p, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={p.title}
            className="mb-3 overflow-hidden rounded-2xl border border-white/10 bg-black/30"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between px-4 py-4 text-left text-white focus:outline-none"
            >
              <span className="font-semibold">{p.title}</span>
              <span className={`transition-transform ${isOpen ? "rotate-90 text-purple-400" : "rotate-0 text-white/70"}`}>
                ▶
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
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

/* ---------- Main Component ---------- */
export default function ProjectsSection() {
  const isTouch = useIsTouch();
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;

  const modalWrap = useRef<HTMLDivElement>(null);
  const cursorWrap = useRef<HTMLDivElement>(null);
  const labelWrap = useRef<HTMLDivElement>(null);

  const modalQuickX = useRef<gsap.QuickToFunc | null>(null);
  const modalQuickY = useRef<gsap.QuickToFunc | null>(null);
  const cursorQuickX = useRef<gsap.QuickToFunc | null>(null);
  const cursorQuickY = useRef<gsap.QuickToFunc | null>(null);
  const labelQuickX = useRef<gsap.QuickToFunc | null>(null);
  const labelQuickY = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (isTouch) return;
    if (!modalWrap.current || !cursorWrap.current || !labelWrap.current) return;

    modalQuickX.current = gsap.quickTo(modalWrap.current, "left", { duration: 0.6, ease: "power3" });
    modalQuickY.current = gsap.quickTo(modalWrap.current, "top", { duration: 0.6, ease: "power3" });
    cursorQuickX.current = gsap.quickTo(cursorWrap.current, "left", { duration: 0.4, ease: "power3" });
    cursorQuickY.current = gsap.quickTo(cursorWrap.current, "top", { duration: 0.4, ease: "power3" });
    labelQuickX.current = gsap.quickTo(labelWrap.current, "left", { duration: 0.35, ease: "power3" });
    labelQuickY.current = gsap.quickTo(labelWrap.current, "top", { duration: 0.35, ease: "power3" });
  }, [isTouch]);

  const move = (x: number, y: number) => {
    if (isTouch) return;
    modalQuickX.current?.(x);
    modalQuickY.current?.(y);
    cursorQuickX.current?.(x);
    cursorQuickY.current?.(y);
    labelQuickX.current?.(x);
    labelQuickY.current?.(y);
  };

  const handleHover = (isActive: boolean, i: number, x: number, y: number) => {
    if (isTouch) return;
    move(x, y);
    setModal({ active: isActive, index: i });
  };

  return (
    <section
      className="relative mt-46 flex flex-col items-center"
      onMouseMove={(e) => move(e.clientX, e.clientY)}
    >
      {/* Desktop list */}
      <div className="mx-auto mb-16 hidden w-full max-w-7xl md:block">
        {PROJECTS.map((p, i) => (
          <ProjectRow
            key={p.title}
            index={i}
            title={p.title}
            role={p.role}
            onHoverChange={handleHover}
            disabled={isTouch}
          />
        ))}
      </div>

      {/* Mobile accordion */}
      <div className="mx-auto mb-16 w-full max-w-7xl md:hidden">
        <MobileAccordion projects={PROJECTS} />
      </div>

      {/* CTA */}
      <div className="mt-6">
        <RoundedButton backgroundColor="#6366F1">
          <p>More Work</p>
        </RoundedButton>
      </div>

      {/* Hover UI (desktop only) */}
      {!isTouch && (
        <>
          {/* Modal */}
          <div
            ref={modalWrap}
            className="fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40"
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

          {/* Cursor halo */}
          <div
            ref={cursorWrap}
            className="fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40"
            style={{ top: "50%", left: "50%" }}
          >
            <motion.div
              variants={scaleVariant}
              initial="initial"
              animate={active ? "enter" : "closed"}
              className="h-16 w-16 rounded-full bg-purple-600 shadow-[0_20px_60px_rgba(99,102,241,0.45)]"
            />
          </div>

          {/* Label */}
          <div
            ref={labelWrap}
            className="fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[41]"
            style={{ top: "50%", left: "50%" }}
          >
            <motion.div
              variants={scaleVariant}
              initial="initial"
              animate={active ? "enter" : "closed"}
              className="flex h-16 w-16 items-center justify-center text-white font-light select-none"
            >
              View
            </motion.div>
          </div>
        </>
      )}
    </section>
  );
}
