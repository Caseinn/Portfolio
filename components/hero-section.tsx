"use client";

import Image from "next/image";
import { ArrowDown, DownloadSimple } from "@phosphor-icons/react";
import { actionLinkClass } from "@/lib/utils";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center border-b border-bone/20 px-5 pb-16 pt-28 md:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.22fr)_minmax(300px,0.78fr)] lg:gap-16">
          <div>
            <h1 className="hero-line display-tight whitespace-normal text-[clamp(2.15rem,6.3vw,8rem)] font-semibold uppercase text-bone xl:whitespace-nowrap">
              <span>I build</span>
              <span className="text-signal">web apps,</span>
              <span>front to back</span>
            </h1>

            <div className="hero-fade mt-10">
              <p className="max-w-xl text-[16px] leading-relaxed text-bone/78 md:text-[18px]">
                I&apos;m Dito Rifki Irawan, goes by Caseinn. I build websites end to
                end and keep them running after launch.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a href="#projects" className={actionLinkClass}>
                  Browse projects
                  <ArrowDown
                    size={13}
                    weight="bold"
                    className="transition-transform duration-300 group-hover:translate-y-1"
                  />
                </a>

                <a
                  href="/CV-Dito%20Rifki%20Irawan.pdf"
                  download="Dito Rifki Irawan - CV.pdf"
                  className={actionLinkClass}
                >
                  Download CV
                  <DownloadSimple
                    size={13}
                    weight="bold"
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </div>

          <figure className="hero-hang relative ml-auto w-full max-w-[420px]">
            <div
              className="absolute right-0 top-[46%] hidden h-px w-[calc(100%+2.5rem)] bg-bone/20 lg:block"
              aria-hidden="true"
            />
            <div className="relative z-10 border-[6px] border-frame bg-wall-2 p-2 shadow-[0_28px_70px_rgba(0,0,0,0.38)]">
              <div className="relative aspect-[4/5] overflow-hidden bg-wall-2">
                <Image
                  src="/me.webp"
                  alt="Portrait of Dito Rifki Irawan (Caseinn)"
                  fill
                  priority
                  sizes="(min-width: 1024px) 32vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
