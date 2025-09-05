import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[43.9375rem] flex items-center justify-center text-center text-white">
      <Image
        src="/section-hero-banner.svg"
        alt="Pessoas reunidas"
        fill
        className="object-cover"
      />
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10">
        <h1 className="text-[3.5rem] font-semibold leading-none px-24">
          Onde mulheres incríveis se encontram para <span className="text-[#FFB8CA]">transformar o RH</span>
        </h1>
        <p className="text-[#E7E0E2] mt-4 text-2xl">Vamos dominar o mundo e precisamos de você conosco!</p>
        <div className="mt-6 flex gap-4 justify-center">
          <Button
            className="bg-[#C40D3A] hover:bg-[#C40D3A] text-white rounded-full font-medium"
            asChild
          >
            <Link href="#">Fazer parte agora</Link>
          </Button>
          <Button
            className="text-white hover:text-[#C40D3A] rounded-full font-medium border hover:border-[#C40D3A] border-white hover:bg-transparent"
            variant="ghost"
            asChild
          >
            <Link href="#">
              Sobre nós <MoveRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
