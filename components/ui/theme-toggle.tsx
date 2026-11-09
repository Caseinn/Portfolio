"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { cn, navControlClass } from "@/lib/utils";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
  };
};

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = currentTheme();
    setTheme(current);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", current === "light" ? "#ece6d9" : "#16241d");
  }, []);

  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", next === "light" ? "#ece6d9" : "#16241d");
      localStorage.setItem(STORAGE_KEY, next);
      setTheme(next);
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const doc = document as ViewTransitionDocument;

    if (!doc.startViewTransition || reduceMotion) {
      apply();
      return;
    }

    const { clientX: x, clientY: y } = event;

    try {
      const transition = doc.startViewTransition(apply);
      transition.ready
        .then(() => {
          const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y),
          );
          const options = {
            duration: 620,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          } satisfies KeyframeAnimationOptions & { pseudoElement: string };

          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            options,
          );
        })
        .catch(() => {});
    } catch {
      apply();
    }
  };

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className={cn("inline-flex w-10 shrink-0", navControlClass, className)}
    >
      {isLight ? (
        <Moon size={17} weight="bold" />
      ) : (
        <Sun size={17} weight="bold" />
      )}
    </button>
  );
}
