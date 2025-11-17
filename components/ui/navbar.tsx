"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

type NavItem = { name: string; link: string; icon?: React.ReactNode };

export const Navbar = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [compact, setCompact] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", () => {
    setCompact(scrollYProgress.get() > 0.03);
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    if (menuOpen && isMobile) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen, isMobile]);

  // close sheet when switching to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const targetWidth = isMobile
    ? undefined
    : compact
    ? "min(48rem, 72vw)"
    : "min(70rem, 90vw)";

  const navPadding = isMobile
    ? { paddingTop: 10, paddingBottom: 10, paddingLeft: 18, paddingRight: 18 }
    : { paddingTop: 12, paddingBottom: 12, paddingLeft: 24, paddingRight: 24 };

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 z-[5000] flex justify-center",
        "top-3 sm:top-4 md:top-5 px-3 md:px-4",
      )}
    >
      <motion.nav
        aria-label="Main navigation"
        animate={{
          width: targetWidth,
          borderRadius: 999,
          ...navPadding,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 30,
          ...(reducedMotion ? { duration: 0.001 } : {}),
        }}
        className={cn(
          "pointer-events-auto",
          "w-full md:w-auto",
          "max-w-[580px] md:max-w-5xl",
          "rounded-full border border-white/10 bg-black/50",
          "backdrop-blur-2xl shadow-[0_22px_60px_rgba(0,0,0,0.75)]",
          "flex items-center justify-between gap-3 md:gap-6",
          "transition-colors duration-300",
          "whitespace-nowrap",
          className,
        )}
        style={isMobile ? { width: "calc(100vw - 24px)" } : undefined}
      >
        {/* left logo / brand */}
        <div className="flex items-center gap-2 pl-1 pr-2 md:px-2">
          <div className="flex flex-col leading-tight text-xs font-semibold uppercase tracking-[0.18em] text-white/60 md:text-[11px]">
              Caseinn
          </div>
        </div>

        {/* nav links (desktop) */}
        <div className="hidden flex-1 items-center justify-center gap-2 text-xs font-medium md:flex md:text-sm">
          {navItems.map((item, i) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => setHoveredIndex(i)}
              onFocus={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onBlur={() => setHoveredIndex(null)}
            >
              <Link
                href={item.link}
                className={cn(
                  "relative z-10 flex items-center gap-2 rounded-full px-3.5 py-1.5",
                  "text-neutral-300 transition-all duration-200 ease-out",
                  "hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                )}
              >
                {item.icon && (
                  <span className="text-sm text-white/70">{item.icon}</span>
                )}
                <span>{item.name}</span>
              </Link>
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* cta / mobile trigger */}
        <div className="flex items-center gap-1 md:gap-2">
          <Link
            href="#contact"
            className={cn(
              "relative hidden overflow-hidden rounded-full px-4 py-1.5 text-xs font-semibold md:inline-flex md:text-sm",
              "bg-white text-black transition-all duration-300",
              "hover:-translate-y-0.5 hover:bg-white hover:shadow-lg",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
            )}
          >
            Let&apos;s talk
          </Link>
          <motion.button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-sheet"
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 md:hidden",
              "bg-white/5 text-white transition hover:bg-white/10 focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-white/80",
            )}
            onClick={() => setMenuOpen((prev) => !prev)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "menu"}
                initial={{ rotate: menuOpen ? -90 : 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: menuOpen ? 90 : -90, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex items-center justify-center"
              >
                {menuOpen ? (
                  <X size={18} strokeWidth={2} />
                ) : (
                  <Menu size={20} strokeWidth={1.8} />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* mobile sheet */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-[4800] bg-black/55 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              key="sheet"
              id="mobile-nav-sheet"
              className="fixed inset-x-3 top-[4.6rem] z-[4900] rounded-3xl border border-white/10 bg-gradient-to-b from-white/8 via-black/90 to-black/95 p-5 text-white backdrop-blur-2xl md:hidden"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
                  Navigation
                </span>
                <span className="text-[11px] text-white/35">
                  Tap to jump to section
                </span>
              </div>

              <div className="flex flex-col gap-2 text-base">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    className="rounded-2xl border border-white/6 px-4 py-3 text-white/85 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link
                href="#contact"
                className="mt-4 flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/95"
                onClick={() => setMenuOpen(false)}
              >
                Let&apos;s talk
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
