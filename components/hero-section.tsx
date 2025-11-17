import React from "react";
import Image from "next/image";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-effect";
import MagicButton from "@/components/ui/magic-button";
import { FaLocationArrow } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative isolate flex items-center justify-center min-h-[calc(100vh-80px)] py-16 sm:py-20 lg:py-0"
    >
      {/* grid layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-grid-white grid-98 grid-stroke-2 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]"
        aria-hidden="true"
      />

      {/* spotlights */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Spotlight className="-top-32 left-0 h-[70vh] w-[70vw]" fill="white" />
        <Spotlight className="top-10 left-1/3 h-[60vh] w-[60vw]" fill="purple" />
        <Spotlight className="top-28 right-0 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl pt-15 px-5 md:px-8">
        <div className="grid items-center gap-12 md:gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,360px)]">
          {/* Text */}
          <div className="space-y-6 text-center lg:text-left">
            <TextGenerateEffect
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
              words="Building things on the internet"
            />

            <p className="mx-auto max-w-xl text-base text-white/80 sm:text-lg md:text-xl lg:mx-0 lg:max-w-2xl">
              I’m Dito Rifki Irawan — Caseinn — a developer who enjoys learning, building, and
              solving problems through technology. I love exploring new ideas, improving systems,
              and creating things that are useful and meaningful.
            </p>

            {/* ✅ Buttons container – now centered on mobile, bigger button */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <a
                href="#projects"
                className="mx-auto w-full max-w-xs sm:mx-0 sm:w-auto sm:max-w-none"
              >
                <div className="scale-110 sm:scale-105">
                  <MagicButton
                    title="Browse projects"
                    icon={<FaLocationArrow />}
                    position="right"
                  />
                </div>
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md">
            <div
              className="absolute inset-0 -z-10 rounded-[36px] bg-gradient-to-br from-purple-500/30 via-indigo-400/40 to-transparent blur-3xl"
              aria-hidden="true"
            />
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-3 backdrop-blur-2xl">
              <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-b from-white/5 to-black/40">
                <Image
                  src="/me.webp"
                  alt="Portrait of Caseinn"
                  width={480}
                  height={640}
                  priority
                  className="h-[340px] w-full object-cover sm:h-[400px] md:h-[440px]"
                />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/60 px-4 py-2 text-xs text-white/85 backdrop-blur-lg">
                  <p className="font-semibold text-white">Based in Lampung, ID</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
