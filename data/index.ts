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