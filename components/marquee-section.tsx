'use client';

import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
} from '@/components/ui/marquee';

const techStack = [
  // --- Core Web ---
  { name: 'HTML', icon: 'devicon-html5-plain original' },
  { name: 'CSS', icon: 'devicon-css3-plain original' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain original' },
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain original' },

  // --- Frontend Frameworks ---
  { name: 'React', icon: 'devicon-react-original original' },
  { name: 'Next.js', icon: 'devicon-nextjs-plain' },
  { name: 'Astro', icon: 'devicon-astro-plain original' },

  // --- Backend & Languages ---
  { name: 'PHP', icon: 'devicon-php-plain original' },
  { name: 'Laravel', icon: 'devicon-laravel-plain original' },
  { name: 'Python', icon: 'devicon-python-plain original' },
  { name: 'Pyramid', icon: null },

  // --- Database / Services ---
  { name: 'MySQL', icon: 'devicon-mysql-plain original' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain original' },
  { name: 'Prisma', icon: 'devicon-prisma-original' },
  { name: 'Supabase', icon: 'devicon-supabase-plain original' },
  { name: 'Firebase', icon: 'devicon-firebase-plain original' },
];


const LogoMarquee = () => (
  <div className="flex w-full items-center justify-center">
    <Marquee className="py-2">
      <MarqueeContent>
        {techStack.map((tech, index) => (
          <MarqueeItem
            key={index}
            className="mx-2 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.75rem] text-white/80 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm"
          >
            {tech.icon ? (
              <i className={`${tech.icon} text-xl`}></i>
            ) : (
              <span className="font-semibold text-white/90">#</span>
            )}

            <span>{tech.name}</span>
          </MarqueeItem>
        ))}
      </MarqueeContent>
    </Marquee>
  </div>
);

export default LogoMarquee;