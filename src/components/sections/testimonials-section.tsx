"use client";

import { useState, useEffect } from "react";
import { TrevoIcon } from "../icons/trevo-icon";
import { Card, CardDescription, CardHeader } from "../ui/card";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sabrina da Silva",
    role: "Participante da 1ª edição",
    text: "Vocês se superaram no assunto CONEXÃO E SINERGIA.",
  },
  {
    id: 2,
    name: "Rafael Mendes",
    role: "Participante da 1ª edição",
    text: "Apenas continuem, foi realmente muito bem organizado, com atenção em cada detalhe, comunicação perfeita e sobretudo com um brilho nos olhos que não dá pra passar despercebido. Parabéns!",
  },
  {
    id: 3,
    name: "Larissa Oliveira",
    role: "Participante da 1ª edição",
    text: "Parabéns por tudo: iniciativa, organização, disposição, simpatia, proposta do evento, a equipe, tudo foi perfeito.",
  },
  {
    id: 4,
    name: "Diego Fernandes",
    role: "Participante da 1ª edição",
    text: "Uma experiência transformadora que mudou minha perspectiva sobre conexões profissionais.",
  },
  {
    id: 5,
    name: "Mariana Costa",
    role: "Participante da 1ª edição",
    text: "O evento superou todas as minhas expectativas. A organização foi impecável e o networking incrível.",
  },
  {
    id: 6,
    name: "Thiago Alves",
    role: "Participante da 1ª edição",
    text: "Recomendo para todos que buscam crescimento profissional e pessoal. Foi uma experiência única!",
  },
  {
    id: 7,
    name: "Beatriz Santos",
    role: "Participante da 1ª edição",
    text: "O ambiente era incrível! Consegui fazer conexões que já estão gerando oportunidades reais no meu trabalho.",
  },
  {
    id: 8,
    name: "Gabriel Lima",
    role: "Participante da 1ª edição",
    text: "Evento excepcional! A qualidade dos participantes e a organização foram impressionantes.",
  },
  {
    id: 9,
    name: "Camila Rodrigues",
    role: "Participante da 1ª edição",
    text: "Saí de lá com várias ideias para implementar na minha empresa. Networking de qualidade!",
  },
];

export function TestimonialsSection() {
  const [currentGroup, setCurrentGroup] = useState(0);
  const itemsPerGroup = 3;
  const totalGroups = Math.ceil(testimonials.length / itemsPerGroup);

  function getCurrentTestimonials() {
    const startIndex = currentGroup * itemsPerGroup;
    return testimonials.slice(startIndex, startIndex + itemsPerGroup);
  }

  function handleDotClick(groupIndex: number) {
    setCurrentGroup(groupIndex);
  }

  function nextGroup() {
    setCurrentGroup((prev) => (prev + 1) % totalGroups);
  }

  useEffect(() => {
    const interval = setInterval(nextGroup, 5000);
    return () => clearInterval(interval);
  }, [totalGroups]);

  return (
    <section className="w-full">
      <div className="max-w-[1256px] mx-auto px-6 py-[100px] flex flex-col items-center justify-center">
        <p className="text-[#C40D3A] text-xl md:text-[2rem] font-semibold text-center px-4">
          O que disseram sobre a nossa 1ª Edição.
        </p>
        <p className="text-[#746266] text-base md:text-lg mt-2 text-center px-4">
          Histórias reais de quem viveu essa experiência...
        </p>

        <div className="mt-10 w-full">
          <div
            key={currentGroup}
            className="flex gap-4 items-center justify-center animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
          >
            {getCurrentTestimonials().map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`px-5.5 py-11.5 border-[#E7E0E2] shadow-none flex flex-col animate-in fade-in-0 slide-in-from-left-4 duration-700 transition-all ${
                  index === 1 ? "w-[472px] h-[284px] opacity-100" : "w-[348px] h-[208px] opacity-50"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="flex items-start gap-4 flex-col">
                  <div>
                    <p className="text-[#2E1118] font-semibold">{testimonial.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <TrevoIcon className="text-[#C40D3A] w-4 h-4" />
                      <p className="text-[#C40D3A] font-semibold text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <CardDescription>
                    <p className="text-[#746266]">{testimonial.text}</p>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalGroups }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 cursor-pointer ${
                  index === currentGroup
                    ? "w-10 h-2.5 rounded-full bg-[#C40D3A]"
                    : "w-2.5 h-2.5 rounded-full bg-[#E7E0E2] hover:bg-[#C40D3A]/50"
                }`}
                aria-label={`Ir para o grupo ${index + 1} de depoimentos`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
