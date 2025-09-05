import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { Header } from "@/components/layout/header";
import { AboutSection } from "@/components/sections/AboutSection";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <IntroSection />
      <AboutSection />
      <Footer />
    </>
  );
}
