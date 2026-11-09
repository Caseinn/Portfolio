import {
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { socialLinks } from "@/lib/site";

const socialIcons = {
  GitHub: GithubLogo,
  Instagram: InstagramLogo,
  LinkedIn: LinkedinLogo,
} as const;

export const socialMedia = socialLinks.map((social) => ({
  ...social,
  icon: socialIcons[social.name],
}));

export type Project = {
  title: string;
  src: string;
  role?: string;
  url?: string;
};

export const projects: Project[] = [
  { title: "Dito Digital Printing", src: "/projects/p13.webp", role: "Development", url: "https://www.ditodigitalprinting.my.id/" },
  { title: "Harian Muslim", src: "/projects/p12.webp", role: "Development", url: "https://muslim.caseinn.web.id/" },
  { title: "GKA Energy", src: "/projects/p5.webp", role: "Development", url: "https://www.gkaenergy.co.id/" },
  { title: "SuaraAziz", src: "/projects/p10.webp", role: "Development", url: "https://suaraziz.caseinn.web.id/" },
  { title: "Praktikum ASD", src: "/projects/p6.webp", role: "Development", url: "https://praktikum-asd-rd.vercel.app/" },
  { title: "Duotone Filter", src: "/projects/p8.webp", role: "Development", url: "https://duotone.caseinn.web.id/" },
  { title: "EduSolver", src: "/projects/p7.webp", role: "Development" },
  { title: "Nel's Kitchen", src: "/projects/p9.webp", role: "Development" },
  { title: "Ghost Jump", src: "/projects/p4.webp", role: "Development" },
];
