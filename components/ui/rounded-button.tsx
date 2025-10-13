"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import Magnet from "@/components/ui/magnet";
import { cn } from "@/lib/utils";

type RoundedButtonProps = {
  children: React.ReactNode;
  backgroundColor?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RoundedButton({
  children,
  backgroundColor = "#455CE9",
  className,
  ...props
}: RoundedButtonProps) {
  const circleRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!circleRef.current) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(
      circleRef.current,
      { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" },
      "enter"
    ).to(
      circleRef.current,
      { top: "-150%", width: "125%", duration: 0.25, ease: "power3.out" },
      "exit"
    );

    timelineRef.current = tl;

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      tl.kill();
    };
  }, []);

  const onEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timelineRef.current?.tweenFromTo("enter", "exit");
  }, []);

  const onLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      timelineRef.current?.play();
    }, 300);
  }, []);

  return (
    <Magnet>
      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className={cn(
          "relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-neutral-500 px-10 py-3 transition-colors duration-300 text-white",
          className
        )}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <div
          ref={circleRef}
          className="absolute top-full h-[150%] w-full rounded-full"
          style={{ backgroundColor }}
        />
      </div>
    </Magnet>
  );
}
