import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export const navItems = [
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },
  ];
  
  export const gridItems = [
    {
      id: 1,
      title: "I love coding, teaching, and working on exciting tech projects.",
      description: "",
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
      imgClassName: "w-full h-full",
      titleClassName: "justify-end",
      img: "/b1.svg",
      spareImg: "",
    },
    {
      id: 2,
      title: "I'm currently studying Informatics Engineering at ITERA",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 bottom-0 w-96 opacity-50",
      titleClassName: "justify-start",
      img: "/b2.png",
      spareImg: "",
    },
    {
      id: 3,
      title: "My Tech Stack",
      description: "Leveling up",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "",
      spareImg: "",
    },
    {
      id: 4,
      title: "Tech enthusiast with a passion for development.",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "/grid.svg",
      spareImg: "/b4.svg",
    },
  
    {
      id: 5,
      title: "Currently diving into Next.js",
      description: "",
      className: "md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
      titleClassName: "justify-center md:justify-start lg:justify-center",
      img: "/b5.svg",
      spareImg: "/grid.svg",
    },
    {
      id: 6,
      title: "Do you want to start a project together?",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60 text-center",
      img: "",
      spareImg: "",
    },
  ];
  
  export const projects = [
    {
      id: 1,
      title: "Portfolio",
      des: "This portfolio website showcases my projects, offering a glimpse into my journey as a developer.",
      img: "/p1.png",
      iconLists: ["/next.svg", "/re.svg", "/ts.svg", "/tail.svg"],
      link: "/ui.earth.com",
    },
    {
      id: 2,
      title: "PPLK ITERA 2024",
      des: 'PPLK ITERA 2024 is a website created to assist new students in navigating and connecting with the campus community',
      img: "/p2.png",
      iconLists: ["/vite.svg", "/re.svg", "/inertia.svg", "/tail.svg", "/ts.svg", "/laravel.svg"],
      link: "/ui.yoom.com",
    },    
    {
      id: 3,
      title: "HarusGerak",
      des: "HarusGerak is a website designed to meet the needs of individuals seeking to maintain their health and fitness amidst daily busyness.",
      img: "/p3.png",
      iconLists: ["/vite.svg", "/re.svg", "/inertia.svg", "/tail.svg", "/ts.svg", "/laravel.svg"],
      link: "/ui.aiimg.com",
    },
    {
      id: 4,
      title: "Ghost Jump",
      des: "Ghost Jump is a desktop casual arcade game where you control your chosen ghost and try to survive as long as possible by jumping and collecting points.",
      img: "/p4.png",
      iconLists: ["python.png"],
      link: "/ui.apple.com",
    },
  ];
  
  export const companies = [
    {
      id: 1,
      name: "cloudinary",
      img: "/cloud.svg",
      nameImg: "/cloudName.svg",
    },
    {
      id: 2,
      name: "appwrite",
      img: "/app.svg",
      nameImg: "/appName.svg",
    },
    {
      id: 3,
      name: "HOSTINGER",
      img: "/host.svg",
      nameImg: "/hostName.svg",
    },
    {
      id: 4,
      name: "stream",
      img: "/s.svg",
      nameImg: "/streamName.svg",
    },
    {
      id: 5,
      name: "docker.",
      img: "/dock.svg",
      nameImg: "/dockerName.svg",
    },
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