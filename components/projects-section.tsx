  "use client";

  import React, { useEffect, useRef, useState } from "react";
  import Image from "next/image";
  import gsap from "gsap";
import { motion, Variants } from "framer-motion";
import { projects } from "@/data";

  type Project = {
    title: string;
    src: string;
    color?: string;
    role?: string;
    url?: string;
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

  function ProjectRow({
    index,
    title,
    role,
    url,
    onHoverChange,
  }: {
    index: number;
    title: string;
    role?: string;
    url?: string;
    onHoverChange: (active: boolean, idx: number, x: number, y: number) => void;
  }) {
    const handleEnter = (e: React.MouseEvent<HTMLElement>) =>
      onHoverChange(true, index, e.clientX, e.clientY);

    const handleLeave = (e: React.MouseEvent<HTMLElement>) =>
      onHoverChange(false, index, e.clientX, e.clientY);

    const commonProps = {
      onMouseEnter: handleEnter,
      onMouseLeave: handleLeave,
      className: `group relative flex w-full items-center justify-between rounded-3xl 
        border border-white/10 bg-white/[0.03] px-6 py-8
        transition-all duration-300 hover:bg-white/[0.05]${url ? " cursor-pointer" : ""}`,
    };

    const content = (
      <>
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
      </>
    );

    if (url) {
      return (
        <a
          {...commonProps}
          href={url}
          target="_blank"
          rel="noreferrer noopener"
        >
          {content}
        </a>
      );
    }

    return <div {...commonProps}>{content}</div>;
  }

  function ProjectCard({ project }: { project: Project }) {
    const isDisabled = !project.url;
    const roleLabel = project.role ?? "Design & Development";

    const cardContent = (
      <>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.src}
            alt={project.title}
            fill
            className={`object-cover transition-transform duration-300 ${!isDisabled ? "group-hover:scale-105" : ""}`}
          />
          {!project.url && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-xs uppercase tracking-widest text-white/60">No link</span>
            </div>
          )}
        </div>
        <div className="bg-white/[0.03] p-4 space-y-1">
          <h3 className={`font-semibold text-white ${isDisabled ? "text-white/60" : ""}`}>
            {project.title}
          </h3>
          <p className="text-xs uppercase tracking-[0.25em] text-white/50">
            {roleLabel}
          </p>
        </div>
      </>
    );

    if (isDisabled) {
      return (
        <div className="w-[85%] flex-shrink-0 snap-start cursor-not-allowed opacity-60">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            {cardContent}
          </div>
        </div>
      );
    }

    return (
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer noopener"
        className="group w-[85%] flex-shrink-0 snap-start cursor-pointer"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] active:scale-[0.98]">
          {cardContent}
        </div>
      </a>
    );
  }

  function DotsIndicator({ total, activeIndex }: { total: number; activeIndex: number }) {
    return (
      <div className="flex items-center justify-center gap-2 mt-6" role="tablist">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to project ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-6 bg-purple-400"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    );
  }

  function ProjectCarousel({ projects }: { projects: Project[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showHint, setShowHint] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
      if (showHint) setShowHint(false);
      if (!containerRef.current) return;
      const { scrollLeft, offsetWidth } = containerRef.current;
      const cardWidth = offsetWidth / 0.85;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, projects.length - 1));
    };

    return (
      <div className="relative w-full">
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-[7.5%]"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
        <DotsIndicator total={projects.length} activeIndex={activeIndex} />
      </div>
    );
  }

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
          Recent Projects
        </h2>

        {/* Desktop List */}
        <div className="mx-auto w-full max-w-6xl space-y-6 hidden md:block">
          {projects.map((p, i) => (
            <ProjectRow
              key={p.title}
              index={i}
              title={p.title}
              role={p.role}
              url={p.url}
              onHoverChange={handleHover}
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="mx-auto mt-10 w-full md:hidden">
          <ProjectCarousel projects={projects} />
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
