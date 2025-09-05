"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { SlMenu } from "react-icons/sl";

type NavigationItem = {
  label: string;
  href: string;
  width?: string;
};

type NavigationButtonProps = {
  item: NavigationItem;
  isMobile?: boolean;
  onClose?: () => void;
};

function NavigationButton({ item, isMobile = false, onClose }: NavigationButtonProps) {
  const baseClasses = "hover:bg-[#FCE3EC] hover:text-[#C40D3A] text-[#746266] font-medium h-10";
  const mobileClasses = isMobile ? "justify-start h-12" : "";
  const widthClass = item.width ? `w-${item.width}` : "w-fit";

  return (
    <Button
      className={`${baseClasses} ${mobileClasses} ${widthClass}`}
      variant="ghost"
      asChild
      onClick={onClose}
    >
      <Link href={item.href}>{item.label}</Link>
    </Button>
  );
}

export function Header() {
  const [isOpenMenuNavigation, setIsOpenMenuNavigation] = useState(false);

  const navigationItems: NavigationItem[] = [
    { label: "Início", href: "#", width: "75px" },
    { label: "Sobre", href: "#", width: "75px" },
    { label: "Depoimentos", href: "#" },
  ];

  function toggleMenu() {
    setIsOpenMenuNavigation(!isOpenMenuNavigation);
  }

  function closeMenu() {
    setIsOpenMenuNavigation(false);
  }

  return (
    <header className="flex items-center justify-between px-4 md:px-24 py-3.5 w-full h-[5.5rem] relative">
      <Link href="/">
        <div className="relative lg:w-[4.1106rem] lg:h-[3.75rem] w-12 h-12">
          <Image
            className="absolute"
            src="./logo.svg"
            alt="Elas do RH"
            fill
          />
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-2 ml-16">
        {navigationItems.map((item) => (
          <NavigationButton
            key={item.label}
            item={item}
          />
        ))}
      </nav>

      <Button
        className="hidden md:flex bg-[#C40D3A] hover:bg-[#d21444] text-white rounded-full font-medium h-12 w-48 duration-300"
        asChild
      >
        <Link href="#">Fazer parte agora</Link>
      </Button>

      <Button
        variant="ghost"
        className="md:hidden"
        onClick={toggleMenu}
      >
        {isOpenMenuNavigation ? <RxCross1 size={24} /> : <SlMenu />}
      </Button>

      {isOpenMenuNavigation && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t md:hidden z-50">
          <nav className="flex flex-col p-4 space-y-2">
            {navigationItems.map((item) => (
              <NavigationButton
                key={item.label}
                item={item}
                isMobile={true}
                onClose={closeMenu}
              />
            ))}
            <Button
              className="bg-[#C40D3A] hover:bg-[#C40D3A] text-white rounded-full font-medium h-12 mt-4"
              asChild
              onClick={closeMenu}
            >
              <Link href="#">Fazer parte agora</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
