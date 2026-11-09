"use client";

import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
} from "@/components/ui/marquee";
import { usePrefersReducedMotion } from "@/lib/use-media-query";
import {
  SiAstro,
  SiCss3,
  SiDrizzle,
  SiFirebase,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPytorch,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbPyramid } from "react-icons/tb";
import type { IconType } from "react-icons";

const techStack: { name: string; icon: IconType }[] = [
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: SiCss3 },
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "PHP", icon: SiPhp },
  { name: "Python", icon: SiPython },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Astro", icon: SiAstro },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Laravel", icon: SiLaravel },
  { name: "Pyramid", icon: TbPyramid },
  { name: "PyTorch", icon: SiPytorch },
  { name: "MySQL", icon: SiMysql },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Prisma", icon: SiPrisma },
  { name: "Drizzle", icon: SiDrizzle },
  { name: "Supabase", icon: SiSupabase },
  { name: "Firebase", icon: SiFirebase },
];

const LogoMarquee = () => {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      id="stack"
      aria-label="Tools and technologies"
      className="border-b border-bone/20 py-5"
    >
      <div className="mx-auto flex max-w-[1600px] items-center gap-8 px-5 md:px-8 lg:px-12">
        <span className="label-caps hidden shrink-0 text-bone/60 md:block">
          Stack
        </span>
        <div className="sr-only">
          <ul>
            {techStack.map((tech) => (
              <li key={tech.name}>{tech.name}</li>
            ))}
          </ul>
        </div>
        <Marquee className="min-w-0 flex-1" aria-hidden="true">
          <MarqueeContent
            speed={26}
            gradient={false}
            pauseOnHover
            play={!reduceMotion}
          >
            {techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <MarqueeItem
                  key={tech.name}
                  className="mx-5 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/70"
                >
                  <Icon className="h-4 w-4 shrink-0 text-bone" aria-hidden="true" />
                  <span>{tech.name}</span>
                  <span className="text-signal/55" aria-hidden="true">
                    /
                  </span>
                </MarqueeItem>
              );
            })}
          </MarqueeContent>
        </Marquee>
      </div>
    </section>
  );
};

export default LogoMarquee;
