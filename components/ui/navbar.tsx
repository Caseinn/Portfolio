"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { navItems } from "@/data"; // ⬅️ PENTING: langsung import di sini
import type { IconType } from "react-icons";

// optional: type lokal kalau mau
type NavItem = {
  name: string;
  link: string;
  icon?: IconType;
};

export const Navbar = ({ className }: { className?: string }) => {
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
        {/* Brand – clickable */}
        <Link href="/" className="flex items-center gap-2 pl-1 pr-2 md:px-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80 hover:text-white transition md:text-[11px]">
            Caseinn
          </span>
        </Link>

        {/* Desktop Nav – aligned right */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-3 text-sm">
          {navItems.map((item, i) => {
            const Icon = item.icon as IconType | undefined;
            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link
                  href={item.link}
                  className={cn(
                    "relative z-10 flex items-center gap-2 rounded-full px-3.5 py-1.5",
                    "text-neutral-300 transition-all duration-200 ease-out",
                    "hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                  )}
                >
                  {Icon && <Icon size={15} className="text-white/70" />}
                  <span>{item.name}</span>
                </Link>

                {hoveredIndex === i && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Menu Trigger */}
        {isMobile && (
          <Popover open={menuOpen} onOpenChange={setMenuOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation menu"
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-full",
                  "bg-white/5 text-white transition hover:bg-white/10",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
                )}
              >
                {menuOpen ? (
                  <X size={18} strokeWidth={2} />
                ) : (
                  <Menu size={20} strokeWidth={1.8} />
                )}
              </button>
            </PopoverTrigger>

            <PopoverContent
              side="bottom"
              align="end"
              sideOffset={13}
              alignOffset={-12.8}
              className={cn(
                "w-[90vw] max-w-sm",
                "rounded-2xl border border-white/10",
                "bg-black/60 backdrop-blur-2xl",
                "shadow-[0_22px_60px_rgba(0,0,0,0.75)]",
                "px-4 py-6",
              )}
            >
              <div className="flex flex-col items-center gap-3">
                <nav className="flex w-full flex-col items-stretch gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon as IconType | undefined;
                    return (
                      <Link
                        key={item.name}
                        href={item.link}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "w-full rounded-2xl px-4 py-2.5",
                          "flex items-center justify-center gap-3",
                          "text-center text-[15px] font-medium text-white/85",
                          "transition hover:bg-white/5 hover:text-white",
                        )}
                      >
                        {Icon && <Icon size={18} className="text-white/85" />}
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </motion.nav>
    </div>
  );
};
