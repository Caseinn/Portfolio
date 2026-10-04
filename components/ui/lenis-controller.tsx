"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { matches, REDUCED_MOTION_QUERY } from "@/lib/use-media-query";

export default function LenisController() {
  useEffect(() => {
    const prefersReducedMotion = matches(REDUCED_MOTION_QUERY);

    const easing: (t: number) => number = (t) =>
      Math.min(1, 1.001 - Math.pow(2, -10 * t));

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: !prefersReducedMotion,
      duration: prefersReducedMotion ? 0 : 1.2,
      easing,
      anchors: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
