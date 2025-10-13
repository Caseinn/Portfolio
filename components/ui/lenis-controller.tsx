"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function LenisController() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const easing: (t: number) => number = (t) =>
      Math.min(1, 1.001 - Math.pow(2, -10 * t));

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: !prefersReducedMotion,
      duration: prefersReducedMotion ? 0 : 1.2,
      easing,
      anchors: true, 
    });

    lenisRef.current = lenis;

    const onScroll = () => {
    };
    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
