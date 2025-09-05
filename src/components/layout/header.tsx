"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useState } from "react";

export function Header() {
  const [isOpenMenuNavigation, setIsOpenMenuNavigation] = useState(false);

  const toggleMenu = () => {
    setIsOpenMenuNavigation(!isOpenMenuNavigation);
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-24 py-3.5 w-full h-[5.5rem] relative">
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

      <nav className="hidden md:flex items-center gap-2">
        <Button
          className="hover:bg-[#FCE3EC] hover:text-[#C40D3A] text-[#746266] font-medium w-[75px] h-10"
          variant="ghost"
          asChild
        >
          <Link href="#">Início</Link>
        </Button>
        <Button
          className="hover:bg-[#FCE3EC] hover:text-[#C40D3A] text-[#746266] font-medium w-[75px] h-10"
          variant="ghost"
          asChild
        >
          <Link href="#">Sobre</Link>
        </Button>
        <Button
          className="hover:bg-[#FCE3EC] hover:text-[#C40D3A] text-[#746266] font-medium w-fit h-10"
          variant="ghost"
          asChild
        >
          <Link href="#">Depoimentos</Link>
        </Button>
      </nav>

      <Button
        className="hidden md:flex bg-[#C40D3A] hover:bg-[#C40D3A] text-white rounded-full font-medium h-12 w-48"
        asChild
      >
        <Link href="#">Fazer parte agora</Link>
      </Button>

      <Button
        variant="ghost"
        className="md:hidden p-2"
        onClick={toggleMenu}
      >
        {isOpenMenuNavigation ? <RxCross1 size={24} /> : <RxHamburgerMenu size={24} />}
      </Button>

      {isOpenMenuNavigation && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t md:hidden z-50">
          <nav className="flex flex-col p-4 space-y-2">
            <Button
              className="hover:bg-[#FCE3EC] hover:text-[#C40D3A] text-[#746266] font-medium justify-start h-12"
              variant="ghost"
              asChild
              onClick={() => setIsOpenMenuNavigation(false)}
            >
              <Link href="#">Início</Link>
            </Button>
            <Button
              className="hover:bg-[#FCE3EC] hover:text-[#C40D3A] text-[#746266] font-medium justify-start h-12"
              variant="ghost"
              asChild
              onClick={() => setIsOpenMenuNavigation(false)}
            >
              <Link href="#">Sobre</Link>
            </Button>
            <Button
              className="hover:bg-[#FCE3EC] hover:text-[#C40D3A] text-[#746266] font-medium justify-start h-12"
              variant="ghost"
              asChild
              onClick={() => setIsOpenMenuNavigation(false)}
            >
              <Link href="#">Depoimentos</Link>
            </Button>
            <Button
              className="bg-[#C40D3A] hover:bg-[#C40D3A] text-white rounded-full font-medium h-12 mt-4"
              asChild
              onClick={() => setIsOpenMenuNavigation(false)}
            >
              <Link href="#">Fazer parte agora</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
