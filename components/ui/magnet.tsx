// components/ui/magnet.tsx
"use client";

import React, { useState, useRef, HTMLAttributes, ReactNode } from "react";

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  disabled?: boolean;
  magnetStrength?: number;        // lower = stronger pull
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  disabled = false,
  magnetStrength = 6,
  activeTransition = "transform 180ms ease-out",
  inactiveTransition = "transform 360ms ease-in-out",
  wrapperClassName = "",
  innerClassName = "",
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    // cursor relative to center
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const offsetX = (e.clientX - cx) / magnetStrength;
    const offsetY = (e.clientY - cy) / magnetStrength;
    setIsActive(true);
    setPos({ x: offsetX, y: offsetY });
  };

  const handleLeave = () => {
    setIsActive(false);
    setPos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={wrapperClassName}
      style={{ position: "relative", display: "inline-block" }}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
