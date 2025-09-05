import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between px-24 py-3.5 w-full h-[5.5rem]">
      <Link href="/">
        <div className="relative w-[4.1106rem] h-[3.75rem]">
          <Image
            className="absolute"
            src="./logo.svg"
            alt="Elas do RH"
            fill
          />
        </div>
      </Link>
      <nav className="flex gap-2">
        <Button
          className="hover:bg-[#FCE3EC] hover:text-[#C40D3A] text-[#746266] font-medium"
          variant="ghost"
          asChild
        >
          <Link
            className="hover:bg-[#FCE3EC] hover:text-[#C40D3A] text-[#746266] font-medium"
            href="#"
          >
            Início
          </Link>
        </Button>
        <Button
          className="hover:bg-[#FCE3EC] hover:text-[#C40D3A] text-[#746266] font-medium"
          variant="ghost"
          asChild
        >
          <Link href="#">Sobre</Link>
        </Button>
        <Button
          className="hover:bg-[#FCE3EC] hover:text-[#C40D3A] text-[#746266] font-medium"
          variant="ghost"
          asChild
        >
          <Link href="#">Depoimentos</Link>
        </Button>
      </nav>
      <Button
        className="bg-[#C40D3A] hover:bg-[#C40D3A] text-white rounded-full font-medium"
        asChild
      >
        <Link href="#">Fazer parte agora</Link>
      </Button>
    </header>
  );
}
