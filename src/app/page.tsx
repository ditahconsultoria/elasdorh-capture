import { HeroSection } from "@/components/sections/hero-section";
import { IntroSection } from "@/components/sections/intro-section";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AboutSection } from "@/components/sections/about-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FormSection } from "@/components/sections/form-section/form-section";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <IntroSection />
      <AboutSection />
      <TestimonialsSection />
      <FormSection />
      <Footer />
    </>
  );
}
