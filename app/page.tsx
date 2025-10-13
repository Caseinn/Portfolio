import Hero from "@/components/hero-section";
import Description from "@/components/description-section";
import Projects from "@/components/project-section";
import Footer from "@/components/ui/footer";
import { Navbar } from "@/components/ui/navbar";

// import Preloader from "@/components/ui/preloader";

import { navItems } from "@/data";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
      <div className="max-w-7xl w-full">
        {/* <Preloader /> */}
        <Navbar navItems={navItems}/>
        <Hero />
        <Description />
        <Projects />
        <Footer />
      </div>
    </main>
  );
}
