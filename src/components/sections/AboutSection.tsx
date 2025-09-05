import { AiOutlineClose } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

export function AboutSection() {
  const paragraphs = [
    "Com diálogos verdadeiros, profundos e cheios de significado, criamos espaços que despertam insights e impulsionam mudanças reais.",
    "Aqui você encontra mulheres que compartilham experiências, apoiam umas às outras e buscam gerar impacto de verdade no mercado de trabalho.",
    "Nossos encontros ajudam você a construir conexões reais e consistentes, para que nunca mais se sinta sozinha na sua carreira.",
  ];

  const differentialItems = [
    {
      icon: <AiOutlineClose className="text-[#FF5744]" />,
      text: "Não é palestra",
    },
    {
      icon: <AiOutlineClose className="text-[#FF5744]" />,
      text: "Não é coaching",
    },
    {
      icon: <FaCheck className="text-[#36B536]" />,
      text: "É troca de verdade — um espaço para falar e ouvir.",
    },
  ];

  return (
    <section className="w-full">
      <div className="max-w-[78.5rem] mx-auto px-6 py-[6.25rem]">
        <h2 className="text-2xl font-medium text-[#C40D3A]">O que é o Elas?</h2>

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
                <p className="text-[#2E1118] font-medium text-lg">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
