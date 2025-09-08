import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-[#C40D3A]">
      <div className="max-w-[78.5rem] mx-auto px-6 py-7 flex items-center justify-between flex-col md:flex-row text-center md:text-left gap-6">
        <p className="text-white text-sm">
          © 2025 ElasDoRH - Todos os direitos reservados
        </p>
        <p className="text-white text-sm">
          Desenvolvido com 💜 por{" "}
          <Link
            href="https://www.kodeseat.com/"
            target="_blank"
            className="font-semibold text-white hover:underline text-sm"
          >
            Kodeseat
          </Link>
        </p>
      </div>
    </footer>
  );
}
