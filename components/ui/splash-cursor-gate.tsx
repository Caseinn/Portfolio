"use client";

import { useEffect, useState } from "react";
import SplashCursor from "@/components/ui/splash-cursor";
import {
  useCoarsePointer,
  usePrefersReducedMotion,
} from "@/lib/use-media-query";

/**
 * The fluid cursor is a continuous WebGL animation, so it is skipped for
 * users who asked for reduced motion and for coarse pointers, where there is
 * no cursor to follow.
 */
export function SplashCursorGate() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const coarsePointer = useCoarsePointer();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || prefersReducedMotion || coarsePointer) return null;

  return <SplashCursor />;
}
