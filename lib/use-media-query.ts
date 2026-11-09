"use client";

import { useEffect, useState } from "react";

/**
 * One-shot, SSR-safe media query read for use inside effects or event handlers.
 * Returns false during server rendering.
 */
export function matches(query: string): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
}

/**
 * Reactive media query subscription. Starts at `false` so server and client
 * render identically, then syncs after mount and on every change.
 */
export function useMediaQuery(query: string): boolean {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setIsMatch(mql.matches);

    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return isMatch;
}

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const usePrefersReducedMotion = () =>
  useMediaQuery(REDUCED_MOTION_QUERY);
