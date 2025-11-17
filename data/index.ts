import { FaGithub, FaInstagram, FaLinkedin, FaRegAddressCard } from "react-icons/fa";
import { PiSuitcase } from "react-icons/pi";
import { MdOutlineMailOutline } from "react-icons/md";

export const navItems = [
  { name: "About", link: "#about", icon: FaRegAddressCard },
  { name: "Projects", link: "#projects", icon: PiSuitcase },
  { name: "Contact", link: "#contact", icon: MdOutlineMailOutline },
  ];  
  
export const socialMedia = [
  {
    id: 1,
    icon: FaGithub,
    url: "https://github.com/Caseinn",
  },
  {
    id: 2,
    icon: FaInstagram,
    url: "https://instagram.com/ditorifkii",
  },
  {
    id: 3,
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/ditorifkiirawan/",
  },
];

export const projects = [
  { title: "Portfolio", src: "/projects/p1.webp", role: "Design & Development" },
  { title: "GKA Energy", src: "/projects/p5.webp", role: "Design & Development", url: "https://www.gkaenergy.co.id/" },
  { title: "SuaraAziz", src: "/projects/p10.webp", role: "Design & Development", url: "https://suaraziz.vercel.app/" },
  { title: "Praktikum ASD", src: "/projects/p6.webp", role: "Design & Development", url: "https://praktikum-asd-rd.vercel.app/" },
  { title: "Duotone Filter", src: "/projects/p8.webp", role: "Design & Development", url: "https://duotone-app-psi.vercel.app/" },
  { title: "EduSolver", src: "/projects/p7.webp", role: "Design & Development", url: "https://www.edusolver.site/" },
  { title: "Nel's Kitchen", src: "/projects/p9.webp", role: "Design & Development" },
  { title: "Wisata Suka Marga", src: "/projects/p11.webp", role: "Development", url: "https://www.wisatasukamarga.my.id/" },
  { title: "HarusGerak", src: "/projects/p3.webp", role: "Design & Development" },
  { title: "PPLK ITERA 2024", src: "/projects/p2.webp", role: "Development" },
  { title: "Ghost Jump", src: "/projects/p4.webp", role: "Design & Development" },
];
