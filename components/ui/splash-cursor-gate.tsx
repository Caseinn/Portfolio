"use client";

import { useEffect, useState } from "react";
import SplashCursor from "@/components/ui/splash-cursor";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/use-media-query";

export function SplashCursorGate() {
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || reducedMotion || !finePointer) return null;

  return <SplashCursor />;
}
