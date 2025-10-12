import React from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-effect";
import MagicButton from "@/components/ui/magic-button";
import { FaLocationArrow } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative pt-36 pb-20">
      {/* grid layer */}
      <div
        className="
          pointer-events-none absolute inset-0 z-0
          bg-grid-white dark:bg-grid-white grid-98 grid-stroke-2 opacity-40
          [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]
        "
        aria-hidden="true"
      />

      {/* spotlights */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/* content */}
      <div className="relative z-10 my-20 flex justify-center">
        <div className="flex max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex-col items-center justify-center">
          <h2 className="max-w-80 text-center text-xs uppercase tracking-widest text-blue-100">
            Portfolio
          </h2>

          <TextGenerateEffect
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Turning Ideas into Awesome Experiences"
          />

          <p className="text-white mb-4 text-center text-sm md:text-lg lg:text-2xl md:tracking-wider">
            Hi there! I&apos;m Caseinn, an Aspiring Developer.
          </p>

          <a href="#about">
            <MagicButton title="Learn More" icon={<FaLocationArrow />} position="right" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;