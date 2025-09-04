import Image from "next/image";

export function Hero() {
  return (
    <section className="relative h-[49.5rem] flex items-center justify-center text-center text-white">
      <Image
        src="/section-hero-banner.svg"
        alt="Pessoas reunidas"
        fill
        priority
        className="object-cover"
      />
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Conteúdo */}
      <div className="relative z-10">
        <h1 className="text-[3.5rem] font-semibold">
          Onde mulheres incríveis se encontram para <span className="text-[#FFB8CA]">transformar o RH</span>
        </h1>
        <p className="text-[#E7E0E2]">Vamos dominar o mundo e precisamos de você conosco!</p>
        <div className="mt-6 flex gap-4 justify-center">
          <button className="px-6 py-3 bg-pink-600 rounded-lg">Fazer parte agora</button>
          <button className="px-6 py-3 border border-white rounded-lg">Sobre nós →</button>
        </div>
      </div>
    </section>
  );
}
