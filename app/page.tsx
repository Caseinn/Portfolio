import Hero from "@/components/hero-section";
import Description from "@/components/description-section";
import Projects from "@/components/projects-section";
import Footer from "@/components/ui/footer";
import { Navbar } from "@/components/ui/navbar";
import LogoMarquee from "@/components/marquee-section";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="relative overflow-clip bg-wall">
        <Hero />
        <LogoMarquee />
        <Description />
        <Projects />
        <Footer />
      </main>
    </>
  );
}
