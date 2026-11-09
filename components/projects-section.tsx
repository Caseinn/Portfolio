"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { projects, type Project } from "@/data";
import { cn } from "@/lib/utils";

const GRID_COLUMNS =
  "grid-cols-[3.5rem_minmax(0,1fr)_9rem_7rem_1.5rem]";

const padNumber = (value: number) => String(value).padStart(2, "0");

const projectStatus = (project: Project) => (project.url ? "Live" : "Archive");

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const content = (
    <>
      <div className="border-[5px] border-frame bg-wall-2 p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
        <div className="relative aspect-[16/10] overflow-hidden bg-wall-2">
          <Image
            src={project.src}
            alt={project.title}
            fill
            sizes="82vw"
            className={cn(
              "object-cover transition-transform duration-500",
              project.url && "group-hover:scale-[1.025]",
            )}
          />
          {!project.url && (
            <div className="absolute inset-0 flex items-center justify-center bg-wall/72">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/70">
                Archive / no public link
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-start justify-between gap-5 border-t border-bone/20 pt-3">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-signal/80">
            {padNumber(index + 1)}
          </p>
          <h3 className="mt-1 text-xl font-medium uppercase tracking-[-0.03em] text-bone">
            {project.title}
          </h3>
        </div>
        <span className="mt-0.5 shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/60">
          {projectStatus(project)}
        </span>
      </div>
    </>
  );

  const className = cn(
    "group block w-[82vw] max-w-[380px] shrink-0 snap-start",
    project.url ? "cursor-pointer" : "cursor-default",
  );

  if (!project.url) {
    return <div className={className}>{content}</div>;
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
    >
      {content}
    </a>
  );
}

export default function ProjectsSection() {
  const [active, setActive] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const carouselRef = useRef<HTMLDivElement>(null);

  const movePreview = (clientX: number, clientY: number) => {
    const width = 380;
    const height = 286;
    setPreviewPosition({
      x: Math.max(12, Math.min(clientX + 26, window.innerWidth - width - 12)),
      y: Math.max(12, Math.min(clientY - 120, window.innerHeight - height - 12)),
    });
  };

  const handleEnter = (
    event: React.MouseEvent<HTMLAnchorElement>,
    index: number,
  ) => {
    setActive(index);
    movePreview(event.clientX, event.clientY);
  };

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    movePreview(event.clientX, event.clientY);
  };

  const handleCarouselScroll = () => {
    const container = carouselRef.current;
    if (!container) return;
    const firstCard = container.firstElementChild as HTMLElement | null;
    if (!firstCard) return;
    const step = firstCard.offsetWidth + 20;
    const nextIndex = Math.min(
      Math.round(container.scrollLeft / step),
      projects.length - 1,
    );
    setActiveIndex(nextIndex);
  };

  const goToCard = (index: number) => {
    const container = carouselRef.current;
    const card = container?.children[index] as HTMLElement | undefined;
    if (!container || !card) return;
    container.scrollTo({
      left: card.offsetLeft - 20,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="projects"
      className="border-b border-bone/20 px-5 py-24 md:px-8 md:py-32 lg:px-12"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="flex flex-col gap-7 border-b border-bone/20 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="display-tight text-[clamp(2.8rem,5.6vw,5.2rem)] font-semibold uppercase text-bone">
              Recent projects
            </h2>
          </div>
        </div>

        {/* Desktop checklist */}
        <div className="mt-2 hidden md:block">
          <div className={`grid ${GRID_COLUMNS} gap-4 border-b border-bone/20 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/60`}>
            <span>No.</span>
            <span>Work</span>
            <span>Discipline</span>
            <span>Status</span>
            <span />
          </div>

          {projects.map((project, index) => {
            const rowClassName = `group grid ${GRID_COLUMNS} items-baseline gap-4 border-b border-bone/20 py-6`;
            const rowContent = (
              <>
                <span className="font-mono text-[10px] tracking-[0.16em] text-signal/85">
                  {padNumber(index + 1)}
                </span>
                <h3 className="text-[clamp(1.6rem,3.2vw,3rem)] font-medium uppercase leading-none tracking-[-0.035em] text-bone transition-colors duration-200 group-hover:text-signal">
                  {project.title}
                </h3>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-bone/65">
                  {project.role ?? "Development"}
                </span>
                <span
                  className={cn(
                    "flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em]",
                    project.url ? "text-bone/65" : "text-bone/55",
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-1.5 w-1.5",
                      project.url ? "bg-signal" : "border border-bone/30",
                    )}
                  />
                  {projectStatus(project)}
                </span>
                <span className="justify-self-end text-bone/55 transition-colors duration-200 group-hover:text-signal">
                  {project.url ? (
                    <ArrowUpRight size={15} weight="bold" />
                  ) : (
                    <span className="font-mono text-[11px]">—</span>
                  )}
                </span>
              </>
            );

            if (!project.url) {
              return (
                <div key={project.title} className={rowClassName}>
                  {rowContent}
                </div>
              );
            }

            return (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(rowClassName, "cursor-pointer")}
                onMouseEnter={(event) => handleEnter(event, index)}
                onMouseMove={handleMove}
                onMouseLeave={() => setActive(null)}
              >
                {rowContent}
              </a>
            );
          })}
        </div>

        {/* Mobile plates */}
        <div className="mt-10 md:hidden">
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/60">
              {padNumber(activeIndex + 1)} / {padNumber(projects.length)}
            </span>
            <div className="flex items-center gap-2" aria-label="Project slides">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  aria-current={index === activeIndex ? "true" : undefined}
                  aria-label={`Show ${project.title}`}
                  onClick={() => goToCard(index)}
                  className={cn(
                    "h-1.5 transition-all duration-300",
                    index === activeIndex
                      ? "w-7 bg-signal"
                      : "w-3 bg-bone/50 hover:bg-bone/70",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hover plate */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ left: previewPosition.x, top: previewPosition.y }}
            className="pointer-events-none fixed z-50 hidden md:block"
            aria-hidden="true"
          >
            <div className="w-[380px] border-[5px] border-frame bg-wall-2 p-1.5 shadow-[0_26px_60px_rgba(0,0,0,0.5)]">
              <div className="relative aspect-[16/10] overflow-hidden bg-wall-2">
                <Image
                  src={projects[active].src}
                  alt=""
                  fill
                  sizes="380px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-2.5 font-mono text-[9px] uppercase tracking-[0.16em]">
                <span className="truncate text-bone/70">
                  {padNumber(active + 1)} / {projects[active].title}
                </span>
                <span className="shrink-0 text-signal">
                  {projectStatus(projects[active])}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
