  "use client";

  import React, { useEffect, useRef, useState } from "react";
  import Image from "next/image";
  import gsap from "gsap";
  import { motion, Variants, AnimatePresence } from "framer-motion";
  import { ChevronRight } from "lucide-react";
  import { projects } from "@/data";

  type Project = {
    title: string;
    src: string;
    color?: string;
    role?: string;
  };

  const scaleVariant: Variants = {
    initial: { scale: 0 },
    enter: {
      scale: 1,
      transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      scale: 0,
      transition: { duration: 0.25, ease: [0.32, 0, 0.67, 0] },
    },
  };

  function useIsTouch(): boolean {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
      if (typeof window === "undefined") return;
      setIsTouch(
        window.matchMedia("(pointer: coarse)").matches ||
          navigator.maxTouchPoints > 0
      );
    }, []);

    return isTouch;
  }

  /* --------------------------------------- */
  /* DESKTOP ROW — role moved to end         */
  /* --------------------------------------- */
  function ProjectRow({
    index,
    title,
    role,
    onHoverChange,
  }: {
    index: number;
    title: string;
    role?: string;
    onHoverChange: (active: boolean, idx: number, x: number, y: number) => void;
  }) {
    const handleEnter = (e: React.MouseEvent<HTMLDivElement>) =>
      onHoverChange(true, index, e.clientX, e.clientY);

    const handleLeave = (e: React.MouseEvent<HTMLDivElement>) =>
      onHoverChange(false, index, e.clientX, e.clientY);

    return (
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="group relative flex w-full items-center justify-between rounded-3xl 
        border border-white/10 bg-white/[0.03] px-6 py-8
        transition-all duration-300 hover:bg-white/[0.05]"
      >
        {/* Left: Title */}
        <h3
          className="
            text-3xl md:text-[40px] font-semibold text-white
            transition-colors duration-300
            group-hover:text-purple-300
          "
        >
          {title}
        </h3>

        {/* Right: Role */}
        <p className="mt-1 text-sm uppercase tracking-[0.25em] text-white/50 text-right">
          {role ?? "Design & Development"}
        </p>
      </div>
    );
  }

  /* --------------------------------------- */
  /* MOBILE ACCORDION (unchanged)           */
  /* --------------------------------------- */
  function MobileAccordion({ projects }: { projects: Project[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
      <div className="w-full space-y-4">
        {projects.map((p, i) => {
          const isOpen = openIndex === i;
          const focusLabel = p.role ?? "Design & Development";

          return (
            <div
              key={p.title}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5
                text-left text-white"
              >
                <div>
                  <p className="text-lg font-semibold">{p.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/50">
                    {focusLabel}
                  </p>
                </div>

                <ChevronRight
                  className={`h-5 w-5 transition-transform duration-300 ${
                    isOpen ? "rotate-90 text-purple-400" : "text-white/60"
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 space-y-3">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-white/10">
                        <Image
                          src={p.src}
                          alt={p.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm text-white/70">{focusLabel}</p>
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

  /* --------------------------------------- */
  /* MAIN SECTION — Now includes "Recent Works" */
  /* --------------------------------------- */
  export default function ProjectsSection() {
    const isTouch = useIsTouch();
    const [modal, setModal] = useState({ active: false, index: 0 });
    const modalRef = useRef<HTMLDivElement>(null);

    const move = (x: number, y: number) => {
      const el = modalRef.current;
      if (!el) return;

      gsap.to(el, {
        left: x,
        top: y,
        duration: 0.18,
        ease: "power3.out",
      });
    };

    const handleHover = (
      active: boolean,
      index: number,
      x: number,
      y: number
    ) => {
      setModal({ active, index });
      move(x, y);
    };

    useEffect(() => {
      if (!modal.active) return;

      const onMove = (e: MouseEvent) => move(e.clientX, e.clientY);
      window.addEventListener("mousemove", onMove);

      return () => window.removeEventListener("mousemove", onMove);
    }, [modal.active]);

    return (
      <section
        id="projects"
        className="relative flex flex-col items-center px-4 py-20 md:px-6"
        onMouseMove={(e) => modal.active && move(e.clientX, e.clientY)}
      >
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-12 tracking-tight">
          Recent Works
        </h2>

        {/* Desktop List */}
        <div className="mx-auto w-full max-w-6xl space-y-6 hidden md:block">
          {projects.map((p, i) => (
            <ProjectRow
              key={p.title}
              index={i}
              title={p.title}
              role={p.role}
              onHoverChange={handleHover}
            />
          ))}
        </div>

        {/* Mobile Accordion */}
        <div className="mx-auto mt-10 w-full max-w-2xl md:hidden">
          <MobileAccordion projects={projects} />
        </div>

        {/* Hover Modal */}
        {!isTouch && (
          <div
            ref={modalRef}
            className="pointer-events-none fixed z-40 -translate-x-1/2 -translate-y-1/2"
            style={{ top: "50%", left: "50%" }}
          >
            <motion.div
              variants={scaleVariant}
              initial="initial"
              animate={modal.active ? "enter" : "closed"}
              className="h-[240px] w-[380px] overflow-hidden rounded-3xl border border-white/15 
              bg-black/80 shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            >
              <div
                className="relative h-full w-full transition-[top] duration-500 
                [transition-timing-function:cubic-bezier(0.76,0,0.24,1)]"
                style={{ top: `${modal.index * -100}%` }}
              >
                {projects.map((p, i) => (
                  <div key={i} className="flex h-full w-full">
                    <Image
                      src={p.src}
                      alt={p.title}
                      width={380}
                      height={240}
                      className="h-full w-full object-cover"
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
