import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Asterisk,
} from "@phosphor-icons/react/dist/ssr";
import { actionLinkClass } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] items-center overflow-clip bg-wall px-5 py-16 md:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.18fr)_minmax(300px,0.82fr)] lg:gap-16">
          <div className="hero-fade">
            <p className="label-caps text-signal">404 / Not on the wall</p>

            <h1 className="display-tight mt-6 text-[clamp(3rem,10.5vw,9rem)] font-semibold uppercase text-bone">
              <span className="block">This wall</span>
              <span className="block text-signal">is empty.</span>
            </h1>

            <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-bone/78 md:text-[18px]">
              The page you followed was moved, removed, or never hung. Head back
              to the exhibition and pick up from the entrance.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/" className={actionLinkClass}>
                Back to the entrance
                <ArrowLeft
                  size={13}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
              </Link>

              <Link href="/#projects" className={actionLinkClass}>
                Browse projects
                <ArrowUpRight
                  size={13}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          <figure
            className="relative mx-auto w-full max-w-[420px] lg:ml-auto"
            aria-hidden="true"
          >
            <div className="absolute right-0 top-[46%] hidden h-px w-[calc(100%+2.5rem)] bg-bone/20 lg:block" />
            <div className="relative z-10 border-[6px] border-frame bg-wall-2 p-2 shadow-[0_28px_70px_rgba(0,0,0,0.38)]">
              <div className="flex aspect-[4/5] flex-col items-center justify-center gap-6 bg-wall-2 px-6 text-center">
                <Asterisk size={104} weight="bold" className="text-signal" />
                <p className="label-caps text-bone/55">Nothing on this wall</p>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </main>
  );
}
