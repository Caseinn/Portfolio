"use client";
import React, { useEffect, useState } from "react";
import { socialMedia } from "@/data";
import Magnet from "@/components/ui/magnet";
import Image from "next/image";

const Footer = () => {
  const [disableMagnet, setDisableMagnet] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sub = () => setDisableMagnet(mq.matches);
    sub();
    mq.addEventListener?.("change", sub);
    return () => mq.removeEventListener?.("change", sub);
  }, []);

  return (
    <footer className="relative w-full pt-20 pb-10" id="contact">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[30vh] select-none opacity-50"
        aria-hidden="true"
      >
        <Image
          src="/footer-grid.svg"
          alt="Footer grid background"
          width={1920}
          height={1080}
          priority
          className="h-full w-full object-cover opacity-50 [mask-image:linear-gradient(to_top,black_45%,transparent_95%)]"
        />
      </div>

      <div className="relative z-10 mt-16 flex flex-col items-center md:flex-row">
        <div className="ml-auto flex items-center gap-6 md:gap-3">
          {socialMedia.map(({ id, icon: Icon, url }) => (
            <Magnet
              key={id}
              disabled={disableMagnet}
              magnetStrength={5}
              wrapperClassName="inline-block"
            >
              <button
                type="button"
                onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
                aria-label={url}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-black-300 bg-black-200/75 backdrop-blur-lg backdrop-saturate-150 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <Icon className="text-xl text-white" />
              </button>
            </Magnet>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
