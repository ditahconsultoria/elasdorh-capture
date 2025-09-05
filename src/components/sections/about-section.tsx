"use client";

import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaArrowRightLong, FaCheck } from "react-icons/fa6";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { TrevoIcon } from "../icons/trevo-icon";

export function AboutSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const paragraphs = [
    "Com diálogos verdadeiros, profundos e cheios de significado, criamos espaços que despertam insights e impulsionam mudanças reais.",
    "Aqui você encontra mulheres que compartilham experiências, apoiam umas às outras e buscam gerar impacto de verdade no mercado de trabalho.",
    "Nossos encontros ajudam você a construir conexões reais e consistentes, para que nunca mais se sinta sozinha na sua carreira.",
  ];

  const differentialItems = [
    {
      icon: (
        <AiOutlineClose
          className="text-[#FF5744]"
          size={24}
        />
      ),
      text: "Não é palestra",
    },
    {
      icon: (
        <AiOutlineClose
          className="text-[#FF5744]"
          size={24}
        />
      ),
      text: "Não é coaching",
    },
    {
      icon: (
        <FaCheck
          className="text-[#36B536]"
          size={24}
        />
      ),
      text: "É troca de verdade — um espaço para falar e ouvir.",
    },
  ];

  const images = [
    "/hero-banner.svg",
    "/event-photo-1.svg",
    "/event-photo-2.svg",
    "/event-photo-3.svg",
    "/event-photo-4.svg",
    "/event-photo-5.svg",
  ];

  // Criar array com duplicação para carousel infinito
  const infiniteImages = [...images, images[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentImageIndex((prevIndex) => prevIndex + 1);

      setTimeout(() => {
        if (currentImageIndex === images.length - 1) {
          setIsTransitioning(false);
          setCurrentImageIndex(0);
        } else {
          setIsTransitioning(false);
        }
      }, 700);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  return (
    <section className="w-full bg-pink-50 relative overflow-hidden">
      <div className="max-w-[78.5rem] mx-auto px-6 py-[6.25rem] relative z-10">
        <div className="absolute top-20 -right-56 z-0 hidden lg:block">
          <TrevoIcon className="w-[605px] h-[605px] text-[#FFE9F0]" />
        </div>
        <div className="flex items-center gap-10 flex-col md:flex-row">
          <div>
            <div className="flex items-center gap-4">
              <TrevoIcon className="w-10.5 h-10.5 text-[#C40D3A]" />
              <h2 className="text-2xl font-medium text-[#C40D3A]">O que é o Elas?</h2>
            </div>

            <p className="text-[#2E1118] text-[22px] font-semibold mt-12">
              Uma rede de mulheres que se encontram para debater, solucionar e transformar o papel do RH.
            </p>

            <div className="space-y-4 mt-6">
              {paragraphs.map((text, index) => (
                <p
                  key={index}
                  className="text-[#746266]"
                >
                  {text}
                </p>
              ))}
            </div>

            <div className="mt-12">
              <p className="text-[#2E1118] text-[22px] font-semibold">O diferencial...</p>

              <div className="space-y-4 mt-6">
                {differentialItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <span className="text-[#2E1118] font-medium">{item.icon}</span>
                    <p
                      className={`text-[#2E1118] ${
                        index === differentialItems.length - 1 ? "font-normal" : "font-medium"
                      }`}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="text-white rounded-full h-12 w-[225px] mt-12 bg-[#C40D3A] hover:bg-[#d21444] font-medium duration-300"
              asChild
            >
              <Link href="#">
                Quero fazer parte <FaArrowRightLong />
              </Link>
            </Button>
          </div>

          <div className="w-full md:w-auto hidden lg:block">
            <div className="relative h-[300px] md:h-[457px] w-full md:w-[580px] overflow-hidden rounded-lg">
              <div
                className={`flex h-full transition-transform duration-700 ease-in-out ${
                  isTransitioning ? "" : "transition-none"
                }`}
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {infiniteImages.map((image, index) => (
                  <div
                    key={index}
                    className="w-full h-full flex-shrink-0 relative"
                  >
                    <Image
                      src={image}
                      alt={`Elas ${(index % images.length) + 1}`}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
