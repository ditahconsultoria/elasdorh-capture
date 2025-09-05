import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { Header } from "@/components/layout/header";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <IntroSection />
    </>
  );
}
