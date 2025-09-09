import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Elas do RH | Onde mulheres incríveis se encontram",
  description: "Uma rede de mulheres que se encontram para debater, solucionar e transformar o papel do RH.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="h-full"
    >
      <body className={`${poppins.className} min-h-screen flex flex-col`}>
        <Toaster position="top-right" /> {/* Adição do Toaster */}
        <div className="flex-1">{children}</div>
      </body>
      <Analytics />
    </html>
  );
}