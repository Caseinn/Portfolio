import Hero from "@/components/hero-section";
import Description from "@/components/description-section";
import Projects from "@/components/projects-section";
import Footer from "@/components/ui/footer";
import { Navbar } from "@/components/ui/navbar";
import LogoMarquee from "@/components/marquee-section";
// import Preloader from "@/components/ui/preloader";

import { navItems } from "@/data";


export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto overflow-clip">
      <div className="max-w-8xl w-full">
        {/* <Preloader /> */}
        <Navbar/>
        <Hero />
        <LogoMarquee/>
        <Description />
        {/* TO DO */} <Projects />
        <Footer />
      </div>
    </main>
  );
}
