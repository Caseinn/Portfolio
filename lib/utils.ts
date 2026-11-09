import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const navControlClass =
  "h-10 cursor-pointer items-center justify-center border border-bone/30 text-bone transition-colors hover:border-signal hover:text-signal";

export const actionLinkClass =
  "group inline-flex items-center gap-2 border-b border-bone/30 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/70 transition-colors hover:border-signal hover:text-signal";
