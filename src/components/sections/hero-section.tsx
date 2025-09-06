import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center text-center text-white">
      <div className="max-w-[78.5rem] mx-auto px-6 py-[13.625rem]">
        <Image
          src="/hero-banner.svg"
          alt="Pessoas reunidas"
          fill
          className="object-cover"
        />
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10">
          <h1 className="md:text-[3.5rem] font-semibold md:px-24 text-4xl leading-12">
            Onde mulheres incríveis se encontram para <span className="text-[#FFB8CA]">transformar o RH</span>
          </h1>
          <p className="text-[#E7E0E2] mt-4 lg:text-2xl">Vamos dominar o mundo e precisamos de você conosco!</p>
          <div className="mt-6 flex flex-col md:flex-row items-center gap-4 justify-center">
            <Button
              className="bg-[#C40D3A] hover:bg-[#d21444] text-white rounded-full font-medium h-12 lg:w-48 w-full duration-300"
              asChild
            >
              <Link href="#">Fazer parte agora</Link>
            </Button>
            <Button
              className="lg:w-[165px] w-full"
              asChild
              variant="outline"
              size={"lg"}
            >
              <Link href="#">
                Sobre nós <FaArrowRightLong />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
