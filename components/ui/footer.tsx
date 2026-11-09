"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { socialMedia } from "@/data";
import { contactEmail } from "@/lib/site";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden px-5 pb-8 pt-24 md:px-8 md:pt-32 lg:px-12"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        <div className="grid gap-14 border-b border-bone/20 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <h2 className="display-tight max-w-[12ch] text-balance text-[clamp(2.8rem,6vw,6rem)] font-semibold uppercase text-bone">
              Have a website or app in mind?
            </h2>

            <a
              href={`mailto:${contactEmail}`}
              className="group mt-9 inline-flex items-baseline gap-3 border-b border-signal pb-2 text-[clamp(1.05rem,2.5vw,1.9rem)] font-medium text-signal"
            >
              {contactEmail}
              <ArrowUpRight
                size={20}
                weight="bold"
                className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <div className="mt-7 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/65">
              <span className="inline-block h-1.5 w-1.5 bg-signal" />
              Available for work
            </div>
          </div>

          <div className="lg:pt-1">
            <div className="space-y-3 border-t border-bone/20 pt-4 text-sm leading-relaxed text-bone/75">
              <p>Based in Lampung, Indonesia.</p>
              <p>I build the interface and the server, and keep the site running.</p>
            </div>

            <div className="mt-8">
              {socialMedia.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${social.name}, opens in a new tab`}
                    className="group flex items-center justify-between border-b border-bone/15 py-3 transition-colors hover:border-bone/35"
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        className="h-[14px] w-[14px] text-bone/60 transition-colors group-hover:text-signal"
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/65 transition-colors group-hover:text-bone">
                        {social.name}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={14}
                      weight="bold"
                      className="text-bone/55 transition-colors group-hover:text-signal"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Dito Rifki Irawan. All rights reserved.
          </p>
          <p>Caseinn / Portfolio</p>
        </div>

        <p
          aria-hidden="true"
          className="display-tight pointer-events-none mt-10 select-none pb-4 text-center text-[clamp(4rem,15.5vw,15rem)] font-semibold uppercase leading-none text-bone/10"
        >
          Caseinn
        </p>
      </div>
    </footer>
  );
}
