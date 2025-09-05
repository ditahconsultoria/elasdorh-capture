import Image from "next/image";

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.66669 3.33331L13.3334 7.99998L8.66669 12.6666"
      stroke="#C01E49"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.66669 8H13.3334"
      stroke="#C01E49"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InfoCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white p-8 rounded-2xl text-left">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);

export const IntroSection = () => {
  return (
    <section className="bg-[#C40D3A] w-full">
      <div className="max-w-[1256px] mx-auto px-6 py-[100px]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-4 text-white">
          <div className="md:text-left text-center">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <Image
                src="/trevo.svg"
                alt="Ícone de um trevo de quatro folhas na cor branca"
                width={42}
                height={42}
                priority
              />
              <p className="font-medium text-2xl">Você não está sozinha!</p>
            </div>
            <h1 className="text-4xl md:text-[32px] font-medium leading-tight max-w-4xl">
              Aqui, mulheres de RH encontram{" "}
              <span className="font-semibold">
                apoio, trocas reais e conexões
              </span>
              , que fortalecem suas jornadas profissionais.
            </h1>
          </div>
          <a
            href="#"
            className="self-center md:self-auto inline-flex items-center justify-center gap-2 bg-[#FFB8CA] text-[#C40D3A] py-3 px-6 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Junte-se a nós <ArrowIcon />
          </a>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoCard title="Conexão de verdade">
              Crie laços com mulheres que compartilham dos mesmos desafios e que
              acreditam no poder das conexões.
            </InfoCard>
            <InfoCard title="Trocas que inspiram">
              Ouça experiências, aprendizados e histórias que podem impulsionam
              sua carreira no RH.
            </InfoCard>
            <InfoCard title="Crescimento Juntas">
              Seja protagonista da sua trajetória com o apoio de uma rede que
              caminha lado a lado com você.
            </InfoCard>
          </div>
        </div>
      </div>
    </section>
  );
};
