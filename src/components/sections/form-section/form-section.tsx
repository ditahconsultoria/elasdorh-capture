import { TrevoIcon } from "@/components/icons/trevo-icon";
import { Form } from "./components/form";
import Link from "next/link";
import { AiFillInstagram, AiOutlineMail } from "react-icons/ai";
import { PiLinkedinLogoFill } from "react-icons/pi";

export function FormSection() {
  return (
    <section className="w-full bg-pink-50 relative overflow-hidden">
      <div className="max-w-[1256px] mx-auto px-6 py-[100px] flex flex-col items-center justify-center relative z-10">
        <div className="absolute top-5 -right-28 z-0 hidden lg:block">
          <TrevoIcon className="w-[331px] h-[331px] text-[#FFE9F0] lg:block hidden" />
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-16">
          <div className="flex flex-col max-w-[588px]">
            <div className="flex items-center gap-4">
              <TrevoIcon className="w-10.5 h-10.5 text-[#C40D3A]" />
              <p className="text-[#C40D3A] font-medium text-2xl">Faça parte deste movimento!</p>
            </div>

            <div className="space-y-4 mt-12">
              <p className="font-semibold text-[#2E1118] text-[22px]">
                Junte-se a nós e conecte-se com uma rede de mulheres que está transformando o RH.
              </p>
              <p className="text-[#746266] text-lg">Preencha o formulário e inscreva-se agora.</p>
            </div>

            <div className="mt-12 flex flex-col gap-4">
              <p className="font-medium text-[#2E1118] text-lg ">Siga-nos nas redes sociais:</p>
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="bg-[#FCE3EC] p-2.5 rounded-lg"
                >
                  <AiFillInstagram
                    size={28}
                    className="text-[#C40D3A]"
                  />
                </Link>
                <Link
                  href="#"
                  className="bg-[#FCE3EC] p-2.5 rounded-lg"
                >
                  <PiLinkedinLogoFill
                    size={28}
                    className="text-[#C40D3A]"
                  />
                </Link>
              </div>
            </div>

            <div className="mt-12 space-y-2">
              <p className="font-medium text-[#2E1118] text-lg ">Dúvidas? Fale com a gente:</p>
              <div className="flex items-center gap-2">
                <AiOutlineMail
                  size={20}
                  className="text-[#746266]"
                />
                <Link
                  href="mailto:contato@elasdorh.com.br"
                  className="text-[#C40D3A] hover:text-[#A00B2F] transition-colors duration-200"
                >
                  contato@elasdorh.com.br
                </Link>
              </div>
            </div>
          </div>

          <Form />
        </div>
      </div>
    </section>
  );
}
