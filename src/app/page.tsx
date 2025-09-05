import { Hero } from "@/components/layout/hero";
import { IntroSection } from "@/components/sections/IntroSection";
import { Header } from "@/components/layout/header";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <IntroSection />
    </>
  );
}
