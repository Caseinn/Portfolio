"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Asterisk,
  Briefcase,
  EnvelopeSimple,
  List,
  UserCircle,
  X,
} from "@phosphor-icons/react";
import { cn, navControlClass } from "@/lib/utils";
import { contactEmail } from "@/lib/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const links = [
  { name: "About", href: "#about", id: "about", icon: UserCircle },
  { name: "Works", href: "#projects", id: "projects", icon: Briefcase },
  { name: "Contact", href: "#contact", id: "contact", icon: EnvelopeSimple },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    let frame = 0;

    const probe = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(window.scrollY > 24);

      if (progressRef.current) {
        const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
        progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
      }

      const marker = window.innerHeight * 0.35;
      let current = "";

      for (const link of links) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= marker && rect.bottom > marker) {
          current = link.id;
        }
      }

      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = links[links.length - 1].id;

      setActive(current);
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(probe);
    };

    probe();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-300",
        scrolled || open
          ? "border-bone/20 bg-wall/95"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between px-5 md:px-8 lg:px-12">
        <Link
          href="#home"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-2.5"
        >
          <Asterisk
            size={18}
            weight="bold"
            className="text-signal transition-transform duration-500 group-hover:rotate-90"
          />
          <span className="flex items-baseline gap-3">
            <span className="text-[13px] font-semibold uppercase tracking-[0.22em] text-bone">
              Caseinn
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-bone/60 sm:inline">
              Portfolio
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive = active === link.id;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "group relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-bone",
                  isActive ? "text-bone" : "text-bone/65",
                )}
              >
                <Icon
                  size={13}
                  weight={isActive ? "fill" : "bold"}
                  className={cn(
                    "transition-colors",
                    isActive ? "text-signal" : "text-signal/80",
                  )}
                />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href={`mailto:${contactEmail}`}
            className={cn(
              "hidden gap-2 px-4 font-mono text-[10px] uppercase tracking-[0.18em] md:flex",
              navControlClass,
            )}
          >
            Enquire
            <ArrowUpRight size={12} weight="bold" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className={cn("inline-flex w-10 md:hidden", navControlClass)}
          >
            {open ? <X size={18} weight="bold" /> : <List size={19} weight="bold" />}
          </button>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] overflow-hidden"
      >
        <div
          ref={progressRef}
          className="h-full origin-left bg-signal will-change-transform"
        />
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-bone/20 bg-wall px-5 pb-10 pt-8 md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {links.map((link) => {
              const isActive = active === link.id;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "flex items-center justify-between border-b border-bone/15 py-5 text-3xl font-medium uppercase tracking-[-0.03em]",
                    isActive ? "text-signal" : "text-bone",
                  )}
                >
                  <span className="flex items-center gap-4">
                    <Icon
                      size={28}
                      weight={isActive ? "fill" : "bold"}
                      className={isActive ? "text-signal" : "text-bone/50"}
                    />
                    {link.name}
                  </span>
                  <ArrowUpRight
                    size={24}
                    weight="bold"
                    className={isActive ? "text-signal" : "text-bone/30"}
                  />
                </Link>
              );
            })}
          </nav>
          <a
            href={`mailto:${contactEmail}`}
            className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/70"
          >
            {contactEmail}
            <ArrowUpRight size={13} weight="bold" />
          </a>
        </div>
      )}
    </header>
  );
}
