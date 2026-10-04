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
export const COARSE_POINTER_QUERY = "(pointer: coarse)";

export const usePrefersReducedMotion = () =>
  useMediaQuery(REDUCED_MOTION_QUERY);

export const useCoarsePointer = () => useMediaQuery(COARSE_POINTER_QUERY);

/**
 * Breakpoint check that reports `true` until the query has been resolved on
 * the client. Use this when picking which of two server-rendered layouts to
 * mount, so wide viewports never render the narrow layout first.
 */
export function useIsDesktop(query = "(min-width: 768px)") {
  const matches = useMediaQuery(query);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted ? matches : true;
}
